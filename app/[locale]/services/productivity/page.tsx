import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import { Link } from "@/i18n/navigation";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/structuredData";
import { ROUTES, SITE_URL } from "@/lib/constants";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return [{ locale: "hr" }, { locale: "en" }];
}

export const metadata: Metadata = {
  title: "Engineering produktivnost i software delivery procesi",
  description:
    "Consulting za engineering produktivnost: CI/CD, automatizacija, developer tooling, Claude Code workflowi, observability i bolji delivery procesi.",
  alternates: {
    canonical: `${SITE_URL}${ROUTES.productivity}`,
    languages: {
      "hr-HR": `${SITE_URL}${ROUTES.productivity}`,
      "x-default": `${SITE_URL}${ROUTES.productivity}`,
    },
  },
  openGraph: {
    url: `${SITE_URL}${ROUTES.productivity}`,
    locale: "hr_HR",
    title: "Engineering produktivnost i delivery procesi | HOTFIX",
    description: "CI/CD, tooling, automatizacija, AI-assisted development workflowi i procesi koji smanjuju trenje u software timu.",
  },
  keywords: [
    "engineering produktivnost",
    "software delivery",
    "CI/CD",
    "developer tooling",
    "automatizacija",
    "Claude Code workflow",
    "observability",
  ],
};

export default async function ProductivityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Početna", url: "/" },
    { name: "Usluge", url: ROUTES.services },
    { name: "Engineering produktivnost", url: ROUTES.productivity },
  ]);

  const serviceSchema = generateServiceSchema(
    "Engineering produktivnost i delivery procesi",
    "CI/CD, automatizacija, developer tooling, AI-assisted development workflowi i observability za manje trenja u software delivery procesu.",
  );
  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Kako poboljšavate engineering produktivnost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Prvo mapiramo gdje tim gubi vrijeme: čekanje na CI, ručni release, loš onboarding, nejasan review ili ponavljanje zadataka. Zatim uvodimo ciljane procese, alate i automatizacije.',
        },
      },
      {
        '@type': 'Question',
        name: 'Radite li hands-on implementaciju?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Da. Možemo isporučiti CI/CD konfiguracije, repo templateove, automatizacije, runbooke, onboarding dokumentaciju i AI workflowe koje tim odmah koristi.',
        },
      },
      {
        '@type': 'Question',
        name: 'Možete li uključiti AI coding alate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Da. Claude Code i slične alate uvodimo kroz jasne standarde, skills, review pravila, sigurnosna ograničenja i mjerne točke.',
        },
      },
    ],
  };

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumb, faqSchema, serviceSchema]} />

      <section className="gradient-mesh relative overflow-hidden py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="pill-tag-soft mb-6">engineering produktivnost</span>
          <h1 className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-[var(--ink)] md:text-[56px] md:leading-[1.03] md:tracking-[-1.4px]">
            Manje trenja u razvoju, više kvalitetne isporuke.
          </h1>
          <p className="max-w-2xl text-[16px] leading-[1.4] text-[var(--ink-secondary)]">
            Pomažemo timovima urediti CI/CD, release proces, onboarding, automatizacije i AI-assisted development workflowe tako da brzina ne ide na račun kvalitete.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-feature-light">
            <h2 className="text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">Što isporučujemo</h2>
            <ul className="mt-3 list-inside list-disc text-[15px] text-[var(--ink-mute)] space-y-2">
              <li>CI/CD pipelineove, repo templateove i automatizirane release korake.</li>
              <li>Onboarding dokumentaciju i tooling za brže uključivanje developera.</li>
              <li>Automatizacije koje uklanjaju ponavljivi ručni rad.</li>
              <li>Observability, dashboards i operativne runbooke.</li>
              <li>Claude Code skills, review workflowe i AI-assisted development standarde.</li>
            </ul>
          </div>

          <div className="card-cream-band mt-6">
            <h2 className="text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">Audit procesa, zatim ciljane promjene</h2>
            <p className="mt-3 text-[15px] text-[var(--ink-mute)]">Ne počinjemo kupnjom alata. Prvo gledamo gdje proces zapinje, koje ručne korake tim ponavlja i koji dio deliveryja stvara najveći rizik.</p>
            <ul className="mt-3 list-inside list-disc text-[15px] text-[var(--ink-mute)] space-y-2">
              <li>Kratki audit repozitorija, CI-ja, reviewa i release procesa.</li>
              <li>Prioritizacija promjena prema učinku i riziku.</li>
              <li>Implementacija automatizacija, templateova i runbooka.</li>
            </ul>
          </div>

          <div className="mt-8">
            <ContactTrackedLink href={ROUTES.contact} source="productivity" className="button-primary-pill">
              Zatražite audit delivery procesa
            </ContactTrackedLink>
          </div>

          <div className="mt-8 text-sm text-[var(--ink-mute)]">
            <p>
              Povezano: <Link href={ROUTES.aiConsulting} className="text-[var(--primary)]">AI consulting</Link> i <Link href={ROUTES.quality} className="text-[var(--primary)]">privatnost i kvaliteta</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
