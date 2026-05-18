import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { ROUTES, SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return [{ locale: "hr" }, { locale: "en" }];
}

export const metadata: Metadata = {
  title: "Uvjeti korištenja",
  description: "Uvjeti korištenja HOTFIX d.o.o. web stranice i informacija o AI i software consulting uslugama.",
  alternates: {
    canonical: `${SITE_URL}${ROUTES.terms}`,
    languages: {
      "hr-HR": `${SITE_URL}${ROUTES.terms}`,
      "en": `${SITE_URL}/en/terms`,
      "x-default": `${SITE_URL}${ROUTES.terms}`,
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Početna", url: "/" },
    { name: "Uvjeti korištenja", url: ROUTES.terms },
  ]);

  return (
    <div className="bg-white">
      <StructuredData data={breadcrumbSchema} />
      <section className="gradient-mesh py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="pill-tag-soft mb-6">pravne informacije</span>
          <h1 className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-[var(--ink)]">
            Uvjeti korištenja
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
              Prihvaćanje uvjeta
            </h2>
            <p className="text-gray-600 mb-4">
              Korištenjem ove web stranice prihvaćate ove uvjete korištenja.
              Ako se ne slažete s uvjetima, nemojte koristiti web stranicu.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Korištenje web stranice
            </h2>
            <p className="text-gray-600 mb-4">
              Web stranica služi za informiranje o HOTFIX d.o.o. i našim AI i
              software consulting uslugama. Ne smijete je koristiti za
              nezakonite, štetne ili neovlaštene aktivnosti.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Intelektualno vlasništvo
            </h2>
            <p className="text-gray-600 mb-4">
              Sadržaj, dizajn, logotip i drugi materijali na ovoj web
              stranici zaštićeni su autorskim pravom i drugim pravima
              intelektualnog vlasništva u vlasništvu HOTFIX d.o.o., osim ako
              nije drugačije navedeno.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ograničenje odgovornosti
            </h2>
            <p className="text-gray-600 mb-4">
              Informacije na web stranici daju se u informativne svrhe.
              HOTFIX d.o.o. ne odgovara za neizravnu ili posljedičnu štetu
              nastalu korištenjem web stranice ili nemogućnošću njezina
              korištenja.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Izmjene uvjeta
            </h2>
            <p className="text-gray-600 mb-4">
              Zadržavamo pravo izmjene ovih uvjeta. Izmjene stupaju na snagu
              objavom na ovoj stranici.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Kontakt
            </h2>
            <p className="text-gray-600">
              Za pitanja o uvjetima korištenja kontaktirajte nas na
              ops@hotfix-doo.com.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
