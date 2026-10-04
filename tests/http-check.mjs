import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const origin = process.env.TEST_FORM_ORIGIN || base;
const paths = [
  "/",
  "/events",
  "/events/the-first-1000-users",
  "/events/the-first-ten-hires",
  "/events/raising-before-youre-ready",
  "/events/something-people-actually-want",
  "/past-talks",
  "/about",
  "/speak",
  "/membership",
  "/partners",
  "/contact",
  "/privacy",
  "/robots.txt",
  "/sitemap.xml",
  "/opengraph-image",
  "/icon.svg",
];
for (const path of paths) {
  const r = await fetch(base + path);
  assert.equal(r.status, 200, path);
  const t = await r.text();
  if (
    path != "/opengraph-image" &&
    path != "/icon.svg" &&
    path != "/robots.txt" &&
    path != "/sitemap.xml"
  ) {
    assert.ok(t.includes("<h1"), path + " heading");
    assert.ok(t.includes('rel="canonical"'), path + " canonical");
    assert.ok(t.includes("twitter:card"), path + " twitter");
    assert.ok(
      !t.includes("application/ld+json"),
      path + " demo content must not emit Event schema",
    );
  }
  console.log("PASS", path);
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
