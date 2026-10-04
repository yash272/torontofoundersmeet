import { z } from "zod";
const text = (min: number, max: number) => z.string().trim().min(min).max(max);
const common = {
  email: z.email().trim().toLowerCase().max(254),
  website: z.string().max(0).optional().default(""),
  consent: z.literal(true),
};
export const submissionSchema = z.discriminatedUnion("type", [
  z.object({ ...common, type: z.literal("newsletter") }),
  z.object({
    ...common,
    type: z.literal("membership"),
    name: text(2, 100),
    company: text(0, 150).optional(),
    role: text(0, 100).optional(),
  }),
  z.object({
    ...common,
    type: z.literal("speaker"),
    name: text(2, 100),
    linkedin: z.url().refine((v) => {
      const u = new URL(v);
      return u.protocol === "https:" && /(^|\.)linkedin\.com$/.test(u.hostname);
    }, "Enter a valid LinkedIn profile URL."),
    company: text(2, 150),
    role: text(2, 100),
    lesson: text(30, 3000),
    experience: text(30, 3000),
    message: text(0, 3000).optional(),
  }),
  z.object({
    ...common,
    type: z.literal("partner"),
    name: text(2, 100),
    company: text(2, 150),
    interest: z.enum([
      "Community partner",
      "Event partner",
      "Ecosystem partner",
      "Let’s figure it out",
    ]),
    message: text(20, 3000),
  }),
]);
export type Submission = z.infer<typeof submissionSchema>;
export type FormType = Submission["type"];
export const formContent = {
  newsletter: {
    button: "Join the list",
    success: "You’re on the list.",
    detail:
      "Your signup has been received. We’ll be in touch when there’s something worth sharing.",
  },
  membership: {
    button: "Join the waitlist",
    success: "There’s a place for you on the list.",
    detail:
      "Your interest has been received. We’ll share membership details before it launches.",
  },
  speaker: {
    button: "Send your application",
    success: "A good lesson starts here.",
    detail:
      "Your application has been received. The team will review it and follow up if there’s a fit.",
  },
  partner: {
    button: "Start a conversation",
    success: "Let’s make a good room happen.",
    detail:
      "Your inquiry has been received. The team will review it and get back to you.",
  },
};
