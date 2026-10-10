import { milestones, sortMilestones } from "@/content/milestones";
import { showDrafts } from "@/lib/site";

/** Milestones visible in this build (placeholders are dev-only). */
export function getVisibleMilestones() {
  return sortMilestones(milestones.filter((m) => showDrafts || !m.placeholder));
}

/** Verified highlights for the homepage — never placeholders. */
export function getMilestoneHighlights(limit = 3) {
  return sortMilestones(milestones.filter((m) => m.highlight && !m.placeholder)).slice(0, limit);
}
