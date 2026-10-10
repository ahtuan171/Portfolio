import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Spidey from "@/components/Spidey";
import ClassicPortrait from "@/components/ClassicPortrait";
import ThemePortrait from "@/components/ThemePortrait";
import { ClassicCorners } from "@/components/ThemeArt";
import { bio, creative, education, goals, interests, now, nowUpdated, offTheClock, quote, toolkit, values } from "@/content/about";
import { credits } from "@/content/credits";
import { epigraphs } from "@/content/quotes";
import { displayName, profile } from "@/content/profile";
import { ogLocale } from "@/lib/i18n/config";
import { fill } from "@/lib/i18n/localized";
import { getI18n } from "@/lib/i18n/server";
import { getVisibleProjects } from "@/lib/projects";

export async function generateMetadata(): Promise<Metadata> {
  const { dict, locale } = await getI18n();
  return {
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDescription,
    alternates: { canonical: "/about" },
    openGraph: {
      title: `${dict.meta.aboutTitle} — ${displayName}`,
      description: dict.meta.aboutDescription,
      url: "/about",
      type: "profile",
      locale: ogLocale[locale],
    },
  };
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-6 border-t border-line/80 py-12 md:grid-cols-[13rem_1fr] md:gap-10" data-reveal>
      <h2 id={id} className="eyebrow md:pt-1">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

export default async function AboutPage() {
  const { theme, dict, t, month } = await getI18n();
  const d = dict.about;
  const experience = getVisibleProjects();
  const creativeItems = t(creative);
  const frame = theme === "minimalist" ? "border border-fg/30" : "card";

  return (
    <>
      <PageHeader eyebrow={d.eyebrow} title={d.title} />

      <div className="shell pb-24">
        {/* Classic: the biography is a sheet of aged paper on the study's desk. */}
        <div className={theme === "classic" ? "classic-paper relative px-6 py-12 sm:px-10 md:px-14 md:py-16" : undefined}>
          {theme === "classic" && <ClassicCorners />}
          {theme === "classic" && (
            <figure className="mb-12 ml-auto max-w-sm text-right" data-reveal>
              <blockquote lang="en" className="font-accent-theme text-xl italic leading-snug text-fg-dim">
                &ldquo;{epigraphs.classic.epigraph.text}&rdquo;
              </blockquote>
              <figcaption className="meta mt-3">— {epigraphs.classic.epigraph.author}</figcaption>
            </figure>
          )}
          {/* Opening: the person, in their own words */}
          <div className="grid gap-12 pb-16 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7" data-reveal>
              {t(bio).map((p) => (
                <p key={p.slice(0, 24)} className="mb-5 max-w-prose font-body text-lg leading-relaxed text-fg-dim md:text-xl">
                  {p}
                </p>
              ))}
              <blockquote className="mt-8 max-w-prose border-l-2 border-accent pl-5 font-serif text-xl italic leading-relaxed text-fg">
                &ldquo;{t(quote)}&rdquo;
              </blockquote>
            </div>
            <figure className="relative mx-auto w-full max-w-xs lg:col-span-5 lg:max-w-sm" data-reveal>
              {theme === "classic" ? (
                <ClassicPortrait sizes="(min-width: 1024px) 24rem, 20rem" />
              ) : (
                <div className={`relative aspect-[4/5] overflow-hidden ${frame}`}>
                  <ThemePortrait sizes="(min-width: 1024px) 24rem, 20rem" />
                </div>
              )}
              {theme === "classic" && (
                <p className="mt-3 text-center font-hand text-4xl text-deco-2 [transform:rotate(-3deg)]" aria-hidden>
                  {profile.alias}
                </p>
              )}
              <figcaption className="meta mt-4 text-center">
                {profile.fullName} · {fill(dict.hero.born, { year: profile.birthYear })}
              </figcaption>
            </figure>
          </div>

          <Block id="direction" title={d.direction}>
            <ul className="grid gap-6 sm:grid-cols-3">
              {interests.map((i) => (
                <li key={i.label.en}>
                  <p className="font-body text-base font-semibold text-fg">{t(i.label)}</p>
                  <p className="mt-1.5 font-body text-sm leading-relaxed text-fg-dim">{t(i.detail)}</p>
                </li>
              ))}
            </ul>
          </Block>

          {creativeItems.length > 0 && (
            <Block id="creative" title={d.creative}>
              <ul className="space-y-3">
                {creativeItems.map((c) => (
                  <li key={c} className="font-body text-lg leading-relaxed text-fg-dim">
                    {c}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {education.length > 0 && (
            <Block id="education" title={d.education}>
              <ul className="space-y-4">
                {education.map((e) => (
                  <li key={e.school.en} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <span>
                      <span className="font-body text-base font-semibold text-fg">{t(e.school)}</span>
                      <span className="block font-body text-sm text-fg-dim">{t(e.program)}</span>
                    </span>
                    {e.period && <span className="meta">{e.period}</span>}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {experience.length > 0 && (
            <Block id="experience" title={d.experience}>
              <ul className="divide-y divide-line/70">
                {experience.map((p) => (
                  <li key={p.slug} className="grid gap-1 py-4 first:pt-0 sm:grid-cols-[1fr_auto] sm:gap-6">
                    <div>
                      <p className="font-body text-base text-fg">
                        <span className="font-semibold">{t(p.role)}</span> ·{" "}
                        <Link href={`/projects/${p.slug}`} className="link">
                          {p.title}
                        </Link>
                      </p>
                      <p className="mt-1 font-body text-sm text-fg-dim">{p.context ? t(p.context) : t(p.tagline)}</p>
                    </div>
                    <p className="meta sm:pt-1">{p.year}</p>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          <Block id="now" title={d.now}>
            <p className="meta mb-5">{fill(d.nowUpdated, { date: month(nowUpdated) })}</p>
            <ul className="space-y-5">
              {now.map((item) => (
                <li key={item.label.en} className="flex gap-4">
                  <Spidey state={item.state} className="mt-0.5 h-7 w-auto shrink-0" />
                  <div>
                    <p className="meta">{t(item.label)}</p>
                    <p className="mt-1 font-body text-base leading-relaxed text-fg">{t(item.text)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="meta mt-10">{d.goals}</h3>
            <ul className="mt-4 space-y-3">
              {goals.map((goal) => (
                <li key={goal.en} className="flex gap-3 font-body text-base leading-relaxed text-fg-dim">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                  {t(goal)}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="tools" title={d.skills}>
            <dl className="space-y-3">
              {toolkit.map((group) => (
                <div key={group.label.en} className="flex flex-wrap gap-x-3 font-body text-base">
                  <dt className="font-semibold text-fg">{t(group.label)} —</dt>
                  <dd className="text-fg-dim">{group.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block id="values" title={d.values}>
            <ul className="grid gap-6 sm:grid-cols-3">
              {values.map((v) => (
                <li key={v.label.en}>
                  <p className="font-accent-theme text-2xl text-fg">{t(v.label)}</p>
                  <p className="mt-1.5 font-body text-sm leading-relaxed text-fg-dim">{t(v.detail)}</p>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="off-the-clock" title={d.offClock}>
            <ul className="divide-y divide-line/70">
              {offTheClock.map((h) => (
                <li key={h.label.en} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3 first:pt-0">
                  <span className="font-body text-base font-medium text-fg">{t(h.label)}</span>
                  {h.detail && <span className="font-body text-sm text-fg-muted">{t(h.detail)}</span>}
                </li>
              ))}
            </ul>
          </Block>

          <section
            aria-labelledby="say-hi"
            className="card mt-6 flex flex-col items-start gap-5 p-8 md:flex-row md:items-center md:justify-between"
            data-reveal
          >
            <div>
              <h2 id="say-hi" className="section-title">
                {d.sayHello}
              </h2>
              <p className="mt-2 font-body text-fg-dim">
                {profile.availability.open
                  ? fill(d.sayHelloOpen, { availability: t(profile.availability.label) })
                  : d.sayHelloClosed}
              </p>
            </div>
            <a href={`mailto:${profile.email}`} className="btn-primary normal-case tracking-normal">
              {profile.email}
            </a>
          </section>

          {credits.length > 0 && (
            <section id="credits" aria-labelledby="credits-title" className="mt-16 border-t border-line/70 pt-8">
              <h2 id="credits-title" className="meta mb-4">
                {dict.footer.credits}
              </h2>
              <ul className="space-y-1.5 font-body text-xs leading-relaxed text-fg-muted">
                {credits.map((c) => (
                  <li key={c.src}>
                    {c.maker ? `${c.maker}, ` : ""}
                    <a href={c.url} target="_blank" rel="noreferrer" className="link text-fg-muted">
                      {t(c.title)}
                    </a>
                    , {t(c.date)} — {c.source}, {c.license}.
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
