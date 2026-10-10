import type { NextRequest } from "next/server";
import { getContributionDays, type ContributionDay } from "@/lib/github";

export const dynamic = "force-dynamic";

const DEFAULT_USERNAME = process.env.GITHUB_USERNAME ?? "ahtuan171";

const PALETTE = {
  red: "#FF1F35",
  black: "#0B0D10",
  border: "#2A2D34",
  cream: "#F5F2E8",
  muted: "#8A8F98",
};

const FONT_STACK = "ui-monospace, SFMono-Regular, Menlo, monospace";

const WIDTH = 960;
const HEIGHT = 280;
const PAD = { top: 34, right: 24, bottom: 34, left: 44 };

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

interface DayPoint {
  label: string;
  total: number;
}

function last30Days(days: ContributionDay[]): DayPoint[] {
  return [...days]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30)
    .map((day) => {
      const [, month, date] = day.date.split("-");
      return { label: `${Number(date)}/${Number(month)}`, total: day.count };
    });
}

function cardShell(inner: string): string {
  return `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GitHub contribution activity, last 30 days">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${PALETTE.black}" rx="14"/>
  <rect x="0.75" y="0.75" width="${WIDTH - 1.5}" height="${HEIGHT - 1.5}" fill="none" stroke="${PALETTE.border}" stroke-width="1.5" rx="13.25"/>
  <text x="${PAD.left}" y="26" font-family="${FONT_STACK}" font-size="11" font-weight="700" letter-spacing="2" fill="${PALETTE.red}">CONTRIBUTIONS · LAST 30 DAYS</text>
  ${inner}
</svg>`.trim();
}

function buildGraphSvg(days: DayPoint[]): string {
  const max = Math.max(1, ...days.map((d) => d.total));
  const plotW = WIDTH - PAD.left - PAD.right;
  const plotH = HEIGHT - PAD.top - PAD.bottom;
  const stepX = days.length > 1 ? plotW / (days.length - 1) : 0;

  const points = days.map((d, i) => {
    const x = PAD.left + i * stepX;
    const y = PAD.top + plotH - (d.total / max) * plotH;
    return [x, y] as const;
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(" ");
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  const areaPath =
    points.length > 0
      ? `${linePath} L${lastPoint[0].toFixed(1)},${(PAD.top + plotH).toFixed(1)} L${firstPoint[0].toFixed(1)},${(PAD.top + plotH).toFixed(1)} Z`
      : "";

  const gridLines = [0, 0.25, 0.5, 0.75, 1]
    .map((f) => {
      const y = PAD.top + plotH * (1 - f);
      const label = Math.round(max * f);
      return `<line x1="${PAD.left}" y1="${y.toFixed(1)}" x2="${WIDTH - PAD.right}" y2="${y.toFixed(1)}" stroke="${PALETTE.border}" stroke-width="1" opacity="0.5"/><text x="${PAD.left - 10}" y="${(y + 3.5).toFixed(1)}" font-family="${FONT_STACK}" font-size="10" fill="${PALETTE.muted}" text-anchor="end">${label}</text>`;
    })
    .join("");

  const dots = points
    .map((p, i) => {
      const isLast = i === points.length - 1;
      return `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${isLast ? 3.5 : 2.5}" fill="${PALETTE.red}"/>`;
    })
    .join("");

  // 30 points is too dense to label every one — show roughly every 5th
  // day plus today, so the axis stays readable.
  const labelStep = 5;
  const dayLabels = days
    .map((d, i) => {
      const isLast = i === days.length - 1;
      if (!isLast && i % labelStep !== 0) return "";
      return `<text x="${points[i][0].toFixed(1)}" y="${HEIGHT - PAD.bottom + 20}" font-family="${FONT_STACK}" font-size="10" fill="${PALETTE.muted}" text-anchor="middle">${d.label}</text>`;
    })
    .join("");

  return cardShell(
    `${gridLines}<path d="${areaPath}" fill="${PALETTE.red}" opacity="0.15"/><path d="${linePath}" fill="none" stroke="${PALETTE.red}" stroke-width="2"/>${dots}${dayLabels}`
  );
}

function buildFallbackSvg(message: string): string {
  return cardShell(
    `<text x="${WIDTH / 2}" y="${HEIGHT / 2 + 5}" font-family="${FONT_STACK}" font-size="14" fill="${PALETTE.muted}" text-anchor="middle">${escapeXml(message)}</text>`
  );
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username") ?? DEFAULT_USERNAME;

  try {
    const days = await getContributionDays(username);
    const recent = last30Days(days);
    const svg = buildGraphSvg(recent);

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    // Log the real cause server-side; visitors only see a friendly message.
    console.error("[api/activity] GitHub activity unavailable:", error);
    const svg = buildFallbackSvg("Activity currently unavailable");

    return new Response(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-store",
      },
    });
  }
}
