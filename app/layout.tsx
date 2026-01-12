import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/structuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
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
  themeColor: '#dc2626',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://hotfix-doo.com'),
  title: {
    default: "HOTFIX d.o.o. | Full-Stack & Mobile Development Company Croatia",
    template: "%s | HOTFIX d.o.o.",
  },
  description:
    "HOTFIX d.o.o., founded by Josip Budalić, is a professional EU-based full-stack and mobile development company in Croatia specializing in C#, React, Golang, Kotlin (including KMM), and Swift. We deliver robust, scalable, cross-platform solutions for businesses worldwide.",
  keywords: [
    "Full-Stack Development",
    "Mobile Development",
    "C# Development",
    "React Development",
    "Golang Development",
    "Kotlin Development",
    "Kotlin Multiplatform Mobile",
    "KMM Development",
    "Swift Development",
    "Android Development",
    "iOS Development",
    "Cross-Platform Mobile Development",
    "Web Development",
    "Software Development Croatia",
    "Croatian Software Developers",
    "Josip Budalić",
    "HOTFIX d.o.o.",
    "C# .NET Development Services",
    "React Next.js Development",
    "Kotlin Android Development",
    "Swift iOS Development",
    "Custom Software Development",
    "Enterprise Web Application Development",
    "Backend Development Services",
    "Frontend Development Services",
    "Mobile App Development",
    "Microservices Architecture",
    "API Development",
  ],
  authors: [
    { name: "Josip Budalić", url: "https://hotfix-doo.com/about" },
    { name: "HOTFIX d.o.o." }
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
  alternates: {
    canonical: "https://hotfix-doo.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hotfix-doo.com",
    siteName: "HOTFIX d.o.o.",
    title: "HOTFIX d.o.o. | Full-Stack & Mobile Development Company Croatia",
    description: "Professional EU-based full-stack and mobile development services in C#, React, Golang, Kotlin, and Swift. Founded by Josip Budalić in Croatia.",
    images: [
      {
        url: "https://hotfix-doo.com/logo_without_bg.png",
        width: 1200,
        height: 630,
        alt: "HOTFIX d.o.o. - Full-Stack & Mobile Development Company",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOTFIX d.o.o. | Full-Stack & Mobile Development Company Croatia",
    description: "Professional EU-based full-stack and mobile development services in C#, React, Golang, Kotlin, and Swift from Croatia.",
    images: ["https://hotfix-doo.com/logo_without_bg.png"],
    creator: "@hotfix",
  },
  verification: {
    // Add these when you set up Google Search Console and Bing Webmaster Tools
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData data={[organizationSchema, websiteSchema, localBusinessSchema]} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
