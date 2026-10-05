import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const origin = process.env.TEST_FORM_ORIGIN || base;
const homepage = await fetch(base + "/");
assert.equal(homepage.status, 200);
const html = await homepage.text();
assert.equal((html.match(/<h1[ >]/g) || []).length, 1, "one page heading");
assert.ok(html.includes('rel="canonical"'));
assert.ok(html.includes("twitter:card"));
assert.ok(
  !html.includes("application/ld+json"),
  "demo events must not emit Event schema",
);
const anchors = [...html.matchAll(/\bid="([^" ]+)"/g)].map((match) => match[1]);
assert.equal(
  new Set(anchors).size,
  anchors.length,
  "unique IDs across all forms and sections",
);
for (const match of html.matchAll(/href="(\/?#[^"]+)"/g)) {
  assert.ok(
    anchors.includes(decodeURIComponent(match[1].split("#")[1])),
    `anchor target ${match[1]}`,
  );
}
for (const match of html.matchAll(/href="(\/[^"#]*)"/g)) {
  if (
    match[1].startsWith("/_next/") ||
    match[1].startsWith("/fonts/") ||
    match[1].startsWith("/icon")
  )
    continue;
  assert.equal(
    match[1],
    "/",
    `internal navigation stays on homepage: ${match[1]}`,
  );
}
for (const field of ["lesson", "experience", "interest", "role"]) {
  assert.ok(
    html.includes(`name="${field}"`),
    `application field ${field} is on the homepage`,
  );
}
console.log(
  "PASS homepage, unique IDs, all anchor targets, inline application fields",
);
const redirects = {
  "/events": "next-up",
  "/past-talks": "past-talks",
  "/about": "about",
  "/speak": "speaker-application",
  "/membership": "membership-waitlist",
  "/partners": "partner-inquiry",
  "/contact": "contact",
  "/privacy": "privacy",
  "/events/the-first-1000-users": "event-the-first-1000-users",
  "/events/the-first-ten-hires": "event-the-first-ten-hires",
  "/events/raising-before-youre-ready": "event-raising-before-youre-ready",
  "/events/something-people-actually-want":
    "event-something-people-actually-want",
};
for (const [path, id] of Object.entries(redirects)) {
  const response = await fetch(base + path, { redirect: "manual" });
  assert.equal(response.status, 308, path);
  const destination = new URL(response.headers.get("location"), base);
  assert.equal(destination.pathname, "/", path);
  assert.equal(destination.hash, `#${id}`, path);
  assert.ok(anchors.includes(id), `legacy destination ${id} exists`);
}
console.log("PASS all 12 legacy URLs redirect to existing homepage sections");
for (const path of [
  "/robots.txt",
  "/sitemap.xml",
  "/opengraph-image",
  "/icon.svg",
]) {
  assert.equal((await fetch(base + path)).status, 200, path);
}
assert.equal((await fetch(base + "/events/not-an-event")).status, 404);
const post = (body) =>
  fetch(base + "/api/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(body),
  });
assert.equal(
  (await post({ type: "newsletter", email: "bad", consent: true })).status,
  422,
);
assert.equal(
  (
    await post({
      type: "newsletter",
      email: "test@example.com",
      consent: false,
    })
  ).status,
  422,
);
assert.equal(
  (
    await fetch(base + "/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://untrusted.example",
      },
      body: "{}",
    })
  ).status,
  403,
);
assert.equal(
  (
    await fetch(base + "/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{",
    })
  ).status,
  400,
);
assert.equal(
  (
    await post({
      type: "newsletter",
      email: "test@example.com",
      consent: true,
      extra: "x".repeat(21000),
    })
  ).status,
  413,
);
console.log(
  "PASS invalid forms, consent, origin, malformed JSON, request-size limit, missing event 404",
);
