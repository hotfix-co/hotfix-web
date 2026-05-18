import ContactTrackedLink from "@/components/ContactTrackedLink";
import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import type { BlogPost, Locale } from "@/lib/blogData";
import { formatDate } from "@/lib/blogData";
import { ROUTES } from "@/lib/constants";
import { useTranslations } from "next-intl";

interface BlogArticleLayoutProps {
  post: BlogPost;
  locale: Locale;
  children: ReactNode;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaSource?: string;
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
      <header className="gradient-mesh relative overflow-hidden py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href={ROUTES.blog}
            className="focus-ring mb-8 inline-flex items-center rounded text-[15px] text-[var(--ink-mute)] transition-colors hover:text-[var(--primary)]"
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

          <h1 className="mb-6 text-[42px] font-bold leading-[1.12] tracking-[-0.96px] text-[var(--ink)] md:text-[56px] md:leading-[1.03] md:tracking-[-1.4px]">
            {post.title}
          </h1>

          <p className="mb-8 max-w-3xl text-[18px] leading-[1.4] text-[var(--ink-secondary)]">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-[13px] text-[var(--ink-mute)]">
            <span className="font-medium text-[var(--ink)]">
              {post.author.name}
            </span>
            <span>/</span>
            <span>{authorRole}</span>
            <span>/</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt, locale)}
            </time>
            <span>/</span>
            <span>{post.readingTime}</span>
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

      <section
        className="bg-[var(--brand-dark-900)] py-20"
        aria-labelledby={`${post.slug}-cta`}
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            id={`${post.slug}-cta`}
            className="mb-6 text-[40px] font-bold leading-[1.15] tracking-[-0.96px] text-white md:text-[48px]"
          >
            {ctaTitle ?? defaultCtaTitle}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-[16px] leading-[1.4] text-white/80">
            {ctaDescription ?? defaultCtaDescription}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <ContactTrackedLink
              href={ROUTES.contact}
              source={ctaSource}
              className="button-secondary-pill focus-ring"
            >
              {ctaButton}
            </ContactTrackedLink>
            <Link
              href={ROUTES.services}
              className="button-on-dark focus-ring border border-white/20"
            >
              {servicesButton}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
