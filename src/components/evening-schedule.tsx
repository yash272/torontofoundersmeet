"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { home } from "@/content/home";
import { Eyebrow, Photo } from "@/components/ui";

export function EveningSchedule() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = home.format.length;
    let next = index;
    if (["ArrowRight", "ArrowDown"].includes(event.key))
      next = (index + 1) % count;
    else if (["ArrowLeft", "ArrowUp"].includes(event.key))
      next = (index - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }
  return (
    <section
      className="night-evening container night-section"
      id="the-evening"
      aria-labelledby="evening-heading"
    >
      <div className="night-section-heading">
        <div>
          <Eyebrow>{home.formatLabel}</Eyebrow>
          <h2 id="evening-heading">{home.formatTitle}</h2>
        </div>
        <span className="evening-aside">No panels. No sales pitches.</span>
      </div>
      <div className="rounds-layout">
        <div className="rounds-photos">
          {home.format.map((step, index) => (
            <div
              role="tabpanel"
              id={`evening-panel-${index}`}
              aria-labelledby={`evening-tab-${index}`}
              hidden={active !== index}
              tabIndex={0}
              key={step.number}
              className="round-photo"
            >
              <Photo
                src={step.image}
                alt={step.alt}
                sizes="(max-width: 760px) 100vw, 55vw"
              />
              <div className="round-photo-footer">
                <span>{step.time}</span>
                <span>{step.number} / 03</span>
              </div>
            </div>
          ))}
        </div>
        <div
          className="rounds-tabs"
          role="tablist"
          aria-label="Explore the evening"
          aria-orientation="vertical"
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
              <span className="round-number">{step.number}</span>
              <span className="round-tab-content">
                <strong>{step.title}</strong>
                <span
                  className="round-description"
                  aria-hidden={active !== index}
                >
                  {step.text}
                </span>
              </span>
              <span className="round-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>
      </div>
      <p className="night-demo-caption">
        Illustrative photography · Real community photos coming soon
      </p>
    </section>
  );
}
