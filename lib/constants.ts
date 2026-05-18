export const SITE_URL = "https://www.hotfix-doo.com";

// Internal pathnames used by next-intl routing.
// The i18n middleware maps these to locale-specific URLs (e.g. /about → /o-nama for HR).
export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  aiConsulting: "/services/ai-consulting",
  productivity: "/services/productivity",
  quality: "/services/gdpr-quality",
  blog: "/blog",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const BLOG_SLUGS = {
  claudeCodeSubagents: "claude-code-subagenti-code-review",
  openClawUsage: "openclaw-automatizacija-github-issuea",
  notebookLmWorkflow: "notebooklm-workflow-brze-ucenje",
  claudeCodeSkills: "claude-code-skills-produktivnost",
  aiContextManagement: "upravljanje-ai-kontekstom",
  specDrivenDevelopment: "spec-driven-development-ai",
} as const;

export const LEGACY_BLOG_SLUGS: Record<string, string> = {
  "claude-code-subagents": BLOG_SLUGS.claudeCodeSubagents,
  "openclaw-usage": BLOG_SLUGS.openClawUsage,
  "notebooklm-workflow-learning-faster": BLOG_SLUGS.notebookLmWorkflow,
  "claude-code-skills-productivity": BLOG_SLUGS.claudeCodeSkills,
  "ai-context-management-lessons": BLOG_SLUGS.aiContextManagement,
  "spec-driven-development": BLOG_SLUGS.specDrivenDevelopment,
};
