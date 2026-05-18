import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { ROUTES, SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return [{ locale: "hr" }, { locale: "en" }];
}

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description: "Politika privatnosti za HOTFIX d.o.o. web stranicu: koje podatke prikupljamo putem kontakt forme i analitike te kako ih koristimo.",
  alternates: {
    canonical: `${SITE_URL}${ROUTES.privacy}`,
    languages: {
      "hr-HR": `${SITE_URL}${ROUTES.privacy}`,
      "en": `${SITE_URL}/en/privacy`,
      "x-default": `${SITE_URL}${ROUTES.privacy}`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Početna", url: "/" },
    { name: "Politika privatnosti", url: ROUTES.privacy },
  ]);

  return (
    <div className="bg-white">
      <StructuredData data={breadcrumbSchema} />
      <section className="gradient-mesh py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="pill-tag-soft mb-6">pravne informacije</span>
          <h1 className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-[var(--ink)]">
            Politika privatnosti
          </h1>
          <p className="section-lede">
            Zadnje ažuriranje: siječanj 2026.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="prose prose-lg mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Uvod
            </h2>
            <p className="text-gray-600 mb-4">
              HOTFIX d.o.o. poštuje vašu privatnost. Ova politika objašnjava
              koje podatke prikupljamo kada koristite našu web stranicu ili
              nam pošaljete upit, zašto ih koristimo i kako nas možete
              kontaktirati u vezi privatnosti.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Podaci koje prikupljamo
            </h2>
            <p className="text-gray-600 mb-4">
              Kada nas kontaktirate putem web stranice, prikupljamo:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>ime i prezime</li>
              <li>email adresu</li>
              <li>naziv tvrtke, ako ga unesete</li>
              <li>sadržaj poruke</li>
            </ul>
            <p className="text-gray-600 mb-4">
              Također koristimo Google Analytics 4 za osnovno razumijevanje
              korištenja web stranice: prikaze stranica, posjete blogu,
              klikove na kontakt pozive na akciju, klikove na email linkove,
              podatke o pregledniku i uređaju te približnu lokaciju izvedenu
              iz IP adrese.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Kako koristimo podatke
            </h2>
            <p className="text-gray-600 mb-4">Podatke koristimo za:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>odgovor na vaš upit</li>
              <li>pripremu informacija o našim uslugama</li>
              <li>poboljšanje web stranice i sadržaja</li>
              <li>mjerenje posjećenosti bloga i kontakt konverzija</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Analytics
            </h2>
            <p className="text-gray-600 mb-4">
              Koristimo Google Analytics 4 kako bismo razumjeli koje se
              stranice i blog članci čitaju te kojim putem posjetitelji dolaze
              do kontakt forme ili email linka.
            </p>
            <p className="text-gray-600 mb-4">
              Analitika nam pomaže mjeriti učinkovitost web stranice i
              poboljšavati sadržaj. Ne prodajemo osobne podatke.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sigurnost podataka
            </h2>
            <p className="text-gray-600 mb-4">
              Koristimo razumne tehničke i organizacijske mjere za zaštitu
              osobnih podataka od neovlaštenog pristupa, izmjene, objave ili
              uništenja.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Kontakt
            </h2>
            <p className="text-gray-600">
              Za pitanja o ovoj politici privatnosti kontaktirajte nas na
              ops@hotfix-doo.com.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
