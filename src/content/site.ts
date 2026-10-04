export const site = {
  name: "Founders & Pitchers",
  description:
    "Intimate workshops with Toronto’s founders and operators. One useful lesson. 45 minutes. Then drinks.",
  origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  demo: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",
  location: "Toronto, ON",
  established: "2026",
  // Add verified profiles when available. Empty profiles render as honest non-links.
  socials: { instagram: "", linkedin: "" },
};
export const navigation = [
  { label: "Events", href: "/events" },
  { label: "Past talks", href: "/past-talks" },
  { label: "About", href: "/about" },
  { label: "Membership", href: "/membership" },
  { label: "Partners", href: "/partners" },
];
export const home = {
  eyebrow: "Toronto · Founder workshops, after work",
  headline: ["A good reason", "to close your", "laptop."],
  intro: "Meet the people behind the work.",
  description:
    "A founder shares something they learned by doing it. You ask the questions you can’t ask a podcast. Then we get another drink.",
  formatTitle: "Here’s your evening.",
  formatDescription:
    "A little structure at the start. Plenty of time to see where the conversation goes.",
  format: [
    {
      number: "01",
      title: "Settle in.",
      time: "7:00 PM",
      text: "Come straight from work. Grab whatever you’re drinking and introduce yourself to someone. Coming alone is completely normal.",
      detail: "No name tags. No elevator pitches to rehearse.",
      image: "/images/after-hours.jpg",
      alt: "Atmosphere reference: the interior of a warmly lit neighbourhood bar",
    },
    {
      number: "02",
      title: "Get into it.",
      time: "7:30 PM",
      text: "One founder or operator walks through a specific problem: what they tried, what failed, and what they’d do again. There’s time for your questions.",
      detail: "One practical lesson, in about 45 minutes.",
      image: "/images/the-lesson.jpg",
      alt: "Atmosphere reference: a small audience listening to a speaker",
    },
    {
      number: "03",
      title: "Stay awhile.",
      time: "8:15 PM — LATE",
      text: "The scheduled part is over. Ask the speaker a follow-up, compare notes with someone building something, or pull up a chair for another round.",
      detail: "Stay for one drink or until the conversation runs out.",
      image: "/images/the-room.jpg",
      alt: "Atmosphere reference: friends sharing a conversation over dinner",
    },
  ],
  manifesto:
    "How did you find that first customer? Why did that hire go wrong? What changed your mind about the product? These are the conversations we want to have. So we’re giving them a whole evening.",
  people: [
    "Founders",
    "Operators",
    "Product people",
    "Engineers",
    "Designers",
    "Creators",
    "Investors",
    "The curious",
  ],
};
export const membershipBenefits = [
  [
    "Reserved event access",
    "Guaranteed event access, with member places reserved in advance.",
  ],
  [
    "Monthly founder coworking",
    "Monthly founder coworking, with room for an actual conversation.",
  ],
  [
    "A private community",
    "A private community for questions, introductions and honest feedback.",
  ],
  [
    "Small dinners and roundtables",
    "Intimate dinners, roundtables and sessions just for members.",
  ],
  [
    "Early access to limited sessions",
    "Early access to our most limited-capacity gatherings.",
  ],
];
export const faqs = [
  {
    question: `What is ${site.name}?`,
    answer:
      "A Toronto community built around intimate, practical workshops. One accomplished founder or operator teaches one useful lesson, then everyone stays for questions, drinks and conversation.",
  },
  {
    question: "Who is this for?",
    answer:
      "Founders, operators, product people, engineers, designers, creators and people helping build something. Curiosity matters more than your job title.",
  },
  {
    question: "Do I need to be a founder?",
    answer:
      "No. You do need to be genuinely building, operating or helping build something, and interested in what other people are learning.",
  },
  {
    question: "How do events work?",
    answer:
      "Arrive, grab a drink and settle in. The session runs for about 45 minutes, with plenty of time afterward for questions and conversation. Each event page has the exact schedule.",
  },
  {
    question: "Are events free?",
    answer:
      "It depends on the event. Any ticket price and what it includes will be clearly listed on the RSVP page before you book. Membership details will be shared when it launches.",
  },
  {
    question: "How are attendees selected?",
    answer:
      "We keep rooms small and look for a thoughtful mix of people, experiences and interests. Some events use an application; others offer open registration. The event page will tell you which.",
  },
  {
    question: "Can I speak at an event?",
    answer:
      "Yes. Bring one narrow, practical lesson from something you personally experienced. Use the speaker application to tell us what the room will be able to do differently afterward.",
  },
  {
    question: "Can my company partner with you?",
    answer:
      "We work with a small number of thoughtful partners who want to support Toronto’s builders. Visit the partners page to start a conversation about the right fit.",
  },
];
// Intentionally empty: add real, permissioned quotes and verified community post URLs.
export const testimonials: {
  quote: string;
  name: string;
  role: string;
  url?: string;
}[] = [];
export const communityPosts: { title: string; url: string; author: string }[] =
  [];
export const principles = [
  [
    "Useful beats impressive.",
    "A lesson you can use on Monday is worth more than a slide full of logos.",
  ],
  [
    "A room, not an audience.",
    "Everyone brings something. Leave enough space for the people listening to become part of the conversation.",
  ],
  [
    "Be a person first.",
    "Ask good questions. Listen to the answer. Save the pitch for someone who asks for it.",
  ],
];
export const partnerPackages = [
  {
    name: "Community partner",
    subtitle: "Show up for the ecosystem.",
    benefits: [
      "Community and newsletter visibility",
      "Partner presence on the website",
      "A genuine way to support local builders",
    ],
  },
  {
    name: "Event partner",
    subtitle: "Help make a night happen.",
    benefits: [
      "Presence on a dedicated event page",
      "A thoughtful acknowledgement on the night",
      "Representative attendance",
      "A post-event newsletter mention",
    ],
  },
  {
    name: "Ecosystem partner",
    subtitle: "Build something longer-term.",
    benefits: [
      "A considered multi-event partnership",
      "A curated founder roundtable",
      "Ongoing community visibility",
      "A programme shaped together",
    ],
  },
];
