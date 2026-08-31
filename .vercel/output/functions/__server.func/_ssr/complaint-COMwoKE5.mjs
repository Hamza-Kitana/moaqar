import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as useI18n, n as GUEST_COMPLAINANT_ID, o as cn, t as BRANCH_COORDS, u as useStore } from "./utils-mpiaTXtw.mjs";
import { t as Button } from "./button-DKPSQ_JL.mjs";
import { T as ImagePlus, t as X } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-Gn3khOPa.mjs";
import { t as Label } from "./label-DjwJeG8C.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-u8WWaYi4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Textarea, t as LocationMap } from "./textarea-Ba8RCH0K.mjs";
import { t as SiteHeader } from "./SiteHeader-B6maIgL1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/complaint-COMwoKE5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ImageUpload({ images, onChange, label, hint }) {
	const inputRef = (0, import_react.useRef)(null);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const addFiles = (files) => {
		if (!files) return;
		Array.from(files).forEach((file) => {
			if (!file.type.startsWith("image/")) return;
			const reader = new FileReader();
			reader.onload = () => {
				if (typeof reader.result === "string") onChange([...images, reader.result]);
			};
			reader.readAsDataURL(file);
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "button",
				tabIndex: 0,
				onKeyDown: (e) => e.key === "Enter" && inputRef.current?.click(),
				onClick: () => inputRef.current?.click(),
				onDragOver: (e) => {
					e.preventDefault();
					setDragging(true);
				},
				onDragLeave: () => setDragging(false),
				onDrop: (e) => {
					e.preventDefault();
					setDragging(false);
					addFiles(e.dataTransfer.files);
				},
				className: cn("surface flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-8 transition-colors", dragging ? "border-primary bg-primary/5" : "border-border/70 hover:border-primary/40"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-12 place-items-center rounded-xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-6" })
					}),
					hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-center text-xs text-muted-foreground",
						children: hint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "file",
						accept: "image/*",
						multiple: true,
						className: "hidden",
						onChange: (e) => addFiles(e.target.files)
					})
				]
			}),
			images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: images.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: "",
						className: "size-20 rounded-xl border border-border object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onChange(images.filter((_, j) => j !== i)),
						className: "touch-target absolute -end-1.5 -top-1.5 grid size-7 place-items-center rounded-full bg-destructive text-destructive-foreground opacity-100 shadow-sm sm:opacity-0 sm:group-hover:opacity-100",
						"aria-label": "Remove",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
					})]
				}, i))
			})
		]
	});
}
function ComplaintPage() {
	const { t, lang } = useI18n();
	const { state, addComplaint } = useStore();
	const [complainantName, setComplainantName] = (0, import_react.useState)("");
	const [complainantPhone, setComplainantPhone] = (0, import_react.useState)("");
	const [branchId, setBranchId] = (0, import_react.useState)("");
	const [libraryId, setLibraryId] = (0, import_react.useState)("");
	const [locationText, setLocationText] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [images, setImages] = (0, import_react.useState)([]);
	const branchLibraries = state.libraries.filter((l) => !branchId || l.branchId === branchId);
	const selectedLibrary = state.libraries.find((l) => l.id === libraryId);
	const branch = branchId ? state.branches.find((b) => b.id === branchId) : null;
	const libraryCoords = selectedLibrary ? BRANCH_COORDS[selectedLibrary.branchId] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-[100dvh]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-3xl gap-6 px-3 py-6 sm:gap-8 sm:px-4 sm:py-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "surface rise-in rounded-2xl p-4 sm:rounded-3xl sm:p-6 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-bold sm:text-2xl",
						children: t("submitComplaint")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: t("submitComplaintDesc")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-6 space-y-4",
						onSubmit: (e) => {
							e.preventDefault();
							const name = complainantName.trim();
							const phone = complainantPhone.trim();
							if (!name) {
								toast.error(t("nameRequired"));
								return;
							}
							if (!phone) {
								toast.error(t("phoneRequired"));
								return;
							}
							if (!branchId || !libraryId || !selectedLibrary) {
								toast.error(t("branchInstitutionRequired"));
								return;
							}
							if (!notes.trim()) {
								toast.error(lang === "ar" ? "يرجى كتابة الشكوى" : "Please enter complaint details");
								return;
							}
							const coords = BRANCH_COORDS[selectedLibrary.branchId];
							const ref = addComplaint({
								libraryId,
								branchId: selectedLibrary.branchId,
								locationText: locationText.trim() || selectedLibrary.address,
								lat: coords?.lat ?? null,
								lng: coords?.lng ?? null,
								notes: notes.trim(),
								images,
								createdById: GUEST_COMPLAINANT_ID,
								createdByName: name,
								createdByPhone: phone
							});
							toast.success(`${t("complaintSentRef")} ${ref}`);
							setComplainantName("");
							setComplainantPhone("");
							setBranchId("");
							setLibraryId("");
							setLocationText("");
							setNotes("");
							setImages([]);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 rounded-xl border border-border/70 bg-secondary/25 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-primary",
									children: t("complainantInfo")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("name") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: complainantName,
											onChange: (e) => setComplainantName(e.target.value),
											required: true
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("phone") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "tel",
											value: complainantPhone,
											onChange: (e) => setComplainantPhone(e.target.value),
											placeholder: "07XXXXXXXX",
											dir: "ltr",
											required: true
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("branch") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: branchId,
										onValueChange: (v) => {
											setBranchId(v);
											setLibraryId("");
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: t("selectBranch") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: state.branches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: b.id,
											children: lang === "ar" ? b.nameAr : b.nameEn
										}, b.id)) })]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("library") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: libraryId,
											onValueChange: setLibraryId,
											disabled: !branchId,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: t("selectLibrary") }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: branchLibraries.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: l.id,
												children: lang === "ar" ? l.nameAr : l.nameEn
											}, l.id)) })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground",
											children: t("libraryLocationHint")
										})
									]
								})]
							}),
							branch && selectedLibrary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 rounded-xl border border-border/70 bg-secondary/30 px-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: [t("branch"), ": "]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: lang === "ar" ? branch.nameAr : branch.nameEn
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mx-2 text-muted-foreground",
											children: "·"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: lang === "ar" ? selectedLibrary.nameAr : selectedLibrary.nameEn
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-muted-foreground",
											children: selectedLibrary.address
										})
									]
								}), libraryCoords && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationMap, {
									lat: libraryCoords.lat,
									lng: libraryCoords.lng,
									title: t("library"),
									subtitle: selectedLibrary.address,
									mapLabel: t("viewOnMap"),
									approximate: true,
									approximateLabel: t("approxLocation"),
									mapClassName: "aspect-[16/9]"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("location") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: locationText,
									onChange: (e) => setLocationText(e.target.value),
									placeholder: selectedLibrary?.address ?? ""
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("notes") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: notes,
									onChange: (e) => setNotes(e.target.value),
									rows: 5,
									required: true,
									placeholder: lang === "ar" ? "اشرح المشكلة بالتفصيل..." : "Describe the issue in detail..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUpload, {
								images,
								onChange: setImages,
								label: t("images"),
								hint: t("imageHint")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sticky bottom-0 -mx-4 border-t border-border/60 bg-card/95 px-4 py-3 backdrop-blur-md sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none supports-[padding:max(0px)]:pb-[max(0.75rem,env(safe-area-inset-bottom))]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "w-full touch-manipulation",
									size: "lg",
									children: t("send")
								})
							})
						]
					})
				]
			})
		})]
	});
}
//#endregion
export { ComplaintPage as component };
