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
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    "HOTFIX d.o.o., founded by Josip Budalic, is a professional Croatian full-stack and mobile development company specializing in C#, React, Golang, Kotlin (including KMM), and Swift. We deliver robust, scalable, cross-platform solutions for modern businesses worldwide.",
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
    "Josip Budalic",
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
    { name: "Josip Budalic", url: "https://hotfix-doo.com/about" },
    { name: "HOTFIX d.o.o." }
  ],
  creator: "Josip Budalic",
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
      { url: "/logo_without_bg.png" },
      { url: "/logo_without_bg.png", sizes: "32x32", type: "image/png" },
      { url: "/logo_without_bg.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logo_without_bg.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hotfix-doo.com",
    siteName: "HOTFIX d.o.o.",
    title: "HOTFIX d.o.o. | Full-Stack & Mobile Development Company Croatia",
    description: "Professional Croatian full-stack and mobile development services in C#, React, Golang, Kotlin, and Swift. Founded by Josip Budalic.",
    images: [
      {
        url: "/logo_without_bg.png",
        width: 1200,
        height: 630,
        alt: "HOTFIX d.o.o. - Full-Stack & Mobile Development Company",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOTFIX d.o.o. | Full-Stack & Mobile Development Company Croatia",
    description: "Professional Croatian full-stack and mobile development services in C#, React, Golang, Kotlin, and Swift.",
    images: ["/logo_without_bg.png"],
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
