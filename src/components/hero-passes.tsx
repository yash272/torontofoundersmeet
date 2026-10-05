import { Photo, SectionLink } from "./ui";

export function PitcherIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M30 25h51l-6 14 7 51a10 10 0 0 1-10 12H39a10 10 0 0 1-10-12l7-51-6-14Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M78 43h11c21 0 23 36 2 40H81M35 54h40M47 65v23M63 65v23M43 14l-3-7M64 12V4M85 15l5-7"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Original CSS/SVG event-pass composition. The Toronto photo is credited in README.
export function HeroPasses() {
  return (
    <div
      className="hero-passes"
      aria-label="One useful lesson, then a good night in Toronto"
    >
      <div className="pass-orbit" aria-hidden="true" />
      <SectionLink
        section="about"
        className="hero-pass city-pass"
        aria-label="Meet the Toronto community"
      >
        <span className="pass-label">
          Made in Toronto <span>↗</span>
        </span>
        <Photo
          src="/images/toronto-streetcar.jpg"
          alt="A red streetcar in downtown Toronto, photographed by Nathalia Segato"
          priority
          sizes="(max-width: 760px) 40vw, 240px"
        />
        <strong>
          Same city.
          <br />
          New people.
        </strong>
        <span className="pass-fine">Meet your neighbours.</span>
      </SectionLink>
      <SectionLink
        section="the-evening"
        className="hero-pass drinks-pass"
        aria-label="Explore the evening"
      >
        <span className="pass-label">
          After the lesson <span>↗</span>
        </span>
        <strong>
          Stay for
          <br />
          another.
        </strong>
        <PitcherIcon />
        <span className="pass-bottom">
          Good drinks.
          <br />
          Better conversations.
        </span>
      </SectionLink>
      <SectionLink
        section="next-up"
        className="hero-pass lesson-pass"
        aria-label="View the next founder workshop"
      >
        <span className="pass-label">
          One founder. One useful lesson. <span>↗</span>
        </span>
        <span className="pass-microphone" aria-hidden="true">
          <svg viewBox="0 0 64 64" fill="none">
            <rect
              x="23"
              y="5"
              width="18"
              height="33"
              rx="9"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M16 28v3a16 16 0 0 0 32 0v-3M32 47v12M23 59h18"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="pass-duration">
          <strong>45</strong>
          <span>MINUTES</span>
        </span>
        <span className="pass-promise">Something you can use on Monday.</span>
        <span className="pass-brand">
          Founders
          <br />
          &amp; Pitchers<span>TORONTO, ON · EST. 2026</span>
        </span>
      </SectionLink>
      <div className="pass-sticker" aria-hidden="true">
        Come solo.
        <br />
        Stay awhile.<span>↗</span>
      </div>
      <span className="pass-caption">
        A lesson worth closing your laptop for.
      </span>
    </div>
  );
}
