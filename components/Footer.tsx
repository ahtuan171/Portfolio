import Image from "next/image";
import Link from "next/link";
import Spidey from "@/components/Spidey";
import type { NavItem } from "@/components/Header";
import ThemeQuote from "@/components/ThemeQuote";
import { epigraphs } from "@/content/quotes";
import { credits } from "@/content/credits";
import { displayName, profile } from "@/content/profile";
import { getI18n } from "@/lib/i18n/server";
import { classicArt } from "@/lib/themeArt";
import { ClassicRule, CompassRose } from "@/components/ThemeArt";

/** Site footer — contact details reachable from every page. */
export default async function Footer({ items, showRss }: { items: NavItem[]; showRss: boolean }) {
  const { theme, dict, t } = await getI18n();
  return (
    <footer className="site-footer border-t border-line/60">
      <ThemeQuote />
      {/* Classic: the journal's last page — the desk by the window at dusk,
          his own line set as a colophon between brass rules. */}
      {theme === "classic" && (
        <figure className="relative isolate overflow-hidden border-b border-deco/40">
          <Image src={classicArt.study} alt="" fill sizes="100vw" className="-z-10 object-cover object-[88%_72%]" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(var(--bg))_0%,rgb(var(--bg)/0.5)_30%,rgb(var(--bg)/0.45)_70%,rgb(var(--bg))_100%),radial-gradient(ellipse_55%_70%_at_50%_50%,rgb(var(--bg)/0.75),transparent_100%)]"
          />
          <div className="shell flex flex-col items-center py-20 text-center md:py-28">
            <ClassicRule className="w-48" />
            <blockquote lang="en" className="mt-8 max-w-2xl text-balance font-accent-theme text-2xl italic leading-snug text-fg md:text-[2.1rem]">
              &ldquo;{epigraphs.classic.colophon.text}&rdquo;
            </blockquote>
            <figcaption className="meta mt-6 text-fg-dim">— {epigraphs.classic.colophon.author}</figcaption>
            <CompassRose className="mt-10 h-7 w-7 text-deco" />
          </div>
        </figure>
      )}
      <div className="shell grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display-theme text-3xl text-fg">{displayName}</p>
          <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-fg-dim">{t(profile.positioning)}</p>
          <a href={`mailto:${profile.email}`} className="link mt-5 inline-block font-body text-sm">
            {profile.email}
          </a>
        </div>
        <nav aria-label={dict.nav.footer} className="md:col-span-3">
          <p className="meta mb-4">{dict.footer.pages}</p>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="font-body text-sm text-fg-dim transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="meta mb-4">{dict.footer.elsewhere}</p>
          <ul className="space-y-2">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="font-body text-sm text-fg-dim transition-colors hover:text-accent">
                  {s.label} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
            {showRss && (
              <li>
                <a href="/journal/rss.xml" className="font-body text-sm text-fg-dim transition-colors hover:text-accent">
                  {dict.footer.rss}
                </a>
              </li>
            )}
            {credits.length > 0 && (
              <li>
                <Link href="/about#credits" className="font-body text-sm text-fg-dim transition-colors hover:text-accent">
                  {dict.footer.credits}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className={`shell ${theme === "minimalist" ? "" : "border-t border-line/60"}`}>
        <div className={`flex items-center justify-between gap-4 py-6 ${theme === "minimalist" ? "border-t border-line/80" : ""}`}>
          <p className="meta flex items-center gap-3">
            <Spidey state="hanging" className="h-6 w-auto" />© {new Date().getFullYear()} {displayName}
          </p>
          <a href="#top" className="meta transition-colors hover:text-accent">
            {dict.footer.backToTop} <span aria-hidden>↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
