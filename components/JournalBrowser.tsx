"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PostCard from "@/components/PostCard";
import { useI18n } from "@/components/I18nProvider";
import type { PostMeta } from "@/lib/journal";
import { fill } from "@/lib/i18n/localized";

/** Client-side search + category filter over the post list. */
export default function JournalBrowser({ posts, categories }: { posts: PostMeta[]; categories: readonly string[] }) {
  const { dict, locale } = useI18n();
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("category");
  const [category, setCategory] = useState<string | null>(categories.includes(initial ?? "") ? initial : null);
  const [query, setQuery] = useState("");
  const labels = dict.journal.categories as Record<string, string>;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category && p.category !== category) return false;
      if (!q) return true;
      return [p.title, p.subtitle ?? "", p.excerpt, p.tags.join(" "), labels[p.category]].join(" ").toLowerCase().includes(q);
    });
  }, [posts, category, query, labels]);

  function pick(id: string | null) {
    setCategory(id);
    router.replace(id ? `/journal?category=${id}` : "/journal", { scroll: false });
  }

  const used = categories.filter((c) => posts.some((p) => p.category === c));

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label={dict.journal.filterLabel} className="flex flex-wrap gap-2">
          {[null, ...used].map((c) => (
            <button
              key={c ?? "all"}
              type="button"
              aria-pressed={category === c}
              onClick={() => pick(c)}
              className="rounded-theme border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-fg-dim transition-colors hover:border-accent hover:text-accent aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-accent-on"
            >
              {c ? labels[c] : dict.journal.all}
            </button>
          ))}
        </div>
        <div className="relative md:w-72">
          <label htmlFor="journal-search" className="sr-only">
            {dict.journal.searchLabel}
          </label>
          <input
            id="journal-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.journal.searchPlaceholder}
            className="w-full rounded-theme border border-line bg-surface px-3 py-2 font-body text-sm text-fg placeholder:text-fg-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-accent"
          />
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {fill(dict.journal.postsShown, { n: visible.length })}
      </p>

      {visible.length > 0 ? (
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {visible.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} dict={dict} locale={locale} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 font-body text-fg-dim">{dict.journal.noMatch}</p>
      )}
    </div>
  );
}
