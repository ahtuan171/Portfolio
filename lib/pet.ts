import type { ContributionDay } from "./github";

export type PetState = "awake" | "sleeping";

export interface PetStatus {
  streak: number;
  state: PetState;
  todayCount: number;
}

function sortByDateAsc(days: ContributionDay[]): ContributionDay[] {
  return [...days].sort((a, b) => a.date.localeCompare(b.date));
}

export function computeStreak(days: ContributionDay[]): number {
  const sorted = sortByDateAsc(days);
  let streak = 0;
  let startIndex = sorted.length - 1;

  // Today isn't over yet, so a still-empty today shouldn't zero out
  // a streak that's alive as of yesterday.
  if (startIndex >= 0 && sorted[startIndex].count === 0) {
    startIndex -= 1;
  }

  for (let i = startIndex; i >= 0; i--) {
    if (sorted[i].count > 0) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
}

export function getPetStatus(days: ContributionDay[]): PetStatus {
  const sorted = sortByDateAsc(days);
  const today = sorted[sorted.length - 1];
  const todayCount = today?.count ?? 0;

  return {
    streak: computeStreak(sorted),
    state: todayCount > 0 ? "awake" : "sleeping",
    todayCount,
  };
}
