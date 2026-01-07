import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { getBlogPost, formatDate } from "@/lib/blogData";

const post = getBlogPost("spec-driven-development")!;

export const metadata: Metadata = {
  title: `${post.title} | HOTFIX d.o.o.`,
  description: post.description,
  alternates: {
    canonical: "https://hotfix-doo.com/blog/spec-driven-development",
  },
  openGraph: {
    url: "https://hotfix-doo.com/blog/spec-driven-development",
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
      url: "https://hotfix-doo.com/icon.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://hotfix-doo.com/blog/spec-driven-development",
  },
  keywords: post.tags.join(", "),
};

export default function SpecDrivenDevelopmentArticle() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Spec-Driven Development", url: "/blog/spec-driven-development" },
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
            Spec-Driven Development: How I{" "}
            <span className="text-gradient">10x&apos;d</span> My Development
            Speed with AI
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
              If you&apos;re using AI coding assistants like GitHub Copilot,
              Cursor, or Claude, and you&apos;re not using Spec-Driven
              Development, you&apos;re leaving massive productivity gains on the
              table. After adopting SDD in my workflow, I&apos;ve seen dramatic
              improvements in development speed, code quality, and—most
              importantly—fewer rewrites.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              What is Spec-Driven Development?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Spec-Driven Development (SDD) is a methodology where you write
              detailed specifications <em>before</em> you write any code. Think
              of it as creating a blueprint that both you and your AI assistant
              can follow. Instead of vaguely describing what you want and hoping
              the AI figures it out, you provide structured requirements that
              guide the implementation.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              The core idea is simple: the clearer your instructions, the better
              the output. But SDD takes this further by establishing a
              repeatable process that includes:
            </p>
            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1">→</span>
                <span>
                  <strong>Constitution:</strong> The foundational principles and
                  constraints for your project
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1">→</span>
                <span>
                  <strong>Specification:</strong> Detailed feature requirements
                  with user stories
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1">→</span>
                <span>
                  <strong>Planning:</strong> Implementation approach, tech
                  stack, and architecture decisions
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1">→</span>
                <span>
                  <strong>Tasks:</strong> Granular, actionable items with
                  dependencies
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1">→</span>
                <span>
                  <strong>Implementation:</strong> Systematic execution with
                  validation checkpoints
                </span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Why SDD Accelerates Development
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Before adopting SDD, my workflow with AI assistants was chaotic.
              I&apos;d describe a feature, get some code, realize it wasn&apos;t
              quite right, iterate endlessly, and often end up with a
              Frankenstein codebase that needed significant refactoring.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              With SDD, everything changed:
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                1. Reduced Rewrites by 80%
              </h3>
              <p className="text-gray-600 mb-0">
                When the AI has a clear specification, it generates code that
                actually matches what you need. No more &ldquo;that&apos;s close
                but not quite&rdquo; iterations. The spec acts as a contract
                between you and the AI.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                2. Better Architecture Decisions
              </h3>
              <p className="text-gray-600 mb-0">
                Writing specs forces you to think through edge cases, data
                models, and system interactions before coding. This upfront
                investment prevents architectural mistakes that are expensive to
                fix later.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                3. Parallel Workstreams
              </h3>
              <p className="text-gray-600 mb-0">
                With detailed specs, multiple developers (or AI agents) can work
                on different parts of the system simultaneously without stepping
                on each other&apos;s toes. The spec serves as the coordination
                mechanism.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                4. Living Documentation
              </h3>
              <p className="text-gray-600 mb-0">
                Your specs become documentation. New team members can understand
                the system by reading the specs, and you can trace every feature
                back to its original requirements.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              The Tools: spec-kit vs OpenSpec
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              After experimenting with various approaches to SDD, two tools have
              become my go-to choices depending on the project context:{" "}
              <strong>spec-kit</strong> from GitHub and <strong>OpenSpec</strong>{" "}
              from Fission AI.
            </p>

            {/* spec-kit Section */}
            <div className="border-l-4 border-[var(--primary-red)] pl-6 my-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                spec-kit — For Enterprise Projects
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                <a
                  href="https://github.com/github/spec-kit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary-red)] hover:underline font-medium"
                >
                  GitHub&apos;s spec-kit
                </a>{" "}
                is a comprehensive toolkit for Spec-Driven Development. It
                provides a structured, multi-step workflow that&apos;s perfect
                for enterprise teams.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>What I love about spec-kit:</strong>
              </p>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-2">✓</span>
                  <span>
                    Multi-step workflow with clear phases (constitution, spec,
                    plan, tasks, implement)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-2">✓</span>
                  <span>
                    Built-in templates for consistency across projects
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-2">✓</span>
                  <span>
                    Research phase for validating tech stack decisions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-2">✓</span>
                  <span>
                    Parallel task execution markers for team coordination
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-2">✓</span>
                  <span>Validation checkpoints at each phase</span>
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                <strong>Best for:</strong> Enterprise projects with multiple
                developers, formal governance requirements, complex systems
                requiring detailed planning, and teams that need structured
                processes.
              </p>
            </div>

            {/* OpenSpec Section */}
            <div className="border-l-4 border-[var(--primary-orange)] pl-6 my-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                OpenSpec — For Smaller Teams
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                <a
                  href="https://github.com/Fission-AI/OpenSpec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary-orange)] hover:underline font-medium"
                >
                  Fission AI&apos;s OpenSpec
                </a>{" "}
                takes a lighter approach. It&apos;s designed for teams that want
                the benefits of SDD without the overhead of a heavyweight
                process.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>What I love about OpenSpec:</strong>
              </p>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-[var(--primary-orange)] mr-2">✓</span>
                  <span>
                    Minimal process overhead — get started in minutes
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-orange)] mr-2">✓</span>
                  <span>
                    Great for brownfield projects and existing codebases
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-orange)] mr-2">✓</span>
                  <span>Flexible structure that adapts to your workflow</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-orange)] mr-2">✓</span>
                  <span>
                    Lower learning curve for teams new to SDD
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-orange)] mr-2">✓</span>
                  <span>Perfect for rapid prototyping and MVPs</span>
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                <strong>Best for:</strong> Small teams, solo developers,
                startups, MVPs, brownfield projects, and situations where you
                need quick results without ceremony.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              When to Use Each Tool
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Here&apos;s my decision framework based on real project
              experience:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-3 text-left font-bold text-gray-900">
                      Criteria
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-bold text-gray-900">
                      spec-kit
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-bold text-gray-900">
                      OpenSpec
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Team Size
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      5+ developers
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      1-4 developers
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Project Duration
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      3+ months
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Weeks to months
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Governance Needs
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      High (enterprise)
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Low to medium
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Project Type
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Greenfield, complex
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Brownfield, MVPs
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Setup Time
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      1-2 hours
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Minutes
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              A Practical Example
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Let me show you what a simple spec looks like. Here&apos;s a
              stripped-down example for a user authentication feature:
            </p>

            <div className="bg-gray-900 rounded-xl p-6 mb-8 overflow-x-auto">
              <pre className="text-gray-100 text-sm leading-relaxed">
                <code>{`# Feature: User Authentication

## User Stories
- As a user, I want to sign up with email/password
- As a user, I want to log in to my account
- As a user, I want to reset my password

## Technical Requirements
- Use JWT tokens with 24h expiration
- Passwords hashed with bcrypt (cost factor 12)
- Rate limit: 5 attempts per minute per IP

## API Contracts
POST /api/auth/signup
  Body: { email: string, password: string }
  Response: { user: User, token: string }

POST /api/auth/login
  Body: { email: string, password: string }
  Response: { user: User, token: string }

## Data Model
User {
  id: UUID
  email: string (unique)
  passwordHash: string
  createdAt: DateTime
  updatedAt: DateTime
}`}</code>
              </pre>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              With this spec, an AI assistant can generate the exact code you
              need. No ambiguity, no guessing, no &ldquo;actually I meant
              something different.&rdquo;
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Getting Started
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you&apos;re ready to try Spec-Driven Development, here&apos;s
              my recommendation:
            </p>
            <ol className="space-y-4 text-gray-600 mb-8">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[var(--primary-red)] to-[var(--primary-orange)] text-white font-bold flex items-center justify-center mr-4">
                  1
                </span>
                <span>
                  <strong>For your next small project:</strong> Start with
                  OpenSpec. Get comfortable with writing specs before coding.
                  Experience the immediate productivity boost.
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[var(--primary-red)] to-[var(--primary-orange)] text-white font-bold flex items-center justify-center mr-4">
                  2
                </span>
                <span>
                  <strong>For enterprise or team projects:</strong> Invest the
                  time to set up spec-kit. The structured workflow pays
                  dividends as complexity grows.
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[var(--primary-red)] to-[var(--primary-orange)] text-white font-bold flex items-center justify-center mr-4">
                  3
                </span>
                <span>
                  <strong>Iterate on your process:</strong> SDD isn&apos;t
                  one-size-fits-all. Adapt the tools to your workflow, not the
                  other way around.
                </span>
              </li>
            </ol>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Conclusion
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Spec-Driven Development has fundamentally changed how I work with
              AI coding assistants. The upfront investment in writing clear
              specifications pays for itself many times over through reduced
              iterations, better code quality, and fewer architectural mistakes.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              For enterprise projects with multiple developers and complex
              requirements, I recommend{" "}
              <a
                href="https://github.com/github/spec-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary-red)] hover:underline font-medium"
              >
                spec-kit
              </a>
              . Its structured workflow and governance features are worth the
              setup time.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              For smaller teams and simpler projects,{" "}
              <a
                href="https://github.com/Fission-AI/OpenSpec"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary-orange)] hover:underline font-medium"
              >
                OpenSpec
              </a>{" "}
              is the way to go. It gives you 80% of the benefits with 20% of the
              ceremony.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whichever tool you choose, the principle remains the same:{" "}
              <strong>
                clear specifications lead to better code, faster.
              </strong>{" "}
              Start writing specs today, and watch your development velocity
              soar.
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
                  Josip is the founder of HOTFIX d.o.o., a Croatian software
                  development company specializing in full-stack and mobile
                  development. He&apos;s passionate about developer productivity
                  and building tools that make software development faster and
                  more enjoyable.
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
            Need Help With Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            We use Spec-Driven Development on all our client projects. Let&apos;s
            build something great together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 rounded-lg bg-white text-[var(--primary-red)] font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Get in Touch
            </Link>
            <Link
              href="/blog"
              className="inline-block px-10 py-4 rounded-lg border-2 border-white text-white font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Read More Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

