"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import { ROUTES } from "@/lib/constants";

export default function Hero() {
  const t = useTranslations("hero");

  const deliveryRows = [
    { label: t("apiLabel"), value: "99.98%", tone: "bg-[var(--primary-soft)]" },
    { label: t("mobileLabel"), value: "1.4s", tone: "bg-[var(--primary-deep)]" },
    { label: t("webLabel"), value: "A", tone: "bg-[var(--primary)]" },
  ];

  const techTags = [t("techAI"), t("techSoftware"), t("techClaude")];

  return (
    <section className="relative isolate overflow-hidden bg-white lg:min-h-[720px]" aria-labelledby="home-hero">
      <div className="gradient-mesh absolute inset-x-0 top-0 -z-10 h-[62%]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="pill-tag-soft mb-7">{t("tagline")}</span>
          <h1
            id="home-hero"
            className="mb-7 text-[36px] font-light leading-[1.08] tracking-[-0.022em] text-[var(--ink)] text-balance sm:text-[44px] sm:leading-[1.05] lg:text-[50px] lg:leading-[1.05]"
          >
            {t("subtitle")}
          </h1>
          <p className="mb-10 max-w-xl text-[17px] leading-[1.5] text-[var(--ink-mute)] sm:text-[18px]">
            {t("description")}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={ROUTES.services}
              className="button-primary-pill focus-ring"
            >
              {t("ctaServices")}
            </Link>
            <ContactTrackedLink
              href={ROUTES.contact}
              source="hero"
              className="button-secondary-pill focus-ring"
            >
              {t("ctaContact")}
            </ContactTrackedLink>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
            {techTags.map((tech, i) => (
              <span key={tech} className="flex items-center gap-x-5">
                <span className="text-[13px] tracking-[-0.01em] text-[var(--ink-secondary)]">{tech}</span>
                {i < techTags.length - 1 && <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--hairline-input)]" />}
              </span>
            ))}
          </div>

          <div className="card-dashboard-mockup mt-8 grid grid-cols-3 gap-2.5 p-3 md:hidden">
            {deliveryRows.map((row) => (
              <div key={row.label} className="rounded-[var(--radius-md)] border border-[var(--hairline)] bg-white px-2.5 py-3">
                <div className={`mb-2.5 h-1.5 w-7 rounded-full ${row.tone}`} />
                <p className="text-[10px] leading-[1.3] text-[var(--ink-mute)]">{row.label}</p>
                <p className="tabular mt-1 text-[16px] leading-[1.1] tracking-[-0.2px] text-[var(--ink)]">{row.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="card-dashboard-mockup relative mx-auto hidden w-full max-w-[720px] overflow-hidden p-4 sm:p-6 md:block"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="mb-4 flex items-center justify-between border-b border-[var(--hairline)] pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary-deep)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--lemon)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary-soft)]" />
            </div>
            <span className="section-eyebrow">{t("consoleTitle")}</span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
            <div
              className="rounded-[var(--radius-lg)] p-5 text-[13px] leading-relaxed text-white"
              style={{ backgroundColor: "var(--ink)" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-white/70">{t("deployLabel")}</span>
                <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.1px] text-white/80">
                  live
                </span>
              </div>
              <pre className="overflow-hidden font-mono text-[12px] leading-6 text-white/85">
{`const release = await ship({
  web: "Next.js",
  api: ".NET + Go",
  mobile: "KMM + Swift",
  checks: ["typed", "tested", "observed"]
});`}
              </pre>
            </div>

            <div className="space-y-4">
              <div className="rounded-[var(--radius-md)] border border-[var(--hairline)] bg-[var(--canvas-soft)] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[13px] font-medium text-[var(--ink)]">{t("readiness")}</span>
                  <span className="tabular text-[13px] text-[var(--primary-deep)]">94%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white">
                  <div className="h-full max-w-full rounded-full bg-[var(--primary)]" style={{ width: "94%" }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {deliveryRows.map((row) => (
                  <div key={row.label} className="min-w-0 rounded-[var(--radius-md)] border border-[var(--hairline)] bg-white px-2 py-3">
                    <div className={`mb-3 h-1.5 w-7 rounded-full ${row.tone}`} />
                    <p className="min-h-[29px] text-[10px] leading-[1.35] text-[var(--ink-mute)]">{row.label}</p>
                    <p className="tabular mt-1 whitespace-nowrap text-[15px] leading-[1.1] tracking-[-0.2px] text-[var(--ink)]">{row.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[var(--radius-md)] border border-[var(--hairline)] bg-white p-4">
                <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] gap-3 text-[11px] text-[var(--ink-mute)]">
                  <span>{t("area")}</span>
                  <span>{t("status")}</span>
                  <span className="text-right">{t("deadline")}</span>
                </div>
                {[
                  ["Backend API", t("stable"), "2 d"],
                  ["React UI", t("review"), "1 d"],
                  ["Mobile build", t("beta"), "4 d"],
                ].map(([name, status, eta]) => (
                  <div key={name} className="grid grid-cols-[1.2fr_0.8fr_0.8fr] gap-3 border-t border-[var(--hairline)] py-3 text-[13px]">
                    <span className="text-[var(--ink)]">{name}</span>
                    <span className="text-[var(--primary-deep)]">{status}</span>
                    <span className="tabular text-right text-[var(--ink-mute)]">{eta}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
