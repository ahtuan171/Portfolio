"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, useTransition, type KeyboardEvent } from "react";
import { useI18n } from "@/components/I18nProvider";
import { fill } from "@/lib/i18n/localized";
import { setPreferenceCookie } from "@/lib/cookies";
import { captureScrollAnchor } from "@/lib/scrollAnchor";
import { THEME_COOKIE, THEMES, type RevealOrigin, type ThemeId } from "@/lib/theme";

type ViewTransition = { ready: Promise<void>; finished: Promise<void>; skipTransition: () => void };
type DocWithVT = Document & { startViewTransition?: (cb: () => Promise<void>) => ViewTransition };

const DURATION = 850;
const EASING = "cubic-bezier(0.65, 0, 0.35, 1)";
const RING = 64; // width of the soft colored band leading the reveal (px)

function originPoint(origin: RevealOrigin) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const x = origin.endsWith("right") ? w : 0;
  const y = origin.startsWith("bottom") ? h : 0;
  // Distance to the farthest viewport corner: the circle must cover it.
  const radius = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
  return { x, y, radius };
}

/**
 * Minimal theme dropdown (menu button + menuitemradio options) with a
 * cinematic corner reveal between worlds.
 *
 * Lifecycle of a switch:
 *   1. Menu closes; the cookie is written (persistence).
 *   2. startViewTransition() snapshots the current page — it stays still.
 *   3. Inside the update: data-theme flips and the server re-renders the
 *      route (theme-specific components) — we wait for it (max 1.5 s).
 *   4. The new page expands in a circle from the configured corner, led by
 *      a soft ring in the destination's color (Web Animations API).
 * Reduced motion → instant switch. No View Transitions → color-veil
 * fallback. A new choice mid-transition skips the running one.
 */
