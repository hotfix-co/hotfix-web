"use client";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
export const ANALYTICS_CONSENT_KEY = "hotfix_analytics_consent";

export type AnalyticsConsentState = "accepted" | "rejected" | "unset";

export type AnalyticsEventName =
  | "contact_cta_click"
  | "email_click"
  | "contact_form_submit_success";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

let gaInitialized = false;

export function isAnalyticsEnabled() {
  return GA_MEASUREMENT_ID.length > 0;
}

export function getStoredAnalyticsConsent(): AnalyticsConsentState {
  if (typeof window === "undefined") {
    return "unset";
  }

  const storedValue = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return storedValue === "accepted" || storedValue === "rejected"
    ? storedValue
    : "unset";
}

export function setStoredAnalyticsConsent(
  consent: Exclude<AnalyticsConsentState, "unset">,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
  window.dispatchEvent(new Event("analytics-consent-change"));
}

function ensureGoogleTag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
}

export function initGoogleAnalytics() {
  if (
    typeof window === "undefined" ||
    !isAnalyticsEnabled() ||
    gaInitialized
  ) {
    return;
  }

  ensureGoogleTag();

  window.gtag?.("js", new Date());
  window.gtag?.("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag?.("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag?.("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: false,
  });

  if (!document.getElementById("ga4-script")) {
    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  gaInitialized = true;
}

export function trackPageView(path: string) {
  if (
    typeof window === "undefined" ||
    !gaInitialized ||
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
    !gaInitialized ||
    !window.gtag ||
    !isAnalyticsEnabled()
  ) {
    return;
  }

  window.gtag("event", name, params ?? {});
}
