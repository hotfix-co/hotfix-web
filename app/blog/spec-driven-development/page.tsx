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
      url: "https://hotfix-doo.com/logo_without_bg.png",
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
              Look, I&apos;ll be honest with you. Six months ago, my workflow with AI coding assistants was a mess. I&apos;d spend 20 minutes describing what I wanted, get back something that was... close but not quite right, then waste another hour going back and forth trying to fix it. Sound familiar?
            </p>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              Then I stumbled onto Spec-Driven Development, and it genuinely changed everything. I&apos;m not exaggerating when I say my output probably increased 10x. Maybe more. The code quality went up too, which surprised me.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              So what actually is Spec-Driven Development?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              The basic idea is dead simple: you write down exactly what you want <em>before</em> you ask the AI to build it. Like, really write it down. Not a vague &ldquo;build me a login page&rdquo; but the actual details - what fields, what validation, what happens on error, the whole thing.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              I know, I know. &ldquo;But Josip, that sounds like more work!&rdquo; That&apos;s what I thought too. Turns out, the 15 minutes you spend writing a proper spec saves you 2 hours of debugging and rewriting later. I learned this the hard way on a client project last year where I had to basically throw away a week&apos;s worth of AI-generated code because the foundation was wrong.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Here&apos;s what a proper SDD workflow typically looks like:
            </p>
            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1">→</span>
                <span>
                  <strong>Constitution:</strong> The rules that never change. Tech stack, coding standards, stuff the AI should never violate.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1">→</span>
                <span>
                  <strong>Specification:</strong> What you&apos;re actually building. User stories, edge cases, the works.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1">→</span>
                <span>
                  <strong>Planning:</strong> How you&apos;re going to build it. Architecture decisions, data models, API contracts.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1">→</span>
                <span>
                  <strong>Tasks:</strong> Breaking it down into chunks the AI can actually handle without going off the rails.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1">→</span>
                <span>
                  <strong>Implementation:</strong> Finally, actual coding. But now with a clear path.
                </span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Why this actually works (from painful experience)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Let me tell you about the project that made me a convert. I was building a dashboard for a fintech client - nothing crazy, but lots of moving parts. Reports, user permissions, data visualization, the usual.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              The first two weeks, I did it the &ldquo;old way&rdquo; - just chatting with the AI, iterating, fixing things as they came up. By day 10, the codebase was a disaster. Different naming conventions in different files. Three different ways of handling errors. Components that kind of worked but were impossible to modify without breaking something else.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Week three, I basically started over with SDD. Spent two days just writing specs. Felt like I was wasting time. But then something weird happened - the next three weeks of actual coding went smoother than any project I&apos;d done before.
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                The &ldquo;actually that&apos;s not what I meant&rdquo; problem
              </h3>
              <p className="text-gray-600 mb-0">
                This was my biggest issue before SDD. I&apos;d describe something, the AI would build it, and then I&apos;d realize I hadn&apos;t thought through some crucial detail. With a spec, you catch those gaps before writing any code. The spec forces you to be specific, and being specific is like 80% of the battle with AI tools.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                No more &ldquo;creative interpretation&rdquo;
              </h3>
              <p className="text-gray-600 mb-0">
                AI assistants love to add things you didn&apos;t ask for. Sometimes it&apos;s helpful. Often it&apos;s not. With a detailed spec, there&apos;s no room for the AI to decide that, actually, you probably want this additional feature you never mentioned. The spec is the contract.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Team projects become manageable
              </h3>
              <p className="text-gray-600 mb-0">
                This one surprised me. When you have specs, you can actually split work between multiple developers (or multiple AI sessions) without everything turning into merge conflict hell. Everyone&apos;s working from the same source of truth. Revolutionary concept, I know.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              The tools I actually use
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              After trying a bunch of different approaches (including just writing specs in plain markdown, which works but gets messy), I settled on two tools depending on the project size. Neither is perfect, but both have made my life significantly easier.
            </p>

            {/* spec-kit Section */}
            <div className="border-l-4 border-[var(--primary-red)] pl-6 my-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                spec-kit - when you need the heavy artillery
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
                is what I reach for on bigger projects - anything with multiple developers or where I know the client is going to change requirements three times (they always do).
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                It&apos;s... a lot. There&apos;s a learning curve, not gonna lie. The first time I set it up took me most of an afternoon. But once it&apos;s running, it&apos;s powerful. You get:
              </p>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-2">✓</span>
                  <span>
                    A proper multi-phase workflow - constitution, spec, plan, tasks, then implementation
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-2">✓</span>
                  <span>
                    Templates that keep things consistent (huge for teams)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-2">✓</span>
                  <span>
                    A research phase - which sounds bureaucratic but actually saves you from picking the wrong library
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-2">✓</span>
                  <span>
                    Parallel task markers so you know what can be worked on simultaneously
                  </span>
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                <strong>My take:</strong> Overkill for small projects. Essential for enterprise stuff. If you&apos;ve got 5+ developers or the project is going to last more than a couple months, just use it. The setup time pays for itself.
              </p>
            </div>

            {/* OpenSpec Section */}
            <div className="border-l-4 border-[var(--primary-orange)] pl-6 my-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                OpenSpec - for everything else
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                <a
                  href="https://github.com/Fission-AI/OpenSpec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary-orange)] hover:underline font-medium"
                >
                  OpenSpec from Fission AI
                </a>{" "}
                is what I use for smaller stuff. Side projects, MVPs, features I&apos;m adding to existing codebases.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The appeal? It&apos;s lightweight. You can be up and running in like 10 minutes. No elaborate folder structures, no complex workflows. Just write a spec, follow a simple process, ship code.
              </p>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-start">
                  <span className="text-[var(--primary-orange)] mr-2">✓</span>
                  <span>
                    Minimal setup - seriously, it&apos;s almost instant
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-orange)] mr-2">✓</span>
                  <span>
                    Works great with existing codebases (this was a big one for me)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-orange)] mr-2">✓</span>
                  <span>
                    Flexible enough that you can adapt it to how you actually work
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-orange)] mr-2">✓</span>
                  <span>
                    Perfect for &ldquo;I just need to add this one feature&rdquo; situations
                  </span>
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed">
                <strong>My take:</strong> This is probably what most developers should start with. Learn the SDD mindset without drowning in process. You can always graduate to spec-kit later if you need more structure.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              How I decide which one to use
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Honestly, it&apos;s pretty straightforward. I ask myself a few questions:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-3 text-left font-bold text-gray-900">
                      Question
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
                      How many people are working on this?
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      5 or more
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Solo or small team
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      How long is this project?
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Months
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Days to weeks
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Is there existing code?
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Usually new projects
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Often existing codebases
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Does the client need documentation?
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Yes, formal docs
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Light or informal
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      How much setup time do I have?
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      A few hours is fine
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-600">
                      Need to start now
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              A quick example so this isn&apos;t all abstract
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Here&apos;s roughly what a spec looks like. This is simplified, but you get the idea:
            </p>

            <div className="bg-gray-900 rounded-xl p-6 mb-8 overflow-x-auto">
              <pre className="text-gray-100 text-sm leading-relaxed">
                <code>{`# Feature: User Authentication

## What we're building
Basic auth - signup, login, password reset. Nothing fancy.

## User stories
- User signs up with email + password
- User logs in
- User can reset password via email

## The technical stuff
- JWT tokens, 24 hour expiry
- bcrypt for passwords, cost factor 12
- Rate limiting: 5 tries per minute per IP (learned this 
  one after a bot attack on a client site...)

## API endpoints
POST /api/auth/signup
  Request:  { email, password }
  Response: { user, token }
  Errors:   400 if email taken, 422 if password weak

POST /api/auth/login
  Request:  { email, password }  
  Response: { user, token }
  Errors:   401 if wrong creds, 429 if rate limited

## Database
User {
  id: uuid (pk)
  email: string (unique, indexed)
  password_hash: string
  created_at: timestamp
  updated_at: timestamp
}

## Notes
- Don't forget email verification (v2, not this sprint)
- Check if we need GDPR consent checkbox`}</code>
              </pre>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              That took me maybe 10 minutes to write. But now when I hand this to the AI (or another developer, or future me), there&apos;s no ambiguity. Everyone knows exactly what we&apos;re building.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              If you take away one thing from this post
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              It&apos;s this: the quality of your AI output directly correlates with the quality of your input. Garbage in, garbage out. Detailed spec in, working code out.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              I resisted SDD for months because it felt like overhead. Like I was slowing myself down with paperwork. But that &ldquo;overhead&rdquo; is actually front-loading the thinking that you&apos;d have to do anyway - you&apos;re just doing it before the AI hallucinates a solution instead of after.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Start small. Next time you&apos;re about to ask an AI to build something, take 5-10 minutes to write out what you actually want first. Be specific. Include the edge cases. Note what you explicitly don&apos;t want.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you&apos;re working on something bigger, grab{" "}
              <a
                href="https://github.com/Fission-AI/OpenSpec"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary-orange)] hover:underline font-medium"
              >
                OpenSpec
              </a>{" "}
              and give it a real try. If you&apos;re on an enterprise team or a complex multi-developer project,{" "}
              <a
                href="https://github.com/github/spec-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary-red)] hover:underline font-medium"
              >
                spec-kit
              </a>{" "}
              is worth the setup investment.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Either way, stop winging it with AI. Write specs. Your future self will thank you.
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
                  Josip runs HOTFIX d.o.o., a dev shop based in Croatia. He&apos;s been writing code for over a decade and is slightly obsessed with finding ways to ship faster without sacrificing quality. When not arguing with AI assistants, he&apos;s probably hiking somewhere or consuming unhealthy amounts of coffee.
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
            Working on something?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            We use SDD on all our client projects. If you need help building something - or just want to chat about development workflows - drop us a line.
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
              More Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
