import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime, d as DialogContent, f as DialogDescription, h as DialogTitle, l as Dialog, m as DialogPortal, p as DialogOverlay, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { d as visibleComplaints, l as useI18n, o as cn, u as useStore } from "./utils-mpiaTXtw.mjs";
import { t as Button } from "./button-DKPSQ_JL.mjs";
import { L as Building2, O as FileChartColumnIncreasing, S as LayoutDashboard, c as Settings, h as Menu, i as UserCog, k as ClipboardList, t as X, v as LogOut } from "../_libs/lucide-react.mjs";
import { f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as NotificationBell, r as ThemeToggle, t as LangToggle } from "./TopControls-BdK4u7Gk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DMdOPv7q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
function NavLink({ item, active, compact, inSheet, onClick }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: item.to,
		onClick,
		className: cn("flex items-center gap-2 rounded-xl text-sm transition-colors touch-manipulation", compact ? "px-3 py-3" : "px-3 py-2.5", inSheet ? active ? "bg-primary/10 font-semibold text-primary" : "text-foreground/80 hover:bg-secondary" : active ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4 shrink-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 flex-1 truncate",
				children: t(item.labelKey)
			}),
			item.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-gold grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold",
				children: item.badge
			}) : null
		]
	});
}
function DashboardLayout() {
	const { t } = useI18n();
	const store = useStore();
	const { me, logout, isSuper } = store;
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [moreOpen, setMoreOpen] = (0, import_react.useState)(false);
	if (!me) return null;
	const isEmployee = me.kind === "employee";
	const complaints = (0, import_react.useMemo)(() => visibleComplaints(store), [
		store.state,
		store.me,
		store.isSuper
	]);
	const pendingComplaints = isSuper ? complaints.filter((c) => c.status === "new").length : complaints.filter((c) => c.status === "assigned").length;
	const visibleNav = [
		{
			to: "/dashboard",
			labelKey: "overview",
			icon: LayoutDashboard,
			show: true
		},
		{
			to: "/dashboard/complaints",
			labelKey: isEmployee ? "myTasks" : "complaints",
			icon: ClipboardList,
			show: true,
			badge: pendingComplaints || void 0
		},
		{
			to: "/dashboard/reports",
			labelKey: "reports",
			icon: FileChartColumnIncreasing,
			show: isSuper
		},
		{
			to: "/dashboard/employees",
			labelKey: "employees",
			icon: UserCog,
			show: isSuper
		},
		{
			to: "/dashboard/branches",
			labelKey: "branches",
			icon: Building2,
			show: isSuper
		},
		{
			to: "/dashboard/settings",
			labelKey: "settings",
			icon: Settings,
			show: isSuper
		}
	].filter((n) => n.show);
	const isActive = (to) => to === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(to);
	const bottomPrimary = visibleNav.filter((n) => [
		"/dashboard",
		"/dashboard/complaints",
		"/dashboard/reports"
	].includes(n.to));
	const bottomMoreItems = visibleNav.filter((n) => !bottomPrimary.some((p) => p.to === n.to));
	const moreActive = bottomMoreItems.some((n) => isActive(n.to));
	const currentPage = visibleNav.find((n) => isActive(n.to));
	const handleLogout = () => {
		setMoreOpen(false);
		logout();
		window.location.href = "/";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-[100dvh] lg:flex",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden border-e border-sidebar-border bg-sidebar text-sidebar-foreground print:hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-gold grid size-9 place-items-center rounded-xl text-sm font-bold",
							children: "الم"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-semibold",
									children: t("brand")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[11px] text-sidebar-foreground/65",
									children: me.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[10px] text-gold",
									children: isSuper ? t("superAdmin") : t("employeeRole")
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-1 flex-col gap-1 overflow-y-auto p-3",
						children: visibleNav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							item,
							active: isActive(item.to)
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "shrink-0 border-t border-sidebar-border p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "w-full justify-start gap-2 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
							onClick: handleLogout,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), t("logout")]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-[100dvh] flex-1 flex-col lg:ms-64 print:ms-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border/60 bg-background/85 px-3 backdrop-blur-xl sm:px-4 print:hidden supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-gold grid size-8 shrink-0 place-items-center rounded-xl text-xs font-bold lg:hidden",
							children: "الم"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-semibold",
								children: currentPage ? t(currentPage.labelKey) : t("dashboard")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-[11px] text-muted-foreground lg:hidden",
								children: me.name
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-0.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, { compact: true }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangToggle, { compact: true }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBell, {})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 p-3 sm:p-4 md:p-6 pb-safe-nav lg:pb-6 print:p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "app-bottom-nav print:hidden lg:hidden",
				"aria-label": t("dashboard"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-lg items-stretch justify-around px-1 pt-1",
					children: [bottomPrimary.map((item) => {
						const active = isActive(item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2.5 touch-manipulation transition-colors touch-target", active ? "text-primary" : "text-muted-foreground"),
							children: [
								active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute inset-x-3 top-1 h-0.5 rounded-full bg-primary",
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: cn("size-5", active && "stroke-[2.5]") }), item.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-gold absolute -end-1.5 -top-1.5 grid min-w-4 place-items-center rounded-full px-1 text-[9px] font-bold text-primary",
										children: item.badge
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("max-w-full truncate text-[11px] font-medium sm:text-xs", active && "font-semibold"),
									children: t(item.labelKey)
								})
							]
						}, item.to);
					}), bottomMoreItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMoreOpen(true),
						className: cn("relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2.5 touch-manipulation transition-colors touch-target", moreActive || moreOpen ? "text-primary" : "text-muted-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: cn("size-5", (moreActive || moreOpen) && "stroke-[2.5]") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-[11px] font-medium sm:text-xs", (moreActive || moreOpen) && "font-semibold"),
							children: t("more")
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: moreOpen,
				onOpenChange: setMoreOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "bottom",
					className: "rounded-t-3xl px-4 pb-safe-nav pt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
						className: "mb-4 text-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: t("more") })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "grid gap-1",
						children: [bottomMoreItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							item,
							active: isActive(item.to),
							compact: true,
							inSheet: true,
							onClick: () => setMoreOpen(false)
						}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							className: "mt-2 w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive",
							onClick: handleLogout,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), t("logout")]
						})]
					})]
				})
			})
		]
	});
}
var SplitComponent = DashboardLayout;
//#endregion
export { SplitComponent as component };
