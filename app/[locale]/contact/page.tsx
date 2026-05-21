import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import StructuredData from "@/components/StructuredData";
import EmailTrackedLink from "@/components/EmailTrackedLink";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
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
  const t = await getTranslations({ locale, namespace: "contact" });
  const loc = locale === "en" ? "en" : "hr";
  const canonicalUrl = getLocalizedUrl(ROUTES.contact, loc);

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(ROUTES.contact),
    },
    keywords: loc === "en"
      ? [
          "contact HOTFIX d.o.o.",
          "AI consulting inquiry",
          "software consulting Croatia",
          "Claude Code consultant",
          "hire AI consultant",
          "Josip Budalić contact",
        ]
      : [
          "kontakt HOTFIX d.o.o.",
          "AI consulting upit",
          "software consulting Hrvatska",
          "Claude Code consultant",
          "angažirati AI savjetnika",
          "Josip Budalić kontakt",
        ],
    openGraph: {
      url: canonicalUrl,
      type: "website",
      siteName: "HOTFIX d.o.o.",
      locale: locale === "en" ? "en_US" : "hr_HR",
      title: t("title"),
      description: t("description"),
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
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const loc = (locale === "en" ? "en" : "hr") satisfies SiteLocale;

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      {
        name: loc === "en" ? "Home" : "Početna",
        url: getLocalizedPath(ROUTES.home, loc),
      },
      {
        name: loc === "en" ? "Contact" : "Kontakt",
        url: getLocalizedPath(ROUTES.contact, loc),
      },
    ],
    loc
  );
  const contactFAQSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: loc === "en" ? "en" : "hr-HR",
    mainEntity: [1, 2, 3, 4].map((index) => ({
      "@type": "Question",
      name: t(`faq${index}Q`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`faq${index}A`),
      },
    })),
  };
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${getLocalizedUrl(ROUTES.contact, loc)}/#contactpage`,
    url: getLocalizedUrl(ROUTES.contact, loc),
    name: t("title"),
    description: t("description"),
    inLanguage: loc === "en" ? "en" : "hr-HR",
    mainEntity: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
  };

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema, contactFAQSchema, contactPageSchema]} />
      {/* Hero Section */}
      <section className="gradient-mesh relative overflow-hidden py-24" aria-labelledby="contact-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="pill-tag-soft mb-6">{t("heroEyebrow")}</span>
            <h1 id="contact-hero" className="mb-6 hero-title">
              {t("heroTitle")}
            </h1>
            <p className="max-w-2xl text-[16px] leading-[1.4] text-[var(--ink-secondary)]">
              {t("heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24" aria-labelledby="contact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Contact Information */}
            <div>
              <span className="section-eyebrow mb-4 block">{t("sectionEyebrow")}</span>
              <h2 id="contact-section" className="mb-6 text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                {t("sectionTitle")}
              </h2>
              <p className="mb-8 text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                {t("sectionDesc")}
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="tabular flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[15px] text-[var(--primary)]">
                      @
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="mb-1 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                      {t("emailTitle")}
                    </h3>
                    <EmailTrackedLink
                      href="mailto:ops@hotfix-doo.com"
                      source="contact_page"
                      className="text-[15px] text-[var(--primary)] transition-colors hover:text-[var(--primary-deep)]"
                      aria-label={locale === "en" ? "Send email to ops@hotfix-doo.com" : "Pošaljite email na ops@hotfix-doo.com"}
                    >
                      ops@hotfix-doo.com
                    </EmailTrackedLink>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="tabular flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[13px] text-[var(--primary)]">
                      9-5
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="mb-1 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                      {t("hoursTitle")}
                    </h3>
                    <p className="text-[15px] text-[var(--ink-mute)]">{t("hoursWeekdays")}</p>
                    <p className="text-[15px] text-[var(--ink-mute)]">{t("hoursTime")}</p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="tabular flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[13px] text-[var(--primary)]">
                      24h
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="mb-1 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                      {t("responseTitle")}
                    </h3>
                    <p className="text-[15px] text-[var(--ink-mute)]">
                      {t("responseDesc")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Choose Us Box */}
              <div className="card-cream-band mt-12">
                <h3 className="mb-4 text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">
                  {t("helpTitle")}
                </h3>
                <ul className="space-y-3 text-[15px] leading-[1.4] text-[var(--ink-secondary)]">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                    <span>{t("help1")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                    <span>{t("help2")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                    <span>{t("help3")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                    <span>{t("help4")}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-feature-light">
              <h2 className="mb-6 card-title-lg text-[var(--ink)]">
                {t("formTitle")}
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[var(--canvas-soft)] py-24" aria-labelledby="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-section" className="section-title mb-12">
            {t("faqTitle")}
          </h2>
          <div className="space-y-6">
            <div className="card-feature-light">
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                {t("faq1Q")}
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                {t("faq1A")}
              </p>
            </div>

            <div className="card-feature-light">
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                {t("faq2Q")}
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                {t("faq2A")}
              </p>
            </div>

            <div className="card-feature-light">
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                {t("faq3Q")}
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                {t("faq3A")}
              </p>
            </div>

            <div className="card-feature-light">
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                {t("faq4Q")}
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                {t("faq4A")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
