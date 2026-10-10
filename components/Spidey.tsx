import Image from "next/image";

// Keep in sync with the state → file mapping documented in
// public/assets/MASCOT.md.
export type SpideyState =
  | "awake"
  | "asleep"
  | "coffee"
  | "web-shoot"
  | "thinking"
  | "hanging"
  | "coding"
  | "success"
  | "confused"
  | "error";

/**
 * Pixel mascot sprite. Decorative by default (empty alt) — pass `label`
 * only when the sprite itself carries meaning. The `.mascot` class tints
 * it via --mascot-filter and hides it in worlds that have no mascot
 * (--mascot-display: only Spidey Universe shows it).
 */
export default function Spidey({
  state,
  className,
  glow = false,
  label,
  priority = false,
}: {
  state: SpideyState;
  className?: string;
  glow?: boolean;
  label?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/assets/spidey-${state}.svg`}
      alt={label ?? ""}
      aria-hidden={label ? undefined : true}
      width={128}
      height={72}
      unoptimized
      priority={priority}
      className={[
        "mascot",
        className,
        glow ? "mascot-glow" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
