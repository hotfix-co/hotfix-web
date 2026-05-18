import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogData";
import { ROUTES, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const contentUpdatedAt = new Date("2026-05-14");

  const routes = [
    ROUTES.home,
    ROUTES.about,
    ROUTES.services,
    ROUTES.aiConsulting,
    ROUTES.productivity,
    ROUTES.quality,
    ROUTES.contact,
    ROUTES.privacy,
    ROUTES.terms,
    ROUTES.blog,
  ];

  const routeMeta: Record<string, { changeFrequency: "monthly" | "weekly" | "yearly"; priority: number }> = {
    [ROUTES.home]: { changeFrequency: "monthly", priority: 1 },
    [ROUTES.about]: { changeFrequency: "monthly", priority: 0.8 },
    [ROUTES.services]: { changeFrequency: "monthly", priority: 0.8 },
    [ROUTES.aiConsulting]: { changeFrequency: "monthly", priority: 0.75 },
    [ROUTES.productivity]: { changeFrequency: "monthly", priority: 0.7 },
    [ROUTES.quality]: { changeFrequency: "monthly", priority: 0.7 },
    [ROUTES.contact]: { changeFrequency: "monthly", priority: 0.7 },
    [ROUTES.privacy]: { changeFrequency: "yearly", priority: 0.3 },
    [ROUTES.terms]: { changeFrequency: "yearly", priority: 0.3 },
    [ROUTES.blog]: { changeFrequency: "weekly", priority: 0.8 },
  };

  // Croatian pages (no prefix — default locale)
  const hrPages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: contentUpdatedAt,
    changeFrequency: routeMeta[route].changeFrequency,
    priority: routeMeta[route].priority,
    alternates: {
      languages: {
        hr: `${baseUrl}${route}`,
        en: `${baseUrl}/en${route === "/" ? "" : route}`,
      },
    },
  }));

  // English pages (/en/ prefix)
  const enPages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}/en${route === "/" ? "" : route}`,
    lastModified: contentUpdatedAt,
    changeFrequency: routeMeta[route].changeFrequency,
    priority: routeMeta[route].priority * 0.9,
    alternates: {
      languages: {
        hr: `${baseUrl}${route}`,
        en: `${baseUrl}/en${route === "/" ? "" : route}`,
      },
    },
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}${ROUTES.blog}/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...hrPages, ...enPages, ...blogPages];
}
