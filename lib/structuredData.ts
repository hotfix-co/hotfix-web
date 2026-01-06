import { Organization, Person, WebSite, LocalBusiness, FAQPage, BreadcrumbList, WithContext } from 'schema-dts';

const siteUrl = 'https://hotfix-doo.com';

// Organization Schema - Company Information
export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'HOTFIX d.o.o.',
  legalName: 'HOTFIX d.o.o.',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/icon.png`,
    width: '512',
    height: '512',
  },
  description: 'Professional full-stack and mobile development company specializing in C#, React, Golang, Kotlin, and Swift. We deliver robust, scalable solutions for modern businesses.',
  founder: {
    '@type': 'Person',
    name: 'Josip Budalic',
    '@id': `${siteUrl}/#founder`,
  },
  foundingDate: '2020',
  foundingLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'HR',
      addressLocality: 'Croatia',
    },
  },
  email: 'ops@hotfix-doo.com',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'ops@hotfix-doo.com',
    contactType: 'Customer Service',
    availableLanguage: ['English', 'Croatian'],
  },
  sameAs: [
    // Add social media profiles when available
  ],
  knowsAbout: [
    'Full-Stack Development',
    'Mobile Development',
    'C# Development',
    'React Development',
    'Golang Development',
    'Kotlin Development',
    'Kotlin Multiplatform Mobile',
    'Swift Development',
    'Cross-Platform Mobile Development',
    'Web Development',
    'Android Development',
    'iOS Development',
    'Software Engineering',
  ],
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
};

// Person Schema - Founder: Josip Budalic
export const founderSchema: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#founder`,
  name: 'Josip Budalic',
  jobTitle: 'Founder & CEO',
  worksFor: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'HOTFIX d.o.o.',
  },
  knowsAbout: [
    'Software Development',
    'Full-Stack Development',
    'Mobile Development',
    'C# Programming',
    'React',
    'Golang',
    'Kotlin',
    'Kotlin Multiplatform Mobile',
    'Swift',
    'Cross-Platform Development',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Software Engineering',
  },
};

// WebSite Schema
export const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'HOTFIX d.o.o.',
  description: 'Professional full-stack and mobile development services',
  publisher: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
  },
  inLanguage: 'en-US',
};

// LocalBusiness Schema - Croatian Company
export const localBusinessSchema: WithContext<LocalBusiness> = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#localbusiness`,
  name: 'HOTFIX d.o.o.',
  image: `${siteUrl}/icon.png`,
  url: siteUrl,
  telephone: '', // Add phone if available
  email: 'ops@hotfix-doo.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'HR',
    addressLocality: 'Croatia',
  },
  geo: {
    '@type': 'GeoCoordinates',
    // Add latitude and longitude when available
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
    name: 'Josip Budalic',
  },
};

// FAQ Schema for Contact Page
export const contactFAQSchema: WithContext<FAQPage> = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of projects do you work on?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We work on a wide range of projects including web applications, APIs, microservices, e-commerce platforms, native mobile apps (Android with Kotlin, iOS with Swift), and custom software solutions. Whether it\'s a startup MVP or enterprise system, we\'ve got you covered.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a typical project take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Project timelines vary based on complexity and requirements. Small projects may take 2-4 weeks, while larger applications can take 3-6 months. We provide detailed timelines during the planning phase.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide ongoing support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We offer ongoing maintenance, support, and feature development for all our projects. We\'re committed to long-term partnerships with our clients.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is your development process?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We follow an agile methodology with regular sprints, code reviews, and client communication. You\'ll have full visibility into the development process with regular updates and demos.',
      },
    },
  ],
};

// Breadcrumb Schema Generator
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

// Service Schema Generator
export function generateServiceSchema(serviceName: string, description: string) {
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
      name: 'Worldwide',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Development Services',
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

// About Page Schema
export const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${siteUrl}/about/#aboutpage`,
  url: `${siteUrl}/about`,
  name: 'About HOTFIX d.o.o.',
  description: 'Learn about HOTFIX d.o.o., founded by Josip Budalic, our mission, values, and expertise in full-stack and mobile development.',
  mainEntity: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
  },
  about: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
  },
};

// Contact Page Schema
export const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${siteUrl}/contact/#contactpage`,
  url: `${siteUrl}/contact`,
  name: 'Contact HOTFIX d.o.o.',
  description: 'Get in touch with HOTFIX d.o.o. for your full-stack and mobile development needs.',
  mainEntity: {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
  },
};

