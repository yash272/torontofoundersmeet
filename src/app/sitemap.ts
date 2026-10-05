import type { MetadataRoute } from "next";
import { site } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  if (site.demo) return [];
  return [
    {
      url: new URL("/", site.origin).href,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
