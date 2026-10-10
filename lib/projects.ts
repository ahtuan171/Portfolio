import { projects, type Project } from "@/content/projects";
import { showDrafts } from "@/lib/site";

/** Projects visible in this build (drafts are dev-only), featured first. */
export function getVisibleProjects(): Project[] {
  return projects
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

export function getVisibleProject(slug: string): Project | undefined {
  return getVisibleProjects().find((p) => p.slug === slug);
}

/** Up to three projects for the homepage. */
export function getHomeProjects(): Project[] {
  return getVisibleProjects()
    .filter((p) => p.showOnHome)
    .slice(0, 3);
}
