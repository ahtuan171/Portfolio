import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "About — The longer version";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "About", title: "The longer version", subtitle: "Background, direction, skills and a few personal details." });
}
