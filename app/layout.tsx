import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f97316',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "HOTFIX d.o.o.",
  title: {
    default: "HOTFIX d.o.o. — AI & Software Consulting",
    template: "%s — HOTFIX d.o.o.",
  },
  description:
    "HOTFIX d.o.o. is a Croatian AI and software consulting firm. We help teams adopt Claude Code, modernize codebases, and deliver software more reliably.",
  keywords: [
    "AI consulting",
    "software consulting",
    "Claude Code consulting",
    "AI-assisted development",
    "multi-agent systems",
    "software architecture",
    "custom software development",
    "software modernization",
    "engineering process consulting",
    "HOTFIX d.o.o.",
    "HOTFIX",
    "Croatia",
    "Hrvatska",
  ],
  authors: [
    { name: "Josip Budalić", url: `${SITE_URL}/about` },
    { name: "HOTFIX d.o.o." },
  ],
  creator: "Josip Budalić",
  publisher: "HOTFIX d.o.o.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "HOTFIX d.o.o.",
    title: "HOTFIX d.o.o. — AI & Software Consulting",
    description: "Practical AI and software consulting: AI adoption, Claude Code workflows, software architecture, custom development, and more reliable delivery.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "HOTFIX d.o.o. — AI and software consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOTFIX d.o.o. — AI & Software Consulting",
    description: "AI consulting, software consulting, Claude Code enablement, architecture, and custom software development.",
    images: [`${SITE_URL}/opengraph-image`],
  },
  category: 'technology',
  other: {
    "apple-mobile-web-app-title": "HOTFIX d.o.o.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
