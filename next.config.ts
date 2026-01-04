import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
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
};

export default nextConfig;
