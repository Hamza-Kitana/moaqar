import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/complaints-q-vkJ63X.js
var $$splitComponentImporter = () => import("./complaints-DFbkISWk.mjs");
var Route = createFileRoute("/dashboard/complaints")({
	validateSearch: (search) => {
		if (typeof search["region"] === "string") return { region: search["region"] };
		return {};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
