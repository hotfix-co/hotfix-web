import { defineRouting } from "next-intl/routing";
import { LOCALIZED_PATHNAMES, SUPPORTED_LOCALES } from "@/lib/constants";

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  // HR is the default: primary audience is the Balkan region (HR/BA/RS).
  // Bare-root visitors and undetected locales should land on the HR home page.
  defaultLocale: "hr",
  // `as-needed` makes the default locale (HR) serve at the bare URL — `/`,
  // `/o-nama`, `/usluge`, etc. — while non-default locales keep their prefix
  // (`/en`, `/en/about`, …). This is required for Google to pick up the
  // homepage `WebSite` schema, because site names are not supported on
  // subdirectories — they only apply at the root URL of a host. With
  // `always`, `/` 307-redirected to `/hr` and Google fell back to the bare
  // domain (`hotfix-doo.com`) for the site name.
  // See: https://developers.google.com/search/docs/appearance/site-names
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: LOCALIZED_PATHNAMES,
});
