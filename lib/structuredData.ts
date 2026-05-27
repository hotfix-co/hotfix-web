import { Organization, Person, WebSite, FAQPage, BreadcrumbList, WithContext } from 'schema-dts';
import { ROUTES, SITE_URL, type SiteLocale } from './constants';
import { getLocalizedUrl } from './seo';

const siteUrl = SITE_URL;

// Optional social and profile URLs. Fill these in to strengthen Knowledge
// Graph signals (Organization "sameAs" + Person "sameAs"). AI engines and
// Google use these to disambiguate the entity and pull richer cards.
// Leave entries empty to omit them from the schema.
const ORG_SAME_AS: string[] = [
  // 'https://www.linkedin.com/company/hotfix-doo',
  // 'https://github.com/hotfix-doo',
];

const FOUNDER_SAME_AS: string[] = [
  'https://www.linkedin.com/in/josip-budali%C4%87-4bb4011b6/',
];

const ORG_DESCRIPTION: Record<SiteLocale, string> = {
  hr: 'AI i software consulting tvrtka iz Hrvatske. HOTFIX d.o.o. pomaže timovima iz EU i SAD-a uvesti AI u stvarne procese, donositi jasnije tehničke odluke i pouzdanije isporučivati software.',
  en: 'Croatia-based AI and software consulting firm. HOTFIX d.o.o. helps EU and US product teams adopt AI in real workflows, modernize codebases, and deliver software more reliably.',
};

const WEBSITE_DESCRIPTION: Record<SiteLocale, string> = {
  hr: 'AI i software consulting iz Hrvatske za product timove iz EU-a i SAD-a koji žele kvalitetniji razvojni proces, održivu arhitekturu i pouzdaniju isporuku softvera.',
  en: 'Nearshore AI and software consulting from Croatia for EU and US product teams that want a better development process, sustainable architecture, and more reliable software delivery.',
};

const SCHEMA_LANG: Record<SiteLocale, string> = {
  hr: 'hr-HR',
  en: 'en',
};

// Visible client framing in schema is intentionally HR + EU + US — that's
// the prestige signal Balkan B2B buyers actually convert on. Balkan
// targeting is handled by the invisible SEO layer (hr-HR locale, HR
// content language, x-default → /hr, Croatian keywords), not by listing
// BA/RS/SI/ME here.
const AREA_SERVED_COUNTRIES = [
  { '@type': 'Country' as const, name: 'Croatia' },
  { '@type': 'Place' as const, name: 'European Union' },
  { '@type': 'Country' as const, name: 'United States' },
];

export function getOrganizationSchema(
  locale: SiteLocale = 'en'
): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'HOTFIX d.o.o.',
    legalName: 'HOTFIX d.o.o.',
    alternateName: 'HOTFIX',
    url: siteUrl,
    // Knowledge Panel logo. Google requires the image to actually match the
    // declared dimensions, so we point at the auto-emitted square /icon.png
    // (512x512) instead of /logo.png (772x666 with whitespace) where the
    // declared dimensions used to lie.
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/icon.png`,
      width: '512',
      height: '512',
    },
    image: `${siteUrl}/opengraph-image`,
    description: ORG_DESCRIPTION[locale],
    founder: {
      '@type': 'Person',
      name: 'Josip Budalić',
      '@id': `${siteUrl}/#founder`,
    },
    foundingDate: '2022',
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'HR',
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'HR',
    },
    email: 'ops@hotfix-doo.com',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'ops@hotfix-doo.com',
      contactType: 'customer support',
      availableLanguage: ['Croatian', 'English'],
      areaServed: ['HR', 'EU', 'US'],
    },
    knowsAbout: [
      'AI consulting',
      'AI adoption strategy',
      'Claude Code',
      'AI-assisted development',
      'Multi-agent systems',
      'Software architecture',
      'Software delivery',
      'Software modernization',
      'Custom software development',
      'Engineering process consulting',
      'CI/CD',
      'GDPR',
      'Privacy by design',
      '.NET',
      'TypeScript',
      'React',
      'Next.js',
      'Go',
      'Kotlin',
      'Swift',
      'KMM',
      'Python',
    ],
    knowsLanguage: ['hr', 'en'],
    areaServed: AREA_SERVED_COUNTRIES,
    ...(ORG_SAME_AS.length > 0 ? { sameAs: ORG_SAME_AS } : {}),
  };
}

