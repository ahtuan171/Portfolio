import { getContributionDays } from "@/lib/github";
import { computeStreak } from "@/lib/pet";

export interface ActivitySummary {
  streak: number;
  committedToday: boolean;
  total30: number;
  days: { date: string; count: number }[];
}

/**
 * Last-30-days GitHub summary for the homepage widget. Returns null on any
 * failure (missing token, network, API error) — callers render a friendly
 * fallback; the real cause only goes to the server log.
 */
export async function getActivitySummary(username: string): Promise<ActivitySummary | null> {
  try {
    const all = await getContributionDays(username);
    const sorted = [...all].sort((a, b) => a.date.localeCompare(b.date));
    const days = sorted.slice(-30);
    return {
      streak: computeStreak(sorted),
      committedToday: (sorted.at(-1)?.count ?? 0) > 0,
      total30: days.reduce((sum, d) => sum + d.count, 0),
      days,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[activity] GitHub activity unavailable:", message);
    return null;
  }
}
