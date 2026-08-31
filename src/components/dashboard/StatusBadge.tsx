import { Badge } from "@/components/ui/badge";
import { useI18n, type TKey } from "@/lib/i18n";
import { employeeDisplayStatus, type ComplaintStatus } from "@/lib/store";
import { cn } from "@/lib/utils";

const statusKey: Record<ComplaintStatus, TKey> = {
  new: "st_new",
  assigned: "st_assigned",
  pending_review: "st_pending_review",
  closed: "st_closed",
};

const statusClass: Record<ComplaintStatus, string> = {
  new: "border-transparent bg-primary/10 text-primary",
  assigned: "border-transparent bg-warning/10 text-warning",
  pending_review: "border-transparent bg-accent/15 text-accent-foreground",
  closed: "border-transparent bg-success/10 text-success",
};

const employeeKey: Record<ReturnType<typeof employeeDisplayStatus>, TKey> = {
  new: "st_new",
  pending_review: "st_pending_review",
  closed: "st_closed",
};

const employeeClass: Record<ReturnType<typeof employeeDisplayStatus>, string> = {
  new: statusClass.assigned,
  pending_review: statusClass.pending_review,
  closed: statusClass.closed,
};

export function StatusBadge({
  status,
  employeeView = false,
}: {
  status: ComplaintStatus;
  employeeView?: boolean;
}) {
  const { t } = useI18n();
  const display = employeeView ? employeeDisplayStatus(status) : status;
  const key = employeeView ? employeeKey[display] : statusKey[display];
  const cls = employeeView ? employeeClass[display] : statusClass[display];

  return (
    <Badge variant="outline" className={cn("text-[10px] font-semibold shadow-none", cls)}>
      {t(key)}
    </Badge>
  );
}
