import { metadata as makeMetadata } from "@/lib/metadata";
import { upcomingEvents, pastEvents } from "@/content/events";
import { EventTicket, ArchiveTicket } from "@/components/event-ticket";
import { ButtonLink, Eyebrow, SectionHeading, TextLink } from "@/components/ui";
import { Newsletter } from "@/components/footer";
export const metadata = makeMetadata(
  "Events",
  "Find your next good room. Intimate, useful founder sessions across Toronto.",
  "/events",
);
export const dynamic = "force-dynamic";
export default function EventsPage() {
  const upcoming = upcomingEvents();
  const past = pastEvents().slice(0, 3);
  return (
    <>
      <section className="page-intro container">
        <Eyebrow>Toronto · After hours</Eyebrow>
        <h1>
          A good night.
          <br />
          <em>A better next day.</em>
        </h1>
        <div className="intro-bottom">
          <p>
            One useful lesson, a drink in your hand, and a room full of people
            worth getting to know.
          </p>
          <span className="eyebrow">Small rooms. Big conversations.</span>
        </div>
      </section>
      <section className="section container page-events">
        <Eyebrow>What’s next</Eyebrow>
        {upcoming.length ? (
          upcoming.map((event) => <EventTicket event={event} key={event.id} />)
        ) : (
          <div className="empty-state">
            <h2>The next room is taking shape.</h2>
            <p>Leave your email and get the invitation first.</p>
            <ButtonLink href="#newsletter">Keep me in the loop</ButtonLink>
          </div>
        )}
      </section>
      <section className="section archive-section">
        <div className="container">
          <SectionHeading
            label="Previously in the room"
            title={
              <>
                The lessons
                <br />
                <em>live on.</em>
              </>
            }
          >
            <TextLink href="/past-talks">All past talks</TextLink>
          </SectionHeading>
          <div className="archive-grid">
            {past.map((event) => (
              <ArchiveTicket key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
}
