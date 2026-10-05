import { site } from "@/content/site";
import { home } from "@/content/home";
import { ContactAndPrivacy } from "./community-sections";
import { Eyebrow, SectionLink } from "./ui";
import { SubmissionForm } from "./submission-form";
export function Newsletter() {
  return (
    <section className="newsletter" id="newsletter">
      <div className="container newsletter-inner">
        <div>
          <Eyebrow>{home.newsletter.label}</Eyebrow>
          <h2>
            {home.newsletter.title[0]}
            <br />
            {home.newsletter.title[1]}
          </h2>
          <p>{home.newsletter.description}</p>
        </div>
        <SubmissionForm type="newsletter" compact />
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Eyebrow>Toronto, ON</Eyebrow>
            <p className="footer-line">
              Built in Toronto.
              <br />
              For people building everywhere.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            {[
              ["Events", "/#next-up"],
              ["Speak", "/#speaker-application"],
              ["Partners", "/#partners"],
              ["Membership", "/#membership"],
              ["Contact", "/#contact"],
            ].map(([label, href]) => (
              <a href={href} key={href}>
                {label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
          <div className="footer-socials">
            {Object.entries(site.socials).map(([label, href]) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {label === "linkedin" ? "LinkedIn" : "Instagram"}
                  <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span key={label}>
                  {label === "linkedin" ? "LinkedIn" : "Instagram"}
                  <small>Coming soon</small>
                </span>
              ),
            )}
          </div>
        </div>
        <ContactAndPrivacy />
        <Link href="/" className="footer-wordmark">
          {site.name}
          <span className="footer-dot" aria-hidden="true">
            ●
          </span>
        </Link>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Est. {site.established}</span>
          <SectionLink section="privacy">Privacy</SectionLink>
        </div>
        {site.demo && (
          <p className="demo-footer">
            A preview of what’s to come. Events, speakers and recaps are
            illustrative. Photography is for atmosphere; it does not depict our
            community.
          </p>
        )}
      </div>
    </footer>
  );
}
import Link from "next/link";
