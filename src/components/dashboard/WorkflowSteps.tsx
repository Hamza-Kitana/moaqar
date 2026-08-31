import { Check } from "lucide-react";

import { useI18n } from "@/lib/i18n";
import type { ComplaintStatus } from "@/lib/store";
import { cn } from "@/lib/utils";

const ADMIN_STEPS: ComplaintStatus[] = ["new", "assigned", "resolved"];
const EMPLOYEE_STEPS = ["new", "resolved"] as const;

const stepKey: Record<ComplaintStatus, "st_new" | "st_assigned" | "st_resolved"> = {
  new: "st_new",
  assigned: "st_assigned",
  resolved: "st_resolved",
};

export function WorkflowSteps({
  status,
  employeeView = false,
}: {
  status: ComplaintStatus;
  employeeView?: boolean;
}) {
  const { t } = useI18n();

  if (employeeView) {
    const currentIdx = status === "resolved" ? 1 : 0;
    return (
      <ol className="flex w-full min-w-0 items-start">
        {EMPLOYEE_STEPS.map((step, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx;
          return (
            <li key={step} className="flex min-w-0 flex-1 items-start">
              <div className="flex min-w-0 flex-col items-center gap-1.5 text-center">
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-bold",
                    done && "bg-success text-success-foreground",
                    active && "bg-primary text-primary-foreground shadow-sm",
                    !done && !active && "bg-secondary text-muted-foreground",
                  )}
                >
                  {done ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "line-clamp-2 text-[10px] leading-tight",
                    active ? "font-semibold text-foreground" : "text-muted-foreground",
                  )}
                >
                  {t(stepKey[step])}
                </span>
              </div>
              {i < EMPLOYEE_STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-1 mt-3.5 h-0.5 min-w-2 flex-1 rounded-full",
                    done ? "bg-success/70" : "bg-border",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    );
  }

  const currentIdx = ADMIN_STEPS.indexOf(status);

  return (
    <ol className="flex w-full min-w-0 items-start">
      {ADMIN_STEPS.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <li key={step} className="flex min-w-0 flex-1 items-start">
            <div className="flex min-w-0 flex-col items-center gap-1.5 text-center">
              <span
                className={cn(
                  "grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-bold",
                  done && "bg-success text-success-foreground",
                  active && "bg-primary text-primary-foreground shadow-sm",
                  !done && !active && "bg-secondary text-muted-foreground",
                )}
              >
                {done ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span
                className={cn(
                  "line-clamp-2 text-[10px] leading-tight",
                  active ? "font-semibold text-foreground" : "text-muted-foreground",
                )}
              >
                {t(stepKey[step])}
              </span>
            </div>
            {i < ADMIN_STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-1 mt-3.5 h-0.5 min-w-2 flex-1 rounded-full",
                  done ? "bg-success/70" : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
