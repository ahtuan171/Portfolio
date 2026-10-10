import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/journal";
import { getVisibleProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/site";

// Language is a cookie preference, not a URL, so each page has one URL.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts().filter((p) => !p.draft);
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly") => ({
    url: absoluteUrl(path),
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    ...getVisibleProjects().map((p) => page(`/projects/${p.slug}`, 0.8)),
    page("/journal", 0.7, "weekly"),
    ...posts.map((p) => ({
      url: absoluteUrl(`/journal/${p.slug}`),
      lastModified: p.updated ?? p.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    page("/about", 0.7),
  ];
}
