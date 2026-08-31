import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

import { useAuthDialog } from "@/components/site/AuthDialog";
import { LangToggle, NotificationBell, ThemeToggle } from "@/components/site/TopControls";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 48;

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const { t } = useI18n();
  const { me, logout } = useStore();
  const { openLogin } = useAuthDialog();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = transparent || pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const overHero = isHome && !scrolled;

  return (
    <header
      className={cn(
        "z-50 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]",
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0",
        overHero
          ? "border-b border-white/10 bg-transparent shadow-none"
          : "border-b border-border/70 bg-background/92 shadow-sm backdrop-blur-xl",
      )}
    >
      <div
        className={cn(
          "flex h-14 w-full items-center justify-between gap-2 px-4 sm:h-16 sm:gap-4 sm:px-8 lg:px-14 xl:px-20",
          overHero && "bg-gradient-to-b from-black/45 via-black/15 to-transparent",
        )}
      >
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-xl font-display text-xs font-bold sm:size-9 sm:text-sm",
              overHero ? "bg-gold text-gold-foreground shadow-lg" : "bg-primary text-primary-foreground",
            )}
          >
            الم
          </span>
          <span
            className={cn(
              "truncate font-display text-sm font-semibold sm:text-base max-[360px]:max-w-[7.5rem]",
              overHero
                ? "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]"
                : "text-foreground",
            )}
          >
            {t("brand")}
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <ThemeToggle compact overHero={overHero} />
          <LangToggle compact overHero={overHero} />
          <NotificationBell overHero={overHero} />
          {me ? (
            <>
              <Button
                asChild
                size="iconLg"
                className="touch-manipulation bg-gold text-gold-foreground shadow-md hover:opacity-90 sm:hidden"
              >
                <Link to="/dashboard">
                  <LayoutDashboard className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="hidden gap-2 bg-gold text-gold-foreground shadow-md hover:opacity-90 sm:inline-flex"
              >
                <Link to="/dashboard">
                  <LayoutDashboard className="size-4" />
                  {t("dashboard")}
                </Link>
              </Button>
              <Button
                size="iconLg"
                variant="ghost"
                className={cn(
                  "touch-manipulation sm:hidden",
                  overHero ? "text-white hover:bg-white/15 hover:text-white" : "",
                )}
                onClick={logout}
              >
                <LogOut className="size-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className={cn(
                  "hidden sm:inline-flex",
                  overHero ? "text-white hover:bg-white/15 hover:text-white" : "",
                )}
                onClick={logout}
              >
                {t("logout")}
              </Button>
            </>
          ) : (
            <Button
              size="lg"
              className={cn(
                "h-11 gap-2 touch-manipulation shadow-md",
                overHero ? "bg-gold text-gold-foreground hover:opacity-90" : "",
              )}
              onClick={() => openLogin()}
            >
              <LogIn className="size-4" />
              <span className="hidden min-[400px]:inline">{t("login")}</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
