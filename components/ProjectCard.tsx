import Link from "next/link";
import ProjectCover from "@/components/ProjectCover";
import type { Project } from "@/content/projects";
import { fill } from "@/lib/i18n/localized";
import { roman } from "@/lib/format";
import { getI18n } from "@/lib/i18n/server";

/**
 * One project, presented in the active world's idiom — same facts and
 * links everywhere:
 *   spidey   — a spec sheet: category, status, numbers, stack
 *   pixel    — a found artifact: framed screenshot, quiet serif text
 *   classic  — an archive entry: a mounted, true-color screenshot beside
 *              a numbered catalogue note, alternating sides
 *   minimalist — a numbered entry: calm image, terse text, hairlines
 */
export default async function ProjectCard({
  project,
  index,
  featured = false,
  headingLevel = 3,
}: {
  project: Project;
  index: number;
  featured?: boolean;
  headingLevel?: 2 | 3;
}) {
  const { theme, dict, t } = await getI18n();
  const Title = headingLevel === 2 ? "h2" : "h3";
  const href = `/projects/${project.slug}`;
  const status = dict.project.statuses[project.status];

  const actions = (
    <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
      <Link href={href} className="btn-ghost px-4 py-2.5">
        {dict.project.caseStudy} <span aria-hidden>→</span>
        <span className="sr-only">: {project.title}</span>
      </Link>
      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-link">
          {dict.project.liveDemo} <span aria-hidden>↗</span>
          <span className="sr-only"> — {fill(dict.project.liveDemoOf, { title: project.title })}</span>
        </a>
      )}
      <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-link">
        {dict.project.code} <span aria-hidden>↗</span>
        <span className="sr-only"> — {fill(dict.project.codeFor, { title: project.title })}</span>
      </a>
    </div>
  );

  const tags = (
    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={dict.project.technologies}>
      {project.tags.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
    </ul>
  );

  const role = (
    <p className="mt-4 font-body text-sm text-fg-dim">
      <span className="meta">{dict.project.role} </span>
      {t(project.role)}
    </p>
  );

  const cover = (className: string, sizes: string) => (
    <Link href={href} tabIndex={-1} aria-hidden className="block">
      <ProjectCover project={project} priority={featured} className={className} sizes={sizes} />
    </Link>
  );

  const titleLink = (className: string) => (
    <Title className={className}>
      <Link href={href} className="transition-colors hover:text-accent">
        {project.title}
      </Link>
    </Title>
  );

  const outcomes = featured && project.outcomes && (
    <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-line/70 py-4">
      {project.outcomes.map((o) => (
        <div key={o.value + t(o.label)} className="flex flex-col-reverse">
          <dt className="mt-1 font-body text-xs leading-snug text-fg-muted">{t(o.label)}</dt>
          <dd className="font-display-theme pb-1 text-2xl leading-none text-accent">{o.value}</dd>
        </div>
      ))}
    </dl>
  );

  const reveal = { "data-reveal": true, style: { ["--reveal-delay" as string]: `${(index % 2) * 100}ms` } };

  /* ------------------------------------------------------- Classic */
  if (theme === "classic") {
    const flip = index % 2 === 1;
    return (
      <article data-reveal className="group grid grid-cols-[minmax(0,1fr)] items-center gap-8 py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
        {/* The screenshot, true to life, on a parchment mount. */}
        <figure className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
          <div className="classic-mount card-interactive">
            <div className="overflow-hidden">
              <div className="classic-develop">
                {cover("aspect-[16/10]", "(min-width: 1024px) 620px, 100vw")}
              </div>
            </div>
          </div>
          <figcaption className="mt-3 flex items-baseline justify-between gap-4 font-body text-sm italic text-fg-muted">
            <span>
              {dict.classic.plateNo} {roman(index + 1)} — {project.title}
            </span>
            <span>{t(project.category)}</span>
          </figcaption>
        </figure>

        <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <p className="flex items-baseline gap-4">
            <span className="font-accent-theme text-5xl leading-none text-deco" aria-hidden>
              {roman(index + 1)}
            </span>
            <span aria-hidden className="h-px flex-1 bg-deco/40" />
            <span className="meta">
              {project.year} · {status}
            </span>
          </p>
          {titleLink("mt-5 font-display-theme text-[2.4rem] leading-[1.05] text-fg")}
          <p className="mt-2 font-accent-theme text-xl italic leading-snug text-fg-dim">{t(project.tagline)}</p>
          <p className="mt-5 font-body text-base leading-relaxed text-fg-dim">{t(project.description)}</p>
          <dl className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-1.5 border-t border-deco/30 pt-4 font-body text-sm">
            <dt className="whitespace-nowrap italic text-fg-muted">{dict.project.role}</dt>
            <dd className="text-fg">{t(project.role)}</dd>
            <dt className="whitespace-nowrap italic text-fg-muted">{dict.classic.stack}</dt>
            <dd className="text-fg-dim">
              <ul className="flex flex-wrap" aria-label={dict.project.technologies}>
                {project.tags.map((tag, i) => (
                  <li key={tag}>
                    {i > 0 && <span aria-hidden className="px-1.5 text-deco">·</span>}
                    {tag}
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={href} className="btn-ghost">
              {dict.project.caseStudy} <span aria-hidden>→</span>
              <span className="sr-only">: {project.title}</span>
            </Link>
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-link">
                {dict.project.liveDemo} <span aria-hidden>↗</span>
                <span className="sr-only"> — {fill(dict.project.liveDemoOf, { title: project.title })}</span>
              </a>
            )}
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-link">
              {dict.project.code} <span aria-hidden>↗</span>
              <span className="sr-only"> — {fill(dict.project.codeFor, { title: project.title })}</span>
            </a>
          </div>
        </div>
      </article>
    );
  }

  /* ---------------------------------------------------- Minimalist */
  if (theme === "minimalist") {
    return (
      <article {...reveal} className={`group card card-interactive flex flex-col border-x-0 border-b-0 pt-6 ${featured ? "lg:grid lg:grid-cols-[1.3fr_1fr] lg:gap-10" : ""}`}>
        {cover("aspect-[16/10]", featured ? "(min-width: 1024px) 620px, 100vw" : "(min-width: 768px) 520px, 100vw")}
        <div className={`flex flex-col ${featured ? "mt-6 lg:mt-0" : "mt-6"}`}>
          <p className="flex items-baseline justify-between gap-4">
            <span className="font-display-theme text-3xl italic leading-none text-fg-muted" aria-hidden>
              {roman(index + 1)}
            </span>
            <span className="meta">
              {t(project.category)} · {project.year} · {status}
            </span>
          </p>
          {titleLink(`mt-4 font-display-theme leading-[1.1] text-fg ${featured ? "text-5xl" : "text-4xl"}`)}
          <p className="mt-3 font-body text-base font-medium leading-snug text-fg">{t(project.tagline)}</p>
          <p className="mt-3 font-body text-base leading-relaxed text-fg-dim">{t(project.description)}</p>
          {role}
          {outcomes}
          {tags}
          {actions}
        </div>
      </article>
    );
  }

  /* -------------------------------------------------------- Pixel */
  if (theme === "pixel") {
    return (
      <article {...reveal} className="card card-interactive group flex h-full flex-col p-3">
        <div className="border border-line shadow-[inset_0_0_0_2px_rgb(var(--bg))]">
          {cover("aspect-[16/9]", "(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw")}
        </div>
        <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
          <div className="flex items-start justify-between gap-3">
            {titleLink("font-display-theme text-2xl leading-tight text-fg")}
            <span className="tag shrink-0">{status}</span>
          </div>
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={dict.project.technologies}>
            {project.tags.slice(0, 4).map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-body text-sm leading-relaxed text-fg-dim">{t(project.tagline)}</p>
          <p className="mt-2 font-body text-xs text-fg-muted">
            {dict.project.role}: {t(project.role)}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn-ghost px-3 py-1.5 text-sm">
                {dict.project.liveDemo} <span aria-hidden>↗</span>
                <span className="sr-only"> — {fill(dict.project.liveDemoOf, { title: project.title })}</span>
              </a>
            )}
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn-ghost px-3 py-1.5 text-sm">
              {dict.project.github} <span aria-hidden>↗</span>
              <span className="sr-only"> — {fill(dict.project.codeFor, { title: project.title })}</span>
            </a>
            <Link href={href} className="link ml-auto font-body text-sm">
              {dict.project.caseStudy} <span aria-hidden>→</span>
              <span className="sr-only">: {project.title}</span>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  /* ------------------------------------------------------- Spidey */
  return (
    <article
      {...reveal}
      className={`card card-interactive group flex flex-col overflow-hidden ${
        featured ? "lg:grid lg:grid-cols-[1.35fr_1fr]" : ""
      }`}
    >
      {cover(
        featured ? "aspect-[16/10] h-full lg:aspect-auto lg:min-h-[420px]" : "aspect-[16/10]",
        featured ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 768px) 560px, 100vw"
      )}
      <div className={`flex flex-1 flex-col p-6 ${featured ? "md:p-8" : ""}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
          <span className="text-accent">{t(project.category)}</span>
          <span aria-hidden>·</span>
          <span>{project.year}</span>
          <span className="ml-auto rounded-theme border border-line px-2 py-0.5 text-fg-dim">{status}</span>
        </div>
        {titleLink(`font-display-theme mt-4 text-fg ${featured ? "text-4xl md:text-5xl" : "text-3xl"}`)}
        <p className="mt-3 font-body text-base font-medium leading-snug text-fg">{t(project.tagline)}</p>
        <p className="mt-3 font-body text-sm leading-relaxed text-fg-dim">{t(project.description)}</p>
        {role}
        {outcomes}
        {tags}
        {actions}
      </div>
    </article>
  );
}
