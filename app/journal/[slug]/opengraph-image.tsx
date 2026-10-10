import { getPost, getPosts } from "@/lib/journal";
import { ogContentType, ogSize, renderOg } from "@/lib/og";
import en from "@/lib/i18n/dictionaries/en";

export const alt = "Journal entry";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOg({
    eyebrow: post ? `Journal · ${en.journal.categories[post.category]}` : "Journal",
    title: post?.title ?? "Journal",
    subtitle: post?.subtitle,
  });
}
