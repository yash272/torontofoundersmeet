import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { POST } from "../src/app/api/submissions/route";
const request = (body: unknown, origin = "http://localhost:3000") =>
  new Request("http://localhost:3000/api/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(body),
  });
test("API rejects invalid, cross-origin, malformed and oversized input without writing it", async () => {
  assert.equal(
    (await POST(request({ type: "newsletter", email: "bad", consent: true })))
      .status,
    422,
  );
  assert.equal(
    (
      await POST(
        request({
          type: "newsletter",
          email: "test@example.com",
          consent: false,
        }),
      )
    ).status,
    422,
  );
  assert.equal((await POST(request({}, "https://other.example"))).status, 403);
  assert.equal(
    (
      await POST(
        new Request("http://localhost:3000/api/submissions", {
          method: "POST",
          body: "bad",
        }),
      )
    ).status,
    415,
  );
  assert.equal(
    (
      await POST(
        new Request("http://localhost:3000/api/submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{",
        }),
      )
    ).status,
    400,
  );
  assert.equal((await POST(request({ extra: "a".repeat(21000) }))).status, 413);
});
test("API acknowledges durable storage and rate-limits repeated submissions", async () => {
  const directory = await mkdtemp(join(tmpdir(), "founders-api-"));
  process.env.FORM_STORAGE = "file";
  process.env.FORM_DATA_DIR = directory;
  try {
    for (let i = 0; i < 5; i++) {
      const response = await POST(
        request({
          type: "newsletter",
          email: "rate-limit-test@example.com",
          consent: true,
        }),
      );
      assert.equal(response.status, 201);
      assert.ok((await response.json()).id);
    }
    assert.equal(
      (
        await POST(
          request({
            type: "newsletter",
            email: "rate-limit-test@example.com",
            consent: true,
          }),
        )
      ).status,
      429,
    );
    assert.equal((await readdir(directory)).length, 5);
  } finally {
    delete process.env.FORM_STORAGE;
    delete process.env.FORM_DATA_DIR;
    await rm(directory, { recursive: true, force: true });
  }
});
test("a missing production delivery provider never returns a false success", async () => {
  process.env.FORM_STORAGE = "webhook";
  delete process.env.FORM_WEBHOOK_URL;
  try {
    assert.equal(
      (
        await POST(
          request({
            type: "newsletter",
            email: "unavailable-test@example.com",
            consent: true,
          }),
        )
      ).status,
      503,
    );
  } finally {
    delete process.env.FORM_STORAGE;
  }
});
