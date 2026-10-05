import type { NextConfig } from "next";
import { events } from "./src/content/events";
const config: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  images: { formats: ["image/webp"] },
  async redirects() {
    return [
      ...Object.entries({
        "/events": "next-up",
        "/past-talks": "past-talks",
        "/about": "about",
        "/speak": "speaker-application",
        "/membership": "membership-waitlist",
        "/partners": "partner-inquiry",
        "/contact": "contact",
        "/privacy": "privacy",
      }).map(([source, anchor]) => ({
        source,
        destination: `/#${anchor}`,
        permanent: true,
      })),
      ...events
        .filter((event) => event.status !== "draft")
        .map((event) => ({
          source: `/events/${event.slug}`,
          destination:
            event.status === "cancelled"
              ? "/#next-up"
              : `/#event-${event.slug}`,
          permanent: true,
        })),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};
export default config;
