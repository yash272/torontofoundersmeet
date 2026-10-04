import { metadata as makeMetadata } from "@/lib/metadata";
import { Eyebrow } from "@/components/ui";
import { SubmissionForm } from "@/components/submission-form";
export const metadata = makeMetadata(
  "Speak",
  "One narrow, practical lesson from something you personally experienced. Apply to speak in Toronto.",
  "/speak",
);
const topics = [
  "First customers",
  "Hiring & firing",
  "Fundraising",
  "Product-market fit",
  "Pricing",
  "Selling into the US",
  "A failed launch",
  "Community",
  "Sales",
  "Content",
  "AI & product",
];
export default function SpeakPage() {
  return (
    <>
      <section className="page-intro container">
        <Eyebrow>Pass it on</Eyebrow>
        <h1>
          No keynotes.
          <br />
          Just something
          <br />
          <em>worth sharing.</em>
        </h1>
        <p>
          Learned something the hard way? Someone in the room probably needs to
          hear it.
        </p>
      </section>
      <section className="section container application-layout">
        <aside>
          <Eyebrow>One lesson. Your experience.</Eyebrow>
          <h2>
            Teach the thing
            <br />
            <em>you wish you’d known.</em>
          </h2>
          <p>
            You don’t need a speaking reel or a rehearsed origin story. You need
            firsthand experience and one narrow, practical lesson someone can
            use.
          </p>
          <p>
            Plan for about 45 minutes, including questions. Bring the mistakes,
            the trade-offs and what you’d do differently. Slides are optional.
            Specifics aren’t.
          </p>
          <div className="topic-list">
            {topics.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </aside>
        <div className="application-panel">
          <h2>What’s your lesson?</h2>
          <p>
            A thoughtful first idea is enough. We’ll work on the format
            together.
          </p>
          <SubmissionForm type="speaker" />
        </div>
      </section>
    </>
  );
}
