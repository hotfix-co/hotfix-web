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
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
