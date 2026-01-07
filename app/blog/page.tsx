import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { blogPosts, formatDate } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Blog | HOTFIX d.o.o.",
  description:
    "Insights, tutorials, and best practices in full-stack development, mobile development, and software engineering from the HOTFIX team.",
  alternates: {
    canonical: "https://hotfix-doo.com/blog",
  },
  openGraph: {
    url: "https://hotfix-doo.com/blog",
    type: "website",
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

  const featuredPost = blogPosts.find((post) => post.featured);
  const otherPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema]} />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, tutorials, and lessons learned from building software.
              Dive into our thoughts on development practices, tools, and
              technology.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Featured Article
            </h2>
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <article className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 md:p-12 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredPost.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-[var(--primary-red)] to-[var(--primary-orange)] text-white rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-[var(--primary-red)] transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6 max-w-3xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-medium text-gray-900">
                    {featuredPost.author.name}
                  </span>
                  <span>•</span>
                  <time dateTime={featuredPost.publishedAt}>
                    {formatDate(featuredPost.publishedAt)}
                  </time>
                  <span>•</span>
                  <span>{featuredPost.readingTime}</span>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      {otherPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              More Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <article className="bg-white rounded-2xl p-6 h-full shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--primary-red)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-auto">
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Want to Work Together?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            We share insights from building software for clients worldwide.
            Have a project in mind? Let&apos;s talk.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 rounded-lg bg-white text-[var(--primary-red)] font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

