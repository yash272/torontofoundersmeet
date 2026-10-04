import Link from "next/link";
import { ArchiveTicket, EventTicket } from "@/components/event-ticket";
import { Accordion } from "@/components/accordion";
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
import { upcomingEvents, pastEvents, formatDate } from "@/content/events";
export const dynamic = "force-dynamic";
export default function HomePage() {
  const upcoming = upcomingEvents();
  const next = upcoming.find((e) => e.featured) || upcoming[0];
  const past = pastEvents().slice(0, 3);
  return (
    <>
      <section className="hero container">
        <div className="hero-topline">
          <Eyebrow dot>{home.eyebrow}</Eyebrow>
          <span className="eyebrow hero-coordinate">43°39′ N 79°23′ W</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              The best startup
              <br />
              <em>conversations</em>
              <br />
              don’t happen at
              <br />
              conferences.
            </h1>
            <p className="hero-intro">{home.intro}</p>
            <p className="hero-description">{home.description}</p>
            <div className="hero-actions">
              <ButtonLink href="/events">See what’s next</ButtonLink>
              <TextLink href="#newsletter">Join the community</TextLink>
            </div>
          </div>
          <div className="hero-visual">
            <Photo
              src="/images/the-lesson.jpg"
              alt="Atmosphere reference: a candid gathering with people in conversation"
              priority
              className="hero-photo"
              sizes="(max-width: 760px) 100vw, 46vw"
            />
            <div className="photo-top-caption">
              <span>Less small talk.</span>
              <span>More good company.</span>
            </div>
            <div className="hero-photo-bottom">
              <span>A seat at the right table.</span>
              <span aria-hidden="true">↗</span>
            </div>
            <div className="room-stamp" aria-hidden="true">
              <span>GOOD PEOPLE</span>
              <strong>
                Better
                <br />
                <em>rooms.</em>
              </strong>
              <span>TORONTO, ALWAYS</span>
            </div>
            {next && (
              <Link className="hero-admission" href={`/events/${next.slug}`}>
                <div>
                  <span className="eyebrow">
                    The next room ·{" "}
                    {next.isDemo ? "Preview" : "Applications open"}
                  </span>
                  <strong>
                    {formatDate(next.date, true)}
                    <span className="admission-divider">/</span>
                    {next.neighbourhood}
                  </strong>
                </div>
                <span className="admission-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className="hero-bottom">
          <span className="eyebrow">
            One useful lesson. A room full of possibility.
          </span>
          <a href="#next-up" className="eyebrow">
            Take a look inside <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <div
        className="community-ribbon"
        aria-label="Toronto. Founders. Operators. Builders."
      >
        <div>
          <span>Toronto after hours</span>
          <i aria-hidden="true">✳</i>
          <span>Founders</span>
          <i aria-hidden="true">✳</i>
          <span>Operators</span>
          <i aria-hidden="true">✳</i>
          <span>Builders</span>
          <i aria-hidden="true">✳</i>
          <span>Good company</span>
          <i aria-hidden="true">✳</i>
        </div>
      </div>
      <section className="section container next-section" id="next-up">
        <SectionHeading
          label="Clear your calendar"
          title={
            <>
              What’s happening
              <br />
              <em>in the room.</em>
            </>
          }
        >
          <TextLink href="/events">All upcoming events</TextLink>
        </SectionHeading>
        {next ? (
          <EventTicket event={next} />
        ) : (
          <div className="empty-state">
            <h3>The next room is taking shape.</h3>
            <p>Get the invitation before everyone else.</p>
            <ButtonLink href="#newsletter">Keep me in the loop</ButtonLink>
          </div>
        )}
      </section>
      <section
        className="no-pitches container"
        aria-label="Our kind of evening"
      >
        <p>
          No panels.
          <br />
          <span>No pitches.</span>
          <br />
          No awkward networking games<span className="red-text">.</span>
        </p>
        <div>
          <span className="small-star" aria-hidden="true">
            ✳
          </span>
          <p>
            Just people building things
            <br />
            you actually want to ask about.
          </p>
        </div>
      </section>
      <section className="section container format-section">
        <div className="format-heading">
          <Eyebrow>The shape of a good night</Eyebrow>
          <h2>
            Good conversations
            <br />
            need <em>a little structure.</em>
          </h2>
          <p>
            Enough of a plan to make it worthwhile.
            <br />
            Enough room to see where it goes.
          </p>
        </div>
        <div className="format-steps">
          {home.format.map((step) => (
            <article className="format-step" key={step.number}>
              <div className="step-content">
                <span className="step-number">{step.number}</span>
                <div>
                  <Eyebrow>{step.time}</Eyebrow>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
              <Photo
                src={step.image}
                alt={step.alt}
                sizes="(max-width: 760px) 100vw, 30vw"
              />
            </article>
          ))}
          <DemoNote />
        </div>
      </section>
      <section className="manifesto">
        <div className="container">
          <Eyebrow>A small manifesto</Eyebrow>
          <h2>
            Toronto doesn’t need
            <br />
            another networking event.
            <br />
            <em>It needs better rooms.</em>
          </h2>
          <div className="manifesto-bottom">
            <span className="manifesto-star" aria-hidden="true">
              ✳
            </span>
            <p>{home.manifesto}</p>
            <TextLink href="/about" light>
              Why we’re doing this
            </TextLink>
          </div>
        </div>
      </section>
      <section className="section container people-section">
        <div>
          <Eyebrow>Different work. Same curiosity.</Eyebrow>
          <h2>
            Built for people
            <br />
            <em>who build.</em>
          </h2>
          <p>
            You don’t need a unicorn on your LinkedIn. You do need to be
            genuinely building, operating or helping build something.
          </p>
          <TextLink href="/about">You’ll fit right in</TextLink>
        </div>
        <div className="people-list">
          {home.people.map((person, index) => (
            <span
              className={index === 1 || index === 5 ? "serif-person" : ""}
              key={person}
            >
              {person}
              {index < home.people.length - 1 && <i aria-hidden="true"> / </i>}
            </span>
          ))}
        </div>
      </section>
      <section className="section archive-section">
        <div className="container">
          <SectionHeading
            label="From the archive"
            title={
              <>
                Good lessons.
                <br />
                <em>Worth keeping.</em>
              </>
            }
          >
            <div>
              <p>
                Things worth stealing from people
                <br />
                who’ve already learned them.
              </p>
              <TextLink href="/past-talks">Explore the archive</TextLink>
            </div>
          </SectionHeading>
          <div className="archive-grid">
            {past.map((event) => (
              <ArchiveTicket key={event.id} event={event} />
            ))}
          </div>
          <p className="archive-disclaimer">
            A look at the format. These sample recaps will make way for lessons
            from our first rooms.
          </p>
        </div>
      </section>
      <section className="section container speak-section">
        <Eyebrow>Pass it on</Eyebrow>
        <h2>
          Learned something
          <br />
          <em>the hard way?</em>
        </h2>
        <div className="speak-bottom">
          <p>
            Someone else probably needs to hear it.
            <br />
            No motivational speeches. Just useful lessons
            <br className="desktop-break" /> from people who’ve done the work.
          </p>
          <ButtonLink href="/speak">Apply to speak</ButtonLink>
        </div>
        <span className="speak-arrow" aria-hidden="true">
          ↗
        </span>
      </section>
      <section className="community-section">
        <div className="container">
          <div className="community-title">
            <Eyebrow>The best part isn’t on the agenda</Eyebrow>
            <h2>
              Come for the lesson.
              <br />
              <em>Stay for the people.</em>
            </h2>
          </div>
          <div className="community-collage">
            <figure className="collage-one">
              <Photo
                src="/images/the-space.jpg"
                alt="Atmosphere reference: the warm interior of a neighbourhood restaurant"
              />
              <figcaption>
                The kind of night that doesn’t end on time.
              </figcaption>
            </figure>
            <figure className="collage-two">
              <Photo
                src="/images/the-room.jpg"
                alt="Atmosphere reference: candid conversations around a shared table"
              />
              <figcaption>
                Good questions. Second drinks. New friends.
              </figcaption>
            </figure>
            <div className="collage-note">
              <span aria-hidden="true">“</span>
              <p>
                Your next co-founder?
                <br />
                Maybe.
                <br />
                <em>
                  Your kind of people?
                  <br />
                  That’s the idea.
                </em>
              </p>
              <Eyebrow>
                A little less networking.
                <br />A little more being human.
              </Eyebrow>
            </div>
          </div>
          <DemoNote />
          {testimonials.length > 0 && (
            <div className="testimonials">
              {testimonials.map((t) => (
                <blockquote key={t.name}>
                  <p>“{t.quote}”</p>
                  <cite>
                    {t.name} · {t.role}
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
      <section className="section container membership-section">
        <div>
          <Eyebrow>For the regulars · Launching soon</Eyebrow>
          <h2>
            The room doesn’t end
            <br />
            <em>when the night does.</em>
          </h2>
          <p>
            A few familiar faces. A place to ask the real question.
            <br />A community that keeps showing up.
          </p>
          <ButtonLink href="/membership">
            Join the membership waitlist
          </ButtonLink>
        </div>
        <div className="membership-pass">
          <div className="pass-top">
            <strong>{site.name}</strong>
            <span aria-hidden="true">↗</span>
          </div>
          <div className="pass-title">
            Good company.
            <br />
            <em>On repeat.</em>
          </div>
          <div className="pass-bottom">
            <span>Toronto, ON</span>
            <span>Membership · Coming soon</span>
          </div>
        </div>
        <div className="membership-benefits">
          {membershipBenefits.slice(0, 4).map(([title]) => (
            <span key={title}>
              <i aria-hidden="true">↗</i>
              {title}
            </span>
          ))}
        </div>
      </section>
      <section className="partner-strip">
        <div className="container">
          <div>
            <Eyebrow>A little support goes a long way</Eyebrow>
            <h2>
              Put your company
              <br />
              <em>in the right room.</em>
            </h2>
          </div>
          <div>
            <p>
              We work with a small number of companies that genuinely want to
              support Toronto’s founder ecosystem.
            </p>
            <TextLink href="/partners">Partner with us</TextLink>
          </div>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <Eyebrow>A few things you might be wondering</Eyebrow>
          <h2>
            Good
            <br /> <em>questions.</em>
          </h2>
          <p>Something else on your mind?</p>
          <TextLink href="/contact">Say hello</TextLink>
        </div>
        <Accordion items={faqs} />
      </section>
      <Newsletter />
    </>
  );
}