export function getFounderSchema(locale: SiteLocale = 'en'): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#founder`,
    name: 'Josip Budalić',
    givenName: 'Josip',
    familyName: 'Budalić',
    jobTitle:
      locale === 'hr'
        ? 'Osnivač i software consultant'
        : 'Founder and software consultant',
    worksFor: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'HOTFIX d.o.o.',
    },
    url: getLocalizedUrl(ROUTES.about, locale),
    image: `${siteUrl}/opengraph-image`,
    nationality: {
      '@type': 'Country',
      name: 'Croatia',
    },
    knowsLanguage: ['hr', 'en'],
    knowsAbout: [
      'Software architecture',
      'AI-assisted development',
      'Claude Code',
      'Engineering process consulting',
      '.NET',
      'React',
      'Go',
      'Kotlin',
      'Swift',
      'Python',
    ],
    ...(FOUNDER_SAME_AS.length > 0 ? { sameAs: FOUNDER_SAME_AS } : {}),
  };
}

export function getWebsiteSchema(locale: SiteLocale = 'en'): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'HOTFIX d.o.o.',
    // Per Google's documented fallback advice for site names: include the
    // lowercase domain as an alternateName so that, if the site-name system
    // isn't confident enough to use the preferred name, it picks the
    // explicit domain string we approved rather than synthesising one.
    // https://developers.google.com/search/docs/appearance/site-names
    alternateName: ['HOTFIX', 'HOTFIX consulting', 'hotfix-doo.com'],
    description: WEBSITE_DESCRIPTION[locale],
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: SCHEMA_LANG[locale],
  };
}

// ProfessionalService is a more accurate type for a consultancy than the
// generic LocalBusiness (which implies a storefront / foot traffic). It still
// inherits all LocalBusiness fields, so rich-result eligibility is preserved.
export function getProfessionalServiceSchema(
  locale: SiteLocale = 'en'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#business`,
    name: 'HOTFIX d.o.o.',
    legalName: 'HOTFIX d.o.o.',
    alternateName: 'HOTFIX',
    description: ORG_DESCRIPTION[locale],
    image: `${siteUrl}/opengraph-image`,
    logo: `${siteUrl}/icon.png`,
    url: siteUrl,
    email: 'ops@hotfix-doo.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'HR',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    priceRange: '$$',
    paymentAccepted: 'Bank transfer (EUR)',
    currenciesAccepted: 'EUR',
    founder: {
      '@type': 'Person',
      '@id': `${siteUrl}/#founder`,
      name: 'Josip Budalić',
    },
    inLanguage: ['hr-HR', 'en'],
    areaServed: AREA_SERVED_COUNTRIES,
    serviceType: [
      locale === 'en' ? 'AI consulting' : 'AI consulting',
      locale === 'en' ? 'Software consulting' : 'Software consulting',
      locale === 'en'
        ? 'Custom software development'
        : 'Custom software development',
      locale === 'en' ? 'Software modernization' : 'Modernizacija softwarea',
      locale === 'en'
        ? 'Engineering productivity consulting'
        : 'Engineering produktivnost',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name:
        locale === 'en'
          ? 'AI and software consulting services'
          : 'AI i software consulting usluge',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: locale === 'en' ? 'AI consulting' : 'AI consulting',
            url: getLocalizedUrl(ROUTES.aiConsulting, locale),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name:
              locale === 'en'
                ? 'Engineering productivity'
                : 'Engineering produktivnost',
            url: getLocalizedUrl(ROUTES.productivity, locale),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name:
              locale === 'en'
                ? 'Privacy and quality'
                : 'Privatnost i kvaliteta',
            url: getLocalizedUrl(ROUTES.quality, locale),
          },
        },
      ],
    },
  };
}

// Backwards-compatible alias — some pages may still import this name.
export const getLocalBusinessSchema = getProfessionalServiceSchema;

