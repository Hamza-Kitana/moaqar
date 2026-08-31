import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as StoreProvider, l as useI18n, o as cn, r as I18nProvider, u as useStore } from "./utils-mpiaTXtw.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AuthDialogProvider } from "./AuthDialog-DmK8ZMNh.mjs";
import { n as useTheme, t as ThemeProvider } from "./theme-Dg3XWKnY.mjs";
import { t as Route$10 } from "./complaints-q-vkJ63X.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C4rd0Wgk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C10Xcev0.css";
function LoadingScreen({ variant = "splash", className }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden", variant === "splash" ? "bg-background" : "bg-background/80 backdrop-blur-md", className),
		role: "status",
		"aria-live": "polite",
		"aria-busy": "true",
		"aria-label": t("loading"),
		children: [variant === "splash" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "loader-bg-glow pointer-events-none absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "loader-bg-grid pointer-events-none absolute inset-0 opacity-[0.35]" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "loader-rise relative flex flex-col items-center px-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "loader-logo-ring relative grid size-20 place-items-center rounded-3xl bg-primary shadow-[var(--shadow-elegant)] sm:size-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl font-bold text-primary-foreground sm:text-3xl",
						children: "الم"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "loader-orbit absolute inset-0 rounded-3xl border-2 border-gold/40",
						"aria-hidden": true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-display text-lg font-bold tracking-tight text-foreground sm:text-xl",
					children: t("brand")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xs text-sm text-muted-foreground",
					children: t("loadingDesc")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 w-48 overflow-hidden rounded-full bg-secondary sm:w-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "loader-bar h-1.5 rounded-full bg-gold" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs font-medium text-muted-foreground/80",
					children: t("loading")
				})
			]
		})]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: t("notFound")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: t("notFoundDesc")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: t("goHome")
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: t("errorTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: t("errorDesc")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: t("tryAgain")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: t("goHome")
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#1e2a44"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "default"
			},
			{
				name: "author",
				content: "Al-Muwaqar Trading"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800&family=Sora:wght@500;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `(function(){try{var t=localStorage.getItem("mwq.theme");if(t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})();` } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { dangerouslySetInnerHTML: { __html: `#app-splash{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#ebe4d6;font-family:Cairo,sans-serif}#app-splash .logo{width:4.5rem;height:4.5rem;border-radius:1rem;background:#1e2a44;color:#f5e6c8;display:grid;place-items:center;font-weight:800;font-size:1.35rem;box-shadow:0 12px 40px rgba(30,42,68,.18)}#app-splash .name{margin-top:1.25rem;font-weight:700;color:#1e2a44;font-size:1rem}#app-splash .bar{margin-top:1.75rem;width:9rem;height:5px;border-radius:999px;background:rgba(30,42,68,.1);overflow:hidden}#app-splash .bar span{display:block;height:100%;width:40%;border-radius:999px;background:#c9a962;animation:sp 1.3s ease-in-out infinite}@keyframes sp{0%{transform:translateX(-120%)}50%{transform:translateX(180%)}100%{transform:translateX(-120%)}}html.dark #app-splash{background:#141c2e}html.dark #app-splash .logo{background:#243252}html.dark #app-splash .name{color:#ebe4d6}` } })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: "app-splash",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "logo",
						children: "الم"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "name",
						children: "شركة الموقر التجارية"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
					})
				]
			}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
function ThemedToaster() {
	const { theme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
		position: "top-center",
		theme
	});
}
function AppShell() {
	const { hydrated } = useStore();
	const isNavigating = useRouterState({ select: (s) => s.isLoading });
	const [bootReady, setBootReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		const splash = document.getElementById("app-splash");
		if (splash) splash.remove();
		const timer = window.setTimeout(() => setBootReady(true), 420);
		return () => window.clearTimeout(timer);
	}, [hydrated]);
	if (!hydrated || !bootReady) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, { variant: "splash" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [isNavigating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, { variant: "route" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthDialogProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemedToaster, {})] })] });
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(I18nProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {}) }) }) })
	});
}
var $$splitComponentImporter$8 = () => import("./routes-CLpA1BQo.mjs");
var Route$8 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "شركة الموقر التجارية | توريد وتجهيز المؤسسات" },
		{
			name: "description",
			content: "شركة الموقر التجارية — توريد وتجهيز المؤسسات في المملكة الأردنية."
		},
		{
			property: "og:title",
			content: "شركة الموقر التجارية | توريد وتجهيز المؤسسات"
		},
		{
			property: "og:description",
			content: "شركة الموقر التجارية — شريككم في توريد وتجهيز المؤسسات."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./complaint-COMwoKE5.mjs");
var Route$7 = createFileRoute("/complaint")({
	head: () => ({ meta: [{ title: "تقديم شكوى | شركة الموقر التجارية" }, {
		name: "description",
		content: "تقديم شكوى جديدة لمؤسستكم عبر منصة الموقر التجارية."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var KEY = "mwq.state.v12";
function getSessionAccount() {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(KEY) ?? window.localStorage.getItem("mwq.state.v11") ?? window.localStorage.getItem("mwq.state.v10");
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		return parsed.accounts.find((a) => a.id === parsed.sessionId && a.active) ?? null;
	} catch {
		return null;
	}
}
function requireStaff() {
	if (!getSessionAccount()) throw redirect({ to: "/login" });
}
var $$splitComponentImporter$6 = () => import("./dashboard-DMdOPv7q.mjs");
var Route$6 = createFileRoute("/dashboard")({
	beforeLoad: () => {
		requireStaff();
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./login-Cg42rV43.mjs");
var Route$5 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "تسجيل الدخول | شركة الموقر التجارية" }, {
		name: "description",
		content: "دخول السوبر أدمن والموظفين إلى لوحة تحكم شركة الموقر التجارية."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./dashboard-CgDd6dib.mjs");
var Route$4 = createFileRoute("/dashboard/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./branches-uAwt5MuC.mjs");
var Route$3 = createFileRoute("/dashboard/branches")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./employees-BmTC8gUr.mjs");
var Route$2 = createFileRoute("/dashboard/employees")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./reports-BkA-LhKQ.mjs");
var Route$1 = createFileRoute("/dashboard/reports")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./settings-DcGBq15N.mjs");
var Route = createFileRoute("/dashboard/settings")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var ComplaintRoute = Route$7.update({
	id: "/complaint",
	path: "/complaint",
	getParentRoute: () => Route$9
});
var DashboardRoute = Route$6.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$9
});
var LoginRoute = Route$5.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$9
});
var DashboardIndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => DashboardRoute
});
var DashboardRouteChildren = {
	DashboardBranchesRoute: Route$3.update({
		id: "/branches",
		path: "/branches",
		getParentRoute: () => DashboardRoute
	}),
	DashboardComplaintsRoute: Route$10.update({
		id: "/complaints",
		path: "/complaints",
		getParentRoute: () => DashboardRoute
	}),
	DashboardEmployeesRoute: Route$2.update({
		id: "/employees",
		path: "/employees",
		getParentRoute: () => DashboardRoute
	}),
	DashboardReportsRoute: Route$1.update({
		id: "/reports",
		path: "/reports",
		getParentRoute: () => DashboardRoute
	}),
	DashboardSettingsRoute: Route.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => DashboardRoute
	}),
	DashboardIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	ComplaintRoute,
	DashboardRoute: DashboardRoute._addFileChildren(DashboardRouteChildren),
	LoginRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
