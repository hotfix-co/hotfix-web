import { defineRouting } from "next-intl/routing";
import { LOCALIZED_PATHNAMES, SUPPORTED_LOCALES } from "@/lib/constants";

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  // HR is the default: primary audience is the Balkan region (HR/BA/RS).
  // Bare-root visitors and undetected locales should land on /hr, not /en.
  defaultLocale: "hr",
  localePrefix: "always",
  localeDetection: false,
  pathnames: LOCALIZED_PATHNAMES,
});
