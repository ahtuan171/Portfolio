import Image from "next/image";
import Spidey from "@/components/Spidey";
import ThemePortrait from "@/components/ThemePortrait";
import { WebCorner } from "@/components/Decor";
import PixelIcon from "@/components/PixelIcons";
import { ClassicRule, CompassRose } from "@/components/ThemeArt";
import { classicArt, pixelArt } from "@/lib/themeArt";
import { profile } from "@/content/profile";
import { fill } from "@/lib/i18n/localized";
import { roman } from "@/lib/format";
import { getI18n } from "@/lib/i18n/server";

/**
 * Home hero. Identity, positioning and actions are shared;
 * the visual composition is each world's own:
 *   spidey   — portrait card, silk-hung mascot, web corner
 *   pixel    — full-bleed dusk-forest artwork (lib/themeArt.ts), quiet type
 *   classic  — a journal's opening page: masthead, name, and the candlelit
 *              study framed under an arch beside it
 *   minimalist — light page, a matted portrait, quiet serif type
 */
export default async function Hero() {
  const { theme, dict, t } = await getI18n();
  const born = fill(dict.hero.born, { year: profile.birthYear });

  const copy = (
    <>
      <p className="eyebrow mb-5">{t(profile.role)}</p>
      <h1 id="hero-title" className="hero-name">
        {profile.name}
        <span className="font-accent-theme mt-3 block text-[0.42em] font-normal leading-none tracking-normal text-accent">
          ({profile.alias})
        </span>
      </h1>
      <p className="mt-8 max-w-xl text-balance font-body text-xl font-medium leading-snug text-fg md:text-2xl">
        {t(profile.positioning)}
      </p>
      <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-fg-dim md:text-lg">{t(profile.intro)}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a href="#projects" className="btn-primary">
          {dict.hero.viewProjects} <span aria-hidden>↓</span>
        </a>
        <a href="#contact" className="btn-ghost">
          {dict.hero.contact}
        </a>
        {profile.cvUrl && (
          <a href={profile.cvUrl} className="btn-ghost" download>
            {dict.hero.downloadCv}
          </a>
        )}
      </div>
    </>
  );

  /* ------------------------------------------------------------- Pixel */
  if (theme === "pixel") {
    return (
      <section aria-labelledby="hero-title" className="relative isolate -mt-16 overflow-hidden pt-16">
        {/* The world: owner-supplied artwork, decorative. */}
        <div className="absolute inset-0 -z-10" aria-hidden>
          <Image
            src={pixelArt.hero}
            alt=""
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-[28%_center] md:object-[55%_center]"
          />
          {/* Overlays keep the text readable without hiding the art. */}
          {/* A pool of shadow behind the text (top-left) keeps it readable
              while the traveller, lantern and castle stay visible. */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_12%_28%,rgb(var(--bg)/0.88)_0%,rgb(var(--bg)/0.55)_45%,transparent_75%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-[linear-gradient(0deg,rgb(var(--bg))_0%,transparent_100%)]" />
          <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgb(var(--bg)/0.6),transparent)]" />
        </div>

        <div className="shell min-h-[min(94vh,860px)] pb-48 pt-16 md:pb-64 md:pt-24">
          <div className="max-w-xl" data-reveal>
            <p className="eyebrow mb-4 text-fg-dim">{dict.hero.greeting}</p>
            <h1 id="hero-title" className="font-display-theme text-[clamp(2.6rem,1.6rem+4vw,4.4rem)] leading-[1.05] text-fg [text-shadow:0_2px_24px_rgb(0_0_0/0.6)]">
              {profile.name} <span className="font-accent-theme text-fg-dim">({profile.alias})</span>
            </h1>
            <p className="mt-6 max-w-lg font-body text-xl leading-relaxed text-fg">{t(profile.positioning)}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary">
                <PixelIcon name="sparkle" className="h-3.5 w-3.5" />
                {dict.hero.viewProjects} <span aria-hidden>→</span>
              </a>
              <a href="#contact" className="btn-ghost">
                <PixelIcon name="mail" className="h-3 w-4" />
                {dict.hero.contact}
              </a>
              {profile.cvUrl && (
                <a href={profile.cvUrl} className="btn-ghost" download>
                  {dict.hero.downloadCv}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ----------------------------------------------------------- Classic */
  if (theme === "classic") {
    return (
      <section aria-labelledby="hero-title" className="classic-band relative overflow-hidden border-b border-deco/40">
        <div className="shell grid items-center gap-14 pb-16 pt-12 md:pb-20 md:pt-16 lg:grid-cols-12 lg:gap-10">
          {/* The opening page of a journal: masthead line, name, a brass
              rule, the tagline in italic, the introduction. */}
          <div className="lg:col-span-7 xl:col-span-6" data-reveal>
            <p className="meta flex flex-wrap items-center gap-x-3 gap-y-1 text-fg-dim">
              <CompassRose className="h-5 w-5 shrink-0 text-deco" />
              <span>{dict.classic.archive}</span>
              <span aria-hidden className="h-px w-8 bg-deco/60" />
              <span>{roman(new Date().getFullYear())}</span>
            </p>
            <h1 id="hero-title" className="hero-name mt-8 text-[clamp(3.4rem,2.2rem+4.4vw,6.2rem)] !leading-[0.95]">
              {profile.name}
              <span className="font-accent-theme mt-1 block text-[0.52em] font-medium leading-tight text-accent">({profile.alias})</span>
            </h1>
            <div className="mt-7 flex items-center gap-4">
              <ClassicRule align="start" className="w-24 shrink-0" />
              <p className="eyebrow">{t(profile.role)}</p>
            </div>
            <p className="mt-7 max-w-lg text-balance font-accent-theme text-[1.7rem] leading-snug text-fg">{t(profile.positioning)}</p>
            <p className="mt-5 max-w-lg font-body text-lg leading-relaxed text-fg-dim">{t(profile.intro)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">
                {dict.hero.viewProjects} <span aria-hidden>↓</span>
              </a>
              <a href="#contact" className="btn-ghost">
                {dict.hero.contact}
              </a>
              {profile.cvUrl && (
                <a href={profile.cvUrl} className="btn-ghost" download>
                  {dict.hero.downloadCv}
                </a>
              )}
            </div>
          </div>

          {/* The study (owner-supplied artwork) as a framed plate under an
              arch — no overlay: the figure, the window and the lake stay
              clear. */}
          <figure className="mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:col-start-8 xl:col-start-8" data-reveal style={{ ["--reveal-delay" as string]: "150ms" }}>
            <div className="relative">
              <svg viewBox="0 0 24 24" aria-hidden className="absolute -top-3 left-1/2 z-10 h-6 w-6 -translate-x-1/2 text-deco">
                <path d="M12 1 19 12 12 23 5 12Z" fill="rgb(var(--bg))" stroke="currentColor" />
                <path d="M12 7 15 12 12 17 9 12Z" fill="currentColor" />
              </svg>
              <div className="classic-picture-frame classic-arch">
                <div className="classic-arch relative aspect-[4/5] overflow-hidden">
                  <div className="classic-develop absolute inset-0">
                    <Image
                      src={classicArt.study}
                      alt=""
                      fill
                      priority
                      placeholder="blur"
                      sizes="(min-width: 1024px) 28rem, (min-width: 640px) 28rem, 90vw"
                      className="object-cover object-[78%_50%]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <figcaption className="mt-5 flex items-center gap-3 font-body text-base italic text-fg-dim">
              <span aria-hidden className="h-px flex-1 bg-deco/40" />
              {dict.classic.plate}
              <span aria-hidden className="h-px flex-1 bg-deco/40" />
            </figcaption>
          </figure>
        </div>
      </section>
    );
  }

  /* -------------------------------------------------------- Minimalist */
  if (theme === "minimalist") {
    return (
      <section aria-labelledby="hero-title">
        <div className="shell grid gap-12 pb-16 pt-12 md:pb-20 md:pt-20 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7" data-reveal>
            {copy}
          </div>
          {/* An editorial print: borderless but for a graphite hairline,
              a fixed 4:5 crop, the caption set beneath. */}
          <figure className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none" data-reveal style={{ ["--reveal-delay" as string]: "150ms" }}>
            <div className="relative aspect-[4/5] overflow-hidden border border-fg/30 bg-surface-2">
              <ThemePortrait priority sizes="(min-width: 1024px) 36rem, (min-width: 640px) 28rem, 90vw" />
            </div>
            <figcaption className="meta mt-4 flex items-center justify-between gap-4">
              <span>{profile.fullName}</span>
              <span>{born}</span>
            </figcaption>
          </figure>
        </div>
      </section>
    );
  }

  /* ------------------------------------------------------------ Spidey */
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <WebCorner className="absolute -right-10 -top-10 w-[300px] text-accent/25 md:-right-4 md:w-[460px]" />
      <div className="shell relative grid gap-12 pb-20 pt-12 md:pb-28 md:pt-20 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7" data-reveal>
          {copy}
        </div>
        <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          <figure className="frame-ticks relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="card relative aspect-[4/5] overflow-hidden">
              <ThemePortrait priority sizes="(min-width: 1024px) 34vw, (min-width: 640px) 24rem, 90vw" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(0_0_0/0.55)_100%)]" />
            </div>
            <Spidey state="hanging" className="absolute -top-px right-8 h-16 w-auto -translate-y-[42%]" />
            <figcaption className="meta mt-4 flex items-center justify-between">
              <span>{profile.fullName}</span>
              <span>{born}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
