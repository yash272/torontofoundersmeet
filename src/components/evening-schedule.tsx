"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { home } from "@/content/site";
import { DemoNote, Eyebrow, Photo } from "@/components/ui";

export function EveningSchedule() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = home.format.length;
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % count;
    else if (event.key === "ArrowLeft") next = (index - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section
      className="section container evening"
      aria-labelledby="evening-heading"
    >
      <div className="evening-heading">
        <div>
          <Eyebrow>The format</Eyebrow>
          <h2 id="evening-heading">{home.formatTitle}</h2>
        </div>
        <p>{home.formatDescription}</p>
      </div>
      <div
        className="evening-tabs"
        role="tablist"
        aria-label="Explore the evening"
      >
        {home.format.map((step, index) => (
          <button
            key={step.number}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            role="tab"
            id={`evening-tab-${index}`}
            aria-controls={`evening-panel-${index}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => navigate(event, index)}
          >
            <span>{step.time}</span>
            <strong>{step.title}</strong>
            <span className="evening-tab-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
      {home.format.map((step, index) => (
        <div
          className="evening-panel"
          role="tabpanel"
          id={`evening-panel-${index}`}
          aria-labelledby={`evening-tab-${index}`}
          hidden={active !== index}
          tabIndex={0}
          key={step.number}
        >
          <Photo
            src={step.image}
            alt={step.alt}
            sizes="(max-width: 760px) 100vw, 60vw"
          />
          <div className="evening-note">
            <p className="evening-time">{step.time}</p>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            <p className="evening-detail">{step.detail}</p>
            <span className="evening-count" aria-hidden="true">
              {step.number} / 03
            </span>
          </div>
        </div>
      ))}
      <DemoNote />
    </section>
  );
}
