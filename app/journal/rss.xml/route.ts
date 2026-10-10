import { displayName, profile } from "@/content/profile";
import { getPosts } from "@/lib/journal";
import en from "@/lib/i18n/dictionaries/en";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

function escape(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET() {
  // Drafts never go into the feed, even in development. Each post appears
  // once, in its default-language version.
  const posts = getPosts().filter((p) => !p.draft);
  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/journal/${p.slug}`);
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <category>${escape(en.journal.categories[p.category])}</category>
      <description>${escape(p.subtitle ?? p.excerpt)}</description>
      <dc:language>${p.lang}</dc:language>
      <content:encoded><![CDATA[${p.html.replace(/]]>/g, "]]]]><![CDATA[>")}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(`${displayName} — Journal`)}</title>
    <link>${absoluteUrl("/journal")}</link>
    <atom:link href="${absoluteUrl("/journal/rss.xml")}" rel="self" type="application/rss+xml" />
    <description>${escape(profile.positioning.en)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
