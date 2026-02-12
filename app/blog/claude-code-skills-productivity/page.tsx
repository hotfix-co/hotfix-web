import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { getBlogPost, formatDate } from "@/lib/blogData";

const post = getBlogPost("claude-code-skills-productivity")!;

export const metadata: Metadata = {
  title: `${post.title} | HOTFIX d.o.o.`,
  description: post.description,
  alternates: {
    canonical: "https://hotfix-doo.com/blog/claude-code-skills-productivity",
  },
  openGraph: {
    url: "https://hotfix-doo.com/blog/claude-code-skills-productivity",
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
    "@id": "https://hotfix-doo.com/blog/claude-code-skills-productivity",
  },
  keywords: post.tags.join(", "),
};

export default function ClaudeCodeSkillsArticle() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Claude Code Skills", url: "/blog/claude-code-skills-productivity" },
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
            I Stopped Repeating Myself and Built{" "}
            <span className="text-gradient">Claude Code Skills</span> Instead
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
              I had a problem. Every single time I opened Claude Code, I was typing the same instructions. &ldquo;Use TypeScript strict mode. Follow our naming conventions. Don&apos;t add comments unless the logic is genuinely confusing.&rdquo; Over and over. For months. Like some kind of cursed copy-paste ritual.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              Then I found Claude Code skills. They&apos;re a relatively new feature, and once I tried them, the copy-paste ritual stopped immediately. Skills are these little instruction files that teach Claude how to do specific things - and they stick around across sessions. You write the instructions once, and Claude just... knows. No more repeating yourself.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              But here&apos;s the thing I didn&apos;t expect: skills aren&apos;t just about eliminating repetition. That&apos;s the entry point, sure. Once I started building my own, I realized they can fundamentally change how you work with AI. Like, the gap between &ldquo;generic AI output&rdquo; and &ldquo;this actually looks like a senior dev wrote it&rdquo; - skills are what close that gap.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              The repetitive stuff (where most people start)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Let me give you a concrete example. We do a lot of Next.js work at HOTFIX. Every time we needed a new API endpoint, I was walking Claude through the same steps: create the route handler, add Zod validation, write error responses, generate tests, update the docs. Every single time. And if I forgot to mention one of those steps, I&apos;d get an endpoint missing half the pieces.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              So I wrote a skill. Took maybe 15 minutes. It&apos;s a SKILL.md file in my project&apos;s <code>.claude/skills/</code> folder that turns all those steps into a single command. Now I type <code>/create-endpoint orders</code> and Claude does the whole thing. Route handler, validation, tests, docs - all of it, every time, without me babysitting.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              I did the same for scaffolding new components, generating database migrations, and spinning up test suites for existing modules. Each one is a tiny skill file that automates a multi-step task I used to walk Claude through manually.
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What a basic skill looks like
              </h3>
              <p className="text-gray-600 mb-4">
                It&apos;s embarrassingly simple. A SKILL.md file with some YAML frontmatter and markdown instructions. Here&apos;s one I use to scaffold new API endpoints:
              </p>
              <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                <pre className="text-gray-100 text-sm leading-relaxed">
                  <code>{`---
name: create-endpoint
description: Scaffold a new API endpoint with validation,
  error handling, and tests. Use when building new API routes.
disable-model-invocation: true
---

Create a new API endpoint for $ARGUMENTS:

1. Create the route handler in app/api/
2. Add Zod schema for request validation
3. Include proper error responses (400, 401, 404, 500)
4. Write integration tests covering happy path + errors
5. Add the endpoint to our API docs in docs/api.md

Follow the patterns in app/api/users/route.ts as reference.`}</code>
                </pre>
              </div>
              <p className="text-gray-600 mt-4 mb-0">
                That&apos;s it. Now I type <code>/create-endpoint orders</code> and Claude scaffolds the whole thing - route handler, validation, tests, docs. The <code>$ARGUMENTS</code> placeholder gets replaced with whatever I pass in. One command, consistent output every time.
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              ServiceNow reportedly cut their seller preparation time by 95% after rolling out Claude across 29,000 employees. I can&apos;t claim numbers that dramatic, but I can tell you that eliminating repetitive instructions across our team probably saves us 30-40 minutes per developer per day. That adds up fast.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Beyond repetition - this is where it gets interesting
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Once you get the hang of writing skills, you start seeing opportunities everywhere. And not just for your own little shortcuts.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Take Anthropic&apos;s own <strong>frontend-design</strong> skill. This one blew my mind when I first tried it. You know how AI-generated UIs all look the same? Inter font, purple gradient, white background, minimal everything. It&apos;s that &ldquo;AI slop&rdquo; aesthetic you can spot from a mile away.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              The frontend-design skill fixes that. It teaches Claude to make bold design decisions instead of safe, generic ones. It covers typography (stop using Inter for everything, try Bricolage Grotesque or IBM Plex), color theory (commit to a dominant color, use sharp accents), motion (actually animate things - staggered reveals on page load, scroll-triggered effects), and backgrounds (layered gradients, geometric patterns, not just solid white).
            </p>

            <div className="border-l-4 border-[var(--primary-orange)] pl-6 my-10">
              <p className="text-gray-600 leading-relaxed mb-4">
                I installed it on a Friday afternoon and rebuilt a landing page I&apos;d been unhappy with. The difference was... significant. Same prompt, same requirements, but the output had actual personality. A dark theme with purpose, typography that felt editorial, subtle animations that made the page feel alive.
              </p>
              <p className="text-gray-600 leading-relaxed mb-0">
                My designer colleague looked at it and said &ldquo;that doesn&apos;t look AI-generated.&rdquo; That&apos;s the whole point.
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              And it&apos;s not just frontend stuff. The community has gone wild with this. There are skills for everything - SRE workflows that generate Prometheus configs and runbooks, skills that coordinate across multiple MCP servers, even a codebase-visualizer skill that generates interactive HTML maps of your project structure. One dev wrote a skill that analyzes his personal design patterns across projects and codified his own aesthetic into a reusable set of instructions.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              The part where I messed up (and what I learned)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              My first few skills were terrible. I crammed everything into a single massive SKILL.md - coding conventions, deployment procedures, testing patterns, review checklists - all in one file. It was like 2,000 lines long. Claude would load it and then get confused about which parts applied to what I was actually doing.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Sound familiar? It&apos;s the same context overload problem I wrote about in my{" "}
              <Link
                href="/blog/ai-context-management-lessons"
                className="text-[var(--primary-orange)] hover:underline font-medium"
              >
                context management post
              </Link>
              . More isn&apos;t better. You need focused, specific skills that do one thing well.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              I also made the mistake of not writing good descriptions. The description in the frontmatter is how Claude decides when to load a skill automatically. If it&apos;s vague, the skill either triggers when it shouldn&apos;t or doesn&apos;t trigger when it should. I had a skill called &ldquo;code-helper&rdquo; with the description &ldquo;helps with code.&rdquo; Super useful, right? Claude was loading it on basically every prompt.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              How to write a skill that actually works
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Anthropic published a{" "}
              <a
                href="https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary-red)] hover:underline font-medium"
              >
                comprehensive guide to building skills
              </a>
              {" "}that&apos;s worth reading end to end. But after building probably 20+ skills at this point, here&apos;s what I&apos;ve boiled it down to.
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Start with your use cases, not the code
              </h3>
              <p className="text-gray-600 mb-0">
                Before you write a single line of YAML, write down 2-3 specific things you want the skill to help with. &ldquo;I want Claude to generate API endpoints that follow our REST conventions&rdquo; is good. &ldquo;I want Claude to be better at coding&rdquo; is useless. If you can&apos;t describe a concrete scenario, you don&apos;t have a skill yet - you have a wish.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                The description is more important than the instructions
              </h3>
              <p className="text-gray-600 mb-0">
                I know that sounds backwards. But the description determines <em>when</em> your skill gets used, and a skill that never triggers is a skill that doesn&apos;t exist. Include the actual phrases someone would say. If your skill helps with database migrations, put &ldquo;database migration&rdquo; and &ldquo;schema change&rdquo; in the description. Claude matches on these.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Keep SKILL.md under 500 lines
              </h3>
              <p className="text-gray-600 mb-4">
                This is straight from Anthropic&apos;s guide and I wish I&apos;d known it earlier. If your skill needs more detail, use supporting files - put reference docs, templates, and examples in the same directory and link to them from your SKILL.md. Claude loads the main file first and pulls in the rest only when it needs them.
              </p>
              <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                <pre className="text-gray-100 text-sm leading-relaxed">
                  <code>{`my-skill/
├── SKILL.md           # Main instructions (keep focused)
├── reference.md       # Detailed API docs
├── examples/
│   └── sample.md      # Example output
└── scripts/
    └── validate.sh    # Script Claude can run`}</code>
                </pre>
              </div>
            </div>

            <ul className="space-y-4 text-gray-600 mb-8">
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                <span>
                  <strong>Be specific with instructions.</strong> &ldquo;Write good tests&rdquo; tells Claude nothing. &ldquo;Use describe/it blocks, mock external dependencies with vi.mock, assert on both happy path and error cases&rdquo; tells Claude everything.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                <span>
                  <strong>Include error handling.</strong> What should Claude do when it hits a common problem? Document the gotchas. If your deployment skill might fail because of a missing env variable, say so.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                <span>
                  <strong>Use <code>disable-model-invocation: true</code> for dangerous stuff.</strong> Deploy skills, database migration skills, anything with side effects - make sure only you can trigger it. You don&apos;t want Claude deciding your code &ldquo;looks ready&rdquo; and deploying to production.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                <span>
                  <strong>Test in three layers.</strong> Does it trigger when it should? Does it produce the right output? Is that output actually better than what you&apos;d get without the skill? If you can&apos;t answer yes to all three, keep iterating.
                </span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              The advanced stuff (once you&apos;re hooked)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Skills have some features that aren&apos;t obvious at first. The ones I use most:
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              <strong>Dynamic context injection.</strong> You can embed shell commands in your skill with the <code>!</code><code>`command`</code> syntax. The command runs before Claude sees the prompt, and the output gets inserted. I have a PR review skill that automatically pulls the diff, comments, and changed file list before Claude even starts reviewing. No manual copy-pasting.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              <strong>Subagent execution.</strong> Add <code>context: fork</code> to your frontmatter and the skill runs in an isolated context. Perfect for research tasks where you don&apos;t want the results polluting your main conversation. I use this for a &ldquo;deep-research&rdquo; skill that explores codebases without cluttering my working context.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              <strong>Arguments.</strong> Skills accept arguments through <code>$ARGUMENTS</code> placeholders. My fix-issue skill takes a GitHub issue number: <code>/fix-issue 423</code>. Claude reads the issue, understands the requirements, implements the fix, writes tests, and creates a commit. One command.
            </p>

            <div className="border-l-4 border-[var(--primary-orange)] pl-6 my-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                This connects to specs, by the way
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you&apos;ve read my post on{" "}
                <Link
                  href="/blog/spec-driven-development"
                  className="text-[var(--primary-orange)] hover:underline font-medium"
                >
                  Spec-Driven Development
                </Link>
                , skills are the natural next step. SDD gives you the &ldquo;what to build&rdquo; framework. Skills give you the &ldquo;how to build it&rdquo; framework. Together, they&apos;re the closest I&apos;ve gotten to Claude consistently producing code that I don&apos;t have to rewrite.
              </p>
              <p className="text-gray-600 leading-relaxed mb-0">
                A spec defines the feature. A skill defines the standards. Claude follows both. It&apos;s like having a senior developer who never forgets the team&apos;s conventions and never gets tired of following them.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Where to put your skills (it matters)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Skills can live in three places, and picking the right one trips people up:
            </p>

            <ul className="space-y-4 text-gray-600 mb-8">
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                <span>
                  <strong><code>~/.claude/skills/</code></strong> - Personal skills. Available in every project. I put my general preferences here - commit message style, code review checklist, my debugging workflow.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                <span>
                  <strong><code>.claude/skills/</code></strong> - Project skills. Commit these to git. Your whole team gets them. Project-specific conventions, deployment procedures, API patterns.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                <span>
                  <strong>Plugins</strong> - Shareable skill packs. The frontend-design skill is distributed as a plugin. You install it once, it works everywhere.
                </span>
              </li>
            </ul>

            <p className="text-gray-600 leading-relaxed mb-6">
              Project skills are what changed things for our team. We committed our skills to the repo, and suddenly every developer (and every Claude session) was working from the same playbook. No more &ldquo;well, on my machine Claude does it differently.&rdquo; The skills are version-controlled, reviewed in PRs, and evolve with the project.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              So should you bother?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you&apos;re using Claude Code more than a couple times a week, yes. Absolutely. Start with the annoying repetitive stuff - whatever you keep explaining over and over. That&apos;s your first skill. It&apos;ll take you 15 minutes, maybe 30 if you&apos;re being thorough.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Then install the{" "}
              <a
                href="https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary-orange)] hover:underline font-medium"
              >
                frontend-design skill
              </a>
              {" "}and see what&apos;s possible when you give Claude real design taste instead of letting it default to the same boring template every time.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              And when you&apos;re ready to go deeper, read{" "}
              <a
                href="https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf?hsLang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary-red)] hover:underline font-medium"
              >
                Anthropic&apos;s complete guide
              </a>
              . It covers everything from skill architecture to testing strategies to distribution. It&apos;s the kind of documentation I wish existed when I started - would&apos;ve saved me from my 2,000-line monstrosity.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The bottom line is this: Claude is only as good as the instructions you give it. Skills let you give those instructions once and get the benefit forever. The 15 minutes you spend writing a skill today will save you hours over the next month. And the quality of Claude&apos;s output? Night and day.
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
            Want skills built for your team?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            We build custom Claude Code skills and AI workflows for dev teams. If you&apos;re tired of inconsistent AI output across your team, we can help standardize it.
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
