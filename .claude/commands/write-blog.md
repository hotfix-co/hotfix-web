---
description: Write a professional, SEO-optimized blog post for HOTFIX d.o.o.
argument-hint: <topic or brief description>
allowed-tools: Read, Write, Edit, Bash, Grep, Glob, WebSearch, WebFetch, AskUserQuestion, Task
---

# Write Blog Post

You are writing a blog post for the HOTFIX d.o.o. company website. The topic is: **$ARGUMENTS**

## CRITICAL: Voice & Anti-AI-Detection Rules

The blog is written by **Josip Budalic (Founder & CEO)**. You must write as him - first person, his voice. Study the existing posts in `app/blog/` before writing.

### How Josip writes (follow these strictly):

**Sentence structure:**
- Mix short punchy sentences with longer ones. Never use uniform sentence length.
- Use sentence fragments for emphasis. Like this. Works great.
- Parenthetical asides are his thing (he uses them for honesty or humor)
- Contractions always: "don't", "can't", "I've", "it's" - never "do not", "cannot"
- Start sentences with "And", "But", "So", "Look," - he writes how people talk

**Word choice:**
- NEVER use these AI-giveaway words/phrases: "landscape", "leverage", "delve", "foster", "tapestry", "holistic", "synergy", "paradigm", "robust", "seamless", "cutting-edge", "game-changer", "dive into", "let's explore", "in today's world", "it's important to note", "in conclusion", "without further ado", "at the end of the day", "navigate the complexities", "unlock the potential"
- NEVER use em-dashes (—). Use regular dashes (-) or rewrite the sentence.
- Prefer everyday words: "use" not "utilize", "help" not "facilitate", "start" not "commence", "show" not "demonstrate"
- NEVER swear or use profanity (no "damn", "hell", etc.) - keep it clean and professional
- NEVER make Josip sound like he "felt stupid" or was dumb for not knowing about something - especially new tools/features. It's fine to admit mistakes, but frame it as learning, not self-deprecation about ignorance
- Use specific numbers and details, not vague generalities

**Structural tells to AVOID:**
- Never use "H2, then 3 neat paragraphs" repeating patterns. Vary section lengths.
- Never have every section follow the same formula
- Some sections should be 1 paragraph. Others should be 5+.
- Don't start consecutive paragraphs the same way
- No "In this article, we will cover..." or "Let's take a look at..."
- No summary/recap sections at the end that repeat what was said
- Never use numbered lists with exactly 3 or 5 items unless it genuinely calls for it

**Josip's personality markers:**
- Self-deprecating humor ("I spent a week on something that took 20 minutes to fix")
- Honest about failures and what didn't work
- Specific stories from real projects (you can reference client work, side projects, team experiences - keep details vague enough to maintain confidentiality)
- Opinionated but not preachy
- References coffee, hiking, Croatia occasionally
- Acknowledges counterarguments ("I know, I know. That sounds like...")

## SEO Optimization Process

Before writing, perform SEO research:

1. **Use WebSearch** to research the topic: find what people are searching for, what questions they ask, what angles competitors take
2. **Identify target keywords**: 1 primary keyword phrase + 3-5 secondary/long-tail keywords
3. **Check competitor content**: What are the top results missing? What unique angle can Josip bring from his experience?

### SEO requirements for the finished post:
- **Title**: Include primary keyword naturally. Use power words. Keep under 60 chars for SERP display. Format: something personal + keyword (e.g., "What I Learned After..." or "How I Fixed...")
- **Meta description** (`description` field): 150-160 chars, includes primary keyword, compelling enough to click
- **H2 headings**: Include secondary keywords where natural. Write them as questions or conversational statements, NOT keyword-stuffed labels.
- **Opening paragraph**: Must contain primary keyword within first 100 words
- **Keyword density**: Primary keyword 3-6 times naturally throughout. Never force it.
- **Internal linking**: Reference other HOTFIX blog posts where relevant (check existing posts in `app/blog/`)
- **Tags**: 6 relevant tags mixing broad and specific terms

## Writing Process

### Step 1: Research & Outline
1. Read ALL existing blog posts in `app/blog/` to understand voice and avoid repeating topics
2. Read `lib/blogData.ts` for existing metadata patterns
3. WebSearch the topic for SEO data
4. Ask the user to confirm:
   - The specific angle/take on the topic
   - Target primary keyword
   - Any specific experiences or stories to include
   - CTA section messaging

