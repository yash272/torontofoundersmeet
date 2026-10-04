import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Content is rebuilt on deploy; no R2 resource is required for this site.
export default defineCloudflareConfig();
