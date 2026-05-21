export const SITE_URL = "https://www.hotfix-doo.com";

export const SUPPORTED_LOCALES = ["en", "hr"] as const;
export type SiteLocale = (typeof SUPPORTED_LOCALES)[number];

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
  aiAdoption: "bringing-ai-into-the-development-process",
  softwareModernization: "software-modernization-without-downtime",
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

export const BLOG_ARTICLE_ROUTES = {
  aiAdoption: `${ROUTES.blog}/${BLOG_SLUGS.aiAdoption}`,
  softwareModernization: `${ROUTES.blog}/${BLOG_SLUGS.softwareModernization}`,
  claudeCodeSubagents: `${ROUTES.blog}/${BLOG_SLUGS.claudeCodeSubagents}`,
  openClawUsage: `${ROUTES.blog}/${BLOG_SLUGS.openClawUsage}`,
  notebookLmWorkflow: `${ROUTES.blog}/${BLOG_SLUGS.notebookLmWorkflow}`,
  claudeCodeSkills: `${ROUTES.blog}/${BLOG_SLUGS.claudeCodeSkills}`,
  aiContextManagement: `${ROUTES.blog}/${BLOG_SLUGS.aiContextManagement}`,
  specDrivenDevelopment: `${ROUTES.blog}/${BLOG_SLUGS.specDrivenDevelopment}`,
} as const;

export const BLOG_ARTICLE_LOCALIZED_SLUGS = {
  aiAdoption: {
    hr: "kako-uvesti-ai-u-razvojni-proces",
    en: BLOG_SLUGS.aiAdoption,
  },
  softwareModernization: {
    hr: "modernizacija-softwarea-bez-zastoja",
    en: BLOG_SLUGS.softwareModernization,
  },
  claudeCodeSubagents: {
    hr: "claude-code-subagenti-code-review",
    en: BLOG_SLUGS.claudeCodeSubagents,
  },
  openClawUsage: {
    hr: "openclaw-automatizacija-github-issuea",
    en: BLOG_SLUGS.openClawUsage,
  },
  notebookLmWorkflow: {
    hr: "notebooklm-workflow-brze-ucenje",
    en: BLOG_SLUGS.notebookLmWorkflow,
  },
  claudeCodeSkills: {
    hr: "claude-code-skills-produktivnost",
    en: BLOG_SLUGS.claudeCodeSkills,
  },
  aiContextManagement: {
    hr: "upravljanje-ai-kontekstom",
    en: BLOG_SLUGS.aiContextManagement,
  },
  specDrivenDevelopment: {
    hr: "spec-driven-development-ai",
    en: BLOG_SLUGS.specDrivenDevelopment,
  },
} as const satisfies Record<
  keyof typeof BLOG_ARTICLE_ROUTES,
  Record<SiteLocale, string>
>;

export const LOCALIZED_PATHNAMES = {
  [ROUTES.home]: {
    hr: "/",
    en: "/",
  },
  [ROUTES.about]: {
    hr: "/o-nama",
    en: "/about",
  },
  [ROUTES.services]: {
    hr: "/usluge",
    en: "/services",
  },
  [ROUTES.aiConsulting]: {
    hr: "/usluge/ai-savjetovanje",
    en: "/services/ai-consulting",
  },
  [ROUTES.productivity]: {
    hr: "/usluge/engineering-produktivnost",
    en: "/services/productivity",
  },
  [ROUTES.quality]: {
    hr: "/usluge/privatnost-i-kvaliteta",
    en: "/services/gdpr-quality",
  },
  [ROUTES.blog]: {
    hr: "/blog",
    en: "/blog",
  },
  [BLOG_ARTICLE_ROUTES.aiAdoption]: {
    hr: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.aiAdoption.hr}`,
    en: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.aiAdoption.en}`,
  },
  [BLOG_ARTICLE_ROUTES.softwareModernization]: {
    hr: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.softwareModernization.hr}`,
    en: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.softwareModernization.en}`,
  },
  [BLOG_ARTICLE_ROUTES.claudeCodeSubagents]: {
    hr: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.claudeCodeSubagents.hr}`,
    en: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.claudeCodeSubagents.en}`,
  },
  [BLOG_ARTICLE_ROUTES.openClawUsage]: {
    hr: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.openClawUsage.hr}`,
    en: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.openClawUsage.en}`,
  },
  [BLOG_ARTICLE_ROUTES.notebookLmWorkflow]: {
    hr: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.notebookLmWorkflow.hr}`,
    en: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.notebookLmWorkflow.en}`,
  },
  [BLOG_ARTICLE_ROUTES.claudeCodeSkills]: {
    hr: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.claudeCodeSkills.hr}`,
    en: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.claudeCodeSkills.en}`,
  },
  [BLOG_ARTICLE_ROUTES.aiContextManagement]: {
    hr: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.aiContextManagement.hr}`,
    en: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.aiContextManagement.en}`,
  },
  [BLOG_ARTICLE_ROUTES.specDrivenDevelopment]: {
    hr: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.specDrivenDevelopment.hr}`,
    en: `${ROUTES.blog}/${BLOG_ARTICLE_LOCALIZED_SLUGS.specDrivenDevelopment.en}`,
  },
  [ROUTES.contact]: {
    hr: "/kontakt",
    en: "/contact",
  },
  [ROUTES.privacy]: {
    hr: "/privatnost",
    en: "/privacy",
  },
  [ROUTES.terms]: {
    hr: "/uvjeti-koristenja",
    en: "/terms",
  },
} as const satisfies Record<string, Record<SiteLocale, string>>;
