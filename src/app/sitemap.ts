import type { MetadataRoute } from "next";
import { events } from "@/content/events";
import { site } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  if (site.demo) return [];
  return [
    ...[
      "",
      "/events",
      "/past-talks",
      "/about",
      "/speak",
      "/membership",
      "/partners",
      "/contact",
    ].map((path) => ({
      url: `${site.origin}${path}`,
      changeFrequency: "weekly" as const,
      priority: path ? 0.7 : 1,
    })),
    ...events
      .filter((e) => !e.isDemo && e.status !== "draft")
      .map((e) => ({
        url: `${site.origin}/events/${e.slug}`,
        lastModified: e.createdAt,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
