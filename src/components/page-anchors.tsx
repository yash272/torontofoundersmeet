"use client";

import { useEffect } from "react";

// Keep deep links useful even when their content lives inside a closed disclosure.
export function PageAnchors() {
  useEffect(() => {
    function reveal() {
      let id: string;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      let ancestor: HTMLElement | null = target;
      while (ancestor) {
        if (ancestor instanceof HTMLDetailsElement) ancestor.open = true;
        ancestor = ancestor.parentElement;
      }
      requestAnimationFrame(() => {
        target.scrollIntoView({ block: "start" });
        const focus =
          target instanceof HTMLDetailsElement
            ? target.querySelector("summary")
            : target;
        if (focus instanceof HTMLElement) {
          if (!focus.hasAttribute("tabindex") && focus.tagName !== "SUMMARY")
            focus.tabIndex = -1;
          focus.focus({ preventScroll: true });
        }
      });
    }
    function click(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank")
        return;
      const url = new URL(link.href);
      if (
        url.origin === location.origin &&
        url.pathname === location.pathname &&
        url.hash
      ) {
        // Also handles clicking the currently selected fragment again.
        requestAnimationFrame(reveal);
      }
    }
    reveal();
    window.addEventListener("hashchange", reveal);
    document.addEventListener("click", click);
    return () => {
      window.removeEventListener("hashchange", reveal);
      document.removeEventListener("click", click);
    };
  }, []);
  return null;
}
