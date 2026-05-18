import { defineRouting } from "next-intl/routing";
import { LOCALIZED_PATHNAMES, SUPPORTED_LOCALES } from "@/lib/constants";

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: "hr",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: LOCALIZED_PATHNAMES,
});
