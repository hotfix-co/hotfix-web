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
    title: "AI consulting i Claude Code workflowi",
    description:
      "AI consulting za tvrtke koje žele uvesti AI u stvarne procese: Claude Code enablement, AI-assisted development, multi-agent sustavi, guardraili i integracije.",
    ogTitle: "AI consulting i AI-assisted development | HOTFIX d.o.o.",
    ogDescription:
      "Praktična AI adopcija, Claude Code workflowi, multi-agent sustavi i produkcijski guardraili bez hypea.",
    keywords: [
      "AI consulting",
      "AI adopcija",
      "Claude Code consulting",
      "AI-assisted development",
      "multi-agent sustavi",
      "AI workflowi",
      "AI guardraili",
    ],
    breadcrumbHome: "Početna",
    breadcrumbServices: "Usluge",
    breadcrumbCurrent: "AI consulting",
    serviceDescription:
      "AI adopcija, Claude Code enablement, multi-agent workflowi, guardraili, evaluacije i produkcijske integracije.",
    faq: [
      {
        question: "Kada multi-agent sustav ima smisla?",
        answer:
          "Ima smisla kada posao prirodno ima više uloga, jasne ulaze i izlaze, ponavljive provjere i dovoljno vrijednosti da opravda dodatnu kompleksnost.",
      },
      {
        question: "Kako uvodite Claude Code u tim?",
        answer:
          "Počinjemo s pravilima rada, primjerima workflowa, review standardima, sigurnosnim ograničenjima i mjerenjem učinka na stvarnom codebaseu.",
      },
      {
        question: "Možete li raditi s postojećim stackom?",
        answer:
          "Da. AI najčešće uvodimo u postojeće aplikacije, backend sustave, interne alate i development workflowe, bez potrebe za potpunom promjenom stacka.",
      },
    ],
    eyebrow: "AI consulting",
    heroTitle: "AI u stvarnim procesima, ne u prezentacijama.",
    heroDescription:
      "Pomažemo procijeniti gdje AI ima smisla, kako ga sigurno integrirati u postojeći software i kako tim može koristiti Claude Code i slične alate bez gubitka kontrole nad kvalitetom.",
    helpTitle: "Gdje pomažemo",
    helpItems: [
      "AI adoption strategija i izbor use caseova.",
      "Claude Code, Codex i AI coding workflowi za timove.",
      "Multi-agent sustavi kada posao stvarno traži više koordiniranih uloga.",
      "Guardraili, evaluacije, testiranje i human-in-the-loop provjere.",
      "Integracije s postojećim aplikacijama, API-jima i internim alatima.",
    ],
    teamTitle: "Što ostaje timu",
    teamItems: [
      "Jasan plan gdje AI ulazi u proces, a gdje ne.",
      "Pravila za sigurnost, review, podatke i odgovornost.",
      "Primjeri workflowa koje tim može ponavljati.",
      "Dokumentirane odluke, rizici i kriteriji uspjeha.",
    ],
    audienceTitle: "Za koga je ovo",
    audienceBody:
      "Za product i engineering timove koji imaju konkretan proces, postojeći codebase ili poslovni workflow u kojem AI može skratiti ručni rad, povećati kvalitetu ili ubrzati odlučivanje.",
    processTitle: "Proces",
    processItems: [
      "Mapiramo proces, podatke, rizike i očekivani učinak.",
      "Gradimo mali proof of value s jasnim kriterijima.",
      "Dodajemo guardraile, testove, logging i ownership.",
      "Predajemo dokumentaciju, workflowe i preporuke za širenje.",
    ],
    related: "Povezano:",
    relatedProductivity: "engineering produktivnost",
    relatedQuality: "privatnost i kvaliteta",
    cta: "Dogovorite AI consulting razgovor",
  },
  en: {
    title: "AI consulting and Claude Code workflows",
    description:
      "AI consulting for companies that want to bring AI into real processes: Claude Code enablement, AI-assisted development, multi-agent systems, guardrails, and integrations.",
    ogTitle: "AI consulting and AI-assisted development | HOTFIX d.o.o.",
    ogDescription:
      "Practical AI adoption, Claude Code workflows, multi-agent systems, and production guardrails without hype.",
    keywords: [
      "AI consulting",
      "AI adoption",
      "Claude Code consulting",
      "AI-assisted development",
      "multi-agent systems",
      "AI workflows",
      "AI guardrails",
    ],
    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    breadcrumbCurrent: "AI consulting",
    serviceDescription:
      "AI adoption, Claude Code enablement, multi-agent workflows, guardrails, evaluations, and production integrations.",
    faq: [
      {
        question: "When does a multi-agent system make sense?",
        answer:
          "It makes sense when the work naturally has multiple roles, clear inputs and outputs, repeatable checks, and enough value to justify the added complexity.",
      },
      {
        question: "How do you introduce Claude Code into a team?",
        answer:
          "We start with working rules, workflow examples, review standards, security boundaries, and measuring impact on the real codebase.",
      },
      {
        question: "Can you work with our existing stack?",
        answer:
          "Yes. We usually introduce AI into existing applications, backend systems, internal tools, and development workflows without requiring a full stack change.",
      },
    ],
    eyebrow: "AI consulting",
    heroTitle: "AI in real processes, not in presentations.",
    heroDescription:
      "We help evaluate where AI makes sense, how to integrate it safely into existing software, and how teams can use Claude Code and similar tools without losing control of quality.",
    helpTitle: "Where we help",
    helpItems: [
      "AI adoption strategy and use case selection.",
      "Claude Code, Codex, and AI coding workflows for teams.",
      "Multi-agent systems when the work truly needs coordinated roles.",
      "Guardrails, evaluations, testing, and human-in-the-loop checks.",
      "Integrations with existing applications, APIs, and internal tools.",
    ],
    teamTitle: "What the team keeps",
    teamItems: [
      "A clear plan for where AI enters the process and where it does not.",
      "Rules for security, review, data, and accountability.",
      "Workflow examples the team can repeat.",
      "Documented decisions, risks, and success criteria.",
    ],
    audienceTitle: "Who this is for",
    audienceBody:
      "For product and engineering teams with a concrete process, existing codebase, or business workflow where AI can reduce manual work, improve quality, or speed up decisions.",
    processTitle: "Process",
    processItems: [
      "We map the process, data, risks, and expected impact.",
      "We build a small proof of value with clear criteria.",
      "We add guardrails, tests, logging, and ownership.",
      "We hand over documentation, workflows, and recommendations for scaling.",
    ],
    related: "Related:",
    relatedProductivity: "engineering productivity",
    relatedQuality: "privacy and quality",
    cta: "Book an AI consulting call",
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
  const canonicalUrl = getLocalizedUrl(ROUTES.aiConsulting, loc);

  return {
    title: text.title,
    description: text.description,
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(ROUTES.aiConsulting),
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

export default async function AIConsultingPage({
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
      { name: text.breadcrumbCurrent, url: getLocalizedPath(ROUTES.aiConsulting, loc) },
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
              <h2 className="mb-3 text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">
                {text.helpTitle}
              </h2>
              <ul className="mt-3 list-inside list-disc text-[15px] text-[var(--ink-mute)] space-y-2">
                {text.helpItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="card-feature-light">
              <h2 className="mb-3 text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">
                {text.teamTitle}
              </h2>
              <ul className="mt-3 list-inside list-disc text-[15px] text-[var(--ink-mute)] space-y-2">
                {text.teamItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="card-cream-band">
              <h2 className="text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">
                {text.audienceTitle}
              </h2>
              <p className="mt-3 text-[15px] text-[var(--ink-mute)]">
                {text.audienceBody}
              </p>
            </div>

            <div className="card-feature-light">
              <h2 className="text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">
                {text.processTitle}
              </h2>
              <ol className="mt-3 list-inside list-decimal text-[15px] text-[var(--ink-mute)] space-y-2">
                {text.processItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-8 text-sm text-[var(--ink-mute)]">
            <p>
              {text.related}{" "}
              <Link href={ROUTES.productivity} className="text-[var(--primary)]">
                {text.relatedProductivity}
              </Link>{" "}
              {loc === "en" ? "and" : "i"}{" "}
              <Link href={ROUTES.quality} className="text-[var(--primary)]">
                {text.relatedQuality}
              </Link>
              .
            </p>
          </div>

          <div className="mt-8">
            <ContactTrackedLink
              href={ROUTES.contact}
              source="ai_consulting"
              className="button-primary-pill"
            >
              {text.cta}
            </ContactTrackedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
