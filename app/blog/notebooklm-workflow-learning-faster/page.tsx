import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import ContactTrackedLink from "@/components/ContactTrackedLink";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { getBlogPost, formatDate } from "@/lib/blogData";

const post = getBlogPost("notebooklm-workflow-learning-faster")!;

export const metadata: Metadata = {
  title: `${post.title} | HOTFIX d.o.o.`,
  description: post.description,
  alternates: {
    canonical: "https://hotfix-doo.com/blog/notebooklm-workflow-learning-faster",
  },
  openGraph: {
    url: "https://hotfix-doo.com/blog/notebooklm-workflow-learning-faster",
    type: "article",
    title: post.title,
    description: post.description,
    publishedTime: post.publishedAt,
    authors: [post.author.name],
    tags: post.tags,
    section: "AI Workflow",
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
    "@id": "https://hotfix-doo.com/blog/notebooklm-workflow-learning-faster",
  },
  inLanguage: "en",
  articleSection: "AI Workflow",
  wordCount: 2300,
  keywords: post.tags.join(", "),
};

export default function NotebookLMWorkflowArticle() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    {
      name: "My NotebookLM Workflow for Learning Faster",
      url: "/blog/notebooklm-workflow-learning-faster",
    },
  ]);

  return (
    <div className="bg-white">
      <StructuredData data={[breadcrumbSchema, articleSchema]} />

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
            My <span className="text-gradient">NotebookLM Workflow</span> for
            Learning Faster
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

      <article className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              My NotebookLM workflow starts before I even open NotebookLM. That
              was the part I got wrong for a long time. I&apos;d collect twenty
              tabs, save three YouTube videos for later, dump a few PDFs into a
              folder, and then act surprised when none of it turned into actual
              understanding. I wasn&apos;t learning. I was hoarding inputs.
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              So I changed the system. Now the first step happens in Claude
              Code, not in my browser bookmarks. I use one skill for discovery,
              another skill for exporting the finished takeaways, and
              NotebookLM sits in the middle as the place where the real
              synthesis happens. That one change made the whole process calmer.
              Also faster. And, most importantly, it made the good parts
              reusable instead of trapped in one chaotic research session.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              I wasn&apos;t bad at research. I was bad at intake.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Once I saw the pattern, it was obvious. My old setup looked
              productive from the outside. Lots of reading. Lots of saved
              links. Lots of &ldquo;I&apos;ll come back to this.&rdquo; But if
              you asked me a week later what actually changed in my thinking,
              the answer was usually &ldquo;not much.&rdquo;
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              The problem wasn&apos;t effort. The problem was shape. Everything
              came in at once: blog posts, docs, talks, podcasts, forum threads,
              random clips, half-finished notes. No order. No filter. No sense
              of which source came first, who wrote it, or whether I was
              reading the original idea or somebody&apos;s summary of it.
            </p>

            <div className="border-l-4 border-[var(--primary-orange)] pl-6 my-10">
              <p className="text-gray-600 leading-relaxed mb-4">
                Once I noticed that, the fix became obvious. Stop treating
                source discovery like a side effect. Make it a step with its own
                tool, its own output, and its own standards.
              </p>
              <p className="text-gray-600 leading-relaxed mb-0">
                That is what the first Claude Code skill does for me.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              The discovery step happens in Claude Code
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              I wrote a discovery skill in Claude Code that does the messy part
              I used to do manually. It searches the web and YouTube for the
              topic I&apos;m trying to learn, pulls back candidate sources, and
              gives me the stuff I actually care about: title, author, publish
              date, the link itself, and a short note on why the source might be
              worth keeping.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Then it orders the results by date. Newest first if I need to see
              where the conversation is now. Oldest first if I want to trace how
              an idea developed. That sounds small. It isn&apos;t. Knowing who
              wrote something and when they wrote it changes how you read it.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              I also like doing this in Claude Code because the output is
              cleaner than a search engine session. I can tell the skill
              &ldquo;give me original sources first, then strong secondary
              explainers, and don&apos;t flood me with ten articles that all say
              the same thing.&rdquo; That means NotebookLM never becomes a
              landfill. It gets a curated input set.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you read my earlier piece on{" "}
              <Link
                href="/blog/claude-code-skills-productivity"
                className="text-[var(--primary-orange)] hover:underline font-medium"
              >
                Claude Code skills
              </Link>
              , this is exactly why I got so hooked on them. Repetition is one
              reason. Consistency is the bigger one.
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What the discovery skill filters for
              </h3>
              <ul className="space-y-4 text-gray-600 mb-0">
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                  <span>
                    <strong>Originality.</strong> I want primary material when
                    possible, not twelve paraphrases of the same source.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                  <span>
                    <strong>Metadata.</strong> Title, author, date, and format
                    are mandatory because context without provenance gets shaky
                    fast.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                  <span>
                    <strong>Coverage.</strong> A few articles, a few videos,
                    maybe docs if the topic calls for it. Enough range to learn,
                    not so much that I drown in it.
                  </span>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Why I only push selected sources into NotebookLM
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              NotebookLM works best for me when it starts with a deliberate set
              of material. Google&apos;s own NotebookLM docs say a notebook
              works from static copies of the sources you import, and it
              supports things like web URLs, public YouTube URLs, PDFs,
              markdown, audio, images, Google Docs, and more. That flexibility
              is great. It also means you can make a mess very quickly if you
              throw everything in at once.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              So I don&apos;t. The discovery skill gives me the candidates. I
              choose the sources that deserve a place in the notebook. Then
              NotebookLM becomes a workspace with boundaries, not a junk drawer.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              This part also saved me from a problem I talked about in my{" "}
              <Link
                href="/blog/ai-context-management-lessons"
                className="text-[var(--primary-orange)] hover:underline font-medium"
              >
                context management post
              </Link>
              . More input is not the same as better understanding. Past a
              certain point, extra material just makes the signal harder to see.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              NotebookLM gives you source grounding. That only helps if the
              sources are worth grounding against in the first place.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              notebooklm-py is the glue layer
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              This is where notebooklm-py comes in. I use it to push the
              curated sources into NotebookLM and manage the notebook without
              doing everything manually in the browser.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Important caveat: it&apos;s an unofficial community project that
              uses undocumented Google APIs. The README is very clear about that,
              and I think that honesty matters. I&apos;m comfortable using it
              for my own workflow because the value is obvious. I would still
              treat it as fast-moving tooling, not something I assume is
              guaranteed forever.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              What I like is that it fits the shape of the system. It can create
              notebooks, add and manage sources, chat with content, generate
              outputs, and download artifacts in formats I can do something
              with. The browser UI is where I think. The library is what keeps
              the pipeline repeatable.
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Why I use code at this stage at all
              </h3>
              <p className="text-gray-600 mb-4">
                Because import is boring, and boring steps are where systems
                break. If a workflow depends on me manually copying links into a
                tool every single time, I&apos;ll eventually skip the careful
                part and regret it later.
              </p>
              <p className="text-gray-600 mb-0">
                The code doesn&apos;t replace the thinking. It protects the
                thinking from sloppy handoffs.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              What I actually do inside NotebookLM
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Once the sources are in, that&apos;s when the good part starts. I
              ask questions against the notebook. I compare sources. I look at
              where the citations point. I save the answers that are actually
              worth keeping. And because NotebookLM can focus on selected
              sources, I can narrow the conversation when a topic branches too
              far.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              The citations matter a lot to me. NotebookLM isn&apos;t useful to
              me as a confident narrator. It&apos;s useful as a grounded
              research partner. If an answer points me back to the right source,
              I move faster and trust the result more.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              I also save useful outputs as notes. Google added a nice bridge
              there: notes can be created directly inside the notebook, and
              when it makes sense you can turn a note into a new source. That
              sounds like a minor feature until you use it in practice. Then
              you realize it lets you promote your own synthesis back into the
              working set.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Different topics need different pressure tests. Sometimes I open a
              mind map because the structure is fuzzy. Sometimes I generate an
              Audio Overview because I want to hear the topic back while I walk.
              And sometimes I want a study guide, quiz, or flashcards because
              understanding something well enough to recognize it is not the
              same thing as being able to recall it cold.
            </p>

            <ul className="space-y-4 text-gray-600 mb-8">
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                <span>
                  <strong>Chat first.</strong> I use questions to find the
                  shape of the topic and the disagreements inside the source set.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                <span>
                  <strong>Notes second.</strong> Good answers get saved. Weak
                  answers disappear. I don&apos;t archive everything.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary-red)] mr-3 mt-1 font-bold">→</span>
                <span>
                  <strong>Artifacts when needed.</strong> Mind maps, audio,
                  quizzes, and flashcards are there to stress-test my
                  understanding, not to impress me with output.
                </span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              The source set changes while I learn
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              This part matters because people talk about research as if it were
              linear. It rarely is. Once I understand the topic better, I often
              realize that one of the early sources was too shallow, too old, or
              just not about the thing I actually needed. So I update the
              notebook. Add a better source. Remove a noisy one. Tighten the
              set.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              I&apos;m not editing the original source documents inside
              NotebookLM. I&apos;m curating the notebook around them. That
              distinction is important. The notebook becomes a sharper research
              environment over time, not a permanent dump of everything I
              touched on day one.
            </p>

            <div className="border-l-4 border-[var(--primary-orange)] pl-6 my-10">
              <p className="text-gray-600 leading-relaxed mb-4">
                This is also where the date-ordering from the discovery step
                keeps paying off. When a field moves fast, I can quickly see
                which sources are historical context and which ones deserve more
                weight now.
              </p>
              <p className="text-gray-600 leading-relaxed mb-0">
                It sounds obvious. It wasn&apos;t obvious to me until I built it
                into the workflow.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              Obsidian gets the finished version
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              When I&apos;m done researching, I don&apos;t want to leave the
              best parts trapped in NotebookLM. I use a second Claude Code skill
              for that. Its job is simple: pull the notes, summaries, and kept
              insights I actually care about and push them into Obsidian for
              long-term reference.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Not everything goes over. That would defeat the point. Obsidian is
              where I keep the compressed version - the arguments I want to
              remember, the examples worth reusing, the frameworks that survived
              contact with real reading. NotebookLM is the lab. Obsidian is the
              shelf.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              I like ending the workflow this way because it closes the loop.
              The next time I revisit the topic, I don&apos;t start from zero. I
              start from the distilled version of what already held up.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
              This is really a workflow about retention
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              People usually ask me about the tools first. Fair enough. The
              tools are fun. But the real point is retention. I want a system
              that helps me find strong sources, question them properly, keep
              the important parts, and reuse the result later without doing the
              whole dance again.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Claude Code handles discovery and export. NotebookLM handles the
              active research loop. Obsidian handles the long memory. Each part
              has one job. That is why the whole thing works.
            </p>
            <p className="text-gray-600 leading-relaxed">
              If your current research process still ends as a pile of tabs and
              a vague feeling that you looked at some smart stuff, fix the
              handoffs. That&apos;s where the value leaks out. Build a workflow
              that respects the difference between finding information and
              actually keeping it.
            </p>
          </div>

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
                  Josip runs HOTFIX d.o.o., a dev shop based in Croatia.
                  He&apos;s been writing code for over a decade and is slightly
                  obsessed with finding ways to ship faster without sacrificing
                  quality. When not arguing with AI assistants, he&apos;s
                  probably hiking somewhere or consuming unhealthy amounts of
                  coffee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="py-20 bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Want a research workflow that actually sticks?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            We help teams turn ad hoc AI experiments into repeatable workflows
            that are easier to trust, easier to reuse, and much harder to lose.
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
