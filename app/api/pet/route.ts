import type { NextRequest } from "next/server";
import { getContributionDays } from "@/lib/github";
import { getPetStatus, type PetState } from "@/lib/pet";
import { getAssetDataUri } from "@/lib/assets";

export const dynamic = "force-dynamic";

const DEFAULT_USERNAME = process.env.GITHUB_USERNAME ?? "ahtuan171";

const WIDTH = 480;
const HEIGHT = 160;

const PALETTE = {
  red: "#FF1F35",
  black: "#0B0D10",
  border: "#2A2D34",
  cream: "#F5F2E8",
  muted: "#8A8F98",
};

const FONT_STACK = "ui-monospace, SFMono-Regular, Menlo, monospace";

const STATE_COPY: Record<PetState, { label: string; status: string }> = {
  awake: { label: "COMMIT STREAK", status: "web-slinging today" },
  sleeping: { label: "COMMIT STREAK", status: "no commits today" },
};

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return char;
    }
  });
}

function buildPetSvg({
  spiderUri,
  streak,
  streakLabel,
  petState,
  statusText,
}: {
  spiderUri: string;
  streak: string;
  streakLabel: string;
  petState: PetState;
  statusText: string;
}): string {
  const copy = STATE_COPY[petState];
  const mascotWidth = 168;
  const mascotHeight = (mascotWidth * 18) / 32;
  const mascotX = 28;
  const mascotY = (HEIGHT - mascotHeight) / 2;
  const textX = mascotX + mascotWidth + 32;

  return `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Commit streak: ${streak} ${streakLabel}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${PALETTE.black}" rx="14"/>
  <rect x="0.75" y="0.75" width="${WIDTH - 1.5}" height="${HEIGHT - 1.5}" fill="none" stroke="${PALETTE.border}" stroke-width="1.5" rx="13.25"/>
  <image href="${spiderUri}" x="${mascotX}" y="${mascotY}" width="${mascotWidth}" height="${mascotHeight}" style="image-rendering: pixelated;"/>
  <text x="${textX}" y="52" font-family="${FONT_STACK}" font-size="12" font-weight="700" fill="${PALETTE.red}" letter-spacing="3">${escapeXml(copy.label)}</text>
  <text x="${textX}" y="100" font-family="${FONT_STACK}" fill="${PALETTE.cream}">
    <tspan font-size="46" font-weight="700">${streak}</tspan>
    <tspan font-size="16" dx="8" fill="${PALETTE.muted}">${escapeXml(streakLabel)}</tspan>
  </text>
  <text x="${textX}" y="124" font-family="${FONT_STACK}" font-size="12" fill="${PALETTE.muted}" letter-spacing="0.5">${escapeXml(statusText)}</text>
</svg>`.trim();
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username") ?? DEFAULT_USERNAME;

  try {
    const days = await getContributionDays(username);
    const status = getPetStatus(days);
    const dayLabel = status.streak === 1 ? "day" : "days";

    const svg = buildPetSvg({
      spiderUri: getAssetDataUri(status.state === "awake" ? "spidey-awake.svg" : "spidey-asleep.svg"),
      streak: String(status.streak),
      streakLabel: dayLabel,
      petState: status.state,
      statusText: STATE_COPY[status.state].status,
    });

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    // This card may be embedded in READMEs or pages — fail into a themed
    // placeholder card instead of a broken-image icon. The real cause goes
    // to the server log only; visitors never see configuration details.
    console.error("[api/pet] GitHub activity unavailable:", error);
    const svg = buildPetSvg({
      spiderUri: getAssetDataUri("spidey-asleep.svg"),
      streak: "—",
      streakLabel: "",
      petState: "sleeping",
      statusText: "activity currently unavailable",
    });

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-store",
      },
    });
  }
}
