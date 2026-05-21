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
    title: "Politika privatnosti",
    description:
      "Politika privatnosti za HOTFIX d.o.o. web stranicu: koje podatke prikupljamo putem kontakt forme i analitike te kako ih koristimo.",
    eyebrow: "pravne informacije",
    updated: "Zadnje ažuriranje: siječanj 2026.",
    breadcrumbHome: "Početna",
    sections: [
      {
        title: "Uvod",
        paragraphs: [
          "HOTFIX d.o.o. poštuje vašu privatnost. Ova politika objašnjava koje podatke prikupljamo kada koristite našu web stranicu ili nam pošaljete upit, zašto ih koristimo i kako nas možete kontaktirati u vezi privatnosti.",
        ],
      },
      {
        title: "Podaci koje prikupljamo",
        paragraphs: [
          "Kada nas kontaktirate putem web stranice, prikupljamo:",
          "Također koristimo Google Analytics 4 za osnovno razumijevanje korištenja web stranice: prikaze stranica, posjete blogu, klikove na kontakt pozive na akciju, klikove na email linkove, podatke o pregledniku i uređaju te približnu lokaciju izvedenu iz IP adrese.",
        ],
        items: [
          "ime i prezime",
          "email adresu",
          "naziv tvrtke, ako ga unesete",
          "sadržaj poruke",
        ],
      },
      {
        title: "Kako koristimo podatke",
        paragraphs: ["Podatke koristimo za:"],
        items: [
          "odgovor na vaš upit",
          "pripremu informacija o našim uslugama",
          "poboljšanje web stranice i sadržaja",
          "mjerenje posjećenosti bloga i kontakt konverzija",
        ],
      },
      {
        title: "Analytics",
        paragraphs: [
          "Koristimo Google Analytics 4 kako bismo razumjeli koje se stranice i blog članci čitaju te kojim putem posjetitelji dolaze do kontakt forme ili email linka.",
          "Analitika nam pomaže mjeriti učinkovitost web stranice i poboljšavati sadržaj. Ne prodajemo osobne podatke.",
        ],
      },
      {
        title: "Sigurnost podataka",
        paragraphs: [
          "Koristimo razumne tehničke i organizacijske mjere za zaštitu osobnih podataka od neovlaštenog pristupa, izmjene, objave ili uništenja.",
        ],
      },
      {
        title: "Kontakt",
        paragraphs: [
          "Za pitanja o ovoj politici privatnosti kontaktirajte nas na ops@hotfix-doo.com.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    description:
      "Privacy policy for the HOTFIX d.o.o. website: what data we collect through the contact form and analytics, and how we use it.",
    eyebrow: "legal information",
    updated: "Last updated: January 2026.",
    breadcrumbHome: "Home",
    sections: [
      {
        title: "Introduction",
        paragraphs: [
          "HOTFIX d.o.o. respects your privacy. This policy explains what data we collect when you use our website or send us an inquiry, why we use it, and how you can contact us about privacy.",
        ],
      },
      {
        title: "Data We Collect",
        paragraphs: [
          "When you contact us through the website, we collect:",
          "We also use Google Analytics 4 for basic website usage insights: page views, blog visits, contact call-to-action clicks, email link clicks, browser and device information, and approximate location derived from the IP address.",
        ],
        items: [
          "full name",
          "email address",
          "company name, if provided",
          "message content",
        ],
      },
      {
        title: "How We Use Data",
        paragraphs: ["We use data to:"],
        items: [
          "respond to your inquiry",
          "prepare information about our services",
          "improve the website and content",
          "measure blog traffic and contact conversions",
        ],
      },
      {
        title: "Analytics",
        paragraphs: [
          "We use Google Analytics 4 to understand which pages and blog articles are read and how visitors reach the contact form or email link.",
          "Analytics helps us measure website effectiveness and improve content. We do not sell personal data.",
        ],
      },
      {
        title: "Data Security",
        paragraphs: [
          "We use reasonable technical and organizational measures to protect personal data from unauthorized access, alteration, disclosure, or destruction.",
        ],
      },
      {
        title: "Contact",
        paragraphs: [
          "For questions about this privacy policy, contact us at ops@hotfix-doo.com.",
        ],
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
  const canonicalUrl = getLocalizedUrl(ROUTES.privacy, loc);

  return {
    title: text.title,
    description: text.description,
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(ROUTES.privacy),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivacyPage({
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
      { name: text.title, url: getLocalizedPath(ROUTES.privacy, loc) },
    ],
    loc
  );

  return (
    <div className="bg-white">
      <StructuredData data={breadcrumbSchema} />
      <section className="gradient-mesh py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="pill-tag-soft mb-6">{text.eyebrow}</span>
          <h1 className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-[var(--ink)]">
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
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-gray-600 mb-4">
                  {paragraph}
                </p>
              ))}
              {"items" in section ? (
                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
