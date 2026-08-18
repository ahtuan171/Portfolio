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

export default function Spidey({
  state,
  className,
  glow = false,
}: {
  state: SpideyState;
  className?: string;
  glow?: boolean;
}) {
  return (
    <Image
      src={`/assets/spidey-${state}.svg`}
      alt={`Spidey — ${state}`}
      width={128}
      height={72}
      unoptimized
      className={[className, glow ? "drop-shadow-[0_0_10px_rgba(255,31,53,0.4)]" : ""]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
