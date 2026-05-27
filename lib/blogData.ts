import {
  BLOG_ARTICLE_LOCALIZED_SLUGS,
  BLOG_ARTICLE_ROUTES,
  BLOG_SLUGS,
  ROUTES,
} from "@/lib/constants";

export type Locale = "hr" | "en";

// Maps blog data slugs to their filesystem directory names under app/[locale]/blog/
// For shared posts (BLOG_SLUGS), slug already matches directory.
// For locale-specific slugs (English-only), maps to the shared directory.
const SLUG_TO_DIR: Record<string, string> = {
  "kako-uvesti-ai-u-razvojni-proces": "bringing-ai-into-the-development-process",
  "modernizacija-softwarea-bez-zastoja": "software-modernization-without-downtime",
};

const SLUG_TO_INTERNAL_PATH = Object.entries(BLOG_ARTICLE_LOCALIZED_SLUGS).reduce(
  (acc, [key, localizedSlugs]) => {
    const route = BLOG_ARTICLE_ROUTES[key as keyof typeof BLOG_ARTICLE_ROUTES];
    acc[localizedSlugs.hr] = route;
    acc[localizedSlugs.en] = route;
    return acc;
  },
  {} as Record<string, string>
);

/** Get the filesystem directory name for a blog post slug */
export function slugToDirectory(slug: string): string {
  return SLUG_TO_DIR[slug] ?? slug;
}

export function slugToInternalBlogPath(slug: string): string {
  return SLUG_TO_INTERNAL_PATH[slug] ?? `${ROUTES.blog}/${slugToDirectory(slug)}`;
}

export interface BlogPost {
  slug: string;
  legacySlug?: string;
  title: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    role: string;
    roleEn?: string;
  };
  tags: string[];
  readingTime: string;
}

