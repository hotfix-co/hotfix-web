"use client";

import { useLocale } from "next-intl";
import { useState, useRef, useEffect, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

const locales = [
  { code: "hr" as const, label: "HR", full: "Hrvatski" },
  { code: "en" as const, label: "EN", full: "English" },
];

export default function LanguagePicker() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = locales.find((l) => l.code === locale) || locales[0];

  function handleSwitch(newLocale: "hr" | "en") {
    if (newLocale === locale) {
      setOpen(false);
      return;
    }

    setOpen(false);
    const query = Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    );
    const href =
      Object.keys(query).length > 0 ? { pathname, query } : pathname;

    startTransition(() => {
      router.replace(href, { locale: newLocale });
    });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={isPending}
        className="focus-ring flex min-h-9 items-center gap-1.5 rounded-full border border-[var(--hairline)] px-3 text-[13px] font-medium text-[var(--ink-mute-2)] transition-colors hover:border-[var(--primary)] hover:text-[var(--ink)]"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="text-[11px] uppercase tracking-wide">{current.label}</span>
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1 min-w-[120px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--hairline)] bg-white shadow-lg"
          role="listbox"
        >
          {locales.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={l.code === locale}
              disabled={isPending}
              onClick={() => handleSwitch(l.code)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] transition-colors ${
                l.code === locale
                  ? "bg-[var(--canvas-soft)] text-[var(--primary)] font-medium"
                  : "text-[var(--ink-mute-2)] hover:bg-[var(--canvas-soft)] hover:text-[var(--ink)]"
              }`}
            >
              <span className="text-[11px] uppercase tracking-wide">{l.label}</span>
              <span className="text-[11px] text-[var(--ink-mute)]">{l.full}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
