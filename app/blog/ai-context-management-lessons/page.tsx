import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { getBlogPost, formatDate } from "@/lib/blogData";

const post = getBlogPost("ai-context-management-lessons")!;

export const metadata: Metadata = {
  title: `${post.title} | HOTFIX d.o.o.`,
  description: post.description,
  alternates: {
    canonical: "https://hotfix-doo.com/blog/ai-context-management-lessons",
  },
  openGraph: {
    url: "https://hotfix-doo.com/blog/ai-context-management-lessons",
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
    "@id": "https://hotfix-doo.com/blog/ai-context-management-lessons",
  },
  keywords: post.tags.join(", "),
};

export default function AIContextManagementArticle() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "AI Context Management Lessons", url: "/blog/ai-context-management-lessons" },
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
            The AI Context Trap: What I Learned After{" "}
            <span className="text-gradient">Wasting Weeks</span> of Work
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
              When I first heard about million-token context windows, I thought all my problems were solved. Finally, I could just dump everything into the prompt - docs, code, conversation history, every tool definition imaginable - and let the AI sort it out. No more carefully curating what goes in. No more &ldquo;sorry, I don&apos;t have enough context.&rdquo; The future had arrived.
            </p>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              Yeah, about that. After a few months of actually working this way, I can tell you: bigger context windows don&apos;t magically fix anything. If anything, they introduced new problems I didn&apos;t even know existed. Problems that cost me weeks of work before I figured out what was happening.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              The project that made me question everything
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              It started with an AI agent I was building for a client. Nothing too exotic - it needed to handle customer queries, pull data from a few APIs, and generate reports. I had a massive context window to play with, so I loaded it up. Full API docs. Every tool definition. Complete conversation history going back days.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              At first, it worked great. The agent was handling complex queries, remembering previous conversations, using the right tools. I was feeling pretty smug about my setup.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Then things started getting weird. The agent began making the same mistakes over and over. It would use a tool incorrectly, I&apos;d correct it, and a few turns later... it would make the exact same error. Sometimes it would get stuck in loops, repeating actions instead of moving forward. Other times it would call tools that had nothing to do with the task at hand.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              I spent a week debugging this. Checked the tools. Checked the prompts. Checked everything. The code was fine. The problem was something I hadn&apos;t even considered: the context itself was working against me.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              The four patterns that kept breaking my agents
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              After that project - and several more failures - I started noticing patterns. The same types of problems kept showing up, just wearing different disguises. Here&apos;s what I learned:
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                1. Context rot - when old mistakes won&apos;t die
              </h3>
              <p className="text-gray-600 mb-4">
                This was the first one I identified. The agent would make a wrong assumption or hallucinate something early in a long session. That incorrect information would then sit in the context, influencing everything that came after.
              </p>
              <p className="text-gray-600 mb-0">
                The worst part? Sometimes I&apos;d correct the mistake explicitly, but the original error was still there in the history, and the model would keep referencing it. It&apos;s like trying to convince someone of a fact when they&apos;ve already read the wrong thing five times. The wrong thing has more weight just by being repeated.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                2. Information overload - when the model forgets how to think
              </h3>
              <p className="text-gray-600 mb-4">
                This one surprised me. I assumed more context was always better. But as the context grew past a certain point, the model started changing behavior. Instead of reasoning through problems, it would just... repeat things. It would loop back to patterns from earlier in the conversation rather than coming up with new solutions.
              </p>
              <p className="text-gray-600 mb-0">
                It&apos;s like the context became so heavy that the model couldn&apos;t see past it anymore. All that training it had, all that general knowledge - it was getting drowned out by the sheer volume of stuff I&apos;d crammed into the prompt. The model was doing retrieval when I needed it to be doing reasoning.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                3. Tool chaos - when more options means worse decisions
              </h3>
              <p className="text-gray-600 mb-4">
                I fell hard for the MCP hype. Connect all the tools! Give the AI access to everything! It&apos;ll figure out which one to use!
              </p>
              <p className="text-gray-600 mb-4">
                Except... it doesn&apos;t. When you give a model 40 different tools, it starts using tools that are vaguely related instead of exactly right. Sometimes it calls tools for no reason at all. The more tool definitions you stuff into the context, the more opportunity for the model to get confused about which one to use.
              </p>
              <p className="text-gray-600 mb-0">
                I noticed this especially with smaller models, but even the big ones aren&apos;t immune. Every tool definition is something the model has to pay attention to, and attention is finite no matter how big your context window is.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                4. Self-contradiction - when your context argues with itself
              </h3>
              <p className="text-gray-600 mb-4">
                This is a nastier version of context rot. It happens when you&apos;re building up context from multiple sources - tool responses, documents, earlier parts of the conversation - and some of that information contradicts other parts.
              </p>
              <p className="text-gray-600 mb-0">
                The model will try to reconcile the contradiction, often by picking the wrong version. Or it&apos;ll get confused and produce something that makes no sense at all. I had an agent that kept generating impossible solutions because early in the conversation it had made an incorrect assumption, and later tool calls returned data that contradicted it. The model was trying to satisfy both and satisfying neither.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Why this matters more than you think
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Here&apos;s the thing that really got me: these aren&apos;t edge cases. If you&apos;re building anything that runs for more than a few turns, that uses multiple tools, or that accumulates information over time, you&apos;re going to hit these problems. Maybe not every time, but often enough to matter.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              And the frustrating part is that the failures are hard to diagnose. The model doesn&apos;t throw an error. It just... does the wrong thing, confidently. You end up debugging your code, your prompts, your tool implementations, when the actual problem is just accumulated garbage in the context.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              What I actually do now
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              After getting burned enough times, I developed some habits that have made a real difference:
            </p>

            <ul className="space-y-4 text-gray-600 mb-8">
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                <span>
                  <strong>Start fresh more often.</strong> I used to try to maintain context across sessions, thinking I was preserving valuable history. Now I start clean sessions more frequently and only carry forward what I explicitly summarize. Yes, you lose some context. But you also lose all the accumulated noise.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                <span>
                  <strong>Load tools dynamically.</strong> Instead of giving the model access to every tool upfront, I only include the tools that are actually relevant to the current task. More setup work, but way fewer confused tool calls.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                <span>
                  <strong>Summarize, don&apos;t accumulate.</strong> For long-running agents, I periodically summarize the important state into a clean format and use that instead of the full conversation history. Think of it like garbage collection for your context.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                <span>
                  <strong>Keep the instructions close.</strong> Critical instructions should be at the beginning AND end of long contexts. Models pay more attention to the edges than the middle.
                </span>
              </li>
            </ul>

            <div className="border-l-4 border-[var(--primary-orange)] pl-6 my-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                This is actually why specs work
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you read my{" "}
                <Link
                  href="/blog/spec-driven-development"
                  className="text-[var(--primary-orange)] hover:underline font-medium"
                >
                  earlier post on Spec-Driven Development
                </Link>
                , this might add some context (pun intended). One reason SDD works so well is that it naturally keeps your context clean.
              </p>
              <p className="text-gray-600 leading-relaxed mb-0">
                When you write a spec upfront, you&apos;re not relying on accumulated conversation history to define what you&apos;re building. The spec is the source of truth - clear, intentional, and free of all the noise that builds up during back-and-forth iteration. You&apos;re essentially protecting yourself from context rot before it happens.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              The uncomfortable truth about bigger context windows
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Look, I&apos;m not saying big context windows are bad. They&apos;re useful for plenty of things - summarizing long documents, searching through large codebases, that kind of thing. What I am saying is that &ldquo;just throw everything in and let the AI figure it out&rdquo; is not a strategy. It&apos;s wishful thinking.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Context is not just a bucket you fill up. It&apos;s an environment your model operates in. And like any environment, if you let it get cluttered and chaotic, performance suffers. The models are getting better at handling this, but they&apos;re not magic. You still need to be intentional about what you put in there.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              After all the time I wasted learning this the hard way, the lesson is simple: treat your context like a scarce resource even when it isn&apos;t. Your future self - the one who isn&apos;t debugging mysterious agent failures at 2am - will thank you.
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
            Building something with AI?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            We&apos;ve learned these lessons so you don&apos;t have to. If you&apos;re working on an AI-powered project and want to avoid the common pitfalls, let&apos;s talk.
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
