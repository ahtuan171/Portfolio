import type { StaticImageData } from "next/image";
import forestHome from "@/public/assets/themes/pixel-art/forest-home.webp";
import lakesideFooter from "@/public/assets/themes/pixel-art/lakeside-footer.webp";
import candlelitStudy from "@/public/assets/themes/classic/candlelit-study.webp";

// Theme artwork, in one place. Static imports fail the build if a file is
// missing, so only assets that actually exist are referenced here.
//
// Pixel Art backgrounds live in public/assets/themes/pixel-art/. Slots set
// to `null` haven't been supplied yet and fall back as noted; to add one,
// drop the file in that folder and import it here.

export interface PixelArtAssets {
  /** Home hero — the world's primary image. */
  hero: StaticImageData;
  /** Optional: Selected Projects backdrop (e.g. archive-projects.webp). Falls back to none. */
  projects: StaticImageData | null;
  /** Optional: Journey backdrop (e.g. misty-journey.webp). Falls back to `hero`. */
  journey: StaticImageData | null;
  /** Optional: Journal/About page header (e.g. quiet-journal.webp). Falls back to `hero`. */
  pageHeader: StaticImageData | null;
  /** Contact section at the bottom of Home. Falls back to `hero`. */
  footer: StaticImageData | null;
}

export const pixelArt: PixelArtAssets = {
  hero: forestHome, // Supplied by the owner (assets/Pixel-background.png → WebP)
  projects: null, // TODO(assets): archive-projects.webp
  journey: null, // TODO(assets): misty-journey.webp
  pageHeader: null, // TODO(assets): quiet-journal.webp
  footer: lakesideFooter, // Supplied by the owner (assets/Pixel-footer-background.png → WebP)
};

export const pixelPageHeader = pixelArt.pageHeader ?? pixelArt.hero;
export const pixelJourney = pixelArt.journey ?? pixelArt.hero;
export const pixelFooter = pixelArt.footer ?? pixelArt.hero;

/**
 * Classic: the candlelit study (owner-supplied, from
 * assets/Classic-header-bg.png → WebP). Home hero and the page-header band
 * on Journal/About/case studies.
 */
export const classicArt = { study: candlelitStudy };
