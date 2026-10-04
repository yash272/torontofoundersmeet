"use client";
import { useId, useState } from "react";
export function Accordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [active, setActive] = useState<number | null>(null);
  const id = useId();
  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div
          className={`accordion-item ${active === index ? "is-open" : ""}`}
          key={item.question}
        >
          <h3>
            <button
              aria-expanded={active === index}
              aria-controls={`${id}-${index}`}
              onClick={() => setActive(active === index ? null : index)}
            >
              {item.question}
              <span className="plus" aria-hidden="true" />
            </button>
          </h3>
          <div
            id={`${id}-${index}`}
            className="accordion-panel"
            aria-hidden={active !== index}
          >
            <div>
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
