import Link from "next/link";
import type { PostMeta } from "@/lib/journal";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { formatDate } from "@/lib/format";
import { fill } from "@/lib/i18n/localized";
import type { Locale } from "@/lib/i18n/config";

/** Journal card. Pure (no server APIs) so client components can use it too. */
export default function PostCard({
  post,
  dict,
  locale,
  compact = false,
  headingLevel = 2,
}: {
  post: PostMeta;
  dict: Dictionary;
  locale: Locale;
  compact?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Title = headingLevel === 2 ? "h2" : "h3";
  const otherLang = post.lang !== locale;
  return (
    <article lang={post.lang} className="card card-interactive group relative flex h-full flex-col p-6">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
        <span className="text-accent">{dict.journal.categories[post.category]}</span>
        <span aria-hidden>·</span>
        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
        <span aria-hidden>·</span>
        <span>{fill(dict.journal.minRead, { n: post.readingMinutes })}</span>
        {otherLang && <span className="rounded-theme border border-line px-1.5 text-fg-dim">{post.lang}</span>}
        {post.draft && <span className="placeholder-note ml-auto px-2 py-0 normal-case tracking-normal">draft · dev only</span>}
      </p>
      <Title className={`article-title mt-4 leading-tight text-fg ${compact ? "text-2xl" : "text-2xl md:text-3xl"}`}>
        {/* Stretched link: the whole card is clickable, one tab stop. */}
        <Link
          href={`/journal/${post.slug}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-focus-within:text-accent"
        >
          {post.title}
        </Link>
      </Title>
      {post.subtitle && !compact && <p className="mt-2 font-serif text-lg italic text-fg-dim">{post.subtitle}</p>}
      <p className="mt-3 line-clamp-3 font-body text-sm leading-relaxed text-fg-dim">{post.excerpt}</p>
      {post.tags.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label={dict.journal.tags}>
          {post.tags.map((t) => (
            <li key={t} className="tag">
              #{t}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
