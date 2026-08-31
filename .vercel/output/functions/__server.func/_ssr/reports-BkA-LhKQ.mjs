import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { d as visibleComplaints, l as useI18n, u as useStore } from "./utils-mpiaTXtw.mjs";
import { t as Button } from "./button-DKPSQ_JL.mjs";
import { D as FileText, u as Printer } from "../_libs/lucide-react.mjs";
import { t as Label } from "./label-DjwJeG8C.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-u8WWaYi4.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as StatusBadge } from "./StatusBadge-BylWhSUJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-BkA-LhKQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"new",
	"assigned",
	"resolved"
];
function inMonth(iso, year, month) {
	const d = new Date(iso);
	return d.getFullYear() === year && d.getMonth() === month;
}
function monthLabel(year, month, lang) {
	return new Date(year, month, 1).toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB", {
		month: "long",
		year: "numeric"
	});
}
function inReportPeriod(c, year, month) {
	return inMonth(c.createdAt, year, month) || c.resolution != null && inMonth(c.resolution.at, year, month);
}
function MonthlyReportsPage() {
	const { t, lang } = useI18n();
	const store = useStore();
	const { me, state, isSuper, activeEmployees } = store;
	const now = /* @__PURE__ */ new Date();
	const [year, setYear] = (0, import_react.useState)(now.getFullYear());
	const [month, setMonth] = (0, import_react.useState)(now.getMonth());
	const [scopeType, setScopeType] = (0, import_react.useState)("all");
	const [scopeId, setScopeId] = (0, import_react.useState)("");
	const allVisible = (0, import_react.useMemo)(() => visibleComplaints(store), [
		store.state,
		store.me,
		store.isSuper
	]);
	const employeeOptions = (0, import_react.useMemo)(() => activeEmployees.sort((a, b) => a.name.localeCompare(b.name, lang === "ar" ? "ar" : "en")), [activeEmployees, lang]);
	const scopedBase = (0, import_react.useMemo)(() => {
		if (scopeType === "all" || !scopeId) return allVisible;
		return allVisible.filter((c) => c.assignedTo === scopeId);
	}, [
		allVisible,
		scopeType,
		scopeId
	]);
	const monthComplaints = (0, import_react.useMemo)(() => {
		return scopedBase.filter((c) => inReportPeriod(c, year, month)).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	}, [
		scopedBase,
		year,
		month
	]);
	const createdCount = scopedBase.filter((c) => inMonth(c.createdAt, year, month)).length;
	const resolvedCount = scopedBase.filter((c) => c.resolution && inMonth(c.resolution.at, year, month)).length;
	const openCount = scopedBase.filter((c) => c.status !== "resolved").length;
	const byStatus = STATUSES.map((s) => ({
		status: s,
		count: monthComplaints.filter((c) => c.status === s).length
	}));
	const byEmployee = (0, import_react.useMemo)(() => {
		const rows = /* @__PURE__ */ new Map();
		for (const c of monthComplaints) {
			if (!c.assignedTo) continue;
			const acc = state.accounts.find((a) => a.id === c.assignedTo);
			if (!acc) continue;
			const row = rows.get(acc.id) ?? {
				name: acc.name,
				assigned: 0,
				resolved: 0
			};
			row.assigned += 1;
			if (c.resolution && inMonth(c.resolution.at, year, month)) row.resolved += 1;
			rows.set(acc.id, row);
		}
		return [...rows.values()].sort((a, b) => b.assigned - a.assigned);
	}, [
		monthComplaints,
		state.accounts,
		year,
		month
	]);
	const scopeLabel = (0, import_react.useMemo)(() => {
		if (scopeType === "all") return t("reportScopeAll");
		return state.accounts.find((a) => a.id === scopeId)?.name ?? t("reportScopeAll");
	}, [
		scopeType,
		scopeId,
		state.accounts,
		t
	]);
	const setScope = (type) => {
		setScopeType(type);
		if (type === "all") {
			setScopeId("");
			return;
		}
		setScopeId(employeeOptions[0]?.id ?? "");
	};
	if (!me || !isSuper) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise-in surface rounded-2xl p-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: t("reportSuperOnly")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-4",
			variant: "secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/dashboard",
				children: t("back")
			})
		})]
	});
	const period = monthLabel(year, month, lang);
	const years = [
		now.getFullYear(),
		now.getFullYear() - 1,
		now.getFullYear() - 2
	];
	const showEmployeeTable = scopeType !== "employee" && byEmployee.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise-in space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 print:hidden sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold sm:text-2xl",
					children: t("monthlyReport")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: t("monthlyReportDesc")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: String(month),
							onValueChange: (v) => setMonth(Number(v)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-[9.5rem]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Array.from({ length: 12 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: String(i),
								children: new Date(2e3, i, 1).toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB", { month: "long" })
							}, i)) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: String(year),
							onValueChange: (v) => setYear(Number(v)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-[6.5rem]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: years.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: String(y),
								children: y
							}, y)) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => window.print(),
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), t("printPdf")]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface print:hidden rounded-2xl p-4 sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm font-semibold",
					children: t("reportScope")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5",
						children: [["all", t("reportScopeAll")], ["employee", t("reportScopeEmployee")]].map(([type, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setScope(type),
							className: `rounded-full border px-3 py-1.5 text-xs font-medium transition-colors touch-manipulation ${scopeType === type ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:bg-secondary"}`,
							children: label
						}, type))
					}), scopeType === "employee" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-[10rem] flex-1 space-y-1.5 sm:max-w-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: t("employeeName")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: scopeId,
							onValueChange: setScopeId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: t("selectEmployee") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: employeeOptions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: a.id,
								children: a.name
							}, a.id)) })]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				id: "monthly-report",
				className: "surface monthly-report rounded-2xl p-4 sm:p-6 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "border-b border-border pb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-primary grid size-11 place-items-center rounded-xl text-sm font-bold text-primary-foreground",
									children: "الم"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg font-bold",
									children: t("brand")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: t("monthlyReport")
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-end text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center justify-end gap-1.5 font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-primary" }), period]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-muted-foreground",
									children: [
										t("generatedAt"),
										":",
										" ",
										(/* @__PURE__ */ new Date()).toLocaleString(lang === "ar" ? "ar-JO" : "en-GB")
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-secondary/50 px-3 py-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-[11px] text-muted-foreground",
										children: t("preparedBy")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-0.5 font-semibold",
										children: me.name
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-primary/10 px-3 py-2.5 ring-1 ring-primary/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-[11px] text-muted-foreground",
										children: t("reportFor")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-0.5 font-semibold text-primary",
										children: scopeLabel
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-secondary/50 px-3 py-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-[11px] text-muted-foreground",
										children: t("reportPeriod")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-0.5 font-semibold",
										children: period
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold",
							children: t("reportSummary")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-2 gap-3 md:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBox, {
									label: t("createdThisMonth"),
									value: createdCount
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBox, {
									label: t("resolvedThisMonth"),
									value: resolvedCount
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBox, {
									label: t("stillOpen"),
									value: openCount
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold",
							children: t("statusBreakdown")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: byStatus.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: row.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold tabular-nums",
									children: row.count
								})]
							}, row.status))
						})]
					}),
					showEmployeeTable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold",
							children: t("teamPerformance")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 overflow-x-auto rounded-xl border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[18rem] text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-secondary/60 text-xs text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 text-start font-semibold",
											children: t("employeeName")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 text-start font-semibold",
											children: t("assignedCount")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 text-start font-semibold",
											children: t("resolvedThisMonth")
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: byEmployee.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 font-medium",
											children: row.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 tabular-nums",
											children: row.assigned
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 tabular-nums",
											children: row.resolved
										})
									]
								}, row.name)) })]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-sm font-bold",
							children: [
								t("complaintsInPeriod"),
								" (",
								monthComplaints.length,
								")"
							]
						}), monthComplaints.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: t("noReportData")
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-3 md:hidden print:hidden",
							children: monthComplaints.map((c) => {
								const lib = state.libraries.find((l) => l.id === c.libraryId);
								const b = state.branches.find((x) => x.id === c.branchId);
								const assignee = c.assignedTo ? state.accounts.find((a) => a.id === c.assignedTo) : null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "surface rounded-xl p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-xs font-bold text-primary",
												children: c.ref
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm font-semibold",
											children: lib ? lang === "ar" ? lib.nameAr : lib.nameEn : "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: [
												b ? lang === "ar" ? b.nameAr : b.nameEn : "—",
												" · ",
												assignee?.name ?? t("unassigned")
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-[11px] text-muted-foreground",
											children: new Date(c.createdAt).toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB")
										})
									]
								}, c.id);
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 hidden overflow-x-auto rounded-xl border border-border md:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[32rem] text-xs md:text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-secondary/60 text-[11px] text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-2 py-2 text-start font-semibold",
											children: t("refNo")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-2 py-2 text-start font-semibold",
											children: t("library")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-2 py-2 text-start font-semibold",
											children: t("branch")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-2 py-2 text-start font-semibold",
											children: t("status")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-2 py-2 text-start font-semibold",
											children: t("assignedTo")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-2 py-2 text-start font-semibold",
											children: t("createdAt")
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: monthComplaints.map((c) => {
									const lib = state.libraries.find((l) => l.id === c.libraryId);
									const b = state.branches.find((x) => x.id === c.branchId);
									const assignee = c.assignedTo ? state.accounts.find((a) => a.id === c.assignedTo) : null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-t border-border",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-2 py-2 font-mono font-semibold text-primary",
												children: c.ref
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-2 py-2",
												children: lib ? lang === "ar" ? lib.nameAr : lib.nameEn : "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-2 py-2",
												children: b ? lang === "ar" ? b.nameAr : b.nameEn : "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-2 py-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-2 py-2",
												children: assignee?.name ?? t("unassigned")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-2 py-2 whitespace-nowrap",
												children: new Date(c.createdAt).toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB")
											})
										]
									}, c.id);
								}) })]
							})
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
						className: "mt-8 border-t border-border pt-4 text-[11px] text-muted-foreground",
						children: t("reportFooter")
					})
				]
			})
		]
	});
}
function StatBox({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-2xl font-bold tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { MonthlyReportsPage as component };
