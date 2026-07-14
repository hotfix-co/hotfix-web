import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/Hero";
import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "@/i18n/navigation";
import StructuredData from "@/components/StructuredData";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import {
  getHomepageFAQSchema,
  getHomepageWebPageSchema,
} from "@/lib/structuredData";
import { ROUTES, BLOG_ARTICLE_ROUTES, type SiteLocale } from "@/lib/constants";
import {
  getLanguageAlternates,
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
        ? "HOTFIX d.o.o. — Nearshore AI & Software Consulting from Croatia"
        : "HOTFIX d.o.o. — AI i software consulting iz Hrvatske",
    },
    description: isEn
      ? "Croatia-based AI and software consulting firm. AI adoption, Claude Code workflows, software architecture, and modernization for product teams in the EU and US."
      : "Hrvatski AI i software consulting za produktne timove iz EU-a i SAD-a. Uvođenje Claude Code-a, softverska arhitektura, modernizacija i pouzdana isporuka.",
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(ROUTES.home),
    },
    openGraph: {
      url: canonicalUrl,
      type: "website",
      siteName: "HOTFIX d.o.o.",
      locale: isEn ? "en_US" : "hr_HR",
      title: isEn
        ? "HOTFIX d.o.o. — Nearshore AI & Software Consulting from Croatia"
        : "HOTFIX d.o.o. — AI i software consulting iz Hrvatske",
      description: isEn
        ? "AI and software consulting from Zagreb. AI adoption, Claude Code, architecture, and modernization for EU and US product teams."
        : "Uvođenje AI-ja, Claude Code workflowi, arhitektura, modernizacija i pouzdana isporuka — HOTFIX d.o.o., Zagreb. Za product timove iz EU-a i SAD-a.",
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
        ? "HOTFIX d.o.o. — Nearshore AI & Software Consulting"
        : "HOTFIX d.o.o. — AI i software consulting",
      description: isEn
        ? "AI and software consulting from Croatia: AI adoption, Claude Code, architecture, modernization."
        : "AI i software consulting iz Hrvatske za product timove iz EU-a i SAD-a.",
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
  const loc: SiteLocale = locale === "en" ? "en" : "hr";

  const faqItems = [1, 2, 3, 4, 5, 6].map((i) => ({
    q: t(`faq${i}Q`),
    a: t(`faq${i}A`),
  }));

  const homepageSchemas = [
    getHomepageWebPageSchema(loc),
    getHomepageFAQSchema(loc, faqItems),
  ];

  const features = [
    { title: t("feature1Title"), description: t("feature1Desc") },
    { title: t("feature2Title"), description: t("feature2Desc") },
    { title: t("feature3Title"), description: t("feature3Desc") },
  ];

  const services = [
    {
      title: t("service1Title"),
      description: t("service1Desc"),
      cta: t("service1Cta"),
      href: ROUTES.aiConsulting,
    },
    {
      title: t("service2Title"),
      description: t("service2Desc"),
      cta: t("service2Cta"),
      href: ROUTES.services,
    },
    {
      title: t("service3Title"),
      description: t("service3Desc"),
      cta: t("service3Cta"),
      href: ROUTES.productivity,
    },
    {
      title: t("service4Title"),
      description: t("service4Desc"),
      cta: t("service4Cta"),
      href: ROUTES.quality,
    },
  ];

  const servicePhotoTones = [
    "card-photo-warm",
    "card-photo-sea",
    "card-photo-night",
    "card-photo-stone",
  ];

  const engagementTypes = [
    { title: t("engagement1Title"), desc: t("engagement1Desc") },
    { title: t("engagement2Title"), desc: t("engagement2Desc") },
    { title: t("engagement3Title"), desc: t("engagement3Desc") },
  ];

  const insights = [
    { title: t("insights1Title"), href: BLOG_ARTICLE_ROUTES.aiAdoption },
    { title: t("insights2Title"), href: BLOG_ARTICLE_ROUTES.softwareModernization },
    { title: t("insights3Title"), href: BLOG_ARTICLE_ROUTES.specDrivenDevelopment },
  ];

  return (
    <>
      <StructuredData data={homepageSchemas} />
      <Hero />

      <section className="bg-white py-28 md:py-36" aria-labelledby="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-20 md:mb-28">
            <p className="statement-text max-w-5xl">
              <strong>
                <span id="why-choose-us">{t("title")}</span>
              </strong>{" "}
              {t("lede")}
            </p>
          </AnimatedSection>

          <AnimatedSection className="mb-14 max-w-3xl">
            <span className="section-eyebrow mb-4 block">{t("introEyebrow")}</span>
            <p className="text-[15px] leading-[1.6] text-[var(--ink-mute)]">
              {t("introBody")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-10 border-t border-[var(--hairline)] pt-12 md:grid-cols-3">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.08}>
                <h3 className="mb-3 text-[20px] font-light leading-[1.2] tracking-[-0.2px] text-[var(--ink)]">
                  {feature.title}
                </h3>
                <p className="text-[14px] leading-[1.55] text-[var(--ink-mute)]">{feature.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-28" aria-labelledby="our-services">
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

          <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.08}>
                <Link
                  href={service.href}
                  className={`card-photo focus-ring h-full ${servicePhotoTones[index % servicePhotoTones.length]}`}
                >
                  <h3 className="max-w-[240px] text-[20px] font-light leading-[1.25] tracking-[-0.2px] text-white">
                    {service.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-[12px] text-white/80">
                    {service.cta}
                    <span aria-hidden>→</span>
                  </span>
                </Link>
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

      <section
        className="interlude-dark grain-overlay relative flex min-h-[70svh] items-center justify-center overflow-hidden py-28 text-center"
        aria-labelledby="interlude-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex flex-col items-center">
            <div className="interlude-orb mb-10" aria-hidden />
            <p id="interlude-heading" className="mb-6 text-[17px] font-light text-white/90 sm:text-[19px]">
              {t("interludeLine")}
            </p>
            <Link href={ROUTES.about} className="button-hero-ghost focus-ring">
              {t("interludeCta")}
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-24" aria-labelledby="engagement-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 max-w-3xl">
            <span className="section-eyebrow mb-4 block">{t("engagementEyebrow")}</span>
            <h2 id="engagement-heading" className="section-title mb-5">
              {t("engagementTitle")}
            </h2>
            <p className="section-lede max-w-2xl">
              {t("engagementBody")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {engagementTypes.map((engagement, index) => (
              <AnimatedSection key={index} delay={index * 0.08}>
                <div className="card-feature-light h-full">
                  <h3 className="mb-3 text-[20px] font-light leading-[1.15] tracking-[-0.2px] text-[var(--ink)]">
                    {engagement.title}
                  </h3>
                  <p className="text-[15px] leading-[1.5] text-[var(--ink-mute)]">{engagement.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--canvas-soft)] py-24" aria-labelledby="insights-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 max-w-3xl">
            <span className="section-eyebrow mb-4 block">{t("insightsEyebrow")}</span>
            <h2 id="insights-heading" className="section-title mb-5">
              {t("insightsTitle")}
            </h2>
          </AnimatedSection>

          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {insights.map((insight, index) => (
              <AnimatedSection key={index} delay={index * 0.08}>
                <Link
                  href={insight.href}
                  className="card-feature-light flex h-full flex-col justify-between transition-transform duration-200 hover:-translate-y-1 focus-ring"
                >
                  <h3 className="mb-4 text-[18px] font-light leading-[1.25] tracking-[-0.18px] text-[var(--ink)]">
                    {insight.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--primary-deep)]">
                    {locale === "en" ? "Read article" : "Pročitajte članak"}
                    <span aria-hidden>→</span>
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center">
            <Link href={ROUTES.blog} className="button-secondary-pill focus-ring">
              {t("viewBlog")}
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-white py-24" aria-labelledby="faq-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 max-w-3xl">
            <span className="section-eyebrow mb-4 block">{t("faqEyebrow")}</span>
            <h2 id="faq-heading" className="section-title mb-5">
              {t("faqTitle")}
            </h2>
          </AnimatedSection>

          <div className="mx-auto max-w-3xl divide-y divide-[var(--hairline)]">
            {faqItems.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.04}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[18px] font-light leading-[1.3] tracking-[-0.18px] text-[var(--ink)]">
                    <span>{item.q}</span>
                    <span aria-hidden className="mt-1 text-[var(--primary-deep)] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-[15px] leading-[1.6] text-[var(--ink-mute)]">
                    {item.a}
                  </p>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-28 md:py-36" aria-labelledby="cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="section-eyebrow mb-5 block">{t("ctaEyebrow")}</span>
            <h2 id="cta-heading" className="cta-display mb-7 max-w-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="section-lede mb-10 max-w-2xl">
              {t("ctaLede")}
            </p>
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
