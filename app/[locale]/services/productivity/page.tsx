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
    title: "Engineering produktivnost",
    description:
      "Consulting za engineering produktivnost: CI/CD, automatizacija, developer tooling, Claude Code workflowi, observability i bolji delivery procesi.",
    ogTitle: "Engineering produktivnost i delivery procesi | HOTFIX d.o.o.",
    ogDescription:
      "CI/CD, tooling, automatizacija, AI-assisted development workflowi i procesi koji smanjuju trenje u software timu.",
    keywords: [
      "engineering produktivnost",
      "software delivery",
      "CI/CD",
      "developer tooling",
      "automatizacija",
      "Claude Code workflow",
      "observability",
    ],
    breadcrumbHome: "Početna",
    breadcrumbServices: "Usluge",
    breadcrumbCurrent: "Engineering produktivnost",
    serviceDescription:
      "CI/CD, automatizacija, developer tooling, AI-assisted development workflowi i observability za manje trenja u software delivery procesu.",
    faq: [
      {
        question: "Kako poboljšavate engineering produktivnost?",
        answer:
          "Prvo mapiramo gdje tim gubi vrijeme: čekanje na CI, ručni release, loš onboarding, nejasan review ili ponavljanje zadataka. Zatim uvodimo ciljane procese, alate i automatizacije.",
      },
      {
        question: "Radite li hands-on implementaciju?",
        answer:
          "Da. Možemo isporučiti CI/CD konfiguracije, repo templateove, automatizacije, runbooke, onboarding dokumentaciju i AI workflowe koje tim odmah koristi.",
      },
      {
        question: "Možete li uključiti AI coding alate?",
        answer:
          "Da. Claude Code i slične alate uvodimo kroz jasne standarde, skills, review pravila, sigurnosna ograničenja i mjerne točke.",
      },
    ],
    eyebrow: "engineering produktivnost",
    heroTitle: "Manje trenja u razvoju, više kvalitetne isporuke.",
    heroDescription:
      "Pomažemo timovima urediti CI/CD, release proces, onboarding, automatizacije i AI-assisted development workflowe tako da brzina ne ide na račun kvalitete.",
    deliverTitle: "Što isporučujemo",
    deliverItems: [
      "CI/CD pipelineove, repo templateove i automatizirane release korake.",
      "Onboarding dokumentaciju i tooling za brže uključivanje developera.",
      "Automatizacije koje uklanjaju ponavljivi ručni rad.",
      "Observability, dashboards i operativne runbooke.",
      "Claude Code skills, review workflowe i AI-assisted development standarde.",
    ],
    auditTitle: "Audit procesa, zatim ciljane promjene",
    auditBody:
      "Ne počinjemo kupnjom alata. Prvo gledamo gdje proces zapinje, koje ručne korake tim ponavlja i koji dio deliveryja stvara najveći rizik.",
    auditItems: [
      "Kratki audit repozitorija, CI-ja, reviewa i release procesa.",
      "Prioritizacija promjena prema učinku i riziku.",
      "Implementacija automatizacija, templateova i runbooka.",
    ],
    cta: "Zatražite audit delivery procesa",
    related: "Povezano:",
    relatedAi: "AI consulting",
    relatedQuality: "privatnost i kvaliteta",
  },
  en: {
    title: "Engineering productivity",
    description:
      "Engineering productivity consulting: CI/CD, automation, developer tooling, Claude Code workflows, observability, and better delivery processes.",
    ogTitle: "Engineering productivity and delivery processes | HOTFIX d.o.o.",
    ogDescription:
      "CI/CD, tooling, automation, AI-assisted development workflows, and processes that reduce friction in software teams.",
    keywords: [
      "engineering productivity",
      "software delivery",
      "CI/CD",
      "developer tooling",
      "automation",
      "Claude Code workflow",
      "observability",
    ],
    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    breadcrumbCurrent: "Engineering productivity",
    serviceDescription:
      "CI/CD, automation, developer tooling, AI-assisted development workflows, and observability for less friction in software delivery.",
    faq: [
      {
        question: "How do you improve engineering productivity?",
        answer:
          "We first map where the team loses time: waiting on CI, manual releases, weak onboarding, unclear review, or repeated manual tasks. Then we introduce targeted processes, tools, and automations.",
      },
      {
        question: "Do you implement the improvements hands-on?",
        answer:
          "Yes. We can deliver CI/CD configuration, repository templates, automations, runbooks, onboarding documentation, and AI workflows the team can use immediately.",
      },
      {
        question: "Can you include AI coding tools?",
        answer:
          "Yes. We introduce Claude Code and similar tools through clear standards, skills, review rules, security boundaries, and measurement points.",
      },
    ],
    eyebrow: "engineering productivity",
    heroTitle: "Less development friction, more reliable delivery.",
    heroDescription:
      "We help teams improve CI/CD, release processes, onboarding, automation, and AI-assisted development workflows so speed does not come at the expense of quality.",
    deliverTitle: "What we deliver",
    deliverItems: [
      "CI/CD pipelines, repository templates, and automated release steps.",
      "Onboarding documentation and tooling that help developers ramp up faster.",
      "Automations that remove repeated manual work.",
      "Observability, dashboards, and operational runbooks.",
      "Claude Code skills, review workflows, and AI-assisted development standards.",
    ],
    auditTitle: "Process audit first, then targeted changes",
    auditBody:
      "We do not start by buying tools. We first look at where the process stalls, which manual steps the team repeats, and which part of delivery creates the highest risk.",
    auditItems: [
      "Short audit of repositories, CI, review, and release process.",
      "Prioritization of changes by impact and risk.",
      "Implementation of automations, templates, and runbooks.",
    ],
    cta: "Request a delivery process audit",
    related: "Related:",
    relatedAi: "AI consulting",
    relatedQuality: "privacy and quality",
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
  const canonicalUrl = getLocalizedUrl(ROUTES.productivity, loc);

  return {
    title: text.title,
    description: text.description,
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(ROUTES.productivity),
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
      title: text.ogTitle,
      description: text.ogDescription,
      images: ["/opengraph-image"],
    },
    keywords: [...text.keywords],
  };
}

export default async function ProductivityPage({
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
      { name: text.breadcrumbCurrent, url: getLocalizedPath(ROUTES.productivity, loc) },
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
          <div className="card-feature-light">
            <h2 className="text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">
              {text.deliverTitle}
            </h2>
            <ul className="mt-3 list-inside list-disc text-[15px] text-[var(--ink-mute)] space-y-2">
              {text.deliverItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card-cream-band mt-6">
            <h2 className="text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">
              {text.auditTitle}
            </h2>
            <p className="mt-3 text-[15px] text-[var(--ink-mute)]">
              {text.auditBody}
            </p>
            <ul className="mt-3 list-inside list-disc text-[15px] text-[var(--ink-mute)] space-y-2">
              {text.auditItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <ContactTrackedLink
              href={ROUTES.contact}
              source="productivity"
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
              <Link href={ROUTES.quality} className="text-[var(--primary)]">
                {text.relatedQuality}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