const blogPostsHr: BlogPost[] = [
  {
    slug: "kako-uvesti-ai-u-razvojni-proces",
    title: "Kako uvesti AI u razvojni proces bez gubitka kontrole",
    description:
      "Praktičan okvir za uvođenje AI coding alata u software tim: gdje početi, koje guardraile postaviti i kako mjeriti stvarnu vrijednost.",
    excerpt:
      "Uvođenje AI-ja u razvoj ne počinje kupnjom alata. Počinje od workflowa, rizika, review pravila i jasnog odgovora na pitanje gdje tim stvarno gubi vrijeme.",
    publishedAt: "2026-05-14",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
    },
    tags: [
      "Uvođenje AI-ja",
      "Claude Code",
      "Software delivery",
      "Code review",
      "Engineering procesi",
    ],
    readingTime: "8 min čitanja",
  },
  {
    slug: "modernizacija-softwarea-bez-zastoja",
    title: "Modernizacija softwarea bez zaustavljanja razvoja",
    description:
      "Kako modernizirati postojeći codebase kroz male, kontrolirane promjene umjesto velikog rewrita koji zaustavlja delivery.",
    excerpt:
      "Najopasnija modernizacija je ona koja obećava čisti početak. Bolji rezultat obično dolazi iz jasnih granica, inkrementalnih promjena i paralelne isporuke.",
    publishedAt: "2026-05-14",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
    },
    tags: [
      "Modernizacija softwarea",
      "Software arhitektura",
      "Legacy codebase",
      "Delivery",
      "Technical planning",
    ],
    readingTime: "7 min čitanja",
  },
  {
    slug: BLOG_SLUGS.claudeCodeSubagents,
    title: "Claude Code subagenti za objektivniji code review",
    description:
      "Kako koristiti svježi subagent za kritičniji pregled koda, bez konteksta i predrasuda iz implementacijske sesije.",
    excerpt:
      "AI koji je pomagao pisati feature često dijeli iste slijepe točke. Zato za važniji review koristim odvojeni Claude Code subagent s jasnim, read-only zadatkom.",
    publishedAt: "2026-04-09",
    updatedAt: "2026-05-27",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
    },
    tags: ["Claude Code", "Code review", "AI-assisted development", "Workflow"],
    readingTime: "5 min čitanja",
  },
  {
    slug: BLOG_SLUGS.openClawUsage,
    title: "Kako automatiziram GitHub issue tracking s OpenClawom",
    description:
      "Praktičan workflow za pretvaranje kratkih bilješki iz Signala u jasne GitHub issuee, uz ograničen pristup i kontrolu kvalitete.",
    excerpt:
      "Pisanje dobrog GitHub issue-a na mobitelu je sporo. OpenClaw, Signal i mali custom skill pretvaraju kratku bilješku u strukturiran issue bez širenja ovlasti.",
    publishedAt: "2026-03-27",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
    },
    tags: ["OpenClaw", "GitHub", "Automation", "Workflow", "AI agenti"],
    readingTime: "6 min čitanja",
  },
  {
    slug: BLOG_SLUGS.notebookLmWorkflow,
    title: "NotebookLM workflow za brže učenje bez gomile tabova",
    description:
      "Kako kombiniram Claude istraživanje, notebooklm-py, NotebookLM i Obsidian u workflow koji završava upotrebljivim bilješkama.",
    excerpt:
      "Hrpa otvorenih tabova nije znanje. Ovaj workflow koristi Claude za selekciju izvora, NotebookLM za sintezu i Obsidian za bilješke koje se vraćaju u svakodnevni rad.",
    publishedAt: "2026-03-18",
    updatedAt: "2026-05-27",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
    },
    tags: ["NotebookLM", "AI research", "Claude Code", "Obsidian", "Workflow"],
    readingTime: "8 min čitanja",
  },
  {
    slug: BLOG_SLUGS.claudeCodeSkills,
    title: "Claude Code skills: standardizacija AI workflowa u timu",
    description:
      "Kako skills uklanjaju ponavljanje, čuvaju timske konvencije i pomažu da AI coding alati daju konzistentnije rezultate.",
    excerpt:
      "Ako svaki developer iznova objašnjava AI alatu iste konvencije, proces ne skalira. Skills pretvaraju ponavljive upute u verzionirani timski standard.",
    publishedAt: "2026-02-12",
    updatedAt: "2026-05-27",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
    },
    tags: [
      "Claude Code",
      "Skills",
      "AI workflow",
      "Automatizacija",
      "Engineering produktivnost",
    ],
    readingTime: "9 min čitanja",
  },
  {
    slug: BLOG_SLUGS.aiContextManagement,
    title: "Zamka velikog AI konteksta: što sam naučio u praksi",
    description:
      "Veći context window ne rješava loš proces. Ovo su lekcije iz AI coding rada gdje je previše konteksta stvaralo više šuma nego vrijednosti.",
    excerpt:
      "Veliki context window zvuči kao rješenje: ubaci sve i pusti model da odluči. Stvarnost je drugačija: višak konteksta često sakrije problem, oslabi fokus i poveća rizik krivog zaključka.",
    publishedAt: "2026-01-11",
    updatedAt: "2026-05-27",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
    },
    tags: [
      "AI",
      "Context management",
      "LLM",
      "Prompt engineering",
      "AI agenti",
    ],
    readingTime: "7 min čitanja",
  },
  {
    slug: BLOG_SLUGS.specDrivenDevelopment,
    title: "Spec-driven development i AI: brži razvoj bez gubitka kontrole",
    description:
      "Kako jasne specifikacije pomažu AI coding workflowu, kada koristiti spec-kit ili OpenSpec i zašto brzina bez kontrole nije dobar cilj.",
    excerpt:
      "AI može ubrzati razvoj, ali bez specifikacije često ubrzava i kaos. Spec-driven pristup daje modelu jasne granice, a timu bolju osnovu za review.",
    publishedAt: "2026-01-07",
    updatedAt: "2026-05-27",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
    },
    tags: [
      "Spec-driven development",
      "AI",
      "Software delivery",
      "spec-kit",
      "OpenSpec",
    ],
    readingTime: "8 min čitanja",
  },
];

