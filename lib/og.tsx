import { ImageResponse } from "next/og";
import { displayName } from "@/content/profile";

// Shared Open Graph card in the default Minimalist look (social previews
// can't follow a visitor's theme or language — crawlers send no cookie, so
// cards are English). Fonts are fetched from Google Fonts with only the
// glyphs needed so "Tuấn" renders; offline, Satori's default font is used.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const C = { bg: "#191A19", fg: "#F2F0E9", dim: "#C9C8C0", muted: "#9A9C96", line: "#3E403D" };

async function loadFont(spec: string, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${spec}&text=${encodeURIComponent(text)}`)).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const res = await fetch(src);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function renderOg({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }): Promise<ImageResponse> {
  const footer = displayName;
  const all = `${eyebrow}${title}${subtitle ?? ""}${footer}Data · AI · Creative software`;
  const glyphs = all + all.toUpperCase();
  const [display, body] = await Promise.all([
    loadFont("Noto+Serif+Display:wght@300", glyphs),
    loadFont("Inter:wght@500", glyphs),
  ]);
  const fonts = [
    ...(display ? [{ name: "Display", data: display, weight: 300 as const, style: "normal" as const }] : []),
    ...(body ? [{ name: "Inter", data: body, weight: 500 as const, style: "normal" as const }] : []),
  ];
  const titleSize = title.length > 40 ? 72 : title.length > 22 ? 92 : 112;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", backgroundColor: C.bg, color: C.fg, fontFamily: "Inter", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 80px", width: "100%", position: "relative" }}>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 6, color: C.muted, textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
            <div style={{ display: "flex", fontFamily: "Display", fontSize: titleSize, lineHeight: 1.1, letterSpacing: -2 }}>{title}</div>
            {subtitle && <div style={{ display: "flex", marginTop: 26, fontSize: 32, lineHeight: 1.35, color: C.dim }}>{subtitle}</div>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24, borderTop: `1px solid ${C.line}`, paddingTop: 24, fontSize: 24 }}>
            <div style={{ display: "flex", fontFamily: "Display", fontSize: 30 }}>{footer}</div>
            <div style={{ display: "flex", color: C.muted }}>Data · AI · Creative software</div>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: fonts.length ? fonts : undefined }
  );
}
