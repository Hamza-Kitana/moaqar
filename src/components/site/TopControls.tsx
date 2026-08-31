import { Bell, Globe, Moon, Sun } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useI18n } from "@/lib/i18n";
import { formatDateTime } from "@/lib/format";
import { useStore } from "@/lib/store";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function LangToggle({ compact = false, overHero = false }: { compact?: boolean; overHero?: boolean }) {
  const { toggle, t } = useI18n();
  return (
    <Button
      variant="ghost"
      size={compact ? "iconLg" : "sm"}
      onClick={toggle}
      className={cn(compact ? "touch-manipulation" : "gap-2", overHero && "text-white hover:bg-white/10 hover:text-white")}
    >
      <Globe className="size-4" />
      {!compact && <span className="text-xs font-semibold">{t("language")}</span>}
    </Button>
  );
}

export function ThemeToggle({ compact = false, overHero = false }: { compact?: boolean; overHero?: boolean }) {
  const { t } = useI18n();
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="iconLg"
      onClick={toggle}
      className={cn("relative touch-manipulation", overHero && "text-white hover:bg-white/10 hover:text-white")}
      aria-label={t("toggleTheme")}
      title={isDark ? t("themeLight") : t("themeDark")}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}

export function NotificationBell({ overHero = false }: { overHero?: boolean }) {
  const { t, lang } = useI18n();
  const { myNotifications, markNotificationsRead, me } = useStore();
  if (!me) return null;
  const unread = myNotifications.filter((n) => !n.read).length;
  const badgeLabel = unread > 99 ? "99+" : unread > 9 ? "9+" : String(unread);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="iconLg"
          className={cn("relative touch-manipulation", overHero && "text-white hover:bg-white/10 hover:text-white")}
          aria-label={
            unread > 0
              ? `${t("notifications")} — ${unread}`
              : t("notifications")
          }
        >
          <Bell className={cn("size-5", unread > 0 && "stroke-[2]")} />
          {unread > 0 && (
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute top-0.5 end-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full px-1 text-[10px] font-bold leading-none tabular-nums shadow-md ring-2",
                badgeLabel.length > 1 && "min-w-[1.375rem] px-1",
                overHero
                  ? "bg-primary text-primary-foreground ring-white/95"
                  : "bg-destructive text-white ring-background",
              )}
            >
              {badgeLabel}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(20rem,calc(100vw-1.5rem))] p-0">
        <div className="flex items-center justify-between border-b px-3 py-2">
          <span className="text-sm font-semibold">{t("notifications")}</span>
          <Button variant="ghost" size="sm" onClick={markNotificationsRead} className="text-xs">
            {t("markAllRead")}
          </Button>
        </div>
        <ScrollArea className="max-h-72">
          {myNotifications.length === 0 && (
            <p className="p-4 text-center text-xs text-muted-foreground">{t("noNotifications")}</p>
          )}
          <ul className="divide-y">
            {myNotifications.slice(0, 30).map((n) => (
              <li key={n.id} className={n.read ? "opacity-60" : ""}>
                <Link
                  to={n.link ?? "/dashboard"}
                  className="block px-3 py-3 text-xs hover:bg-secondary/60 touch-manipulation"
                >
                  <p className="font-medium">{lang === "ar" ? n.textAr : n.textEn}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {formatDateTime(n.at, lang)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
