import { metadata as makeMetadata } from "@/lib/metadata";
import { principles } from "@/content/site";
import {
  ButtonLink,
  DemoNote,
  Eyebrow,
  Photo,
  TextLink,
} from "@/components/ui";
import { Newsletter } from "@/components/footer";
export const metadata = makeMetadata(
  "About",
  "We wanted to build the whole event around the best conversation of the night.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <section className="page-intro container">
        <Eyebrow>Our kind of Toronto</Eyebrow>
        <h1>
          The best part
          <br />
          was always <em>afterward.</em>
        </h1>
        <p>So we decided to build the whole evening around it.</p>
        <Photo
          src="/images/the-lesson.jpg"
          alt="Atmosphere reference: a group in an open, informal conversation"
          className="about-photo"
          priority
          sizes="100vw"
        />
        <DemoNote />
      </section>
      <section className="section container editorial-split">
        <div>
          <Eyebrow>Why this exists</Eyebrow>
          <h2 style={{ marginTop: 24 }}>
            Less working
            <br />
            the room.
            <br />
            <em>More being in it.</em>
          </h2>
        </div>
        <div className="prose">
          <p>
            Toronto has plenty of ambitious people. And no shortage of events
            promising to put them in the same room.
          </p>
          <p>
            But the conversation you remember usually happens afterward. In the
            corner of the bar. Halfway through a second drink. When someone
            stops delivering the polished version and tells you what actually
            happened.
          </p>
          <p>
            The hire they almost didn’t make. The first customer who said yes.
            The launch that went nowhere, and what finally changed.
          </p>
          <p>
            That’s the moment we want to build around. One founder or operator,
            teaching one useful thing they learned firsthand. A thoughtful mix
            of people. Plenty of time to keep talking.
          </p>
          <p>
            Small enough to ask the second question. Good enough to leave with
            something you’ll use.
          </p>
          <TextLink href="/events">Find your next good room</TextLink>
        </div>
      </section>
      <section className="manifesto">
        <div className="container">
          <Eyebrow>A few things we believe</Eyebrow>
          <h2>
            Keep it small.
            <br />
            <em>Make it matter.</em>
          </h2>
          <div className="principle-grid">
            {principles.map(([title, body]) => (
              <article className="principle" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container organizer-section">
        <Photo
          src="/images/the-room.jpg"
          alt="Atmosphere photograph of a shared table; organizer portraits will be added at launch"
        />
        <div>
          <Eyebrow>Built around a shared table</Eyebrow>
          <h2>
            Toronto is better
            <br />
            <em>when we show up.</em>
          </h2>
          <p>
            King West to Kensington. Ossington to the east end. Different
            people, different work, one city full of things worth building.
          </p>
          <p>
            We’re putting together the first rooms. If you have a lesson to
            share, a space to host or a way to help, we’d like to hear from you.
          </p>
          <ButtonLink href="/contact">Come build this with us</ButtonLink>
          <DemoNote />
        </div>
      </section>
      <Newsletter />
    </>
  );
}
