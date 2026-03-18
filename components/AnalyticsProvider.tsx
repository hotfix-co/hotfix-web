"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { initGoogleAnalytics, isAnalyticsEnabled, trackPageView } from "@/lib/analytics";

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const isHydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!isHydrated || !isAnalyticsEnabled()) {
      return;
    }

    initGoogleAnalytics();
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated || !isAnalyticsEnabled()) {
      return;
    }

    trackPageView(pathname);
  }, [isHydrated, pathname]);

  return null;
}
