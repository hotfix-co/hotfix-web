import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import { SiDotnet, SiReact, SiGo, SiKotlin, SiSwift, SiPython } from "react-icons/si";
import StructuredData from "@/components/StructuredData";
import { getFounderSchema, generateBreadcrumbSchema } from "@/lib/structuredData";
import { ROUTES, SITE_URL, type SiteLocale } from "@/lib/constants";
import {
  getLanguageAlternates,
  getLocalizedPath,
  getLocalizedUrl,
} from "@/lib/seo";

export function generateStaticParams() {
  return [{ locale: "hr" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const canonicalUrl = getLocalizedUrl(ROUTES.about, isEn ? "en" : "hr");

  return {
    title: {
      absolute: isEn
        ? "About HOTFIX d.o.o. — AI consulting from Croatia"
        : "O HOTFIX d.o.o. — AI consulting iz Hrvatske",
    },
    description: isEn
      ? "Croatian AI and software consulting firm founded by Josip Budalić. We help teams make better technical decisions and modernize software."
      : "Hrvatska consulting tvrtka za AI i software koju vodi Josip Budalić. Pomažemo timovima donositi bolje tehničke odluke i modernizirati software.",
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(ROUTES.about),
    },
    keywords: isEn
      ? [
          "HOTFIX d.o.o.",
          "Josip Budalić",
          "AI consulting Croatia",
          "software consulting Croatia",
          "software architecture",
          "Claude Code consultant",
          "AI-assisted development",
          "EU software consulting",
        ]
      : [
          "HOTFIX d.o.o.",
          "Josip Budalić",
          "AI consulting Hrvatska",
          "software consulting Hrvatska",
          "softverska arhitektura",
          "Claude Code",
          "AI-assisted development",
          "softverska tvrtka Hrvatska",
        ],
    openGraph: {
      url: canonicalUrl,
      type: "website",
      siteName: "HOTFIX d.o.o.",
      locale: isEn ? "en_US" : "hr_HR",
      title: isEn
        ? "About HOTFIX d.o.o. — AI & software consulting from Croatia"
        : "O HOTFIX d.o.o. — AI i software consulting iz Hrvatske",
      description: isEn
        ? "Practical AI consulting, software architecture, engineering processes, and custom software development."
        : "Praktičan AI consulting, softverska arhitektura, razvojni procesi i custom software development.",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "HOTFIX d.o.o. — AI and software consulting",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "About HOTFIX d.o.o. — AI consulting from Croatia"
        : "O HOTFIX d.o.o. — AI consulting iz Hrvatske",
      description: isEn
        ? "Croatian AI and software consulting firm founded by Josip Budalić."
        : "Hrvatska consulting tvrtka za AI i software koju vodi Josip Budalić.",
      images: ["/opengraph-image"],
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const loc = (locale === "en" ? "en" : "hr") satisfies SiteLocale;

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      {
        name: loc === "en" ? "Home" : "Početna",
        url: getLocalizedPath(ROUTES.home, loc),
      },
      {
        name: loc === "en" ? "About" : "O nama",
        url: getLocalizedPath(ROUTES.about, loc),
      },
    ],
    loc
  );
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${getLocalizedUrl(ROUTES.about, loc)}/#aboutpage`,
    url: getLocalizedUrl(ROUTES.about, loc),
    name: t("title"),
    description: t("description"),
    inLanguage: loc === "en" ? "en" : "hr-HR",
    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
    about: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
  };

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema, getFounderSchema(loc), aboutPageSchema]} />
      {/* Hero Section */}
      <section className="gradient-mesh relative overflow-hidden py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="pill-tag-soft mb-6">{t("heroEyebrow")}</span>
            <h1 className="mb-6 hero-title">
              {t("heroTitle")}
            </h1>
            <p className="text-[16px] leading-[1.4] text-[var(--ink-secondary)]">
              {t("heroDesc")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24" aria-labelledby="our-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-eyebrow mb-4 block">{t("storyEyebrow")}</span>
              <h2 id="our-story" className="section-title mb-6">
                {t("storyTitle")}
              </h2>
              <div className="space-y-4 text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                <p>
                  {t.rich("storyP1", {
                    strong: (chunks) => <strong>{chunks}</strong>,
                  })}
                </p>
                <p>
                  {t("storyP2")}
                </p>
                <p>
                  {t("storyP3")}
                </p>
              </div>
            </div>
            <div className="card-dashboard-mockup card-dashboard-mockup-dark p-8">
              <div className="space-y-8">
                <div>
                  <div className="mb-2 card-title-lg">{t("clearDecisions")}</div>
                  <div className="text-[15px] opacity-80">{t("clearDecisionsDesc")}</div>
                </div>
                <div>
                  <div className="mb-2 card-title-lg">{t("responsibleAI")}</div>
                  <div className="text-[15px] opacity-80">{t("responsibleAIDesc")}</div>
                </div>
                <div>
                  <div className="mb-2 card-title-lg">{t("sustainableDelivery")}</div>
                  <div className="text-[15px] opacity-80">{t("sustainableDeliveryDesc")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-[var(--canvas-soft)] py-24" aria-labelledby="mission-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="section-eyebrow mb-4 block">{t("principlesEyebrow")}</span>
            <h2 id="mission-values" className="section-title mb-5">
              {t("principlesTitle")}
            </h2>
            <p className="section-lede max-w-2xl">
              {t("principlesLede")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Mission */}
            <div className="card-feature-light">
              <h3 className="mb-4 card-title-lg text-[var(--ink)]">
                {t("mission")}
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                {t("missionDesc")}
              </p>
            </div>

            <div className="card-feature-light">
              <h3 className="mb-4 card-title-lg text-[var(--ink)]">
                {t("values")}
              </h3>
              <ul className="space-y-3 text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                  <span>{t("value1")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                  <span>{t("value2")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                  <span>{t("value3")}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                  <span>{t("value4")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24" aria-labelledby="our-expertise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="section-eyebrow mb-4 block">{t("techEyebrow")}</span>
            <h2 id="our-expertise" className="section-title mb-5">
              {t("techTitle")}
            </h2>
            <p className="section-lede max-w-2xl">
              {t("techLede")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* C# / .NET */}
            <div className="card-feature-light">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[var(--primary)]">
                <SiDotnet className="text-3xl" />
              </div>
              <h3 className="mb-3 text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[var(--ink)]">
                {t("dotnetTitle")}
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                {t("dotnetDesc")}
              </p>
            </div>

            {/* React */}
            <div className="card-feature-light">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[var(--primary)]">
                <SiReact className="text-3xl" />
              </div>
              <h3 className="mb-3 text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[var(--ink)]">
                {t("reactTitle")}
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                {t("reactDesc")}
              </p>
            </div>

            {/* Golang */}
            <div className="card-feature-light">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[var(--primary)]">
                <SiGo className="text-3xl" />
              </div>
              <h3 className="mb-3 text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[var(--ink)]">Golang</h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                {t("golangDesc")}
              </p>
            </div>

            {/* Kotlin */}
            <div className="card-feature-light">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[var(--primary)]">
                <SiKotlin className="text-3xl" />
              </div>
              <h3 className="mb-3 text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[var(--ink)]">Kotlin</h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                {t("kotlinDesc")}
              </p>
            </div>

            {/* KMM (Kotlin Multiplatform Mobile) */}
            <div className="card-feature-light">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[var(--primary)]">
                <SiKotlin className="text-3xl" />
              </div>
              <h3 className="mb-3 text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[var(--ink)]">
                {t("kmmTitle")}
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                {t("kmmDesc")}
              </p>
            </div>

            {/* Swift */}
            <div className="card-feature-light">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[var(--primary)]">
                <SiSwift className="text-3xl" />
              </div>
              <h3 className="mb-3 text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[var(--ink)]">Swift</h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                {t("swiftDesc")}
              </p>
            </div>

            {/* Python */}
            <div className="card-feature-light">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[var(--primary)]">
                <SiPython className="text-3xl" />
              </div>
              <h3 className="mb-3 text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[var(--ink)]">Python</h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                {t("pythonDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-[var(--canvas-soft)] py-24" aria-labelledby="our-approach">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="section-eyebrow mb-4 block">{t("processEyebrow")}</span>
            <h2 id="our-approach" className="section-title mb-5">
              {t("processTitle")}
            </h2>
            <p className="section-lede max-w-2xl">
              {t("processLede")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="card-feature-light">
              <div className="tabular mb-4 card-title-lg text-[var(--primary)]">
                1
              </div>
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                {t("step1Title")}
              </h3>
              <p className="text-[13px] leading-[1.4] text-[var(--ink-mute)]">
                {t("step1Desc")}
              </p>
            </div>

            <div className="card-feature-light">
              <div className="tabular mb-4 card-title-lg text-[var(--primary)]">
                2
              </div>
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">{t("step2Title")}</h3>
              <p className="text-[13px] leading-[1.4] text-[var(--ink-mute)]">
                {t("step2Desc")}
              </p>
            </div>

            <div className="card-feature-light">
              <div className="tabular mb-4 card-title-lg text-[var(--primary)]">
                3
              </div>
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                {t("step3Title")}
              </h3>
              <p className="text-[13px] leading-[1.4] text-[var(--ink-mute)]">
                {t("step3Desc")}
              </p>
            </div>

            <div className="card-feature-light">
              <div className="tabular mb-4 card-title-lg text-[var(--primary)]">
                4
              </div>
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">{t("step4Title")}</h3>
              <p className="text-[13px] leading-[1.4] text-[var(--ink-mute)]">
                {t("step4Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24" aria-labelledby="about-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-cream-band grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="section-eyebrow mb-4 block">{t("ctaEyebrow")}</span>
              <h2 id="about-cta" className="section-title mb-5">
                {t("ctaTitle")}
              </h2>
              <p className="section-lede max-w-2xl">
                {t("ctaLede")}
              </p>
            </div>
            <ContactTrackedLink
              href={ROUTES.contact}
              source="about_cta"
              className="button-primary-pill focus-ring w-full sm:w-auto"
            >
              {t("ctaButton")}
            </ContactTrackedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
