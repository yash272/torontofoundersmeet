import Link from "next/link";
import {
  type CommunityEvent,
  formatDate,
  formatTime,
  eventState,
} from "@/content/events";
import { Arrow, ButtonLink, DemoNote, Eyebrow, Photo } from "./ui";
export function EventTicket({ event }: { event: CommunityEvent }) {
  const date = formatDate(event.date, true).toUpperCase();
  return (
    <article className="event-ticket">
      <div className="ticket-main">
        <div className="ticket-top">
          <Eyebrow>In good company · Event {event.eventNumber}</Eyebrow>
          <span className="ticket-state">
            <i aria-hidden="true" />
            {event.isDemo
              ? "A preview of what’s next"
              : eventState(event) === "sold-out"
                ? "Room is full"
                : "Applications open"}
          </span>
        </div>
        <h3>{event.title}</h3>
        <p className="ticket-description">{event.subtitle}</p>
        <div className="ticket-speaker">
          <span className="speaker-monogram" aria-hidden="true">
            {event.speakerName
              .split(" ")
              .map((p) => p[0])
              .join("")}
          </span>
          <div>
            <strong>{event.speakerName}</strong>
            <span>
              {event.speakerRole}, {event.speakerCompany}
              {event.isDemo ? " · Sample speaker" : ""}
            </span>
          </div>
        </div>
        {event.isDemo && <DemoNote event />}
      </div>
      <div className="ticket-stub">
        <div className="ticket-date">
          {date.split(" ")[0]}
          <strong>{date.split(" ")[1]}</strong>
        </div>
        <div className="ticket-meta">
          <p>
            {formatTime(event.startTime)} · {event.capacity} seats
          </p>
          <p>{event.neighbourhood}, Toronto</p>
        </div>
        <ButtonLink href={`/events/${event.slug}`} variant="dark">
          Explore the night
        </ButtonLink>
        <span className="ticket-code" aria-hidden="true">
          ||| || ||| | || |||| || ||| ||
        </span>
        <span className="eyebrow">Admit one good conversation</span>
      </div>
    </article>
  );
}
export function ArchiveTicket({ event }: { event: CommunityEvent }) {
  return (
    <Link className="archive-ticket" href={`/events/${event.slug}`}>
      <div className="archive-photo-wrap">
        <Photo
          src={event.heroImage}
          alt={`Illustrative atmosphere for ${event.title}`}
          sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 30vw"
        />
        <span className="archive-number">{event.eventNumber}</span>
      </div>
      <div className="archive-ticket-body">
        <div className="archive-meta">
          <span>{event.neighbourhood}</span>
          <span>{formatDate(event.date, true)}</span>
        </div>
        <h3>{event.title}</h3>
        <p className="archive-takeaway">{event.takeaways[0]}</p>
        <div className="archive-speaker">
          {event.speakerName}
          <span>{event.isDemo ? "Sample recap" : "In the room"}</span>
        </div>
        <span className="archive-link">
          Read the recap
          <Arrow />
        </span>
      </div>
    </Link>
  );
}
export function RSVP({
  event,
  className = "",
}: {
  event: CommunityEvent;
  className?: string;
}) {
  const status = eventState(event);
  if (status === "cancelled")
    return (
      <p className={`rsvp-status ${className}`}>
        This event has been cancelled.
      </p>
    );
  if (status === "sold-out")
    return (
      <ButtonLink href="/#newsletter" className={className}>
        Hear about the next one
      </ButtonLink>
    );
  if (status === "past")
    return (
      <ButtonLink href="/events" className={className}>
        Find the next room
      </ButtonLink>
    );
  const validExternal = /^https:\/\//.test(event.rsvpUrl);
  return (
    <ButtonLink
      href={validExternal ? event.rsvpUrl : "#event-notify"}
      external={validExternal}
      className={className}
    >
      {validExternal ? "RSVP for this event" : "Notify me when it opens"}
    </ButtonLink>
  );
}
