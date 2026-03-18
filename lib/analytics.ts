"use client";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export type AnalyticsEventName =
  | "contact_cta_click"
  | "email_click"
  | "contact_form_submit_success";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export function isAnalyticsEnabled() {
  return GA_MEASUREMENT_ID.length > 0;
}

export function trackPageView(path: string) {
  if (
    typeof window === "undefined" ||
    !window.gtag ||
    !isAnalyticsEnabled()
  ) {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(name: AnalyticsEventName, params?: AnalyticsParams) {
  if (
    typeof window === "undefined" ||
    !window.gtag ||
    !isAnalyticsEnabled()
  ) {
    return;
  }

  window.gtag("event", name, params ?? {});
}