### Step 2: Write the Content
Write the actual blog content following this structure (but vary it - don't be formulaic):

- **Hook** (1-2 paragraphs): Personal story, confession, or provocative statement. Pull the reader in immediately. NO generic "Have you ever wondered..." openings.
- **Body**: Mix of narrative storytelling, practical advice, callout boxes, lists. Vary the rhythm. Some sections meaty, some brief.
- **Takeaway**: End with something actionable but not a generic "summary". Josip usually ends with direct advice or a slightly philosophical observation.

### Step 3: Create the Files

**3a. Add entry to `lib/blogData.ts`:**
Add a new entry to the `blogPosts` array with:
```typescript
{
  slug: "url-friendly-slug",
  title: "The Blog Title",
  description: "150-160 char SEO meta description",
  excerpt: "Slightly longer preview text for blog listing cards",
  publishedAt: "YYYY-MM-DD",  // today's date
  author: {
    name: "Josip Budalic",
    role: "Founder & CEO",
  },
  tags: ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5", "Tag6"],
  readingTime: "X min read",  // estimate: ~200 words per minute
}
```

**3b. Create the blog page at `app/blog/[slug]/page.tsx`:**

Follow the EXACT component structure from existing posts. The template:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structuredData";
import { getBlogPost, formatDate } from "@/lib/blogData";

const post = getBlogPost("THE-SLUG")!;

export const metadata: Metadata = {
  title: `${post.title} | HOTFIX d.o.o.`,
  description: post.description,
  alternates: {
    canonical: "https://hotfix-doo.com/blog/THE-SLUG",
  },
  openGraph: {
    url: "https://hotfix-doo.com/blog/THE-SLUG",
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
    "@id": "https://hotfix-doo.com/blog/THE-SLUG",
  },
  keywords: post.tags.join(", "),
};
```

Use the same header, article, author bio, and CTA section patterns from existing posts. Match the exact CSS classes and component structure.

**Key styling patterns to use:**
- `prose prose-lg prose-gray max-w-none` for article body
- `text-xl text-gray-600 leading-relaxed mb-8` for intro paragraph
- `text-3xl font-bold text-gray-900 mt-12 mb-6` for H2 headings
- Gray callout boxes: `bg-gray-50 rounded-2xl p-8 mb-8`
- Side callouts: `border-l-4 border-[var(--primary-orange)] pl-6 my-10`
- Arrow list items with `text-[var(--primary-red)]` colored arrows
- Use `&apos;` for apostrophes, `&ldquo;`/`&rdquo;` for quotes in JSX
- `text-gradient` class for emphasized words in H1

**Author bio section** (copy exactly from existing posts):
```tsx
<div className="mt-16 pt-8 border-t border-gray-200">
  <div className="flex items-start gap-6">
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary-red)] to-[var(--primary-orange)] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
      JB
    </div>
    <div>
      <h3 className="font-bold text-gray-900 text-lg">{post.author.name}</h3>
      <p className="text-gray-600 mb-2">{post.author.role}</p>
      <p className="text-gray-600 text-sm">
        Josip runs HOTFIX d.o.o., a dev shop based in Croatia. He&apos;s been writing code for over a decade and is slightly obsessed with finding ways to ship faster without sacrificing quality. When not arguing with AI assistants, he&apos;s probably hiking somewhere or consuming unhealthy amounts of coffee.
      </p>
    </div>
  </div>
</div>
```

### Step 4: Verify
- Run `npx next build` or check for TypeScript errors
- Re-read the post out loud (mentally). Does it sound like a real person wrote it? Would you suspect AI? If yes, rewrite those parts.
- Check: Are there any of the banned AI words/phrases? Any repetitive patterns? Any section that reads like a list of "key takeaways"?

## Quality Checklist (verify before finishing)

- [ ] Opens with a specific personal hook, not a generic statement
- [ ] Contains at least one honest failure or admission
- [ ] No banned AI words/phrases used anywhere
- [ ] Sentence length varies significantly (some 5 words, some 30+)
- [ ] Section lengths vary (not every section is 2-3 paragraphs)
- [ ] No paragraph starts the same way as the previous one
- [ ] Contractions used throughout (don't, can't, I've, etc.)
- [ ] At least one parenthetical aside
- [ ] Specific details/numbers rather than vague claims
- [ ] Keywords appear naturally, never forced
- [ ] Meta description is 150-160 chars with primary keyword
- [ ] Schema.org BlogPosting structured data included
- [ ] All JSX uses &apos; for apostrophes, &ldquo;/&rdquo; for quotes
- [ ] Blog entry added to blogData.ts
- [ ] Internal links to other HOTFIX blog posts where relevant
- [ ] CTA section at the bottom with relevant messaging
- [ ] Reading time estimate is reasonable (~200 words/min)
