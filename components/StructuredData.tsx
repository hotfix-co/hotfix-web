import React from 'react';

interface StructuredDataProps {
  data: object | object[];
}

/**
 * Component to inject JSON-LD structured data into the page
 * This helps search engines understand the content better
 */
export default function StructuredData({ data }: StructuredDataProps) {
  const finalJsonLd = Array.isArray(data)
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': data.map((item) => {
          const normalizedItem = { ...(item as Record<string, unknown>) };
          delete normalizedItem['@context'];
          return normalizedItem;
        }),
      })
    : JSON.stringify(data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: finalJsonLd }}
      suppressHydrationWarning
    />
  );
}
