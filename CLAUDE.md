# Ah Tuấn (Victor) — Personal Portfolio, Lab & Journal

Bilingual (EN/VI) personal site for **Phạm Anh Tuấn**, publicly **"Ah Tuấn
(Victor)"**, an Information Technology student (University of Science, VNU-HCM)
heading toward Data Analyst internships who also builds interactive web
apps and creative projects. Four switchable artistic worlds express
different sides of him; content, routes and interactions are shared.

## History (what's retired — don't bring back)

- **v1 (2026-10-09)**: replaced the "GitHub README rendered as a website"
  layout (README-mirroring sections, dividers, banner/typing hero, snake,
  shields.io badges). Recoverable from git history (`86d32ad` and earlier).
- **v2**: four presets × light/dark and five pages — superseded.
- **v3 (current)**: four worlds (the default "Stoicism" world — marble bust, black, condensed caps — was redesigned and renamed **Minimalist** on 2026-10-10; cookie value `stoicism` now just falls back to the default) with **no light/dark mode**, three main
  pages, EN/VI. Retired from v2: `data-mode`/appearance toggles, the
  Discipline / Pixel Journey / Artist's Desk / Terminal presets, the
  `/projects` and `/journey` index pages (now redirects to `/#projects`,
  `/#journey`), localStorage theme + pre-paint script, homepage journal
  previews (never show journal content on Home).

Still in force:
- **English is the default language**; Vietnamese is a full second
  language. The name "Ah Tuấn (Victor)" is identical in both. Every font
  that can render the name keeps the `vietnamese` subset.
- **Favicon** is the Spidey mascot ([app/icon.svg](app/icon.svg), sprite
  `<rect>`s inlined, `viewBox="2.5 2.5 27 13"`).
- **Hobbies are exactly** badminton, reading, gym, movies (no journaling).
- **No "education" section in projects** (education lives in About).
- **Never fabricate** (see Content).

## Routes

| Route | Content |
|---|---|
| `/` | Hero (only `<h1>`) → short intro (links `/about`) → Selected projects `#projects` → Journey & milestones `#journey` → Contact `#contact` + GitHub activity. Optional sections render only with real content. **No journal content, ever.** |
| `/projects/[slug]` | Case studies, reached from project cards (nav keeps **Home** active). Breadcrumb Home / Projects (`/#projects`) / Title. |
| `/journal`, `/journal/[slug]`, `/journal/rss.xml` | Independent writing section. |
| `/about` | The person: bio, direction, creative side, education, experience, now + goals, tools (prose, not badges), values, off the clock, contact, image credits (`#credits`). |
| `/projects`, `/journey` | Redirects ([next.config.mjs](next.config.mjs)). |

Nav ([lib/nav.ts](lib/nav.ts)): **Home / Journal / About** + language
toggle + theme menu in the header. Footer has contact links on every page.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 3.
  Deps beyond Next/React: `marked` + `gray-matter` (journal). No i18n or
  UI library. OG images via built-in `next/og`.
- **Pages render per request** (they read the `theme`/`locale` cookies).
  That's intentional — the server renders the right world and language
  with no flash and no client-side duplication.
- ESLint 9 flat config importing `eslint-config-next/core-web-vitals`
  directly (not `FlatCompat`). `npm run lint` = `eslint .`.
- No test suite. Verify with `npm run lint` + `npm run build` + browser
  checks (axe, keyboard flows, screenshots of all 4 themes × 2 languages)
  — scripts aren't committed; recreate ad hoc.

```bash
npm install
npm run dev      # shows drafts + dev-only placeholders
npm run build    # production: drafts/placeholders excluded
npm run start
npm run lint
```

## Preferences: theme + language

Both are cookies set by client switchers and read on the server by
`getI18n()` ([lib/i18n/server.ts](lib/i18n/server.ts), request-cached):
`theme` (default **`minimalist`** — [lib/theme.ts](lib/theme.ts)) and `locale`
(default **`en`** — [lib/i18n/config.ts](lib/i18n/config.ts)). The layout
renders `<html lang data-theme>` from them. Switching sets the cookie and
calls `router.refresh()` (soft — same URL, query, history); the scroll
position is held on the nearest `[id]` element while the new layout
settles ([lib/scrollAnchor.ts](lib/scrollAnchor.ts)).
- [components/ThemeSwitcher.tsx](components/ThemeSwitcher.tsx): a minimal
  dropdown (menu button + `menuitemradio` options; arrows/Home/End/Escape,
  outside click closes) with exactly four labels — Spidey Universe, Pixel
  Art, Classic, Minimalist. **Corner-reveal transition**: the menu closes,
  `startViewTransition()` freezes the current page, inside the update
  `data-theme` flips and `router.refresh()` re-renders the route (awaited,
  max 1.5 s), then the real destination page expands as a `clip-path`
  circle from the theme's configured corner (radius = distance to the
  farthest viewport corner), led by a soft ring in the destination color
  (a transparent fixed `theme-veil` element whose snapshot is masked with a
  registered `--vt-r` property). Per-theme `transition: { color, origin }`
  lives in [lib/theme.ts](lib/theme.ts) — don't put colors in animation
  code. Reduced motion → instant switch; no View Transitions → color-veil
  fallback; a new choice skips the running transition (generation guard);
  same theme → menu just closes. CSS hooks: `html[data-theme-switching]`
  rules at the end of globals.css.
