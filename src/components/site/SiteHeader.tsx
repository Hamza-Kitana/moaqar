import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ClipboardList, LayoutDashboard, LogOut, Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { LangToggle, NotificationBell, ThemeToggle } from "@/components/site/TopControls";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 48;

export function SiteHeader({ transparent = false }: { transparent?: boolean }) {
  const { t } = useI18n();
  const { me, logout } = useStore();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [accountOpen, setAccountOpen] = useState(false);

  const handleLogout = () => {
    setAccountOpen(false);
    logout();
    if (pathname.startsWith("/dashboard")) {
      navigate({ to: "/" });
    }
  };
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
                size="sm"
                className="hidden gap-2 bg-gold text-gold-foreground shadow-md hover:opacity-90 sm:inline-flex"
              >
                <Link to="/dashboard">
                  <LayoutDashboard className="size-4" />
                  {t("dashboard")}
                </Link>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className={cn(
                  "hidden sm:inline-flex",
                  overHero ? "text-white hover:bg-white/15 hover:text-white" : "",
                )}
                onClick={handleLogout}
              >
                {t("logout")}
              </Button>
              <Button
                type="button"
                size="iconLg"
                variant="outline"
                className={cn(
                  "touch-manipulation sm:hidden",
                  overHero
                    ? "border-white/25 bg-white/10 text-white hover:bg-white/15 hover:text-white"
                    : "",
                )}
                onClick={() => setAccountOpen(true)}
                aria-label={t("accountMenu")}
              >
                <Menu className="size-4" />
              </Button>
              <Sheet open={accountOpen} onOpenChange={setAccountOpen}>
                <SheetContent side="bottom" className="rounded-t-3xl px-4 pb-safe-nav pt-6">
                  <SheetHeader className="mb-4 text-start">
                    <SheetTitle>{me.name}</SheetTitle>
                    <p className="text-xs text-muted-foreground">
                      {me.kind === "super" ? t("superAdmin") : t("employeeRole")}
                    </p>
                  </SheetHeader>
                  <nav className="grid gap-1">
                    <Button
                      asChild
                      variant="ghost"
                      className="h-12 w-full justify-start gap-3 touch-manipulation"
                      onClick={() => setAccountOpen(false)}
                    >
                      <Link to="/dashboard">
                        <LayoutDashboard className="size-4" />
                        {t("dashboard")}
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="mt-1 h-12 w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive touch-manipulation"
                      onClick={handleLogout}
                    >
                      <LogOut className="size-4" />
                      {t("logout")}
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <>
              <Button
                asChild
                size="sm"
                variant="ghost"
                className={cn(
                  "hidden gap-2 touch-manipulation sm:inline-flex",
                  overHero ? "text-white hover:bg-white/15 hover:text-white" : "",
                )}
              >
                <Link to="/complaint">
                  <ClipboardList className="size-4" />
                  {t("submitComplaint")}
                </Link>
              </Button>
              <Button
                asChild
                size="iconLg"
                className={cn(
                  "touch-manipulation sm:hidden",
                  overHero ? "text-white hover:bg-white/15" : "",
                )}
                variant="ghost"
              >
                <Link to="/complaint" aria-label={t("submitComplaint")}>
                  <ClipboardList className="size-4" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
