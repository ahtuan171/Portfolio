import type { Config } from "tailwindcss";

// Every color is a CSS variable holding an "r g b" triplet, set per
// theme preset ([data-theme]) and appearance mode ([data-mode]) in
// app/globals.css. The `<alpha-value>` placeholder keeps Tailwind's
// opacity modifiers working (e.g. `border-line/60`, `bg-accent/10`).
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        surface: {
          DEFAULT: token("surface"),
          2: token("surface-2"),
        },
        line: token("line"),
        fg: {
          DEFAULT: token("fg"),
          dim: token("fg-dim"),
          muted: token("fg-muted"),
        },
        accent: {
          DEFAULT: token("accent"),
          2: token("accent-2"),
          on: token("on-accent"),
        },
        // Decorative-only colors (never body text): sky/wood (Pixel),
        // antique gold/forest (Classic), dark red/cream (Spidey), ink on paper (Minimalist).
        deco: {
          DEFAULT: token("deco"),
          2: token("deco-2"),
        },
      },
      // Families resolve through per-theme tokens in app/globals.css:
      //   display — headings (Anton / VT323 / Cormorant / Noto Serif Display)
      //   body    — UI + paragraphs (Inter / Nunito / EB Garamond / Inter)
      //   mono    — small metadata/labels (not always monospace!)
      //   accent  — secondary display voice
      //   serif   — long-form prose (per theme)
      // `code` is real monospace for code; `hand` is Classic marginalia.
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-meta)", "ui-monospace", "monospace"],
        accent: ["var(--font-accent)", "Georgia", "serif"],
        serif: ["var(--font-prose)", "Georgia", "serif"],
        code: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        hand: ["var(--font-pinyon)", "cursive"],
      },
      borderRadius: {
        theme: "var(--radius)",
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
export default config;
