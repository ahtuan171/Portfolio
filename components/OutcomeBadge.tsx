import type { OutcomeKind } from "@/content/milestones";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

const styles: Record<OutcomeKind, string> = {
  award: "border-accent bg-accent text-accent-on",
  shipped: "border-accent-2/60 text-accent-2",
  completed: "border-line text-fg-dim",
  participated: "border-line text-fg-muted",
  ongoing: "border-dashed border-accent/70 text-accent",
};

// 7×7 pixel icons (Pixel Art quest markers).
export const pixelIcons: Record<OutcomeKind, string> = {
  award: "M3 0h1v2h3v1H6v1H5v2H4V5H3v1H2V4H1V3H0V2h3z",
  shipped: "M3 0h1v1h1v1h1v1H4v4H3V3H1V2h1V1h1z",
  completed: "M6 1h1v2H6v1H5v1H4v1H3V5H2V4H1V3h1v1h1v1h1V4h1V3h1z",
  participated: "M1 0h5v1h1v2H6v1H2v3H1z",
  ongoing: "M1 0h5v1H5v1H4v1h1v1h1v3H1V4h1V3h1V2H2V1H1z",
};

export function PixelIcon({ kind, className = "" }: { kind: OutcomeKind; className?: string }) {
  return (
    <svg viewBox="0 0 7 7" className={`fill-current ${className}`} shapeRendering="crispEdges" aria-hidden>
      <path d={pixelIcons[kind]} />
    </svg>
  );
}

/** Outcome label. Participation and awards are always visually distinct. */
export default function OutcomeBadge({ kind, dict, pixel = false }: { kind: OutcomeKind; dict: Dictionary; pixel?: boolean }) {
  return (
    <span
      className={`outcome-badge inline-flex items-center gap-1.5 rounded-theme border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.15em] ${styles[kind]}`}
    >
      {pixel && <PixelIcon kind={kind} className="h-2.5 w-2.5" />}
      {dict.journey.outcomes[kind]}
    </span>
  );
}
