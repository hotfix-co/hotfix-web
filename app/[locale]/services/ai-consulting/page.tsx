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
  title: "AI consulting i Claude Code workflowi",
  description:
    "AI consulting za tvrtke koje žele uvesti AI u stvarne procese: Claude Code enablement, AI-assisted development, multi-agent sustavi, guardraili i integracije.",
  alternates: {
    canonical: `${SITE_URL}${ROUTES.aiConsulting}`,
    languages: {
      "hr-HR": `${SITE_URL}${ROUTES.aiConsulting}`,
      "x-default": `${SITE_URL}${ROUTES.aiConsulting}`,
    },
  },
  openGraph: {
    url: `${SITE_URL}${ROUTES.aiConsulting}`,
    locale: "hr_HR",
    title: "AI consulting i AI-assisted development | HOTFIX",
    description:
      "Praktična AI adopcija, Claude Code workflowi, multi-agent sustavi i produkcijski guardraili bez hypea.",
  },
  keywords: [
    "AI consulting",
    "AI adopcija",
    "Claude Code consulting",
    "AI-assisted development",
    "multi-agent sustavi",
    "AI workflowi",
    "AI guardraili",
  ],
};

export default async function AIConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Početna", url: "/" },
    { name: "Usluge", url: ROUTES.services },
    { name: "AI consulting", url: ROUTES.aiConsulting },
  ]);

  const serviceSchema = generateServiceSchema(
    "AI consulting i AI-assisted development",
    "AI adopcija, Claude Code enablement, multi-agent workflowi, guardraili, evaluacije i produkcijske integracije.",
  );
  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Kada multi-agent sustav ima smisla?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ima smisla kada posao prirodno ima više uloga, jasne ulaze i izlaze, ponavljive provjere i dovoljno vrijednosti da opravda dodatnu kompleksnost.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kako uvodite Claude Code u tim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Počinjemo s pravilima rada, primjerima workflowa, review standardima, sigurnosnim ograničenjima i mjerenjem učinka na stvarnom codebaseu.',
        },
      },
      {
        '@type': 'Question',
        name: 'Možete li raditi s postojećim stackom?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Da. AI najčešće uvodimo u postojeće aplikacije, backend sustave, interne alate i development workflowe, bez potrebe za potpunom promjenom stacka.',
        },
      },
    ],
  };

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumb, faqSchema, serviceSchema]} />

      <section className="gradient-mesh relative overflow-hidden py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="pill-tag-soft mb-6">AI consulting</span>
          <h1 className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-[var(--ink)] md:text-[56px] md:leading-[1.03] md:tracking-[-1.4px]">
            AI u stvarnim procesima, ne u prezentacijama.
          </h1>
          <p className="max-w-2xl text-[16px] leading-[1.4] text-[var(--ink-secondary)]">
            Pomažemo procijeniti gdje AI ima smisla, kako ga sigurno integrirati u postojeći software i kako tim može koristiti Claude Code i slične alate bez gubitka kontrole nad kvalitetom.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="card-feature-light">
              <h2 className="mb-3 text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">Gdje pomažemo</h2>
              <ul className="mt-3 list-inside list-disc text-[15px] text-[var(--ink-mute)] space-y-2">
                <li>AI adoption strategija i izbor use caseova.</li>
                <li>Claude Code, Codex i AI coding workflowi za timove.</li>
                <li>Multi-agent sustavi kada posao stvarno traži više koordiniranih uloga.</li>
                <li>Guardraili, evaluacije, testiranje i human-in-the-loop provjere.</li>
                <li>Integracije s postojećim aplikacijama, API-jima i internim alatima.</li>
              </ul>
            </div>
            <div className="card-feature-light">
              <h2 className="mb-3 text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">Što ostaje timu</h2>
              <ul className="mt-3 list-inside list-disc text-[15px] text-[var(--ink-mute)] space-y-2">
                <li>Jasan plan gdje AI ulazi u proces, a gdje ne.</li>
                <li>Pravila za sigurnost, review, podatke i odgovornost.</li>
                <li>Primjeri workflowa koje tim može ponavljati.</li>
                <li>Dokumentirane odluke, rizici i kriteriji uspjeha.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="card-cream-band">
              <h2 className="text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">Za koga je ovo</h2>
              <p className="mt-3 text-[15px] text-[var(--ink-mute)]">Za product i engineering timove koji imaju konkretan proces, postojeći codebase ili poslovni workflow u kojem AI može skratiti ručni rad, povećati kvalitetu ili ubrzati odlučivanje.</p>
            </div>

            <div className="card-feature-light">
              <h2 className="text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">Proces</h2>
              <ol className="mt-3 list-inside list-decimal text-[15px] text-[var(--ink-mute)] space-y-2">
                <li>Mapiramo proces, podatke, rizike i očekivani učinak.</li>
                <li>Gradimo mali proof of value s jasnim kriterijima.</li>
                <li>Dodajemo guardraile, testove, logging i ownership.</li>
                <li>Predajemo dokumentaciju, workflowe i preporuke za širenje.</li>
              </ol>
            </div>
          </div>

          <div className="mt-8 text-sm text-[var(--ink-mute)]">
            <p>
              Povezano: <Link href={ROUTES.productivity} className="text-[var(--primary)]">engineering produktivnost</Link> i <Link href={ROUTES.quality} className="text-[var(--primary)]">privatnost i kvaliteta</Link>.
            </p>
          </div>

          <div className="mt-8">
            <ContactTrackedLink href={ROUTES.contact} source="ai_consulting" className="button-primary-pill">
              Dogovorite AI consulting razgovor
            </ContactTrackedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
