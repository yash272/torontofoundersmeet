import { Accordion } from "@/components/accordion";
import { EveningSchedule } from "@/components/evening-schedule";
import { Newsletter } from "@/components/footer";
import { ButtonLink, Eyebrow, Photo, TextLink } from "@/components/ui";
import { faqs } from "@/content/site";
import { home } from "@/content/home";
import {
  CommunityApplications,
  OurStory,
} from "@/components/community-sections";
import { EventSchema, InlineEvent, RecapBody } from "@/components/inline-event";
import { HeroPasses } from "@/components/hero-passes";
import { PageAnchors } from "@/components/page-anchors";
import {
  upcomingEvents,
  pastEvents,
  formatDate,
  formatTime,
  eventState,
} from "@/content/events";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const upcoming = upcomingEvents();
  const next = upcoming.find((event) => event.featured) || upcoming[0];
  const past = pastEvents();
  return (
    <div className="toronto-home">
      <PageAnchors />
      <EventSchema events={[...upcoming, ...past]} />
      <section className="night-hero container" aria-labelledby="night-heading">
        <div className="night-intro">
          <Eyebrow>
            <span className="local-line" aria-hidden="true" />
            {home.eyebrow}
          </Eyebrow>
          <h1 id="night-heading">
            {home.headline.map((line, index) => (
              <span
                key={line}
                className={index === 1 ? "night-red" : undefined}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className="night-subhead">{home.subhead}</p>
          <p className="night-description">{home.description}</p>
          <div className="night-actions">
            <ButtonLink href="#next-up" variant="accent">
              {home.action}
            </ButtonLink>
            <a href="#the-evening" className="night-secondary">
              {home.secondary}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <HeroPasses />
      </section>
      <div className="night-formula" aria-label="The event format">
        <div className="container">
          {home.facts.map((fact, index) => (
            <span key={fact}>
              {fact}
              {index < home.facts.length - 1 && (
                <span className="formula-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
      <section className="night-next container night-section" id="next-up">
        <div className="night-section-heading">
          <div>
            <Eyebrow>{home.next.label}</Eyebrow>
            <h2>{home.next.title}</h2>
          </div>
          <TextLink href="/#newsletter">Get the invitation</TextLink>
        </div>
        {next ? (
          <div>
            <article className="night-ticket">
              <div className="night-ticket-main">
                <div className="night-ticket-top">
                  <span>FOUNDER WORKSHOP / {next.eventNumber}</span>
                  <span className="night-event-state">
                    {next.isDemo
                      ? "SAMPLE EVENT"
                      : eventState(next) === "sold-out"
                        ? "SOLD OUT"
                        : "APPLICATIONS OPEN"}
                  </span>
                </div>
                <h3>{next.title}</h3>
                <p>{next.subtitle}</p>
                <div className="night-ticket-speaker">
                  <span>WITH</span>
                  <strong>{next.speakerName}</strong>
                  <span>
                    {next.speakerRole}, {next.speakerCompany}
                    {next.isDemo ? " · Sample speaker" : ""}
                  </span>
                </div>
                <div className="night-ticket-location">
                  <span>{next.neighbourhood} · Toronto</span>
                  <span>
                    {formatTime(next.startTime)} · {next.capacity} seats
                  </span>
                </div>
              </div>
              <div className="night-ticket-stub">
                <span className="eyebrow">Save the evening</span>
                <time dateTime={next.date}>
                  <span>{formatDate(next.date, true).split(" ")[0]}</span>
                  <strong>{formatDate(next.date, true).split(" ")[1]}</strong>
                </time>
                <ButtonLink href={`/#event-${next.slug}`}>
                  View event
                </ButtonLink>
                <span className="night-ticket-fine">
                  {next.isDemo
                    ? "Preview · Details to be confirmed"
                    : "A small room. A proper conversation."}
                </span>
              </div>
            </article>
            <InlineEvent event={next} />
            {upcoming
              .filter((event) => event.id !== next.id)
              .map((event) => (
                <article className="inline-more-event" key={event.id}>
                  <Eyebrow>
                    {formatDate(event.date)} · {event.neighbourhood}
                  </Eyebrow>
                  <h3>{event.title}</h3>
                  <InlineEvent event={event} />
                </article>
              ))}
          </div>
        ) : (
          <div className="night-empty">
            <h3>{home.next.empty}</h3>
            <p>{home.next.emptyDescription}</p>
            <ButtonLink href="#newsletter">Get the invitation</ButtonLink>
          </div>
        )}
      </section>
      <EveningSchedule />
      <section className="night-city" id="about" aria-labelledby="city-heading">
        <Photo
          src="/images/toronto-at-night.jpg"
          alt="A Toronto streetcar crossing King Street after dark, photographed by Alex Lian"
          sizes="100vw"
        />
        <div className="night-city-content container">
          <Eyebrow>{home.city.label}</Eyebrow>
          <h2 id="city-heading">{home.city.title}</h2>
          <p>{home.city.description}</p>
          <OurStory />
          <span className="night-city-credit">
            Toronto, after dark · Photo by Alex Lian
          </span>
        </div>
        <div className="night-neighbourhoods">
          <div className="container">
            <span>Our kind of Toronto</span>
            {home.city.neighbourhoods.map((place) => (
              <span key={place}>{place}</span>
            ))}
          </div>
        </div>
      </section>
      {past.length > 0 && (
        <section
          className="night-section night-archive container"
          id="past-talks"
        >
          <div className="night-section-heading">
            <div>
              <Eyebrow>{home.archive.label}</Eyebrow>
              <h2>{home.archive.title}</h2>
            </div>
            <p className="night-demo-caption">
              Open a ticket. Read the useful bits.
            </p>
          </div>
          <div className="night-lessons">
            {past.map((event) => (
              <details
                id={`event-${event.slug}`}
                className="night-lesson"
                key={event.id}
              >
                <summary>
                  <div className="night-lesson-image">
                    <Photo
                      src={event.heroImage}
                      alt={`Illustrative photograph for ${event.title}`}
                      sizes="(max-width: 760px) 90vw, 30vw"
                    />
                    <span>{event.eventNumber}</span>
                  </div>
                  <div className="night-lesson-text">
                    <div className="night-lesson-meta">
                      <span>
                        {event.isDemo
                          ? "Sample session"
                          : formatDate(event.date, true)}
                      </span>
                      <span>{event.neighbourhood}</span>
                    </div>
                    <h3>{event.title}</h3>
                    <p>{event.takeaways[0]}</p>
                    <span className="night-lesson-link">
                      Read the lesson
                      <span className="disclosure-symbol" aria-hidden="true">
                        +
                      </span>
                    </span>
                  </div>
                </summary>
                <RecapBody event={event} />
              </details>
            ))}
          </div>
          {past.some((event) => event.isDemo) && (
            <p className="night-demo-caption">{home.archive.demo}</p>
          )}
        </section>
      )}
      <CommunityApplications />
      <section className="night-section night-faq container">
        <div>
          <Eyebrow>{home.faq.label}</Eyebrow>
          <h2>{home.faq.title}</h2>
        </div>
        <Accordion
          items={faqs.filter((_, index) => [0, 2, 4, 5].includes(index))}
        />
      </section>
      <Newsletter />
    </div>
  );
}
