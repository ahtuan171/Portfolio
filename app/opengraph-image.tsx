import { displayName, profile } from "@/content/profile";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = `${displayName} — ${profile.positioning.en}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: profile.role.en, title: displayName, subtitle: profile.positioning.en });
}
