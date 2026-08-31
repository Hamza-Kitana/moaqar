import { Badge } from "@/components/ui/badge";
import { useI18n, type TKey } from "@/lib/i18n";
import type { ComplaintStatus } from "@/lib/store";
import { cn } from "@/lib/utils";

const statusKey: Record<ComplaintStatus, TKey> = {
  new: "st_new",
  assigned: "st_assigned",
  resolved: "st_resolved",
};

const statusClass: Record<ComplaintStatus, string> = {
  new: "border-transparent bg-primary/10 text-primary",
  assigned: "border-transparent bg-warning/10 text-warning",
  resolved: "border-transparent bg-success/10 text-success",
};

export function StatusBadge({
  status,
  employeeView = false,
}: {
  status: ComplaintStatus;
  employeeView?: boolean;
}) {
  const { t } = useI18n();
  const display = employeeView ? (status === "resolved" ? "resolved" : "new") : status;
  return (
    <Badge variant="outline" className={cn("text-[10px] font-semibold shadow-none", statusClass[display])}>
      {t(statusKey[display])}
    </Badge>
  );
}