- [components/LanguageSwitcher.tsx](components/LanguageSwitcher.tsx): EN / VI.

## i18n

- Interface strings: [lib/i18n/dictionaries/en.ts](lib/i18n/dictionaries/en.ts)
  defines the shape; [vi.ts](lib/i18n/dictionaries/vi.ts) is typed
  `Dictionary`, so a missing key fails the typecheck. `{name}` placeholders
  via `fill()`. **Don't put dev-only text in dictionaries** — the dictionary
  is serialized to the client, so it would ship in production HTML.
- Content: `L<T> = { en: T; vi?: T }` ([lib/i18n/localized.ts](lib/i18n/localized.ts));
  `t()` from `getI18n()` picks the locale, falling back to English.
- Server components call `await getI18n()`; client components use
  `useI18n()` ([components/I18nProvider.tsx](components/I18nProvider.tsx)).
  Never scatter `locale === "en" ? … : …` ternaries.
- Dates via `date()/month()/period()` (`en-GB` / `vi-VN`, UTC).
- Metadata (title/description/og:locale) is localized per request. Social
  preview **images** and the sitemap are language-neutral/English (crawlers
  send no cookie; one URL per page).
- Vietnamese copy was drafted by Claude and is listed for review in
  [CONTENT-TODO.md](CONTENT-TODO.md).

## The four worlds

Tokens per `[data-theme]` in [app/globals.css](app/globals.css) (one block
each; the Minimalist block doubles as the `:where(:root)` fallback — keep that
`:where()` or it will override every other theme). Colors are `r g b`
triplets: `bg surface surface-2 line fg fg-dim fg-muted accent accent-2
on-accent deco deco-2` (`deco*` decorative only, never text). All four pass
WCAG AA text contrast; re-check if you change a value. Other tokens: fonts
(`--font-display/-body/-meta/-accent/-article/-prose`), `--display-*`,
`--meta-adjust`, `--radius`, `--card-*`, `--btn-*`, `--texture-*`,
`--page-background`, `--media-filter` (applied via `.theme-media` to real
photos/screenshots), `--reveal-*`, `--mascot-*`.

