import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as useI18n, u as useStore } from "./utils-mpiaTXtw.mjs";
import { t as Button } from "./button-DKPSQ_JL.mjs";
import { C as KeyRound, n as User, s as Shield } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-Gn3khOPa.mjs";
import { t as Label } from "./label-DjwJeG8C.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DcGBq15N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { t } = useI18n();
	const { me, isSuper, updateSuperProfile } = useStore();
	const [name, setName] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [currentPassword, setCurrentPassword] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!me) return;
		setName(me.name);
		setUsername(me.username);
		setPhone(me.phone ?? "");
	}, [me]);
	if (!me || !isSuper) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise-in surface rounded-2xl p-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: t("superOnly")
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
	const saveProfile = (e) => {
		e.preventDefault();
		if (!name.trim() || !username.trim()) {
			toast.error(t("settingsRequired"));
			return;
		}
		if (newPassword && newPassword !== confirmPassword) {
			toast.error(t("passwordMismatch"));
			return;
		}
		if (newPassword && newPassword.length < 3) {
			toast.error(t("passwordTooShort"));
			return;
		}
		const result = updateSuperProfile({
			name: name.trim(),
			username: username.trim(),
			phone: phone.trim() || null,
			currentPassword: newPassword ? currentPassword : void 0,
			newPassword: newPassword || void 0
		});
		if (result === "username_taken") {
			toast.error(t("usernameTaken"));
			return;
		}
		if (result === "wrong_password") {
			toast.error(t("wrongCurrentPassword"));
			return;
		}
		if (result === "forbidden") {
			toast.error(t("superOnly"));
			return;
		}
		toast.success(t("profileUpdated"));
		setCurrentPassword("");
		setNewPassword("");
		setConfirmPassword("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise-in mx-auto max-w-2xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-bold sm:text-2xl",
			children: t("settings")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: t("settingsPageDesc")
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: saveProfile,
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface space-y-4 rounded-2xl p-4 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 border-b border-border/60 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-bold",
								children: t("accountSettings")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-xl bg-primary/5 px-3 py-2.5 ring-1 ring-primary/15",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold",
								children: t("superAdmin")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-muted-foreground",
								children: me.id
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "settings-name",
										children: t("name")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "settings-name",
										value: name,
										onChange: (e) => setName(e.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "settings-username",
										children: t("username")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "settings-username",
										value: username,
										onChange: (e) => setUsername(e.target.value),
										autoComplete: "username",
										dir: "ltr",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "settings-phone",
										children: t("phone")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "settings-phone",
										type: "tel",
										value: phone,
										onChange: (e) => setPhone(e.target.value),
										placeholder: "07XXXXXXXX",
										dir: "ltr"
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface space-y-4 rounded-2xl p-4 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 border-b border-border/60 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-bold",
								children: t("changePassword")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: t("changePasswordDesc")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "settings-current-pw",
										children: t("currentPassword")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "settings-current-pw",
										type: "password",
										value: currentPassword,
										onChange: (e) => setCurrentPassword(e.target.value),
										autoComplete: "current-password"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "settings-new-pw",
										children: t("newPassword")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "settings-new-pw",
										type: "password",
										value: newPassword,
										onChange: (e) => setNewPassword(e.target.value),
										autoComplete: "new-password"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "settings-confirm-pw",
										children: t("confirmPassword")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "settings-confirm-pw",
										type: "password",
										value: confirmPassword,
										onChange: (e) => setConfirmPassword(e.target.value),
										autoComplete: "new-password"
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "lg",
						children: t("save")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => {
							setName(me.name);
							setUsername(me.username);
							setPhone(me.phone ?? "");
							setCurrentPassword("");
							setNewPassword("");
							setConfirmPassword("");
						},
						children: t("cancel")
					})]
				})
			]
		})]
	});
}
//#endregion
export { SettingsPage as component };
