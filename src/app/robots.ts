import type { MetadataRoute } from "next";
import { site } from "@/content/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(site.demo || site.origin.includes("localhost")
        ? { disallow: "/" }
        : { allow: "/", disallow: "/api/" }),
    },
    sitemap: `${site.origin}/sitemap.xml`,
  };
}
