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
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "spec-driven-development",
    title: "Spec-Driven Development: How I 10x'd My Development Speed with AI",
    description: "Learn how Spec-Driven Development (SDD) transformed my workflow, comparing spec-kit for enterprise projects and OpenSpec for smaller teams.",
    excerpt: "Discover how writing specifications before code dramatically accelerates development when working with AI coding assistants. A practical comparison of spec-kit and OpenSpec tools.",
    publishedAt: "2026-01-07",
    author: {
      name: "Josip Budalic",
      role: "Founder & CEO",
    },
    tags: ["Spec-Driven Development", "AI", "Productivity", "spec-kit", "OpenSpec", "Development Workflow"],
    readingTime: "8 min read",
    featured: true,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
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