export default function ThemeSwitcher() {
  const { theme, dict } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<ThemeId>(theme);
  const [focusIndex, setFocusIndex] = useState(0);
  const [pending, startTransition] = useTransition();
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLUListElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);
  const waiting = useRef<(() => void)[]>([]);
  const restoreScroll = useRef<(() => void) | null>(null);
  const anchorAtOpen = useRef<(() => void) | null>(null);
  const active = useRef<{ vt?: ViewTransition; gen: number }>({ gen: 0 });
  const menuId = useId();
  const buttonId = useId();
  const currentName = THEMES.find((t) => t.id === current)?.name ?? "";

  // When the server re-render lands: restore the reader's place, then let
  // any waiting transition continue.
  useEffect(() => {
    if (pending) return;
    restoreScroll.current?.();
    restoreScroll.current = null;
    waiting.current.splice(0).forEach((resolve) => resolve());
  }, [pending]);

  const refreshAndWait = useCallback(
    () =>
      new Promise<void>((resolve) => {
        waiting.current.push(resolve);
        startTransition(() => router.refresh());
        window.setTimeout(resolve, 1500); // never hang the transition
      }),
    [router]
  );

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) button.current?.focus({ preventScroll: true });
  }, []);

  // Close on outside pointer / focus leaving the widget.
  useEffect(() => {
    if (!open) return;
    const outside = (e: Event) => {
      const target = e.target as Node;
      if (!menu.current?.contains(target) && !button.current?.contains(target)) close(false);
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", outside);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", outside);
    };
  }, [open, close]);

  // Move focus to the active option when the menu opens / focus moves.
  useEffect(() => {
    if (open) items.current[focusIndex]?.focus({ preventScroll: true });
  }, [open, focusIndex]);

  function openMenu(index = THEMES.findIndex((t) => t.id === current)) {
    anchorAtOpen.current = captureScrollAnchor();
    setFocusIndex(Math.max(0, index));
    setOpen(true);
  }

  function select(next: ThemeId) {
    close(true);
    if (next === current) return;
    setCurrent(next);
    setPreferenceCookie(THEME_COOKIE, next);
    restoreScroll.current = anchorAtOpen.current ?? captureScrollAnchor();
    anchorAtOpen.current = null;
    switchTheme(next);
  }

  function switchTheme(next: ThemeId) {
    const root = document.documentElement;
    const gen = ++active.current.gen;
    active.current.vt?.skipTransition();
    const apply = () => root.setAttribute("data-theme", next);
    const config = THEMES.find((t) => t.id === next)!.transition;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as DocWithVT;

    if (reduce) {
      apply();
      void refreshAndWait();
      return;
    }

    const { x, y, radius } = originPoint(config.origin);
    const circle = (r: number) => `circle(${Math.max(0, r)}px at ${x}px ${y}px)`;

    if (!doc.startViewTransition || !("registerProperty" in CSS)) {
      // Fallback: a veil in the destination color sweeps in, the theme is
      // applied underneath, then the veil fades away.
      const veil = document.createElement("div");
      veil.className = "theme-veil-fallback";
      veil.setAttribute("aria-hidden", "true");
      veil.style.background = config.color;
      document.body.appendChild(veil);
      veil
        .animate({ clipPath: [circle(0), circle(radius)] }, { duration: DURATION * 0.7, easing: EASING, fill: "forwards" })
        .finished.then(async () => {
          apply();
          await refreshAndWait();
          await veil.animate({ opacity: [1, 0] }, { duration: 320, easing: "ease-out", fill: "forwards" }).finished;
        })
        .finally(() => veil.remove());
      return;
    }

    // A transparent, fixed element whose snapshot carries the colored ring.
    const veil = document.createElement("div");
    veil.setAttribute("aria-hidden", "true");
    Object.assign(veil.style, {
      position: "fixed",
      inset: "0",
      pointerEvents: "none",
      viewTransitionName: "theme-veil",
    });
    root.setAttribute("data-theme-switching", "");
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-color", config.color);

    const vt = doc.startViewTransition(async () => {
      apply();
      document.body.appendChild(veil);
      await refreshAndWait();
    });
    active.current.vt = vt;

    vt.ready
      .then(() => {
        const timing = { duration: DURATION, easing: EASING, fill: "both" as const };
        // The real destination page, revealed from the corner…
        root.animate(
          { clipPath: [circle(0), circle(radius + RING / 2)] },
          { ...timing, pseudoElement: "::view-transition-new(root)" }
        );
        // …led by a soft band of the destination color hiding the seam.
        root.animate(
          [{ "--vt-r": "0px" }, { "--vt-r": `${radius + RING}px` }] as Keyframe[],
          { ...timing, pseudoElement: "::view-transition-new(theme-veil)" }
        );
      })
      .catch(() => {});

    vt.finished.finally(() => {
      veil.remove();
      if (active.current.gen === gen) {
        root.removeAttribute("data-theme-switching");
        active.current.vt = undefined;
      }
    });
  }

  function onButtonKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      openMenu(e.key === "ArrowUp" ? THEMES.length - 1 : undefined);
    }
  }

  function onMenuKeyDown(e: KeyboardEvent<HTMLUListElement>) {
    const last = THEMES.length - 1;
    const move = (i: number) => {
      e.preventDefault();
      setFocusIndex(i);
    };
    if (e.key === "ArrowDown") move(focusIndex === last ? 0 : focusIndex + 1);
    else if (e.key === "ArrowUp") move(focusIndex === 0 ? last : focusIndex - 1);
    else if (e.key === "Home") move(0);
    else if (e.key === "End") move(last);
    else if (e.key === "Escape") {
      e.preventDefault();
      close(true);
    } else if (e.key === "Tab") close(false);
  }

  return (
    <div className="relative">
      <button
        ref={button}
        id={buttonId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={fill(dict.prefs.themeButton, { name: currentName })}
        onClick={() => (open ? close(false) : openMenu())}
        onKeyDown={onButtonKeyDown}
        className="flex h-10 items-center gap-2 rounded-theme border border-line bg-surface/40 px-3 text-fg transition-colors hover:border-accent hover:text-accent"
      >
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] sm:inline">{currentName}</span>
        <svg viewBox="0 0 24 24" className="h-4 w-4 sm:hidden" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.6-.9 1.2-1.8-.5-1-.1-2.2 1.1-2.2H17a4 4 0 0 0 4-4c0-5.5-4-10-9-10Z" />
        </svg>
        <svg
          viewBox="0 0 12 12"
          className={`h-3 w-3 text-fg-muted transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" />
        </svg>
      </button>

      {open && (
        <ul
          ref={menu}
          id={menuId}
          role="menu"
          aria-labelledby={buttonId}
          onKeyDown={onMenuKeyDown}
          className="absolute right-0 top-full z-50 mt-2 min-w-[12.5rem] rounded-theme border border-line bg-bg/95 p-1 shadow-2xl shadow-black/40 backdrop-blur-md"
        >
          {THEMES.map((t, i) => {
            const checked = t.id === current;
            return (
              <li key={t.id} role="none">
                <button
                  ref={(el) => {
                    items.current[i] = el;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={checked}
                  tabIndex={i === focusIndex ? 0 : -1}
                  onClick={() => select(t.id)}
                  onMouseEnter={() => setFocusIndex(i)}
                  className={`flex w-full items-center justify-between gap-6 rounded-theme px-3 py-2.5 text-left font-body text-sm transition-colors hover:bg-surface-2 focus:outline-none focus-visible:bg-surface-2 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
                    checked ? "text-accent" : "text-fg"
                  }`}
                >
                  {t.name}
                  <svg
                    viewBox="0 0 12 12"
                    className={`h-3 w-3 ${checked ? "" : "invisible"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden
                  >
                    <path d="M2 6.5 5 9.5l5-7" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
