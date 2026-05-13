import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { blogPosts, formatDate } from "@/lib/blogData";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog | HOTFIX d.o.o.",
  description:
    "Insights, tutorials, and best practices in full-stack development, mobile development, and software engineering from the HOTFIX team.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    url: `${SITE_URL}/blog`,
    type: "website",
    siteName: "HOTFIX d.o.o.",
    title: "Blog | HOTFIX d.o.o.",
    description:
      "Insights, tutorials, and best practices in software development from the HOTFIX team.",
  },
  keywords: [
    "software development blog",
    "full-stack development tutorials",
    "mobile development insights",
    "programming best practices",
    "tech blog Croatia",
    "software engineering articles",
  ],
};

export default function BlogPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  // Sort posts by date, newest first
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema]} />

      {/* Hero Section */}
      <section className="gradient-mesh relative overflow-hidden py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="pill-tag-soft mb-6">blog</span>
            <h1 className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-[var(--ink)] md:text-[56px] md:leading-[1.03] md:tracking-[-1.4px]">
              Engineering notes from the build floor.
            </h1>
            <p className="max-w-2xl text-[16px] leading-[1.4] text-[var(--ink-secondary)]">
              Insights, tutorials, and lessons learned from building software.
              Dive into our thoughts on development practices, tools, and
              technology.
            </p>
          </div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {sortedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block focus-ring rounded-[var(--radius-lg)]"
              >
                <article className="card-feature-light h-full transition-transform duration-200 group-hover:-translate-y-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="pill-tag-soft"
                      >
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
                      {formatDate(post.publishedAt)}
                    </time>
                    <span>/</span>
                    <span>{post.readingTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[var(--brand-dark-900)] py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-[48px] font-bold leading-[1.15] tracking-[-0.96px] text-white">
            Want to Work Together?
          </h2>
          <p className="mb-10 text-[16px] leading-[1.4] text-white/80">
            We share insights from building software for clients worldwide.
            Have a project in mind? Let&apos;s talk.
          </p>
          <ContactTrackedLink
            href="/contact"
            source="blog_index"
            className="button-secondary-pill focus-ring"
          >
            Get in Touch
          </ContactTrackedLink>
        </div>
      </section>
    </div>
  );
}
