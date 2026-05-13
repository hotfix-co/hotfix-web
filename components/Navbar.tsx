"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ContactTrackedLink from "@/components/ContactTrackedLink";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[var(--hairline)] bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 focus-ring rounded">
            <Image
              src="/logo.png"
              alt="Hotfix logo"
              width={64}
              height={64}
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 object-contain"
            />
            <span className="text-[18px] font-medium tracking-[0.1px] text-[var(--ink)]">
              HOTFIX d.o.o.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`focus-ring rounded text-[15px] font-medium transition-colors ${
                  pathname === item.href
                    ? "text-[var(--primary)]"
                    : "text-[var(--ink-mute-2)] hover:text-[var(--ink)]"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <ContactTrackedLink
              href="/contact"
              source="navbar"
              className="button-primary-pill focus-ring"
            >
              Get Started
            </ContactTrackedLink>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="focus-ring md:hidden min-h-11 min-w-11 rounded-full text-[var(--ink-mute-2)] hover:bg-[var(--canvas-soft)] hover:text-[var(--ink)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--hairline)] bg-white">
          <div className="px-3 pt-3 pb-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-md px-3 py-3 text-base font-medium ${
                  pathname === item.href
                    ? "bg-[var(--canvas-soft)] text-[var(--primary)]"
                    : "text-[var(--ink-mute-2)] hover:bg-[var(--canvas-soft)] hover:text-[var(--ink)]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <ContactTrackedLink
              href="/contact"
              source="navbar_mobile"
              className="button-primary-pill mt-3 w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </ContactTrackedLink>
          </div>
        </div>
      )}
    </nav>
  );
}
