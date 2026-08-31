import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as useI18n, o as cn } from "./utils-mpiaTXtw.mjs";
import { F as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/WorkflowSteps-BRR2Im11.js
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	"new",
	"assigned",
	"resolved"
];
var stepKey = {
	new: "st_new",
	assigned: "st_assigned",
	resolved: "st_resolved"
};
function WorkflowSteps({ status }) {
	const { t } = useI18n();
	const currentIdx = STEPS.indexOf(status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "flex w-full min-w-0 items-start",
		children: STEPS.map((step, i) => {
			const done = i < currentIdx;
			const active = i === currentIdx;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex min-w-0 flex-1 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-col items-center gap-1.5 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-bold", done && "bg-success text-success-foreground", active && "bg-primary text-primary-foreground shadow-sm", !done && !active && "bg-secondary text-muted-foreground"),
						children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("line-clamp-2 text-[10px] leading-tight", active ? "font-semibold text-foreground" : "text-muted-foreground"),
						children: t(stepKey[step])
					})]
				}), i < STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("mx-1 mt-3.5 h-0.5 min-w-2 flex-1 rounded-full", done ? "bg-success/70" : "bg-border") })]
			}, step);
		})
	});
}
//#endregion
export { WorkflowSteps as t };
