import { metadata as makeMetadata } from "@/lib/metadata";
import { pastEvents } from "@/content/events";
import { ArchiveTicket } from "@/components/event-ticket";
import { Eyebrow } from "@/components/ui";
import { Newsletter } from "@/components/footer";
export const metadata = makeMetadata(
  "Past talks",
  "Practical lessons from the room, kept for the next thing you build.",
  "/past-talks",
);
export const dynamic = "force-dynamic";
export default function PastTalksPage() {
  const past = pastEvents();
  return (
    <>
      <section className="page-intro container">
        <Eyebrow>From the archive</Eyebrow>
        <h1>
          Some things are
          <br />
          <em>worth keeping.</em>
        </h1>
        <p>
          The notes you’d want a friend to send you. Useful lessons, honest
          takeaways and something to try this week.
        </p>
      </section>
      <section className="section container">
        <div className="archive-grid">
          {past.map((event) => (
            <ArchiveTicket key={event.id} event={event} />
          ))}
        </div>
        {past.some((e) => e.isDemo) && (
          <p className="archive-disclaimer">
            These are illustrative recaps showing the format. They do not
            describe real events or speakers.
          </p>
        )}
        {!past.length && (
          <div className="empty-state">
            <h2>The first lessons are still ahead of us.</h2>
            <p>Join the list below to hear when they arrive.</p>
          </div>
        )}
      </section>
      <Newsletter />
    </>
  );
}
