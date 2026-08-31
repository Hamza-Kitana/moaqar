import { Link } from "@tanstack/react-router";
import { LogIn, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { useAuthDialog } from "@/components/site/AuthDialog";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const FOOTER_X = "px-6 sm:px-10 lg:px-16 xl:px-24";

function FooterLink({
  to,
  href,
  children,
  onClick,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const className =
    "text-sm text-muted-foreground transition-colors hover:text-foreground touch-manipulation";

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cn(className, "text-start")}>
      {children}
    </button>
  );
}

export function SiteFooter({ className }: { className?: string }) {
  const { t } = useI18n();
  const { me } = useStore();
  const { openLogin } = useAuthDialog();

  const quickLinks = [
    { label: t("footerHome"), to: "/" },
    { label: t("submitComplaint"), to: "/complaint" },
    { label: t("homeContactUs"), href: "/#contact" },
  ] as const;

  const contactItems = [
    { icon: Phone, label: t("contactPhone"), href: `tel:${t("contactPhone").replace(/\s/g, "")}` },
    { icon: Mail, label: t("contactEmail"), href: `mailto:${t("contactEmail")}` },
    { icon: MapPin, label: t("contactAddress") },
  ] as const;

  return (
    <footer className={cn("w-full border-t border-border/60 bg-card", className)}>
      <div className={cn("mx-auto max-w-7xl py-10 sm:py-12", FOOTER_X)}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand — start (يمين في RTL) */}
          <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                الم
              </span>
              <div className="min-w-0">
                <p className="font-display text-base font-semibold leading-tight">{t("brand")}</p>
                <p className="mt-0.5 text-xs text-gold">{t("heroSubtitle")}</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t("tagline")}</p>
            <span className="mt-1 h-0.5 w-12 rounded-full bg-gold/80" aria-hidden />
          </div>

          {/* Quick links — وسط */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
              {t("footerQuickLinks")}
            </h3>
            <nav className="flex flex-col gap-2.5" aria-label={t("footerQuickLinks")}>
              {quickLinks.map((link) => (
                <FooterLink key={link.label} to={"to" in link ? link.to : undefined} href={"href" in link ? link.href : undefined}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Contact — end (شمال في RTL) */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
              {t("contact")}
            </h3>
            <ul className="flex flex-col gap-3">
              {contactItems.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      className="group flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground touch-manipulation"
                    >
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary/12">
                        <Icon className="size-3.5" />
                      </span>
                      <span className="min-w-0 pt-1 leading-snug">{label}</span>
                    </a>
                  ) : (
                    <div className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-primary/8 text-primary">
                        <Icon className="size-3.5" />
                      </span>
                      <span className="min-w-0 pt-1 leading-snug">{label}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-border/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t("brand")}. {t("footerRights")}
          </p>
          {!me && (
            <button
              type="button"
              onClick={() => openLogin()}
              className="inline-flex items-center gap-2 self-start rounded-lg border border-border/70 bg-background px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/25 hover:bg-secondary hover:text-foreground touch-manipulation sm:self-auto"
            >
              <LogIn className="size-3.5 opacity-70" />
              {t("employeeLogin")}
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
