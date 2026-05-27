import ContactTrackedLink from "@/components/ContactTrackedLink";
import { Link } from "@/i18n/navigation";
import type { ComponentProps, ReactNode } from "react";
import type { BlogPost, Locale } from "@/lib/blogData";
import {
  formatDate,
  getBlogPosts,
  slugToInternalBlogPath,
} from "@/lib/blogData";
import { ROUTES } from "@/lib/constants";
import { useTranslations } from "next-intl";

type IntlHref = ComponentProps<typeof Link>["href"];

interface BlogArticleLayoutProps {
  post: BlogPost;
  locale: Locale;
  children: ReactNode;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaSource?: string;
}

// Pick the N most recent OTHER posts in the same locale. Internal links
// from every blog post to 3 others push crawl budget toward articles that
// would otherwise sit in GSC "Discovered - currently not indexed". Tag
// overlap would be nicer, but recency + simplicity is good enough as a
// first pass.
function getRelatedPosts(
  currentSlug: string,
  locale: Locale,
  limit = 3
): BlogPost[] {
  const all = getBlogPosts(locale);
  return [...all]
    .filter((p) => p.slug !== currentSlug)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

export default function BlogArticleLayout({
  post,
  locale,
  children,
  ctaTitle,
  ctaDescription,
  ctaSource = "blog_post",
}: BlogArticleLayoutProps) {
  const t = useTranslations("blog");

  const relatedPosts = getRelatedPosts(post.slug, locale, 3);
  const relatedHeading =
    locale === "en" ? "Related notes" : "Povezane bilješke";

  const defaultCtaTitle =
    locale === "en"
      ? "Let's talk about your software team."
      : "Razgovarajmo o vašem software timu.";
  const defaultCtaDescription =
    locale === "en"
      ? "If you want to introduce AI into the development process, improve delivery, or modernize an existing codebase, we can help evaluate where change brings real value."
      : "Ako želite uvesti AI u razvojni proces, urediti delivery ili modernizirati postojeći codebase, možemo pomoći procijeniti gdje promjena ima stvarnu vrijednost.";
  const ctaButton =
    locale === "en" ? "Book a call" : "Dogovorite razgovor";
  const servicesButton =
    locale === "en" ? "View services" : "Pogledajte usluge";
  const authorRole = locale === "en" && post.author.roleEn ? post.author.roleEn : post.author.role;

  return (
    <>
      <header className="gradient-mesh relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href={ROUTES.blog}
            className="focus-ring mb-8 inline-flex items-center rounded text-[14px] text-[var(--ink-mute)] transition-colors hover:text-[var(--primary)]"
          >
            <span className="mr-2" aria-hidden="true">
              ←
            </span>
            {t("backToBlog")}
          </Link>

          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="pill-tag-soft">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-6 text-[36px] font-light leading-[1.1] tracking-[-0.022em] text-[var(--ink)] text-balance md:text-[48px] md:leading-[1.06] lg:text-[56px] lg:leading-[1.04]">
            {post.title}
          </h1>

          <p className="mb-8 max-w-3xl text-[18px] leading-[1.5] text-[var(--ink-secondary)] text-pretty">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-[var(--ink-mute)]">
            <span className="text-[var(--ink-secondary)]">
              {post.author.name}
            </span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--hairline-input)]" />
            <span>{authorRole}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--hairline-input)]" />
            <time className="tabular" dateTime={post.publishedAt}>
              {formatDate(post.publishedAt, locale)}
            </time>
            <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--hairline-input)]" />
            <span className="tabular">{post.readingTime}</span>
          </div>
        </div>
      </header>

      <article className="py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 text-[16px] leading-[1.65] text-[var(--ink-secondary)]">
            {children}
          </div>

          <div className="mt-16 border-t border-[var(--hairline)] pt-8">
            <div className="flex items-start gap-5">
              <div className="tabular flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--primary)] text-[16px] font-medium text-white">
                JB
              </div>
              <div>
                <h2 className="mb-1 text-[20px] font-bold leading-[1.4] tracking-[-0.2px] text-[var(--ink)]">
                  {post.author.name}
                </h2>
                <p className="mb-2 text-[13px] text-[var(--ink-mute)]">
                  {authorRole}
                </p>
                <p className="max-w-2xl text-[14px] leading-[1.5] text-[var(--ink-mute)]">
                  {t("authorBio")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 ? (
        <section
          className="border-t border-[var(--hairline)] bg-[var(--canvas-soft)] py-16 md:py-20"
          aria-labelledby={`${post.slug}-related`}
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2
              id={`${post.slug}-related`}
              className="mb-8 text-[24px] font-light leading-[1.15] tracking-[-0.015em] text-[var(--ink)] md:text-[28px]"
            >
              {relatedHeading}
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {relatedPosts.map((related) => {
                const relatedHref = slugToInternalBlogPath(
                  related.slug
                ) as IntlHref;
                return (
                  <Link
                    key={related.slug}
                    href={relatedHref}
                    className="group block focus-ring rounded-[var(--radius-lg)]"
                  >
                    <article className="card-feature-light flex h-full flex-col">
                      <h3 className="mb-2 text-[16px] font-light leading-[1.3] tracking-[-0.01em] text-[var(--ink)] transition-colors group-hover:text-[var(--primary-deep)]">
                        {related.title}
                      </h3>
                      <p className="line-clamp-2 text-[13px] leading-[1.5] text-[var(--ink-mute)]">
                        {related.excerpt}
                      </p>
                      <span className="mt-auto pt-3 text-[12px] tabular text-[var(--ink-mute)]">
                        {related.readingTime}
                      </span>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section
        className="bg-[var(--brand-dark-900)] py-20 md:py-24"
        aria-labelledby={`${post.slug}-cta`}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            id={`${post.slug}-cta`}
            className="mb-5 text-[32px] font-light leading-[1.1] tracking-[-0.022em] text-white text-balance md:text-[42px]"
          >
            {ctaTitle ?? defaultCtaTitle}
          </h2>
          <p className="mx-auto mb-9 max-w-xl text-[16px] leading-[1.55] text-white/70">
            {ctaDescription ?? defaultCtaDescription}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <ContactTrackedLink
              href={ROUTES.contact}
              source={ctaSource}
              className="button-primary-pill focus-ring"
            >
              {ctaButton}
            </ContactTrackedLink>
            <Link
              href={ROUTES.services}
              className="button-on-dark focus-ring border border-white/15"
            >
              {servicesButton}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
