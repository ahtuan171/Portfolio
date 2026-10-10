import { displayName, profile } from "@/content/profile";

/**
 * Absolute site origin, used for canonical URLs, Open Graph, the sitemap
 * and RSS. Set NEXT_PUBLIC_SITE_URL once a custom domain exists; on
 * Vercel the production URL is picked up automatically otherwise.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const siteTitle = `${displayName} — Data, AI & creative software`;
export const siteDescription = profile.positioning;

/**
 * Content that isn't ready for the public (draft journal posts,
 * placeholder milestones, "missing content" markers) only renders in
 * `next dev`. Production builds never show it.
 */
export const showDrafts = process.env.NODE_ENV !== "production";
