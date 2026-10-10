import type { Metadata } from "next";
import { Suspense } from "react";
import JournalBrowser from "@/components/JournalBrowser";
import PageHeader from "@/components/PageHeader";
import PostCard from "@/components/PostCard";
import { CATEGORIES, getPostMetas } from "@/lib/journal";
import { ogLocale } from "@/lib/i18n/config";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { dict, locale } = await getI18n();
  return {
    title: dict.meta.journalTitle,
    description: dict.meta.journalDescription,
    alternates: { canonical: "/journal", types: { "application/rss+xml": "/journal/rss.xml" } },
    openGraph: { title: dict.meta.journalTitle, description: dict.meta.journalDescription, url: "/journal", locale: ogLocale[locale] },
  };
}

export default async function JournalIndex() {
  const { dict, locale } = await getI18n();
  const posts = getPostMetas(locale);

  return (
    <>
      <PageHeader eyebrow={dict.journal.eyebrow} title={dict.journal.title} lead={dict.meta.journalDescription}>
        <a href="/journal/rss.xml" className="text-link mt-6 inline-block">
          {dict.journal.rss} <span aria-hidden>↗</span>
        </a>
      </PageHeader>
      <div className="shell pb-24">
        {posts.length === 0 ? (
          <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
            <p className="article-title text-2xl text-fg">{dict.journal.emptyTitle}</p>
            <p className="font-body text-sm text-fg-muted">{dict.journal.emptyBody}</p>
          </div>
        ) : (
          // useSearchParams (category filter) needs a Suspense boundary;
          // the fallback is the same list, unfiltered.
          <Suspense
            fallback={
              <ul className="mt-[4.5rem] grid gap-6 md:grid-cols-2">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <PostCard post={post} dict={dict} locale={locale} />
                  </li>
                ))}
              </ul>
            }
          >
            <JournalBrowser posts={posts} categories={CATEGORIES} />
          </Suspense>
        )}
      </div>
    </>
  );
}