| Theme | Palette / type | Art & presentation |
|---|---|---|
| **Spidey Universe** | black, cream, red `#FF1F35`; Anton / Inter / JetBrains Mono | web corner, halftone, mascot; projects as spec sheets; silk-thread timeline |
| **Pixel Art** | dusk forest: near-black teal, deep teal, moss, stone, ivory text, amber only where light would be; Spectral (headings + reading) / VT323 (small labels only) | owner-supplied pixel artwork as the Home hero (full-bleed, overlays for contrast; mobile crop keeps the traveller), page-header bands on Journal/About (never behind long text), riveted dark panels, pixel icons + medallions ([PixelIcons.tsx](components/PixelIcons.tsx)), 3-up project "artifacts", milestones as waypoints on a path. **No Spidey mascot**, no game-UI clutter (no XP/health bars). |
| **Classic** | dark academia × old money × literary editorial — deliberately *not* Pixel Art's full-bleed scenic layout. The ground is dark: charcoal `#171511` → walnut `#241B15`, leather `#3A2A20`; aged-paper sheets (`.classic-paper`: ivory `#DCCBA9`, parchment `#BBA582`, grain + foxed edges) are laid on it selectively — the Home dossier, the Journey band, the About body, journal posts. Muted brass `#947449` = rules/ornaments/markers only (4.2:1 — never text; a lighter brass is the text accent on dark); faded burgundy `#542C2A` = the accent on paper, sparingly. `.classic-dark` re-scopes to dark inside a sheet. Cormorant Garamond (headings) / EB Garamond (body, `font-size-adjust`); labels, buttons and meta in small caps (not uppercase); italic for poetic lines (alias, taglines, quote, captions, dates); Pinyon Script only for the About signature | walnut masthead with a double brass rule, nav set right in serif with lozenge dividers; nav set centred from lg up; hero = a journal's opening page: masthead line ("A personal archive · MMXXVI"), name, then the owner-supplied candlelit study ([lib/themeArt.ts](lib/themeArt.ts) `classicArt`) framed under an arch (`.classic-arch` + `.classic-picture-frame`, no overlay) with a "Plate I" caption; chapter numerals I–IV on section headings; dossier sheet (etched portrait, drop cap, "Particulars" register); projects as alternating archive rows (screenshot on a parchment mount `.classic-mount`, numbered catalogue note); chronicle on a paper band (narrow italic date column, brass line, engraved ring markers); correspondence contact; footer colophon over the study's window (Coelho epigraph) and a Tartt epigraph at the head of the About sheet. Page headers: title + small arched vignette. Ornaments: `ClassicRule`, `ClassicCorners`, `CompassRose` (ThemeArt). Images "develop" on reveal. No torn paper, seals or floral fleurons. |
| **Minimalist** (default) | editorial minimalism, after dark (changed from ivory-on-light on 2026-10-10): deep ink ground `#191A19`, warm ivory text `#F2F0E9`, stone `#737570` (`deco`; `fg-muted` is lifted for AA), **slate as the only accent** (lifted to `#8FA5AE` on ink: active nav, links, focus, selected language) — primary buttons are ivory, no red; light Noto Serif Display (mixed case, name at weight 400) / Inter | flat ink with a barely-there grain; hairlines; the portrait is a borderless 4:5 print with a faint ivory hairline, desaturated ~32% **only** via `.theme-portrait` (`--media-filter` is `none`, so project screenshots keep their colour); one rhythm for home sections (`.sec`); Roman numerals for order; tags are plain words, milestone status is plain text (only an award is filled; ongoing is dash-underlined) with no legend. The Stoic note is restraint, nothing more — no busts, marble or terminal/neon tropes; its one epigraph is quiet type in the footer. |

**Theme artwork (Pixel Art, Classic) is configured in one place: [lib/themeArt.ts](lib/themeArt.ts)**
(static imports from `public/assets/themes/pixel-art/`, so a missing file
fails the build — never reference art that doesn't exist). Supplied
by the owner and converted to WebP: `forest-home.webp` (Home hero, from
`assets/Pixel-background.png`) and `lakeside-footer.webp` (Contact, from
`assets/Pixel-footer-background.png`); the `projects`/`journey`/`pageHeader`
slots are `null` with documented fallbacks. Don't fabricate project screenshots
from scenery.

Where markup differs, components branch on `theme` from `getI18n()` on the
server: `Hero`, `AboutSummary`, `SectionHeading` (`pixelIcon`), `Logo`/`SectionOrnament` (ThemeArt), `Contact`,
`ProjectCard`, `ProjectCover`, `JourneyTimeline`, `PageHeader`, About's
portrait frame. **Facts never change between themes** — only presentation.
Reveal/motion tokens per theme; everything behind
`prefers-reduced-motion: no-preference`.

Portraits: each world shows its own photo of the owner
([components/ThemePortrait.tsx](components/ThemePortrait.tsx), files in
`public/images/portraits/<theme>.jpg`; crops via object-position; the Classic portrait is an etching — [ClassicPortrait.tsx](components/ClassicPortrait.tsx): sepia photo in a concave-cornered cartouche with brass keylines). Alt text is per theme in the dictionaries
(`hero.portraitAlt`). Pixel Art keeps the earlier portrait until a new one is
supplied. Images get each world's `--media-filter` (Minimalist: a slight
desaturation only).

## Content — and the "never invent" rule

Typed files in `content/` (prose as `{ en, vi }`):
- [profile.ts](content/profile.ts) — identity, availability (`open`),
  `cvUrl` (null hides CV buttons), `location` (null), socials.
- [projects.ts](content/projects.ts) — `Project` (`draft`, `showOnHome`,
  `featured`, problem, contributions, architecture, …). Template for the
  next (Data Analyst) project at the bottom. Visibility: [lib/projects.ts](lib/projects.ts).
- [milestones.ts](content/milestones.ts) — `outcome.kind`: `award` |
  `participated` | `ongoing` | `completed` | `shipped` (participation is
  never shown as winning). `placeholder` = dev-only.
- [about.ts](content/about.ts) — bio, summary, interests, creative side,
  education, values, now (+ `nowUpdated`), goals, toolkit, hobbies.
