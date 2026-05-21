import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import { Link } from "@/i18n/navigation";
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
} from "@/lib/structuredData";
import { ROUTES, type SiteLocale } from "@/lib/constants";
import { setRequestLocale } from "next-intl/server";
import {
  getLanguageAlternates,
  getLocalizedPath,
  getLocalizedUrl,
} from "@/lib/seo";

export function generateStaticParams() {
  return [{ locale: "hr" }, { locale: "en" }];
}

const copy = {
  hr: {
    title: "Privatnost, kvaliteta i spremnost za produkciju",
    description:
      "Software consulting za privatnost, sigurnije rukovanje podacima, kvalitetu isporuke, testiranje, observability i production readiness.",
    ogTitle: "Privatnost i kvaliteta software isporuke | HOTFIX d.o.o.",
    ogDescription:
      "Privatnost po dizajnu, sigurnije rukovanje podacima, dokumentacija, testiranje i operativna spremnost.",
    keywords: [
      "privatnost po dizajnu",
      "zaštita podataka",
      "GDPR",
      "kvaliteta softwarea",
      "spremnost za produkciju",
      "observability",
    ],
    breadcrumbHome: "Početna",
    breadcrumbServices: "Usluge",
    breadcrumbCurrent: "Privatnost i kvaliteta",
    serviceDescription:
      "Software delivery s privatnošću po dizajnu, dokumentacijom, automatiziranim testiranjem, observabilityjem i operativnim runbookovima.",
    faq: [
      {
        question: "Pomažete li oko GDPR-a?",
        answer:
          "Pomažemo tehnički urediti rukovanje podacima: minimizaciju podataka, pristupe, enkripciju, logiranje, dokumentaciju i odluke koje podržavaju compliance rad. Ne zamjenjujemo pravni savjet.",
      },
      {
        question: "Kako pristupate kvaliteti isporuke?",
        answer:
          "Kombiniramo test strategiju, CI provjere, staging, observability, release checklistu i runbooke kako bi se problemi otkrivali prije korisnika.",
      },
      {
        question: "Možete li pomoći postojećem proizvodu?",
        answer:
          "Da. Možemo napraviti review postojećeg softwarea, predložiti prioritete i implementirati promjene bez zaustavljanja razvoja.",
      },
    ],
    eyebrow: "privatnost i kvaliteta",
    heroTitle:
      "Software koji odgovorno rukuje podacima i spremnije ide u produkciju.",
    heroDescription:
      "Pomažemo timovima ugraditi privatnost, sigurnost, testiranje, observability i incident readiness u razvojni proces prije nego što problemi postanu skupi.",
    helpTitle: "Kako pomažemo",
    helpItems: [
      "Arhitektura s privatnošću po dizajnu i threat modeling.",
      "Minimizacija podataka, enkripcija, pristupi i audit trail.",
      "Automatizirani testovi, CI i release checklisti.",
      "Observability, alerting i operativni runbookovi.",
      "Dokumentacija odluka i predaja prema timu.",
    ],
    audienceTitle: "Za koga je ovo",
    audienceBody:
      "Za timove koji rade s korisničkim podacima, vlasnike platformi, engineering leadove i organizacije koje žele manje iznenađenja u produkciji.",
    cta: "Razgovarajmo o kvaliteti i rizicima",
    related: "Povezano:",
    relatedAi: "AI consulting",
    relatedProductivity: "engineering produktivnost",
  },
  en: {
    title: "Privacy, quality, and production readiness",
    description:
      "Software consulting for privacy, safer data handling, delivery quality, testing, observability, and production readiness.",
    ogTitle: "Privacy and software delivery quality | HOTFIX d.o.o.",
    ogDescription:
      "Privacy by design, safer data handling, documentation, testing, and operational readiness.",
    keywords: [
      "privacy by design",
      "data protection",
      "GDPR",
      "software quality",
      "production readiness",
      "observability",
    ],
    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    breadcrumbCurrent: "Privacy and quality",
    serviceDescription:
      "Software delivery with privacy by design, documentation, automated testing, observability, and operational runbooks.",
    faq: [
      {
        question: "Can you help with GDPR?",
        answer:
          "We help organize the technical side of data handling: data minimization, access, encryption, logging, documentation, and decisions that support compliance work. We do not replace legal advice.",
      },
      {
        question: "How do you approach delivery quality?",
        answer:
          "We combine test strategy, CI checks, staging, observability, release checklists, and runbooks so problems are found before users find them.",
      },
      {
        question: "Can you help an existing product?",
        answer:
          "Yes. We can review existing software, propose priorities, and implement changes without stopping development.",
      },
    ],
    eyebrow: "privacy and quality",
    heroTitle:
      "Software that handles data responsibly and reaches production with fewer surprises.",
    heroDescription:
      "We help teams build privacy, security, testing, observability, and incident readiness into the development process before issues become expensive.",
    helpTitle: "How we help",
    helpItems: [
      "Privacy-by-design architecture and threat modeling.",
      "Data minimization, encryption, access control, and audit trails.",
      "Automated tests, CI, and release checklists.",
      "Observability, alerting, and operational runbooks.",
      "Decision documentation and handover to the team.",
    ],
    audienceTitle: "Who this is for",
    audienceBody:
      "For teams that work with user data, platform owners, engineering leads, and organizations that want fewer production surprises.",
    cta: "Talk to us about quality and risk",
    related: "Related:",
    relatedAi: "AI consulting",
    relatedProductivity: "engineering productivity",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale === "en" ? "en" : "hr";
  const text = copy[loc];
  const canonicalUrl = getLocalizedUrl(ROUTES.quality, loc);

  return {
    title: text.title,
    description: text.description,
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(ROUTES.quality),
    },
    openGraph: {
      url: canonicalUrl,
      siteName: "HOTFIX d.o.o.",
      locale: loc === "en" ? "en_US" : "hr_HR",
      title: text.ogTitle,
      description: text.ogDescription,
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
    keywords: [...text.keywords],
  };
}

export default async function GDPRQualityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale === "en" ? "en" : "hr") satisfies SiteLocale;
  const text = copy[loc];
  setRequestLocale(locale);

  const breadcrumb = generateBreadcrumbSchema(
    [
      { name: text.breadcrumbHome, url: getLocalizedPath(ROUTES.home, loc) },
      { name: text.breadcrumbServices, url: getLocalizedPath(ROUTES.services, loc) },
      { name: text.breadcrumbCurrent, url: getLocalizedPath(ROUTES.quality, loc) },
    ],
    loc
  );

  const serviceSchema = generateServiceSchema(text.title, text.serviceDescription, loc);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: loc === "en" ? "en" : "hr-HR",
    mainEntity: text.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumb, faqSchema, serviceSchema]} />

      <section className="gradient-mesh relative overflow-hidden py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="pill-tag-soft mb-6">{text.eyebrow}</span>
          <h1 className="mb-6 hero-title">
            {text.heroTitle}
          </h1>
          <p className="max-w-2xl text-[16px] leading-[1.4] text-[var(--ink-secondary)]">
            {text.heroDescription}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="card-feature-light">
              <h2 className="text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">
                {text.helpTitle}
              </h2>
              <ul className="mt-3 list-inside list-disc text-[15px] text-[var(--ink-mute)] space-y-2">
                {text.helpItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="card-cream-band">
              <h2 className="text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">
                {text.audienceTitle}
              </h2>
              <p className="mt-3 text-[15px] text-[var(--ink-mute)]">
                {text.audienceBody}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <ContactTrackedLink
              href={ROUTES.contact}
              source="gdpr_quality"
              className="button-primary-pill"
            >
              {text.cta}
            </ContactTrackedLink>
          </div>

          <div className="mt-8 text-sm text-[var(--ink-mute)]">
            <p>
              {text.related}{" "}
              <Link href={ROUTES.aiConsulting} className="text-[var(--primary)]">
                {text.relatedAi}
              </Link>{" "}
              {loc === "en" ? "and" : "i"}{" "}
              <Link href={ROUTES.productivity} className="text-[var(--primary)]">
                {text.relatedProductivity}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
