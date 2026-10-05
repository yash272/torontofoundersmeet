import Image from "next/image";
import type { AnchorHTMLAttributes, ReactNode } from "react";
export function SectionLink({
  section,
  children,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  section: string;
}) {
  return (
    <a href={`/#${section}`} {...props}>
      {children}
    </a>
  );
}
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? "↗" : "→"}
    </span>
  );
}
export function ButtonLink({
  href,
  children,
  variant = "dark",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "red" | "outline" | "light";
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      className={`button button-${variant} ${className}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Arrow diagonal={external} />
    </a>
  );
}
export function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <a className={`text-link ${light ? "text-link-light" : ""}`} href={href}>
      {children}
      <Arrow />
    </a>
  );
}
export function Eyebrow({
  children,
  dot = false,
}: {
  children: ReactNode;
  dot?: boolean;
}) {
  return (
    <p className="eyebrow">
      {dot && <span className="status-dot" aria-hidden="true" />}
      {children}
    </p>
  );
}
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
    </div>
  );
}
export function DemoNote({ event = false }: { event?: boolean }) {
  return (
    <span className="demo-note">
      {event
        ? "Illustrative event · Details to be confirmed"
        : "Atmosphere photography · A preview of the feeling"}
    </span>
  );
}
export function SectionHeading({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{label}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
