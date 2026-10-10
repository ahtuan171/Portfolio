import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Journal — Field notes";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Journal", title: "Field notes", subtitle: "Notes on data, AI, building in public, and learning." });
}
