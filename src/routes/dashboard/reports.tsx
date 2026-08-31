import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Printer } from "lucide-react";
import { useMemo, useState } from "react";

import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import { useStore, visibleComplaints, type Complaint, type ComplaintStatus } from "@/lib/store";

export const Route = createFileRoute("/dashboard/reports")({
  component: MonthlyReportsPage,
});

const STATUSES: ComplaintStatus[] = ["new", "assigned", "resolved"];

type ScopeType = "all" | "employee";

function inMonth(iso: string, year: number, month: number) {
  const d = new Date(iso);
  return d.getFullYear() === year && d.getMonth() === month;
}

function monthLabel(year: number, month: number, lang: "ar" | "en") {
  return new Date(year, month, 1).toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB", {
    month: "long",
    year: "numeric",
  });
}

function inReportPeriod(c: Complaint, year: number, month: number) {
  return (
    inMonth(c.createdAt, year, month) ||
    (c.resolution != null && inMonth(c.resolution.at, year, month))
  );
}

function MonthlyReportsPage() {
  const { t, lang } = useI18n();
  const store = useStore();
  const { me, state, isSuper, activeEmployees } = store;
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [scopeType, setScopeType] = useState<ScopeType>("all");
  const [scopeId, setScopeId] = useState("");

  const allVisible = useMemo(() => visibleComplaints(store), [store.state, store.me, store.isSuper]);

  const employeeOptions = useMemo(
    () =>
      activeEmployees.sort((a, b) => a.name.localeCompare(b.name, lang === "ar" ? "ar" : "en")),
    [activeEmployees, lang],
  );

  const scopedBase = useMemo(() => {
    if (scopeType === "all" || !scopeId) return allVisible;
    return allVisible.filter((c) => c.assignedTo === scopeId);
  }, [allVisible, scopeType, scopeId]);

  const monthComplaints = useMemo(() => {
    const items = scopedBase.filter((c) => inReportPeriod(c, year, month));
    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [scopedBase, year, month]);

  const createdCount = scopedBase.filter((c) => inMonth(c.createdAt, year, month)).length;
  const resolvedCount = scopedBase.filter(
    (c) => c.resolution && inMonth(c.resolution.at, year, month),
  ).length;
  const openCount = scopedBase.filter((c) => c.status !== "resolved").length;

  const byStatus = STATUSES.map((s) => ({
    status: s,
    count: monthComplaints.filter((c) => c.status === s).length,
  }));

  const byEmployee = useMemo(() => {
    const rows = new Map<string, { name: string; assigned: number; resolved: number }>();
    for (const c of monthComplaints) {
      if (!c.assignedTo) continue;
      const acc = state.accounts.find((a) => a.id === c.assignedTo);
      if (!acc) continue;
      const row = rows.get(acc.id) ?? { name: acc.name, assigned: 0, resolved: 0 };
      row.assigned += 1;
      if (c.resolution && inMonth(c.resolution.at, year, month)) row.resolved += 1;
      rows.set(acc.id, row);
    }
    return [...rows.values()].sort((a, b) => b.assigned - a.assigned);
  }, [monthComplaints, state.accounts, year, month]);

  const scopeLabel = useMemo(() => {
    if (scopeType === "all") return t("reportScopeAll");
    return state.accounts.find((a) => a.id === scopeId)?.name ?? t("reportScopeAll");
  }, [scopeType, scopeId, state.accounts, t]);

  const setScope = (type: ScopeType) => {
    setScopeType(type);
    if (type === "all") {
      setScopeId("");
      return;
    }
    setScopeId(employeeOptions[0]?.id ?? "");
  };

  if (!me || !isSuper) {
    return (
      <div className="rise-in surface rounded-2xl p-10 text-center">
        <p className="text-sm text-muted-foreground">{t("reportSuperOnly")}</p>
        <Button asChild className="mt-4" variant="secondary">
          <Link to="/dashboard">{t("back")}</Link>
        </Button>
      </div>
    );
  }

  const period = monthLabel(year, month, lang);
  const years = [now.getFullYear(), now.getFullYear() - 1, now.getFullYear() - 2];
  const showEmployeeTable = scopeType !== "employee" && byEmployee.length > 0;

  return (
    <div className="rise-in space-y-6">
      <div className="flex flex-col gap-4 print:hidden sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">{t("monthlyReport")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("monthlyReportDesc")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={String(month)} onValueChange={(v) => setMonth(Number(v))}>
            <SelectTrigger className="w-[9.5rem]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={String(i)}>
                  {new Date(2000, i, 1).toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB", {
                    month: "long",
                  })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={String(year)} onValueChange={(v) => setYear(Number(v))}>
            <SelectTrigger className="w-[6.5rem]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => window.print()} className="gap-2">
            <Printer className="size-4" />
            {t("printPdf")}
          </Button>
        </div>
      </div>

      <div className="surface print:hidden rounded-2xl p-4 sm:p-5">
        <p className="mb-3 text-sm font-semibold">{t("reportScope")}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                ["all", t("reportScopeAll")],
                ["employee", t("reportScopeEmployee")],
              ] as const
            ).map(([type, label]) => (
              <button
                key={type}
                type="button"
                onClick={() => setScope(type)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors touch-manipulation ${
                  scopeType === type
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:bg-secondary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {scopeType === "employee" && (
            <div className="min-w-[10rem] flex-1 space-y-1.5 sm:max-w-xs">
              <Label className="text-xs">{t("employeeName")}</Label>
              <Select value={scopeId} onValueChange={setScopeId}>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectEmployee")} />
                </SelectTrigger>
                <SelectContent>
                  {employeeOptions.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      <article id="monthly-report" className="surface monthly-report rounded-2xl p-4 sm:p-6 md:p-8">
        <header className="border-b border-border pb-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-primary grid size-11 place-items-center rounded-xl text-sm font-bold text-primary-foreground">
                الم
              </span>
              <div>
                <p className="font-display text-lg font-bold">{t("brand")}</p>
                <p className="text-sm text-muted-foreground">{t("monthlyReport")}</p>
              </div>
            </div>
            <div className="text-end text-sm">
              <p className="flex items-center justify-end gap-1.5 font-semibold">
                <FileText className="size-4 text-primary" />
                {period}
              </p>
              <p className="mt-1 text-muted-foreground">
                {t("generatedAt")}:{" "}
                {new Date().toLocaleString(lang === "ar" ? "ar-JO" : "en-GB")}
              </p>
            </div>
          </div>

          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-secondary/50 px-3 py-2.5">
              <dt className="text-[11px] text-muted-foreground">{t("preparedBy")}</dt>
              <dd className="mt-0.5 font-semibold">{me.name}</dd>
            </div>
            <div className="rounded-xl bg-primary/10 px-3 py-2.5 ring-1 ring-primary/20">
              <dt className="text-[11px] text-muted-foreground">{t("reportFor")}</dt>
              <dd className="mt-0.5 font-semibold text-primary">{scopeLabel}</dd>
            </div>
            <div className="rounded-xl bg-secondary/50 px-3 py-2.5">
              <dt className="text-[11px] text-muted-foreground">{t("reportPeriod")}</dt>
              <dd className="mt-0.5 font-semibold">{period}</dd>
            </div>
          </dl>
        </header>

        <section className="mt-6">
          <h2 className="text-sm font-bold">{t("reportSummary")}</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
            <StatBox label={t("createdThisMonth")} value={createdCount} />
            <StatBox label={t("resolvedThisMonth")} value={resolvedCount} />
            <StatBox label={t("stillOpen")} value={openCount} />
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-bold">{t("statusBreakdown")}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {byStatus.map((row) => (
              <div
                key={row.status}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs"
              >
                <StatusBadge status={row.status} />
                <span className="font-semibold tabular-nums">{row.count}</span>
              </div>
            ))}
          </div>
        </section>

        {showEmployeeTable && (
          <section className="mt-6">
            <h2 className="text-sm font-bold">{t("teamPerformance")}</h2>
            <div className="mt-3 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[18rem] text-sm">
                <thead className="bg-secondary/60 text-xs text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-start font-semibold">{t("employeeName")}</th>
                    <th className="px-3 py-2 text-start font-semibold">{t("assignedCount")}</th>
                    <th className="px-3 py-2 text-start font-semibold">{t("resolvedThisMonth")}</th>
                  </tr>
                </thead>
                <tbody>
                  {byEmployee.map((row) => (
                    <tr key={row.name} className="border-t border-border">
                      <td className="px-3 py-2 font-medium">{row.name}</td>
                      <td className="px-3 py-2 tabular-nums">{row.assigned}</td>
                      <td className="px-3 py-2 tabular-nums">{row.resolved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="mt-6">
          <h2 className="text-sm font-bold">
            {t("complaintsInPeriod")} ({monthComplaints.length})
          </h2>
          {monthComplaints.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">{t("noReportData")}</p>
          ) : (
            <>
              <div className="mt-3 space-y-3 md:hidden print:hidden">
                {monthComplaints.map((c) => {
                  const lib = state.libraries.find((l) => l.id === c.libraryId);
                  const b = state.branches.find((x) => x.id === c.branchId);
                  const assignee = c.assignedTo
                    ? state.accounts.find((a) => a.id === c.assignedTo)
                    : null;
                  return (
                    <div key={c.id} className="surface rounded-xl p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-primary">{c.ref}</span>
                        <StatusBadge status={c.status} />
                      </div>
                      <p className="mt-2 text-sm font-semibold">
                        {lib ? (lang === "ar" ? lib.nameAr : lib.nameEn) : "—"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {b ? (lang === "ar" ? b.nameAr : b.nameEn) : "—"}
                        {" · "}
                        {assignee?.name ?? t("unassigned")}
                      </p>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {new Date(c.createdAt).toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB")}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 hidden overflow-x-auto rounded-xl border border-border md:block">
              <table className="w-full min-w-[32rem] text-xs md:text-sm">
                <thead className="bg-secondary/60 text-[11px] text-muted-foreground">
                  <tr>
                    <th className="px-2 py-2 text-start font-semibold">{t("refNo")}</th>
                    <th className="px-2 py-2 text-start font-semibold">{t("library")}</th>
                    <th className="px-2 py-2 text-start font-semibold">{t("branch")}</th>
                    <th className="px-2 py-2 text-start font-semibold">{t("status")}</th>
                    <th className="px-2 py-2 text-start font-semibold">{t("assignedTo")}</th>
                    <th className="px-2 py-2 text-start font-semibold">{t("createdAt")}</th>
                  </tr>
                </thead>
                <tbody>
                  {monthComplaints.map((c) => {
                    const lib = state.libraries.find((l) => l.id === c.libraryId);
                    const b = state.branches.find((x) => x.id === c.branchId);
                    const assignee = c.assignedTo
                      ? state.accounts.find((a) => a.id === c.assignedTo)
                      : null;
                    return (
                      <tr key={c.id} className="border-t border-border">
                        <td className="px-2 py-2 font-mono font-semibold text-primary">{c.ref}</td>
                        <td className="px-2 py-2">
                          {lib ? (lang === "ar" ? lib.nameAr : lib.nameEn) : "—"}
                        </td>
                        <td className="px-2 py-2">
                          {b ? (lang === "ar" ? b.nameAr : b.nameEn) : "—"}
                        </td>
                        <td className="px-2 py-2">
                          <StatusBadge status={c.status} />
                        </td>
                        <td className="px-2 py-2">{assignee?.name ?? t("unassigned")}</td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          {new Date(c.createdAt).toLocaleDateString(
                            lang === "ar" ? "ar-JO" : "en-GB",
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            </>
          )}
        </section>

        <footer className="mt-8 border-t border-border pt-4 text-[11px] text-muted-foreground">
          {t("reportFooter")}
        </footer>
      </article>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-3">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold tabular-nums">{value}</p>
    </div>
  );
}
