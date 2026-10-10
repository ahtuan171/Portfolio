import { epigraphs } from "@/content/quotes";
import { getI18n } from "@/lib/i18n/server";

/**
 * The world's epigraph, set at the head of the footer (Spidey Universe,
 * Pixel Art and Minimalist; Classic has its own placements).
 * Quotes stay in English whatever the page language.
 */
export default async function ThemeQuote() {
  const { theme } = await getI18n();

  if (theme === "spidey") {
    const q = epigraphs.spidey;
    return (
      <figure className="shell py-14 md:py-20">
        <blockquote lang="en" className="max-w-4xl border-l-4 border-accent pl-6 md:pl-8">
          <p className="font-display-theme text-3xl leading-[1.05] text-fg md:text-6xl">&ldquo;{q.text}&rdquo;</p>
        </blockquote>
        <figcaption className="meta mt-5 pl-6 text-accent md:pl-8">— {q.author}</figcaption>
      </figure>
    );
  }

  if (theme === "pixel") {
    const q = epigraphs.pixel;
    return (
      <figure className="shell py-14 text-center md:py-20">
        <blockquote lang="en">
          <p className="font-display-theme text-3xl italic leading-snug text-fg md:text-5xl">&ldquo;{q.text}&rdquo;</p>
        </blockquote>
        <figcaption className="meta mt-5 text-accent">— {q.author}</figcaption>
      </figure>
    );
  }

  if (theme === "minimalist") {
    const q = epigraphs.minimalist;
    return (
      <figure className="shell py-16 md:py-24">
        <div className="border-t border-line pt-10 md:grid md:grid-cols-12 md:gap-10">
          <blockquote lang="en" className="md:col-span-9">
            <p className="font-display-theme text-3xl leading-[1.15] text-fg md:text-5xl">&ldquo;{q.text}&rdquo;</p>
          </blockquote>
          <figcaption className="meta mt-6 md:col-span-3 md:mt-3 md:text-right">— {q.author}</figcaption>
        </div>
      </figure>
    );
  }

  return null;
}
