import { metadata as makeMetadata } from "@/lib/metadata";
import { partnerPackages } from "@/content/site";
import { Eyebrow, TextLink } from "@/components/ui";
import { SubmissionForm } from "@/components/submission-form";
export const metadata = makeMetadata(
  "Partners",
  "Support Toronto’s builders through a thoughtful event or community partnership.",
  "/partners",
);
export default function PartnersPage() {
  return (
    <>
      <section className="page-intro container">
        <Eyebrow>Good rooms need good partners</Eyebrow>
        <h1>
          Be part of
          <br />
          <em>what happens next.</em>
        </h1>
        <p>
          We work with a small number of companies that genuinely want to
          support Toronto’s founder ecosystem. Useful participation. Thoughtful
          visibility. A real reason to be in the room.
        </p>
      </section>
      <section className="section container partner-packages">
        {partnerPackages.map((p) => (
          <article className="partner-package" key={p.name}>
            <h2>{p.name}</h2>
            <p>{p.subtitle}</p>
            <ul>
              {p.benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <TextLink href="#inquiry">Let’s talk about it</TextLink>
          </article>
        ))}
      </section>
      <section className="section waitlist-section" id="inquiry">
        <div className="container application-layout">
          <aside>
            <Eyebrow>Thoughtful by design</Eyebrow>
            <h2>
              A good fit
              <br />
              <em>comes first.</em>
            </h2>
            <p>
              Partnership places are limited so the room stays focused on the
              people in it. We’ll shape the details around what you can
              contribute and what the community actually needs.
            </p>
            <p>
              No attendee lists for sale. No surprise pitches. Just a considered
              way to support people doing the work.
            </p>
          </aside>
          <div className="application-panel">
            <h2>Start a conversation.</h2>
            <p>Tell us who you are and what you have in mind.</p>
            <SubmissionForm type="partner" />
          </div>
        </div>
      </section>
    </>
  );
}
