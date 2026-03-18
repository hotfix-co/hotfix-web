"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getStoredAnalyticsConsent,
  initGoogleAnalytics,
  isAnalyticsEnabled,
  setStoredAnalyticsConsent,
  trackPageView,
} from "@/lib/analytics";

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("analytics-consent-change", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("analytics-consent-change", onStoreChange);
  };
}

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getStoredAnalyticsConsent,
    () => "unset",
  );

  const pagePath = useMemo(() => {
    const query = searchParams.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!isHydrated || !isAnalyticsEnabled() || consent !== "accepted") {
      return;
    }

    initGoogleAnalytics();
  }, [consent, isHydrated]);

  useEffect(() => {
    if (consent !== "accepted") {
      return;
    }

    trackPageView(pagePath);
  }, [consent, pagePath]);

  if (!isHydrated || !isAnalyticsEnabled() || consent !== "unset") {
    return null;
  }

  const handleAccept = () => {
    setStoredAnalyticsConsent("accepted");
    initGoogleAnalytics();
  };

  const handleReject = () => {
    setStoredAnalyticsConsent("rejected");
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl">
      <p className="text-sm font-semibold text-gray-900">Analytics consent</p>
      <p className="mt-2 text-sm text-gray-600">
        We use Google Analytics 4 to measure visits and blog traffic. It only
        loads if you accept.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAccept}
          className="rounded-lg gradient-primary px-4 py-2.5 text-sm font-semibold text-white"
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={handleReject}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
