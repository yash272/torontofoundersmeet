import {
  type CommunityEvent,
  eventState,
  formatDate,
  formatTime,
} from "@/content/events";
import { site } from "@/content/site";
import { ButtonLink, Eyebrow, Photo, SectionLink } from "./ui";

export function EventRsvp({ event }: { event: CommunityEvent }) {
  const state = eventState(event);
  if (state === "cancelled") return <p>This event has been cancelled.</p>;
  const canRegister =
    !event.isDemo && state === "open" && /^https:\/\//.test(event.rsvpUrl);
  return (
    <ButtonLink
      href={canRegister ? event.rsvpUrl : "/#newsletter"}
      external={canRegister}
    >
      {canRegister
        ? "RSVP for this event"
        : state === "sold-out"
          ? "Hear about the next one"
          : "Notify me when it opens"}
    </ButtonLink>
  );
}

export function EventBody({ event }: { event: CommunityEvent }) {
  return (
    <div className="inline-event-body">
      <div>
        <Eyebrow>The useful bit</Eyebrow>
        <p>{event.description}</p>
        <ul>
          {event.takeaways.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="inline-speaker">
          {event.speakerImage && (
            <Photo
              src={event.speakerImage}
              alt={event.speakerName}
              sizes="160px"
            />
          )}
          <div>
            <h4>With {event.speakerName}</h4>
            <p>
              {event.speakerRole}, {event.speakerCompany}
            </p>
            <p>{event.speakerBio}</p>
          </div>
        </div>
      </div>
      <div>
        <Eyebrow>The evening</Eyebrow>
        <p>
          {formatDate(event.date)} · {event.neighbourhood}, Toronto
        </p>
        <ol className="inline-agenda">
          <li>
            <time>{formatTime(event.startTime)}</time>
            <span>Drinks and introductions</span>
          </li>
          <li>
            <time>
              {formatTime(
                new Date(
                  Date.parse(event.startTime) + 30 * 60_000,
                ).toISOString(),
              )}
            </time>
            <span>One useful lesson, with questions</span>
          </li>
          <li>
            <time>
              {formatTime(
                new Date(
                  Date.parse(event.startTime) + 75 * 60_000,
                ).toISOString(),
              )}
            </time>
            <span>Stay for the conversation</span>
          </li>
          <li>
            <time>{formatTime(event.endTime)}</time>
            <span>Official finish</span>
          </li>
        </ol>
        <p>
          {event.venue}
          <br />
          {event.address}
        </p>
        {event.isDemo && (
          <p className="inline-note">
            Sample event, speaker and venue. Registration is not open.
          </p>
        )}
        <EventRsvp event={event} />
      </div>
    </div>
  );
}

export function InlineEvent({ event }: { event: CommunityEvent }) {
  return (
    <details
      id={`event-${event.slug}`}
      className="inline-disclosure event-disclosure"
    >
      <summary>
        <span>Event details &amp; RSVP</span>
        <span className="disclosure-symbol" aria-hidden="true">
          +
        </span>
      </summary>
      <EventBody event={event} />
    </details>
  );
}

export function RecapBody({ event }: { event: CommunityEvent }) {
  return (
    <div className="inline-recap-body">
      <p className="inline-recap-byline">
        {formatDate(event.date)} · With {event.speakerName},{" "}
        {event.speakerCompany}
        {event.isDemo ? " · Sample speaker" : ""}
      </p>
      {event.isDemo && (
        <p className="inline-note">
          Illustrative recap. This session and speaker are not real.
        </p>
      )}
      <p className="inline-recap-lead">{event.oneSentence || event.subtitle}</p>
      {event.lessons.length ? (
        <>
          <div className="inline-lessons">
            {event.lessons.map((lesson) => (
              <section key={lesson.title}>
                <h4>{lesson.title}</h4>
                <p>{lesson.body}</p>
              </section>
            ))}
          </div>
          {event.quote && <blockquote>“{event.quote}”</blockquote>}
          <div className="inline-try">
            <Eyebrow>Try this week</Eyebrow>
            <p>{event.tryThis || event.takeaways[0]}</p>
          </div>
        </>
      ) : (
        <p>
          The notes are on their way. Join the newsletter for the next useful
          lesson.
        </p>
      )}
      <SectionLink className="text-link" section="newsletter">
        Get the next lesson <span aria-hidden="true">→</span>
      </SectionLink>
    </div>
  );
}

export function EventSchema({ events }: { events: CommunityEvent[] }) {
  const real = events.filter(
    (event) => !event.isDemo && event.status !== "draft",
  );
  if (!real.length) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          real.map((event) => ({
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.title,
            description: event.description,
            startDate: event.startTime,
            endDate: event.endTime,
            eventStatus:
              eventState(event) === "cancelled"
                ? "https://schema.org/EventCancelled"
                : "https://schema.org/EventScheduled",
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
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
            organizer: {
              "@type": "Organization",
              name: site.name,
              url: site.origin,
            },
            performer: { "@type": "Person", name: event.speakerName },
            url: new URL(`/#event-${event.slug}`, site.origin).href,
            maximumAttendeeCapacity: event.capacity,
          })),
        ).replace(/</g, "\\u003c"),
      }}
    />
  );
}
