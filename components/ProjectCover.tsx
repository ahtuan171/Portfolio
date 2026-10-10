import Image from "next/image";
import Spidey from "@/components/Spidey";
import { WebCorner } from "@/components/Decor";
import PixelIcon from "@/components/PixelIcons";
import type { Project } from "@/content/projects";
import { getI18n } from "@/lib/i18n/server";
import { showDrafts } from "@/lib/site";

/**
 * A project's real screenshot (with the world's image treatment), or —
 * when none exists yet — a clearly illustrative cover in the world's
 * style. Never a fake screenshot.
 */
export default async function ProjectCover({
  project,
  sizes,
  priority = false,
  className = "",
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const { theme, t } = await getI18n();

  let generated = null;
  if (!project.cover) {
    const title = <p className="font-display-theme relative text-3xl text-fg/90 md:text-4xl">{project.title}</p>;
    const category = <p className="meta relative">{t(project.category)}</p>;
    generated = (
      <div className="cover-media absolute inset-0 flex flex-col items-center justify-center gap-4 text-center" aria-hidden>
        {theme === "spidey" && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(var(--accent)/0.16),transparent_60%)]" />
            <WebCorner className="absolute -right-6 -top-6 w-56 text-accent/20" />
            <Spidey state={project.coverMascot} className="relative h-20 w-auto md:h-24" />
          </>
        )}
        {theme === "pixel" && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgb(var(--deco)/0.45),transparent_70%),rgb(var(--surface-2))]" />
            <PixelIcon name="chest" className="relative h-10 w-12 text-accent" />
          </>
        )}
        {theme === "classic" && (
          <>
            <div className="absolute inset-3 border border-deco/50" />
            <p className="relative font-accent-theme text-3xl text-deco">⁂</p>
          </>
        )}
        {theme === "minimalist" && <div className="absolute inset-4 border border-line" />}
        {title}
        {category}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-surface-2 ${className}`}>
      {project.cover ? (
        <Image
          src={project.cover.src}
          alt={t(project.cover.alt)}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className="cover-media theme-media object-cover object-top"
        />
      ) : (
        generated
      )}
      {!project.cover && showDrafts && (
        <span className="placeholder-note absolute left-3 top-3 z-10 bg-bg/90 py-1">screenshot / GIF needed</span>
      )}
    </div>
  );
}
