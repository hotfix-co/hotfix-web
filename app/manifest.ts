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
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
