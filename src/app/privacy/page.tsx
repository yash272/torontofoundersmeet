import { metadata as makeMetadata } from "@/lib/metadata";
import { site } from "@/content/site";
import { Eyebrow, TextLink } from "@/components/ui";
export const metadata = makeMetadata(
  "Privacy",
  "How information submitted through this website is handled.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <>
      <section className="page-intro container">
        <Eyebrow>Your information</Eyebrow>
        <h1>
          Keep it <em>considered.</em>
        </h1>
        <p>Privacy information for the {site.name} website.</p>
      </section>
      <article className="section container privacy-content">
        <h2>What you choose to share.</h2>
        <p>
          Forms collect the details you enter, such as your name, email, company
          and application. We use them to respond to your request, manage a
          waitlist or send the event news you opted into. Please don’t include
          sensitive personal information in an application.
        </p>
        <h2>What happens to a submission.</h2>
        <p>
          Submissions are stored by the website’s configured form service. The
          local preview stores them privately on the server. A production
          delivery service must be configured before launch. The website does
          not sell attendee lists.
        </p>
        <h2>Your choices.</h2>
        <p>
          Newsletter emails must include a way to unsubscribe. Transactional
          replies about an application are separate from newsletter
          subscriptions. You can leave a form unsubmitted if you don’t want to
          share your information.
        </p>
        <h2>External services.</h2>
        <p>
          An event may link to a separate registration service such as Luma.
          That service handles the information you provide on its site under its
          own privacy policy. Fonts and atmosphere images on this website are
          served locally.
        </p>
        <h2>Before the public launch.</h2>
        <p>
          This is a working preview. The organizer’s legal identity, privacy
          contact, production service providers and retention policy must be
          added here before collecting information from the public.
        </p>
        <TextLink href="/contact">Contact the team</TextLink>
      </article>
    </>
  );
}
