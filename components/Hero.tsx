"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import { ROUTES } from "@/lib/constants";

export default function Hero() {
  const t = useTranslations("hero");

  const techTags = [t("techAI"), t("techSoftware"), t("techClaude")];

  return (
    <section
      className="relative isolate -mt-16 flex min-h-[92svh] flex-col justify-end overflow-hidden lg:min-h-[100svh]"
      aria-labelledby="home-hero"
    >
      {/* Gradient stand-in for cinematic hero photography — see globals.css */}
      <div className="hero-golden grain-overlay absolute inset-0 -z-10" />
      <div className="hero-golden-foot absolute inset-x-0 bottom-0 -z-10 h-[40%]" />

      <div className="mx-auto grid w-full max-w-7xl items-end gap-10 px-4 pb-16 pt-40 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:px-8 lg:pb-20">
        <h1 id="home-hero" className="hero-display fade-in-up max-w-2xl">
          {t("headline")}
        </h1>

        <div className="fade-in-up fade-in-up-delay-1 max-w-sm">
          <p className="text-[15px] leading-[1.55] text-white/90">
            {t("blurb")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ContactTrackedLink
              href={ROUTES.contact}
              source="hero"
              className="button-hero-light focus-ring"
            >
              {t("ctaContact")}
            </ContactTrackedLink>
            <Link href={ROUTES.services} className="button-hero-ghost focus-ring">
              {t("ctaServices")}
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            {techTags.map((tech, i) => (
              <span key={tech} className="flex items-center gap-x-4">
                <span className="text-[12px] tracking-[0.02em] text-white/70">{tech}</span>
                {i < techTags.length - 1 && (
                  <span aria-hidden className="h-1 w-1 rounded-full bg-white/40" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
