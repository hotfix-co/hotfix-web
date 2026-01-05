import type { Metadata } from "next";
import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Services | HOTFIX d.o.o.",
  description:
    "Explore our comprehensive full-stack and mobile development services including C# .NET backend development, React frontend development, Golang microservices, and native mobile apps with Kotlin (Android) and Swift (iOS). Professional software development services from Croatia.",
  alternates: {
    canonical: "https://hotfix-doo.com/services",
  },
  openGraph: {
    url: "https://hotfix-doo.com/services",
    type: "website",
    title: "Development Services | HOTFIX d.o.o.",
    description: "Full-stack and mobile development services: C# .NET, React, Golang, Kotlin, Swift. Professional software development from Croatia.",
  },
  keywords: [
    "C# .NET development services",
    "React development services",
    "Golang development services",
    "Kotlin Android development",
    "Swift iOS development",
    "full-stack development services",
    "mobile app development services",
    "backend development services",
    "frontend development services",
    "microservices development",
    "API development services",
    "software development Croatia",
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
        "Native mobile applications for Android and iOS with modern development practices.",
      icon: "📱",
      features: [
        "Native Android Apps (Kotlin)",
        "Native iOS Apps (Swift)",
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
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white" aria-labelledby="services-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 id="services-hero" className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive full-stack and mobile development solutions tailored to your
              business needs. From backend systems to web frontends to native mobile apps, we've
              got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      <section className="py-20 bg-gray-50" aria-labelledby="technology-stack">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="technology-stack" className="text-4xl font-bold text-gray-900 mb-4">
              Technology Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with modern, proven technologies to build robust and
              scalable solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((category, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.techs.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gradient-to-r hover:from-[var(--primary-red)] hover:to-[var(--primary-orange)] hover:text-white transition-all"
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
      <section className="py-20" aria-labelledby="development-process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="development-process" className="text-4xl font-bold text-gray-900 mb-4">
              Our Development Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures quality, transparency, and
              on-time delivery
            </p>
          </div>

          <div className="space-y-8">
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
                className="flex flex-col md:flex-row items-start gap-6 bg-gray-50 p-8 rounded-2xl"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] text-white font-bold text-2xl flex items-center justify-center">
                    {phase.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {phase.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)]" aria-labelledby="services-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="services-cta" className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Let's discuss how we can help bring your vision to life with our
            full-stack and mobile development expertise.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 rounded-lg bg-white text-[var(--primary-red)] font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            aria-label="Contact HOTFIX d.o.o. to discuss your software development project"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}

