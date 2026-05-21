import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServiceCard from "@/components/ServiceCard";
import { Link } from "@/i18n/navigation";
import StructuredData from "@/components/StructuredData";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateItemListSchema,
} from "@/lib/structuredData";
import { ROUTES } from "@/lib/constants";
import {
  getLanguageAlternates,
  getLocalizedPath,
  getLocalizedUrl,
} from "@/lib/seo";

const I18N_ROUTES = {
  aiConsulting: "/services/ai-consulting" as const,
  quality: "/services/gdpr-quality" as const,
  productivity: "/services/productivity" as const,
  contact: "/contact" as const,
};

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
  const canonicalUrl = getLocalizedUrl(ROUTES.services, isEn ? "en" : "hr");

  return {
    title: isEn
      ? "Services - AI consulting, software consulting & development"
      : "Usluge - AI consulting, software consulting i development",
    description: isEn
      ? "AI consulting, Claude Code enablement, multi-agent systems, software architecture, engineering processes, custom software development, integrations, and modernization."
      : "AI consulting, Claude Code enablement, multi-agent sustavi, software arhitektura, engineering procesi, custom software development, integracije i modernizacija.",
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(ROUTES.services),
    },
    openGraph: {
      url: canonicalUrl,
      type: "website",
      siteName: "HOTFIX d.o.o.",
      locale: isEn ? "en_US" : "hr_HR",
      title: isEn
        ? "AI & software consulting services | HOTFIX d.o.o."
        : "AI i software consulting usluge | HOTFIX d.o.o.",
      description: isEn
        ? "From AI adoption and Claude Code workflows to architecture, custom development, integrations, and software modernization."
        : "Od AI adopcije i Claude Code workflowa do arhitekture, custom developmenta, integracija i modernizacije softwarea.",
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
      images: ["/opengraph-image"],
    },
    keywords: [
      "AI consulting",
      isEn ? "AI adoption" : "AI adopcija",
      "Claude Code consulting",
      isEn ? "multi-agent systems" : "multi-agent sustavi",
      "software consulting",
      isEn ? "software architecture" : "software arhitektura",
      "custom software development",
      isEn ? "software modernization" : "modernizacija softwarea",
      isEn ? "engineering processes" : "engineering procesi",
    ],
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "services" });

  const isEn = locale === "en";
  const includesLabel = isEn ? "What's included" : "Što uključuje";

  const loc = isEn ? "en" : "hr";
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: isEn ? "Home" : "Početna", url: getLocalizedPath(ROUTES.home, loc) },
      { name: isEn ? "Services" : "Usluge", url: getLocalizedPath(ROUTES.services, loc) },
    ],
    loc
  );

  const services = [
    {
      title: t("service1Title"),
      description: t("service1Desc"),
      icon: "AI",
      features: [t("service1f1"), t("service1f2"), t("service1f3"), t("service1f4"), t("service1f5")],
    },
    {
      title: t("service2Title"),
      description: t("service2Desc"),
      icon: "CC",
      features: [t("service2f1"), t("service2f2"), t("service2f3"), t("service2f4"), t("service2f5")],
    },
    {
      title: t("service3Title"),
      description: t("service3Desc"),
      icon: "SD",
      features: [t("service3f1"), t("service3f2"), t("service3f3"), t("service3f4"), t("service3f5")],
    },
    {
      title: t("service4Title"),
      description: t("service4Desc"),
      icon: "CS",
      features: [t("service4f1"), t("service4f2"), t("service4f3"), t("service4f4"), t("service4f5")],
    },
  ];

  const technologies = [
    {
      category: t("catAI"),
      techs: isEn
        ? ["Claude Code", "Codex", "LLM evaluations", "Multi-agent systems", "MCP", "RAG", "Prompt rules"]
        : ["Claude Code", "Codex", "LLM evaluacije", "Multi-agent sustavi", "MCP", "RAG", "Prompt pravila"],
    },
    {
      category: t("catBackend"),
      techs: [".NET", "Go", "Python", "Node.js", "PostgreSQL", "REST API", "GraphQL", "Cloud"],
    },
    {
      category: t("catFrontend"),
      techs: ["TypeScript", "React", "Next.js", "Kotlin", "KMM", "Swift", "SwiftUI", "Jetpack Compose"],
    },
    {
      category: t("catDelivery"),
      techs: isEn
        ? ["GitHub Actions", "Docker", "Playwright", "Automated tests", "Observability", "Runbooks", "Git", "CI/CD"]
        : ["GitHub Actions", "Docker", "Playwright", "Automatizirani testovi", "Observability", "Runbooks", "Git", "CI/CD"],
    },
  ];

  // Generate service schemas
  const serviceSchemas = services.map(service =>
    generateServiceSchema(service.title, service.description, loc)
  );

  // ItemList of specialized service entry points (better rich-result eligibility)
  const itemListSchema = generateItemListSchema(
    [
      {
        name: t("specAI"),
        url: getLocalizedPath(ROUTES.aiConsulting, loc),
        description: t("specAIDesc"),
      },
      {
        name: t("specQuality"),
        url: getLocalizedPath(ROUTES.quality, loc),
        description: t("specQualityDesc"),
      },
      {
        name: t("specProductivity"),
        url: getLocalizedPath(ROUTES.productivity, loc),
        description: t("specProductivityDesc"),
      },
    ],
    loc
  );

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema, itemListSchema, ...serviceSchemas]} />
      {/* Hero Section */}
      <section className="gradient-mesh relative overflow-hidden py-24" aria-labelledby="services-hero">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:items-end">
          <div>
            <span className="pill-tag-soft mb-6">{t("heroEyebrow")}</span>
            <h1 id="services-hero" className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-[var(--ink)] md:text-[56px] md:leading-[1.03] md:tracking-[-1.4px]">
              {t("heroTitle")}
            </h1>
            <p className="max-w-2xl text-[16px] leading-[1.4] text-[var(--ink-secondary)]">
              {t("heroDesc")}
            </p>
          </div>
          <div className="card-dashboard-mockup bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="section-eyebrow">{t("mapTitle")}</span>
              <span className="tabular text-[13px] text-[var(--primary-deep)]">{t("mapCount")}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service, index) => (
                <div key={service.title} className="rounded-[var(--radius-md)] border border-[var(--hairline)] bg-[var(--canvas-soft)] p-4">
                  <span className="tabular mb-3 block text-[13px] text-[var(--primary-deep)]">0{index + 1}</span>
                  <h3 className="text-[18px] font-bold leading-[1.4] text-[var(--ink)]">{service.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="section-title">{t("specializedTitle")}</h2>
            <p className="section-lede">{t("specializedDesc")}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Link href={I18N_ROUTES.aiConsulting} className="card-feature-light transition-transform duration-200 hover:-translate-y-1">
              <h3 className="mb-2 text-[18px] font-semibold">{t("specAI")}</h3>
              <p className="text-[14px] text-[var(--ink-mute)]">{t("specAIDesc")}</p>
            </Link>

            <Link href={I18N_ROUTES.quality} className="card-feature-light transition-transform duration-200 hover:-translate-y-1">
              <h3 className="mb-2 text-[18px] font-semibold">{t("specQuality")}</h3>
              <p className="text-[14px] text-[var(--ink-mute)]">{t("specQualityDesc")}</p>
            </Link>

            <Link href={I18N_ROUTES.productivity} className="card-feature-light transition-transform duration-200 hover:-translate-y-1">
              <h3 className="mb-2 text-[18px] font-semibold">{t("specProductivity")}</h3>
              <p className="text-[14px] text-[var(--ink-mute)]">{t("specProductivityDesc")}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                features={service.features}
                includesLabel={includesLabel}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--canvas-soft)] py-24" aria-labelledby="technology-stack">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="section-eyebrow mb-4 block">{t("stackEyebrow")}</span>
            <h2 id="technology-stack" className="section-title mb-5">
              {t("stackTitle")}
            </h2>
            <p className="section-lede max-w-2xl">
              {t("stackLede")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {technologies.map((category, index) => (
              <div
                key={index}
                className="card-feature-light"
              >
                <h3 className="mb-6 text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.techs.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="pill-tag-soft normal-case"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" aria-labelledby="development-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="section-eyebrow mb-4 block">{t("processEyebrow")}</span>
            <h2 id="development-process" className="section-title mb-5">
              {t("processTitle")}
            </h2>
            <p className="section-lede max-w-2xl">
              {t("processLede")}
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                step: "01",
                title: t("phase1Title"),
                description: t("phase1Desc"),
              },
              {
                step: "02",
                title: t("phase2Title"),
                description: t("phase2Desc"),
              },
              {
                step: "03",
                title: t("phase3Title"),
                description: t("phase3Desc"),
              },
              {
                step: "04",
                title: t("phase4Title"),
                description: t("phase4Desc"),
              },
            ].map((phase, index) => (
              <div
                key={index}
                className="grid gap-6 rounded-[var(--radius-lg)] border border-[var(--hairline)] bg-white p-8 md:grid-cols-[80px_1fr]"
              >
                <div className="tabular text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--primary)]">
                  {phase.step}
                </div>
                <div>
                  <h3 className="mb-3 text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">
                    {phase.title}
                  </h3>
                  <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-dark-900)] py-24" aria-labelledby="services-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="services-cta" className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-white">
            {t("darkCtaTitle")}
          </h2>
          <p className="mb-10 text-[16px] leading-[1.4] text-white/80">
            {t("darkCtaDesc")}
          </p>
          <ContactTrackedLink
            href={I18N_ROUTES.contact}
            source="services_page"
            className="button-secondary-pill focus-ring"
            aria-label={isEn ? "Contact HOTFIX d.o.o. to discuss an AI or software project" : "Kontaktirajte HOTFIX d.o.o. za razgovor o AI ili software projektu"}
          >
            {t("darkCtaButton")}
          </ContactTrackedLink>
        </div>
      </section>
    </div>
  );
}
