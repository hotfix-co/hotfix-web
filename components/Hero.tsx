"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ContactTrackedLink from "@/components/ContactTrackedLink";

export default function Hero() {
  const deliveryRows = [
    { label: "API gateway", value: "99.98%", tone: "bg-[var(--primary-soft)]" },
    { label: "Mobile release", value: "1.4s", tone: "bg-[var(--primary-deep)]" },
    { label: "Web vitals", value: "A", tone: "bg-[var(--primary)]" },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-white lg:min-h-[760px]" aria-labelledby="home-hero">
      <div className="gradient-mesh absolute inset-x-0 top-0 -z-10 h-[58%]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-20">
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="pill-tag-soft mb-6">Agentic workflows • Consulting & Engineering</span>
          <h1
            id="home-hero"
            className="mb-6 text-[56px] font-bold leading-[1.03] tracking-[-1.4px] text-[var(--ink)] max-sm:text-[40px]"
          >
            HOTFIX d.o.o.
          </h1>
          <p className="mb-8 max-w-xl text-[22px] font-light leading-[1.22] tracking-[-0.22px] text-[var(--ink-secondary)] sm:text-[26px] sm:leading-[1.12]">
            Led by agentic developers and systems architects, we consult and build agentic workflows that safely automate processes and increase product velocity.
          </p>
          <p className="mb-10 max-w-xl text-[16px] leading-[1.4] text-[var(--ink-mute)]">
            We design and deliver robust full‑stack and mobile solutions (React, .NET, Go, Kotlin, Swift, Python) and provide hands-on consulting, guardrails, and developer tooling. Strong mobile engineering capability.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services"
              className="button-primary-pill focus-ring"
            >
              View services
            </Link>
            <ContactTrackedLink
              href="/contact"
              source="hero"
              className="button-secondary-pill focus-ring"
            >
              Start a project
            </ContactTrackedLink>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {["AI workflows", "Full-stack", "Mobile", "Python"].map((tech) => (
              <span key={tech} className="pill-tag-soft bg-white/70">
                {tech}
              </span>
            ))}
          </div>

          <div className="card-dashboard-mockup mt-6 grid grid-cols-3 gap-2 p-2 md:hidden">
            {deliveryRows.map((row) => (
              <div key={row.label} className="rounded-[var(--radius-md)] border border-[var(--hairline)] bg-white p-2">
                <div className={`mb-2 h-1.5 w-7 rounded-full ${row.tone}`} />
                <p className="text-[9px] leading-[1.2] text-[var(--ink-mute)]">{row.label}</p>
                <p className="tabular mt-1 text-[15px] leading-[1.1] text-[var(--ink)]">{row.value}</p>
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
            <span className="section-eyebrow">delivery console</span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
            <div
              className="rounded-[var(--radius-lg)] p-5 text-[13px] leading-relaxed text-white"
              style={{ backgroundColor: "var(--ink)" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-white/70">hotfix.deploy.ts</span>
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
                  <span className="text-[13px] font-medium text-[var(--ink)]">Release readiness</span>
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
                  <span>Workstream</span>
                  <span>Status</span>
                  <span className="text-right">ETA</span>
                </div>
                {[
                  ["Backend API", "stable", "2d"],
                  ["React surface", "review", "1d"],
                  ["Mobile build", "beta", "4d"],
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
