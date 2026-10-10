import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";
import { showDrafts } from "@/lib/site";
import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from "@/lib/i18n/config";

// Markdown journal. Each post is content/journal/<slug>.md with YAML
// frontmatter (see content/journal/_template.md); an optional
// <slug>.vi.md is its Vietnamese version (same URL). Files starting with
// "_" are ignored. A post's language is `lang` in frontmatter, defaulting
// to "vi" for *.vi.md and "en" otherwise. Translations are only ever
// written by the author — never generated. This module is the only place
// that knows posts live on disk; swap it for a CMS client later and keep
// the same exports.
//
// Posts are authored by the site owner and rendered as trusted HTML. If
// untrusted authors are ever added (CMS, guest posts), sanitize the HTML.

const POSTS_DIR = path.join(process.cwd(), "content", "journal");
const WORDS_PER_MINUTE = 225;

/** Category ids; labels live in the dictionaries (journal.categories). */
export const CATEGORIES = ["data-ai", "building-in-public", "learning-notes", "personal"] as const;

export type CategoryId = (typeof CATEGORIES)[number];

export interface Heading {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface PostMeta {
  slug: string;
  /** Language this version is written in. */
  lang: Locale;
  /** Languages this post is (visibly) available in. */
  langs: Locale[];
  title: string;
  subtitle?: string;
  excerpt: string;
  date: string;
  updated?: string;
  category: CategoryId;
  tags: string[];
  cover?: string;
  coverAlt?: string;
  readingMinutes: number;
  draft: boolean;
  toc: boolean;
}

export interface Post extends PostMeta {
  html: string;
  headings: Heading[];
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function fail(file: string, message: string): never {
  throw new Error(`[journal] ${file}: ${message}`);
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function plainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^>.*$/gm, " ")
    .replace(/[#*_~>|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstParagraph(markdown: string): string {
  const para =
    markdown
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .find((block) => block && !/^(#|>|```|!\[|[-*] |\d+\. |<)/.test(block)) ?? "";
  const text = plainText(para);
  return text.length > 200 ? `${text.slice(0, 197).replace(/\s+\S*$/, "")}…` : text;
}

function render(markdown: string): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const used = new Map<string, number>();
  const marked = new Marked({ gfm: true });

  marked.use({
    renderer: {
      heading(token: Tokens.Heading) {
        const inner = this.parser.parseInline(token.tokens);
        const base = slugify(token.text) || "section";
        const count = used.get(base) ?? 0;
        used.set(base, count + 1);
        const id = count ? `${base}-${count}` : base;
        if (token.depth === 2 || token.depth === 3) {
          headings.push({ id, text: plainText(token.text), depth: token.depth });
        }
        // h1 is reserved for the article title.
        const level = Math.max(2, token.depth);
        return `<h${level} id="${id}">${inner}<a class="heading-anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a></h${level}>\n`;
      },
      link(token: Tokens.Link) {
        const inner = this.parser.parseInline(token.tokens);
        const external = /^https?:\/\//.test(token.href);
        const href = escapeAttr(token.href);
        const title = token.title ? ` title="${escapeAttr(token.title)}"` : "";
        return external
          ? `<a href="${href}"${title} target="_blank" rel="noreferrer">${inner}</a>`
          : `<a href="${href}"${title}>${inner}</a>`;
      },
      image(token: Tokens.Image) {
        const title = token.title ? ` title="${escapeAttr(token.title)}"` : "";
        return `<img src="${escapeAttr(token.href)}" alt="${escapeAttr(token.text)}"${title} loading="lazy" decoding="async" />`;
      },
    },
  });

  const html = marked.parse(markdown, { async: false }) as string;
  return { html, headings };
}

function parseFile(file: string): Post {
  const isVi = file.endsWith(".vi.md");
  const slug = file.replace(/(\.vi)?\.md$/, "");
  const raw = readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  if (typeof data.title !== "string" || !data.title.trim()) fail(file, "missing `title`");
  // YAML parses unquoted dates into Date objects — normalise to ISO.
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
  if (!ISO_DATE.test(date)) fail(file, "`date` must be YYYY-MM-DD");
  const updated =
    data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : data.updated ? String(data.updated) : undefined;
  if (updated && !ISO_DATE.test(updated)) fail(file, "`updated` must be YYYY-MM-DD");

  const category = CATEGORIES.find((c) => c === data.category);
  if (!category) fail(file, `\`category\` must be one of: ${CATEGORIES.join(", ")}`);
  const lang = data.lang ?? (isVi ? "vi" : DEFAULT_LOCALE);
  if (!isLocale(lang)) fail(file, `\`lang\` must be one of: ${LOCALES.join(", ")}`);

  const tags: string[] = Array.isArray(data.tags) ? data.tags.map(String) : [];
  const { html, headings } = render(content);
  const words = plainText(content).split(" ").filter(Boolean).length;

  return {
    slug,
    lang,
    langs: [lang],
    title: data.title,
    subtitle: typeof data.subtitle === "string" ? data.subtitle : undefined,
    excerpt: typeof data.excerpt === "string" ? data.excerpt : firstParagraph(content),
    date,
    updated,
    category,
    tags,
    cover: typeof data.cover === "string" ? data.cover : undefined,
    coverAlt: typeof data.coverAlt === "string" ? data.coverAlt : undefined,
    readingMinutes: Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
    draft: data.draft === true,
    toc: data.toc !== false && headings.filter((h) => h.depth === 2).length >= 3,
    html,
    headings,
  };
}

let cache: Post[] | null = null;

function loadAll(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  let files: string[] = [];
  try {
    files = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
  } catch {
    files = [];
  }
  cache = files.map(parseFile);
  return cache;
}

/**
 * One entry per post, newest first, in the requested language when that
 * version exists — otherwise the version that does (fallback is never a
 * generated translation). Drafts are dev-only.
 */
export function getPosts(locale: Locale = DEFAULT_LOCALE): Post[] {
  const visible = loadAll().filter((p) => showDrafts || !p.draft);
  const bySlug = new Map<string, Post[]>();
  for (const p of visible) bySlug.set(p.slug, [...(bySlug.get(p.slug) ?? []), p]);

  return [...bySlug.values()]
    .map((versions) => {
      const chosen =
        versions.find((v) => v.lang === locale) ??
        versions.find((v) => v.lang === DEFAULT_LOCALE) ??
        versions[0];
      return { ...chosen, langs: versions.map((v) => v.lang) };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

function toMeta(post: Post): PostMeta {
  const meta: PostMeta & Partial<Pick<Post, "html" | "headings">> = { ...post };
  delete meta.html;
  delete meta.headings;
  return meta;
}

export function getPostMetas(locale: Locale = DEFAULT_LOCALE): PostMeta[] {
  return getPosts(locale).map(toMeta);
}

export function getPost(slug: string, locale: Locale = DEFAULT_LOCALE): Post | undefined {
  return getPosts(locale).find((p) => p.slug === slug);
}

/** Related published posts (same category / shared tags). */
export function getRelatedPosts(post: Post, locale: Locale = DEFAULT_LOCALE, limit = 3): PostMeta[] {
  return getPostMetas(locale)
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score: (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map((r) => r.post);
}
