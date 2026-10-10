import { getVisibleProject, getVisibleProjects } from "@/lib/projects";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getVisibleProjects().map((p) => ({ slug: p.slug }));
}

// Social previews use the default language (crawlers send no cookie).
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getVisibleProject(slug);
  return renderOg({
    eyebrow: project ? `Case study · ${project.category.en}` : "Case study",
    title: project?.title ?? "Project",
    subtitle: project?.tagline.en,
  });
}
