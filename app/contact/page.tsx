import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import StructuredData from "@/components/StructuredData";
import EmailTrackedLink from "@/components/EmailTrackedLink";
import { contactFAQSchema, contactPageSchema, generateBreadcrumbSchema } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | HOTFIX d.o.o.",
  description:
    "Get in touch with HOTFIX d.o.o., an EU-based software development company in Croatia, for your full-stack and mobile development needs. Contact us at ops@hotfix-doo.com or use our contact form. We respond within 24 hours.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    url: `${SITE_URL}/contact`,
    type: "website",
    siteName: "HOTFIX d.o.o.",
    title: "Contact HOTFIX d.o.o. | EU-Based Software Development Company",
    description: "Get in touch with HOTFIX d.o.o. for your software development needs. We respond within 24 hours.",
  },
};

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema, contactFAQSchema, contactPageSchema]} />
      {/* Hero Section */}
      <section className="gradient-mesh relative overflow-hidden py-24" aria-labelledby="contact-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="pill-tag-soft mb-6">contact</span>
            <h1 id="contact-hero" className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-[var(--ink)] md:text-[56px] md:leading-[1.03] md:tracking-[-1.4px]">
              Start the build with a clear technical path.
            </h1>
            <p className="max-w-2xl text-[16px] leading-[1.4] text-[var(--ink-secondary)]">
              Have a project in mind? We&apos;d love to hear about it. Send us
              a message and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24" aria-labelledby="contact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Contact Information */}
            <div>
              <span className="section-eyebrow mb-4 block">project intake</span>
              <h2 id="contact-section" className="mb-6 text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--ink)]">
                Let&apos;s Work Together
              </h2>
              <p className="mb-8 text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                Whether you need a complete application built from scratch,
                want to enhance an existing system, or just have questions
                about our services, we&apos;re here to help.
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="tabular flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[15px] text-[var(--primary)]">
                      @
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="mb-1 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                      Email
                    </h3>
                    <EmailTrackedLink
                      href="mailto:ops@hotfix-doo.com"
                      source="contact_page"
                      className="text-[15px] text-[var(--primary)] transition-colors hover:text-[var(--primary-deep)]"
                      aria-label="Email HOTFIX d.o.o. at ops@hotfix-doo.com"
                    >
                      ops@hotfix-doo.com
                    </EmailTrackedLink>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="tabular flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[13px] text-[var(--primary)]">
                      9-5
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="mb-1 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                      Business Hours
                    </h3>
                    <p className="text-[15px] text-[var(--ink-mute)]">Monday - Friday</p>
                    <p className="text-[15px] text-[var(--ink-mute)]">9:00 AM - 5:00 PM CET</p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="tabular flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--canvas-soft)] text-[13px] text-[var(--primary)]">
                      24h
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="mb-1 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                      Response Time
                    </h3>
                    <p className="text-[15px] text-[var(--ink-mute)]">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Choose Us Box */}
              <div className="card-cream-band mt-12">
                <h3 className="mb-4 text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">
                  Why Choose HOTFIX?
                </h3>
                <ul className="space-y-3 text-[15px] leading-[1.4] text-[var(--ink-secondary)]">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                    <span>Expert full-stack & mobile development team</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                    <span>Modern technology stack (C#, React, Golang, Kotlin, Swift)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                    <span>Transparent communication & pricing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                    <span>Dedicated support & maintenance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card-feature-light">
              <h2 className="mb-6 text-[26px] font-bold leading-[1.12] tracking-[-0.26px] text-[var(--ink)]">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[var(--canvas-soft)] py-24" aria-labelledby="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-section" className="section-title mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="card-feature-light">
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                What types of projects do you work on?
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                We work on a wide range of projects including web applications,
                APIs, microservices, e-commerce platforms, and custom software
                solutions. Whether it&apos;s a startup MVP or enterprise
                system, we&apos;ve got you covered.
              </p>
            </div>

            <div className="card-feature-light">
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                How long does a typical project take?
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                Project timelines vary based on complexity and requirements.
                Small projects may take 2-4 weeks, while larger applications
                can take 3-6 months. We provide detailed timelines during the
                planning phase.
              </p>
            </div>

            <div className="card-feature-light">
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                Do you provide ongoing support?
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                Yes! We offer ongoing maintenance, support, and feature
                development for all our projects. We&apos;re committed to long-term
                partnerships with our clients.
              </p>
            </div>

            <div className="card-feature-light">
              <h3 className="mb-2 text-[18px] font-bold leading-[1.4] text-[var(--ink)]">
                What is your development process?
              </h3>
              <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                We follow an agile methodology with regular sprints, code
                reviews, and client communication. You&apos;ll have full visibility
                into the development process with regular updates and demos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
