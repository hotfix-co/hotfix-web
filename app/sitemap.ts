import { MetadataRoute } from "next";
import { getBlogPost } from "@/lib/blogData";
import {
  BLOG_ARTICLE_LOCALIZED_SLUGS,
  BLOG_ARTICLE_ROUTES,
  ROUTES,
  SUPPORTED_LOCALES,
  type SiteLocale,
} from "@/lib/constants";
import {
  getLanguageAlternates,
  getLocalizedUrl,
  type InternalPathname,
} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const contentUpdatedAt = new Date("2026-05-21");

  const routeEntries: Array<{
    path: InternalPathname;
    changeFrequency: "monthly" | "weekly" | "yearly";
    priority: number;
    lastModified?: Date;
  }> = [
    { path: ROUTES.home, changeFrequency: "monthly", priority: 1 },
    { path: ROUTES.about, changeFrequency: "monthly", priority: 0.8 },
    { path: ROUTES.services, changeFrequency: "monthly", priority: 0.8 },
    { path: ROUTES.aiConsulting, changeFrequency: "monthly", priority: 0.75 },
    { path: ROUTES.productivity, changeFrequency: "monthly", priority: 0.7 },
    { path: ROUTES.quality, changeFrequency: "monthly", priority: 0.7 },
    { path: ROUTES.contact, changeFrequency: "monthly", priority: 0.7 },
    // /privacy and /terms are intentionally excluded — they are
    // noindex'd at the page level (see app/[locale]/privacy/page.tsx and
    // .../terms/page.tsx). Keeping them in the sitemap while telling
    // Google not to index them is a contradicting signal that wastes
    // crawl budget.
    { path: ROUTES.blog, changeFrequency: "weekly", priority: 0.8 },
  ];

  const blogEntries = Object.entries(BLOG_ARTICLE_ROUTES).map(
    ([key, path]) => {
      const localizedSlugs =
        BLOG_ARTICLE_LOCALIZED_SLUGS[
          key as keyof typeof BLOG_ARTICLE_LOCALIZED_SLUGS
        ];
      const post =
        getBlogPost(localizedSlugs.en, "en") ??
        getBlogPost(localizedSlugs.hr, "hr");

      return {
        path: path as InternalPathname,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        lastModified: new Date(post?.updatedAt || post?.publishedAt || "2026-05-14"),
      };
    }
  );

  return [...routeEntries, ...blogEntries].flatMap((entry) =>
    SUPPORTED_LOCALES.map((locale: SiteLocale) => ({
      url: getLocalizedUrl(entry.path, locale),
      lastModified: entry.lastModified ?? contentUpdatedAt,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages: getLanguageAlternates(entry.path),
      },
    }))
  );
}
