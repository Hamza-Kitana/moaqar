import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-Dg3XWKnY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "mwq.theme";
function readTheme() {
	if (typeof window === "undefined") return "light";
	const saved = window.localStorage.getItem(KEY);
	if (saved === "dark" || saved === "light") return saved;
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function applyTheme(theme) {
	document.documentElement.classList.toggle("dark", theme === "dark");
	document.documentElement.style.colorScheme = theme;
}
var ThemeContext = (0, import_react.createContext)(null);
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("light");
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useLayoutEffect)(() => {
		const initial = readTheme();
		setThemeState(initial);
		applyTheme(initial);
		setReady(true);
	}, []);
	(0, import_react.useLayoutEffect)(() => {
		if (!ready) return;
		applyTheme(theme);
		window.localStorage.setItem(KEY, theme);
	}, [theme, ready]);
	const setTheme = (0, import_react.useCallback)((next) => setThemeState(next), []);
	const toggle = (0, import_react.useCallback)(() => setThemeState((t) => t === "dark" ? "light" : "dark"), []);
	const value = (0, import_react.useMemo)(() => ({
		theme,
		setTheme,
		toggle
	}), [
		theme,
		setTheme,
		toggle
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value,
		children
	});
}
function useTheme() {
	const ctx = (0, import_react.useContext)(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
	return ctx;
}
//#endregion
export { useTheme as n, ThemeProvider as t };
