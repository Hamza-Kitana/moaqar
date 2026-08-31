import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as useStore } from "./utils-mpiaTXtw.mjs";
import { _ as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAuthDialog } from "./AuthDialog-DmK8ZMNh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Cg42rV43.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginRedirect() {
	const { me } = useStore();
	const { openLogin } = useAuthDialog();
	(0, import_react.useEffect)(() => {
		if (!me) openLogin();
	}, [me, openLogin]);
	if (me) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/dashboard",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/",
		replace: true
	});
}
//#endregion
export { LoginRedirect as component };
