import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Bot policy.
//
// We explicitly allow the major AI search-and-cite bots so they can index and
// cite our content in AI Overviews, ChatGPT, Claude, Perplexity, and Copilot.
// Blocking them would prevent citation, not training (training is mostly done
// from older crawls). If we later want to block training-only crawlers
// (CCBot from Common Crawl), add a Disallow rule for that user agent
// specifically.
const ALLOWED_AI_BOTS = [
  "GPTBot", // OpenAI / ChatGPT crawler
  "ChatGPT-User", // ChatGPT live browsing
  "OAI-SearchBot", // OpenAI search
  "ClaudeBot", // Anthropic / Claude crawler
  "anthropic-ai", // Anthropic legacy UA
  "Claude-Web", // Claude live browsing
  "PerplexityBot", // Perplexity crawler
  "Perplexity-User", // Perplexity live browsing
  "Google-Extended", // Google Gemini + AI Overviews opt-in
  "Applebot-Extended", // Apple Intelligence opt-in
  "meta-externalagent", // Meta AI
] as const;

// Training-only crawlers we don't want scraping the site without citation.
const BLOCKED_TRAINING_BOTS = ["CCBot"] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      ...ALLOWED_AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
      ...BLOCKED_TRAINING_BOTS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
