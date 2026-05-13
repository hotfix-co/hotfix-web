import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import Link from "next/link";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy-First Delivery & Product Quality | HOTFIX",
  description:
    "Privacy-first delivery: we design secure, compliant products with data protection, strong QA, and production readiness to reduce risk and increase trust.",
  alternates: { canonical: `${SITE_URL}/services/gdpr-quality` },
  openGraph: {
    url: `${SITE_URL}/services/gdpr-quality`,
    title: "GDPR & Quality Delivery | HOTFIX",
    description:
      "Privacy-first engineering, GDPR compliance, secure data practices, and rigorous quality assurance for reliable product launches.",
  },
  keywords: [
    "privacy-first engineering",
    "data protection",
    "compliance",
    "secure delivery",
    "production readiness",
    "observability",
  ],
};

export default function GDPRQualityPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "GDPR & Quality", url: "/services/gdpr-quality" },
  ]);

  const serviceSchema = generateServiceSchema(
    "Privacy-First Delivery & Product Quality",
    "Privacy-first product delivery with data protection, compliance-ready docs, automated testing, and observability for safe production launches.",
  );
  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you build GDPR-compliant products?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We design privacy-first architectures, minimize data retention, and provide documentation to support compliance and audits.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you ensure product quality?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We combine automated testing, observability, staging environments, and release stability practices to ensure production-grade quality.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you help with incident readiness?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — runbooks, monitoring, and incident response playbooks are part of our delivery and handover process.',
        },
      },
    ],
  };

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumb, faqSchema, serviceSchema]} />

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="pill-tag-soft mb-6">Privacy & Quality</span>
          <h1 className="mb-6 text-[40px] font-bold text-[var(--ink)]">Privacy-first engineering and production readiness</h1>
          <p className="mb-6 text-[18px] text-[var(--ink-secondary)]">
            We design systems that treat data responsibly and ship with production-grade quality: observability, testing, and incident readiness baked in.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-[18px] font-semibold">How we help</h2>
              <ul className="mt-3 list-inside list-disc text-[15px] text-[var(--ink-mute)] space-y-2">
                <li>Privacy-by-design architecture and threat modeling.</li>
                <li>Data handling policies, encryption, and access controls.</li>
                <li>Automated test suites, CI, and observability for reliability.</li>
                <li>Operational runbooks and compliance-ready documentation.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-[18px] font-semibold">Who it's for</h2>
              <p className="mt-3 text-[15px] text-[var(--ink-mute)]">Teams shipping products that handle user data, platform owners, and engineering leaders who need audit-ready delivery.</p>
            </div>
          </div>

          <div className="mt-8">
            <ContactTrackedLink href="/contact" source="gdpr_quality" className="button-primary-pill">
              Talk about privacy & quality
            </ContactTrackedLink>
          </div>

          <div className="mt-8 text-sm text-[var(--ink-mute)]">
            <p>
              Related: <Link href="/services/ai-consulting" className="text-[var(--primary)]">AI Consulting</Link> • <Link href="/services/productivity" className="text-[var(--primary)]">Developer Productivity</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
