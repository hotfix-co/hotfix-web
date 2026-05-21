"use client";

import { useTranslations } from "next-intl";
import EmailTrackedLink from "@/components/EmailTrackedLink";
import { Link as IntlLink } from "@/i18n/navigation";
import { ROUTES } from "@/lib/constants";

export default function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-[var(--ink-mute)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 text-[22px] font-medium tracking-[0.1px] text-[var(--ink)]">
              HOTFIX d.o.o.
            </div>
            <p className="max-w-md text-[13px] leading-relaxed text-[var(--ink-mute)]">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-[13px] font-medium text-[var(--ink)]">{t("navigation")}</h3>
            <ul className="space-y-2">
              <li>
                <IntlLink
                  href={ROUTES.home}
                  className="text-[13px] hover:text-[var(--primary)] transition-colors"
                >
                  {navT("home")}
                </IntlLink>
              </li>
              <li>
                <IntlLink
                  href={ROUTES.about}
                  className="text-[13px] hover:text-[var(--primary)] transition-colors"
                >
                  {navT("about")}
                </IntlLink>
              </li>
              <li>
                <IntlLink
                  href={ROUTES.services}
                  className="text-[13px] hover:text-[var(--primary)] transition-colors"
                >
                  {navT("services")}
                </IntlLink>
              </li>
              <li>
                <IntlLink
                  href={ROUTES.blog}
                  className="text-[13px] hover:text-[var(--primary)] transition-colors"
                >
                  {navT("blog")}
                </IntlLink>
              </li>
              <li>
                <IntlLink
                  href={ROUTES.contact}
                  className="text-[13px] hover:text-[var(--primary)] transition-colors"
                >
                  {navT("contact")}
                </IntlLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-[13px] font-medium text-[var(--ink)]">{t("contact")}</h3>
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
              <li>{t("hours")}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-[var(--hairline)] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[13px]">
              &copy; {currentYear} HOTFIX d.o.o. {t("rights")}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <IntlLink
                href={ROUTES.privacy}
                className="text-[13px] hover:text-[var(--primary)] transition-colors"
              >
                {t("privacy")}
              </IntlLink>
              <IntlLink
                href={ROUTES.terms}
                className="text-[13px] hover:text-[var(--primary)] transition-colors"
              >
                {t("terms")}
              </IntlLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
