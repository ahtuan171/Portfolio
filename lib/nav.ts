import type { NavItem } from "@/components/Header";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { getPosts } from "@/lib/journal";

/**
 * Primary navigation: the three main pages. Case studies live under
 * /projects/[slug] and are reached from project cards (Home stays active).
 */
export function getNavItems(dict: Dictionary): NavItem[] {
  return [
    { label: dict.nav.home, href: "/", match: "home" },
    { label: dict.nav.journal, href: "/journal" },
    { label: dict.nav.about, href: "/about" },
  ];
}

/** True once at least one post is published (drafts don't count). */
export function hasPublishedPosts(): boolean {
  return getPosts().some((p) => !p.draft);
}
