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
  title: {
    default: "HOTFIX d.o.o. | AI & Software Consulting",
    template: "%s | HOTFIX d.o.o.",
  },
  description:
    "AI and software consulting for companies that want to integrate AI into real processes, make clearer technical decisions, and deliver software more reliably.",
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
    title: "HOTFIX d.o.o. | AI & Software Consulting",
    description: "Practical AI and software consulting: AI adoption, Claude Code workflows, software architecture, custom development, and more reliable delivery.",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: "HOTFIX d.o.o. logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOTFIX d.o.o. | AI & Software Consulting",
    description: "AI consulting, software consulting, Claude Code enablement, architecture, and custom software development.",
    images: [`${SITE_URL}/logo.png`],
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
