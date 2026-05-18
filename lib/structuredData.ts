import { Organization, Person, WebSite, LocalBusiness, FAQPage, BreadcrumbList, WithContext } from 'schema-dts';
import { ROUTES, SITE_URL, type SiteLocale } from './constants';
import { getLocalizedUrl } from './seo';

const siteUrl = SITE_URL;

export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'HOTFIX d.o.o.',
  legalName: 'HOTFIX d.o.o.',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/logo.png`,
    width: '512',
    height: '512',
  },
  description: 'AI i software consulting tvrtka iz Hrvatske. HOTFIX pomaže timovima uvoditi AI u stvarne procese, donositi jasnije tehničke odluke i pouzdanije isporučivati software.',
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
  email: 'ops@hotfix-doo.com',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'ops@hotfix-doo.com',
    contactType: 'customer support',
    availableLanguage: ['Croatian', 'English'],
  },
  knowsAbout: [
    'AI consulting',
    'AI adoption strategy',
    'Claude Code',
    'AI-assisted development',
    'Multi-agent systems',
    'Software architecture',
    'Software delivery',
    'Custom software development',
    '.NET',
    'TypeScript',
    'React',
    'Go',
    'Kotlin',
    'Swift',
    'Python',
  ],
  areaServed: {
    '@type': 'Place',
    name: 'Hrvatska i međunarodna tržišta',
  },
};

export const founderSchema: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#founder`,
  name: 'Josip Budalić',
  jobTitle: 'Osnivač i software consultant',
  worksFor: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'HOTFIX d.o.o.',
  },
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

export const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'HOTFIX d.o.o.',
  alternateName: ['HOTFIX', 'hotfix-doo.com'],
  description: 'AI i software consulting za tvrtke koje žele kvalitetniji razvojni proces, održivu arhitekturu i pouzdaniju isporuku softwarea.',
  publisher: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
  },
  inLanguage: 'hr-HR',
};

export const localBusinessSchema: WithContext<LocalBusiness> = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#localbusiness`,
  name: 'HOTFIX d.o.o.',
  image: `${siteUrl}/logo.png`,
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
};

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

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

export function generateServiceSchema(
  serviceName: string,
  description: string,
  locale: SiteLocale = "hr"
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    description: description,
    provider: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'HOTFIX d.o.o.',
    },
    areaServed: {
      '@type': 'Place',
      name: locale === "en" ? 'Croatia and international markets' : 'Hrvatska i međunarodna tržišta',
    },
    inLanguage: locale === "en" ? 'en-US' : 'hr-HR',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === "en" ? 'AI and software consulting services' : 'AI i software consulting usluge',
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

export const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${getLocalizedUrl(ROUTES.about, "hr")}/#aboutpage`,
  url: getLocalizedUrl(ROUTES.about, "hr"),
  name: 'O HOTFIX d.o.o.',
  description: 'HOTFIX d.o.o. je hrvatska AI i software consulting tvrtka usmjerena na praktičnu isporuku softwarea, arhitekturu, AI workflowe i modernizaciju.',
  inLanguage: 'hr-HR',
  mainEntity: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
  },
  about: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
  },
};

export const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${getLocalizedUrl(ROUTES.contact, "hr")}/#contactpage`,
  url: getLocalizedUrl(ROUTES.contact, "hr"),
  name: 'Kontakt - HOTFIX d.o.o.',
  description: 'Pošaljite upit za AI consulting, software consulting, custom development, modernizaciju ili poboljšanje engineering procesa.',
  inLanguage: 'hr-HR',
  mainEntity: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
  },
};
