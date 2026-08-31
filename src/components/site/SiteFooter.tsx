import { LogIn } from "lucide-react";

import { useAuthDialog } from "@/components/site/AuthDialog";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SiteFooter({ className }: { className?: string }) {
  const { t } = useI18n();
  const { me } = useStore();
  const { openLogin } = useAuthDialog();

  return (
    <footer className={cn("w-full border-t border-border/60 bg-card py-10 sm:py-12", className)}>
      <div className="flex w-full flex-col items-center gap-3 px-6 text-center sm:px-10 lg:px-16 xl:px-24">
        <span className="grid size-10 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
          الم
        </span>
        <p className="font-display text-sm font-semibold">{t("brand")}</p>
        <p className="max-w-lg text-xs text-muted-foreground">{t("tagline")}</p>
        {!me && (
          <button
            type="button"
            onClick={() => openLogin()}
            className="mt-1 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground touch-manipulation"
          >
            <LogIn className="size-3.5 opacity-70" />
            {t("employeeLogin")}
          </button>
        )}
        <p className="text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} {t("brand")}
        </p>
      </div>
    </footer>
  );
}
