import SectionHeading from "@/components/SectionHeading";
import ActivityWidget from "@/components/ActivityWidget";
import CopyButton from "@/components/CopyButton";
import Image from "next/image";
import { PixelMedallion } from "@/components/PixelIcons";
import SocialIcon from "@/components/SocialIcon";
import { ClassicCorners } from "@/components/ThemeArt";
import { pixelFooter } from "@/lib/themeArt";
import { profile } from "@/content/profile";
import { fill } from "@/lib/i18n/localized";
import { getI18n } from "@/lib/i18n/server";

export default async function Contact() {
  const { theme, dict, t } = await getI18n();
  const lead = profile.availability.open
    ? fill(dict.contact.leadOpen, { availability: t(profile.availability.label) })
    : dict.contact.leadClosed;

  /* Pixel Art: a quiet letter by the moonlit water. */
  if (theme === "pixel") {
    return (
      <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden py-24 md:py-40">
        <div className="absolute inset-0 -z-10" aria-hidden>
          <Image src={pixelFooter} alt="" fill sizes="100vw" className="object-cover object-[30%_62%]" />
          {/* Fade in from the page above; keep the cottage and boat visible. */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--bg))_0%,rgb(var(--bg)/0.45)_28%,rgb(var(--bg)/0.35)_70%,rgb(var(--bg)/0.85)_100%)]" />
        </div>
        <div className="shell">
          <div className="card mx-auto grid max-w-4xl gap-10 p-6 md:grid-cols-[1fr_17rem] md:p-9" data-reveal>
            <div className="flex gap-5">
              <PixelMedallion name="mail" className="hidden h-14 w-14 sm:flex" />
              <div>
                <h2 id="contact-title" className="font-display-theme text-3xl text-fg">
                  {dict.home.contactTitle}
                </h2>
                <p className="mt-3 max-w-md font-body text-base leading-relaxed text-fg-dim">
                  {lead} {dict.contact.emailBest}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a href={`mailto:${profile.email}`} className="btn-primary normal-case">
                    {profile.email}
                  </a>
                  <CopyButton value={profile.email} />
                </div>
                <ul className="mt-6 flex gap-2">
                  {profile.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/70 text-fg transition-colors hover:border-accent hover:text-accent"
                      >
                        <SocialIcon label={s.label} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <ActivityWidget />
          </div>
        </div>
      </section>
    );
  }

  /* Classic: correspondence — a letter written in the study at night:
     the address in large italic, the ways to write, and the record of
     recent work in an engraved frame. */
  if (theme === "classic") {
    return (
      <section id="contact" aria-labelledby="contact-title" className="classic-band relative">
        <div className="shell py-20 md:py-28">
          <SectionHeading id="contact-title" eyebrow={dict.home.eyebrows.classic.contact} title={dict.home.contactTitle} ornate numeral="IV" />
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7" data-reveal>
              <p className="max-w-xl font-body text-xl leading-relaxed text-fg-dim">
                {lead} {dict.contact.emailBest}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all font-accent-theme text-3xl text-fg underline decoration-deco decoration-1 underline-offset-[10px] transition-colors hover:text-accent md:text-[2.6rem]"
                >
                  {profile.email}
                </a>
                <CopyButton value={profile.email} />
              </div>
              <ul className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2">
                {profile.socials.map((s, i) => (
                  <li key={s.label} className="flex items-center gap-5">
                    {i > 0 && <span aria-hidden className="h-[5px] w-[5px] rotate-45 border border-deco" />}
                    <a href={s.href} target="_blank" rel="noreferrer" className="text-link">
                      {s.label} <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
              <div className="classic-frame relative p-3">
                <ClassicCorners />
                <ActivityWidget />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative border-t border-line/60 bg-surface/40"
    >
      <div className="sec shell py-20 md:py-24">
        <SectionHeading
          id="contact-title"
          eyebrow={dict.home.eyebrows[theme].contact}
          title={dict.home.contactTitle}
        />
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <p className="max-w-xl font-body text-lg leading-relaxed text-fg-dim">
              {lead} {dict.contact.emailBest}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="break-all font-display-theme text-3xl normal-case text-fg underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent md:text-4xl"
              >
                {profile.email}
              </a>
              <CopyButton value={profile.email} />
            </div>
            {/* Minimalist: the footer already lists these. */}
            {theme !== "minimalist" && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="text-link">
                      {s.label} <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="lg:col-span-5" data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <ActivityWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
