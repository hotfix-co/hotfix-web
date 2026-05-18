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
  title: "Privatnost, kvaliteta i spremnost za produkciju",
  description:
    "Software consulting za privatnost, sigurnije rukovanje podacima, kvalitetu isporuke, testiranje, observability i production readiness.",
  alternates: {
    canonical: `${SITE_URL}${ROUTES.quality}`,
    languages: {
      "hr-HR": `${SITE_URL}${ROUTES.quality}`,
      "x-default": `${SITE_URL}${ROUTES.quality}`,
    },
  },
  openGraph: {
    url: `${SITE_URL}${ROUTES.quality}`,
    locale: "hr_HR",
    title: "Privatnost i kvaliteta software isporuke | HOTFIX",
    description:
      "Privatnost po dizajnu, sigurnije rukovanje podacima, dokumentacija, testiranje i operativna spremnost.",
  },
  keywords: [
    "privatnost po dizajnu",
    "zaštita podataka",
    "GDPR",
    "kvaliteta softwarea",
    "spremnost za produkciju",
    "observability",
  ],
};

export default async function GDPRQualityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Početna", url: "/" },
    { name: "Usluge", url: ROUTES.services },
    { name: "Privatnost i kvaliteta", url: ROUTES.quality },
  ]);

  const serviceSchema = generateServiceSchema(
    "Privatnost, kvaliteta i spremnost za produkciju",
    "Software delivery s privatnošću po dizajnu, dokumentacijom, automatiziranim testiranjem, observabilityjem i operativnim runbookovima.",
  );
  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Pomažete li oko GDPR-a?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pomažemo tehnički urediti rukovanje podacima: minimizaciju podataka, pristupe, enkripciju, logiranje, dokumentaciju i odluke koje podržavaju compliance rad. Ne zamjenjujemo pravni savjet.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kako pristupate kvaliteti isporuke?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kombiniramo test strategiju, CI provjere, staging, observability, release checklistu i runbooke kako bi se problemi otkrivali prije korisnika.',
        },
      },
      {
        '@type': 'Question',
        name: 'Možete li pomoći postojećem proizvodu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Da. Možemo napraviti review postojećeg softwarea, predložiti prioritete i implementirati promjene bez zaustavljanja razvoja.',
        },
      },
    ],
  };

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumb, faqSchema, serviceSchema]} />

      <section className="gradient-mesh relative overflow-hidden py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="pill-tag-soft mb-6">privatnost i kvaliteta</span>
          <h1 className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-[var(--ink)] md:text-[56px] md:leading-[1.03] md:tracking-[-1.4px]">
            Software koji odgovorno rukuje podacima i spremnije ide u produkciju.
          </h1>
          <p className="max-w-2xl text-[16px] leading-[1.4] text-[var(--ink-secondary)]">
            Pomažemo timovima ugraditi privatnost, sigurnost, testiranje, observability i incident readiness u razvojni proces prije nego što problemi postanu skupi.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="card-feature-light">
              <h2 className="text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">Kako pomažemo</h2>
              <ul className="mt-3 list-inside list-disc text-[15px] text-[var(--ink-mute)] space-y-2">
                <li>Arhitektura s privatnošću po dizajnu i threat modeling.</li>
                <li>Minimizacija podataka, enkripcija, pristupi i audit trail.</li>
                <li>Automatizirani testovi, CI i release checklisti.</li>
                <li>Observability, alerting i operativni runbookovi.</li>
                <li>Dokumentacija odluka i predaja prema timu.</li>
              </ul>
            </div>

            <div className="card-cream-band">
              <h2 className="text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">Za koga je ovo</h2>
              <p className="mt-3 text-[15px] text-[var(--ink-mute)]">Za timove koji rade s korisničkim podacima, vlasnike platformi, engineering leadove i organizacije koje žele manje iznenađenja u produkciji.</p>
            </div>
          </div>

          <div className="mt-8">
            <ContactTrackedLink href={ROUTES.contact} source="gdpr_quality" className="button-primary-pill">
              Razgovarajmo o kvaliteti i rizicima
            </ContactTrackedLink>
          </div>

          <div className="mt-8 text-sm text-[var(--ink-mute)]">
            <p>
              Povezano: <Link href={ROUTES.aiConsulting} className="text-[var(--primary)]">AI consulting</Link> i <Link href={ROUTES.productivity} className="text-[var(--primary)]">engineering produktivnost</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
