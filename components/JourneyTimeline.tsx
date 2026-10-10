import Image from "next/image";
import Link from "next/link";
import OutcomeBadge from "@/components/OutcomeBadge";
import { PixelMedallion, type PixelIconName } from "@/components/PixelIcons";
import Placeholder from "@/components/Placeholder";
import { OUTCOME_KINDS, type Milestone } from "@/content/milestones";
import { getI18n } from "@/lib/i18n/server";

/**
 * Milestones in each world's idiom — the facts never change:
 *   spidey   — silk-thread timeline with cards
 *   pixel    — waypoints along a path through the world
 *   classic  — a chronicle: dates on one side, a brass line with diamond markers
 *   minimalist — a ledger: year, deed, outcome, thin rules
 */
export default async function JourneyTimeline({ milestones }: { milestones: Milestone[] }) {
  const { theme, dict, t, period } = await getI18n();

  const when = (m: Milestone) => (m.date === "TBD" ? dict.journey.dateTbd : period(m.date, m.endDate));

  const links = (m: Milestone) =>
    (m.projectSlug || m.links?.length || m.certificateUrl) && (
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {m.projectSlug && (
          <Link href={`/projects/${m.projectSlug}`} className="text-link">
            {dict.project.caseStudy} <span aria-hidden>→</span>
          </Link>
        )}
        {m.links?.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-link">
            {t(l.label)} <span aria-hidden>↗</span>
          </a>
        ))}
        {m.certificateUrl && (
          <a href={m.certificateUrl} target="_blank" rel="noreferrer" className="text-link">
            {dict.journey.certificate} <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    );

  const image = (m: Milestone) =>
    m.image && (
      <Image
        src={m.image.src}
        alt={t(m.image.alt)}
        className="theme-media mt-4 rounded-theme border border-line"
        sizes="(min-width: 768px) 560px, 100vw"
      />
    );

  const kinds = OUTCOME_KINDS.filter((k) => milestones.some((m) => m.outcome.kind === k));
  const legend = (
    <dl className="mb-12 flex flex-wrap gap-x-8 gap-y-3" aria-label={dict.journey.legendLabel}>
      {kinds.map((k) => (
        <div key={k} className="flex items-center gap-2">
          <dt>
            <OutcomeBadge kind={k} dict={dict} pixel={theme === "pixel"} />
          </dt>
          <dd className="font-body text-sm text-fg-muted">{dict.journey.legend[k]}</dd>
        </div>
      ))}
    </dl>
  );

  const placeholderNote = (m: Milestone) =>
    m.placeholder && <Placeholder>placeholder entry — replace with a real milestone or delete it (content/milestones.ts)</Placeholder>;

  /* --------------------------------------- Pixel: waypoints on a path */
  if (theme === "pixel") {
    const icon: Record<Milestone["category"], PixelIconName> = {
      hackathon: "flag",
      competition: "trophy",
      award: "trophy",
      academic: "cap",
      build: "chest",
      learning: "book",
    };
    const cols = milestones.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
    return (
      <>
        {legend}
        <ol className={`relative grid gap-6 md:grid-cols-2 ${cols} lg:pb-12`}>
          {/* The path the waypoints sit on (desktop). */}
          <span aria-hidden className="absolute bottom-4 left-0 right-0 hidden h-px bg-[repeating-linear-gradient(90deg,rgb(var(--line))_0_6px,transparent_6px_10px)] lg:block" />
          {milestones.map((m, i) => (
            <li
              key={m.id}
              className="relative lg:after:absolute lg:after:-bottom-10 lg:after:left-1/2 lg:after:h-3 lg:after:w-3 lg:after:-translate-x-1/2 lg:after:rotate-45 lg:after:border lg:after:border-line lg:after:bg-bg lg:after:content-['']"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${Math.min(i, 3) * 90}ms` }}
            >
              <article className={`card flex h-full gap-4 p-5 ${m.placeholder ? "opacity-75" : ""}`}>
                <PixelMedallion name={icon[m.category]} className="h-11 w-11" />
                <div className="min-w-0">
                  <p className="font-display-theme text-lg leading-tight text-fg">{dict.journey.categories[m.category]}</p>
                  <h3 className="mt-1 font-body text-sm leading-snug text-fg-dim">{t(m.title)}</h3>
                  <p className="mt-1 font-body text-xs text-fg-muted">
                    {m.role && <>{t(m.role)} · </>}
                    {m.date === "TBD" ? when(m) : <time dateTime={m.date}>{when(m)}</time>}
                  </p>
                  <p className="mt-3 font-body text-xs leading-relaxed text-fg-muted">{t(m.outcome.detail)}</p>
                  <div className="mt-3">
                    <OutcomeBadge kind={m.outcome.kind} dict={dict} pixel />
                  </div>
                  {image(m)}
                  {links(m)}
                  {placeholderNote(m)}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </>
    );
  }

  const groups = new Map<string, Milestone[]>();
  for (const m of milestones) {
    const key = m.date === "TBD" ? dict.journey.toAdd : m.date.slice(0, 4);
    groups.set(key, [...(groups.get(key) ?? []), m]);
  }

  /* -------------------------------------------- Minimalist: the ledger */
  if (theme === "minimalist") {
    return (
      <>
        {/* No legend: the status words are plain enough to stand alone. */}
        <div className="border-t border-line">
          {[...groups.entries()].map(([year, items]) => (
            <section key={year} aria-labelledby={`y-${year}`} className="grid gap-4 border-b border-line py-10 last:border-b-0 md:grid-cols-[12rem_1fr]">
              <h3 id={`y-${year}`} className="font-display-theme text-4xl leading-none text-fg md:text-5xl">
                {year}
              </h3>
              <ol className="divide-y divide-line">
                {items.map((m) => (
                  <li key={m.id} className="grid gap-3 py-6 first:pt-0 last:pb-0 md:grid-cols-[1fr_auto] md:gap-8" data-reveal>
                    <div>
                      <p className="meta">
                        {m.date === "TBD" ? when(m) : <time dateTime={m.date}>{when(m)}</time>}
                        {m.role && <> · {t(m.role)}</>}
                      </p>
                      <h4 className="mt-2 font-body text-xl font-semibold leading-snug text-fg">{t(m.title)}</h4>
                      <p className="mt-2 max-w-prose font-body text-base leading-relaxed text-fg-dim">{t(m.description)}</p>
                      <p className="mt-2 font-body text-sm text-fg">{t(m.outcome.detail)}</p>
                      {image(m)}
                      {links(m)}
                      {placeholderNote(m)}
                    </div>
                    <div>
                      <OutcomeBadge kind={m.outcome.kind} dict={dict} />
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </>
    );
  }

  /* ---------------------------------------------- Classic: chronicle */
  if (theme === "classic") {
    return (
      <>
        <dl className="mb-14 flex flex-wrap items-center gap-x-7 gap-y-3 font-body text-sm italic text-fg-muted" aria-label={dict.journey.legendLabel}>
          <span aria-hidden className="meta not-italic">
            {dict.classic.key}
          </span>
          {kinds.map((k) => (
            <div key={k} className="flex items-center gap-2">
              <dt>
                <OutcomeBadge kind={k} dict={dict} />
              </dt>
              <dd>{dict.journey.legend[k]}</dd>
            </div>
          ))}
        </dl>
        <div className="space-y-16">
          {[...groups.entries()].map(([year, items]) => (
            <section key={year} aria-labelledby={`y-${year}`}>
              <h3 id={`y-${year}`} className="flex items-baseline gap-4">
                {/^\d{4}$/.test(year) && (
                  <span aria-hidden className="meta">
                    {dict.classic.year}
                  </span>
                )}
                <span className="font-display-theme text-5xl leading-none text-fg">{year}</span>
                <span aria-hidden className="h-px flex-1 self-center bg-deco/50" />
              </h3>
              <ol className="mt-10">
                {items.map((m) => (
                  <li key={m.id} className="grid md:grid-cols-[11rem_1fr]" data-reveal>
                    {/* Narrow date column, set like a marginal note. */}
                    <p className="pb-2 font-body text-base italic text-fg-muted md:pb-0 md:pr-8 md:pt-2 md:text-right">
                      {m.date === "TBD" ? when(m) : <time dateTime={m.date}>{when(m)}</time>}
                    </p>
                    {/* A brass line with an engraved marker at each entry. */}
                    <div className={`journey-line relative border-l pb-14 pl-8 md:pl-10 ${m.placeholder ? "opacity-75" : ""}`}>
                      <svg viewBox="0 0 16 16" aria-hidden className="absolute -left-[8.5px] top-3 h-4 w-4 text-deco">
                        <circle cx="8" cy="8" r="7" fill="rgb(var(--bg))" stroke="currentColor" />
                        <circle cx="8" cy="8" r="4.2" fill="none" stroke="currentColor" strokeWidth="0.7" />
                        <circle cx="8" cy="8" r="1.8" fill="currentColor" />
                      </svg>
                      <p className="meta">
                        {dict.journey.categories[m.category]}
                        {m.role && <> · {t(m.role)}</>}
                      </p>
                      <h4 className="mt-1 font-display-theme text-[2rem] leading-tight text-fg">{t(m.title)}</h4>
                      <p className="mt-3 max-w-prose font-body text-lg leading-relaxed text-fg-dim">{t(m.description)}</p>
                      <p className="mt-4 flex flex-wrap items-center gap-3 font-body text-base text-fg">
                        <OutcomeBadge kind={m.outcome.kind} dict={dict} />
                        <span className="italic">{t(m.outcome.detail)}</span>
                      </p>
                      {image(m)}
                      {links(m)}
                      {placeholderNote(m)}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </>
    );
  }

  /* -------------------------------------------- Spidey: silk thread */
  return (
    <>
      {legend}
      <div className="space-y-16">
        {[...groups.entries()].map(([year, items]) => (
          <section key={year} aria-labelledby={`y-${year}`} className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-10">
            <h3 id={`y-${year}`} className="section-title md:sticky md:top-24 md:self-start">
              {year}
            </h3>
            <ol className="journey-line relative ml-1.5 border-l border-line">
              {items.map((m, i) => (
                <li
                  key={m.id}
                  className="relative pb-10 pl-8 last:pb-0 md:pl-10"
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${Math.min(i, 4) * 80}ms` }}
                >
                  <span
                    aria-hidden
                    className={`absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-accent ${m.placeholder ? "bg-bg" : "bg-accent"}`}
                  />
                  <article className={`card p-5 md:p-6 ${m.placeholder ? "border-dashed opacity-80" : ""}`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <OutcomeBadge kind={m.outcome.kind} dict={dict} />
                      <span className="tag">{dict.journey.categories[m.category]}</span>
                      {m.role && <span className="tag">{t(m.role)}</span>}
                    </div>
                    <p className="meta mt-4">{m.date === "TBD" ? when(m) : <time dateTime={m.date}>{when(m)}</time>}</p>
                    <h4 className="mt-1.5 font-body text-lg font-semibold leading-snug text-fg">{t(m.title)}</h4>
                    <p className="mt-2 max-w-prose font-body text-sm leading-relaxed text-fg-dim">{t(m.description)}</p>
                    <p className="mt-3 font-body text-sm text-fg">
                      <span className="sr-only">{dict.journey.outcome}: </span>
                      {t(m.outcome.detail)}
                    </p>
                    {image(m)}
                    {links(m)}
                    {placeholderNote(m)}
                  </article>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </>
  );
}
