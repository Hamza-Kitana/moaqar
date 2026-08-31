import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode, useEffect, useState } from "react";

import appCss from "../styles.css?url";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { StoreProvider, useStore } from "@/lib/store";
import { ThemeProvider, useTheme } from "@/lib/theme";
import { AuthDialogProvider } from "@/components/site/AuthDialog";
import { LoadingScreen } from "@/components/site/LoadingScreen";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t("notFound")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("notFoundDesc")}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("goHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{t("errorTitle")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("errorDesc")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("tryAgain")}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("goHome")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#1e2a44" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "author", content: "Al-Muwaqar Trading" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800&family=Sora:wght@500;700&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("mwq.theme");if(t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})();`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `#app-splash{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#ebe4d6;font-family:Cairo,sans-serif}#app-splash .logo{width:4.5rem;height:4.5rem;border-radius:1rem;background:#1e2a44;color:#f5e6c8;display:grid;place-items:center;font-weight:800;font-size:1.35rem;box-shadow:0 12px 40px rgba(30,42,68,.18)}#app-splash .name{margin-top:1.25rem;font-weight:700;color:#1e2a44;font-size:1rem}#app-splash .bar{margin-top:1.75rem;width:9rem;height:5px;border-radius:999px;background:rgba(30,42,68,.1);overflow:hidden}#app-splash .bar span{display:block;height:100%;width:40%;border-radius:999px;background:#c9a962;animation:sp 1.3s ease-in-out infinite}@keyframes sp{0%{transform:translateX(-120%)}50%{transform:translateX(180%)}100%{transform:translateX(-120%)}}html.dark #app-splash{background:#141c2e}html.dark #app-splash .logo{background:#243252}html.dark #app-splash .name{color:#ebe4d6}`,
          }}
        />
      </head>
      <body>
        <div id="app-splash" aria-hidden="true">
          <div className="logo">الم</div>
          <p className="name">شركة الموقر التجارية</p>
          <div className="bar">
            <span />
          </div>
        </div>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ThemedToaster() {
  const { theme } = useTheme();
  return <Toaster position="top-center" theme={theme} />;
}

function AppShell() {
  const { hydrated } = useStore();
  const isNavigating = useRouterState({ select: (s) => s.isLoading });
  const [bootReady, setBootReady] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    const splash = document.getElementById("app-splash");
    if (splash) splash.remove();
    const timer = window.setTimeout(() => setBootReady(true), 420);
    return () => window.clearTimeout(timer);
  }, [hydrated]);

  if (!hydrated || !bootReady) {
    return <LoadingScreen variant="splash" />;
  }

  return (
    <>
      {isNavigating ? <LoadingScreen variant="route" /> : null}
      <AuthDialogProvider>
        <Outlet />
        <ThemedToaster />
      </AuthDialogProvider>
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <StoreProvider>
            <AppShell />
          </StoreProvider>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
