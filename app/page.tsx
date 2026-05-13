import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { SITE_URL } from "@/lib/constants";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import { generateBreadcrumbSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "HOTFIX d.o.o. | Full-Stack & Mobile Development Company Croatia",
  description:
    "HOTFIX d.o.o., founded by Josip Budalić, is a professional EU-based full-stack and mobile development company in Croatia specializing in C#, React, Golang, Kotlin (KMM), and Swift. We deliver robust, scalable, cross-platform solutions for businesses worldwide.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
    type: "website",
    siteName: "HOTFIX d.o.o.",
  },
};

export default function Home() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
  ]);
  const features = [
    {
      title: "Full-Stack & Mobile Expertise",
      description:
        "Comprehensive development capabilities across web and mobile platforms. From frontend to backend to native mobile apps, we handle every aspect of your project.",
    },
    {
      title: "Modern Technologies",
      description:
        "Leveraging cutting-edge tools like C#, React, Golang, Kotlin, and Swift to build fast, scalable, and maintainable applications.",
    },
    {
      title: "Reliable Partnership",
      description:
        "We're committed to your success. From initial consultation to ongoing support, we're with you every step of the way.",
    },
  ];

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <Hero />

      {/* Why Choose Us Section */}
      <section className="bg-white py-14 md:py-24" aria-labelledby="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-14 max-w-3xl">
            <span className="section-eyebrow mb-4 block">delivery model</span>
            <h2 id="why-choose-us" className="section-title mb-5">
              Software delivery across the whole product surface.
            </h2>
            <p className="section-lede max-w-2xl">
              We combine technical expertise with a commitment to excellence,
              delivering solutions that drive real business results for businesses worldwide.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="card-feature-light h-full transition-transform duration-200 hover:-translate-y-1">
                  <span className="pill-tag-soft mb-6">0{index + 1}</span>
                  <h3 className="mb-3 text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">
                    {feature.title}
                  </h3>
                  <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="bg-[var(--canvas-soft)] py-24" aria-labelledby="our-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-14 max-w-3xl">
            <span className="section-eyebrow mb-4 block">services</span>
            <h2 id="our-services" className="section-title mb-5">
              Build the backend, frontend, and mobile layers as one system.
            </h2>
            <p className="section-lede max-w-2xl">
              Comprehensive development solutions tailored to your needs
            </p>
          </AnimatedSection>

          <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              {
                title: "Backend Development",
                description:
                  "Robust server-side solutions with C# .NET and Golang for high-performance applications.",
                features: [
                  "RESTful APIs & GraphQL",
                  "Microservices Architecture",
                  "Database Design & Optimization",
                ],
              },
              {
                title: "Frontend & Mobile",
                description:
                  "Modern web and native mobile apps built with React, Kotlin (including KMM for cross-platform), and Swift for exceptional user experiences.",
                features: [
                  "React & Next.js Web Apps",
                  "Native Android (Kotlin)",
                  "Cross-Platform (KMM)",
                  "Native iOS (Swift)",
                ],
              },
              {
                title: "Full-Stack Solutions",
                description:
                  "End-to-end development from concept to deployment, handling every layer of your application.",
                features: [
                  "Complete Application Development",
                  "DevOps & Deployment",
                  "Ongoing Support & Maintenance",
                ],
              },
            ].map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="card-pricing flex h-full flex-col">
                  <h3 className="mb-4 text-[26px] font-bold leading-[1.12] tracking-[-0.26px] text-[var(--ink)]">
                    {service.title}
                  </h3>
                  <p className="mb-6 text-[15px] leading-[1.4] text-[var(--ink-mute)]">{service.description}</p>
                  <ul className="mt-auto space-y-3 text-[13px] leading-[1.4] text-[var(--ink-secondary)]">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary)]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center">
            <Link
              href="/services"
              className="button-primary-pill focus-ring"
              aria-label="View all HOTFIX d.o.o. development services including full-stack, mobile, and backend solutions"
            >
              Explore All Services
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24" aria-labelledby="cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="card-cream-band grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="section-eyebrow mb-4 block">next step</span>
              <h2 id="cta-heading" className="section-title mb-5">
                Ready to build the next release?
              </h2>
              <p className="section-lede max-w-2xl">
                Let&apos;s discuss your project and turn your vision into reality with expert full-stack and mobile development.
              </p>
            </div>
            <ContactTrackedLink
              href="/contact"
              source="home_cta"
              className="button-primary-pill focus-ring w-full sm:w-auto"
              aria-label="Contact HOTFIX d.o.o. to start your software development project"
            >
              Start Your Project
            </ContactTrackedLink>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
