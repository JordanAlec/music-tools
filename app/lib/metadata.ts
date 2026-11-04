import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};
