import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  events,
  eventState,
  upcomingEvents,
  pastEvents,
} from "../src/content/events";
import { submissionSchema } from "../src/lib/forms";
import { saveSubmission } from "../src/lib/submissions";
const upcoming = events[0];
test("dates move open and sold-out events into the archive after the event ends", () => {
  assert.equal(eventState(upcoming, new Date("2026-10-22T22:00:00Z")), "open");
  assert.equal(eventState(upcoming, new Date("2026-10-23T02:00:00Z")), "past");
  assert.equal(
    eventState(
      { ...upcoming, status: "sold-out" },
      new Date("2026-10-23T02:00:00Z"),
    ),
    "past",
  );
  assert.ok(
    upcomingEvents(new Date("2026-10-01")).some((e) => e.id === upcoming.id),
  );
  assert.ok(
    pastEvents(new Date("2026-11-01")).some((e) => e.id === upcoming.id),
  );
});
test("cancelled and draft events never become advertised upcoming events", () => {
  assert.equal(
    eventState({ ...upcoming, status: "cancelled" }, new Date("2027-01-01")),
    "cancelled",
  );
  assert.equal(
    eventState({ ...upcoming, status: "draft" }, new Date("2027-01-01")),
    "draft",
  );
});
test("form schema rejects invalid email, missing consent and honeypot values", () => {
  assert.equal(
    submissionSchema.safeParse({
      type: "newsletter",
      email: "bad",
      consent: true,
    }).success,
    false,
  );
  assert.equal(
    submissionSchema.safeParse({
      type: "newsletter",
      email: "test@example.com",
      consent: false,
    }).success,
    false,
  );
  assert.equal(
    submissionSchema.safeParse({
      type: "newsletter",
      email: "test@example.com",
      consent: true,
      website: "spam",
    }).success,
    false,
  );
  assert.equal(
    submissionSchema.safeParse({
      type: "newsletter",
      email: "test@example.com",
      consent: true,
    }).success,
    true,
  );
});
test("speaker form requires a real LinkedIn host and meaningful answers", () => {
  const sample = {
    type: "speaker",
    email: "speaker@example.com",
    consent: true,
    name: "Test Speaker",
    company: "Example",
    role: "Founder",
    lesson: "A concrete lesson learned from the first ten customer interviews.",
    experience:
      "I interviewed the customers and ran the process for our early team.",
    linkedin: "https://www.linkedin.com/in/example",
  };
  assert.equal(submissionSchema.safeParse(sample).success, true);
  assert.equal(
    submissionSchema.safeParse({
      ...sample,
      linkedin: "https://linkedin.com.example.com/in/example",
    }).success,
    false,
  );
  assert.equal(
    submissionSchema.safeParse({ ...sample, lesson: "A lesson" }).success,
    false,
  );
});
test("all four form payloads persist durably without overwriting concurrent submissions", async () => {
  const directory = await mkdtemp(join(tmpdir(), "founders-submissions-"));
  const oldDirectory = process.env.FORM_DATA_DIR;
  const oldStorage = process.env.FORM_STORAGE;
  process.env.FORM_STORAGE = "file";
  process.env.FORM_DATA_DIR = directory;
  try {
    const payloads = [
      { type: "newsletter", email: "test@example.com", consent: true },
      {
        type: "membership",
        email: "test@example.com",
        consent: true,
        name: "Test Member",
      },
      {
        type: "speaker",
        email: "test@example.com",
        consent: true,
        name: "Test Speaker",
        company: "Example",
        role: "Founder",
        linkedin: "https://linkedin.com/in/test",
        lesson: "A useful and specific lesson with enough detail to review.",
        experience: "I personally did this work and can explain the process.",
      },
      {
        type: "partner",
        email: "test@example.com",
        consent: true,
        name: "Test Partner",
        company: "Example",
        interest: "Event partner",
        message: "We would like to host a small workshop in our space.",
      },
    ];
    const ids = await Promise.all(
      payloads.map((p) => saveSubmission(submissionSchema.parse(p))),
    );
    assert.equal(new Set(ids).size, 4);
    assert.equal((await readdir(directory)).length, 4);
    const record = JSON.parse(
      await readFile(join(directory, `${ids[0]}.json`), "utf8"),
    );
    assert.equal(record.data.email, "test@example.com");
    assert.equal(record.data.website, undefined);
    assert.ok(record.receivedAt);
  } finally {
    if (oldDirectory === undefined) delete process.env.FORM_DATA_DIR;
    else process.env.FORM_DATA_DIR = oldDirectory;
    if (oldStorage === undefined) delete process.env.FORM_STORAGE;
    else process.env.FORM_STORAGE = oldStorage;
    await rm(directory, { recursive: true, force: true });
  }
});
