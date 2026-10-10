// Small hand-placed pixel icons for the Pixel Art world. Each bitmap is a
// list of rows ("#" = filled) rendered as merged rects in currentColor.

const ICONS = {
  castle: [
    "...#....#...",
    "..###..###..",
    "..###..###..",
    "..########..",
    ".##########.",
    ".###.##.###.",
    ".##########.",
    ".####..####.",
    ".####..####.",
    "############",
  ],
  sparkle: [
    ".....#.....",
    ".....#.....",
    "....###....",
    "...#####...",
    "###########",
    "...#####...",
    "....###....",
    ".....#.....",
    ".....#.....",
  ],
  chest: [
    "..########..",
    ".#........#.",
    "#..........#",
    "############",
    "#....##....#",
    "#....##....#",
    "#..........#",
    "############",
  ],
  flag: ["#.......", "######..", "#######.", "######..", "#.......", "#.......", "#.......", "##......"],
  trophy: ["#########", "#.#####.#", "#.#####.#", ".#######.", "...###...", "....#....", "...###...", "..#####.."],
  book: ["#######.", "#.....##", "#.###.##", "#.....##", "#.###.##", "#.....##", "#######.", ".######."],
  mail: [
    "############",
    "##........##",
    "#.#......#.#",
    "#..#....#..#",
    "#...####...#",
    "#..........#",
    "############",
  ],
  gamepad: [
    "..########..",
    ".##########.",
    "##.#####..##",
    "#...###.##.#",
    "##.#####..##",
    "############",
    "###......###",
    ".#........#.",
  ],
  dumbbell: ["##........##", "##........##", "############", "##........##", "##........##"],
  cap: [
    ".....##.....",
    "...######...",
    ".##########.",
    "############",
    ".##########.",
    "..#.####..#.",
    "..#.####..#.",
    "....####..#.",
  ],
  chart: [
    "#...........",
    "#.......##..",
    "#.......##..",
    "#...##..##..",
    "#...##..##..",
    "#.#.##..##..",
    "#.#.##..##..",
    "############",
  ],
} as const;

export type PixelIconName = keyof typeof ICONS;

export default function PixelIcon({ name, className = "" }: { name: PixelIconName; className?: string }) {
  const rows = ICONS[name];
  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;
  const rects: { x: number; y: number; w: number }[] = [];
  rows.forEach((row, y) => {
    let start = -1;
    for (let x = 0; x <= row.length; x++) {
      const on = row[x] === "#";
      if (on && start < 0) start = x;
      if (!on && start >= 0) {
        rects.push({ x: start, y, w: x - start });
        start = -1;
      }
    }
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} fill="currentColor" shapeRendering="crispEdges" aria-hidden>
      {rects.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height={1} />
      ))}
    </svg>
  );
}

/** Round medallion holding a pixel icon (section headings, cards). */
export function PixelMedallion({ name, className = "" }: { name: PixelIconName; className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full border border-line bg-surface/80 text-fg shadow-[inset_0_0_0_3px_rgb(var(--bg)),inset_0_0_0_4px_rgb(var(--line))] ${className}`}
    >
      <PixelIcon name={name} className="h-[45%] w-[45%]" />
    </span>
  );
}
