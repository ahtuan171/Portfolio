import Image, { type StaticImageData } from "next/image";
import spidey from "@/public/images/portraits/spidey.jpg";
import pixel from "@/public/images/portraits/pixel.jpg";
import classic from "@/public/images/portraits/classic.jpg";
import minimalist from "@/public/images/portraits/minimalist.jpg";
import { profile } from "@/content/profile";
import { fill } from "@/lib/i18n/localized";
import { getI18n } from "@/lib/i18n/server";
import type { ThemeId } from "@/lib/theme";

/**
 * Each world shows its own photo of the owner (the files are his own).
 * `position` is the object-position that keeps the head in frame when a
 * tall photo is cropped. Alt text lives in the dictionary per theme.
 */
const portraits: Record<ThemeId, { src: StaticImageData; position: string }> = {
  spidey: { src: spidey, position: "50% 40%" },
  pixel: { src: pixel, position: "50% 50%" },
  classic: { src: classic, position: "60% 30%" },
  minimalist: { src: minimalist, position: "50% 26%" },
};

/** The portrait for the active theme, filling its (relatively positioned) parent. */
export default async function ThemePortrait({
  sizes,
  priority = false,
}: {
  sizes: string;
  priority?: boolean;
}) {
  const { theme, dict } = await getI18n();
  const { src, position } = portraits[theme];

  return (
    <Image
      src={src}
      alt={fill(dict.hero.portraitAlt[theme], { name: profile.name })}
      fill
      priority={priority}
      placeholder="blur"
      sizes={sizes}
      className="theme-media theme-portrait object-cover"
      style={{ objectPosition: position }}
    />
  );
}
