import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HOTFIX d.o.o. — AI and software consulting",
    short_name: "HOTFIX",
    description:
      "AI and software consulting from Croatia. Claude Code workflows, software architecture, custom development, and modernization.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f97316",
    lang: "en",
    dir: "ltr",
    categories: ["business", "productivity", "developer"],
    icons: [
      // Next.js emits /icon.png from app/icon.png as a 512x512 PNG of the
      // square HOTFIX mark. Referencing it here makes the same image the
      // PWA / Android home-screen icon, keeping a single source of truth.
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