const blogPostsEn: BlogPost[] = [
  {
    slug: "bringing-ai-into-the-development-process",
    title: "Bringing AI into the development process without losing control",
    description:
      "A practical framework for introducing AI coding tools into a software team: where to start, what guardrails to set, and how to measure real value.",
    excerpt:
      "AI adoption in development doesn't start with buying a tool. It starts with mapping workflows, risks, review rules, and a clear answer to where the team actually loses time.",
    publishedAt: "2026-05-14",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
      roleEn: "HOTFIX team",
    },
    tags: [
      "AI adoption",
      "Claude Code",
      "Software delivery",
      "Code review",
      "Engineering processes",
    ],
    readingTime: "8 min read",
  },
  {
    slug: "software-modernization-without-downtime",
    title: "Software modernization without stopping development",
    description:
      "How to modernize an existing codebase through small, controlled changes instead of a big rewrite that halts delivery.",
    excerpt:
      "The most dangerous modernization is the one that promises a clean slate. In practice, better results often come from clear boundaries, incremental changes, and parallel delivery.",
    publishedAt: "2026-05-14",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
      roleEn: "HOTFIX team",
    },
    tags: [
      "Software modernization",
      "Software architecture",
      "Legacy codebase",
      "Delivery",
      "Technical planning",
    ],
    readingTime: "7 min read",
  },
  {
    slug: BLOG_SLUGS.claudeCodeSubagents,
    title: "Claude Code subagents for more objective code reviews",
    description:
      "How to use a fresh subagent for a more critical code review, free from the context and biases of the implementation session.",
    excerpt:
      "The AI that helped write a feature often shares the same blind spots. That's why for important reviews, I use a separate Claude Code subagent with a clear, read-only task.",
    publishedAt: "2026-04-09",
    updatedAt: "2026-05-27",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
      roleEn: "HOTFIX team",
    },
    tags: ["Claude Code", "Code review", "AI-assisted development", "Workflow"],
    readingTime: "5 min read",
  },
  {
    slug: BLOG_SLUGS.openClawUsage,
    title: "How I automate GitHub issue tracking with OpenClaw",
    description:
      "A practical workflow for turning short Signal notes into clear GitHub issues, with limited access and quality control.",
    excerpt:
      "Writing a good GitHub issue on a phone is slow. OpenClaw, Signal, and a small custom skill turn a brief note into a structured issue without expanding permissions.",
    publishedAt: "2026-03-27",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
      roleEn: "HOTFIX team",
    },
    tags: ["OpenClaw", "GitHub", "Automation", "Workflow", "AI agents"],
    readingTime: "6 min read",
  },
  {
    slug: BLOG_SLUGS.notebookLmWorkflow,
    title: "NotebookLM workflow for faster learning without a pile of tabs",
    description:
      "How I combine Claude research, notebooklm-py, NotebookLM, and Obsidian into a workflow that ends with reusable notes.",
    excerpt:
      "A pile of open tabs isn't knowledge. This workflow uses Claude for source selection, NotebookLM for synthesis, and Obsidian for notes that feed back into daily work.",
    publishedAt: "2026-03-18",
    updatedAt: "2026-05-27",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
      roleEn: "HOTFIX team",
    },
    tags: ["NotebookLM", "AI research", "Claude Code", "Obsidian", "Workflow"],
    readingTime: "8 min read",
  },
  {
    slug: BLOG_SLUGS.claudeCodeSkills,
    title: "Claude Code skills: standardizing AI workflows in a team",
    description:
      "How skills eliminate repetition, preserve team conventions, and help AI coding tools produce more consistent results.",
    excerpt:
      "If every developer re-explains the same conventions to the AI tool, the process hasn't scaled. Skills turn repetitive instructions into a versioned team standard.",
    publishedAt: "2026-02-12",
    updatedAt: "2026-05-27",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
      roleEn: "HOTFIX team",
    },
    tags: [
      "Claude Code",
      "Skills",
      "AI workflow",
      "Automation",
      "Engineering productivity",
    ],
    readingTime: "9 min read",
  },
  {
    slug: BLOG_SLUGS.aiContextManagement,
    title: "The big AI context trap: lessons from practice",
    description:
      "A bigger context window doesn't fix a bad process. These are lessons from AI coding work where too much context created more noise than value.",
    excerpt:
      "A large context window sounds like a solution: throw everything in and let the model decide. In practice, excess context often hides the problem, weakens focus, and increases the risk of wrong conclusions.",
    publishedAt: "2026-01-11",
    updatedAt: "2026-05-27",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
      roleEn: "HOTFIX team",
    },
    tags: [
      "AI",
      "Context management",
      "LLM",
      "Prompt engineering",
      "AI agents",
    ],
    readingTime: "7 min read",
  },
  {
    slug: BLOG_SLUGS.specDrivenDevelopment,
    title: "Spec-driven development and AI: faster development without losing control",
    description:
      "How clear specifications help AI coding workflows, when to use spec-kit or OpenSpec, and why speed without control isn't a good goal.",
    excerpt:
      "AI can speed up development, but without specifications it often accelerates chaos. A spec-driven approach gives the model clear boundaries and the team a better basis for review.",
    publishedAt: "2026-01-07",
    updatedAt: "2026-05-27",
    author: {
      name: "Josip Budalić",
      role: "HOTFIX tim",
      roleEn: "HOTFIX team",
    },
    tags: [
      "Spec-driven development",
      "AI",
      "Software delivery",
      "spec-kit",
      "OpenSpec",
    ],
    readingTime: "8 min read",
  },
];

const postsByLocale: Record<Locale, BlogPost[]> = {
  hr: blogPostsHr,
  en: blogPostsEn,
};

export function getBlogPosts(locale: Locale): BlogPost[] {
  return postsByLocale[locale] ?? blogPostsHr;
}

export function getBlogPost(
  slug: string,
  locale: Locale = "hr"
): BlogPost | undefined {
  const posts = postsByLocale[locale] ?? blogPostsHr;
  return posts.find(
    (post) => post.slug === slug || post.legacySlug === slug
  );
}

export function getRecentPosts(
  limit: number = 6,
  locale: Locale = "hr"
): BlogPost[] {
  return [...getBlogPosts(locale)]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

export function formatDate(dateString: string, locale: Locale = "hr"): string {
  const localeStr = locale === "en" ? "en-US" : "hr-HR";
  return new Date(dateString).toLocaleDateString(localeStr, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Keep backward compatibility
export const blogPosts = blogPostsHr;
