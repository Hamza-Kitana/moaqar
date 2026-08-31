import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LoadingScreenProps = {
  /** Lighter overlay for in-app route transitions */
  variant?: "splash" | "route";
  className?: string;
};

export function LoadingScreen({ variant = "splash", className }: LoadingScreenProps) {
  const { t } = useI18n();

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden",
        variant === "splash" ? "bg-background" : "bg-background/80 backdrop-blur-md",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={t("loading")}
    >
      {variant === "splash" && (
        <>
          <div className="loader-bg-glow pointer-events-none absolute inset-0" />
          <div className="loader-bg-grid pointer-events-none absolute inset-0 opacity-[0.35]" />
        </>
      )}

      <div className="loader-rise relative flex flex-col items-center px-6 text-center">
        <div className="loader-logo-ring relative grid size-20 place-items-center rounded-3xl bg-primary shadow-[var(--shadow-elegant)] sm:size-24">
          <span className="font-display text-2xl font-bold text-primary-foreground sm:text-3xl">الم</span>
          <span className="loader-orbit absolute inset-0 rounded-3xl border-2 border-gold/40" aria-hidden />
        </div>

        <p className="mt-6 font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
          {t("brand")}
        </p>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">{t("loadingDesc")}</p>

        <div className="mt-8 w-48 overflow-hidden rounded-full bg-secondary sm:w-56">
          <div className="loader-bar h-1.5 rounded-full bg-gold" />
        </div>

        <p className="mt-4 text-xs font-medium text-muted-foreground/80">{t("loading")}</p>
      </div>
    </div>
  );
}
