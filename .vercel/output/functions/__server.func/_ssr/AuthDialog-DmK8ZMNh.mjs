import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as useI18n, o as cn, u as useStore } from "./utils-mpiaTXtw.mjs";
import { t as Button } from "./button-DKPSQ_JL.mjs";
import { P as ChevronDown, b as Lock } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BtT9cHtC.mjs";
import { t as Input } from "./input-Gn3khOPa.mjs";
import { t as Label } from "./label-DjwJeG8C.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuthDialog-DmK8ZMNh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthDialogContext = (0, import_react.createContext)(null);
function AuthDialogProvider({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const openLogin = (0, import_react.useCallback)(() => setOpen(true), []);
	const closeLogin = (0, import_react.useCallback)(() => setOpen(false), []);
	const value = (0, import_react.useMemo)(() => ({
		open,
		openLogin,
		closeLogin
	}), [
		open,
		openLogin,
		closeLogin
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthDialogContext.Provider, {
		value,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthDialog, {
			open,
			onOpenChange: setOpen
		})]
	});
}
function useAuthDialog() {
	const ctx = (0, import_react.useContext)(AuthDialogContext);
	if (!ctx) throw new Error("useAuthDialog must be used inside AuthDialogProvider");
	return ctx;
}
function AuthDialog({ open, onOpenChange }) {
	const { t } = useI18n();
	const { login } = useStore();
	const navigate = useNavigate();
	const [u, setU] = (0, import_react.useState)("");
	const [p, setP] = (0, import_react.useState)("");
	const [showDemo, setShowDemo] = (0, import_react.useState)(false);
	const reset = () => {
		setU("");
		setP("");
		setShowDemo(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			if (!next) reset();
			onOpenChange(next);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "dialog-mobile-full flex max-h-[100dvh] max-w-md flex-col gap-0 overflow-hidden p-0 sm:max-w-md sm:rounded-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
				className: "shrink-0 border-b border-border/70 bg-secondary/40 px-5 py-4 pe-14 sm:px-6 sm:py-5 sm:pe-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground",
						children: "الم"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t("login") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t("loginDesc") })]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4",
					onSubmit: (e) => {
						e.preventDefault();
						const acc = login(u, p);
						if (!acc) {
							toast.error(t("invalidLogin"));
							return;
						}
						toast.success(`${t("welcome")} ${acc.name}`);
						reset();
						onOpenChange(false);
						navigate({ to: "/dashboard" });
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "auth-u",
								children: t("username")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "auth-u",
								value: u,
								onChange: (e) => setU(e.target.value),
								autoComplete: "username",
								className: "h-11",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "auth-p",
								children: t("password")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "auth-p",
								type: "password",
								value: p,
								onChange: (e) => setP(e.target.value),
								autoComplete: "current-password",
								className: "h-11",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							className: "h-11 w-full gap-2 touch-manipulation",
							size: "lg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-4" }), t("login")]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-2xl border border-border/70 bg-secondary/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setShowDemo((v) => !v),
						className: "flex w-full items-center justify-between gap-2 px-4 py-3 text-start text-sm font-semibold touch-manipulation",
						children: [t("demoAccounts"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 shrink-0 transition-transform", showDemo && "rotate-180") })]
					}), showDemo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border/60 px-4 pb-4 pt-2 text-[11px] leading-relaxed text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sadmin / 222" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "s.momani / 222" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "k.maidani / 222" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "z.kurdi / 222" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "o.faouri / 222" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "l.hammoud / 222" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "y.nablusi / 222" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "n.din / 222" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "k.sarhan / 222" })
							]
						})
					})]
				})]
			})]
		})
	});
}
//#endregion
export { useAuthDialog as n, AuthDialogProvider as t };
