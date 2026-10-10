import Link from "next/link";
import PixelIcon from "@/components/PixelIcons";
import Spidey from "@/components/Spidey";
import { profile } from "@/content/profile";
import { fill } from "@/lib/i18n/localized";
import { getI18n } from "@/lib/i18n/server";

// Theme-specific marks and ornaments, chosen on the server from the active
// theme. Imagery: Pixel Art and Classic backgrounds via lib/themeArt.ts;
// any third-party images are listed in content/credits.ts.

/* ------------------------------------------------------------------ Logo */

export async function Logo() {
  const { theme, dict } = await getI18n();
  const label = fill(dict.nav.homeLink, { name: profile.name });

  return (
    <Link href="/" aria-label={label} className="group flex min-w-0 items-center gap-3">
      {theme === "spidey" && (
        <>
          <Spidey state="awake" glow priority className="h-7 w-auto transition-transform group-hover:-translate-y-0.5" />
          <span className="font-display-theme text-2xl leading-none text-fg">{profile.shortName}</span>
          <span className="hidden font-mono text-xs text-fg-muted sm:inline">/ {profile.alias.toLowerCase()}</span>
        </>
      )}
      {theme === "pixel" && (
        <>
          <PixelIcon name="castle" className="h-6 w-6 text-fg" />
          <span className="font-display-theme text-xl leading-none text-fg">
            {profile.name} <span className="hidden text-fg-dim sm:inline">({profile.alias})</span>
          </span>
        </>
      )}
      {theme === "classic" && (
        <>
          <CompassRose className="h-8 w-8 shrink-0 text-deco transition-transform duration-700 group-hover:rotate-45" />
          <span className="font-display-theme text-2xl leading-none text-fg">
            {profile.shortName}
            <span className="font-accent-theme hidden pl-2 text-lg text-fg-muted sm:inline">{profile.alias}</span>
          </span>
        </>
      )}
      {theme === "minimalist" && (
        <span className="font-display-theme text-2xl leading-none text-fg">
          {profile.shortName}
          <span className="ml-3 hidden border-l border-line pl-3 font-body text-xs font-normal tracking-[0.04em] text-fg-muted sm:inline">
            {profile.alias}
          </span>
        </span>
      )}
    </Link>
  );
}

/* --------------------------------------------------------- Ornaments */

/** Divider between homepage sections, in each world's own idiom. */
export async function SectionOrnament() {
  const { theme } = await getI18n();
  // Classic sections are divided by their own bands and sheets.
  if (theme === "classic") return null;
  if (theme === "minimalist") {
    return (
      <div className="shell" aria-hidden>
        <hr className="border-line" />
      </div>
    );
  }
  return null;
}

/* ------------------------------------------------------------- Classic */

/** Brass rule with a diamond and two studs — the Classic divider. */
export function ClassicRule({ className = "", align = "center" }: { className?: string; align?: "center" | "start" }) {
  return (
    <span aria-hidden className={`flex items-center gap-2 text-deco ${className}`}>
      {align === "center" && <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,currentColor)] opacity-70" />}
      <svg viewBox="0 0 44 12" className="h-3 w-11 shrink-0" fill="currentColor">
        <path d="M2 6h9M33 6h9" stroke="currentColor" strokeWidth="1" />
        <circle cx="14" cy="6" r="1.5" />
        <circle cx="30" cy="6" r="1.5" />
        <path d="M22 0.5 27.5 6 22 11.5 16.5 6Z" />
        <path d="M22 3.5 24.5 6 22 8.5 19.5 6Z" fill="rgb(var(--bg))" />
      </svg>
      <span className="h-px flex-1 bg-[linear-gradient(90deg,currentColor,transparent)] opacity-70" />
    </span>
  );
}

const CORNER_FLIPS = ["", "-scale-x-100", "-scale-y-100", "-scale-100"];
const CORNER_SPOTS = ["left-2 top-2", "right-2 top-2", "bottom-2 left-2", "bottom-2 right-2"];

/** Engraved corner ornaments for a `relative` box (Classic). */
export function ClassicCorners({ className = "text-deco" }: { className?: string }) {
  return (
    <>
      {CORNER_SPOTS.map((spot, i) => (
        <svg
          key={spot}
          viewBox="0 0 24 24"
          aria-hidden
          className={`pointer-events-none absolute h-6 w-6 ${spot} ${CORNER_FLIPS[i]} ${className}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
        >
          <path d="M0.5 23V0.5H23" />
          <path d="M4.5 15V4.5H15" opacity="0.6" />
          <path d="M8.5 6.4 10.6 8.5 8.5 10.6 6.4 8.5Z" fill="currentColor" stroke="none" />
        </svg>
      ))}
    </>
  );
}

/** Eight-point compass rose (Classic logo). */
export function CompassRose({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="10.5" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="16" cy="16" r="12.5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <path d="M16 7.5 17.3 14.7 24.5 16 17.3 17.3 16 24.5 14.7 17.3 7.5 16 14.7 14.7Z" fill="currentColor" opacity="0.55" transform="rotate(45 16 16)" />
      <path d="M16 1 17.9 14.1 31 16 17.9 17.9 16 31 14.1 17.9 1 16 14.1 14.1Z" fill="currentColor" />
      <circle cx="16" cy="16" r="1.3" fill="rgb(var(--bg))" />
    </svg>
  );
}
