"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";
import { useI18n } from "@/components/I18nProvider";
import { LOCALE_COOKIE, LOCALES, type Locale } from "@/lib/i18n/config";
import { setPreferenceCookie } from "@/lib/cookies";
import { captureScrollAnchor } from "@/lib/scrollAnchor";

/**
 * EN / VI toggle. Stores the choice in a cookie and re-renders the current
 * route on the server (soft refresh: same URL, query, scroll and theme).
 */
export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, dict } = useI18n();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const restoreScroll = useRef<(() => void) | null>(null);

  // Text length changes between languages; keep the reader's place.
  useEffect(() => {
    if (pending) return;
    restoreScroll.current?.();
    restoreScroll.current = null;
  }, [pending]);

  function choose(next: Locale) {
    if (next === locale) return;
    setPreferenceCookie(LOCALE_COOKIE, next);
    restoreScroll.current = captureScrollAnchor();
    document.documentElement.setAttribute("lang", next);
    startTransition(() => router.refresh());
  }

  return (
    <div
      role="group"
      aria-label={dict.prefs.languageGroup}
      aria-busy={pending}
      className={`flex h-10 items-center rounded-theme border border-line p-0.5 ${className}`}
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={locale === l}
          aria-label={dict.prefs[l]}
          onClick={() => choose(l)}
          className="h-full rounded-theme px-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-dim transition-colors hover:text-fg aria-pressed:bg-accent aria-pressed:text-accent-on"
        >
          {l}
        </button>
      ))}
    </div>
  );
}
