import Link from "next/link";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import EmailTrackedLink from "@/components/EmailTrackedLink";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-[var(--ink-mute)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 text-[22px] font-medium tracking-[0.1px] text-[var(--ink)]">
              HOTFIX
            </div>
            <p className="max-w-md text-[13px] leading-relaxed text-[var(--ink-mute)]">
              HOTFIX d.o.o. is a full-stack and mobile development company specializing in
              C#, React, Golang, Kotlin, and Swift. We deliver robust, scalable solutions for
              modern businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-[13px] font-medium text-[var(--ink)]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-[13px] hover:text-[var(--primary)] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[13px] hover:text-[var(--primary)] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-[13px] hover:text-[var(--primary)] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <ContactTrackedLink
                  href="/contact"
                  source="footer"
                  className="text-[13px] hover:text-[var(--primary)] transition-colors"
                >
                  Contact
                </ContactTrackedLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-[13px] font-medium text-[var(--ink)]">Contact</h3>
            <ul className="space-y-2 text-[13px]">
              <li>
                <EmailTrackedLink
                  href="mailto:ops@hotfix-doo.com"
                  source="footer"
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  ops@hotfix-doo.com
                </EmailTrackedLink>
              </li>
              <li>Available Mon-Fri, 9AM-5PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-[var(--hairline)] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[13px]">
              © {currentYear} HOTFIX d.o.o. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-[13px] hover:text-[var(--primary)] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-[13px] hover:text-[var(--primary)] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
