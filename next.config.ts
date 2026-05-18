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
      // Legacy English blog slugs → Croatian (default locale)
      {
        source: "/blog/claude-code-subagents",
        destination: "/blog/claude-code-subagenti-code-review",
        permanent: true,
      },
      {
        source: "/blog/openclaw-usage",
        destination: "/blog/openclaw-automatizacija-github-issuea",
        permanent: true,
      },
      {
        source: "/blog/notebooklm-workflow-learning-faster",
        destination: "/blog/notebooklm-workflow-brze-ucenje",
        permanent: true,
      },
      {
        source: "/blog/claude-code-skills-productivity",
        destination: "/blog/claude-code-skills-produktivnost",
        permanent: true,
      },
      {
        source: "/blog/ai-context-management-lessons",
        destination: "/blog/upravljanje-ai-kontekstom",
        permanent: true,
      },
      {
        source: "/blog/spec-driven-development",
        destination: "/blog/spec-driven-development-ai",
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
