import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/Hero";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "@/i18n/navigation";
import StructuredData from "@/components/StructuredData";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { ROUTES } from "@/lib/constants";
import {
  getLanguageAlternates,
  getLocalizedPath,
  getLocalizedUrl,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const canonicalUrl = getLocalizedUrl(ROUTES.home, isEn ? "en" : "hr");

  return {
    title: {
      absolute: isEn
        ? "HOTFIX d.o.o. — AI & Software Consulting from Croatia"
        : "HOTFIX d.o.o. — AI i software consulting iz Hrvatske",
    },
    description: isEn
      ? "HOTFIX d.o.o. helps companies integrate AI into real processes, modernize codebases, and deliver software more reliably. Croatia-based, EU-wide."
      : "HOTFIX d.o.o. pomaže tvrtkama uvesti AI u stvarne procese, modernizirati codebase i pouzdanije isporučivati software. Iz Hrvatske, za cijelu EU.",
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(ROUTES.home),
    },
    keywords: isEn
      ? [
          "AI consulting",
          "software consulting",
          "Claude Code consulting",
          "AI-assisted development",
          "software modernization",
          "software architecture",
          "custom software development",
          "Croatia",
          "EU",
          "HOTFIX d.o.o.",
        ]
      : [
          "AI consulting Hrvatska",
          "software consulting",
          "Claude Code",
          "AI-assisted development",
          "modernizacija softwarea",
          "software arhitektura",
          "custom software development",
          "razvoj softwarea Hrvatska",
          "HOTFIX d.o.o.",
        ],
    openGraph: {
      url: canonicalUrl,
      type: "website",
      siteName: "HOTFIX d.o.o.",
      locale: isEn ? "en_US" : "hr_HR",
      title: isEn
        ? "HOTFIX d.o.o. — AI & Software Consulting"
        : "HOTFIX d.o.o. — AI i software consulting",
      description: isEn
        ? "AI adoption, Claude Code workflows, software architecture, modernization, and reliable software delivery — by HOTFIX d.o.o."
        : "AI adopcija, Claude Code workflowi, software arhitektura, modernizacija i pouzdana isporuka softwarea — HOTFIX d.o.o.",
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
        ? "HOTFIX d.o.o. — AI & Software Consulting"
        : "HOTFIX d.o.o. — AI i software consulting",
      description: isEn
        ? "AI adoption, Claude Code workflows, architecture, modernization, and reliable delivery."
        : "AI adopcija, Claude Code workflowi, arhitektura, modernizacija i pouzdana isporuka.",
      images: ["/opengraph-image"],
    },
    other: {
      "application-name": "HOTFIX d.o.o.",
      "apple-mobile-web-app-title": "HOTFIX d.o.o.",
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const loc = locale === "en" ? "en" : "hr";
  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      {
        name: loc === "en" ? "Home" : "Početna",
        url: getLocalizedPath(ROUTES.home, loc),
      },
    ],
    loc
  );

  const features = [
    {
      title: t("feature1Title"),
      description: t("feature1Desc"),
    },
    {
      title: t("feature2Title"),
      description: t("feature2Desc"),
    },
    {
      title: t("feature3Title"),
      description: t("feature3Desc"),
    },
  ];

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <Hero />

      <section className="bg-white py-20 md:py-24" aria-labelledby="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 max-w-3xl md:mb-14">
            <span className="section-eyebrow mb-4 block">{t("eyebrow")}</span>
            <h2 id="why-choose-us" className="section-title mb-5">
              {t("title")}
            </h2>
            <p className="section-lede max-w-2xl">
              {t("lede")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.08}>
                <div className="card-feature-light h-full transition-transform duration-200 hover:-translate-y-1">
                  <h3 className="mb-3 text-[22px] font-light leading-[1.15] tracking-[-0.22px] text-[var(--ink)]">
                    {feature.title}
                  </h3>
                  <p className="text-[15px] leading-[1.5] text-[var(--ink-mute)]">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--canvas-soft)] py-24" aria-labelledby="our-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-14 max-w-3xl">
            <span className="section-eyebrow mb-4 block">{t("servicesEyebrow")}</span>
            <h2 id="our-services" className="section-title mb-5">
              {t("servicesTitle")}
            </h2>
            <p className="section-lede max-w-2xl">
              {t("servicesLede")}
            </p>
          </AnimatedSection>

          <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                title: t("service1Title"),
                description: t("service1Desc"),
                features: [t("service1f1"), t("service1f2"), t("service1f3")],
              },
              {
                title: t("service2Title"),
                description: t("service2Desc"),
                features: [t("service2f1"), t("service2f2"), t("service2f3")],
              },
              {
                title: t("service3Title"),
                description: t("service3Desc"),
                features: [t("service3f1"), t("service3f2"), t("service3f3")],
              },
            ].map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="card-pricing flex h-full flex-col">
                  <h3 className="mb-4 text-[26px] font-bold leading-[1.12] tracking-[-0.26px] text-[var(--ink)]">
                    {service.title}
                  </h3>
                  <p className="mb-6 text-[15px] leading-[1.4] text-[var(--ink-mute)]">{service.description}</p>
                  <ul className="mt-auto space-y-3 text-[13px] leading-[1.4] text-[var(--ink-secondary)]">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center">
            <Link
              href={ROUTES.services}
              className="button-primary-pill focus-ring"
            >
              {t("viewServices")}
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-24" aria-labelledby="cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="card-cream-band grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="section-eyebrow mb-4 block">{t("ctaEyebrow")}</span>
              <h2 id="cta-heading" className="section-title mb-5">
                {t("ctaTitle")}
              </h2>
              <p className="section-lede max-w-2xl">
                {t("ctaLede")}
              </p>
            </div>
            <ContactTrackedLink
              href={ROUTES.contact}
              source="home_cta"
              className="button-primary-pill focus-ring w-full sm:w-auto"
            >
              {t("ctaButton")}
            </ContactTrackedLink>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
