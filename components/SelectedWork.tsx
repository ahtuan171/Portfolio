import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { profile } from "@/content/profile";
import type { Project } from "@/content/projects";
import { getI18n } from "@/lib/i18n/server";

/** Homepage project showcase (featured project wide, the rest in a grid). */
export default async function SelectedWork({ projects }: { projects: Project[] }) {
  const { theme, dict } = await getI18n();
  const [first, ...rest] = projects;
  const github = profile.socials.find((s) => s.label === "GitHub");

  return (
    <section id="projects" aria-labelledby="projects-title" className="sec shell py-20 md:py-28">
      <SectionHeading
        id="projects-title"
        eyebrow={dict.home.eyebrows[theme].projects}
        title={dict.home.projectsTitle}
        ornate={theme === "classic"}
        numeral="II"
        pixelIcon={theme === "pixel" ? "chest" : undefined}
        aside={
          github && (
            <a href={`${github.href}?tab=repositories`} target="_blank" rel="noreferrer" className="text-link">
              {dict.home.allRepositories} <span aria-hidden>↗</span>
            </a>
          )
        }
      />
      {theme === "classic" ? (
        // Classic: an archive catalogue — one plate per row, mounted
        // screenshots alternating sides like a magazine spread.
        <div className="divide-y divide-deco/30 border-y border-deco/30">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      ) : theme === "pixel" ? (
        // Pixel Art: discoveries side by side, screenshots first.
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-8 md:gap-10">
          {first && <ProjectCard project={first} index={0} featured={Boolean(first.featured)} />}
          {rest.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              {rest.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
