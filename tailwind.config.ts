import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0D10",
          50: "#f5f5f4",
          100: "#e5e5e3",
          200: "#c7c7c4",
          300: "#9c9c98",
          400: "#2A2D34",
          500: "#454542",
          600: "#2c2c2a",
          700: "#1c1c1b",
          800: "#121417",
          900: "#08090b",
        },
        bone: {
          DEFAULT: "#F5F2E8",
          dim: "#b8b4a8",
          muted: "#8A8F98",
        },
        chrome: {
          DEFAULT: "#FF1F35",
          dim: "#A81222",
        },
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        vignette:
          "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
      },
      letterSpacing: {
        widest2: "0.35em",
        widest3: "0.5em",
      },
    },
  },
  plugins: [],
};
export default config;
