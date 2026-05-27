import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Script from "next/script";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import {
  getOrganizationSchema,
  getWebsiteSchema,
  getLocalBusinessSchema,
  getFounderSchema,
} from "@/lib/structuredData";
import type { SiteLocale } from "@/lib/constants";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Locale-aware meta keywords. Google ignores these for ranking, but other
// crawlers (Bing, DuckDuckGo) still read them as a topical signal, and a
// mismatched English list on an HR page hurts Google's locale inference.
//
// HR keywords target the Balkan market (HR + BA/RS via cross-intelligible
// terms). EN keywords reposition the EN site as a Croatia-based nearshore
// engineering partner instead of competing in the saturated global "AI
// consulting" query space.
const KEYWORDS_BY_LOCALE: Record<SiteLocale, string[]> = {
  hr: [
    "AI savjetovanje",
    "AI konzalting",
    "umjetna inteligencija",
    "software consulting",
    "razvoj softvera",
    "izrada softvera po mjeri",
    "Claude Code",
    "AI-assisted development",
    "modernizacija softvera",
    "softverska arhitektura",
    "softverska tvrtka",
    "GDPR usklađenost",
    "Zagreb",
    "Hrvatska",
    "HOTFIX d.o.o.",
    "Josip Budalić",
  ],
  en: [
    "nearshore engineering Croatia",
    "Croatia software development",
    "Balkans AI consultancy",
    "AI consulting Croatia",
    "Claude Code consulting",
    "nearshore developers EU",
    "Croatian software developers",
    "AI-assisted development consulting",
    "software architecture consulting",
    "software modernization",
    "GDPR-compliant software",
    "Zagreb software company",
    "HOTFIX d.o.o.",
    "Josip Budalić",
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: SiteLocale = locale === "en" ? "en" : "hr";
  return {
    keywords: KEYWORDS_BY_LOCALE[loc],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "hr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const loc = locale as SiteLocale;
  const htmlLang = loc === "hr" ? "hr-HR" : "en";

  return (
    <html lang={htmlLang}>
      <head>
        <StructuredData
          data={[
            getOrganizationSchema(loc),
            getWebsiteSchema(loc),
            getLocalBusinessSchema(loc),
            getFounderSchema(loc),
          ]}
        />
        {measurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = window.gtag || gtag;
                gtag('js', new Date());
                gtag('config', '${measurementId}', {
                  anonymize_ip: true,
                  send_page_view: true
                });
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <AnalyticsProvider />
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
