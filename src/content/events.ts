export type EventStatus = "draft" | "open" | "sold-out" | "cancelled" | "past";
export type Lesson = { title: string; body: string };
export type CommunityEvent = {
  id: string;
  slug: string;
  eventNumber: string;
  title: string;
  subtitle: string;
  description: string;
  speakerName: string;
  speakerRole: string;
  speakerCompany: string;
  speakerBio: string;
  speakerImage: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  neighbourhood: string;
  address: string;
  capacity: number;
  status: EventStatus;
  rsvpUrl: string;
  heroImage: string;
  galleryImages: string[];
  takeaways: string[];
  featured: boolean;
  createdAt: string;
  isDemo: boolean;
  lessons: Lesson[];
  oneSentence: string;
  tryThis: string;
  quote: string;
};
// DEMO CONTENT. Speakers, companies, sessions, dates and recaps are illustrative,
// not representations of actual events. Replace and set isDemo:false before publishing.
// Stock photographs are atmosphere references, never photos of the named demo speaker.
const base = {
  speakerName: "Maya Chen",
  speakerRole: "Founder",
  speakerCompany: "Example",
  speakerBio:
    "This is a sample speaker profile. Replace it with a verified, approved biography describing the speaker’s firsthand experience and the specific work behind their lesson.",
  speakerImage: "",
  date: "2026-10-22",
  startTime: "2026-10-22T19:00:00-04:00",
  endTime: "2026-10-22T21:30:00-04:00",
  venue: "An intimate room on Ossington",
  neighbourhood: "Ossington",
  address: "Venue to be announced, Toronto, ON, Canada",
  capacity: 65,
  status: "open" as EventStatus,
  rsvpUrl: "",
  heroImage: "/images/the-room.jpg",
  galleryImages: ["/images/after-hours.jpg", "/images/the-lesson.jpg"],
  featured: false,
  createdAt: "2026-10-01T12:00:00Z",
  isDemo: true,
};
export const events: CommunityEvent[] = [
  {
    ...base,
    id: "demo-001",
    slug: "the-first-1000-users",
    eventNumber: "001",
    title: "From zero to the first 1,000 users.",
    subtitle: "Getting people to care before anyone knows who you are.",
    description:
      "The first users rarely arrive through a perfect funnel. A practical conversation about finding the right people, earning their attention and doing the things that don’t scale.",
    featured: true,
    takeaways: [
      "Find the small community that already feels the problem.",
      "Turn the first ten conversations into a repeatable habit.",
      "Know which early signals are worth paying attention to.",
    ],
    lessons: [],
    oneSentence: "",
    quote: "",
    tryThis: "",
  },
  {
    ...base,
    id: "demo-002",
    slug: "the-first-ten-hires",
    eventNumber: "002",
    title: "The first ten hires.",
    subtitle: "Build a team before you have a recruiting team.",
    speakerName: "Alex Morgan",
    speakerRole: "Co-founder",
    date: "2026-09-17",
    startTime: "2026-09-17T19:00:00-04:00",
    endTime: "2026-09-17T21:30:00-04:00",
    neighbourhood: "King West",
    venue: "A room in King West",
    status: "past",
    heroImage: "/images/the-lesson.jpg",
    description:
      "An illustrative recap about making the early hiring decisions that shape everything after them.",
    takeaways: [
      "Hire for the work that needs doing now.",
      "Use real work to make the decision.",
      "Write down what success looks like before opening the role.",
    ],
    oneSentence:
      "The first ten hires don’t just build the product. They decide how the company works.",
    quote: "Write the work down before you write the job description.",
    tryThis:
      "Choose the next role you plan to hire. Write the three outcomes that person must deliver in their first 90 days. If you can’t name them, you’re not ready to open the role.",
    lessons: [
      {
        title: "Start with the work, not the title.",
        body: "A job title is a shorthand, not a plan. List the decisions you need someone to own, the work that is currently stuck, and what a useful first month would look like. The profile often changes once the work becomes specific.",
      },
      {
        title: "Make the interview resemble the job.",
        body: "Use a short, paid exercise based on a realistic problem. Give candidates the context they would have on the team. Discuss their choices together. You learn more from their questions and trade-offs than a rehearsed story.",
      },
      {
        title: "Be honest about the unfinished parts.",
        body: "Early teams come with ambiguity. Tell candidates what is still being figured out, how decisions are made, and where you need help. A clear picture gives both sides a better chance of making a decision that lasts.",
      },
      {
        title: "Write the first 90 days together.",
        body: "Agree on three outcomes, an owner for onboarding, and a weekly conversation. A new teammate shouldn’t have to reverse-engineer what a good job looks like.",
      },
    ],
  },
  {
    ...base,
    id: "demo-003",
    slug: "raising-before-youre-ready",
    eventNumber: "003",
    title: "Raising before you’re ready.",
    subtitle: "A better fundraising story starts with better evidence.",
    speakerName: "Jordan Lee",
    date: "2026-08-20",
    startTime: "2026-08-20T19:00:00-04:00",
    endTime: "2026-08-20T21:30:00-04:00",
    neighbourhood: "Queen West",
    venue: "A room in Queen West",
    status: "past",
    heroImage: "/images/after-hours.jpg",
    description:
      "An illustrative recap about the preparation, evidence and conversations behind an early fundraise.",
    takeaways: [
      "Know what the next round needs to prove.",
      "Separate interest from a commitment.",
      "Build a process before building a deck.",
    ],
    oneSentence:
      "A convincing story is a clear account of what you know, what you don’t, and what you’ll prove next.",
    quote: "The deck is the last part of the thinking, not the first.",
    tryThis:
      "Write a one-page evidence memo: the problem, who feels it, what they do today, and what your next milestone will establish. Share it with someone who will challenge the gaps.",
    lessons: [
      {
        title: "Make the milestone concrete.",
        body: "Start with the thing the next period of work needs to prove. Build the operating plan around that question, then explain what resources the plan requires. Clear milestones make the conversation more useful for everyone.",
      },
      {
        title: "Keep an evidence log.",
        body: "Capture customer behaviour, repeated objections and retention signals as they happen. Separate what a customer said from what they actually did. This creates a more grounded account of progress.",
      },
      {
        title: "Ask for the next decision.",
        body: "Leave each conversation knowing what the next step is, who owns it and what information is missing. Friendly interest is useful, but it is not a completed process.",
      },
    ],
  },
  {
    ...base,
    id: "demo-004",
    slug: "something-people-actually-want",
    eventNumber: "004",
    title: "Something people actually want.",
    subtitle: "Less roadmap. More time with the problem.",
    speakerName: "Sam Rivera",
    speakerRole: "Product operator",
    date: "2026-07-23",
    startTime: "2026-07-23T19:00:00-04:00",
    endTime: "2026-07-23T21:30:00-04:00",
    neighbourhood: "Liberty Village",
    venue: "A room in Liberty Village",
    status: "past",
    heroImage: "/images/the-room.jpg",
    description:
      "An illustrative recap about finding a problem worth solving before building another feature.",
    takeaways: [
      "Observe the workaround.",
      "Ask about the last time, not next time.",
      "Test the smallest useful promise.",
    ],
    oneSentence:
      "The best product research begins with what someone is already trying to do.",
    quote: "A workaround is a problem telling you where to look.",
    tryThis:
      "Ask three customers to show you the last time they dealt with the problem. Watch what they do. Write down the workarounds before suggesting a solution.",
    lessons: [
      {
        title: "Ask for a real example.",
        body: "Predictions about future behaviour are easy to give. A specific recent experience reveals constraints, trade-offs and the steps someone actually takes. Ask them to walk you through it.",
      },
      {
        title: "Look for the awkward workaround.",
        body: "Spreadsheets, copied messages and repeated manual steps often mark the place where an existing tool stops helping. Understand why the workaround exists before replacing it.",
      },
      {
        title: "Deliver one useful result.",
        body: "Reduce the first version to a promise someone can understand and test. If the result matters, you can learn what the next version needs from people using it.",
      },
    ],
  },
];
export function eventState(
  event: CommunityEvent,
  now = new Date(),
): EventStatus {
  if (event.status === "cancelled" || event.status === "draft")
    return event.status;
  if (
    event.status === "past" ||
    new Date(event.endTime).getTime() < now.getTime()
  )
    return "past";
  return event.status;
}
export function upcomingEvents(now = new Date()) {
  return events
    .filter((e) => ["open", "sold-out"].includes(eventState(e, now)))
    .sort((a, b) => Date.parse(a.startTime) - Date.parse(b.startTime));
}
export function pastEvents(now = new Date()) {
  return events
    .filter((e) => eventState(e, now) === "past")
    .sort((a, b) => Date.parse(b.startTime) - Date.parse(a.startTime));
}
export function eventBySlug(slug: string) {
  return events.find((e) => e.slug === slug && e.status !== "draft");
}
export function formatDate(date: string, short = false) {
  return new Intl.DateTimeFormat("en-CA", {
    month: short ? "short" : "long",
    day: "numeric",
    timeZone: "America/Toronto",
  }).format(new Date(`${date}T12:00:00-04:00`));
}
export function formatTime(date: string) {
  return new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Toronto",
  }).format(new Date(date));
}
