import Link from "next/link";
import {
  type CommunityEvent,
  formatDate,
  formatTime,
  pastEvents,
  upcomingEvents,
  eventState,
} from "@/content/events";
import { site, faqs } from "@/content/site";
import { Accordion } from "./accordion";
import { ArchiveTicket, RSVP } from "./event-ticket";
import { SubmissionForm } from "./submission-form";
import {
  ButtonLink,
  DemoNote,
  Eyebrow,
  Photo,
  SectionHeading,
  TextLink,
} from "./ui";
function Speaker({ event }: { event: CommunityEvent }) {
  return (
    <>
      {event.speakerImage ? (
        <Photo
          src={event.speakerImage}
          alt={event.speakerName}
          className="speaker-portrait"
        />
      ) : (
        <div className="speaker-placeholder">
          <span className="speaker-monogram" aria-hidden="true">
            {event.speakerName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
          <div>
            <h3>{event.speakerName}</h3>
            <p>
              {event.speakerRole}, {event.speakerCompany}
            </p>
            {event.isDemo && <p>Sample profile · Portrait to come</p>}
          </div>
        </div>
      )}
      <p>{event.speakerBio}</p>
    </>
  );
}
function EventHeader({
  event,
  recap = false,
}: {
  event: CommunityEvent;
  recap?: boolean;
}) {
  return (
    <section className="event-page-hero container">
      <Link className="back-link" href={recap ? "/past-talks" : "/events"}>
        <span aria-hidden="true">←</span>
        {recap ? "Back to the archive" : "Back to events"}
      </Link>
      <div className="event-title-row">
        <div>
          <Eyebrow>
            Event {event.eventNumber} ·{" "}
            {recap
              ? "Past"
              : eventState(event) === "cancelled"
                ? "Cancelled"
                : "Toronto, after hours"}
            {event.isDemo ? " · Sample" : ""}
          </Eyebrow>
          <h1>{event.title}</h1>
        </div>
        <span className="event-page-number" aria-hidden="true">
          {event.eventNumber}
        </span>
      </div>
      <p className="event-speaker-line">
        With {event.speakerName} · {event.speakerRole}, {event.speakerCompany}
      </p>
      {event.isDemo && (
        <p className="event-demo-banner">
          {recap
            ? "Sample recap: an illustration of the editorial format. This session and speaker are not real."
            : "A preview of the event format. This speaker, date and venue are illustrative; registration is not open."}
        </p>
      )}
      <div className="event-facts">
        <div>
          <Eyebrow>The date</Eyebrow>
          <strong>
            {formatDate(event.date)}, {new Date(event.startTime).getFullYear()}
          </strong>
          <span>
            {formatTime(event.startTime)} – {formatTime(event.endTime)} ET
          </span>
        </div>
        <div>
          <Eyebrow>The neighbourhood</Eyebrow>
          <strong>{event.neighbourhood}</strong>
          <span>Toronto, Ontario</span>
        </div>
        <div>
          <Eyebrow>The room</Eyebrow>
          <strong>
            {event.capacity} seats{event.isDemo ? " · Illustrative" : ""}
          </strong>
          <span>
            {recap ? "An evening worth remembering" : "One useful conversation"}
          </span>
        </div>
        {!recap && <RSVP event={event} />}
      </div>
      <Photo
        src={event.heroImage}
        alt={
          event.isDemo
            ? "Stock atmosphere photograph, not a photograph of this event"
            : event.title
        }
        className="event-poster-image"
        priority
        sizes="100vw"
      />
      {event.isDemo && <DemoNote />}
    </section>
  );
}
export function UpcomingEvent({ event }: { event: CommunityEvent }) {
  const state = eventState(event);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.startTime,
    endDate: event.endTime,
    eventStatus:
      state === "cancelled"
        ? "https://schema.org/EventCancelled"
        : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [new URL(event.heroImage, site.origin).href],
    location: {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.address,
        addressLocality: "Toronto",
        addressRegion: "ON",
        addressCountry: "CA",
      },
    },
    organizer: { "@type": "Organization", name: site.name, url: site.origin },
    performer: { "@type": "Person", name: event.speakerName },
    url: new URL(`/events/${event.slug}`, site.origin).href,
    maximumAttendeeCapacity: event.capacity,
  };
  const other = upcomingEvents().filter((e) => e.id !== event.id);
  return (
    <div className="has-event-cta">
      {!event.isDemo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <EventHeader event={event} />
      <div className="section container event-body">
        <aside className="event-sidebar">
          <Eyebrow>A night with a point</Eyebrow>
          <p>{event.subtitle}</p>
          <RSVP event={event} />
        </aside>
        <div className="event-story">
          <section>
            <h2>
              Why this
              <br />
              <span>conversation matters.</span>
            </h2>
            <p>{event.description}</p>
          </section>
          <section>
            <Eyebrow>Leave with something useful</Eyebrow>
            <h2 style={{ marginTop: 18 }}>What you’ll learn.</h2>
            <ul className="takeaway-list">
              {event.takeaways.map((t) => (
                <li key={t}>
                  <span aria-hidden="true">↗</span>
                  {t}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Meet the speaker.</h2>
            <Speaker event={event} />
          </section>
          <section>
            <h2>The shape of the night.</h2>
            <ol className="agenda">
              <li>
                <time>{formatTime(event.startTime)}</time>
                <span>Doors open. Drinks and introductions.</span>
              </li>
              <li>
                <time>
                  {formatTime(
                    new Date(
                      Date.parse(event.startTime) + 30 * 60_000,
                    ).toISOString(),
                  )}
                </time>
                <span>One useful lesson. Questions welcome.</span>
              </li>
              <li>
                <time>
                  {formatTime(
                    new Date(
                      Date.parse(event.startTime) + 75 * 60_000,
                    ).toISOString(),
                  )}
                </time>
                <span>The conversation opens up.</span>
              </li>
              <li>
                <time>{formatTime(event.endTime)}</time>
                <span>Official finish. The conversation is yours.</span>
              </li>
            </ol>
          </section>
          <section>
            <h2>
              Somewhere worth
              <br />
              <span>spending an evening.</span>
            </h2>
            <p>
              {event.venue}. {event.address}.
            </p>
            {!event.isDemo &&
              !event.address.toLowerCase().includes("announced") && (
                <a
                  className="text-link"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Find the venue ↗
                </a>
              )}
          </section>
          <section>
            <h2>A few good questions.</h2>
            <Accordion
              items={faqs.filter((_, i) => [2, 3, 4, 5].includes(i))}
            />
          </section>
          {!event.rsvpUrl && state === "open" && (
            <section id="event-notify" className="event-notify">
              <Eyebrow>The next invitation</Eyebrow>
              <h3>Hear when the room opens.</h3>
              <p>
                Join the event newsletter for the confirmed speaker, venue and
                RSVP link.
              </p>
              <SubmissionForm type="newsletter" />
            </section>
          )}
        </div>
      </div>
      {other.length > 0 ? (
        <section className="section container">
          <SectionHeading
            label="Make another night of it"
            title="Also on the calendar."
          />
          {other.map((e) => (
            <div key={e.id}>
              <h3>{e.title}</h3>
              <ButtonLink href={`/events/${e.slug}`}>View event</ButtonLink>
            </div>
          ))}
        </section>
      ) : (
        <section className="partner-strip">
          <div className="container">
            <h2>
              The next good room
              <br />
              <span>is worth waiting for.</span>
            </h2>
            <TextLink href="/events">Explore the calendar</TextLink>
          </div>
        </section>
      )}
      <div className="mobile-rsvp">
        <RSVP event={event} />
      </div>
    </div>
  );
}
export function EventRecap({ event }: { event: CommunityEvent }) {
  if (event.lessons.length === 0) {
    return (
      <>
        <EventHeader event={event} recap />
        <section className="section container editorial-split">
          <div>
            <Eyebrow>The conversation continues</Eyebrow>
            <h2>
              The notes are
              <br />
              <span>on their way.</span>
            </h2>
          </div>
          <div className="prose">
            <p>
              This evening has wrapped up. We’re putting the useful parts into
              words.
            </p>
            <p>
              Join the event newsletter to hear when the recap is ready, along
              with the next invitation.
            </p>
            <SubmissionForm type="newsletter" />
          </div>
        </section>
      </>
    );
  }
  const more = pastEvents()
    .filter((e) => e.id !== event.id)
    .slice(0, 3);
  return (
    <>
      <EventHeader event={event} recap />
      <section className="container recap-summary">
        <Eyebrow>The night in one sentence</Eyebrow>
        <blockquote>{event.oneSentence || event.subtitle}</blockquote>
      </section>
      <div className="section container recap-article">
        <aside>
          <Eyebrow>Notes from the room</Eyebrow>
          {event.lessons.map((lesson, i) => (
            <a key={lesson.title} href={`#lesson-${i + 1}`}>
              {String(i + 1).padStart(2, "0")} · {lesson.title}
            </a>
          ))}
          <a href="#try-this">Something to try this week ↗</a>
        </aside>
        <article>
          {event.lessons.map((lesson, i) => (
            <section
              className="lesson-section"
              id={`lesson-${i + 1}`}
              key={lesson.title}
            >
              <Eyebrow>Lesson {String(i + 1).padStart(2, "0")}</Eyebrow>
              <h2>{lesson.title}</h2>
              <p>{lesson.body}</p>
              {i === 1 && event.quote && (
                <blockquote className="pull-quote">“{event.quote}”</blockquote>
              )}
            </section>
          ))}
          <div className="recap-gallery">
            {event.galleryImages.map((src) => (
              <Photo
                key={src}
                src={src}
                alt={
                  event.isDemo
                    ? "Illustrative atmosphere photograph"
                    : `A moment from ${event.title}`
                }
              />
            ))}
          </div>
          {event.isDemo && <DemoNote />}
          <section className="try-this" id="try-this">
            <Eyebrow>Close the tab. Try the thing.</Eyebrow>
            <h2>What to try this week.</h2>
            <p>{event.tryThis || event.takeaways[0]}</p>
          </section>
          <section className="lesson-section" style={{ marginTop: 60 }}>
            <h2>About the speaker.</h2>
            <Speaker event={event} />
          </section>
        </article>
      </div>
      <section className="section archive-section">
        <div className="container">
          <SectionHeading
            label="Keep the good ideas coming"
            title={
              <>
                More from
                <br />
                <span>the room.</span>
              </>
            }
          >
            <TextLink href="/past-talks">The full archive</TextLink>
          </SectionHeading>
          <div className="archive-grid">
            {more.map((e) => (
              <ArchiveTicket event={e} key={e.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