- [credits.ts](content/credits.ts) — third-party imagery with source +
  license, shown at `/about#credits` (section and footer link hide while
  it's empty — currently it is; owner-supplied art isn't listed).
- `content/journal/*.md` — posts.

**Never fabricate** awards, rankings, metrics, results, screenshots, URLs,
dates, opinions or biography. Sources: the user, their GitHub README,
[design-reference/Gioi_thieu_ve_Toi.md](design-reference/Gioi_thieu_ve_Toi.md),
the project repos' READMEs. Missing optional fields render a **dev-only**
`<Placeholder>` or nothing; production never shows drafts or placeholders
(`showDrafts` in [lib/site.ts](lib/site.ts)).

Project facts: TourXport's repo is under a teammate's account
(`quocnam612/TourXport`) — don't "fix" it. Victor Tracker's demo needs
sign-in; its test counts come from its README. Web-Shooter's cover is a
screenshot of the demo's landing page (`landing.jpg`), chosen by the owner.

## Epigraphs

[content/quotes.ts](content/quotes.ts), rendered by
[ThemeQuote](components/ThemeQuote.tsx) at the head of the footer (Spidey
Universe: "With great power comes great responsibility." — Spider-Man;
Minimalist: "Some things are in our control and others not." — Epictetus),
by the Classic footer colophon ("…all the universe conspires in helping you
to achieve it." — Paulo Coelho) and at the top of the Classic About sheet
("Beauty is terror…" — Donna Tartt). Pixel Art: "Not all those who wander are lost." — J.R.R. Tolkien (a traveller's line for the forest world). Quoted verbatim as
the owner supplied them, never translated (marked `lang="en"`), attribution
exactly as given — don't add speakers or sources.

## Journal

- `content/journal/<slug>.md`; optional `<slug>.vi.md` = Vietnamese version
  at the same URL (`lang` frontmatter, default from filename). Template:
  [content/journal/_template.md](content/journal/_template.md).
- [lib/journal.ts](lib/journal.ts): per-locale version selection with
  fallback to the existing version (the page then says which language it's
  in and marks it `lang`). **Never machine-translate posts.** Drafts are
  excluded from production pages, RSS, sitemap and related posts.
- The only post (`rebuilding-my-portfolio.md`) is a **Claude-written
  draft** — never publish it for the user.

## Spidey mascot

Sprites copied from the sibling `github-readme-widget` project into
[public/assets/](public/assets/) — don't edit or regenerate them; follow
[MASCOT.md](public/assets/MASCOT.md). `.mascot` is shown only where
`--mascot-display` allows (Spidey Universe); other worlds have their own
marks ([ThemeArt.tsx](components/ThemeArt.tsx) `Logo`). The root-level
`assets/` folder is an unused duplicate of `public/assets/`.

## GitHub data

[lib/github.ts](lib/github.ts) reads the contribution calendar. With
`GITHUB_TOKEN` (classic PAT, `read:user`) it uses the GraphQL API; **without
one it falls back to the public calendar fragment**
(`github.com/users/<name>/contributions`, parsed strictly, cached 1 h), so
the widget works locally and on Vercel with no secret. That markup is
unofficial — if it ever changes the parse throws and the widget shows its
fallback. `GITHUB_USERNAME` optional. The Contact widget
([components/ActivityWidget.tsx](components/ActivityWidget.tsx)) and the
embeddable `/api/pet`, `/api/activity` SVGs **never show raw errors** —
"Activity currently unavailable"; details go to the server log.

## SEO

`metadataBase` from [lib/site.ts](lib/site.ts). Canonicals per page; OG
images ([lib/og.tsx](lib/og.tsx), Minimalist typographic card; fetches
Noto Serif Display/Inter glyph subsets so "Tuấn" renders);
[sitemap](app/sitemap.ts), [robots](app/robots.ts), RSS.

## Conventions

- `MotionObserver` reveals `[data-reveal]` elements and also watches DOM
  mutations — theme/language switches re-render components on the server,
  and new or class-rewritten elements must not stay hidden.
- Server components by default. Client: `Header`, `ThemeSwitcher`,
  `LanguageSwitcher`, `I18nProvider`, `MotionObserver`, `JournalBrowser`,
  `CopyButton`.
- Accessibility: one `<h1>` per page, no skipped heading levels; decorative
  images `alt=""`; visible focus; menus and
  dialogs close on Escape and return focus; `lang` on any text in a language
  other than the page's.
- Only backend: the GitHub-data routes. No auth, CMS, newsletter or admin.
- Repo `github.com/ahtuan171/Porfolio` (`main`); CI runs eslint + build;
  Vercel auto-deploys `main`.
