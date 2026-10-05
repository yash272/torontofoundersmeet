"use client";
import Link from "next/link";
import { SectionLink } from "./ui";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/content/site";
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const listener = () => setScrolled(window.scrollY > 24);
    listener();
    window.addEventListener("scroll", listener, { passive: true });
    return () => window.removeEventListener("scroll", listener);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeAtDesktop = () => {
      if (window.innerWidth > 1000) setOpen(false);
    };
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const links = Array.from(
          menuRef.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
        );
        const first = toggleRef.current,
          last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    window.addEventListener("resize", closeAtDesktop);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handler);
      window.removeEventListener("resize", closeAtDesktop);
    };
  }, [open]);
  return (
    <header
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-is-open" : ""}`}
    >
      <div className="header-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label={`${site.name} home`}
          onClick={() => setOpen(false)}
        >
          <span className="brand-lines">
            {site.wordmarkLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </span>
          <span className="brand-city">
            Toronto,
            <br />
            Canada.
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <SectionLink section="next-up" className="nav-cta">
          Join the next one <span aria-hidden="true">↗</span>
        </SectionLink>
        <button
          className="menu-toggle"
          ref={toggleRef}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
      <nav
        id="mobile-menu"
        ref={menuRef}
        className="mobile-menu"
        aria-label="Mobile navigation"
        inert={!open}
        aria-hidden={!open}
      >
        <p className="eyebrow">Founders & operators, off the clock.</p>
        {navigation.map((item) => (
          <a href={item.href} key={item.href} onClick={() => setOpen(false)}>
            {item.label}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
        <SectionLink
          section="speaker-application"
          onClick={() => setOpen(false)}
        >
          Speak at an event<span aria-hidden="true">↗</span>
        </SectionLink>
        <p className="eyebrow mobile-location">Toronto, ON · Est. 2026</p>
      </nav>
    </header>
  );
}
