import { NextResponse } from "next/server";
import { submissionSchema } from "@/lib/forms";
import { saveSubmission } from "@/lib/submissions";
import { createHash } from "node:crypto";
export const runtime = "nodejs";
const windows = new Map<string, { count: number; expires: number }>();
function respond(body: object, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowed = new URL(process.env.NEXT_PUBLIC_SITE_URL || request.url)
    .origin;
  if (origin && origin !== allowed)
    return respond({ error: "Please send this form from our website." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return respond({ error: "Use a JSON request." }, 415);
  if (Number(request.headers.get("content-length") || 0) > 20_000)
    return respond({ error: "Your message is too long." }, 413);
  let body: unknown;
  try {
    // Stream with a real byte limit; do not trust Content-Length alone.
    const reader = request.body?.getReader();
    if (!reader) return respond({ error: "The form is empty." }, 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 20_000) {
        await reader.cancel();
        return respond({ error: "Your message is too long." }, 413);
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return respond(
      { error: "We couldn’t read the form. Please try again." },
      400,
    );
  }
  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    const fields = Object.fromEntries(
      parsed.error.issues.map((issue) => [issue.path[0], issue.message]),
    );
    return respond(
      { error: "Please check the highlighted fields.", fields },
      422,
    );
  }
  const now = Date.now();
  for (const [key, value] of windows)
    if (value.expires < now) windows.delete(key);
  // Trusted proxy opt-in avoids treating attacker-controlled headers as reliable IPs.
  // Add shared storage or an edge rate limit for a multi-instance production deployment.
  const identity =
    process.env.TRUST_PROXY === "true"
      ? request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        parsed.data.email
      : parsed.data.email;
  const key = createHash("sha256").update(identity).digest("hex");
  const window = windows.get(key);
  if (window && window.count >= 5)
    return respond(
      { error: "A few too many attempts. Please try again in 15 minutes." },
      429,
    );
  windows.set(key, {
    count: (window?.count || 0) + 1,
    expires: window?.expires || now + 900_000,
  });
  if (windows.size > 10_000) windows.delete(windows.keys().next().value!);
  try {
    const id = await saveSubmission(parsed.data);
    return respond({ success: true, id }, 201);
  } catch {
    return respond(
      { error: "We couldn’t save your details. Please try again in a moment." },
      503,
    );
  }
}
