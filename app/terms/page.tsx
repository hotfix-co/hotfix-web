import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | HOTFIX d.o.o.",
  description: "Terms of service for HOTFIX d.o.o. website and services.",
};

export default function TermsPage() {
  return (
    <div className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-gray-600 mb-4">
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Use of Website
            </h2>
            <p className="text-gray-600 mb-4">
              This website is provided for informational purposes about HOTFIX
              d.o.o. and our development services. You may not use this website
              for any illegal or unauthorized purpose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Intellectual Property
            </h2>
            <p className="text-gray-600 mb-4">
              The content, design, logos, and other materials on this website
              are protected by copyright and other intellectual property rights
              owned by HOTFIX d.o.o.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-600 mb-4">
              HOTFIX d.o.o. shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use of or inability to use the website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these terms at any time. Changes
              will be effective immediately upon posting to the website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600">
              For questions about these Terms of Service, please contact us at
              ops@hotfix-doo.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

