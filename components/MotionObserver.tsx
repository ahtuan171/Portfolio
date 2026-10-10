"use client";

import { useEffect } from "react";

/**
 * Adds `.is-revealed` to [data-reveal] elements as they scroll into view.
 * Elements added later — a route change, or a theme/language switch that
 * re-renders components on the server — are picked up by a
 * MutationObserver, so nothing is left in its hidden starting state.
 * The hidden state only applies under html.js + prefers-reduced-motion:
 * no-preference (see globals.css).
 */
export default function MotionObserver() {
  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-revealed");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const watch = (root: ParentNode) => {
      root.querySelectorAll?.("[data-reveal]:not(.is-revealed)").forEach((el) => io.observe(el));
      if (root instanceof Element && root.matches("[data-reveal]:not(.is-revealed)")) io.observe(root);
    };
    watch(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "childList") m.addedNodes.forEach((node) => node instanceof Element && watch(node));
        // React may reuse an element and rewrite its class list, dropping
        // `is-revealed` — observe it again (fires at once if on screen).
        else if (m.target instanceof Element && m.target.matches("[data-reveal]:not(.is-revealed)")) io.observe(m.target);
      }
    });
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
