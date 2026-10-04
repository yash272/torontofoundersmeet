import Link from "next/link";
import { site } from "@/content/site";
import { Eyebrow } from "./ui";
import { SubmissionForm } from "./submission-form";
export function Newsletter() {
  return (
    <section className="newsletter" id="newsletter">
      <div className="container newsletter-inner">
        <div>
          <Eyebrow>Get the invitation</Eyebrow>
          <h2>
            See you at
            <br />
            the next one.
          </h2>
          <p>
            New dates, speaker announcements, and notes worth keeping. We’ll
            email when there’s something to share.
          </p>
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
              ["Events", "/events"],
              ["Speak", "/speak"],
              ["Partners", "/partners"],
              ["Membership", "/membership"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link href={href} key={href}>
                {label}
                <span aria-hidden="true">↗</span>
              </Link>
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
          <Link href="/privacy">Privacy</Link>
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
