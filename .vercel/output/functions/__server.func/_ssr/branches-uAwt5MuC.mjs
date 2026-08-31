import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as useI18n, o as cn, u as useStore } from "./utils-mpiaTXtw.mjs";
import { t as Button } from "./button-DKPSQ_JL.mjs";
import { L as Building2, a as Trash2, d as Plus, p as Pencil, z as BookOpen } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BtT9cHtC.mjs";
import { t as Input } from "./input-Gn3khOPa.mjs";
import { t as Label } from "./label-DjwJeG8C.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-u8WWaYi4.mjs";
import { t as ConfirmDeleteDialog } from "./confirm-delete-dialog-Cx9YNovL.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/branches-uAwt5MuC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fieldInputClass = "h-11 rounded-xl border-border/80 bg-background shadow-none";
var emptyBranch = () => ({
	nameAr: "",
	nameEn: "",
	city: ""
});
var emptyLibrary = (branchId = "") => ({
	nameAr: "",
	nameEn: "",
	branchId,
	address: ""
});
function BranchesPage() {
	const { t, lang } = useI18n();
	const { state, upsertBranch, removeBranch, upsertLibrary, removeLibrary } = useStore();
	const [branchOpen, setBranchOpen] = (0, import_react.useState)(false);
	const [branchEditId, setBranchEditId] = (0, import_react.useState)(null);
	const [branchForm, setBranchForm] = (0, import_react.useState)(emptyBranch());
	const [libraryOpen, setLibraryOpen] = (0, import_react.useState)(false);
	const [libraryEditId, setLibraryEditId] = (0, import_react.useState)(null);
	const [libForm, setLibForm] = (0, import_react.useState)(emptyLibrary(state.branches[0]?.id ?? ""));
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const openAddBranch = () => {
		setBranchEditId(null);
		setBranchForm(emptyBranch());
		setBranchOpen(true);
	};
	const openEditBranch = (id) => {
		const b = state.branches.find((x) => x.id === id);
		if (!b) return;
		setBranchEditId(id);
		setBranchForm({
			nameAr: b.nameAr,
			nameEn: b.nameEn,
			city: b.city
		});
		setBranchOpen(true);
	};
	const submitBranch = (e) => {
		e.preventDefault();
		upsertBranch({
			id: branchEditId ?? void 0,
			...branchForm
		});
		toast.success(t("save"));
		setBranchOpen(false);
	};
	const openAddLibrary = () => {
		setLibraryEditId(null);
		setLibForm(emptyLibrary(state.branches[0]?.id ?? ""));
		setLibraryOpen(true);
	};
	const openEditLibrary = (id) => {
		const l = state.libraries.find((x) => x.id === id);
		if (!l) return;
		setLibraryEditId(id);
		setLibForm({
			nameAr: l.nameAr,
			nameEn: l.nameEn,
			branchId: l.branchId,
			address: l.address
		});
		setLibraryOpen(true);
	};
	const submitLibrary = (e) => {
		e.preventDefault();
		upsertLibrary({
			id: libraryEditId ?? void 0,
			...libForm
		});
		toast.success(t("save"));
		setLibraryOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise-in space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-bold sm:text-2xl",
				children: t("branches")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: t("branchesPageDesc")
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-sm font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4 text-primary" }), t("branch")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						className: "gap-2",
						onClick: openAddBranch,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), t("addBranch")]
					})]
				}), state.branches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "surface rounded-2xl p-8 text-center text-sm text-muted-foreground",
					children: t("noData")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: state.branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface flex items-start justify-between gap-3 rounded-2xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: lang === "ar" ? b.nameAr : b.nameEn
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: b.city
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => openEditBranch(b.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => setDeleteTarget({
									kind: "branch",
									id: b.id,
									name: lang === "ar" ? b.nameAr : b.nameEn
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
							})]
						})]
					}, b.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "flex items-center gap-2 text-sm font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4 text-primary" }), t("library")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						className: "gap-2",
						onClick: openAddLibrary,
						disabled: state.branches.length === 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), t("addLibrary")]
					})]
				}), state.libraries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "surface rounded-2xl p-8 text-center text-sm text-muted-foreground",
					children: t("noData")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3 lg:hidden",
					children: state.libraries.map((l) => {
						const b = state.branches.find((x) => x.id === l.branchId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface flex items-start justify-between gap-3 rounded-2xl p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: lang === "ar" ? l.nameAr : l.nameEn
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-xs text-muted-foreground",
										children: b ? lang === "ar" ? b.nameAr : b.nameEn : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] text-muted-foreground",
										children: l.address
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => openEditLibrary(l.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									className: "text-destructive",
									onClick: () => setDeleteTarget({
										kind: "library",
										id: l.id,
										name: lang === "ar" ? l.nameAr : l.nameEn
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
								})]
							})]
						}, l.id);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "surface hidden overflow-x-auto rounded-2xl lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[560px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/60 text-start text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: t("library")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: t("branch")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3",
									children: t("location")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3" })
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: state.libraries.map((l) => {
							const b = state.branches.find((x) => x.id === l.branchId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 font-medium",
										children: lang === "ar" ? l.nameAr : l.nameEn
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										children: b ? lang === "ar" ? b.nameAr : b.nameEn : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-xs text-muted-foreground",
										children: l.address
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-end gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "ghost",
												onClick: () => openEditLibrary(l.id),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "ghost",
												className: "text-destructive",
												onClick: () => setDeleteTarget({
													kind: "library",
													id: l.id,
													name: lang === "ar" ? l.nameAr : l.nameEn
												}),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
											})]
										})
									})
								]
							}, l.id);
						}) })]
					})
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: branchOpen,
				onOpenChange: setBranchOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "dialog-mobile-full flex max-h-[100dvh] max-w-md flex-col gap-0 overflow-hidden p-0 sm:max-w-md sm:rounded-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
						className: "shrink-0 border-b border-border/70 bg-secondary/40 px-5 py-4 pe-14 sm:px-6 sm:py-5 sm:pe-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground",
								children: branchEditId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: branchEditId ? t("editBranch") : t("addBranch") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: branchEditId ? t("editBranchDesc") : t("addBranchDesc") })]
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex min-h-0 flex-1 flex-col",
						onSubmit: submitBranch,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("nameArLabel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: branchForm.nameAr,
										onChange: (e) => setBranchForm({
											...branchForm,
											nameAr: e.target.value
										}),
										className: fieldInputClass,
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("nameEnLabel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: branchForm.nameEn,
										onChange: (e) => setBranchForm({
											...branchForm,
											nameEn: e.target.value
										}),
										className: cn(fieldInputClass, "font-mono text-sm"),
										dir: "ltr",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("cityLabel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: branchForm.city,
										onChange: (e) => setBranchForm({
											...branchForm,
											city: e.target.value
										}),
										className: fieldInputClass,
										required: true
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "shrink-0 gap-2 border-t border-border/60 bg-secondary/30 px-5 py-4 sm:flex-row sm:justify-start sm:px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "h-11 min-w-[7.5rem] flex-1 touch-manipulation sm:flex-none",
								children: t("save")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								className: "h-11 min-w-[7.5rem] flex-1 touch-manipulation sm:flex-none",
								onClick: () => setBranchOpen(false),
								children: t("cancel")
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: libraryOpen,
				onOpenChange: setLibraryOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "dialog-mobile-full flex max-h-[100dvh] max-w-md flex-col gap-0 overflow-hidden p-0 sm:max-w-md sm:rounded-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
						className: "shrink-0 border-b border-border/70 bg-secondary/40 px-5 py-4 pe-14 sm:px-6 sm:py-5 sm:pe-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground",
								children: libraryEditId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: libraryEditId ? t("editLibrary") : t("addLibrary") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: libraryEditId ? t("editLibraryDesc") : t("addLibraryDesc") })]
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex min-h-0 flex-1 flex-col",
						onSubmit: submitLibrary,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("nameArLabel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: libForm.nameAr,
										onChange: (e) => setLibForm({
											...libForm,
											nameAr: e.target.value
										}),
										className: fieldInputClass,
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("nameEnLabel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: libForm.nameEn,
										onChange: (e) => setLibForm({
											...libForm,
											nameEn: e.target.value
										}),
										className: cn(fieldInputClass, "font-mono text-sm"),
										dir: "ltr",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("branch") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: libForm.branchId,
										onValueChange: (v) => setLibForm({
											...libForm,
											branchId: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "h-11 rounded-xl",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: t("selectBranch") })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: state.branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: b.id,
											children: lang === "ar" ? b.nameAr : b.nameEn
										}, b.id)) })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("location") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: libForm.address,
										onChange: (e) => setLibForm({
											...libForm,
											address: e.target.value
										}),
										className: fieldInputClass,
										required: true
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "shrink-0 gap-2 border-t border-border/60 bg-secondary/30 px-5 py-4 sm:flex-row sm:justify-start sm:px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "h-11 min-w-[7.5rem] flex-1 touch-manipulation sm:flex-none",
								children: t("save")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								className: "h-11 min-w-[7.5rem] flex-1 touch-manipulation sm:flex-none",
								onClick: () => setLibraryOpen(false),
								children: t("cancel")
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDeleteDialog, {
				open: !!deleteTarget,
				onOpenChange: (next) => !next && setDeleteTarget(null),
				title: t("confirmDeleteTitle"),
				description: deleteTarget?.kind === "branch" ? t("deleteBranchConfirm") : t("deleteLibraryConfirm"),
				itemName: deleteTarget?.name,
				onConfirm: () => {
					if (!deleteTarget) return;
					if (deleteTarget.kind === "branch") removeBranch(deleteTarget.id);
					else removeLibrary(deleteTarget.id);
					toast.success(t("delete"));
				}
			})
		]
	});
}
//#endregion
export { BranchesPage as component };
