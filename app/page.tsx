import type { Metadata } from "next";
import Hero from "@/components/Hero";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "HOTFIX d.o.o. | Full-Stack & Mobile Development Company Croatia",
  description:
    "HOTFIX d.o.o., founded by Josip Budalic, is a professional Croatian full-stack and mobile development company specializing in C#, React, Golang, Kotlin (KMM), and Swift. We deliver robust, scalable, cross-platform solutions for modern businesses worldwide.",
  alternates: {
    canonical: "https://hotfix-doo.com",
  },
  openGraph: {
    url: "https://hotfix-doo.com",
    type: "website",
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
      <section className="py-20 bg-white" aria-labelledby="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 id="why-choose-us" className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-gradient">HOTFIX</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine technical expertise with a commitment to excellence,
              delivering solutions that drive real business results for businesses worldwide.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all hover:shadow-lg hover:scale-105 transform duration-300 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] rounded-lg mb-6" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-gray-50" aria-labelledby="our-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 id="our-services" className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive development solutions tailored to your needs
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all hover:scale-105 transform duration-300 h-full">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {service.features.map((feature, i) => (
                      <li key={i}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center">
            <Link
              href="/services"
              className="inline-block px-8 py-4 rounded-lg gradient-primary text-white font-semibold text-lg hover:opacity-90 hover:scale-105 transform transition-all shadow-lg"
              aria-label="View all HOTFIX d.o.o. development services including full-stack, mobile, and backend solutions"
            >
              Explore All Services
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 id="cta-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Let's discuss your project and turn your vision into reality with expert full-stack and mobile development.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 rounded-lg gradient-primary text-white font-semibold text-lg hover:opacity-90 hover:scale-105 transform transition-all shadow-lg hover:shadow-xl"
              aria-label="Contact HOTFIX d.o.o. to start your software development project"
            >
              Start Your Project
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
