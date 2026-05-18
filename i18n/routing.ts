import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["hr", "en"],
  defaultLocale: "hr",
  localePrefix: "as-needed",
  pathnames: {
    "/": {
      hr: "/",
      en: "/",
    },
    "/about": {
      hr: "/o-nama",
      en: "/about",
    },
    "/services": {
      hr: "/usluge",
      en: "/services",
    },
    "/services/ai-consulting": {
      hr: "/usluge/ai-savjetovanje",
      en: "/services/ai-consulting",
    },
    "/services/productivity": {
      hr: "/usluge/engineering-produktivnost",
      en: "/services/productivity",
    },
    "/services/gdpr-quality": {
      hr: "/usluge/privatnost-i-kvaliteta",
      en: "/services/gdpr-quality",
    },
    "/contact": {
      hr: "/kontakt",
      en: "/contact",
    },
    "/privacy": {
      hr: "/privatnost",
      en: "/privacy",
    },
    "/terms": {
      hr: "/uvjeti-koristenja",
      en: "/terms",
    },
    "/blog": {
      hr: "/blog",
      en: "/blog",
    },
  } as const,
});
