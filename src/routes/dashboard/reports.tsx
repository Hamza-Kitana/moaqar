import { createFileRoute, Link } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { useMemo, useState } from "react";

import { MonthlyReportDocument } from "@/components/dashboard/MonthlyReportDocument";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, formatDateTime } from "@/lib/format";
import { useI18n } from "@/lib/i18n";
import { useStore, visibleComplaints, type Complaint, type ComplaintStatus } from "@/lib/store";

export const Route = createFileRoute("/dashboard/reports")({
  component: MonthlyReportsPage,
});

const STATUSES: ComplaintStatus[] = ["new", "assigned", "returned", "pending_review", "closed"];

type ScopeType = "all" | "employee";

function inMonth(iso: string, year: number, month: number) {
  const d = new Date(iso);
  return d.getFullYear() === year && d.getMonth() === month;
}

function monthLabel(year: number, month: number, lang: "ar" | "en") {
  return formatDate(new Date(year, month, 1), lang, {
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
  const openCount = scopedBase.filter((c) => c.status !== "closed").length;

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
  const reportNo = `RPT-${year}-${String(month + 1).padStart(2, "0")}`;
  const generatedAt = formatDateTime(new Date(), lang);

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
                  {formatDate(new Date(2000, i, 1), lang, {
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

      <MonthlyReportDocument
        reportNo={reportNo}
        period={period}
        scopeLabel={scopeLabel}
        preparedBy={me.name}
        generatedAt={generatedAt}
        createdCount={createdCount}
        resolvedCount={resolvedCount}
        openCount={openCount}
        byStatus={byStatus}
        byEmployee={byEmployee}
        showEmployeeTable={showEmployeeTable}
        complaints={monthComplaints}
        state={state}
      />
    </div>
  );
}
