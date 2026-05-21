import type { Metadata } from "next";
import type { BlogPost, Locale } from "@/lib/blogData";
import { ROUTES, SITE_URL } from "@/lib/constants";
import {
  getLanguageAlternates,
  getLocalizedUrl,
  type InternalPathname,
} from "@/lib/seo";

export function generateBlogMetadata({
  post,
  pathname,
  locale,
}: {
  post: BlogPost;
  pathname: InternalPathname;
  locale: Locale;
}): Metadata {
  const canonicalUrl = getLocalizedUrl(pathname, locale);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(pathname),
    },
    openGraph: {
      url: canonicalUrl,
      type: "article",
      siteName: "HOTFIX d.o.o.",
      locale: locale === "en" ? "en_US" : "hr_HR",
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`${SITE_URL}/opengraph-image`],
    },
    keywords: post.tags,
  };
}

export function generateBlogPostingSchema({
  post,
  pathname,
  locale,
  articleSection,
}: {
  post: BlogPost;
  pathname: InternalPathname;
  locale: Locale;
  articleSection: string;
}) {
  const canonicalUrl = getLocalizedUrl(pathname, locale);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    inLanguage: locale === "en" ? "en-US" : "hr-HR",
    articleSection,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle:
        locale === "en" && post.author.roleEn
          ? post.author.roleEn
          : post.author.role,
      url: getLocalizedUrl(ROUTES.about, locale),
    },
    publisher: {
      "@type": "Organization",
      name: "HOTFIX d.o.o.",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords: post.tags.join(", "),
  };
}
