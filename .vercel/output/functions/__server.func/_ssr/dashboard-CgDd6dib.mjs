import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as visibleComplaints, l as useI18n, u as useStore } from "./utils-mpiaTXtw.mjs";
import { L as Building2, i as UserCog, k as ClipboardList } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as StatusBadge } from "./StatusBadge-BylWhSUJ.mjs";
import { t as WorkflowSteps } from "./WorkflowSteps-BRR2Im11.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CgDd6dib.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardOverview() {
	const { t, lang } = useI18n();
	const store = useStore();
	const { me, state, isSuper, activeEmployees } = store;
	const complaints = (0, import_react.useMemo)(() => visibleComplaints(store), [
		store.state,
		store.me,
		store.isSuper
	]);
	const openTasks = complaints.filter((c) => c.status === "assigned");
	const resolvedTasks = complaints.filter((c) => c.status === "resolved");
	const superStats = [
		{
			label: t("complaints"),
			value: complaints.length,
			icon: ClipboardList,
			href: "/dashboard/complaints"
		},
		{
			label: t("employees"),
			value: activeEmployees.length,
			icon: UserCog,
			href: "/dashboard/employees"
		},
		{
			label: t("branches"),
			value: state.branches.length,
			icon: Building2,
			href: "/dashboard/branches"
		}
	];
	const open = complaints.filter((c) => c.status !== "resolved");
	const recent = complaints.slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise-in space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold sm:text-2xl",
				children: t("overview")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					t("welcome"),
					" ",
					me?.name
				]
			})] }),
			isSuper ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-3 xl:gap-4",
				children: superStats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: s.href,
					className: "surface app-card-tap rounded-xl p-3 touch-manipulation transition-transform active:scale-[0.98] sm:rounded-2xl sm:p-5 sm:hover:scale-[1.02]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-4 shrink-0 text-primary sm:size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl font-bold tabular-nums sm:text-3xl",
							children: s.value
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 line-clamp-2 text-xs leading-tight text-muted-foreground group-hover:text-foreground sm:mt-3 sm:line-clamp-none sm:text-sm",
						children: s.label
					})]
				}, s.label))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-3 xl:gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dashboard/complaints",
						className: "surface app-card-tap rounded-xl p-3 touch-manipulation transition-transform active:scale-[0.98] sm:rounded-2xl sm:p-5 sm:hover:scale-[1.02]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-4 shrink-0 text-primary sm:size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl font-bold tabular-nums text-warning sm:text-3xl",
								children: openTasks.length
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 line-clamp-2 text-[10px] leading-tight text-muted-foreground group-hover:text-foreground sm:mt-3 sm:line-clamp-none sm:text-sm",
							children: t("openTasksLabel")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dashboard/complaints",
						className: "surface app-card-tap rounded-xl p-3 touch-manipulation transition-transform active:scale-[0.98] sm:rounded-2xl sm:p-5 sm:hover:scale-[1.02]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-4 shrink-0 text-primary sm:size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl font-bold tabular-nums sm:text-3xl",
								children: complaints.length
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 line-clamp-2 text-[10px] leading-tight text-muted-foreground group-hover:text-foreground sm:mt-3 sm:line-clamp-none sm:text-sm",
							children: t("totalAssignedLabel")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dashboard/complaints",
						className: "surface app-card-tap col-span-2 rounded-xl p-3 touch-manipulation transition-transform active:scale-[0.98] sm:col-span-1 sm:rounded-2xl sm:p-5 sm:hover:scale-[1.02]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-4 shrink-0 text-success sm:size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl font-bold tabular-nums text-success sm:text-3xl",
								children: resolvedTasks.length
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 line-clamp-2 text-[10px] leading-tight text-muted-foreground group-hover:text-foreground sm:mt-3 sm:line-clamp-none sm:text-sm",
							children: t("resolvedTasksLabel")
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: t("openComplaintsTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-3xl font-bold text-primary",
							children: open.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-2 text-xs",
							children: [
								"new",
								"assigned",
								"resolved"
							].map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/dashboard/complaints",
								className: "rounded-full bg-secondary px-3 py-2 text-xs touch-manipulation transition-colors hover:bg-primary/20 active:scale-[0.98]",
								children: [
									complaints.filter((c) => c.status === st).length,
									" — ",
									t(`st_${st}`)
								]
							}, st))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface space-y-4 rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: t("workflow")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkflowSteps, { status: recent[0]?.status ?? "new" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: t("workflowHint")
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: t("recentComplaints")
					}),
					recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: t("noData")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-border/60",
						children: recent.map((c) => {
							const branch = state.branches.find((b) => b.id === c.branchId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-2 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-primary",
										children: c.ref
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: [
											branch ? lang === "ar" ? branch.nameAr : branch.nameEn : "",
											" · ",
											c.notes
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status })]
							}, c.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dashboard/complaints",
						className: "mt-3 inline-block text-xs font-semibold text-primary hover:underline",
						children: [isSuper ? t("complaints") : t("myTasks"), " →"]
					})
				]
			})
		]
	});
}
//#endregion
export { DashboardOverview as component };
