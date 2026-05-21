"use client";

import { useTranslations } from "next-intl";
import EmailTrackedLink from "@/components/EmailTrackedLink";
import { Link as IntlLink } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: ROUTES.home, label: navT("home") },
    { href: ROUTES.about, label: navT("about") },
    { href: ROUTES.services, label: navT("services") },
    { href: ROUTES.blog, label: navT("blog") },
    { href: ROUTES.contact, label: navT("contact") },
  ];

  const serviceLinks = [
    { href: ROUTES.aiConsulting, label: t("servicesAi") },
    { href: ROUTES.services, label: t("servicesArchitecture") },
    { href: ROUTES.productivity, label: t("servicesProductivity") },
    { href: ROUTES.quality, label: t("servicesQuality") },
  ];

  return (
    <footer className="border-t border-[var(--hairline)] bg-white text-[var(--ink-mute)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand block */}
          <div className="md:col-span-4">
            <div className="mb-3 text-[22px] font-light tracking-[-0.01em] text-[var(--ink)]">
              HOTFIX <span className="text-[var(--ink-mute)]">d.o.o.</span>
            </div>
            <p className="mb-6 max-w-md text-[14px] leading-[1.55] text-[var(--ink-mute)]">
              {t("description")}
            </p>
            <div className="inline-flex items-center gap-2.5 text-[12px] text-[var(--ink-secondary)]">
              <span aria-hidden className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--primary)] opacity-50" />
                <span className="relative h-2 w-2 rounded-full bg-[var(--primary)]" />
              </span>
              {t("availability")}
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h3 className="mb-4 text-[10px] uppercase tracking-[0.1em] text-[var(--ink-mute-2)]">
              {t("servicesHeading")}
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <IntlLink
                    href={link.href}
                    className="text-[14px] text-[var(--ink-secondary)] transition-colors hover:text-[var(--primary)]"
                  >
                    {link.label}
                  </IntlLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-[10px] uppercase tracking-[0.1em] text-[var(--ink-mute-2)]">
              {t("navigation")}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <IntlLink
                    href={link.href}
                    className="text-[14px] text-[var(--ink-secondary)] transition-colors hover:text-[var(--primary)]"
                  >
                    {link.label}
                  </IntlLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="mb-4 text-[10px] uppercase tracking-[0.1em] text-[var(--ink-mute-2)]">
              {t("contact")}
            </h3>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <EmailTrackedLink
                  href="mailto:ops@hotfix-doo.com"
                  source="footer"
                  className="text-[var(--primary)] transition-colors hover:text-[var(--primary-deep)]"
                >
                  ops@hotfix-doo.com
                </EmailTrackedLink>
              </li>
              <li className="text-[var(--ink-secondary)]">{t("hours")}</li>
            </ul>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--hairline)] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="tabular text-[12px] tracking-[-0.01em] text-[var(--ink-mute)]">
            &copy; {currentYear} HOTFIX d.o.o.
            <span className="mx-2 text-[var(--hairline-input)]">·</span>
            {t("founded")}
            <span className="mx-2 text-[var(--hairline-input)]">·</span>
            {t("location")}
            <span className="mx-2 text-[var(--hairline-input)]">·</span>
            {t("rights")}
          </p>
          <div className="flex gap-6 text-[12px]">
            <IntlLink
              href={ROUTES.privacy}
              className="text-[var(--ink-mute)] transition-colors hover:text-[var(--ink)]"
            >
              {t("privacy")}
            </IntlLink>
            <IntlLink
              href={ROUTES.terms}
              className="text-[var(--ink-mute)] transition-colors hover:text-[var(--ink)]"
            >
              {t("terms")}
            </IntlLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
