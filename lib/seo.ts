import {
  LOCALIZED_PATHNAMES,
  SITE_URL,
  type SiteLocale,
} from "@/lib/constants";

export type InternalPathname = keyof typeof LOCALIZED_PATHNAMES;

export const SEO_LANGUAGE_KEYS = {
  hr: "hr-HR",
  en: "en",
} as const satisfies Record<SiteLocale, string>;

// Must mirror `defaultLocale` in i18n/routing.ts. Kept here as a typed
// constant rather than imported from the routing object to avoid pulling
// next-intl into edge-light contexts where seo helpers are used.
const DEFAULT_LOCALE: SiteLocale = "hr";

function withLocalePrefix(pathname: string, locale: SiteLocale): string {
  // With `localePrefix: 'as-needed'` in the next-intl routing config, the
  // default locale serves from the bare URL (no `/hr` prefix). This helper
  // must match that behavior so canonical URLs, sitemap entries, hreflang
  // alternates, and JSON-LD `url` fields all agree.
  if (locale === DEFAULT_LOCALE) {
    return pathname === "/" ? "/" : pathname;
  }
  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
}

export function getLocalizedPath(
  pathname: InternalPathname,
  locale: SiteLocale
): string {
  const localizedPathname = LOCALIZED_PATHNAMES[pathname]?.[locale] ?? pathname;
  return withLocalePrefix(localizedPathname, locale);
}

export function getLocalizedUrl(
  pathname: InternalPathname,
  locale: SiteLocale
): string {
  return `${SITE_URL}${getLocalizedPath(pathname, locale)}`;
}

export function getLanguageAlternates(pathname: InternalPathname) {
  return {
    [SEO_LANGUAGE_KEYS.hr]: getLocalizedUrl(pathname, "hr"),
    [SEO_LANGUAGE_KEYS.en]: getLocalizedUrl(pathname, "en"),
    // x-default points to HR: the site's primary audience is the Balkan
    // region (HR, BA, RS, ME, SI). When Google can't infer a language
    // preference, serve Croatian, not English.
    "x-default": getLocalizedUrl(pathname, "hr"),
  };
}
