// The four artistic worlds. Each is a complete visual system defined in
// app/globals.css under [data-theme="<id>"] (tokens) plus theme-specific
// component variants chosen on the server (getI18n().theme). There is no
// light/dark mode: each theme has one deliberate appearance.

export type RevealOrigin = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export const THEMES = [
  {
    id: "spidey",
    name: "Spidey Universe",
    // Corner-reveal transition into this theme (ThemeSwitcher).
    transition: { color: "#FF1F35", origin: "top-right" },
  },
  {
    id: "pixel",
    name: "Pixel Art",
    transition: { color: "#0F2A2E", origin: "top-right" },
  },
  {
    id: "classic",
    name: "Classic",
    transition: { color: "#1B140F", origin: "top-right" },
  },
  {
    id: "minimalist",
    name: "Minimalist",
    transition: { color: "#191A19", origin: "top-right" },
  },
] as const satisfies readonly { id: string; name: string; transition: { color: string; origin: RevealOrigin } }[];

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "spidey";

/** Cookie holding the visitor's choice (read on the server → no flash). */
export const THEME_COOKIE = "theme";

export function isThemeId(value: unknown): value is ThemeId {
  return THEMES.some((t) => t.id === value);
}
