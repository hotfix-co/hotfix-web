"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useState } from "react";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import LanguagePicker from "@/components/LanguagePicker";
import { ROUTES } from "@/lib/constants";

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t("home"), href: ROUTES.home },
    { name: t("about"), href: ROUTES.about },
    { name: t("services"), href: ROUTES.services },
    { name: t("blog"), href: ROUTES.blog },
    { name: t("contact"), href: ROUTES.contact },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[var(--hairline)] bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <ContactTrackedLink
            href={ROUTES.home}
            source="navbar_logo"
            className="flex items-center space-x-3 focus-ring rounded"
          >
            <Image
              src="/logo.png"
              alt="HOTFIX d.o.o. logo"
              width={128}
              height={128}
              priority
              className="h-10 w-10 object-contain sm:h-11 sm:w-11 lg:h-12 lg:w-12"
            />
            <span className="whitespace-nowrap text-[17px] font-medium tracking-[-0.005em] text-[var(--ink)] sm:text-[18px]">
              HOTFIX d.o.o.
            </span>
          </ContactTrackedLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-x-7">
            {navigation.map((item) => (
              <ContactTrackedLink
                key={item.name}
                href={item.href}
                source="navbar"
                className={`focus-ring rounded text-[14px] font-medium transition-colors ${
                  pathname === item.href
                    ? "text-[var(--primary)]"
                    : "text-[var(--ink-mute-2)] hover:text-[var(--ink)]"
                }`}
              >
                {item.name}
              </ContactTrackedLink>
            ))}
            <LanguagePicker />
            <ContactTrackedLink
              href={ROUTES.contact}
              source="navbar"
              className="button-primary-pill focus-ring whitespace-nowrap"
            >
              {t("cta")}
            </ContactTrackedLink>
          </div>

          {/* Mobile menu button + language picker */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguagePicker />
            <button
              type="button"
              className="focus-ring min-h-11 min-w-11 rounded-full text-[var(--ink-mute-2)] hover:bg-[var(--canvas-soft)] hover:text-[var(--ink)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">
                {mobileMenuOpen ? t("closeMenu") : t("openMenu")}
              </span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--hairline)] bg-white">
          <div className="px-3 pt-3 pb-4 space-y-1">
            {navigation.map((item) => (
              <ContactTrackedLink
                key={item.name}
                href={item.href}
                source="navbar_mobile"
                className={`block rounded-md px-3 py-3 text-base font-medium ${
                  pathname === item.href
                    ? "bg-[var(--canvas-soft)] text-[var(--primary)]"
                    : "text-[var(--ink-mute-2)] hover:bg-[var(--canvas-soft)] hover:text-[var(--ink)]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </ContactTrackedLink>
            ))}
            <ContactTrackedLink
              href={ROUTES.contact}
              source="navbar_mobile"
              className="button-primary-pill mt-3 w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("cta")}
            </ContactTrackedLink>
          </div>
        </div>
      )}
    </nav>
  );
}
