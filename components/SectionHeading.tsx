import type { ReactNode } from "react";
import { PixelMedallion, type PixelIconName } from "@/components/PixelIcons";
import { ClassicRule } from "@/components/ThemeArt";

/**
 * Section heading shared by every homepage section. The Pixel Art world
 * uses a medallion + title + rule line; Classic a title running into a
 * brass rule under a chapter numeral; the others an eyebrow over a display
 * heading.
 */
export default function SectionHeading({
  eyebrow,
  title,
  id,
  aside,
  pixelIcon,
  ornate = false,
  numeral,
}: {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  aside?: ReactNode;
  /** When set, renders the Pixel Art variant with this icon. */
  pixelIcon?: PixelIconName;
  /** Classic: title with a brass rule. */
  ornate?: boolean;
  /** Classic: chapter numeral shown before the eyebrow ("II"). */
  numeral?: string;
}) {
  if (ornate) {
    return (
      <div className="mb-12 md:mb-16" data-reveal>
        <p className="eyebrow mb-3 flex items-center gap-3">
          {numeral && (
            <>
              <span className="font-accent-theme text-xl italic tracking-normal text-accent [font-variant-caps:normal]" aria-hidden>
                {numeral}
              </span>
              <span aria-hidden className="h-px w-8 bg-deco/70" />
            </>
          )}
          {eyebrow}
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <h2 id={id} className="section-title">
            {title}
          </h2>
          <ClassicRule align="start" className="hidden min-w-[6rem] flex-1 sm:flex" />
          {aside}
        </div>
      </div>
    );
  }

  if (pixelIcon) {
    return (
      <div className="mb-8 flex items-center gap-4 md:mb-10" data-reveal>
        <PixelMedallion name={pixelIcon} className="h-12 w-12" />
        <h2 id={id} className="font-display-theme text-2xl text-fg md:text-3xl">
          {title}
        </h2>
        <span aria-hidden className="h-px flex-1 bg-line" />
        {aside}
      </div>
    );
  }

  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 md:mb-14" data-reveal>
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 id={id} className="section-title">
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}
