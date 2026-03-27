import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { getBlogPost, formatDate } from "@/lib/blogData";

const post = getBlogPost("openclaw-usage")!;

export const metadata: Metadata = {
  title: `${post.title} | HOTFIX d.o.o.`,
  description: post.description,
  alternates: {
    canonical: "https://hotfix-doo.com/blog/openclaw-usage",
  },
  openGraph: {
    url: "https://hotfix-doo.com/blog/openclaw-usage",
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
    "@id": "https://hotfix-doo.com/blog/openclaw-usage",
  },
  keywords: post.tags.join(", "),
};

export default function OpenClawUsageArticle() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "How I Automate GitHub Issue Tracking with OpenClaw", url: "/blog/openclaw-usage" },
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
            How I Automate GitHub Issue Tracking with <span className="text-gradient">OpenClaw</span>
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
              I am the product owner of our mobile app, but I am also one of its most active users. That matters, because a lot of the bugs I care about do not show up in a tidy test session at my desk. They show up when I am out of the office, using the app in real life like any other user would.
            </p>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              That is exactly why this workflow is useful for me. If I notice a bug while I am on the move, I usually do not have my laptop with me and I am definitely not sitting in the office ready to open GitHub and write a proper ticket. But that moment is still valuable, because I have the bug fresh in my head and I know exactly what triggered it.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              If I stop to file the issue properly from my phone, I break the testing flow. If I wait until I am back at my desk, I lose details: the exact screen, the sequence of taps, the odd state the backend was in, or the phrasing of the user-facing bug that made it obvious. Neither option is good.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              What I wanted was simple: send a short message from my phone, let an agent turn that into a usable GitHub issue, and keep moving. OpenClaw ended up being a good fit for that, but only after I set it up with pretty strict boundaries.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              What is OpenClaw?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              OpenClaw is an open-source, self-hosted personal AI assistant you run on your own machine. The official docs position it as local-first and reachable from chat apps like Signal, Telegram, Discord, WhatsApp, Slack, and iMessage. That messaging angle is what pulled me in, but it is worth being precise here: OpenClaw is not only a chat interface. It also has a CLI, a Control UI, and broader automation features. In my case, Signal is just the front door into a much narrower workflow.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              The Architecture of My Workflow
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              To bridge the gap between noticing a bug on my phone and seeing a clean ticket in GitHub, I built a very opinionated pipeline with OpenClaw and Signal. Here is the setup that made it usable:
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                1. A Dedicated Connection
              </h3>
              <p className="text-gray-600 mb-0">
                I gave the bot its own Signal number. OpenClaw&apos;s Signal docs explicitly recommend using a separate bot number for the &ldquo;I text the bot and it replies&rdquo; flow, and that matches my experience. It keeps the setup cleaner and avoids conflicts with my personal account.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                2. Tight Access Control
              </h3>
              <p className="text-gray-600 mb-0">
                I did not leave the inbox open. OpenClaw supports pairing and allowlists for Signal DMs, so I configured it to only process messages from my own number. I also treat config changes and tool access as opt-in, not defaults.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                3. A Custom Skill for One Job
              </h3>
              <p className="text-gray-600 mb-0">
                I added a custom skill that knows how our team writes issues: title style, labels, environment details, expected behavior, actual behavior, and repro steps. That matters because the polished GitHub issue is not some magical built-in outcome. It is the result of a constrained prompt plus the right tool access.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                4. Least-Privilege GitHub Access
              </h3>
              <p className="text-gray-600 mb-0">
                The agent does not get broad access to everything. For this workflow it only needs permission to create or update issues in the target repository. Narrow credentials make the whole setup much easier to justify.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              How It Works in Practice
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              When I hit a bug during testing, I send a short Signal message describing what happened in plain language. Usually it is something like: what I tapped, what I expected, what actually happened, and whether I can reproduce it.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              OpenClaw receives that as input, the custom skill turns it into our issue structure, and then the agent uses the GitHub toolchain I exposed to create the ticket. The important nuance is that OpenClaw is the agent layer, but the quality of the final issue depends heavily on the skill design and the constraints around it.
            </p>
            <div className="bg-gray-50 rounded-2xl p-8 mb-8 border-l-4 border-[var(--primary-orange)]">
              <p className="text-xl font-semibold text-gray-900 italic mb-0">
                The result is a GitHub issue that is usually good enough to drop straight into the backlog, created from a text message without me touching the GitHub mobile UI.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Iteration and Project Management
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Filing the issue is the first win, not the only one. If I find another detail five minutes later, I can reply in the same conversation and have the agent append context or update the ticket instead of creating a duplicate.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              I can also use the same interface for lightweight project management queries, like checking whether a bug is already in the backlog or asking for the status of a task. That part is useful, but I treat it as secondary. The real value is preserving bug details at the moment I discover them.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              The Security Part You Should Not Skip
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              This is the part a lot of enthusiastic OpenClaw posts gloss over. OpenClaw is powerful precisely because it can talk to chat apps, run tools, access files, and trigger external systems. That also means a careless setup can be a bad idea.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              The project&apos;s own docs lean heavily on pairing, allowlists, sandboxing, and even dedicated machines or VMs depending on your threat model. That is the right posture. In my case, I only trust this workflow because it is scoped tightly: separate Signal number, narrow sender allowlist, limited GitHub permissions, and a workflow focused on issues rather than general-purpose automation across my whole machine.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you want to copy this idea, copy the constraints too. The convenience is real, but so is the need for discipline.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Conclusion
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Compared with most OpenClaw content I have seen, this is a much less flashy use case. It is not an autonomous internet agent doing twenty things at once. It is a narrow workflow that solves one annoying problem well.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              That is why I like it. I can stay in testing mode, capture bugs while they are fresh, and let the agent handle the formatting overhead. For me, that is the sweet spot: practical automation, clear boundaries, and just enough intelligence to remove friction without creating a new mess.
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
