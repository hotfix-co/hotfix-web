import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import Link from "next/link";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Developer Productivity & Engineering Velocity | HOTFIX",
  description:
    "Developer productivity consulting: we implement CI/CD, automation, and developer tooling to reduce cycle time and multiply engineering throughput safely.",
  alternates: { canonical: `${SITE_URL}/services/productivity` },
  openGraph: {
    url: `${SITE_URL}/services/productivity`,
    title: "Developer Productivity & Engineering Velocity | HOTFIX",
    description: "Tooling, CI/CD, automation, and workflows that help teams move faster with safety and quality.",
  },
  keywords: [
    "developer productivity",
    "engineering velocity",
    "CI/CD",
    "developer tooling",
    "automation",
    "devops",
    "observability",
  ],
};

export default function ProductivityPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Productivity", url: "/services/productivity" },
  ]);

  const serviceSchema = generateServiceSchema(
    "Developer Productivity & Engineering Velocity",
    "CI/CD, automation, developer tooling, and observability to reduce cycle time and increase engineering throughput.",
  );
  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do you increase developer productivity?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We optimize tooling, automation, CI/CD, and developer workflows to remove friction, reduce context switching, and shorten cycle times.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide hands-on tooling and templates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — we deliver CI templates, repo scaffolds, developer onboarding docs, and automation scripts that your team can use immediately.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you help with observability and runbooks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely — we set up monitoring, alerts, dashboards, and operational playbooks to reduce mean time to detect and resolve issues.',
        },
      },
    ],
  };

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumb, faqSchema, serviceSchema]} />

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="pill-tag-soft mb-6">Developer Productivity</span>
          <h1 className="mb-6 text-[40px] font-bold text-[var(--ink)]">Multiply engineering velocity with tooling and automation</h1>
          <p className="mb-6 text-[18px] text-[var(--ink-secondary)]">
            We assess developer experience and deliver CI/CD, automation, and developer tooling that reduce cycle time and let your team focus on shipping value.
          </p>

          <div className="mt-6">
            <h2 className="text-[18px] font-semibold">What we deliver</h2>
            <ul className="mt-3 list-inside list-disc text-[15px] text-[var(--ink-mute)] space-y-2">
              <li>CI/CD pipelines, repo templates, and automated releases.</li>
              <li>Developer onboarding tooling to accelerate new hires.</li>
              <li>Automation that removes repetitive manual work.</li>
              <li>Observability, dashboards, and operational playbooks.</li>
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-[18px] font-semibold">Reduce developer toil</h2>
            <p className="mt-3 text-[15px] text-[var(--ink-mute)]">We run a short audit to identify the highest-impact repetitive tasks and deliver automation, templates, and CI changes that eliminate them.</p>
            <ul className="mt-3 list-inside list-disc text-[15px] text-[var(--ink-mute)] space-y-2">
              <li>1-day toil audit to surface repetitive tasks.</li>
              <li>Automate top pain points (CI, releases, scaffolding).</li>
              <li>Deliver repo templates, CI workflows, and runbooks.</li>
            </ul>
          </div>

          <div className="mt-8">
            <ContactTrackedLink href="/contact" source="productivity" className="button-primary-pill">
              Start a productivity audit
            </ContactTrackedLink>
          </div>

          <div className="mt-8 text-sm text-[var(--ink-mute)]">
            <p>
              Related: <Link href="/services/ai-consulting" className="text-[var(--primary)]">AI Consulting</Link> • <Link href="/services/gdpr-quality" className="text-[var(--primary)]">Privacy & Quality</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
