import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import Placeholder from "@/components/Placeholder";
import ProjectCover from "@/components/ProjectCover";
import { ogLocale } from "@/lib/i18n/config";
import { fill, pick } from "@/lib/i18n/localized";
import { getI18n } from "@/lib/i18n/server";
import { getVisibleProject, getVisibleProjects } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return getVisibleProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getVisibleProject(slug);
  if (!project) return {};
  const { dict, locale } = await getI18n();
  const title = fill(dict.meta.caseStudy, { title: project.title });
  const description = pick(project.description, locale);
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { type: "article", title, description, url: `/projects/${project.slug}`, locale: ogLocale[locale] },
  };
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line/70 py-10 first:border-t-0 first:pt-0" data-reveal>
      <h2 id={id} className="eyebrow mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 font-body text-base leading-relaxed text-fg-dim">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getVisibleProject(slug);
  if (!project) notFound();

  const { dict, t } = await getI18n();
  const projects = getVisibleProjects();
  const i = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(i + 1) % projects.length];
  const gallery = project.gallery?.filter((g) => g.src !== project.cover?.src) ?? [];
  const label = dict.project;

  return (
    <article className="pb-20 md:pb-28">
      <header className="shell pt-10 md:pt-14">
        <nav aria-label={dict.nav.breadcrumb}>
          <ol className="meta flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                {dict.nav.home}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/#projects" className="transition-colors hover:text-accent">
                {label.projects}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-fg-dim">
              {project.title}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">
              {t(project.category)} · {project.year}
            </p>
            <h1 className="page-title">{project.title}</h1>
            <p className="mt-6 max-w-xl font-body text-xl leading-snug text-fg md:text-2xl">{t(project.tagline)}</p>
          </div>

          <div className="lg:col-span-5">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <dt className="meta">{label.role}</dt>
                <dd className="mt-1 font-body text-sm text-fg">{t(project.role)}</dd>
              </div>
              <div>
                <dt className="meta">{label.status}</dt>
                <dd className="mt-1 font-body text-sm text-fg">{label.statuses[project.status]}</dd>
              </div>
              {project.context && (
                <div className="col-span-2">
                  <dt className="meta">{label.context}</dt>
                  <dd className="mt-1 font-body text-sm text-fg">{t(project.context)}</dd>
                </div>
              )}
              <div className="col-span-2">
                <dt className="meta">{label.stack}</dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li key={tag} className="tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn-primary">
                  {label.liveDemo} <span aria-hidden>↗</span>
                </a>
              )}
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                {label.sourceCode} <span aria-hidden>↗</span>
              </a>
              {project.demoNote && (
                <p className="w-full font-body text-xs text-fg-muted">
                  {label.demo}: {t(project.demoNote)}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="shell mt-12 md:mt-16" data-reveal>
        <div className="frame-ticks">
          <ProjectCover project={project} priority className="card aspect-[16/9]" sizes="(min-width: 1152px) 1088px, 100vw" />
        </div>
      </div>

      <div className="shell mt-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Block id="overview" title={label.overview}>
            <div className="space-y-5">
              {t(project.overview).map((p) => (
                <p key={p.slice(0, 24)} className="max-w-prose font-body text-lg leading-relaxed text-fg-dim">
                  {p}
                </p>
              ))}
            </div>
          </Block>

          {project.problem && (
            <Block id="problem" title={label.problem}>
              <p className="max-w-prose font-body text-lg leading-relaxed text-fg-dim">{t(project.problem)}</p>
            </Block>
          )}

          {project.contributions ? (
            <Block id="contributions" title={label.myRole}>
              <p className="meta mb-4">{t(project.role)}</p>
              <BulletList items={t(project.contributions)} />
            </Block>
          ) : (
            <div className="mb-6">
              <Placeholder>List your specific contributions to {project.title} (content/projects.ts → contributions).</Placeholder>
            </div>
          )}

          <Block id="features" title={label.features}>
            <BulletList items={t(project.features)} />
          </Block>

          {project.architecture && (
            <Block id="architecture" title={label.architecture}>
              <ArchitectureDiagram architecture={project.architecture} title={project.title} />
            </Block>
          )}

          <Block id="implementation" title={label.howBuilt}>
            <dl className="divide-y divide-line/70 rounded-theme border border-line">
              {project.implementation.map((row) => (
                <div key={row.label.en} className="grid gap-1 px-4 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="meta text-accent">{t(row.label)}</dt>
                  <dd className="font-body text-sm leading-relaxed text-fg-dim">{t(row.value)}</dd>
                </div>
              ))}
            </dl>
          </Block>

          {project.challenges ? (
            <Block id="challenges" title={label.challenges}>
              <BulletList items={t(project.challenges)} />
            </Block>
          ) : (
            <Placeholder>Add the real challenges you hit building {project.title} (content/projects.ts → challenges).</Placeholder>
          )}

          {project.lessons ? (
            <Block id="lessons" title={label.lessons}>
              <BulletList items={t(project.lessons)} />
            </Block>
          ) : (
            <Placeholder>Add what you learned from {project.title} (content/projects.ts → lessons).</Placeholder>
          )}
        </div>

        <div className="lg:col-span-4">
          {project.outcomes?.length ? (
            <div className="card p-6 lg:sticky lg:top-24" data-reveal>
              <h2 className="eyebrow mb-5">{label.numbers}</h2>
              <dl className="space-y-5">
                {project.outcomes.map((o) => (
                  <div key={o.label.en} className="flex flex-col-reverse">
                    <dt className="font-body text-sm text-fg-muted">{t(o.label)}</dt>
                    <dd className="font-display-theme pb-1 text-4xl leading-none text-accent">{o.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </div>
      </div>

      {gallery.length > 0 && (
        <section aria-labelledby="gallery" className="shell mt-8">
          <h2 id="gallery" className="eyebrow mb-6">
            {label.gallery}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {gallery.map((g, idx) => (
              <figure key={g.alt.en} data-reveal style={{ ["--reveal-delay" as string]: `${idx * 80}ms` }}>
                <Image
                  src={g.src}
                  alt={t(g.alt)}
                  placeholder="blur"
                  sizes="(min-width: 768px) 540px, 100vw"
                  className="card theme-media w-full"
                />
                {g.caption && <figcaption className="mt-3 font-body text-sm text-fg-muted">{t(g.caption)}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}

      {next && next.slug !== project.slug && (
        <nav aria-label={label.nextProject} className="shell mt-20">
          <Link href={`/projects/${next.slug}`} className="card card-interactive flex items-center justify-between gap-6 p-6 md:p-8">
            <span>
              <span className="eyebrow block">{label.nextProject}</span>
              <span className="font-display-theme mt-2 block text-3xl text-fg md:text-4xl">{next.title}</span>
            </span>
            <span aria-hidden className="font-mono text-2xl text-accent">
              →
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}
