import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as useI18n, o as cn, u as useStore } from "./utils-mpiaTXtw.mjs";
import { t as Button } from "./button-DKPSQ_JL.mjs";
import { S as LayoutDashboard, v as LogOut, y as LogIn } from "../_libs/lucide-react.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAuthDialog } from "./AuthDialog-DmK8ZMNh.mjs";
import { n as NotificationBell, r as ThemeToggle, t as LangToggle } from "./TopControls-BdK4u7Gk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteHeader-B6maIgL1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SCROLL_THRESHOLD = 48;
function SiteHeader({ transparent = false }) {
	const { t } = useI18n();
	const { me, logout } = useStore();
	const { openLogin } = useAuthDialog();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const isHome = transparent || pathname === "/";
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: cn("z-50 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]", isHome ? "fixed inset-x-0 top-0" : "sticky top-0", overHero ? "border-b border-white/10 bg-transparent shadow-none" : "border-b border-border/70 bg-background/92 shadow-sm backdrop-blur-xl"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex h-14 w-full items-center justify-between gap-2 px-4 sm:h-16 sm:gap-4 sm:px-8 lg:px-14 xl:px-20", overHero && "bg-gradient-to-b from-black/45 via-black/15 to-transparent"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex min-w-0 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("grid size-8 shrink-0 place-items-center rounded-xl font-display text-xs font-bold sm:size-9 sm:text-sm", overHero ? "bg-gold text-gold-foreground shadow-lg" : "bg-primary text-primary-foreground"),
					children: "الم"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("truncate font-display text-sm font-semibold sm:text-base max-[360px]:max-w-[7.5rem]", overHero ? "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]" : "text-foreground"),
					children: t("brand")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-0.5 sm:gap-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {
						compact: true,
						overHero
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, {
						compact: true,
						overHero
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBell, { overHero }),
					me ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "iconLg",
							className: "touch-manipulation bg-gold text-gold-foreground shadow-md hover:opacity-90 sm:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "size-4" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							className: "hidden gap-2 bg-gold text-gold-foreground shadow-md hover:opacity-90 sm:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/dashboard",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "size-4" }), t("dashboard")]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "iconLg",
							variant: "ghost",
							className: cn("touch-manipulation sm:hidden", overHero ? "text-white hover:bg-white/15 hover:text-white" : ""),
							onClick: logout,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							className: cn("hidden sm:inline-flex", overHero ? "text-white hover:bg-white/15 hover:text-white" : ""),
							onClick: logout,
							children: t("logout")
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						className: cn("h-11 gap-2 touch-manipulation shadow-md", overHero ? "bg-gold text-gold-foreground hover:opacity-90" : ""),
						onClick: () => openLogin(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden min-[400px]:inline",
							children: t("login")
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { SiteHeader as t };
