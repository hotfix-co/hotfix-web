import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { getBlogPost, formatDate } from "@/lib/blogData";

const post = getBlogPost("claude-code-subagents")!;

export const metadata: Metadata = {
  title: `${post.title} | HOTFIX d.o.o.`,
  description: post.description,
  alternates: {
    canonical: `https://hotfix-doo.com/blog/${post.slug}`,
  },
  openGraph: {
    url: `https://hotfix-doo.com/blog/${post.slug}`,
    type: "article",
    title: post.title,
    description: post.description,
    publishedTime: post.publishedAt,
    authors: [post.author.name],
    tags: post.tags,
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
  },
  keywords: post.tags,
};

// Blog Article Schema
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.description,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt || post.publishedAt,
  author: {
    "@type": "Person",
    name: post.author.name,
    jobTitle: post.author.role,
    url: "https://hotfix-doo.com/about",
  },
  publisher: {
    "@type": "Organization",
    name: "HOTFIX d.o.o.",
    url: "https://hotfix-doo.com",
    logo: {
      "@type": "ImageObject",
      url: "https://hotfix-doo.com/logo_without_bg.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://hotfix-doo.com/blog/${post.slug}`,
  },
  keywords: post.tags.join(", "),
};

export default function ClaudeCodeSubagentsArticle() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema, articleSchema]} />

      {/* Article Header */}
      <header className="relative py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-[var(--primary-red)] mb-8 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-[var(--primary-red)] to-[var(--primary-orange)] text-white rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            How I Use <span className="text-gradient">Claude Code Subagents</span> for Unbiased Code Reviews
          </h1>

          <div className="flex items-center gap-4 text-gray-600">
            <div>
              <p className="font-semibold text-gray-900">{post.author.name}</p>
              <p className="text-sm">{post.author.role}</p>
            </div>
            <span className="text-gray-300">|</span>
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span className="text-gray-300">|</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-gray max-w-none">
            {/* Introduction */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              I&apos;ve been using Claude Code subagents heavily in my workflow. Today, I want to share my personal favorite use case for them—a workflow that I rely on almost every day, and that I highly encourage you to try.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              The Problem: Implementation Baggage
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              When you spend hours building a complex feature alongside an AI assistant, you start to share the same blind spots. The AI knows what tradeoffs you made, what edge cases you decided to skip for now, and what constraints you were working under. While this shared context is great for getting the implementation done, it&apos;s terrible for getting an honest code review.
            </p>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              If you ask the same session to &quot;review this code,&quot; it will often just validate your choices instead of critically analyzing them. It has inherited all the baggage of your implementation journey. If you want a fresh perspective to review your work, your only other option is to use the <code>/clear</code> command, which erases the entire conversation history. But you don&apos;t want to lose your history; you just want an unbiased review.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              The Solution: A Clean Room Review with Subagents
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Here is what I do. Let&apos;s say I just finished implementing a complex backend payment flow. The main session is cluttered with my iterations. Instead of asking my current AI partner to review it, I run this exact prompt:
            </p>

            <div className="bg-gray-900 rounded-lg p-6 mb-8 overflow-x-auto">
              <pre className="text-gray-100 font-mono text-sm">
                {`Use a fresh subagent with read-only access to review my implementation 
of the payment flow. It should not see our previous discussion. 
I want an unbiased review. Check for: security vulnerabilities, 
unhandled edge cases, and error handling gaps. Be critical.`}
              </pre>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              Claude Code spins up a brand new agent. This new subagent doesn&apos;t know that I struggled for an hour with a specific Stripe webhook issue, or that I took a shortcut on parsing the metadata. It just looks at the raw code and evaluates it critically.
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8 border-l-4 border-[var(--primary-orange)]">
              <p className="text-xl font-semibold text-gray-900 italic mb-0">
                The review subagent evaluates the code without knowing what tradeoffs were considered, what approaches were rejected, or what assumptions were made. This outside perspective surfaces bugs the main conversation might easily miss.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Automating It With CLAUDE.md
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you want to take this a step further, you can enforce this behavior by adding a rule to your <code>CLAUDE.md</code> file so you don&apos;t even have to write the prompt out every time. For example:
            </p>

            <div className="bg-gray-900 rounded-lg p-6 mb-8 overflow-x-auto">
              <pre className="text-gray-100 font-mono text-sm">
                {`## Code review standards
When asked to review code, ALWAYS use a subagent with READ-ONLY 
access (Glob, Grep, Read only). The review should ALWAYS check for:
- Security vulnerabilities
- Performance issues
- Unhandled edge cases

Return findings as a prioritized list with file:line references.`}
              </pre>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              With this constraint in place, every code review request automatically routes through an isolated, read-only subagent. You get a clean, critical analysis perfectly detached from the noise of your implementation phase.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Conclusion
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Subagents carry some overhead—they consume their own tokens and take a moment to spin up. You shouldn&apos;t use them for every single task. If you&apos;re just making a quick fix in one file, the main session is perfectly fine. 
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              But when you need an actual second opinion, delegating to a subagent is entirely worth it. It gives you the benefit of a "clean room" code review without forcing you to abandon the helpful context in your main working session. Try asking a fresh subagent to review your next complex feature—you might be surprised by what it finds.
            </p>
          </div>

          {/* Author Bio */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                JB
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {post.author.name}
                </h3>
                <p className="text-gray-600 mb-2">{post.author.role}</p>
                <p className="text-gray-600 text-sm">
                  Josip runs HOTFIX d.o.o., a dev shop based in Croatia. He&apos;s been writing code for over a decade and is slightly obsessed with finding ways to ship faster without sacrificing quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Building software faster?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            We love exploring new ways to improve developer productivity. If you&apos;re looking to build something amazing, let&apos;s talk about it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactTrackedLink
              href="/contact"
              source="blog_post"
              className="inline-block px-10 py-4 rounded-lg bg-white text-[var(--primary-red)] font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Get in Touch
            </ContactTrackedLink>
            <Link
              href="/blog"
              className="inline-block px-10 py-4 rounded-lg border-2 border-white text-white font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              More Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