// Backward-compatible exports (default to English, used where locale isn't available)
export const organizationSchema = getOrganizationSchema('en');
export const founderSchema = getFounderSchema('en');
export const websiteSchema = getWebsiteSchema('en');
export const localBusinessSchema = getProfessionalServiceSchema('en');

export const contactFAQSchema: WithContext<FAQPage> = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Na kakvim projektima radite?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Radimo na uvođenju AI-ja, softverskoj arhitekturi, internim alatima, web i mobile aplikacijama, backend sustavima, integracijama, automatizacijama i modernizaciji postojećeg softvera.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kako izgleda početak suradnje?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Krećemo s kratkim razgovorom i pregledom ciljeva, postojećeg stanja i rizika. Nakon toga predlažemo jasan opseg rada, tehnički smjer i prve korake.',
      },
    },
    {
      '@type': 'Question',
      name: 'Možete li pomoći postojećem timu?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Da. Možemo raditi kao savjetnici, kao hands-on engineering podrška ili kao partner za specifičan dio isporuke, uz transfer znanja prema internom timu.',
      },
    },
    {
      '@type': 'Question',
      name: 'Radite li s AI alatima poput Claude Codea?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Da. Pomažemo timovima uvesti Claude Code i slične AI coding workflowe odgovorno, uz standarde za review, sigurnost, testiranje, dokumentaciju i ownership.',
      },
    },
  ],
};

export function getHomepageFAQSchema(
  locale: SiteLocale = 'en',
  qa?: Array<{ q: string; a: string }>
): WithContext<FAQPage> {
  const fallback = locale === 'hr' ? contactFAQSchema.mainEntity : [];
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteUrl}/#faq`,
    mainEntity: qa
      ? qa.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        }))
      : (fallback as never),
    ...({ inLanguage: SCHEMA_LANG[locale] } as Record<string, unknown>),
  };
}

export function getHomepageWebPageSchema(locale: SiteLocale = 'en') {
  const url = getLocalizedUrl(ROUTES.home, locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name:
      locale === 'en'
        ? 'HOTFIX d.o.o. — Nearshore AI & Software Consulting from Croatia'
        : 'HOTFIX d.o.o. — AI i software consulting iz Hrvatske',
    description: ORG_DESCRIPTION[locale],
    inLanguage: SCHEMA_LANG[locale],
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#business` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${siteUrl}/opengraph-image`,
      width: '1200',
      height: '630',
    },
    reviewedBy: { '@id': `${siteUrl}/#founder` },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
  locale: SiteLocale = 'en'
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
    // schema-dts doesn't type inLanguage on BreadcrumbList, but Google accepts it
    ...({ inLanguage: SCHEMA_LANG[locale] } as Record<string, unknown>),
  };
}

export function generateServiceSchema(
  serviceName: string,
  description: string,
  locale: SiteLocale = 'en'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    name: serviceName,
    description: description,
    provider: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'HOTFIX d.o.o.',
    },
    areaServed:
      locale === 'en'
        ? AREA_SERVED_COUNTRIES
        : [
            { '@type': 'Country' as const, name: 'Hrvatska' },
            { '@type': 'Place' as const, name: 'Europska unija' },
            { '@type': 'Country' as const, name: 'Sjedinjene Američke Države' },
          ],
    inLanguage: SCHEMA_LANG[locale],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'en' ? 'AI and software consulting services' : 'AI i software consulting usluge',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: serviceName,
            description: description,
          },
        },
      ],
    },
  };
}

export function generateItemListSchema(
  items: { name: string; url: string; description?: string }[],
  locale: SiteLocale = 'en'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    inLanguage: SCHEMA_LANG[locale],
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `${siteUrl}${item.url}`,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

// Generic WebPage schema. Use on pages that don't have a more specific schema
// (ContactPage, AboutPage, etc.) to give AI systems a clear page-level anchor.
export function generateWebPageSchema({
  url,
  name,
  description,
  locale = 'en',
  breadcrumbId,
}: {
  url: string;
  name: string;
  description: string;
  locale?: SiteLocale;
  breadcrumbId?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: SCHEMA_LANG[locale],
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
    },
    about: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
    },
    ...(breadcrumbId ? { breadcrumb: { '@id': breadcrumbId } } : {}),
  };
}
