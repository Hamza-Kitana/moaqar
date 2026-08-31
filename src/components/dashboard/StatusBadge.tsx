import { Badge } from "@/components/ui/badge";
import { useI18n, type TKey } from "@/lib/i18n";
import {
  employeeDisplayStatus,
  type ComplaintStatus,
  type EmployeeReportOutcome,
} from "@/lib/store";
import { cn } from "@/lib/utils";

const statusKey: Record<ComplaintStatus, TKey> = {
  new: "st_new",
  assigned: "st_assigned",
  returned: "st_returned",
  pending_review: "st_pending_review",
  closed: "st_closed",
};

const statusClass: Record<ComplaintStatus, string> = {
  new: "border-transparent bg-primary/10 text-primary",
  assigned: "border-transparent bg-warning/10 text-warning",
  returned: "border-transparent bg-destructive/10 text-destructive",
  pending_review: "border-transparent bg-accent/15 text-accent-foreground",
  closed: "border-transparent bg-success/10 text-success",
};

const employeeKey: Record<ReturnType<typeof employeeDisplayStatus>, TKey> = {
  assigned: "st_new",
  returned: "st_returned",
  pending_review: "st_pending_review",
  unresolved: "st_unresolved",
  closed: "st_closed",
};

const employeeClass: Record<ReturnType<typeof employeeDisplayStatus>, string> = {
  assigned: statusClass.assigned,
  returned: statusClass.returned,
  pending_review: statusClass.pending_review,
  unresolved: "border-transparent bg-destructive/10 text-destructive",
  closed: statusClass.closed,
};

export function StatusBadge({
  status,
  employeeView = false,
  reportOutcome,
}: {
  status: ComplaintStatus;
  employeeView?: boolean;
  reportOutcome?: EmployeeReportOutcome | null;
}) {
  const { t } = useI18n();

  if (!employeeView && status === "pending_review" && reportOutcome === "unresolved") {
    return (
      <Badge
        variant="outline"
        className={cn("text-[10px] font-semibold shadow-none", employeeClass.unresolved)}
      >
        {t("st_unresolved")}
      </Badge>
    );
  }

  const display = employeeView ? employeeDisplayStatus(status, reportOutcome) : status;
  const key = employeeView ? employeeKey[display] : statusKey[display];
  const cls = employeeView ? employeeClass[display] : statusClass[display];

  return (
    <Badge variant="outline" className={cn("text-[10px] font-semibold shadow-none", cls)}>
      {t(key)}
    </Badge>
  );
}
