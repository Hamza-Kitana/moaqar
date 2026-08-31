import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as cn } from "./utils-mpiaTXtw.mjs";
import { g as MapPin } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/textarea-Ba8RCH0K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Embedded map (Google Maps embed + OSM fallback link) — no API key required */
function LocationMap({ lat, lng, title, subtitle, mapLabel, approximate, approximateLabel, className, mapClassName }) {
	const embedSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=15&hl=ar&output=embed`;
	const openUrl = `https://www.google.com/maps?q=${lat},${lng}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("overflow-hidden rounded-xl border border-border/70 bg-card", className),
		children: [
			(title || subtitle) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border/60 bg-secondary/40 px-3 py-2.5",
				children: [
					title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold",
						children: title
					}),
					subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-sm font-medium text-foreground/90",
						children: subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 flex items-center gap-1 font-mono text-[11px] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3 shrink-0" }),
							lat.toFixed(5),
							", ",
							lng.toFixed(5),
							approximate && approximateLabel ? ` · ${approximateLabel}` : ""
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("relative aspect-[16/10] w-full bg-secondary/30", mapClassName),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: title ?? mapLabel,
					src: embedSrc,
					className: "absolute inset-0 size-full border-0",
					loading: "lazy",
					referrerPolicy: "no-referrer-when-downgrade",
					allowFullScreen: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border/60 px-3 py-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: openUrl,
					target: "_blank",
					rel: "noreferrer",
					className: "text-xs font-medium text-primary hover:underline",
					children: mapLabel
				})
			})
		]
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
export { Textarea as n, LocationMap as t };
