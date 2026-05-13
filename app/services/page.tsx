import type { Metadata } from "next";
import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services | HOTFIX d.o.o.",
  description:
    "Explore our comprehensive full-stack and mobile development services including C# .NET backend development, React frontend development, Golang microservices, and native mobile apps with Kotlin (Android) and Swift (iOS). Consulting-led engineering and agentic workflow expertise for reliable product delivery.",
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    url: `${SITE_URL}/services`,
    type: "website",
    siteName: "HOTFIX d.o.o.",
    title: "Development Services | HOTFIX d.o.o.",
    description: "Full-stack and mobile development services: C# .NET, React, Golang, Kotlin, Swift. Consulting and engineering focused on robust, production-ready products.",
  },
  keywords: [
    "C# .NET development services",
    "React development services",
    "Golang development services",
    "Kotlin Android development",
    "Kotlin Multiplatform Mobile",
    "KMM development",
    "Swift iOS development",
    "full-stack development services",
    "mobile app development services",
    "cross-platform mobile development",
    "backend development services",
    "frontend development services",
    "microservices development",
    "API development services",
    "software development",
  ],
};

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]);

  const services = [
    {
      title: "Backend Development",
      description:
        "Robust, scalable server-side solutions built with industry-leading technologies.",
      icon: "🔧",
      features: [
        "RESTful API Design & Development",
        "GraphQL API Implementation",
        "Microservices Architecture",
        "Database Design & Optimization (SQL, NoSQL)",
        "Authentication & Authorization",
        "Real-time Communication (WebSockets, SignalR)",
        "Performance Optimization & Caching",
        "Third-party API Integration",
      ],
    },
    {
      title: "Frontend Development",
      description:
        "Beautiful, responsive web interfaces that deliver exceptional user experiences.",
      icon: "🎨",
      features: [
        "React & Next.js Applications",
        "Single Page Applications (SPA)",
        "Progressive Web Apps (PWA)",
        "Responsive & Mobile-First Design",
        "State Management (Redux, Zustand)",
        "Component Libraries & Design Systems",
        "Performance Optimization",
        "Cross-browser Compatibility",
      ],
    },
    {
      title: "Mobile Development",
      description:
        "Native mobile applications for Android and iOS with modern development practices, including cross-platform solutions with Kotlin Multiplatform.",
      icon: "📱",
      features: [
        "Native Android Apps (Kotlin)",
        "Native iOS Apps (Swift)",
        "Cross-Platform with KMM",
        "Modern UI/UX Design",
        "Offline-First Architecture",
        "Push Notifications & Deep Linking",
        "App Store & Play Store Deployment",
        "Mobile-Specific Performance Optimization",
        "Integration with Backend APIs",
      ],
    },
    {
      title: "Full-Stack Solutions",
      description:
        "End-to-end development from concept to deployment and beyond.",
      icon: "⚡",
      features: [
        "Complete Application Architecture",
        "Frontend, Backend & Mobile Integration",
        "DevOps & CI/CD Pipeline Setup",
        "Cloud Deployment (AWS, Azure, Vercel)",
        "Monitoring & Logging Solutions",
        "Security Best Practices",
        "Code Review & Quality Assurance",
        "Ongoing Support & Maintenance",
      ],
    },
  ];

  const technologies = [
    {
      category: "Backend",
      techs: [
        "C# / .NET Core",
        "ASP.NET",
        "Entity Framework",
        "Golang",
        "Node.js",
        "PostgreSQL",
        "MongoDB",
        "Redis",
      ],
    },
    {
      category: "Frontend & Web",
      techs: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Redux",
        "React Query",
        "Framer Motion",
        "Webpack / Vite",
      ],
    },
    {
      category: "Mobile",
      techs: [
        "Kotlin",
        "KMM (Kotlin Multiplatform)",
        "Swift",
        "Android SDK",
        "iOS SDK",
        "Jetpack Compose",
        "SwiftUI",
        "Firebase",
        "SQLite",
      ],
    },
    {
      category: "DevOps & Tools",
      techs: [
        "Docker",
        "Kubernetes",
        "GitHub Actions",
        "Azure DevOps",
        "Nginx",
        "Git",
        "VS Code",
        "Xcode",
      ],
    },
  ];

  // Generate service schemas
  const serviceSchemas = services.map(service => 
    generateServiceSchema(service.title, service.description)
  );

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema, ...serviceSchemas]} />
      {/* Hero Section */}
      <section className="gradient-mesh relative overflow-hidden py-24" aria-labelledby="services-hero">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:items-end">
          <div>
            <span className="pill-tag-soft mb-6">services</span>
            <h1 id="services-hero" className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-[var(--ink)] md:text-[56px] md:leading-[1.03] md:tracking-[-1.4px]">
              Product engineering from API to App Store.
            </h1>
            <p className="max-w-2xl text-[16px] leading-[1.4] text-[var(--ink-secondary)]">
              Comprehensive full-stack and mobile development solutions tailored to your
              business needs. From backend systems to web frontends to native mobile apps, we&apos;ve
              got you covered.
            </p>
          </div>
          <div className="card-dashboard-mockup bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="section-eyebrow">capability map</span>
              <span className="tabular text-[13px] text-[var(--primary-deep)]">4 tracks</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service, index) => (
                <div key={service.title} className="rounded-[var(--radius-md)] border border-[var(--hairline)] bg-[var(--canvas-soft)] p-4">
                  <span className="tabular mb-3 block text-[13px] text-[var(--primary-deep)]">0{index + 1}</span>
                  <h2 className="text-[18px] font-bold leading-[1.4] text-[var(--ink)]">{service.title}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick links to consulting pages */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="section-title">Consulting & AI Services</h2>
            <p className="section-lede">Practical consulting and hands-on delivery for AI workflows, privacy, and developer productivity.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Link href="/services/ai-consulting" className="rounded-lg border border-[var(--hairline)] bg-white p-6 hover:shadow">
              <h3 className="mb-2 text-[18px] font-semibold">AI Consulting</h3>
              <p className="text-[14px] text-[var(--ink-mute)]">Agentic workflows, guardrails, and AI development pipelines.</p>
            </Link>

            <Link href="/services/gdpr-quality" className="rounded-lg border border-[var(--hairline)] bg-white p-6 hover:shadow">
              <h3 className="mb-2 text-[18px] font-semibold">Privacy & Quality</h3>
              <p className="text-[14px] text-[var(--ink-mute)]">Privacy-first delivery, compliance-ready documentation, and QA.</p>
            </Link>

            <Link href="/services/productivity" className="rounded-lg border border-[var(--hairline)] bg-white p-6 hover:shadow">
              <h3 className="mb-2 text-[18px] font-semibold">Developer Productivity</h3>
              <p className="text-[14px] text-[var(--ink-mute)]">CI/CD, tooling, and automation to increase engineering velocity.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="bg-[var(--canvas-soft)] py-24" aria-labelledby="technology-stack">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="section-eyebrow mb-4 block">technology</span>
            <h2 id="technology-stack" className="section-title mb-5">
              Technology Stack
            </h2>
            <p className="section-lede max-w-2xl">
              We work with modern, proven technologies to build robust and
              scalable solutions
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {technologies.map((category, index) => (
              <div
                key={index}
                className="card-feature-light"
              >
                <h3 className="mb-6 text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.techs.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="pill-tag-soft normal-case"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-24" aria-labelledby="development-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-3xl">
            <span className="section-eyebrow mb-4 block">process</span>
            <h2 id="development-process" className="section-title mb-5">
              Our Development Process
            </h2>
            <p className="section-lede max-w-2xl">
              A proven methodology that ensures quality, transparency, and
              on-time delivery
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                step: "01",
                title: "Discovery & Planning",
                description:
                  "We start by understanding your business goals, target audience, and technical requirements. This phase includes requirement gathering, feasibility analysis, and project roadmap creation.",
              },
              {
                step: "02",
                title: "Design & Architecture",
                description:
                  "Our team creates detailed technical specifications, database schemas, API designs, and UI/UX mockups. We ensure scalability and maintainability from the ground up.",
              },
              {
                step: "03",
                title: "Development & Testing",
                description:
                  "Agile development with regular sprints, code reviews, and automated testing. You'll see progress every step of the way with continuous integration and deployment.",
              },
              {
                step: "04",
                title: "Deployment & Support",
                description:
                  "Smooth deployment to production environments with monitoring, documentation, and training. We provide ongoing support, maintenance, and feature enhancements.",
              },
            ].map((phase, index) => (
              <div
                key={index}
                className="grid gap-6 rounded-[var(--radius-lg)] border border-[var(--hairline)] bg-white p-8 md:grid-cols-[80px_1fr]"
              >
                <div className="tabular text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[var(--primary)]">
                  {phase.step}
                </div>
                <div>
                  <h3 className="mb-3 text-[22px] font-bold leading-[1.1] tracking-[-0.22px] text-[var(--ink)]">
                    {phase.title}
                  </h3>
                  <p className="text-[15px] leading-[1.4] text-[var(--ink-mute)]">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--brand-dark-900)] py-24" aria-labelledby="services-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="services-cta" className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-white">
            Ready to Start Your Project?
          </h2>
          <p className="mb-10 text-[16px] leading-[1.4] text-white/80">
            Let&apos;s discuss how we can help bring your vision to life with our
            full-stack and mobile development expertise.
          </p>
          <ContactTrackedLink
            href="/contact"
            source="services_page"
            className="button-secondary-pill focus-ring"
            aria-label="Contact HOTFIX d.o.o. to discuss your software development project"
          >
            Get Started Today
          </ContactTrackedLink>
        </div>
      </section>
    </div>
  );
}
