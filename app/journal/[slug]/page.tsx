import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import ShareLinks from "@/components/ShareLinks";
import TableOfContents from "@/components/TableOfContents";
import { displayName } from "@/content/profile";
import { getPost, getPosts, getRelatedPosts } from "@/lib/journal";
import { ogLocale } from "@/lib/i18n/config";
import { fill } from "@/lib/i18n/localized";
import { getI18n } from "@/lib/i18n/server";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getI18n();
  const post = getPost(slug, locale);
  if (!post) return {};
  const description = post.subtitle ?? post.excerpt;
  return {
    title: post.title,
    description,
    alternates: { canonical: `/journal/${post.slug}` },
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `/journal/${post.slug}`,
      locale: ogLocale[post.lang],
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [displayName],
      tags: post.tags,
      ...(post.cover ? { images: [{ url: post.cover, alt: post.coverAlt ?? "" }] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { theme, dict, locale, date } = await getI18n();
  const post = getPost(slug, locale);
  if (!post) notFound();

  const related = getRelatedPosts(post, locale);
  const url = absoluteUrl(`/journal/${post.slug}`);
  const languageName = (l: "en" | "vi") => dict.journal.languageNames[l];
  const others = post.langs.filter((l) => l !== post.lang);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.subtitle ?? post.excerpt,
    inLanguage: post.lang,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: displayName, url: absoluteUrl("/") },
    url,
    keywords: post.tags.join(", "),
  };

  return (
    <article className="pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <header className="shell max-w-3xl pt-10 text-center md:pt-14" data-reveal>
        <nav aria-label={dict.nav.breadcrumb} className="mb-10">
          <ol className="meta flex flex-wrap items-center justify-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                {dict.nav.home}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/journal" className="transition-colors hover:text-accent">
                {dict.nav.journal}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="max-w-[16rem] truncate text-fg-dim" lang={post.lang}>
              {post.title}
            </li>
          </ol>
        </nav>
        <Link href={`/journal?category=${post.category}`} className="eyebrow inline-block transition-opacity hover:opacity-75">
          {dict.journal.categories[post.category]}
        </Link>
        {post.draft && <p className="placeholder-note mx-auto mt-4 w-fit">{dict.journal.draftNotice}</p>}
        {post.lang !== locale && (
          <p className="mx-auto mt-4 w-fit rounded-theme border border-line px-3 py-1.5 font-body text-sm text-fg-dim">
            {fill(dict.journal.onlyIn, { language: languageName(post.lang) })}
          </p>
        )}
        <div lang={post.lang}>
          <h1 className="article-title mt-5 text-balance text-4xl leading-[1.1] text-fg md:text-6xl">{post.title}</h1>
          {post.subtitle && (
            <p className="mt-5 text-balance font-serif text-xl italic leading-relaxed text-fg-dim md:text-2xl">{post.subtitle}</p>
          )}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-y border-line/70 py-4 font-mono text-xs text-fg-muted">
          <span className="text-fg">{displayName}</span>
          <span aria-hidden>·</span>
          <time dateTime={post.date}>{date(post.date)}</time>
          {post.updated && (
            <>
              <span aria-hidden>·</span>
              <span>{fill(dict.journal.updated, { date: date(post.updated) })}</span>
            </>
          )}
          <span aria-hidden>·</span>
          <span>{fill(dict.journal.minRead, { n: post.readingMinutes })}</span>
          {others.length > 0 && post.lang === locale && (
            <>
              <span aria-hidden>·</span>
              <span>{fill(dict.journal.alsoIn, { language: others.map(languageName).join(", ") })}</span>
            </>
          )}
        </div>
      </header>

      {post.cover && (
        <div className="shell mt-10 max-w-4xl">
          {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary author-supplied path/size */}
          <img src={post.cover} alt={post.coverAlt ?? ""} className="card theme-media w-full" />
        </div>
      )}

      <div className="shell mt-12 grid gap-10 xl:grid-cols-[1fr_minmax(0,42rem)_1fr]">
        <div className="hidden xl:block" />
        {/* Classic: the post is set on a manuscript page. */}
        <div className={`min-w-0 ${theme === "classic" ? "classic-paper px-6 py-10 sm:px-10 md:py-14" : ""}`}>
          {post.toc && (
            <details className="card mb-10 p-5 xl:hidden">
              <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">{dict.journal.tocToggle}</summary>
              <div className="mt-4">
                <TableOfContents headings={post.headings} title={dict.journal.toc} id="toc-mobile" />
              </div>
            </details>
          )}
          <div lang={post.lang} className="prose-journal mx-auto max-w-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

          <footer className="mx-auto mt-14 max-w-prose space-y-6 border-t border-line/70 pt-8">
            {post.tags.length > 0 && (
              <ul className="flex flex-wrap gap-1.5" aria-label={dict.journal.tags}>
                {post.tags.map((t) => (
                  <li key={t} className="tag">
                    #{t}
                  </li>
                ))}
              </ul>
            )}
            <ShareLinks url={url} title={post.title} dict={dict} />
          </footer>
        </div>
        {post.toc && (
          <div className="hidden xl:block">
            <div className="sticky top-24">
              <TableOfContents headings={post.headings} title={dict.journal.toc} />
            </div>
          </div>
        )}
      </div>

      <div className="shell mt-20">
        {related.length > 0 && (
          <section aria-labelledby="related-title" className="mb-12">
            <h2 id="related-title" className="eyebrow mb-6">
              {dict.journal.keepReading}
            </h2>
            <ul className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} dict={dict} locale={locale} compact headingLevel={3} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <Link href="/journal" className="text-link">
          <span aria-hidden>←</span> {dict.journal.allEntries}
        </Link>
      </div>
    </article>
  );
}
