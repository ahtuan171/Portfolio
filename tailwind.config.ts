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
          DEFAULT: "#0a0a0a",
          50: "#f5f5f4",
          100: "#e5e5e3",
          200: "#c7c7c4",
          300: "#9c9c98",
          400: "#6b6b68",
          500: "#454542",
          600: "#2c2c2a",
          700: "#1c1c1b",
          800: "#121211",
          900: "#050505",
        },
        bone: {
          DEFAULT: "#ece9e2",
          dim: "#adaaa2",
          muted: "#6f6d68",
        },
        chrome: {
          DEFAULT: "#ffffff",
          dim: "#d4d4d1",
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
