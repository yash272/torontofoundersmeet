import Link from "next/link";
import { Accordion } from "@/components/accordion";
import { EveningSchedule } from "@/components/evening-schedule";
import { Newsletter } from "@/components/footer";
import { Arrow, ButtonLink, Eyebrow, Photo, TextLink } from "@/components/ui";
import { faqs } from "@/content/site";
import { home } from "@/content/home";
import {
  upcomingEvents,
  pastEvents,
  formatDate,
  formatTime,
  eventState,
} from "@/content/events";
import "./home.css";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const upcoming = upcomingEvents();
  const next = upcoming.find((event) => event.featured) || upcoming[0];
  const past = pastEvents().slice(0, 3);
  return (
    <div className="toronto-home">
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
          <p className="night-description">{home.description}</p>
          <div className="night-actions">
            <ButtonLink href="#next-up" variant="red">
              {home.action}
            </ButtonLink>
            <a href="#the-evening" className="night-secondary">
              {home.secondary}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <figure className="night-collage">
          {/* Stock atmosphere placeholder. Replace with an approved Toronto community photograph. */}
          <Photo
            src="/images/conversations.jpg"
            alt="Illustrative photograph of a conversation over drinks at a neighbourhood bar"
            className="night-people"
            priority
            sizes="(max-width: 760px) 100vw, 48vw"
          />
          <div className="night-city-inset">
            <Photo
              src="/images/toronto-streetcar.jpg"
              alt="A red streetcar on a downtown Toronto street, photographed by Nathalia Segato"
              sizes="(max-width: 760px) 40vw, 20vw"
            />
            <span>
              Meet you in Toronto. <Arrow diagonal />
            </span>
          </div>
          <figcaption>
            Bar photo: atmosphere reference · Toronto photo: Nathalia Segato
          </figcaption>
        </figure>
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
          <TextLink href="/events">All events</TextLink>
        </div>
        {next ? (
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
              <ButtonLink href={`/events/${next.slug}`}>View event</ButtonLink>
              <span className="night-ticket-fine">
                {next.isDemo
                  ? "Preview · Details to be confirmed"
                  : "A small room. A proper conversation."}
              </span>
            </div>
          </article>
        ) : (
          <div className="night-empty">
            <h3>{home.next.empty}</h3>
            <p>{home.next.emptyDescription}</p>
            <ButtonLink href="#newsletter">Get the invitation</ButtonLink>
          </div>
        )}
      </section>
      <EveningSchedule />
      <section className="night-city" aria-labelledby="city-heading">
        <Photo
          src="/images/toronto-at-night.jpg"
          alt="A Toronto streetcar crossing King Street after dark, photographed by Alex Lian"
          sizes="100vw"
        />
        <div className="night-city-content container">
          <Eyebrow>{home.city.label}</Eyebrow>
          <h2 id="city-heading">{home.city.title}</h2>
          <p>{home.city.description}</p>
          <ButtonLink href="/about" variant="light">
            {home.city.action}
          </ButtonLink>
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
        <section className="night-section night-archive container">
          <div className="night-section-heading">
            <div>
              <Eyebrow>{home.archive.label}</Eyebrow>
              <h2>{home.archive.title}</h2>
            </div>
            <TextLink href="/past-talks">{home.archive.action}</TextLink>
          </div>
          <div className="night-lessons">
            {past.map((event) => (
              <Link
                href={`/events/${event.slug}`}
                className="night-lesson"
                key={event.id}
              >
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
                    <Arrow diagonal />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {past.some((event) => event.isDemo) && (
            <p className="night-demo-caption">{home.archive.demo}</p>
          )}
        </section>
      )}
      <section className="night-invitations container">
        <div className="night-invitation">
          <Eyebrow>{home.speak.label}</Eyebrow>
          <h2>{home.speak.title}</h2>
          <p>{home.speak.description}</p>
          <TextLink href="/speak">{home.speak.action}</TextLink>
        </div>
        <div className="night-invitation night-invitation-dark">
          <Eyebrow>{home.membership.label}</Eyebrow>
          <h2>{home.membership.title}</h2>
          <p>{home.membership.description}</p>
          <TextLink href="/membership" light>
            {home.membership.action}
          </TextLink>
        </div>
      </section>
      <div className="night-partners container">
        <p>
          <strong>{home.partners.title}</strong> {home.partners.description}
        </p>
        <TextLink href="/partners">{home.partners.action}</TextLink>
      </div>
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
