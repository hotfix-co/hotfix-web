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
  claudeCodeSubagents: "claude-code-subagents",
  openClawUsage: "openclaw-usage",
  notebookLmWorkflow: "notebooklm-workflow-learning-faster",
  claudeCodeSkills: "claude-code-skills-productivity",
  aiContextManagement: "ai-context-management-lessons",
  specDrivenDevelopment: "spec-driven-development",
} as const;

export const LEGACY_BLOG_SLUGS: Record<string, string> = {
  "claude-code-subagenti-code-review": BLOG_SLUGS.claudeCodeSubagents,
  "openclaw-automatizacija-github-issuea": BLOG_SLUGS.openClawUsage,
  "notebooklm-workflow-brze-ucenje": BLOG_SLUGS.notebookLmWorkflow,
  "claude-code-skills-produktivnost": BLOG_SLUGS.claudeCodeSkills,
  "upravljanje-ai-kontekstom": BLOG_SLUGS.aiContextManagement,
  "spec-driven-development-ai": BLOG_SLUGS.specDrivenDevelopment,
};
