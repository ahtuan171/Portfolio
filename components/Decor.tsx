// Spidey Universe decoration — generated from geometry, no traced or
// third-party art. Other worlds' art lives in components/ThemeArt.tsx.

/**
 * Corner spider web: radial threads from the corner, joined by slightly
 * sagging spiral rings.
 */
export function webPaths(size: number, threads = 9, rings = 8) {
  const angles = Array.from({ length: threads }, (_, i) => (Math.PI / 2) * (i / (threads - 1)));
  const radial = angles
    .map((a) => `M0,0 L${(Math.cos(a) * size).toFixed(1)},${(Math.sin(a) * size).toFixed(1)}`)
    .join(" ");

  const ringPaths: string[] = [];
  for (let r = 1; r <= rings; r++) {
    const radius = (size / (rings + 0.6)) * r * (1 + (r % 2) * 0.03);
    let d = "";
    angles.forEach((a, i) => {
      const x = Math.cos(a) * radius;
      const y = Math.sin(a) * radius;
      if (i === 0) {
        d += `M${x.toFixed(1)},${y.toFixed(1)}`;
        return;
      }
      // Sag each segment toward the corner, like silk under tension.
      const mid = (angles[i - 1] + a) / 2;
      const sag = radius * 0.86;
      d += ` Q${(Math.cos(mid) * sag).toFixed(1)},${(Math.sin(mid) * sag).toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
    });
    ringPaths.push(d);
  }
  return { radial, rings: ringPaths };
}

export function WebCorner({ className = "" }: { className?: string }) {
  const size = 420;
  const { radial, rings } = webPaths(size);
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${size} ${size}`}
      className={`pointer-events-none ${className}`}
      fill="none"
      stroke="currentColor"
    >
      <g transform={`translate(${size},0) scale(-1,1)`}>
        <path d={radial} strokeWidth="1" />
        {rings.map((d, i) => (
          <path key={i} d={d} strokeWidth={i % 3 === 2 ? 1.2 : 0.8} />
        ))}
      </g>
    </svg>
  );
}
