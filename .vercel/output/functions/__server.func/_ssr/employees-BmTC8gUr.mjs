import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as useI18n, o as cn, u as useStore } from "./utils-mpiaTXtw.mjs";
import { t as Button } from "./button-DKPSQ_JL.mjs";
import { a as Trash2, p as Pencil, r as UserPlus } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BtT9cHtC.mjs";
import { t as Input } from "./input-Gn3khOPa.mjs";
import { t as Label } from "./label-DjwJeG8C.mjs";
import { t as ConfirmDeleteDialog } from "./confirm-delete-dialog-Cx9YNovL.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-md975D98.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/employees-BmTC8gUr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	dir: "ltr",
	className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", "disabled:cursor-not-allowed disabled:opacity-50", "data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/30", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block size-5 rounded-full bg-card shadow-sm ring-0 transition-transform", "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function EmployeesPanel() {
	const { t, lang } = useI18n();
	const { me, isSuper, state, upsertEmployee, removeEmployee, activeEmployees } = useStore();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		username: "",
		password: "222",
		phone: "",
		active: true
	});
	const rows = (0, import_react.useMemo)(() => {
		return activeEmployees.concat(state.accounts.filter((a) => a.kind === "employee" && !a.active)).sort((a, b) => a.name.localeCompare(b.name, lang === "ar" ? "ar" : "en"));
	}, [
		activeEmployees,
		state.accounts,
		lang
	]);
	if (!me || !isSuper) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rise-in surface rounded-2xl p-10 text-center text-sm text-muted-foreground",
		children: t("superOnly")
	});
	const openAdd = () => {
		setEditId(null);
		setForm({
			name: "",
			username: "",
			password: "222",
			phone: "",
			active: true
		});
		setOpen(true);
	};
	const openEdit = (id) => {
		const e = state.accounts.find((a) => a.id === id);
		if (!e) return;
		setEditId(id);
		setForm({
			name: e.name,
			username: e.username,
			password: e.password,
			phone: e.phone ?? "",
			active: e.active
		});
		setOpen(true);
	};
	const submit = (e) => {
		e.preventDefault();
		upsertEmployee({
			id: editId ?? void 0,
			name: form.name,
			username: form.username,
			password: form.password,
			phone: form.phone || null,
			active: form.active
		});
		toast.success(t("save"));
		setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise-in space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold sm:text-2xl",
					children: t("employees")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: t("employeesPageDesc")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "h-11 gap-2 touch-manipulation",
					onClick: openAdd,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), t("addEmployee")]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3 lg:hidden",
				children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "surface rounded-2xl p-10 text-center text-sm text-muted-foreground",
					children: t("noData")
				}) : rows.map((emp) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "surface app-card-tap rounded-2xl p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: emp.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-mono text-xs text-muted-foreground",
									children: emp.username
								}),
								emp.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-mono text-xs text-muted-foreground",
									children: emp.phone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: emp.active ? "rounded-full bg-success/15 px-2 py-0.5 font-medium text-success" : "rounded-full bg-secondary px-2 py-0.5 font-medium text-muted-foreground",
										children: emp.active ? t("active") : t("inactive")
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "iconLg",
								variant: "ghost",
								className: "touch-manipulation",
								onClick: () => openEdit(emp.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "iconLg",
								variant: "ghost",
								className: "touch-manipulation text-destructive",
								onClick: () => setDeleteTarget({
									id: emp.id,
									name: emp.name
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						})]
					})
				}, emp.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "surface hidden overflow-hidden rounded-2xl lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
						className: "hover:bg-transparent",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("name") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("username") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("phone") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: t("status") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-end",
								children: t("actions")
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						colSpan: 5,
						className: "py-10 text-center text-sm text-muted-foreground",
						children: t("noData")
					}) }) : rows.map((emp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: emp.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-mono text-xs",
							children: emp.username
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-mono text-xs",
							children: emp.phone ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: emp.active ? t("active") : t("inactive") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => openEdit(emp.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									className: "text-destructive",
									onClick: () => setDeleteTarget({
										id: emp.id,
										name: emp.name
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
								})]
							})
						})
					] }, emp.id)) })] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "dialog-mobile-full flex max-h-[100dvh] max-w-md flex-col gap-0 overflow-hidden p-0 sm:max-w-md sm:rounded-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
						className: "shrink-0 border-b border-border/70 bg-secondary/40 px-5 py-4 pe-14 sm:px-6 sm:py-5 sm:pe-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground",
								children: editId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editId ? t("editEmployee") : t("addEmployee") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: editId ? t("editEmployeeDesc") : t("addEmployeeDesc") })]
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex min-h-0 flex-1 flex-col",
						onSubmit: submit,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "emp-name",
										children: t("name")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "emp-name",
										value: form.name,
										onChange: (e) => setForm({
											...form,
											name: e.target.value
										}),
										className: "h-11 rounded-xl border-border/80 bg-background shadow-none",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "emp-username",
										children: t("username")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "emp-username",
										value: form.username,
										onChange: (e) => setForm({
											...form,
											username: e.target.value
										}),
										className: "h-11 rounded-xl border-border/80 bg-background font-mono text-sm shadow-none",
										dir: "ltr",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "emp-password",
										children: t("password")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "emp-password",
										type: "password",
										value: form.password,
										onChange: (e) => setForm({
											...form,
											password: e.target.value
										}),
										className: "h-11 rounded-xl border-border/80 bg-background font-mono text-sm shadow-none",
										dir: "ltr",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "emp-phone",
										children: t("phone")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "emp-phone",
										type: "tel",
										inputMode: "tel",
										value: form.phone,
										onChange: (e) => setForm({
											...form,
											phone: e.target.value
										}),
										className: "h-11 rounded-xl border-border/80 bg-background font-mono text-sm shadow-none",
										dir: "ltr"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-secondary/25 px-4 py-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 space-y-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "emp-active",
											className: "text-sm font-semibold",
											children: t("active")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs leading-relaxed text-muted-foreground",
											children: t("employeeActiveHint")
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										id: "emp-active",
										checked: form.active,
										onCheckedChange: (v) => setForm({
											...form,
											active: v
										})
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: cn("shrink-0 gap-2 border-t border-border/60 bg-secondary/30 px-5 py-4 sm:flex-row sm:justify-start sm:px-6", "flex-col sm:flex-row"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "h-11 min-w-[7.5rem] flex-1 touch-manipulation sm:flex-none",
								children: t("save")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								className: "h-11 min-w-[7.5rem] flex-1 touch-manipulation sm:flex-none",
								onClick: () => setOpen(false),
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
				description: t("deleteEmployeeConfirm"),
				itemName: deleteTarget?.name,
				onConfirm: () => {
					if (!deleteTarget) return;
					if (removeEmployee(deleteTarget.id)) toast.success(t("delete"));
					else toast.error(t("deleteFailed"));
				}
			})
		]
	});
}
function EmployeesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployeesPanel, {});
}
//#endregion
export { EmployeesPage as component };
