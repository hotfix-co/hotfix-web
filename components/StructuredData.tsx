import React from 'react';

interface StructuredDataProps {
  data: object | object[];
}

/**
 * Component to inject JSON-LD structured data into the page
 * This helps search engines understand the content better
 */
export default function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) 
    ? data.map(item => JSON.stringify(item)).join(',')
    : JSON.stringify(data);

  // If array, wrap in array brackets
  const finalJsonLd = Array.isArray(data) ? `[${jsonLd}]` : jsonLd;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: finalJsonLd }}
      suppressHydrationWarning
    />
  );
}

