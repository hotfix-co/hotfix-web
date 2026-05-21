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

function withLocalePrefix(pathname: string, locale: SiteLocale): string {
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
    "x-default": getLocalizedUrl(pathname, "en"),
  };
}
