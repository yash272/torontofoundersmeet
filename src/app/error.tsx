"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="container not-found">
      <p className="eyebrow">A brief interruption</p>
      <h1>
        Let’s try
        <br />
        <span>that again.</span>
      </h1>
      <p>We couldn’t load this page. Please try once more.</p>
      <button className="button button-dark" onClick={reset}>
        Try again <span aria-hidden="true">→</span>
      </button>
    </section>
  );
}
