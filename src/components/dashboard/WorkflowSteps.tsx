import { Check } from "lucide-react";

import { useI18n, type TKey } from "@/lib/i18n";
import type { ComplaintStatus } from "@/lib/store";
import { cn } from "@/lib/utils";

const ADMIN_STEPS: ComplaintStatus[] = ["new", "assigned", "pending_review", "closed"];

const ADMIN_STEP_KEYS: Record<ComplaintStatus, TKey> = {
  new: "st_new",
  assigned: "st_assigned",
  pending_review: "st_pending_review",
  closed: "st_closed",
};

const EMPLOYEE_STEPS = ["assigned", "pending_review", "closed"] as const;

const EMPLOYEE_STEP_KEYS: Record<(typeof EMPLOYEE_STEPS)[number], TKey> = {
  assigned: "st_new",
  pending_review: "st_pending_review",
  closed: "st_closed",
};

function adminStepIndex(status: ComplaintStatus): number {
  const idx = ADMIN_STEPS.indexOf(status);
  return idx >= 0 ? idx : 0;
}

function employeeStepIndex(status: ComplaintStatus): number {
  if (status === "closed") return 2;
  if (status === "pending_review") return 1;
  return 0;
}

function StepNode({
  index,
  label,
  done,
  active,
  isLast,
}: {
  index: number;
  label: string;
  done: boolean;
  active: boolean;
  isLast: boolean;
}) {
  return (
    <li className="flex min-w-0 flex-1 items-start">
      <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
        <span
          className={cn(
            "relative grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-bold ring-2 ring-offset-2 ring-offset-secondary/60 transition-colors",
            done && "bg-success text-success-foreground ring-success/30",
            active && !done && "bg-primary text-primary-foreground shadow-md ring-primary/25",
            !done && !active && "bg-card text-muted-foreground ring-border/80",
          )}
        >
          {done ? <Check className="size-4" strokeWidth={2.5} /> : index + 1}
          {active && !done && (
            <span className="absolute -inset-0.5 animate-ping rounded-full bg-primary/20" aria-hidden />
          )}
        </span>
        <span
          className={cn(
            "line-clamp-2 min-h-[2rem] text-[10px] leading-tight sm:text-[11px]",
            active ? "font-bold text-foreground" : done ? "font-medium text-foreground/80" : "text-muted-foreground",
          )}
        >
          {label}
        </span>
      </div>
      {!isLast && (
        <div
          className={cn(
            "mx-1.5 mt-4 h-0.5 min-w-3 flex-1 rounded-full transition-colors",
            done ? "bg-success/80" : "bg-border",
          )}
          aria-hidden
        />
      )}
    </li>
  );
}

export function WorkflowSteps({
  status,
  employeeView = false,
}: {
  status: ComplaintStatus;
  employeeView?: boolean;
}) {
  const { t } = useI18n();

  if (employeeView) {
    const currentIdx = employeeStepIndex(status);
    return (
      <div className="rounded-xl border border-border/60 bg-card/80 px-3 py-4 shadow-sm backdrop-blur-sm sm:px-4">
        <ol className="flex w-full min-w-0 items-start">
          {EMPLOYEE_STEPS.map((step, i) => (
            <StepNode
              key={step}
              index={i}
              label={t(EMPLOYEE_STEP_KEYS[step])}
              done={i < currentIdx}
              active={i === currentIdx}
              isLast={i === EMPLOYEE_STEPS.length - 1}
            />
          ))}
        </ol>
      </div>
    );
  }

  const currentIdx = adminStepIndex(status);

  return (
    <div className="rounded-xl border border-border/60 bg-card/80 px-3 py-4 shadow-sm backdrop-blur-sm sm:px-4">
      <ol className="flex w-full min-w-0 items-start">
        {ADMIN_STEPS.map((step, i) => (
          <StepNode
            key={step}
            index={i}
            label={t(ADMIN_STEP_KEYS[step])}
            done={i < currentIdx}
            active={i === currentIdx}
            isLast={i === ADMIN_STEPS.length - 1}
          />
        ))}
      </ol>
    </div>
  );
}
