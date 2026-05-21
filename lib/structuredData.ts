import { Organization, Person, WebSite, LocalBusiness, FAQPage, BreadcrumbList, WithContext } from 'schema-dts';
import { ROUTES, SITE_URL, type SiteLocale } from './constants';
import { getLocalizedUrl } from './seo';

const siteUrl = SITE_URL;

const ORG_DESCRIPTION: Record<SiteLocale, string> = {
  hr: 'AI i software consulting tvrtka iz Hrvatske. HOTFIX d.o.o. pomaže timovima uvesti AI u stvarne procese, donositi jasnije tehničke odluke i pouzdanije isporučivati software.',
  en: 'Croatian AI and software consulting firm. HOTFIX d.o.o. helps teams integrate AI into real processes, make clearer technical decisions, and deliver software more reliably.',
};

const WEBSITE_DESCRIPTION: Record<SiteLocale, string> = {
  hr: 'AI i software consulting za tvrtke koje žele kvalitetniji razvojni proces, održivu arhitekturu i pouzdaniju isporuku softwarea.',
  en: 'AI and software consulting for teams that want a better development process, sustainable architecture, and more reliable software delivery.',
};

const AREA_SERVED_NAME: Record<SiteLocale, string> = {
  hr: 'Hrvatska i međunarodna tržišta',
  en: 'Croatia and international markets',
};

const SCHEMA_LANG: Record<SiteLocale, string> = {
  hr: 'hr-HR',
  en: 'en',
};

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
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.png`,
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
    foundingDate: '2020',
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
      areaServed: ['HR', 'EU', 'Worldwide'],
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
    areaServed: [
      {
        '@type': 'Country',
        name: 'Croatia',
      },
      {
        '@type': 'Place',
        name: AREA_SERVED_NAME[locale],
      },
    ],
  };
}

export function getFounderSchema(locale: SiteLocale = 'en'): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#founder`,
    name: 'Josip Budalić',
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
  };
}

export function getWebsiteSchema(locale: SiteLocale = 'en'): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'HOTFIX d.o.o.',
    alternateName: ['HOTFIX', 'HOTFIX consulting'],
    description: WEBSITE_DESCRIPTION[locale],
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: SCHEMA_LANG[locale],
  };
}

export function getLocalBusinessSchema(
  locale: SiteLocale = 'en'
): WithContext<LocalBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: 'HOTFIX d.o.o.',
    description: ORG_DESCRIPTION[locale],
    image: `${siteUrl}/logo.png`,
    logo: `${siteUrl}/logo.png`,
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
    founder: {
      '@type': 'Person',
      '@id': `${siteUrl}/#founder`,
      name: 'Josip Budalić',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Croatia',
      },
      {
        '@type': 'Place',
        name: AREA_SERVED_NAME[locale],
      },
    ],
  };
}

// Backward-compatible exports (default to English, used where locale isn't available)
export const organizationSchema = getOrganizationSchema('en');
export const founderSchema = getFounderSchema('en');
export const websiteSchema = getWebsiteSchema('en');
export const localBusinessSchema = getLocalBusinessSchema('en');

export const contactFAQSchema: WithContext<FAQPage> = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Na kakvim projektima radite?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Radimo na AI adopciji, software arhitekturi, internim alatima, web i mobile aplikacijama, backend sustavima, integracijama, automatizacijama i modernizaciji postojećeg softwarea.',
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
    areaServed: {
      '@type': 'Place',
      name: locale === 'en' ? 'Croatia and international markets' : 'Hrvatska i međunarodna tržišta',
    },
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
