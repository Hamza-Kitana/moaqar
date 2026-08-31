import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Mail,
  MapPin,
  Phone,
  Shield,
} from "lucide-react";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "شركة الموقر التجارية | توريد وتجهيز المؤسسات" },
      {
        name: "description",
        content: "شركة الموقر التجارية — توريد وتجهيز المؤسسات في المملكة الأردنية.",
      },
      { property: "og:title", content: "شركة الموقر التجارية | توريد وتجهيز المؤسسات" },
      {
        property: "og:description",
        content: "شركة الموقر التجارية — شريككم في توريد وتجهيز المؤسسات.",
      },
    ],
  }),
  component: Index,
});

const HERO_IMG = "/hero-bg.jpg?v=3";
const ABOUT_IMG =
  "https://images.unsplash.com/photo-1481627834876-b7833e1d8223?auto=format&fit=crop&w=1600&q=80";

const SECTION_X = "px-6 sm:px-10 lg:px-16 xl:px-24";

function HomeSection({
  id,
  className,
  children,
  fullScreen = false,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  fullScreen?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "home-section relative w-full",
        fullScreen ? "min-h-svh" : "min-h-0 py-12 sm:min-h-[70svh] lg:min-h-svh",
        className,
      )}
    >
      {children}
    </section>
  );
}

function ImagePanel({
  img,
  title,
  body,
  className,
}: {
  img: string;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div className={cn("group relative min-h-[14rem] overflow-hidden sm:min-h-[18rem] lg:min-h-[20rem] lg:flex-1", className)}>
      <img
        src={img}
        alt=""
        className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20" />
      <div className="relative flex h-full min-h-[16rem] flex-col justify-end p-6 sm:min-h-[20rem] sm:p-8 lg:p-10">
        <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{title}</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">{body}</p>
      </div>
    </div>
  );
}

function ServiceRow({
  img,
  title,
  body,
  reverse = false,
  delay,
}: {
  img: string;
  title: string;
  body: string;
  reverse?: boolean;
  delay?: string;
}) {
  return (
    <div
      className={cn(
        "home-rise grid min-h-[28rem] w-full lg:min-h-[32rem] lg:grid-cols-2",
        reverse && "lg:[&>*:first-child]:order-2",
      )}
      style={delay ? { animationDelay: delay } : undefined}
    >
      <div className="relative min-h-[14rem] overflow-hidden sm:min-h-[18rem] lg:min-h-full">
        <img src={img} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-primary/10" />
      </div>
      <div className={cn("flex flex-col justify-center bg-card px-6 py-10 sm:px-10 sm:py-12 lg:px-16 xl:px-20")}>
        <div className="mb-2 h-1 w-10 rounded-full bg-gold" />
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">{body}</p>
      </div>
    </div>
  );
}

