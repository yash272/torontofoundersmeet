import { home } from "@/content/home";
import {
  membershipBenefits,
  partnerPackages,
  principles,
} from "@/content/site";
import { SubmissionForm } from "./submission-form";
import { Eyebrow, SectionLink } from "./ui";

export function OurStory() {
  return (
    <details id="our-story" className="inline-disclosure story-disclosure">
      <summary>
        <span>{home.city.action}</span>
        <span className="disclosure-symbol" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="inline-story">
        <p>{home.city.story}</p>
        <div>
          {principles.map(([title, description]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </details>
  );
}

export function CommunityApplications() {
  return (
    <>
      <section className="night-invitations container">
        <div className="night-invitation" id="speak">
          <Eyebrow>{home.speak.label}</Eyebrow>
          <h2>{home.speak.title}</h2>
          <p>{home.speak.description}</p>
          <details
            id="speaker-application"
            className="inline-disclosure application-disclosure"
          >
            <summary>
              <span>{home.speak.action}</span>
              <span className="disclosure-symbol" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="inline-form-panel">
              <p>{home.speak.guidance}</p>
              <SubmissionForm type="speaker" />
            </div>
          </details>
        </div>
        <div className="night-invitation night-invitation-dark" id="membership">
          <Eyebrow>{home.membership.label}</Eyebrow>
          <h2>{home.membership.title}</h2>
          <p>{home.membership.description}</p>
          <details
            id="membership-waitlist"
            className="inline-disclosure application-disclosure"
          >
            <summary>
              <span>{home.membership.action}</span>
              <span className="disclosure-symbol" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="inline-form-panel">
              <p>{home.membership.guidance}</p>
              <ul className="inline-benefits">
                {membershipBenefits.map(([title]) => (
                  <li key={title}>{title}</li>
                ))}
              </ul>
              <SubmissionForm type="membership" />
            </div>
          </details>
        </div>
      </section>
      <section id="partners" className="container inline-partners">
        <details
          id="partner-inquiry"
          className="inline-disclosure partner-disclosure"
        >
          <summary>
            <span>
              <strong>{home.partners.title}</strong>{" "}
              <span className="partner-summary-copy">
                {home.partners.description}
              </span>
            </span>
            <span>
              {home.partners.action}{" "}
              <span className="disclosure-symbol" aria-hidden="true">
                +
              </span>
            </span>
          </summary>
          <div className="inline-partner-body">
            <div>
              <h2>
                Put your company
                <br />
                in the right room.
              </h2>
              <p>{home.partners.guidance}</p>
              <div className="inline-packages">
                {partnerPackages.map((pack) => (
                  <article key={pack.name}>
                    <h3>{pack.name}</h3>
                    <p>{pack.subtitle}</p>
                    <ul>
                      {pack.benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
            <div className="inline-form-panel">
              <h3>Start a conversation.</h3>
              <SubmissionForm type="partner" />
            </div>
          </div>
        </details>
      </section>
    </>
  );
}

export function ContactAndPrivacy() {
  return (
    <div className="footer-details">
      <details id="contact" className="inline-disclosure">
        <summary>
          <span>Contact the team</span>
          <span className="disclosure-symbol" aria-hidden="true">
            +
          </span>
        </summary>
        <div className="inline-contact">
          <p>
            A lesson to share, a room to offer, or a way to help. Start here.
          </p>
          <SectionLink section="speaker-application">
            Teach a lesson <span aria-hidden="true">↗</span>
          </SectionLink>
          <SectionLink section="partner-inquiry">
            Offer a space or partnership <span aria-hidden="true">↗</span>
          </SectionLink>
          <SectionLink section="newsletter">
            Hear about the next event <span aria-hidden="true">↗</span>
          </SectionLink>
        </div>
      </details>
      <details id="privacy" className="inline-disclosure">
        <summary>
          <span>Privacy</span>
          <span className="disclosure-symbol" aria-hidden="true">
            +
          </span>
        </summary>
        <div className="inline-privacy">
          <h3>What you choose to share.</h3>
          <p>
            Forms collect the details you enter, such as your name, email,
            company and application. We use them to respond to your request,
            manage a waitlist or send the event news you opted into. Please
            don’t include sensitive personal information in an application.
          </p>
          <h3>What happens to a submission.</h3>
          <p>
            Submissions are stored by the website’s configured form service. The
            local preview stores them privately on the server. A production
            delivery service must be configured before launch. The website does
            not sell attendee lists.
          </p>
          <h3>Your choices.</h3>
          <p>
            Newsletter emails must include a way to unsubscribe. Replies about
            an application are separate from newsletter subscriptions. You can
            leave a form unsubmitted if you don’t want to share your
            information.
          </p>
          <h3>External services.</h3>
          <p>
            An event may link to a registration service such as Luma, which
            handles the information you provide under its own privacy policy.
            Fonts and images on this website are served locally.
          </p>
          <h3>Before the public launch.</h3>
          <p>
            This is a working preview. The organizer’s legal identity, privacy
            contact, production service providers and retention policy must be
            added here before collecting information from the public.
          </p>
          <SectionLink section="contact">Contact the team →</SectionLink>
        </div>
      </details>
    </div>
  );
}
