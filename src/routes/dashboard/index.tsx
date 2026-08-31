import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, ClipboardList, UserCog } from "lucide-react";
import { useMemo } from "react";

import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { WorkflowSteps } from "@/components/dashboard/WorkflowSteps";
import { useI18n } from "@/lib/i18n";
import { useStore, visibleComplaints, type ComplaintStatus } from "@/lib/store";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

function DashboardOverview() {
  const { t, lang } = useI18n();
  const store = useStore();
  const { me, state, isSuper, activeEmployees } = store;
  const complaints = useMemo(() => visibleComplaints(store), [store.state, store.me, store.isSuper]);

  const openTasks = complaints.filter((c) => c.status === "assigned");
  const resolvedTasks = complaints.filter((c) => c.status === "resolved");

  const superStats = [
    {
      label: t("complaints"),
      value: complaints.length,
      icon: ClipboardList,
      href: "/dashboard/complaints",
    },
    {
      label: t("employees"),
      value: activeEmployees.length,
      icon: UserCog,
      href: "/dashboard/employees",
    },
    {
      label: t("branches"),
      value: state.branches.length,
      icon: Building2,
      href: "/dashboard/branches",
    },
  ];

  const open = complaints.filter((c) => c.status !== "resolved");
  const recent = complaints.slice(0, 5);

  return (
    <div className="rise-in space-y-6">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">{t("overview")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("welcome")} {me?.name}
        </p>
      </div>

      {isSuper ? (
        <div className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-3 xl:gap-4">
          {superStats.map((s) => (
            <Link
              key={s.label}
              to={s.href}
              className="surface app-card-tap rounded-xl p-3 touch-manipulation transition-transform active:scale-[0.98] sm:rounded-2xl sm:p-5 sm:hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between gap-1">
                <s.icon className="size-4 shrink-0 text-primary sm:size-5" />
                <span className="font-display text-xl font-bold tabular-nums sm:text-3xl">{s.value}</span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-xs leading-tight text-muted-foreground group-hover:text-foreground sm:mt-3 sm:line-clamp-none sm:text-sm">
                {s.label}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-3 xl:gap-4">
          <Link
            to="/dashboard/complaints"
            className="surface app-card-tap rounded-xl p-3 touch-manipulation transition-transform active:scale-[0.98] sm:rounded-2xl sm:p-5 sm:hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between gap-1">
              <ClipboardList className="size-4 shrink-0 text-primary sm:size-5" />
              <span className="font-display text-xl font-bold tabular-nums text-warning sm:text-3xl">
                {openTasks.length}
              </span>
            </div>
            <p className="mt-1.5 line-clamp-2 text-[10px] leading-tight text-muted-foreground group-hover:text-foreground sm:mt-3 sm:line-clamp-none sm:text-sm">
              {t("openTasksLabel")}
            </p>
          </Link>
          <Link
            to="/dashboard/complaints"
            className="surface app-card-tap rounded-xl p-3 touch-manipulation transition-transform active:scale-[0.98] sm:rounded-2xl sm:p-5 sm:hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between gap-1">
              <ClipboardList className="size-4 shrink-0 text-primary sm:size-5" />
              <span className="font-display text-xl font-bold tabular-nums sm:text-3xl">{complaints.length}</span>
            </div>
            <p className="mt-1.5 line-clamp-2 text-[10px] leading-tight text-muted-foreground group-hover:text-foreground sm:mt-3 sm:line-clamp-none sm:text-sm">
              {t("totalAssignedLabel")}
            </p>
          </Link>
          <Link
            to="/dashboard/complaints"
            className="surface app-card-tap col-span-2 rounded-xl p-3 touch-manipulation transition-transform active:scale-[0.98] sm:col-span-1 sm:rounded-2xl sm:p-5 sm:hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between gap-1">
              <ClipboardList className="size-4 shrink-0 text-success sm:size-5" />
              <span className="font-display text-xl font-bold tabular-nums text-success sm:text-3xl">
                {resolvedTasks.length}
              </span>
            </div>
            <p className="mt-1.5 line-clamp-2 text-[10px] leading-tight text-muted-foreground group-hover:text-foreground sm:mt-3 sm:line-clamp-none sm:text-sm">
              {t("resolvedTasksLabel")}
            </p>
          </Link>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface rounded-2xl p-5">
          <h2 className="font-semibold">{t("openComplaintsTitle")}</h2>
          <p className="mt-1 text-3xl font-bold text-primary">{open.length}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {(isSuper
              ? (["new", "assigned", "resolved"] as const)
              : (["new", "resolved"] as const)
            ).map((st) => {
              const count = isSuper
                ? complaints.filter((c) => c.status === st).length
                : st === "new"
                  ? complaints.filter((c) => c.status !== "resolved").length
                  : complaints.filter((c) => c.status === "resolved").length;
              return (
              <Link
                key={st}
                to="/dashboard/complaints"
                className="rounded-full bg-secondary px-3 py-2 text-xs touch-manipulation transition-colors hover:bg-primary/20 active:scale-[0.98]"
              >
                {count} — {t(`st_${st}` as "st_new")}
              </Link>
            );
            })}
          </div>
        </section>

        <section className="surface space-y-4 rounded-2xl p-5">
          <h2 className="font-semibold">{t("workflow")}</h2>
          <WorkflowSteps status={(recent[0]?.status ?? "new") as ComplaintStatus} employeeView={!isSuper} />
          <p className="text-xs text-muted-foreground">{t("workflowHint")}</p>
        </section>
      </div>

      <section className="surface rounded-2xl p-5">
        <h2 className="font-semibold">{t("recentComplaints")}</h2>
        {recent.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">{t("noData")}</p>
        ) : (
          <ul className="mt-4 divide-y divide-border/60">
            {recent.map((c) => {
              const branch = state.branches.find((b) => b.id === c.branchId);
              return (
                <li key={c.id} className="flex items-center justify-between gap-2 py-3">
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-primary">{c.ref}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {branch ? (lang === "ar" ? branch.nameAr : branch.nameEn) : ""}
                      {" · "}
                      {c.notes}
                    </p>
                  </div>
                  <StatusBadge status={c.status} employeeView={!isSuper} />
                </li>
              );
            })}
          </ul>
        )}
        <Link
          to="/dashboard/complaints"
          className="mt-3 inline-block text-xs font-semibold text-primary hover:underline"
        >
          {isSuper ? t("complaints") : t("myTasks")} →
        </Link>
      </section>
    </div>
  );
}
