# Founders & Pitchers

The website for Founders & Pitchers, a Toronto community for founders, operators and builders. GitHub repository: [torontofoundersmeet](https://github.com/yash272/torontofoundersmeet).

An original Toronto founder-community site built with Next.js App Router, TypeScript, Tailwind CSS and restrained CSS motion. Fonts and imagery are served locally. No reference-site branding, photography or implementation is used.

## Run

Node 22 or newer is recommended.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. `npm run build && npm start` runs the production build. `npm run typecheck`, `npm run lint`, and `npm test` run the checks.

## Cloudflare Workers deployment

The repository includes an explicit OpenNext configuration for the Worker **`torontofoundersmeet`**. Keep `wrangler.jsonc` → `name` and `services` → `WORKER_SELF_REFERENCE` → `service` identical to the Worker name in Cloudflare. The public brand remains Founders & Pitchers; it does not need to match the infrastructure name. A mismatch here causes Cloudflare error 10143.

In the Worker's **Settings → Build**, use the repository root and production branch `main`:

| Setting | Value |
| --- | --- |
| Build command | Leave empty; the deploy command builds the app |
| Deploy command | `npm run deploy:cloudflare` |
| Non-production branch deploy command, if enabled | `npm run upload:cloudflare` |

Both deployment scripts build Next.js and the OpenNext Worker before publishing. Replace the default `npx wrangler deploy` command with the script above: Wrangler detects OpenNext but does not create the compiled OpenNext config. A plain `npm run build` also produces only the Next.js output, which is insufficient for Workers. If you see “Could not find compiled Open Next config,” check that Cloudflare is using the exact deploy command above and deploying the latest `main` commit.

Set `NEXT_PUBLIC_SITE_URL` to the actual HTTPS website origin in the **build variables**, then rebuild. Leave `NEXT_PUBLIC_DEMO_MODE=true` until real content is ready. These public values are compiled into the app, so changing runtime variables alone will not update them.

Add `FORM_WEBHOOK_URL` and, if required by your provider, `FORM_WEBHOOK_TOKEN` as **runtime secrets** under Settings → Variables & Secrets. Wrangler already sets `FORM_STORAGE=webhook`; Workers cannot use the local file adapter for durable submissions. Until a provider is configured, forms return an honest delivery error. Never commit webhook credentials.

For a local Workers preview, run `npm run preview:cloudflare`. To build and deploy from an authenticated terminal, run `npm run deploy:cloudflare`. To check the complete build and deployment packaging without publishing, run `npm run deploy:cloudflare -- --dry-run`. The configuration uses Cloudflare Images for `next/image` optimization and does not require an R2 bucket. See the [OpenNext setup guide](https://opennext.js.org/cloudflare/get-started) for the adapter's binding requirements.

## Content and configuration

- `src/content/site.ts`: the single brand name, navigation, homepage copy, FAQs, benefits, partner offerings, and social profiles.
- `src/content/events.ts`: typed event content and the automatic upcoming/past classification. All sample records are explicitly `isDemo: true` and visibly labeled. Replace the records; do not relabel invented speakers as real.
- `src/lib/forms.ts`: shared server/client validation and form messages.
- `src/lib/submissions.ts`: the submission provider boundary.
- `src/components/submission-form.tsx`: field definitions and accessible loading, validation, error and success states.
- `src/app/globals.css`: shared typography, design tokens and interior page layouts.
- `src/app/home.css`: the homepage programme, photographic compositions and mobile layouts.
- `src/components/evening-schedule.tsx`: the interactive evening programme, with keyboard-accessible tabs and reduced-motion support.

Routes: `/`, `/events`, `/events/[slug]`, `/past-talks`, `/about`, `/speak`, `/membership`, `/partners`, `/contact`, `/privacy`. Past event URLs automatically render an editorial recap. Event times use `America/Toronto`; store full ISO timestamps with the correct offset for the date (EST or EDT).

Set an event’s `rsvpUrl` to an HTTPS Luma/event URL to enable external RSVP. Empty URLs invite visitors to the functional event-news signup, never to a fabricated registration. Add approved organizer and speaker portraits when provided. Empty social URLs appear as coming-soon text, not broken links. Testimonials and community posts are intentionally empty until real, permissioned content is available.

## Form delivery

All four forms POST to `/api/submissions`. Validation runs on the client and server, requires consent, caps request size, checks origin, rejects honeypot submissions and includes a bounded local rate limiter. Success means durable storage or an acknowledged delivery request, not a simulated timeout.

For development, `FORM_STORAGE=file` stores one permission-restricted JSON file per submission in `.data`. The directory is ignored by Git and never publicly served. Set `FORM_DATA_DIR` to a persistent volume only when hosting a Node server with durable storage. Do not use file storage on ephemeral/serverless hosting.

For production, configure `FORM_STORAGE=webhook`, `FORM_WEBHOOK_URL=https://...`, and optionally `FORM_WEBHOOK_TOKEN`. The adapter sends `{id, receivedAt, data}` with an idempotency key. The receiving endpoint must persist the record before returning 2xx. Connect that endpoint to Supabase, Airtable, Beehiiv, ConvertKit, Mailchimp or another provider. A missing or failed provider returns a visible retryable error; it never claims a successful signup. No provider is silently configured and no emails are sent by the local adapter.

Production should add a shared/edge rate limit appropriate to the host, deduplication and newsletter double opt-in/unsubscribe handling in the receiving provider. Only set `TRUST_PROXY=true` when your host sanitizes `X-Forwarded-For`.

## Launch configuration

1. Replace sample events and imagery with verified content. Add organizer profiles, approved portraits, real social URLs, and actual RSVP URLs. Prices and testimonials are deliberately not invented.
2. Configure durable form delivery and test all four submission types.
3. Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS origin. Set `NEXT_PUBLIC_DEMO_MODE=false` only after content is approved. Demo mode defaults to noindex, a disallow-all robots file and an empty sitemap. Demo events never emit Event structured data or enter the sitemap.
4. Finalize `/privacy` with the legal organizer, privacy contact, provider details and retention policy. The current page explicitly identifies itself as a working preview.
5. Supply unsubscribe and consent handling in the newsletter provider before public collection. Deploy with HTTPS.

Metadata, canonicals, Open Graph image, Twitter cards, favicon, robots and sitemap are included. Verified events emit Event JSON-LD. Capacity is not represented as an attendee count. Missing pricing does not become a free offer.

## Photography placeholders

These images are illustrative atmosphere references from Unsplash, not Toronto community/event documentation. Visible labels make that distinction. Replace each file with real permissioned event photography using the same aspect ratio or adjust `object-position`.

- `the-room.jpg`: https://images.unsplash.com/photo-1528605248644-14dd04022da1 — replace with candid conversations at a Toronto event.
- `the-lesson.jpg`: https://images.unsplash.com/photo-1517457373958-b7bdd4587205 — replace with a small workshop audience.
- `after-hours.jpg`: https://images.unsplash.com/photo-1514933651103-005eec06c04b — replace with the actual venue after dark.
- `the-space.jpg`: https://images.unsplash.com/photo-1517248135467-4c7edcad34c4 — replace with an actual Toronto venue interior.

Instrument Serif and Manrope are distributed under the SIL Open Font License. Their license files are included in `public/fonts`.

## Dependency audit note

The install audit currently reports the unpatched `braces <=3.0.3` advisory [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) through ESLint’s development-only glob matcher. It is not a runtime dependency of the forms or pages, and no user input is passed into that build-time matcher. There is no published upstream patch as of this build; keep lint inputs trusted and update the toolchain when one is available.
