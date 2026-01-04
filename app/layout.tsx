import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hotfix-doo.com'),
  title: "HOTFIX d.o.o. | Full-Stack & Mobile Development Company",
  description:
    "HOTFIX d.o.o. is a professional full-stack and mobile development company specializing in C#, React, Golang, Kotlin, and Swift. We deliver robust, scalable solutions for modern businesses.",
  keywords: ["Full-Stack Development", "Mobile Development", "C#", "React", "Golang", "Kotlin", "Swift", "Android", "iOS", "Web Development", "HOTFIX"],
  authors: [{ name: "HOTFIX d.o.o." }],
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
    title: "HOTFIX d.o.o. | Full-Stack & Mobile Development Company",
    description: "Professional full-stack and mobile development services in C#, React, Golang, Kotlin, and Swift",
    type: "website",
    images: [{ url: "/logo_without_bg.png", width: 1200, height: 630, alt: "HOTFIX Logo" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
