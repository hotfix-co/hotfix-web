"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initGoogleAnalytics, isAnalyticsEnabled, trackPageView } from "@/lib/analytics";

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  const pagePath = useMemo(() => {
    const query = searchParams.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

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

    trackPageView(pagePath);
  }, [isHydrated, pagePath]);

  return null;
}
