import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import StructuredData from "@/components/StructuredData";
import { contactFAQSchema, contactPageSchema, generateBreadcrumbSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Contact Us | HOTFIX d.o.o.",
  description:
    "Get in touch with HOTFIX d.o.o., an EU-based software development company in Croatia, for your full-stack and mobile development needs. Contact us at ops@hotfix-doo.com or use our contact form. We respond within 24 hours.",
  alternates: {
    canonical: "https://hotfix-doo.com/contact",
  },
  openGraph: {
    url: "https://hotfix-doo.com/contact",
    type: "website",
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
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white" aria-labelledby="contact-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 id="contact-hero" className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have a project in mind? We'd love to hear about it. Send us a
              message and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20" aria-labelledby="contact-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 id="contact-section" className="text-3xl font-bold text-gray-900 mb-8">
                Let's Work Together
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Whether you need a complete application built from scratch,
                want to enhance an existing system, or just have questions
                about our services, we're here to help.
              </p>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] rounded-lg flex items-center justify-center text-white text-xl">
                      ✉
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:ops@hotfix-doo.com"
                      className="text-[var(--primary-red)] hover:text-[var(--primary-orange)] transition-colors"
                      aria-label="Email HOTFIX d.o.o. at ops@hotfix-doo.com"
                    >
                      ops@hotfix-doo.com
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] rounded-lg flex items-center justify-center text-white text-xl">
                      🕒
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">Monday - Friday</p>
                    <p className="text-gray-600">9:00 AM - 5:00 PM CET</p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] rounded-lg flex items-center justify-center text-white text-xl">
                      ⚡
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Response Time
                    </h3>
                    <p className="text-gray-600">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Choose Us Box */}
              <div className="mt-12 p-8 bg-gray-50 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Why Choose HOTFIX?
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-2">✓</span>
                    <span>Expert full-stack & mobile development team</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-2">✓</span>
                    <span>Modern technology stack (C#, React, Golang, Kotlin, Swift)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-2">✓</span>
                    <span>Transparent communication & pricing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary-red)] mr-2">✓</span>
                    <span>Dedicated support & maintenance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50" aria-labelledby="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-section" className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                What types of projects do you work on?
              </h3>
              <p className="text-gray-600">
                We work on a wide range of projects including web applications,
                APIs, microservices, e-commerce platforms, and custom software
                solutions. Whether it's a startup MVP or enterprise system,
                we've got you covered.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                How long does a typical project take?
              </h3>
              <p className="text-gray-600">
                Project timelines vary based on complexity and requirements.
                Small projects may take 2-4 weeks, while larger applications
                can take 3-6 months. We provide detailed timelines during the
                planning phase.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Do you provide ongoing support?
              </h3>
              <p className="text-gray-600">
                Yes! We offer ongoing maintenance, support, and feature
                development for all our projects. We're committed to long-term
                partnerships with our clients.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                What is your development process?
              </h3>
              <p className="text-gray-600">
                We follow an agile methodology with regular sprints, code
                reviews, and client communication. You'll have full visibility
                into the development process with regular updates and demos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

