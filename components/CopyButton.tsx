"use client";

import { useState } from "react";
import { useI18n } from "@/components/I18nProvider";

/** Copies `value` to the clipboard; announces success to screen readers. */
export default function CopyButton({ value, label }: { value: string; label?: string }) {
  const { dict } = useI18n();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked — the value stays visible and selectable.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-theme border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? dict.contact.copied : (label ?? dict.contact.copy)}
      <span className="sr-only" aria-live="polite">
        {copied ? ` — ${dict.contact.copiedSr}` : ""}
      </span>
    </button>
  );
}
