import { mkdir, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { randomUUID } from "node:crypto";
import type { Submission } from "./forms";
export type SubmissionRecord = {
  id: string;
  receivedAt: string;
  data: Omit<Submission, "website">;
};
// Provider boundary: replace this function with a Supabase, Airtable or email-provider adapter.
// Return only after a durable write or a successful provider acknowledgement.
export async function saveSubmission(input: Submission) {
  const { website: _honeypot, ...data } = input;
  void _honeypot;
  const record: SubmissionRecord = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    data,
  };
  const storage =
    process.env.FORM_STORAGE ||
    (process.env.NODE_ENV === "production" ? "webhook" : "file");
  if (storage === "webhook") {
    const url = process.env.FORM_WEBHOOK_URL;
    if (!url || new URL(url).protocol !== "https:")
      throw new Error("Submission provider is not configured.");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": record.id,
        ...(process.env.FORM_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.FORM_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok)
      throw new Error("Submission provider did not acknowledge the request.");
  } else if (storage === "file") {
    const directory = resolve(
      /* turbopackIgnore: true */ process.env.FORM_DATA_DIR || ".data",
    );
    await mkdir(directory, { recursive: true, mode: 0o700 });
    // One exclusively-created file per record avoids read/modify/write races.
    await writeFile(
      join(directory, `${record.id}.json`),
      JSON.stringify(record) + "\n",
      { flag: "wx", mode: 0o600 },
    );
  } else throw new Error("Unknown submission provider.");
  return record.id;
}
