import Link from "next/link";
import ThemePortrait from "@/components/ThemePortrait";
import SectionHeading from "@/components/SectionHeading";
import PixelIcon, { type PixelIconName } from "@/components/PixelIcons";
import { pipeline, summary } from "@/content/about";
import { profile } from "@/content/profile";
import ClassicPortrait from "@/components/ClassicPortrait";
import { ClassicCorners } from "@/components/ThemeArt";
import { fill } from "@/lib/i18n/localized";
import { getI18n } from "@/lib/i18n/server";

/** Short homepage intro; the full story is on /about. */
export default async function AboutSummary() {
  const { theme, dict, t } = await getI18n();

  /* Pixel Art: a framed card resting on the bottom edge of the hero art. */
  if (theme === "pixel") {
    const traits: { icon: PixelIconName; label: string }[] = [
      { icon: "cap", label: dict.home.traits.student },
      { icon: "chart", label: dict.home.traits.data },
      { icon: "book", label: dict.home.traits.books },
      { icon: "gamepad", label: dict.home.traits.games },
      { icon: "dumbbell", label: dict.home.traits.fitness },
    ];
    return (
      <section aria-labelledby="intro-title" className="shell relative z-10 -mt-20 md:-mt-28">
        <div className="card grid gap-8 p-6 md:grid-cols-[11rem_1fr] md:p-8 lg:grid-cols-[11rem_1fr_15rem] lg:gap-10" data-reveal>
          <div className="relative mx-auto aspect-[4/5] w-36 overflow-hidden border border-line shadow-[inset_0_0_0_3px_rgb(var(--bg))] md:w-full">
            <ThemePortrait sizes="11rem" />
          </div>
          <div>
            <h2 id="intro-title" className="flex items-center gap-3 font-display-theme text-2xl text-fg">
              <PixelIcon name="sparkle" className="h-4 w-4 text-accent" />
              {dict.home.aboutMe}
              <span aria-hidden className="ml-2 h-px flex-1 bg-line" />
            </h2>
            <p className="mt-4 max-w-prose font-body text-base leading-relaxed text-fg-dim">{t(summary)}</p>
            <Link href="/about" className="link mt-5 inline-block font-body text-sm">
              {dict.home.moreAboutMe} <span aria-hidden>→</span>
            </Link>
          </div>
          <ul className="space-y-3 border-line md:col-span-2 lg:col-span-1 lg:border-l lg:pl-8">
            {traits.map((trait) => (
              <li key={trait.icon} className="flex items-center gap-3 font-body text-sm text-fg-dim">
                <PixelIcon name={trait.icon} className="h-4 w-4 shrink-0 text-fg-muted" />
                {trait.label}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  const facts = [
    { label: dict.home.focus, value: dict.home.focusValue },
    { label: dict.home.studying, value: t(profile.school) },
    { label: dict.home.offTheClock, value: dict.home.offTheClockValue },
  ];

  /* Classic: a dossier — a sheet of aged paper laid on the study's desk:
     an etched portrait in a narrow column, the biographical entry with a
     drop cap, and the particulars as a register. */
  if (theme === "classic") {
    return (
      <section aria-labelledby="intro-title" className="shell py-16 md:py-24">
        <div className="classic-paper relative px-6 py-12 sm:px-10 md:px-14 md:py-16" data-reveal>
          <ClassicCorners />
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-deco/50 pb-4">
            <p className="eyebrow flex items-center gap-3">
              <span className="font-accent-theme text-xl italic tracking-normal text-accent [font-variant-caps:normal]" aria-hidden>
                I
              </span>
              <span aria-hidden className="h-px w-8 bg-deco/70" />
              {dict.home.eyebrows.classic.intro}
            </p>
            <p className="meta">
              {dict.classic.dossier} · {profile.fullName}
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-[11rem_1fr] lg:grid-cols-[12rem_1fr_15rem] lg:gap-12">
            <figure className="mx-auto w-40 md:w-full">
              <ClassicPortrait sizes="12rem" />
              <figcaption className="mt-5 text-center font-body text-sm italic text-fg-muted">
                {profile.fullName}, {fill(dict.hero.born, { year: profile.birthYear })}
              </figcaption>
            </figure>

            <div>
              <h2 id="intro-title" className="section-title">
                {dict.home.introTitle}
              </h2>
              <p className="classic-dropcap mt-6 max-w-prose font-body text-xl leading-relaxed text-fg-dim">{t(summary)}</p>
              <p className="mt-6 font-body text-base text-fg-muted">
                <span className="meta mr-2">{dict.classic.method}</span>
                <span className="italic">{t(pipeline).join(" · ")}</span>
              </p>
              <Link href="/about" className="link mt-7 inline-block font-body text-lg">
                {dict.home.moreAboutMe} <span aria-hidden>→</span>
              </Link>
            </div>

            <aside aria-labelledby="particulars-title" className="md:col-span-2 lg:col-span-1 lg:border-l lg:border-deco/50 lg:pl-8">
              <h3 id="particulars-title" className="meta text-fg">
                {dict.classic.particulars}
              </h3>
              <dl className="mt-3">
                {facts.map((f) => (
                  <div key={f.label} className="border-b border-dotted border-fg-muted/40 py-3.5">
                    <dt className="font-body text-sm italic text-fg-muted">{f.label}</dt>
                    <dd className="mt-0.5 font-body text-base leading-snug text-fg">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="intro-title" className="sec shell py-20 md:py-24">
      <SectionHeading
        id="intro-title"
        eyebrow={dict.home.eyebrows[theme].intro}
        title={dict.home.introTitle}
      />
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12" data-reveal>
        <div className="lg:col-span-7">
          <p className="max-w-prose font-body text-xl leading-relaxed text-fg-dim">{t(summary)}</p>
          <p className="mt-6 inline-flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm text-fg-muted">
            {t(pipeline).map((step, i) => (
              <span key={step} className="inline-flex items-center gap-2">
                {i > 0 && (
                  <span className="text-accent" aria-hidden>
                    →
                  </span>
                )}
                {step}
              </span>
            ))}
          </p>
          <Link href="/about" className="text-link mt-8 block w-fit">
            {dict.home.moreAboutMe} <span aria-hidden>→</span>
          </Link>
        </div>
        <dl className="space-y-5 lg:col-span-5">
          {facts.map((f) => (
            <div key={f.label} className="border-t border-line/80 pt-4">
              <dt className="meta">{f.label}</dt>
              <dd className="mt-1.5 font-body text-base text-fg">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
