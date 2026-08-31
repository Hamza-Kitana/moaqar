import type { ReactNode } from "react";

import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { useI18n, type TKey } from "@/lib/i18n";
import type { Account, Complaint, ComplaintStatus, State } from "@/lib/store";

const STATUS_KEYS: Record<ComplaintStatus, TKey> = {
  new: "st_new",
  assigned: "st_assigned",
  pending_review: "st_pending_review",
  closed: "st_closed",
};

type EmployeeRow = { name: string; assigned: number; resolved: number };
type StatusRow = { status: ComplaintStatus; count: number };

type Props = {
  reportNo: string;
  period: string;
  scopeLabel: string;
  preparedBy: string;
  generatedAt: string;
  createdCount: number;
  resolvedCount: number;
  openCount: number;
  byStatus: StatusRow[];
  byEmployee: EmployeeRow[];
  showEmployeeTable: boolean;
  complaints: Complaint[];
  state: State;
};

export function MonthlyReportDocument({
  reportNo,
  period,
  scopeLabel,
  preparedBy,
  generatedAt,
  createdCount,
  resolvedCount,
  openCount,
  byStatus,
  byEmployee,
  showEmployeeTable,
  complaints,
  state,
}: Props) {
  const { t, lang } = useI18n();

  return (
    <article id="monthly-report" className="report-doc surface monthly-report rounded-2xl p-4 sm:p-6 md:p-8">
      <div className="report-frame">
        <header className="report-letterhead">
          <div className="report-letterhead-inner">
            <span className="report-logo" aria-hidden>
              الم
            </span>
            <div className="report-brand">
              <h1 className="report-brand-name">{t("brand")}</h1>
              <p className="report-brand-sub">{t("reportCompanyLine")}</p>
            </div>
          </div>
          <p className="report-official-title">{t("reportOfficialTitle")}</p>
          <p className="report-classification">{t("documentClassification")}</p>
        </header>

        <section className="report-meta">
          <div className="report-meta-grid">
            <MetaItem label={t("reportNo")} value={reportNo} highlight />
            <MetaItem label={t("reportPeriod")} value={period} />
            <MetaItem label={t("generatedAt")} value={generatedAt} />
            <MetaItem label={t("preparedBy")} value={preparedBy} />
            <MetaItem label={t("reportFor")} value={scopeLabel} highlight />
          </div>
        </section>

        <ReportSection title={t("executiveSummary")}>
          <div className="report-metrics">
            <MetricCard label={t("createdThisMonth")} value={createdCount} />
            <MetricCard label={t("resolvedThisMonth")} value={resolvedCount} accent="success" />
            <MetricCard label={t("stillOpen")} value={openCount} accent="warning" />
          </div>
        </ReportSection>

        <ReportSection title={t("statusBreakdown")}>
          <table className="report-table report-table-compact">
            <thead>
              <tr>
                <th>{t("status")}</th>
                <th className="report-col-num">{t("countLabel")}</th>
              </tr>
            </thead>
            <tbody>
              {byStatus.map((row) => (
                <tr key={row.status}>
                  <td>{t(STATUS_KEYS[row.status])}</td>
                  <td className="report-col-num">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ReportSection>

        {showEmployeeTable && (
          <ReportSection title={t("teamPerformance")}>
            <table className="report-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t("employeeName")}</th>
                  <th className="report-col-num">{t("assignedCount")}</th>
                  <th className="report-col-num">{t("resolvedThisMonth")}</th>
                </tr>
              </thead>
              <tbody>
                {byEmployee.map((row, i) => (
                  <tr key={row.name}>
                    <td className="report-col-num">{i + 1}</td>
                    <td>{row.name}</td>
                    <td className="report-col-num">{row.assigned}</td>
                    <td className="report-col-num">{row.resolved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ReportSection>
        )}

        <ReportSection title={`${t("complaintsInPeriod")} (${complaints.length})`}>
          {complaints.length === 0 ? (
            <p className="report-empty">{t("noReportData")}</p>
          ) : (
            <table className="report-table report-table-complaints">
              <thead>
                <tr>
                  <th>{t("refNo")}</th>
                  <th>{t("library")}</th>
                  <th>{t("branch")}</th>
                  <th>{t("status")}</th>
                  <th>{t("assignedTo")}</th>
                  <th>{t("createdAt")}</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <ComplaintRow key={c.id} c={c} state={state} lang={lang} t={t} />
                ))}
              </tbody>
            </table>
          )}
        </ReportSection>

        <footer className="report-signatures">
          <div className="report-signature-block">
            <div className="report-signature-line" />
            <p>{t("signaturePrepared")}</p>
            <p className="report-signature-name">{preparedBy}</p>
          </div>
          <div className="report-signature-block">
            <div className="report-signature-line" />
            <p>{t("signatureManager")}</p>
          </div>
        </footer>

        <p className="report-footer-note">{t("reportFooter")}</p>
      </div>
    </article>
  );
}

function ReportSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="report-section">
      <h2 className="report-section-title">
        <span className="report-section-bar" aria-hidden />
        {title}
      </h2>
      {children}
    </section>
  );
}

function MetaItem({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className={highlight ? "report-meta-item report-meta-item-highlight" : "report-meta-item"}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "success" | "warning";
}) {
  return (
    <div className={accent ? `report-metric report-metric-${accent}` : "report-metric"}>
      <p className="report-metric-label">{label}</p>
      <p className="report-metric-value">{value}</p>
    </div>
  );
}

function ComplaintRow({
  c,
  state,
  lang,
  t,
}: {
  c: Complaint;
  state: State;
  lang: "ar" | "en";
  t: (k: TKey) => string;
}) {
  const lib = state.libraries.find((l) => l.id === c.libraryId);
  const branch = state.branches.find((b) => b.id === c.branchId);
  const assignee = c.assignedTo ? state.accounts.find((a: Account) => a.id === c.assignedTo) : null;
  const dateStr = new Date(c.createdAt).toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB");

  return (
    <tr>
      <td className="report-ref">{c.ref}</td>
      <td>{lib ? (lang === "ar" ? lib.nameAr : lib.nameEn) : "—"}</td>
      <td>{branch ? (lang === "ar" ? branch.nameAr : branch.nameEn) : "—"}</td>
      <td>
        <span className="report-status-text">{t(STATUS_KEYS[c.status])}</span>
        <span className="report-status-badge">
          <StatusBadge status={c.status} />
        </span>
      </td>
      <td>{assignee?.name ?? t("unassigned")}</td>
      <td className="report-date">{dateStr}</td>
    </tr>
  );
}
