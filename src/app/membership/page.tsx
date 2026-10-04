import { metadata as makeMetadata } from "@/lib/metadata";
import { membershipBenefits, site } from "@/content/site";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { SubmissionForm } from "@/components/submission-form";
export const metadata = makeMetadata(
  "Membership",
  "For the people who keep coming back. Join the Toronto membership waitlist.",
  "/membership",
);
export default function MembershipPage() {
  return (
    <>
      <section className="section container membership-hero">
        <div>
          <Eyebrow>For the regulars · Launching soon</Eyebrow>
          <h1>
            For people
            <br />
            who keep
            <br />
            <em>coming back.</em>
          </h1>
          <p>
            The night ends. The group chat doesn’t have to. A little more
            access, a few more familiar faces, and a place to keep building
            together.
          </p>
          <ButtonLink href="#waitlist">Join the waitlist</ButtonLink>
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
      </section>
      <section className="section container" style={{ paddingTop: 0 }}>
        <div className="membership-full-benefits">
          {membershipBenefits.map(([title, description]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section waitlist-section" id="waitlist">
        <div className="container application-layout">
          <aside>
            <Eyebrow>Be there from the beginning</Eyebrow>
            <h2>
              Your kind of room.
              <br />
              <em>A little more often.</em>
            </h2>
            <p>
              Membership is taking shape. Join the waitlist and we’ll share the
              details, pricing and first invitations when they’re ready.
            </p>
            <p>No payment. No commitment. Just a place on the list.</p>
          </aside>
          <div className="application-panel">
            <h2>Save me a place.</h2>
            <p>Tell us a little about yourself.</p>
            <SubmissionForm type="membership" />
          </div>
        </div>
      </section>
    </>
  );
}
