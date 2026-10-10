import Image from "next/image";
import Link from "next/link";
import { ClassicRule } from "@/components/ThemeArt";
import { classicArt, pixelPageHeader } from "@/lib/themeArt";
import type { ReactNode } from "react";
import { getI18n } from "@/lib/i18n/server";

/** Shared intro for top-level pages: breadcrumb, eyebrow, h1, lead. */
export default async function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  const { theme, dict } = await getI18n();
  const trail = crumbs ?? [{ label: dict.nav.home, href: "/" }, { label: eyebrow }];
  const intro = (
    <>
      <nav aria-label={dict.nav.breadcrumb} className="mb-10">
        <ol className="meta flex flex-wrap items-center gap-2">
          {trail.map((c, i) => (
            <li key={c.label} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {c.href ? (
                <Link href={c.href} className="transition-colors hover:text-accent">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-fg-dim">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h1 className="page-title max-w-4xl">{title}</h1>
      {theme === "classic" && <ClassicRule align="start" className="mt-6 max-w-xs" />}
      {lead && <div className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-fg-dim md:text-xl">{lead}</div>}
      {children}
    </>
  );

  // Classic: a title page — the heading on the left, a small arched
  // vignette of the study on the right (large screens), lamplit walnut.
  if (theme === "classic") {
    return (
      <div className="classic-band mb-12 border-b border-deco/40 md:mb-16">
        <div className="shell grid items-end gap-12 pb-12 pt-10 md:pb-16 md:pt-14 lg:grid-cols-[1fr_13rem]">
          <header data-reveal>{intro}</header>
          <div className="classic-picture-frame classic-arch hidden lg:block" aria-hidden>
            <div className="classic-arch relative aspect-[3/4] overflow-hidden">
              <Image src={classicArt.study} alt="" fill priority sizes="13rem" className="object-cover object-[80%_50%]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const header = (
    <header className="shell relative pb-12 pt-10 md:pb-16 md:pt-14" data-reveal>
      {intro}
    </header>
  );

  if (theme !== "pixel") return header;

  // Pixel Art: a quiet band of the world behind the page title only —
  // never behind long text.
  return (
    <div className="relative isolate -mt-16 overflow-hidden pt-16">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <Image src={pixelPageHeader} alt="" fill priority sizes="100vw" className="object-cover object-[60%_18%]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--bg)/0.92)_0%,rgb(var(--bg)/0.7)_45%,rgb(var(--bg)/0.35)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(0deg,rgb(var(--bg))_0%,transparent_100%)]" />
      </div>
      {header}
    </div>
  );
}
