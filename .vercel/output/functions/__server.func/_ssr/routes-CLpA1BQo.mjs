import { M as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { l as useI18n, o as cn } from "./utils-mpiaTXtw.mjs";
import { t as Button } from "./button-DKPSQ_JL.mjs";
import { A as CircleCheck, H as ArrowLeft, V as ArrowRight, _ as Mail, f as Phone, g as MapPin, s as Shield, z as BookOpen } from "../_libs/lucide-react.mjs";
import { n as useAuthDialog } from "./AuthDialog-DmK8ZMNh.mjs";
import { t as SiteHeader } from "./SiteHeader-B6maIgL1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CLpA1BQo.js
var import_jsx_runtime = require_jsx_runtime();
var HERO_IMG = "/hero-bg.jpg?v=3";
var ABOUT_IMG = "https://images.unsplash.com/photo-1481627834876-b7833e1d8223?auto=format&fit=crop&w=1600&q=80";
var SECTION_X = "px-6 sm:px-10 lg:px-16 xl:px-24";
function HomeSection({ id, className, children, fullScreen = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		className: cn("home-section relative w-full", fullScreen ? "min-h-svh" : "min-h-0 py-12 sm:min-h-[70svh] lg:min-h-svh", className),
		children
	});
}
function ImagePanel({ img, title, body, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group relative min-h-[14rem] overflow-hidden sm:min-h-[18rem] lg:min-h-[20rem] lg:flex-1", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: img,
				alt: "",
				className: "absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex h-full min-h-[16rem] flex-col justify-end p-6 sm:min-h-[20rem] sm:p-8 lg:p-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl font-bold text-white sm:text-2xl",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-sm text-sm leading-relaxed text-white/80",
					children: body
				})]
			})
		]
	});
}
function ServiceRow({ img, title, body, reverse = false, delay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("home-rise grid min-h-[28rem] w-full lg:min-h-[32rem] lg:grid-cols-2", reverse && "lg:[&>*:first-child]:order-2"),
		style: delay ? { animationDelay: delay } : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative min-h-[14rem] overflow-hidden sm:min-h-[18rem] lg:min-h-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: img,
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-primary/10" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex flex-col justify-center bg-card px-6 py-10 sm:px-10 sm:py-12 lg:px-16 xl:px-20"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mb-2 h-1 w-10 rounded-full bg-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base",
				children: body
			})]
		})]
	});
}
function Index() {
	const { t, lang, dir } = useI18n();
	const { openLogin } = useAuthDialog();
	const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
	const highlights = [
		{
			img: HERO_IMG,
			title: t("heroStat1"),
			body: t("heroStat1Desc")
		},
		{
			img: "/home-install.jpg",
			title: t("heroStat2"),
			body: t("heroStat2Desc")
		},
		{
			img: "/home-team.jpg",
			title: t("heroStat3"),
			body: t("heroStat3Desc")
		}
	];
	const services = [
		{
			img: "/home-supply.jpg",
			title: t("homeService1Title"),
			body: t("homeService1Body")
		},
		{
			img: "/home-install.jpg",
			title: t("homeService2Title"),
			body: t("homeService2Body")
		},
		{
			img: "/home-team.jpg",
			title: t("homeService3Title"),
			body: t("homeService3Body")
		}
	];
	const steps = [
		{
			img: "/home-supply.jpg",
			title: t("homeStep1"),
			body: t("homeStep1Desc")
		},
		{
			img: "/home-install.jpg",
			title: t("homeStep2"),
			body: t("homeStep2Desc")
		},
		{
			img: "/home-team.jpg",
			title: t("homeStep3"),
			body: t("homeStep3Desc")
		}
	];
	const aboutPoints = [
		t("homeAboutPoint1"),
		t("homeAboutPoint2"),
		t("homeAboutPoint3")
	];
	const contactItems = [
		{
			icon: Phone,
			label: lang === "ar" ? "الهاتف" : "Phone",
			value: t("contactPhone")
		},
		{
			icon: Mail,
			label: lang === "ar" ? "البريد" : "Email",
			value: t("contactEmail")
		},
		{
			icon: MapPin,
			label: lang === "ar" ? "العنوان" : "Address",
			value: t("contactAddress")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { transparent: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HomeSection, {
						fullScreen: true,
						className: "isolate flex flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: HERO_IMG,
								alt: "",
								className: "home-hero-img absolute inset-0 size-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(135deg,oklch(0.16_0.045_255/0.93)_0%,oklch(0.22_0.04_255/0.78)_50%,oklch(0.28_0.035_255/0.55)_100%)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,oklch(0.72_0.09_76/0.15),transparent_60%)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("relative flex flex-1 flex-col justify-center py-28 sm:py-32", SECTION_X),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "home-rise mx-auto w-full max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-start",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-sm sm:text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5 text-gold" }), t("tagline")]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]",
											children: t("heroTitle")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-lg font-semibold text-gold sm:text-xl",
											children: t("heroSubtitle")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base lg:mx-0",
											children: t("heroBody")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-8 flex flex-wrap justify-center gap-3 lg:justify-start",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												size: "lg",
												className: "h-11 bg-gold px-6 text-gold-foreground shadow-lg hover:opacity-95",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: "#contact",
													className: "gap-2",
													children: [t("homeContactUs"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, { className: "size-4" })]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "lg",
												variant: "outline",
												className: "h-11 border-white/30 bg-white/8 px-6 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white",
												onClick: () => openLogin(),
												children: t("login")
											})]
										})
									]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeSection, {
						className: "flex flex-col lg:flex-row",
						children: highlights.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePanel, {
							...item,
							className: cn(i > 0 && "border-t lg:border-t-0 lg:border-s border-white/10")
						}, item.title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HomeSection, {
						className: "flex flex-col bg-background",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("home-rise border-b border-border/60 py-12 text-center sm:py-16", SECTION_X),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-primary",
									children: t("services")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-2xl font-bold tracking-tight sm:text-4xl",
									children: t("servicesIntro")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base",
									children: t("servicesIntroDesc")
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-1 flex-col",
							children: services.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceRow, {
								...s,
								reverse: i % 2 === 1,
								delay: `${.06 * i}s`
							}, s.title))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HomeSection, {
						className: "bg-primary text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("home-rise py-12 sm:py-16", SECTION_X),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-gold",
								children: t("homeWorkflow")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-2xl font-bold tracking-tight sm:text-3xl",
								children: t("homeWorkflowDesc")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid w-full grid-cols-1 lg:grid-cols-3",
							children: steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("home-rise group relative min-h-[18rem] overflow-hidden", i > 0 && "border-t border-white/12 lg:border-t-0 lg:border-s"),
								style: { animationDelay: `${.05 * i}s` },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: step.img,
										alt: "",
										className: "absolute inset-0 size-full object-cover opacity-40 transition-opacity duration-500 group-hover:opacity-55"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative flex h-full min-h-[18rem] flex-col justify-end p-6 sm:p-8 lg:p-10",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-4xl font-bold text-gold/90",
												children: String(i + 1).padStart(2, "0")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-3 font-display text-lg font-bold sm:text-xl",
												children: step.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm leading-relaxed text-primary-foreground/75",
												children: step.body
											})
										]
									})
								]
							}, step.title))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HomeSection, {
						className: "grid lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "home-rise relative min-h-[20rem] overflow-hidden lg:min-h-svh",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: ABOUT_IMG,
									alt: "",
									className: "absolute inset-0 size-full object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/25 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("absolute inset-x-0 bottom-0 p-6 sm:p-10", SECTION_X),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-gold",
										children: t("tagline")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 flex items-center gap-2 text-sm text-white/80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4 text-gold" }), lang === "ar" ? "عمان · عجلون · إربد" : "Amman · Ajloun · Irbid"]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("home-rise flex flex-col justify-center bg-card py-14 lg:min-h-svh lg:border-s lg:border-border/60", SECTION_X),
							style: { animationDelay: "0.08s" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-primary",
									children: t("about")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-2xl font-bold tracking-tight sm:text-4xl",
									children: t("brand")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base",
									children: t("aboutBody")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-6 space-y-3",
									children: aboutPoints.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2.5 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 shrink-0 text-success" }), item]
									}, item))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "lg",
										className: "gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "#contact",
											children: [t("homeContactUs"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, { className: "size-4" })]
										})
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(HomeSection, {
						id: "contact",
						className: "relative overflow-hidden bg-secondary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: HERO_IMG,
								alt: "",
								className: "absolute inset-0 size-full object-cover opacity-20"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-background/85 backdrop-blur-sm" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("home-rise relative flex flex-col justify-center py-12 sm:min-h-[70svh] lg:min-h-svh", SECTION_X),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mx-auto w-full max-w-4xl text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-bold sm:text-3xl",
										children: t("contact")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground sm:text-base",
										children: t("homeContactIntro")
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "relative mx-auto mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3",
									children: contactItems.map(({ icon: Icon, label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "home-rise flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid size-12 place-items-center rounded-xl bg-primary/10 text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm font-semibold sm:text-base",
											children: value
										})] })]
									}, label))
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "home-section w-full border-t border-border/60 bg-card py-10 sm:py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex w-full flex-col items-center gap-3 text-center", SECTION_X),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground",
							children: "الم"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-semibold",
							children: t("brand")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-lg text-xs text-muted-foreground",
							children: t("tagline")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-muted-foreground",
							children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" ",
								t("brand")
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Index as component };
