import type { ComponentProps } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import StructuredData from "@/components/StructuredData";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import { Link } from "@/i18n/navigation";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { getBlogPosts, formatDate, slugToInternalBlogPath } from "@/lib/blogData";
import type { Locale } from "@/lib/blogData";
import { ROUTES, SITE_URL } from "@/lib/constants";
import {
  getLanguageAlternates,
  getLocalizedPath,
  getLocalizedUrl,
} from "@/lib/seo";

type IntlHref = ComponentProps<typeof Link>["href"];

export function generateStaticParams() {
  return [{ locale: "hr" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const isEn = loc === "en";
  const canonicalUrl = getLocalizedUrl(ROUTES.blog, loc);

  return {
    title: isEn
      ? "Blog - AI, software delivery and engineering processes"
      : "Blog - AI, software delivery i engineering procesi",
    description: isEn
      ? "Practical notes on AI-assisted development, Claude Code workflows, software delivery, specifications, automation, and engineering processes."
      : "Praktične bilješke o AI-assisted developmentu, Claude Code workflowima, software deliveryju, specifikacijama, automatizaciji i engineering procesima.",
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(ROUTES.blog),
    },
    openGraph: {
      url: canonicalUrl,
      type: "website",
      siteName: "HOTFIX d.o.o.",
      locale: isEn ? "en_US" : "hr_HR",
      title: isEn
        ? "HOTFIX d.o.o. blog — AI and software engineering"
        : "HOTFIX d.o.o. blog — AI i software engineering",
      description: isEn
        ? "Practical articles about AI workflows, Claude Code, software delivery, and development processes."
        : "Praktični tekstovi o AI workflowima, Claude Codeu, software deliveryju i razvojnim procesima.",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "HOTFIX d.o.o. — AI and software consulting",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/opengraph-image"],
    },
    keywords: [
      "AI-assisted development",
      "Claude Code",
      "software delivery",
      "software engineering blog",
      "engineering processes",
      "AI workflows",
    ],
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations("blog");
  const posts = getBlogPosts(loc);

  const breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: t("breadcrumbHome"), url: getLocalizedPath(ROUTES.home, loc) },
      { name: "Blog", url: getLocalizedPath(ROUTES.blog, loc) },
    ],
    loc
  );

  const sortedPosts = [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${getLocalizedUrl(ROUTES.blog, loc)}#blog`,
    name: loc === "en"
      ? "HOTFIX d.o.o. blog — AI and software engineering"
      : "HOTFIX d.o.o. blog — AI i software engineering",
    description: loc === "en"
      ? "Practical notes on AI-assisted development, Claude Code workflows, software delivery, and engineering processes."
      : "Praktične bilješke o AI-assisted developmentu, Claude Code workflowima, software deliveryju i engineering procesima.",
    url: getLocalizedUrl(ROUTES.blog, loc),
    inLanguage: loc === "en" ? "en" : "hr-HR",
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
    blogPost: sortedPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${SITE_URL}${slugToInternalBlogPath(post.slug)}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
      keywords: post.tags.join(", "),
    })),
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    inLanguage: loc === "en" ? "en" : "hr-HR",
    itemListElement: sortedPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}${slugToInternalBlogPath(post.slug)}`,
      name: post.title,
    })),
  };

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema, blogListSchema, itemListSchema]} />

      {/* Hero Section */}
      <section className="gradient-mesh relative overflow-hidden py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="pill-tag-soft mb-6">{t("heroEyebrow")}</span>
            <h1 className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-[var(--ink)] md:text-[56px] md:leading-[1.03] md:tracking-[-1.4px]">
              {t("heroTitle")}
            </h1>
            <p className="max-w-2xl text-[16px] leading-[1.4] text-[var(--ink-secondary)]">
              {t("heroDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {sortedPosts.map((post) => {
              const blogHref = slugToInternalBlogPath(post.slug) as IntlHref;
              return (
              <Link
                key={post.slug}
                href={blogHref}
                className="group block focus-ring rounded-[var(--radius-lg)]"
              >
                <article className="card-feature-light h-full transition-transform duration-200 group-hover:-translate-y-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="pill-tag-soft">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mb-3 text-[26px] font-bold leading-[1.12] tracking-[-0.26px] text-[var(--ink)] transition-colors group-hover:text-[var(--primary)]">
                    {post.title}
                  </h2>
                  <p className="mb-6 line-clamp-3 text-[15px] leading-[1.4] text-[var(--ink-mute)]">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-[13px] text-[var(--ink-mute)]">
                    <span className="font-medium text-[var(--ink)]">
                      {post.author.name}
                    </span>
                    <span>/</span>
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt, loc)}
                    </time>
                    <span>/</span>
                    <span>{post.readingTime}</span>
                  </div>
                </article>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--brand-dark-900)] py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-white">
            {t("ctaTitle")}
          </h2>
          <p className="mb-10 text-[16px] leading-[1.4] text-white/80">
            {t("ctaDesc")}
          </p>
          <ContactTrackedLink
            href={ROUTES.contact}
            source="blog_index"
            className="button-secondary-pill focus-ring"
          >
            {t("ctaButton")}
          </ContactTrackedLink>
        </div>
      </section>
    </div>
  );
}
