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
  // Use the current build time as the route-level lastmod. Every deploy
  // refreshes the sitemap timestamp, prompting Google to re-evaluate the
  // route pages. Justified by the ongoing SEO and copy iteration (Phase 1
  // Balkan-first positioning) — these pages genuinely have updated
  // metadata each build.
  const contentUpdatedAt = new Date();

  // Priorities tuned to push crawl budget toward pages that GSC flagged
  // as "Discovered - currently not indexed" with Last crawled = N/A
  // (i.e. never fetched). Bumped commercial and contact pages so Google
  // prioritises them over thin secondary routes.
  const routeEntries: Array<{
    path: InternalPathname;
    changeFrequency: "monthly" | "weekly" | "yearly";
    priority: number;
    lastModified?: Date;
  }> = [
    { path: ROUTES.home, changeFrequency: "monthly", priority: 1 },
    { path: ROUTES.about, changeFrequency: "monthly", priority: 0.9 },
    { path: ROUTES.services, changeFrequency: "monthly", priority: 0.9 },
    { path: ROUTES.aiConsulting, changeFrequency: "monthly", priority: 0.9 },
    { path: ROUTES.productivity, changeFrequency: "monthly", priority: 0.9 },
    { path: ROUTES.quality, changeFrequency: "monthly", priority: 0.9 },
    { path: ROUTES.contact, changeFrequency: "monthly", priority: 0.85 },
    // /privacy and /terms are intentionally excluded — they are
    // noindex'd at the page level (see app/[locale]/privacy/page.tsx and
    // .../terms/page.tsx). Keeping them in the sitemap while telling
    // Google not to index them is a contradicting signal that wastes
    // crawl budget.
    { path: ROUTES.blog, changeFrequency: "weekly", priority: 0.9 },
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
        // Blog posts bumped from 0.7 → 0.85. They were the bulk of the
        // GSC "never crawled" backlog; this signals Google that they are
        // priority content even though they're newer than the routes.
        priority: 0.85,
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
