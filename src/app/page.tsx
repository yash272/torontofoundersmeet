import Link from "next/link";
import { ArchiveTicket, EventTicket } from "@/components/event-ticket";
import { Accordion } from "@/components/accordion";
import { EveningSchedule } from "@/components/evening-schedule";
import { Newsletter } from "@/components/footer";
import {
  Arrow,
  ButtonLink,
  DemoNote,
  Eyebrow,
  Photo,
  SectionHeading,
  TextLink,
} from "@/components/ui";
import {
  faqs,
  home,
  membershipBenefits,
  site,
  testimonials,
  communityPosts,
} from "@/content/site";
import {
  upcomingEvents,
  pastEvents,
  formatDate,
  formatTime,
} from "@/content/events";
import "./home.css";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const upcoming = upcomingEvents();
  const next = upcoming.find((event) => event.featured) || upcoming[0];
  const past = pastEvents().slice(0, 3);

  return (
    <>
      <section className="opening container">
        <Eyebrow>{home.eyebrow}</Eyebrow>
        <div className="opening-grid">
          <h1>
            {home.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <div className="opening-intro">
            <p className="opening-lead">{home.intro}</p>
            <p>{home.description}</p>
            <ButtonLink href="/events">See the next event</ButtonLink>
            <a href="#evening-heading" className="opening-secondary">
              What’s the evening like? <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div className="opening-scene">
          {/* Atmosphere placeholder. Replace with candid photography from a real Toronto event. */}
          <Photo
            src="/images/the-room.jpg"
            alt="Atmosphere reference: people sharing food, drinks and a conversation around a table"
            priority
            sizes="(max-width: 760px) 100vw, 70vw"
            className="opening-photo"
          />
          {next ? (
            <Link className="opening-notice" href={`/events/${next.slug}`}>
              <span className="notice-label">
                Next session {next.isDemo && <span>Preview</span>}
              </span>
              <span className="notice-date">{formatDate(next.date, true)}</span>
              <h2>{next.title}</h2>
              <span className="notice-location">
                {next.neighbourhood}
                <br />
                {formatTime(next.startTime)} · Toronto
              </span>
              <span className="notice-link">
                See the details <Arrow diagonal />
              </span>
            </Link>
          ) : (
            <div className="opening-notice">
              <Eyebrow>The first evening</Eyebrow>
              <h2>We’re putting it together.</h2>
              <ButtonLink href="#newsletter">Get the invitation</ButtonLink>
            </div>
          )}
        </div>
        <div className="opening-caption">
          <span>In person. In Toronto.</span>
          <span>Atmosphere photograph · Event images coming soon</span>
        </div>
        <div className="house-rules">
          <span>One speaker, one useful lesson.</span>
          <span>No panels or pitch competitions.</span>
          <span>Enough time for another round.</span>
        </div>
      </section>

      <section className="section container next-section" id="next-up">
        <SectionHeading label="The calendar" title="Next up.">
          <TextLink href="/events">All events</TextLink>
        </SectionHeading>
        {next ? (
          <EventTicket event={next} />
        ) : (
          <div className="empty-state">
            <h3>The next date is on its way.</h3>
            <p>Leave your email and we’ll send you the details.</p>
            <ButtonLink href="#newsletter">Get event news</ButtonLink>
          </div>
        )}
      </section>

      <EveningSchedule />

      <section className="why-section">
        <div className="container why-grid">
          <div>
            <Eyebrow>Why we’re doing this</Eyebrow>
            <h2>You can get the polished version on LinkedIn.</h2>
          </div>
          <div className="why-copy">
            <p className="why-lead">We want to hear what actually happened.</p>
            <p>{home.manifesto}</p>
            <TextLink href="/about" light>
              More about us
            </TextLink>
          </div>
        </div>
      </section>

      <section className="section archive-section home-archive">
        <div className="container">
          <SectionHeading label="The notebook" title="Take something with you.">
            <TextLink href="/past-talks">Browse the recaps</TextLink>
          </SectionHeading>
          <div className="archive-grid">
            {past.map((event) => (
              <ArchiveTicket key={event.id} event={event} />
            ))}
          </div>
          {past.some((event) => event.isDemo) && (
            <p className="archive-disclaimer">
              Sample recaps showing the format. Real notes will follow our first
              events.
            </p>
          )}
        </div>
      </section>

      <section className="section container speaker-invite">
        <Eyebrow>Take the mic</Eyebrow>
        <div>
          <h2>
            What did you learn
            <br />
            the hard way?
          </h2>
          <div>
            <p>
              Tell us about the customer you almost lost, the hire you got
              wrong, or the experiment that finally worked. Pick one thing and
              get specific.
            </p>
            <ButtonLink href="/speak">Pitch us a lesson</ButtonLink>
          </div>
        </div>
      </section>

      <section className="company-section">
        <div className="container">
          <div className="company-intro">
            <div>
              <Eyebrow>Who you’ll meet</Eyebrow>
              <h2>
                People with something
                <br />
                on the go.
              </h2>
            </div>
            <p>
              A company, a side project, a problem they can’t put down. You
              don’t need an impressive title. You do need to be curious about
              what other people are making.
            </p>
          </div>
          <div className="company-photos">
            <Photo
              src="/images/the-lesson.jpg"
              alt="Atmosphere reference: a small group listening and talking outside"
              sizes="(max-width: 760px) 100vw, 60vw"
            />
            <Photo
              src="/images/after-hours.jpg"
              alt="Atmosphere reference: a neighbourhood bar ready for the evening"
              sizes="(max-width: 760px) 45vw, 35vw"
            />
            <div className="company-note">
              <p>
                Come on your own.
                <br />
                Leave with a few people
                <br />
                to follow up with.
              </p>
              <TextLink href="/events">Come to an event</TextLink>
            </div>
          </div>
          <DemoNote />
          <div
            className="company-roles"
            aria-label="People this community is for"
          >
            {home.people.map((person) => (
              <span key={person}>{person}</span>
            ))}
          </div>
          {testimonials.length > 0 && (
            <div className="testimonials">
              {testimonials.map((quote) => (
                <blockquote key={quote.name}>
                  <p>“{quote.quote}”</p>
                  <cite>
                    {quote.name} · {quote.role}
                  </cite>
                </blockquote>
              ))}
            </div>
          )}
          {communityPosts.length > 0 && (
            <div className="community-posts">
              {communityPosts.map((post) => (
                <a
                  href={post.url}
                  key={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.title} — {post.author}
                  <Arrow diagonal />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section container regulars-section">
        <div>
          <Eyebrow>Membership · In the works</Eyebrow>
          <h2>
            Make it
            <br />a regular thing.
          </h2>
          <p>
            For the people who want to keep in touch between events. We’re
            putting together coworking days, small dinners and a private
            community.
          </p>
          <ButtonLink href="/membership">
            Join the membership waitlist
          </ButtonLink>
        </div>
        <div className="regulars-details">
          <span className="regulars-brand">{site.name}</span>
          <h3>For the regulars.</h3>
          <ul>
            {membershipBenefits.map(([title]) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
          <span className="regulars-status">
            Launching soon · No payment to join the waitlist
          </span>
        </div>
      </section>

      <section className="partner-strip">
        <div className="container">
          <div>
            <Eyebrow>Help make it happen</Eyebrow>
            <h2>Support the next evening.</h2>
          </div>
          <div>
            <p>
              Have a space, a useful product, or a company that wants to support
              Toronto’s builders? Let’s talk about a partnership that makes
              sense.
            </p>
            <TextLink href="/partners">Partner with us</TextLink>
          </div>
        </div>
      </section>

      <section className="section container faq-section">
        <div>
          <Eyebrow>Before you come</Eyebrow>
          <h2>A few details.</h2>
          <p>Something else on your mind?</p>
          <TextLink href="/contact">Ask us</TextLink>
        </div>
        <Accordion items={faqs} />
      </section>
      <Newsletter />
    </>
  );
}
