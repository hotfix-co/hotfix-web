import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import Link from "next/link";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AI Consulting & Agentic Workflows | HOTFIX — AI Strategy & Guardrails",
  description:
    "AI consulting for product teams — we design agentic workflows, establish AI development pipelines, and implement guardrails so you can safely scale AI across your products and developer workflows.",
  alternates: { canonical: `${SITE_URL}/services/ai-consulting` },
  openGraph: {
    url: `${SITE_URL}/services/ai-consulting`,
    title: "AI Consulting & Agentic Workflows | HOTFIX",
    description:
      "Design and implementation of agentic workflows, AI development practices, guardrails, and integrations that boost engineering velocity.",
  },
  keywords: [
    "AI consulting",
    "agentic workflows",
    "AI guardrails",
    "AI development",
    "MLOps",
    "AI strategy",
    "AI integration",
    "AI deployment",
  ],
};

export default function AIConsultingPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "AI Consulting", url: "/services/ai-consulting" },
  ]);

  const serviceSchema = generateServiceSchema(
    "AI Consulting & Agentic Workflows",
    "Agentic workflow design, AI development pipelines, guardrails, and production integrations to safely scale AI.",
  );
  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an agentic workflow?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Agentic workflows are automated, goal-oriented processes that use AI agents to complete tasks end-to-end while following guardrails and human oversight where needed.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you ensure AI is safe in production?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We implement policy enforcement, human-in-the-loop checks, rate limits, data minimization, and thorough testing to reduce risk before and after deployment.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you work with our existing stack?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — we integrate AI into existing backends, pipelines, and apps, and provide integration guides, CI/CD templates, and handover documentation.',
        },
      },
    ],
  };

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumb, faqSchema, serviceSchema]} />

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="pill-tag-soft mb-6">AI Consulting</span>
          <h1 className="mb-6 text-[40px] font-bold text-[var(--ink)]">Agentic workflows, AI strategy, and production guardrails</h1>
          <p className="mb-6 text-[18px] text-[var(--ink-secondary)]">
            We consult and build agentic workflows that automate repetitive work, reduce developer toil, and embed safe AI into your product and engineering processes.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-[18px] font-semibold">Why teams hire us</h2>
              <ul className="mt-3 list-inside list-disc text-[15px] text-[var(--ink-mute)] space-y-2">
                <li>Design and implement agentic workflows that reliably complete tasks.</li>
                <li>Set up AI development pipelines, testing, and CI for model-backed features.</li>
                <li>Create guardrails and safety controls for production AI.</li>
                <li>Transfer knowledge and tooling so your team owns day-to-day operation.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-[18px] font-semibold">Outcomes we drive</h2>
              <ul className="mt-3 list-inside list-disc text-[15px] text-[var(--ink-mute)] space-y-2">
                <li>Faster, safer AI rollouts with clear ownership.</li>
                <li>Reduced manual work and faster cycle times for product teams.</li>
                <li>Production-grade integrations with observability and alerts.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-[18px] font-semibold">Who this is for</h3>
              <p className="mt-3 text-[15px] text-[var(--ink-mute)]">Product teams and engineering leaders who want to embed AI safely into products and internal workflows.</p>
            </div>

            <div>
              <h3 className="text-[18px] font-semibold">Our process</h3>
              <ol className="mt-3 list-inside list-decimal text-[15px] text-[var(--ink-mute)] space-y-2">
                <li>Initial mapping workshop to identify agentic opportunities.</li>
                <li>Prototype agentic flows and safe integrations.</li>
                <li>Build pipelines, tests, and guardrails for production readiness.</li>
                <li>Handover, documentation, and operational runbooks.</li>
              </ol>
            </div>
          </div>

          <div className="mt-8 text-sm text-[var(--ink-mute)]">
            <p>
              Also see our <Link href="/services/productivity" className="text-[var(--primary)]">Developer Productivity</Link> and <Link href="/services/gdpr-quality" className="text-[var(--primary)]">Privacy & Quality</Link> services.
            </p>
          </div>

          <div className="mt-8">
            <ContactTrackedLink href="/contact" source="ai_consulting" className="button-primary-pill">
              Book a consultation
            </ContactTrackedLink>
          </div>
        </div>
      </section>
    </div>
  );
}
