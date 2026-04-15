import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | HOTFIX d.o.o.",
  description: "Privacy policy for HOTFIX d.o.o. website and services. Learn how we collect, use, and protect your personal information when you contact us or use our software development services.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy" },
  ]);

  return (
    <div className="bg-white py-20">
      <StructuredData data={breadcrumbSchema} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: January 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 mb-4">
              HOTFIX d.o.o. (&quot;we&quot;, &quot;our&quot;, or
              &quot;us&quot;) is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, and share
              information about you when you use our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 mb-4">
              When you contact us through our website, we collect:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Your name</li>
              <li>Email address</li>
              <li>Company name (optional)</li>
              <li>Message content</li>
            </ul>
            <p className="text-gray-600 mb-4">
              We also collect high-level website usage data through Google
              Analytics 4, including page views, blog post visits, contact CTA
              clicks, email link clicks, browser and device details, and
              approximate location derived from your IP address.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-4">We use the information to:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Respond to your inquiries</li>
              <li>Provide information about our services</li>
              <li>Improve our website and services</li>
              <li>Measure blog traffic and website conversions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Analytics
            </h2>
            <p className="text-gray-600 mb-4">
              We use Google Analytics 4 to understand which pages and blog posts
              are being viewed and how visitors reach out to us.
            </p>
            <p className="text-gray-600 mb-4">
              Google Analytics helps us measure overall website performance,
              understand which blog content is read most, and evaluate which
              contact paths are most effective.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Data Security
            </h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please
              contact us at ops@hotfix-doo.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
