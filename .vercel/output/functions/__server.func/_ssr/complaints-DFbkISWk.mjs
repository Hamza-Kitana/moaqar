import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as assignableEmployees, c as resolveComplaintCoords, d as visibleComplaints, l as useI18n, o as cn, s as complaintComplainantPhone, u as useStore } from "./utils-mpiaTXtw.mjs";
import { t as Button } from "./button-DKPSQ_JL.mjs";
import { F as Check, I as Calendar, L as Building2, M as ChevronRight, N as ChevronLeft, R as Briefcase, f as Phone, g as MapPin, i as UserCog, l as Search, n as User, w as Inbox, x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BtT9cHtC.mjs";
import { t as Label } from "./label-DjwJeG8C.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-u8WWaYi4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Textarea, t as LocationMap } from "./textarea-Ba8RCH0K.mjs";
import { t as Route } from "./complaints-q-vkJ63X.mjs";
import { t as StatusBadge } from "./StatusBadge-BylWhSUJ.mjs";
import { t as WorkflowSteps } from "./WorkflowSteps-BRR2Im11.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-md975D98.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/complaints-DFbkISWk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ComplaintTimeline({ entries }) {
	const { t, lang } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-3 text-sm font-semibold",
		children: t("timeline")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "space-y-0",
		children: entries.map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "relative flex gap-3 pb-4 last:pb-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-2.5 shrink-0 rounded-full bg-primary ring-4 ring-primary/15" }), i < entries.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 w-px flex-1 bg-border" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 pb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium leading-relaxed",
					children: lang === "ar" ? entry.textAr : entry.textEn
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 text-[10px] text-muted-foreground",
					children: [
						entry.by,
						" · ",
						new Date(entry.at).toLocaleString(lang === "ar" ? "ar-JO" : "en-GB")
					]
				})]
			})]
		}, i))
	})] });
}
var FILTERS = [
	"all",
	"new",
	"assigned",
	"resolved"
];
function ComplaintMobileCard({ c, lang, t, state, showRegion, showAssignee, isUnread, onOpen }) {
	const lib = state.libraries.find((l) => l.id === c.libraryId);
	const branch = state.branches.find((b) => b.id === c.branchId);
	const assignee = c.assignedTo ? state.accounts.find((a) => a.id === c.assignedTo) : null;
	const complainantPhone = complaintComplainantPhone(c);
	const Chevron = lang === "ar" ? ChevronLeft : ChevronRight;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onOpen,
		className: cn("surface app-card-tap w-full rounded-xl p-3 text-start touch-manipulation sm:rounded-2xl sm:p-4", isUnread && "ring-2 ring-primary/25"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								isUnread && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2 shrink-0 rounded-full bg-primary",
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs font-bold text-primary",
									children: c.ref
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 truncate text-sm font-semibold",
							children: lib ? lang === "ar" ? lib.nameAr : lib.nameEn : "—"
						}),
						showRegion && branch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 flex items-center gap-1 truncate text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3 shrink-0" }), lang === "ar" ? branch.nameAr : branch.nameEn]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 flex items-center gap-1 truncate text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3 shrink-0" }), c.locationText]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chevron, { className: "mt-1 size-4 shrink-0 text-muted-foreground/50" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("mt-3 grid gap-2 border-t border-border/60 pt-3 text-[11px]", showAssignee ? "grid-cols-2" : "grid-cols-1"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-muted-foreground",
							children: t("complainant")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 truncate font-medium",
							children: c.createdByName
						}),
						complainantPhone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 flex items-center gap-1 truncate font-mono text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3 shrink-0" }), complainantPhone]
						})
					]
				}), showAssignee && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-muted-foreground",
						children: t("assignedEmployee")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-0.5 truncate", assignee ? "font-medium text-primary" : "text-warning"),
						children: assignee?.name ?? t("unassigned")
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-[10px] text-muted-foreground",
				children: new Date(c.createdAt).toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB", {
					day: "numeric",
					month: "short",
					year: "numeric"
				})
			})
		]
	});
}
function ComplaintsPage() {
	const { t, lang } = useI18n();
	const store = useStore();
	const navigate = Route.useNavigate();
	const { region: regionParam } = Route.useSearch();
	const { me, state, isSuper, markRead, assignComplaint, resolveComplaint } = store;
	const list = (0, import_react.useMemo)(() => visibleComplaints(store), [
		store.state,
		store.me,
		store.isSuper
	]);
	const regionFilter = isSuper && regionParam && state.branches.some((b) => b.id === regionParam) ? regionParam : "all";
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("new");
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [detailOpen, setDetailOpen] = (0, import_react.useState)(false);
	const [assignTo, setAssignTo] = (0, import_react.useState)("");
	const [resolutionNote, setResolutionNote] = (0, import_react.useState)("");
	const [coords, setCoords] = (0, import_react.useState)(null);
	const [locationLoading, setLocationLoading] = (0, import_react.useState)(false);
	const regionList = regionFilter === "all" ? list : list.filter((c) => c.branchId === regionFilter);
	const filtered = regionList.filter((c) => {
		const q = search.trim().toLowerCase();
		const branch = state.branches.find((b) => b.id === c.branchId);
		const lib = state.libraries.find((l) => l.id === c.libraryId);
		const assignee = c.assignedTo ? state.accounts.find((a) => a.id === c.assignedTo) : null;
		const haystack = [
			c.ref,
			c.notes,
			c.locationText,
			c.createdByName,
			c.createdByPhone,
			complaintComplainantPhone(c),
			branch?.nameAr,
			branch?.nameEn,
			branch?.city,
			lib?.nameAr,
			lib?.nameEn,
			assignee?.name
		].filter(Boolean).join(" ").toLowerCase();
		const matchSearch = !q || haystack.includes(q);
		const matchStatus = statusFilter === "all" || c.status === statusFilter;
		return matchSearch && matchStatus;
	});
	const groups = (0, import_react.useMemo)(() => {
		const byBranch = state.branches.map((b) => ({
			branch: b,
			items: filtered.filter((c) => c.branchId === b.id)
		})).filter((g) => g.items.length > 0);
		const known = new Set(state.branches.map((b) => b.id));
		const other = filtered.filter((c) => !known.has(c.branchId));
		if (other.length) byBranch.push({
			branch: {
				id: "other",
				nameAr: "أخرى",
				nameEn: "Other",
				city: ""
			},
			items: other
		});
		return byBranch;
	}, [filtered, state.branches]);
	const selected = (0, import_react.useMemo)(() => {
		if (!selectedId) return null;
		return visibleComplaints(store).find((c) => c.id === selectedId) ?? null;
	}, [
		selectedId,
		store.state.complaints,
		store.me,
		store.isSuper
	]);
	const employees = (0, import_react.useMemo)(() => assignableEmployees(store), [store.state.accounts]);
	(0, import_react.useEffect)(() => {
		setAssignTo(selected?.assignedTo ?? "");
	}, [selected?.id, selected?.assignedTo]);
	const activeRegion = state.branches.find((b) => b.id === regionFilter);
	const showRegionColumn = isSuper && regionFilter === "all";
	const colCount = showRegionColumn ? 9 : 8;
	const setRegion = (id) => {
		setSelectedId(null);
		setDetailOpen(false);
		navigate({ search: id === "all" ? {} : { region: id } });
	};
	const openDetail = (c) => {
		setSelectedId(c.id);
		setResolutionNote("");
		setCoords(null);
		setLocationLoading(false);
		setDetailOpen(true);
		markRead(c.id);
	};
	const closeDetail = () => {
		setDetailOpen(false);
		setLocationLoading(false);
	};
	const captureLocation = () => {
		if (locationLoading) return;
		if (!navigator.geolocation) {
			toast.error(lang === "ar" ? "المتصفح لا يدعم الموقع" : "Geolocation not supported");
			return;
		}
		setLocationLoading(true);
		navigator.geolocation.getCurrentPosition((pos) => {
			setCoords({
				lat: pos.coords.latitude,
				lng: pos.coords.longitude
			});
			setLocationLoading(false);
			toast.success(t("locationCaptured"));
		}, () => {
			setLocationLoading(false);
			toast.error(lang === "ar" ? "تعذّر الحصول على الموقع" : "Could not get location");
		}, {
			enableHighAccuracy: true,
			timeout: 3e4,
			maximumAge: 0
		});
	};
	const tableGroups = isSuper && regionFilter === "all" ? groups : [{
		branch: null,
		items: filtered
	}];
	const openCount = (items) => items.filter((c) => c.status !== "resolved").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise-in flex flex-col gap-3 sm:gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold sm:text-2xl",
					children: isSuper ? activeRegion && regionFilter !== "all" ? `${t("complaints")} — ${lang === "ar" ? activeRegion.nameAr : activeRegion.nameEn}` : t("complaints") : t("myTasks")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						filtered.length,
						" ",
						t("total"),
						statusFilter !== "all" ? ` · ${t(`st_${statusFilter}`)}` : ""
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full sm:max-w-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "h-9 w-full rounded-xl border border-input bg-card ps-9 pe-3 text-xs outline-none ring-offset-background transition-shadow placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring sm:h-10 sm:text-sm",
						placeholder: t("searchComplaintsPh"),
						value: search,
						onChange: (e) => setSearch(e.target.value)
					})]
				})]
			}),
			isSuper && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 sm:gap-3 xl:grid-cols-4 xl:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setRegion("all"),
					className: cn("surface rounded-xl p-3 text-start transition-colors sm:rounded-2xl sm:p-4", regionFilter === "all" ? "ring-2 ring-primary" : "hover:bg-secondary/40"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-semibold text-muted-foreground sm:text-xs",
							children: t("allRegions")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 font-display text-xl font-bold tabular-nums sm:mt-1 sm:text-2xl",
							children: list.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 line-clamp-2 text-[9px] leading-tight text-muted-foreground sm:mt-1 sm:text-[11px]",
							children: [
								openCount(list),
								" ",
								t("openComplaints")
							]
						})
					]
				}), state.branches.map((b) => {
					const items = list.filter((c) => c.branchId === b.id);
					const open = openCount(items);
					const fresh = items.filter((c) => c.status === "new").length;
					const active = regionFilter === b.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setRegion(b.id),
						className: cn("surface rounded-xl p-3 text-start transition-colors sm:rounded-2xl sm:p-4", active ? "ring-2 ring-primary" : "hover:bg-secondary/40"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs font-semibold sm:text-sm",
									children: lang === "ar" ? b.nameAr : b.nameEn
								}), fresh > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-gold grid min-w-4 shrink-0 place-items-center rounded-full px-1 text-[9px] font-bold text-primary sm:min-w-5 sm:px-1.5 sm:text-[10px]",
									children: fresh
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 font-display text-xl font-bold tabular-nums sm:mt-1 sm:text-2xl",
								children: items.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 line-clamp-2 text-[9px] leading-tight text-muted-foreground sm:mt-1 sm:text-[11px]",
								children: [
									open,
									" ",
									t("openComplaints"),
									fresh > 0 ? ` · ${fresh} ${t("st_new")}` : ""
								]
							})
						]
					}, b.id);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-1 flex gap-1 overflow-x-auto px-1 pb-0.5 scrollbar-hide sm:justify-center sm:gap-1.5",
				children: FILTERS.map((f) => {
					const count = f === "all" ? regionList.length : regionList.filter((c) => c.status === f).length;
					const active = statusFilter === f;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setStatusFilter(f),
						className: cn("flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-2.5 text-xs font-medium touch-manipulation sm:gap-2 sm:px-4 sm:py-2", active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "max-w-[7rem] truncate sm:max-w-none",
							children: f === "all" ? t("filterAll") : t(`st_${f}`)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("grid min-w-4 place-items-center rounded-full px-1 text-[9px] font-semibold sm:min-w-5 sm:px-1.5 sm:text-[10px]", active ? "bg-primary-foreground/20" : "bg-secondary"),
							children: count
						})]
					}, f);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "xl:hidden",
				children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface flex flex-col items-center justify-center gap-2 rounded-2xl p-12 text-center sm:p-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "size-8 text-muted-foreground/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: regionFilter !== "all" ? t("noComplaintsInRegion") : t("noData")
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: tableGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [group.branch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-2 flex items-center gap-1.5 px-1 text-xs font-semibold text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5 text-primary" }),
							lang === "ar" ? group.branch.nameAr : group.branch.nameEn,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-normal",
								children: ["· ", group.items.length]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 md:grid-cols-2",
						children: group.items.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintMobileCard, {
							c,
							lang,
							t,
							state,
							showRegion: showRegionColumn,
							showAssignee: isSuper,
							isUnread: Boolean(me && !c.readBy.includes(me.id)),
							onOpen: () => openDetail(c)
						}, c.id))
					})] }, group.branch?.id ?? "flat"))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "surface hidden overflow-hidden rounded-2xl xl:block",
				children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center gap-2 p-16 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "size-8 text-muted-foreground/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: regionFilter !== "all" ? t("noComplaintsInRegion") : t("noData")
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
					className: "hover:bg-transparent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { className: "w-8 ps-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "font-semibold",
							children: t("refNo")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "font-semibold",
							children: t("library")
						}),
						showRegionColumn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "font-semibold",
							children: t("region")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "font-semibold",
							children: t("location")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "font-semibold",
							children: t("complainant")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "font-semibold",
							children: t("phone")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "font-semibold",
							children: t("status")
						}),
						isSuper && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "font-semibold",
							children: t("assignedEmployee")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "pe-4 font-semibold",
							children: t("createdAt")
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: tableGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [group.branch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, {
					className: "bg-secondary/50 hover:bg-secondary/50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						colSpan: colCount,
						className: "py-2.5 ps-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 text-xs font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3.5 text-primary" }),
								lang === "ar" ? group.branch.nameAr : group.branch.nameEn,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-normal text-muted-foreground",
									children: [
										"· ",
										group.items.length,
										" ",
										t("total")
									]
								})
							]
						})
					})
				}), group.items.map((c) => {
					const lib = state.libraries.find((l) => l.id === c.libraryId);
					const branch = state.branches.find((b) => b.id === c.branchId);
					const assignee = c.assignedTo ? state.accounts.find((a) => a.id === c.assignedTo) : null;
					const complainantPhone = complaintComplainantPhone(c);
					const isUnread = Boolean(me && !c.readBy.includes(me.id));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "cursor-pointer",
						onClick: () => openDetail(c),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "w-8 ps-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mx-auto block size-2 rounded-full", isUnread ? "bg-primary" : "bg-transparent") })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-mono text-xs font-semibold text-primary",
								children: c.ref
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "max-w-[10rem] truncate font-medium",
								children: lib ? lang === "ar" ? lib.nameAr : lib.nameEn : "—"
							}),
							showRegionColumn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "max-w-[8rem] truncate text-muted-foreground",
								children: branch ? lang === "ar" ? branch.nameAr : branch.nameEn : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "max-w-[10rem] truncate text-muted-foreground",
								children: c.locationText
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "max-w-[8rem] truncate text-sm font-medium",
								children: c.createdByName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "max-w-[7rem] truncate font-mono text-xs text-muted-foreground",
								children: complainantPhone ?? t("noPhone")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status }) }),
							isSuper && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: cn("max-w-[8rem] truncate text-sm", assignee ? "font-medium text-primary" : "text-warning"),
								children: assignee?.name ?? t("unassigned")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "pe-4 text-muted-foreground",
								children: new Date(c.createdAt).toLocaleDateString(lang === "ar" ? "ar-JO" : "en-GB")
							})
						]
					}, c.id);
				})] }, group.branch?.id ?? "flat")) })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: detailOpen,
				onOpenChange: (open) => {
					if (!open) closeDetail();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
					className: "dialog-mobile-full flex max-h-[90vh] max-w-3xl flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl",
					children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintDetail, {
						complaint: selected,
						lang,
						t,
						...me?.id ? { meId: me.id } : {},
						state,
						isSuper,
						assignTo,
						setAssignTo,
						employees,
						resolutionNote,
						setResolutionNote,
						coords,
						locationLoading,
						captureLocation,
						onAssign: () => {
							if (!assignTo) return;
							assignComplaint(selected.id, assignTo);
							toast.success(selected.assignedTo ? t("changeAssignee") : t("assign"));
						},
						onResolve: () => {
							if (!resolutionNote.trim()) {
								toast.error(lang === "ar" ? "اكتب ما تم عمله" : "Enter resolution notes");
								return;
							}
							resolveComplaint(selected.id, resolutionNote.trim(), coords);
							toast.success(t("superClose"));
						}
					})
				})
			})
		]
	});
}
function ComplaintDetail({ complaint: c, lang, t, meId, state, isSuper, assignTo, setAssignTo, employees, resolutionNote, setResolutionNote, coords, locationLoading, captureLocation, onAssign, onResolve }) {
	const lib = state.libraries.find((l) => l.id === c.libraryId);
	const branch = state.branches.find((b) => b.id === c.branchId);
	const assignee = c.assignedTo ? state.accounts.find((a) => a.id === c.assignedTo) : null;
	const complainantPhone = complaintComplainantPhone(c);
	const canResolveSuper = isSuper && c.status !== "resolved";
	const canAssign = isSuper && c.status !== "resolved";
	const hasActions = canAssign || canResolveSuper;
	const showEmployeeCloseHint = !isSuper && c.assignedTo === meId && c.status === "assigned";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
		className: "shrink-0 border-b border-border/70 bg-secondary/40 px-5 py-4 pe-14 sm:px-6 sm:py-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: c.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "m-0 font-mono text-xs font-semibold text-primary",
					children: c.ref
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "text-start text-lg font-bold leading-snug",
				children: lib ? lang === "ar" ? lib.nameAr : lib.nameEn : "—"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 rounded-xl bg-secondary/60 px-3 py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkflowSteps, { status: c.status })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3.5 text-primary" }), t("complainant")]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm font-bold",
							children: c.createdByName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-center gap-1 text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3" }), complainantPhone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:${complainantPhone}`,
								className: "font-mono hover:text-primary",
								children: complainantPhone
							}) : t("noPhone")]
						})
					]
				}), isSuper && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCog, { className: "size-3.5 text-primary" }), t("assignedEmployee")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-1.5 text-sm font-bold", assignee ? "text-primary" : "text-warning"),
						children: assignee?.name ?? t("unassigned")
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid gap-3 text-xs sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, {
						icon: Building2,
						label: t("library"),
						value: lib ? lang === "ar" ? lib.nameAr : lib.nameEn : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, {
						icon: Briefcase,
						label: t("branch"),
						value: branch ? lang === "ar" ? branch.nameAr : branch.nameEn : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, {
						icon: MapPin,
						label: t("location"),
						value: c.locationText
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, {
						icon: Calendar,
						label: t("createdAt"),
						value: new Date(c.createdAt).toLocaleString(lang === "ar" ? "ar-JO" : "en-GB")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [(() => {
					const problem = resolveComplaintCoords(c);
					return problem ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationMap, {
						title: t("problemLocation"),
						subtitle: c.locationText,
						lat: problem.lat,
						lng: problem.lng,
						mapLabel: t("viewOnMap"),
						approximate: problem.approximate,
						approximateLabel: t("approxLocation"),
						className: "border-primary/20"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-primary/20 bg-primary/5 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold text-primary",
								children: t("problemLocation")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm font-medium",
								children: c.locationText
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: t("noCoords")
							})
						]
					});
				})(), c.resolution ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationMap, {
					title: t("employeeLocation"),
					subtitle: c.resolution.by,
					lat: c.resolution.lat,
					lng: c.resolution.lng,
					mapLabel: t("viewOnMap"),
					className: "border-success/25"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-[12rem] flex-col justify-between rounded-xl border border-dashed border-success/30 bg-success/5 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-success",
						children: t("employeeLocation")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: t("awaitingEmployeeVisit")
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: t("noCoords")
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-secondary/40 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold text-muted-foreground",
					children: t("notes")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed",
					children: c.notes
				})]
			}),
			c.images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-[11px] font-semibold text-muted-foreground",
				children: t("photos")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: c.images.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: "",
					className: "size-20 rounded-xl border border-border object-cover"
				}, i))
			})] }),
			c.resolution && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-success/25 bg-success/10 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-success",
						children: t("visitProof")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: c.resolution.note
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: [
							c.resolution.by,
							" · ",
							new Date(c.resolution.at).toLocaleString(lang === "ar" ? "ar-JO" : "en-GB")
						]
					})
				]
			}),
			showEmployeeCloseHint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border/70 bg-secondary/30 px-4 py-3 text-sm text-muted-foreground",
				children: t("superCloseOnly")
			}),
			hasActions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 rounded-xl border border-border bg-card p-4",
				children: [canAssign && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: c.assignedTo ? t("changeAssignee") : t("assign") }), employees.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: t("noActiveEmployees")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: assignTo,
							onValueChange: setAssignTo,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: t("employeeName") })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: employees.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: e.id,
								children: e.name
							}, e.id)) })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: onAssign,
							disabled: !assignTo || assignTo === (c.assignedTo ?? ""),
							children: c.assignedTo ? t("changeAssignee") : t("assign")
						})]
					})]
				}), canResolveSuper && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("resolutionNote") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: resolutionNote,
							onChange: (e) => setResolutionNote(e.target.value),
							rows: 3
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								type: "button",
								onClick: captureLocation,
								disabled: locationLoading,
								"aria-busy": locationLoading,
								className: cn("gap-2 touch-manipulation transition-all sm:min-w-[12rem]", locationLoading && "pointer-events-none opacity-90"),
								children: [locationLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 shrink-0 animate-spin" }) : coords ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 shrink-0 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 shrink-0" }), locationLoading ? t("locatingPosition") : coords ? t("locationCaptured") : t("attachLocation")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1 touch-manipulation",
								onClick: onResolve,
								disabled: locationLoading,
								children: t("superClose")
							})]
						}),
						locationLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex size-2 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex size-full animate-ping rounded-full bg-primary/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-primary" })]
							}), t("locatingPositionHint")]
						}),
						coords && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationMap, {
							lat: coords.lat,
							lng: coords.lng,
							title: t("employeeLocation"),
							mapLabel: t("viewOnMap"),
							mapClassName: "aspect-[16/9]"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintTimeline, { entries: c.timeline })
		]
	})] });
}
function MetaRow({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-2.5 rounded-xl bg-secondary/35 px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mt-0.5 size-3.5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-[10px] text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "mt-0.5 truncate font-medium",
				children: value
			})]
		})]
	});
}
//#endregion
export { ComplaintsPage as component };
