import {
  Building2,
  ClipboardList,
  FileBarChart,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  UserCog,
} from "lucide-react";
import { useMemo, useState } from "react";

import { LangToggle, NotificationBell, ThemeToggle } from "@/components/site/TopControls";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useI18n } from "@/lib/i18n";
import { useStore, visibleComplaints } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";

type NavItem = {
  to: string;
  labelKey: "overview" | "complaints" | "myTasks" | "employees" | "branches" | "reports" | "settings";
  icon: typeof LayoutDashboard;
  show: boolean;
  badge?: number;
};

function NavLink({
  item,
  active,
  compact,
  inSheet,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  compact?: boolean;
  inSheet?: boolean;
  onClick?: () => void;
}) {
  const { t } = useI18n();
  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-xl text-sm transition-colors touch-manipulation",
        compact ? "px-3 py-3" : "px-3 py-2.5",
        inSheet
          ? active
            ? "bg-primary/10 font-semibold text-primary"
            : "text-foreground/80 hover:bg-secondary"
          : active
            ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground",
      )}
    >
      <item.icon className="size-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate">{t(item.labelKey)}</span>
      {item.badge ? (
        <span className="bg-gold grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold">
          {item.badge}
        </span>
      ) : null}
    </Link>
  );
}

export function DashboardLayout() {
  const { t } = useI18n();
  const store = useStore();
  const { me, logout, isSuper } = store;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [moreOpen, setMoreOpen] = useState(false);

  const complaints = useMemo(
    () => (me ? visibleComplaints(store) : []),
    [store.state, store.me, store.isSuper, me],
  );

  if (!me) return null;

  const isEmployee = me.kind === "employee";
  const pendingComplaints = isSuper
    ? complaints.filter((c) => c.status === "new").length
    : complaints.filter((c) => c.status === "assigned" || c.status === "returned").length;

  const nav: NavItem[] = [
    { to: "/dashboard", labelKey: "overview", icon: LayoutDashboard, show: true },
    {
      to: "/dashboard/complaints",
      labelKey: isEmployee ? "myTasks" : "complaints",
      icon: ClipboardList,
      show: true,
      badge: pendingComplaints || undefined,
    },
    { to: "/dashboard/reports", labelKey: "reports", icon: FileBarChart, show: isSuper },
    { to: "/dashboard/employees", labelKey: "employees", icon: UserCog, show: isSuper },
    { to: "/dashboard/branches", labelKey: "branches", icon: Building2, show: isSuper },
    { to: "/dashboard/settings", labelKey: "settings", icon: Settings, show: isSuper },
  ];

  const visibleNav = nav.filter((n) => n.show);
  const isActive = (to: string) =>
    to === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(to);

  const bottomPrimary = visibleNav.filter((n) =>
    ["/dashboard", "/dashboard/complaints", "/dashboard/reports"].includes(n.to),
  );
  const bottomMoreItems = visibleNav.filter((n) => !bottomPrimary.some((p) => p.to === n.to));
  const moreActive = bottomMoreItems.some((n) => isActive(n.to));
  const currentPage = visibleNav.find((n) => isActive(n.to));

  const handleLogout = () => {
    setMoreOpen(false);
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-[100dvh] lg:flex">
      <aside className="hidden border-e border-sidebar-border bg-sidebar text-sidebar-foreground print:hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border px-4">
          <span className="bg-gold grid size-9 place-items-center rounded-xl text-sm font-bold">الم</span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{t("brand")}</p>
            <p className="truncate text-[11px] text-sidebar-foreground/65">{me.name}</p>
            <p className="truncate text-[10px] text-gold">
              {isSuper ? t("superAdmin") : t("employeeRole")}
            </p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          {visibleNav.map((item) => (
            <NavLink key={item.to} item={item} active={isActive(item.to)} />
          ))}
        </nav>
        <div className="shrink-0 border-t border-sidebar-border p-3">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            {t("logout")}
          </Button>
        </div>
      </aside>

      <div className="flex min-h-[100dvh] flex-1 flex-col lg:ms-64 print:ms-0">
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border/60 bg-background/85 px-3 backdrop-blur-xl sm:px-4 print:hidden supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
          <div className="flex min-w-0 items-center">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {currentPage ? t(currentPage.labelKey) : t("dashboard")}
              </p>
              <p className="truncate text-[11px] text-muted-foreground lg:hidden">{me.name}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-0.5">
            <ThemeToggle compact />
            <LangToggle compact />
            <NotificationBell />
            <Button
              variant="ghost"
              size="iconLg"
              className="touch-manipulation text-destructive hover:bg-destructive/10 hover:text-destructive lg:hidden"
              onClick={handleLogout}
              aria-label={t("logout")}
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </header>

        <main className="flex-1 p-3 sm:p-4 md:p-6 pb-safe-nav lg:pb-6 print:p-0">
          <Outlet />
        </main>
      </div>

      <nav className="app-bottom-nav print:hidden lg:hidden" aria-label={t("dashboard")}>
        <div className="mx-auto flex max-w-lg items-stretch justify-around px-1 pt-1">
          {bottomPrimary.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2.5 touch-manipulation transition-colors touch-target",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {active && (
                  <span className="absolute inset-x-3 top-1 h-0.5 rounded-full bg-primary" aria-hidden />
                )}
                <span className="relative">
                  <item.icon className={cn("size-5", active && "stroke-[2.5]")} />
                  {item.badge ? (
                    <span className="bg-gold absolute -end-1.5 -top-1.5 grid min-w-4 place-items-center rounded-full px-1 text-[9px] font-bold text-primary">
                      {item.badge}
                    </span>
                  ) : null}
                </span>
                <span className={cn("max-w-full truncate text-[11px] font-medium sm:text-xs", active && "font-semibold")}>
                  {t(item.labelKey)}
                </span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            className={cn(
              "relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2.5 touch-manipulation transition-colors touch-target",
              moreActive || moreOpen ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Menu className={cn("size-5", (moreActive || moreOpen) && "stroke-[2.5]")} />
            <span className={cn("text-[11px] font-medium sm:text-xs", (moreActive || moreOpen) && "font-semibold")}>
              {t("more")}
            </span>
          </button>
        </div>
      </nav>

      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl px-4 pb-safe-nav pt-6">
          <SheetHeader className="mb-4 text-start">
            <SheetTitle>{me.name}</SheetTitle>
            <p className="text-xs text-muted-foreground">
              {isSuper ? t("superAdmin") : t("employeeRole")}
            </p>
          </SheetHeader>
          <nav className="grid gap-1">
            {bottomMoreItems.map((item) => (
              <NavLink
                key={item.to}
                item={item}
                active={isActive(item.to)}
                compact
                inSheet
                onClick={() => setMoreOpen(false)}
              />
            ))}
            <Button
              variant="ghost"
              className={cn(
                "h-12 w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive touch-manipulation",
                bottomMoreItems.length > 0 && "mt-2",
              )}
              onClick={handleLogout}
            >
              <LogOut className="size-4" />
              {t("logout")}
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
