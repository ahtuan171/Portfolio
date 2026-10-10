import ThemePortrait from "@/components/ThemePortrait";

/**
 * Cartouche outline in a 100 × 125 box (scaled by `sx`/`sy`): straight sides
 * and concave quarter-circle corners of radius `r`, inset by `d`.
 */
function cartouche(r: number, d = 0, sx = 1, sy = 1) {
  const k = r + d;
  const X = (v: number) => +(v * sx).toFixed(5);
  const Y = (v: number) => +(v * sy).toFixed(5);
  const arc = `A${X(k)} ${Y(k)} 0 0 0`;
  return [
    `M${X(k)} ${Y(d)}H${X(100 - k)}${arc} ${X(100 - d)} ${Y(k)}`,
    `V${Y(125 - k)}${arc} ${X(100 - k)} ${Y(125 - d)}`,
    `H${X(k)}${arc} ${X(d)} ${Y(125 - k)}`,
    `V${Y(k)}${arc} ${X(k)} ${Y(d)}Z`,
  ].join("");
}

const R = 13;

/**
 * Classic: the owner's portrait as an etching — a sepia-toned photograph in
 * a brass-keylined cartouche with concave corners, a lozenge at the head
 * and the foot. Fills the width of its parent (4:5).
 */
export default function ClassicPortrait({ sizes }: { sizes: string }) {
  return (
    <div className="classic-etching">
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <clipPath id="classic-cartouche" clipPathUnits="objectBoundingBox">
            <path d={cartouche(R, 0, 1 / 100, 1 / 125)} />
          </clipPath>
        </defs>
      </svg>
      <div className="classic-etching-photo">
        <ThemePortrait sizes={sizes} />
      </div>
      <svg viewBox="0 0 100 125" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full text-deco" fill="none" stroke="currentColor">
        <path d={cartouche(R, 0.6)} strokeWidth="1.2" />
        <path d={cartouche(R, 3.4)} strokeWidth="0.5" opacity="0.8" />
        <g fill="currentColor" stroke="none">
          <path d="M50 -1.8 54.2 2.6 50 7 45.8 2.6Z" fill="rgb(var(--bg))" stroke="currentColor" strokeWidth="0.6" />
          <path d="M50 126.8 54.2 122.4 50 118 45.8 122.4Z" fill="rgb(var(--bg))" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="50" cy="2.6" r="1" />
          <circle cx="50" cy="122.4" r="1" />
        </g>
      </svg>
    </div>
  );
}
