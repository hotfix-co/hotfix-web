import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Enable strict mode for better React practices
  reactStrictMode: true,

  // Performance optimizations
  poweredByHeader: false,

  // Compression
  compress: true,

  turbopack: {
    root: process.cwd(),
  },

  async redirects() {
    return [
      // Service slug renames (May 2026) — old EN slugs 301 to keyword-targeted slugs.
      {
        source: "/en/services/productivity",
        destination: "/en/services/ai-assisted-development",
        permanent: true,
      },
      {
        source: "/en/services/gdpr-quality",
        destination: "/en/services/gdpr-compliance",
        permanent: true,
      },
      // Croatian slugs on English-prefixed URLs should resolve to the English URL.
      {
        source: "/en/blog/claude-code-subagenti-code-review",
        destination: "/en/blog/claude-code-subagents",
        permanent: true,
      },
      {
        source: "/en/blog/openclaw-automatizacija-github-issuea",
        destination: "/en/blog/openclaw-usage",
        permanent: true,
      },
      {
        source: "/en/blog/notebooklm-workflow-brze-ucenje",
        destination: "/en/blog/notebooklm-workflow-learning-faster",
        permanent: true,
      },
      {
        source: "/en/blog/claude-code-skills-produktivnost",
        destination: "/en/blog/claude-code-skills-productivity",
        permanent: true,
      },
      {
        source: "/en/blog/upravljanje-ai-kontekstom",
        destination: "/en/blog/ai-context-management-lessons",
        permanent: true,
      },
      {
        source: "/en/blog/spec-driven-development-ai",
        destination: "/en/blog/spec-driven-development",
        permanent: true,
      },
      {
        source: "/en/blog/kako-uvesti-ai-u-razvojni-proces",
        destination: "/en/blog/bringing-ai-into-the-development-process",
        permanent: true,
      },
      {
        source: "/en/blog/modernizacija-softwarea-bez-zastoja",
        destination: "/en/blog/software-modernization-without-downtime",
        permanent: true,
      },
    ];
  },

  // Add headers for better caching and font loading
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.woff2",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
