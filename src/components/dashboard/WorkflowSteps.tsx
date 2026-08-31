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
  label,
  done,
  active,
  compact,
}: {
  label: string;
  done: boolean;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <li
      className={cn(
        "flex shrink-0 flex-col items-center gap-1.5",
        compact ? "w-[3.25rem] sm:w-16" : "w-[4.5rem] sm:w-20",
      )}
    >
      <span
        className={cn(
          "relative grid size-7 shrink-0 place-items-center rounded-full transition-colors sm:size-8",
          done && "bg-success text-success-foreground shadow-sm",
          active && !done && "bg-primary text-primary-foreground shadow-md ring-4 ring-primary/20",
          !done && !active && "border-2 border-border/80 bg-background",
        )}
      >
        {done ? (
          <Check className="size-3.5 sm:size-4" strokeWidth={2.5} />
        ) : active ? (
          <span className="size-2 rounded-full bg-primary-foreground" />
        ) : null}
        {active && !done && (
          <span className="absolute -inset-1 animate-ping rounded-full bg-primary/15" aria-hidden />
        )}
      </span>
      <span
        className={cn(
          "line-clamp-2 w-full text-center text-[9px] leading-tight sm:text-[11px]",
          active ? "font-bold text-foreground" : done ? "font-medium text-foreground/80" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </li>
  );
}

function StepperTrack({
  steps,
  labels,
  currentIdx,
}: {
  steps: readonly string[];
  labels: string[];
  currentIdx: number;
}) {
  const compact = steps.length > 3;
  const progress =
    steps.length <= 1 ? 0 : Math.max(0, Math.min(1, currentIdx / (steps.length - 1)));
  const nodeHalf = compact ? "1.625rem" : "2.25rem";

  return (
    <div className={cn("mx-auto w-full", compact ? "max-w-[15rem] sm:max-w-sm" : "max-w-[15rem] sm:max-w-xs")}>
      <div className="relative px-1 sm:px-3">
        <div
          className="absolute top-3.5 h-0.5 rounded-full bg-border sm:top-4"
          style={{ insetInlineStart: nodeHalf, insetInlineEnd: nodeHalf }}
          aria-hidden
        />
        <div
          className="absolute top-3.5 h-0.5 rounded-full bg-success transition-[width] duration-300 sm:top-4"
          style={{
            insetInlineStart: nodeHalf,
            width: `calc((100% - ${compact ? "3.25rem" : "4.5rem"}) * ${progress})`,
          }}
          aria-hidden
        />
        <ol className="relative flex items-start justify-between">
          {steps.map((step, i) => (
            <StepNode
              key={step}
              label={labels[i] ?? step}
              done={i < currentIdx}
              active={i === currentIdx}
              compact={compact}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

function WorkflowStepper({
  steps,
  labels,
  currentIdx,
}: {
  steps: readonly string[];
  labels: string[];
  currentIdx: number;
}) {
  return (
    <div className="flex justify-center rounded-xl border border-border/60 bg-card/80 px-2 py-4 shadow-sm backdrop-blur-sm sm:px-4">
      <StepperTrack steps={steps} labels={labels} currentIdx={currentIdx} />
    </div>
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
      <WorkflowStepper
        steps={EMPLOYEE_STEPS}
        labels={EMPLOYEE_STEPS.map((step) => t(EMPLOYEE_STEP_KEYS[step]))}
        currentIdx={currentIdx}
      />
    );
  }

  const currentIdx = adminStepIndex(status);

  return (
    <WorkflowStepper
      steps={ADMIN_STEPS}
      labels={ADMIN_STEPS.map((step) => t(ADMIN_STEP_KEYS[step]))}
      currentIdx={currentIdx}
    />
  );
}
