import { metadata as makeMetadata } from "@/lib/metadata";
import { Eyebrow, TextLink } from "@/components/ui";
import { Newsletter } from "@/components/footer";
export const metadata = makeMetadata(
  "Contact",
  "Find your way into the room: attend, teach a lesson or help make an event happen.",
  "/contact",
);
export default function ContactPage() {
  return (
    <>
      <section className="page-intro container">
        <Eyebrow>The conversation starts here</Eyebrow>
        <h1>
          Come say <span>hello.</span>
        </h1>
        <p>
          A lesson to share, a room to offer, or just a curiosity about what’s
          next. There’s a way in.
        </p>
      </section>
      <section className="section container contact-options">
        <article>
          <h2>Find your people.</h2>
          <p>
            Check the calendar, get the event details and join us for a useful
            evening.
          </p>
          <TextLink href="/events">See the events</TextLink>
        </article>
        <article>
          <h2>Share a lesson.</h2>
          <p>
            Tell us about something you’ve learned by doing it. We’ll take it
            from there.
          </p>
          <TextLink href="/speak">Apply to speak</TextLink>
        </article>
        <article>
          <h2>Make a room happen.</h2>
          <p>
            Have a space, an idea or a way to support the community? Tell us
            about it.
          </p>
          <TextLink href="/partners#inquiry">Start a conversation</TextLink>
        </article>
      </section>
      <Newsletter />
    </>
  );
}
