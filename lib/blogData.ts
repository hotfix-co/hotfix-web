export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    role: string;
  };
  tags: string[];
  readingTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "claude-code-skills-productivity",
    title: "I Stopped Repeating Myself and Built Claude Code Skills Instead",
    description: "How Claude Code skills eliminated my repetitive workflows, and a practical guide to writing your own. Plus why skills are an open format that works across Cursor, Codex, OpenCode, and more.",
    excerpt: "I kept copy-pasting the same instructions into Claude Code every single session. Then I discovered skills - and realized they do way more than just save you from repetition. Plus: skills aren't locked to Claude. They're an open format that works across AI coding tools.",
    publishedAt: "2026-02-12",
    updatedAt: "2026-02-14",
    author: {
      name: "Josip Budalić",
      role: "Founder & CEO",
    },
    tags: ["Claude Code", "Skills", "Developer Productivity", "AI Workflow", "Automation", "Claude Code Skills", "Open Skills Format", "Cursor", "Codex"],
    readingTime: "11 min read",
  },
  {
    slug: "ai-context-management-lessons",
    title: "The AI Context Trap: What I Learned After Wasting Weeks of Work",
    description: "Bigger context windows were supposed to solve everything. Instead, I discovered four hidden problems that kept derailing my AI coding sessions. Here's what actually went wrong.",
    excerpt: "Million-token context windows sounded like the dream. Throw everything in, let the AI figure it out. After losing weeks to mysterious failures, I finally understood why more context often makes things worse.",
    publishedAt: "2026-01-11",
    author: {
      name: "Josip Budalić",
      role: "Founder & CEO",
    },
    tags: ["AI", "Context Management", "LLM", "Developer Productivity", "Prompt Engineering", "AI Agents"],
    readingTime: "7 min read",
  },
  {
    slug: "spec-driven-development",
    title: "Spec-Driven Development: How I 10x'd My Development Speed with AI",
    description: "My honest experience with Spec-Driven Development - how it fixed my chaotic AI workflow, and when to use spec-kit vs OpenSpec.",
    excerpt: "Six months ago, my AI coding workflow was a mess. Endless iterations, code that was 'close but not quite right', and a lot of wasted time. Here's how writing specs first changed everything - and the two tools I actually use now.",
    publishedAt: "2026-01-07",
    author: {
      name: "Josip Budalić",
      role: "Founder & CEO",
    },
    tags: ["Spec-Driven Development", "AI", "Productivity", "spec-kit", "OpenSpec", "Development Workflow"],
    readingTime: "8 min read",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRecentPosts(limit: number = 6): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