function Index() {
  const { t, lang, dir } = useI18n();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const highlights = [
    { img: HERO_IMG, title: t("heroStat1"), body: t("heroStat1Desc") },
    { img: "/home-install.jpg", title: t("heroStat2"), body: t("heroStat2Desc") },
    { img: "/home-team.jpg", title: t("heroStat3"), body: t("heroStat3Desc") },
  ];

  const services = [
    { img: "/home-supply.jpg", title: t("homeService1Title"), body: t("homeService1Body") },
    { img: "/home-install.jpg", title: t("homeService2Title"), body: t("homeService2Body") },
    { img: "/home-team.jpg", title: t("homeService3Title"), body: t("homeService3Body") },
  ];

  const steps = [
    { img: "/home-supply.jpg", title: t("homeStep1"), body: t("homeStep1Desc") },
    { img: "/home-install.jpg", title: t("homeStep2"), body: t("homeStep2Desc") },
    { img: "/home-team.jpg", title: t("homeStep3"), body: t("homeStep3Desc") },
  ];

  const aboutPoints = [t("homeAboutPoint1"), t("homeAboutPoint2"), t("homeAboutPoint3")];

  const contactItems = [
    { icon: Phone, label: lang === "ar" ? "الهاتف" : "Phone", value: t("contactPhone") },
    { icon: Mail, label: lang === "ar" ? "البريد" : "Email", value: t("contactEmail") },
    { icon: MapPin, label: lang === "ar" ? "العنوان" : "Address", value: t("contactAddress") },
  ];

  return (
    <div className="overflow-x-hidden bg-background">
      <SiteHeader transparent />

      <main className="w-full">
        {/* Hero */}
        <HomeSection fullScreen className="isolate flex flex-col">
          <img src={HERO_IMG} alt="" className="home-hero-img absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.16_0.045_255/0.93)_0%,oklch(0.22_0.04_255/0.78)_50%,oklch(0.28_0.035_255/0.55)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,oklch(0.72_0.09_76/0.15),transparent_60%)]" />

          <div className={cn("relative flex flex-1 flex-col justify-center py-28 sm:py-32", SECTION_X)}>
            <div className="home-rise mx-auto w-full max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-sm sm:text-xs">
                <Shield className="size-3.5 text-gold" />
                {t("tagline")}
              </span>
              <h1 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
                {t("heroTitle")}
              </h1>
              <p className="mt-3 text-lg font-semibold text-gold sm:text-xl">{t("heroSubtitle")}</p>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base lg:mx-0">
                {t("heroBody")}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Button asChild size="lg" className="h-11 bg-gold px-6 text-gold-foreground shadow-lg hover:opacity-95">
                  <Link to="/complaint" className="gap-2">
                    <ClipboardList className="size-4" />
                    {t("submitComplaint")}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 border-white/30 bg-white/8 px-6 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
                >
                  <a href="#contact" className="gap-2">
                    {t("homeContactUs")}
                    <Arrow className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </HomeSection>

        {/* Highlights — 3 image panels */}
        <HomeSection className="flex flex-col lg:flex-row">
          {highlights.map((item, i) => (
            <ImagePanel key={item.title} {...item} className={cn(i > 0 && "border-t lg:border-t-0 lg:border-s border-white/10")} />
          ))}
        </HomeSection>

        {/* Services */}
        <HomeSection className="flex flex-col bg-background">
          <div className={cn("home-rise border-b border-border/60 py-12 text-center sm:py-16", SECTION_X)}>
            <p className="text-sm font-semibold text-primary">{t("services")}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">{t("servicesIntro")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">{t("servicesIntroDesc")}</p>
          </div>
          <div className="flex flex-1 flex-col">
            {services.map((s, i) => (
              <ServiceRow key={s.title} {...s} reverse={i % 2 === 1} delay={`${0.06 * i}s`} />
            ))}
          </div>
        </HomeSection>

        {/* Workflow */}
        <HomeSection className="bg-primary text-primary-foreground">
          <div className={cn("home-rise py-12 sm:py-16", SECTION_X)}>
            <p className="text-sm font-semibold text-gold">{t("homeWorkflow")}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{t("homeWorkflowDesc")}</h2>
          </div>
          <div className="grid w-full grid-cols-1 lg:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className={cn(
                  "home-rise group relative min-h-[18rem] overflow-hidden",
                  i > 0 && "border-t border-white/12 lg:border-t-0 lg:border-s",
                )}
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <img
                  src={step.img}
                  alt=""
                  className="absolute inset-0 size-full object-cover opacity-40 transition-opacity duration-500 group-hover:opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
                <div className="relative flex h-full min-h-[18rem] flex-col justify-end p-6 sm:p-8 lg:p-10">
                  <span className="font-display text-4xl font-bold text-gold/90">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-lg font-bold sm:text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </HomeSection>

        {/* About */}
        <HomeSection className="grid lg:grid-cols-2">
          <div className="home-rise relative min-h-[20rem] overflow-hidden lg:min-h-svh">
            <img src={ABOUT_IMG} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/25 to-transparent" />
            <div className={cn("absolute inset-x-0 bottom-0 p-6 sm:p-10", SECTION_X)}>
              <p className="text-sm font-semibold text-gold">{t("tagline")}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                <BookOpen className="size-4 text-gold" />
                {lang === "ar" ? "عمان · عجلون · إربد" : "Amman · Ajloun · Irbid"}
              </p>
            </div>
          </div>
          <div
            className={cn("home-rise flex flex-col justify-center bg-card py-14 lg:min-h-svh lg:border-s lg:border-border/60", SECTION_X)}
            style={{ animationDelay: "0.08s" }}
          >
            <p className="text-sm font-semibold text-primary">{t("about")}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">{t("brand")}</h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">{t("aboutBody")}</p>
            <ul className="mt-6 space-y-3">
              {aboutPoints.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle2 className="size-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2 bg-gold text-gold-foreground hover:opacity-95">
                <Link to="/complaint">
                  <ClipboardList className="size-4" />
                  {t("submitComplaint")}
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="gap-2">
                <a href="#contact">
                  {t("homeContactUs")}
                  <Arrow className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </HomeSection>

        {/* Contact */}
        <HomeSection id="contact" className="relative overflow-hidden bg-secondary/40">
          <img src={HERO_IMG} alt="" className="absolute inset-0 size-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
          <div className={cn("home-rise relative flex flex-col justify-center py-12 sm:min-h-[70svh] lg:min-h-svh", SECTION_X)}>
            <div className="mx-auto w-full max-w-4xl text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">{t("contact")}</h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">{t("homeContactIntro")}</p>
            </div>
            <ul className="relative mx-auto mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <li
                  key={label}
                  className="home-rise flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-1 text-sm font-semibold sm:text-base">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </HomeSection>
      </main>

      <SiteFooter className="home-section" />
    </div>
  );
}
