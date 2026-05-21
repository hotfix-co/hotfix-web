import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { ROUTES, type SiteLocale } from "@/lib/constants";
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
    title: "Uvjeti korištenja",
    description:
      "Uvjeti korištenja HOTFIX d.o.o. web stranice i informacija o AI i software consulting uslugama.",
    eyebrow: "pravne informacije",
    updated: "Zadnje ažuriranje: siječanj 2026.",
    breadcrumbHome: "Početna",
    sections: [
      {
        title: "Prihvaćanje uvjeta",
        body: "Korištenjem ove web stranice prihvaćate ove uvjete korištenja. Ako se ne slažete s uvjetima, nemojte koristiti web stranicu.",
      },
      {
        title: "Korištenje web stranice",
        body: "Web stranica služi za informiranje o HOTFIX d.o.o. i našim uslugama AI i software consultinga. Ne smijete je koristiti za nezakonite, štetne ili neovlaštene aktivnosti.",
      },
      {
        title: "Intelektualno vlasništvo",
        body: "Sadržaj, dizajn, logotip i drugi materijali na ovoj web stranici zaštićeni su autorskim pravom i drugim pravima intelektualnog vlasništva u vlasništvu HOTFIX d.o.o., osim ako nije drugačije navedeno.",
      },
      {
        title: "Ograničenje odgovornosti",
        body: "Informacije na web stranici daju se u informativne svrhe. HOTFIX d.o.o. ne odgovara za neizravnu ili posljedičnu štetu nastalu korištenjem web stranice ili nemogućnošću njezina korištenja.",
      },
      {
        title: "Izmjene uvjeta",
        body: "Zadržavamo pravo izmjene ovih uvjeta. Izmjene stupaju na snagu objavom na ovoj stranici.",
      },
      {
        title: "Kontakt",
        body: "Za pitanja o uvjetima korištenja kontaktirajte nas na ops@hotfix-doo.com.",
      },
    ],
  },
  en: {
    title: "Terms of Service",
    description:
      "Terms of service for the HOTFIX d.o.o. website and information about AI and software consulting services.",
    eyebrow: "legal information",
    updated: "Last updated: January 2026.",
    breadcrumbHome: "Home",
    sections: [
      {
        title: "Acceptance of Terms",
        body: "By using this website, you accept these terms of service. If you do not agree with the terms, do not use the website.",
      },
      {
        title: "Use of the Website",
        body: "The website is intended to provide information about HOTFIX d.o.o. and our AI and software consulting services. You must not use it for unlawful, harmful, or unauthorized activities.",
      },
      {
        title: "Intellectual Property",
        body: "The content, design, logo, and other materials on this website are protected by copyright and other intellectual property rights owned by HOTFIX d.o.o., unless stated otherwise.",
      },
      {
        title: "Limitation of Liability",
        body: "Information on the website is provided for informational purposes. HOTFIX d.o.o. is not liable for indirect or consequential damage arising from use of the website or inability to use it.",
      },
      {
        title: "Changes to Terms",
        body: "We reserve the right to update these terms. Changes take effect when published on this page.",
      },
      {
        title: "Contact",
        body: "For questions about these terms of service, contact us at ops@hotfix-doo.com.",
      },
    ],
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
  const canonicalUrl = getLocalizedUrl(ROUTES.terms, loc);

  return {
    title: text.title,
    description: text.description,
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(ROUTES.terms),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale === "en" ? "en" : "hr") satisfies SiteLocale;
  const text = copy[loc];
  setRequestLocale(locale);

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: text.breadcrumbHome, url: getLocalizedPath(ROUTES.home, loc) },
      { name: text.title, url: getLocalizedPath(ROUTES.terms, loc) },
    ],
    loc
  );

  return (
    <div className="bg-white">
      <StructuredData data={breadcrumbSchema} />
      <section className="gradient-mesh py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="pill-tag-soft mb-6">{text.eyebrow}</span>
          <h1 className="mb-6 hero-title">
            {text.title}
          </h1>
          <p className="section-lede">{text.updated}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="prose prose-lg mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {text.sections.map((section) => (
            <section key={section.title} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-600 mb-4">{section.body}</p>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
