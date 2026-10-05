"use client";
import { useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { formContent, submissionSchema, type FormType } from "@/lib/forms";
import { SectionLink } from "./ui";
type Field = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  options?: string[];
};
const fields: Record<FormType, Field[]> = {
  newsletter: [
    {
      name: "email",
      label: "Email address",
      type: "email",
      placeholder: "Your email address",
      required: true,
    },
  ],
  membership: [
    { name: "name", label: "Your name", required: true },
    { name: "email", label: "Email address", type: "email", required: true },
    {
      name: "company",
      label: "What are you building? (optional)",
      placeholder: "Company, project or a very good idea",
    },
    { name: "role", label: "Your role (optional)" },
  ],
  speaker: [
    { name: "name", label: "Your name", required: true },
    { name: "email", label: "Email address", type: "email", required: true },
    {
      name: "linkedin",
      label: "LinkedIn profile",
      type: "url",
      placeholder: "https://linkedin.com/in/you",
      required: true,
    },
    { name: "company", label: "Company or project", required: true },
    { name: "role", label: "Your role", required: true },
    {
      name: "lesson",
      label: "What lesson could you teach?",
      type: "textarea",
      placeholder:
        "One narrow, practical lesson. What could someone do differently the next day?",
      required: true,
      minLength: 30,
    },
    {
      name: "experience",
      label: "Why are you the right person to teach it?",
      type: "textarea",
      placeholder:
        "Tell us about the work, the mistake or the experience behind the lesson.",
      required: true,
      minLength: 30,
    },
    { name: "message", label: "Anything else? (optional)", type: "textarea" },
  ],
  partner: [
    { name: "name", label: "Your name", required: true },
    { name: "email", label: "Work email", type: "email", required: true },
    { name: "company", label: "Company", required: true },
    {
      name: "interest",
      label: "What are you interested in?",
      type: "select",
      options: [
        "Let’s figure it out",
        "Community partner",
        "Event partner",
        "Ecosystem partner",
      ],
    },
    {
      name: "message",
      label: "What do you have in mind?",
      type: "textarea",
      placeholder:
        "A little about your company and how you’d like to support the room.",
      required: true,
      minLength: 20,
    },
  ],
};
export function SubmissionForm({
  type,
  compact = false,
}: {
  type: FormType;
  compact?: boolean;
}) {
  const id = useId();
  const resultRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const content = formContent[type];
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading") return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const payload = { ...values, type, consent: values.consent === "on" };
    const parsed = submissionSchema.safeParse(payload);
    if (!parsed.success) {
      const errors = Object.fromEntries(
        parsed.error.issues.map((issue) => [
          String(issue.path[0]),
          issue.message,
        ]),
      );
      setFieldErrors(errors);
      setError("Please check the highlighted fields.");
      setState("error");
      (form.elements.namedItem(Object.keys(errors)[0]) as HTMLElement)?.focus();
      return;
    }
    setState("loading");
    setError("");
    setFieldErrors({});
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(15_000),
      });
      const data = await response.json();
      if (!response.ok) {
        setFieldErrors(data.fields || {});
        throw new Error(
          data.error || "We couldn’t save your details. Please try again.",
        );
      }
      setState("success");
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch (cause) {
      setState("error");
      setError(
        cause instanceof Error && cause.name !== "TimeoutError"
          ? cause.message
          : "The connection timed out. Please try again.",
      );
    }
  }
  if (state === "success")
    return (
      <div className="form-success" role="status" ref={resultRef} tabIndex={-1}>
        <span className="success-check" aria-hidden="true">
          ✓
        </span>
        <h3>{content.success}</h3>
        <p>{content.detail}</p>
      </div>
    );
  return (
    <form
      className={`submission-form ${compact ? "compact-form" : ""}`}
      onSubmit={handleSubmit}
    >
      <div className="form-fields">
        {fields[type].map((field) => {
          const inputProps = {
            id: `${id}-${field.name}`,
            name: field.name,
            required: field.required,
            placeholder: field.placeholder,
            minLength:
              field.minLength ||
              (field.required && field.type !== "email" && field.type !== "url"
                ? 2
                : undefined),
            maxLength:
              field.type === "textarea"
                ? 3000
                : field.type === "email"
                  ? 254
                  : 150,
            "aria-invalid": !!fieldErrors[field.name] as boolean,
            "aria-describedby": fieldErrors[field.name]
              ? `${id}-${field.name}-error`
              : undefined,
          };
          return (
            <div
              className={`form-field ${field.type === "textarea" ? "field-full" : ""}`}
              key={field.name}
            >
              <label
                className={compact ? "sr-only" : ""}
                htmlFor={inputProps.id}
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea {...inputProps} rows={4} />
              ) : field.type === "select" ? (
                <select id={inputProps.id} name={field.name}>
                  {field.options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  {...inputProps}
                  type={field.type || "text"}
                  autoComplete={
                    field.name === "name"
                      ? "name"
                      : field.name === "email"
                        ? "email"
                        : field.name === "company"
                          ? "organization"
                          : field.name === "role"
                            ? "organization-title"
                            : "off"
                  }
                />
              )}
              {fieldErrors[field.name] && (
                <span className="field-error" id={`${id}-${field.name}-error`}>
                  {fieldErrors[field.name]}
                </span>
              )}
            </div>
          );
        })}
        {compact && (
          <button className="button button-dark" disabled={state === "loading"}>
            {state === "loading" ? "Joining…" : "Join"}
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Leave this empty</label>
        <input
          id={`${id}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          required
          aria-invalid={!!fieldErrors.consent}
        />
        <span>
          {type === "newsletter"
            ? "Send me event news and useful lessons. Unsubscribe anytime."
            : "You may contact me about this request."}{" "}
          <SectionLink section="privacy">Privacy</SectionLink>
        </span>
      </label>
      {fieldErrors.consent && (
        <p className="field-error">
          Please agree so we can respond to your request.
        </p>
      )}
      {!compact && (
        <button className="button button-dark" disabled={state === "loading"}>
          {state === "loading" ? "Sending…" : content.button}
          <span aria-hidden="true">→</span>
        </button>
      )}
      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
    </form>
  );
}
