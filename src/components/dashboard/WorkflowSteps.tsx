import { Check } from "lucide-react";

import { useI18n, type TKey } from "@/lib/i18n";
import type { ComplaintStatus, EmployeeReportOutcome } from "@/lib/store";
import { cn } from "@/lib/utils";

const ADMIN_FLOW: ComplaintStatus[] = ["new", "assigned", "pending_review", "closed"];
const EMPLOYEE_FLOW = ["assigned", "pending_review", "closed"] as const;

function adminStepIndex(status: ComplaintStatus): number {
  switch (status) {
    case "new":
      return 0;
    case "assigned":
    case "returned":
      return 1;
    case "pending_review":
      return 2;
    case "closed":
      return 3;
    default:
      return 0;
  }
}

function employeeStepIndex(status: ComplaintStatus): number {
  if (status === "closed") return 2;
  if (status === "pending_review") return 1;
  return 0;
}

function adminStepLabel(
  step: ComplaintStatus,
  status: ComplaintStatus,
  reportOutcome: EmployeeReportOutcome | null | undefined,
): TKey {
  if (step === "assigned") {
    return status === "returned" ? "st_returned" : "st_assigned";
  }
  if (step === "pending_review") {
    if (reportOutcome === "unresolved") return "st_unresolved";
    return "st_pending_review";
  }
  return step === "new" ? "st_new" : "st_closed";
}

function employeeStepLabel(
  step: (typeof EMPLOYEE_FLOW)[number],
  status: ComplaintStatus,
  reportOutcome: EmployeeReportOutcome | null | undefined,
): TKey {
  if (step === "assigned") {
    return status === "returned" ? "st_returned" : "st_new";
  }
  if (step === "pending_review") {
    if (reportOutcome === "unresolved") return "st_unresolved";
    return "st_pending_review";
  }
  return "st_closed";
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
  allComplete = false,
}: {
  steps: readonly string[];
  labels: string[];
  currentIdx: number;
  allComplete?: boolean;
}) {
  const compact = steps.length > 3;
  const progress = allComplete
    ? 1
    : steps.length <= 1
      ? 0
      : Math.max(0, Math.min(1, currentIdx / (steps.length - 1)));
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
              done={allComplete || i < currentIdx}
              active={!allComplete && i === currentIdx}
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
  allComplete = false,
}: {
  steps: readonly string[];
  labels: string[];
  currentIdx: number;
  allComplete?: boolean;
}) {
  return (
    <div className="flex justify-center rounded-xl border border-border/60 bg-card/80 px-2 py-4 shadow-sm backdrop-blur-sm sm:px-4">
      <StepperTrack steps={steps} labels={labels} currentIdx={currentIdx} allComplete={allComplete} />
    </div>
  );
}

export function WorkflowSteps({
  status,
  employeeView = false,
  reportOutcome,
}: {
  status: ComplaintStatus;
  employeeView?: boolean;
  reportOutcome?: EmployeeReportOutcome | null;
}) {
  const { t } = useI18n();
  const allComplete = status === "closed";

  if (employeeView) {
    const currentIdx = employeeStepIndex(status);
    return (
      <WorkflowStepper
        steps={EMPLOYEE_FLOW}
        labels={EMPLOYEE_FLOW.map((step) => t(employeeStepLabel(step, status, reportOutcome)))}
        currentIdx={currentIdx}
        allComplete={allComplete}
      />
    );
  }

  const currentIdx = adminStepIndex(status);

  return (
    <WorkflowStepper
      steps={ADMIN_FLOW}
      labels={ADMIN_FLOW.map((step) => t(adminStepLabel(step, status, reportOutcome)))}
      currentIdx={currentIdx}
      allComplete={allComplete}
    />
  );
}
