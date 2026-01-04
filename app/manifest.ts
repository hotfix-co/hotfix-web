import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HOTFIX d.o.o. - Full-Stack & Mobile Development Company",
    short_name: "HOTFIX",
    description:
      "Professional full-stack and mobile development services in C#, React, Golang, Kotlin, and Swift",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#dc2626",
    icons: [
      {
        src: "/logo_without_bg.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo_without_bg.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

