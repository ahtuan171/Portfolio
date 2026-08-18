# Victor — Personal Portfolio Site

Single-page personal portfolio for **Phạm Anh Tuấn (Victor)**, a Computer
Science student. "Ngầu, bí ẩn, manly": poster-style condensed type, grainy
film texture, moody portrait. Think a mysterious dossier/case-file mood,
not a colorful tech-startup landing page.

**Palette pivot (2026-08-18)**: the site was originally pure grayscale (no
color accents at all — see git history before this date for that version).
It now runs the **Spidey palette** — red `#FF1F35` / dark red `#A81222` /
near-black `#0B0D10` / grey `#2A2D34` / cream `#F5F2E8` — ported from the
sibling `github-readme-widget` project (a GitHub commit-streak SVG widget
with a pixel-art spider mascot, documented in its
[public/assets/MASCOT.md](public/assets/MASCOT.md)). The `chrome` token now
means "red accent" (was pure white), `bone` now means "cream" (was
off-white). Don't revert to white/grayscale-only without the user asking
again.

**Layout pivot (2026-08-18, same day)**: the user asked to match the
sibling `github-readme-widget` project's actual GitHub profile README
**layout and structure exactly**, not just its colors. The page section
order mirrors that README's `##` headings one-to-one (see Structure
below), separated by a repeated `divider.svg` strip the same way the
README repeats `---` between sections, opens with the README's own
`banner.svg` + an external typing-effect image, and closes with its
`footer.svg`. The original "NILS" template reference
([design-reference/nils-template-reference.png](design-reference/nils-template-reference.png))
no longer describes the current layout — kept only as a historical record
of where the site started.

**Language & heading pivot (2026-08-18, later same day)**: after seeing
the page rendered, the user asked for five more changes, all still in
effect — don't revert any without being asked again:
1. **All copy is now English**, not Vietnamese. This reverses the
   Vietnamese-body-copy convention from the two pivots above — that
   convention is dead, don't resurrect it. The only Vietnamese left on the
   page is the proper noun "Phạm Anh Tuấn" (a person's name — names don't
   get translated). Prose was rewritten using the literal wording from the
   user's real GitHub README where a section has a README equivalent (see
   Content below); sections with no README equivalent (Cta's headline and
   goals, Footer's small labels) got original English copy.
2. **The old big white Anton `.section-heading` + small red `.eyebrow`
   pair was collapsed into one element.** Every top-level section used to
   render both — e.g. a small `.eyebrow` reading "about" *and* a huge
   white "Discipline" heading right below it — which read as duplicated,
   inconsistent styling. `.section-heading` (in
   [app/globals.css](app/globals.css)) was **redefined in place**: it's
   now the red/mono/bold style previously used for `.eyebrow`, just bigger
   (`text-3xl md:text-5xl`), and is used directly as the section's only
   heading (`<h2 className="section-heading">about</h2>`, no separate
   `.eyebrow` line above it, no separate Anton heading below it). The old
   Anton heading text (`Discipline`, `Kỹ Năng.`, `Học Vấn.`, `Mạng Nhện.`,
   `Ngoài Giờ Học.`, `Dự Án.`, `Chuỗi Cam Kết.`) is **gone** — don't bring
   any of it back. `.eyebrow` the class still exists and is still used,
   just for genuinely small sub-labels that aren't full section headings
   (the "working on"/"shipped"/"stuck on" labels inside
   [StatusLog.tsx](components/StatusLog.tsx)'s three cards).
3. **Header logo → Spidey mascot**, and so did **the browser-tab favicon**.
   [app/icon.png](app/icon.png) (the old chrome "V" glyph) was deleted;
   [app/icon.svg](app/icon.svg) — a new file, replaces it via Next.js's
   `app/icon.*` convention. It's `spidey-awake.svg`'s pixel `<rect>`s
   inlined directly with no background — transparent, mascot-only (a
   first version wrapped it in a black rounded square with a red border;
   the user asked for just the bare mascot instead). The `viewBox` is
   `"2.5 2.5 27 13"`, a tight crop to the sprite's actual ink bounding box
   (the source sprite's own `viewBox="0 0 32 18"` has empty margin on all
   sides that made the mascot look small/thin inside the square favicon
   slot; cropping to content removes that dead space so it fills the icon
   better) — if you swap in a different state's sprite here, recompute its
   bounding box rather than reusing these exact numbers. If you regenerate
   this, keep it self-contained (inline the sprite's `<rect>`s, don't
   reference `/assets/spidey-awake.svg` from inside a favicon file) and
   don't add a background shape back without being asked.
4. **The journaling hobby entry is gone** from
   [OffTheClock.tsx](components/OffTheClock.tsx) — that list is now the
   literal 4 hobbies from the README's "off the clock" section (badminton,
   reading, gym, movies), not the 5 that used to include journaling from
   `Gioi_thieu_ve_Toi.md`. Don't add it back without being asked.
5. **Projects section**: the separate "education" column is gone
   entirely (not folded elsewhere — genuinely removed, per explicit
   instruction). The 3 project cards now render in a **2-column grid**
   (`md:grid-cols-2`, 2 per row) matching the README's actual `<table>`
   layout, with a 4th "More experiments" card (🔭, README's placeholder
   copy, links to `github.com/ahtuan171?tab=repositories`) filling the
   grid out to a clean 2×2.

## Stack

- Next.js 16 (App Router, Turbopack), TypeScript, React 19
- Tailwind CSS 3 for styling — no CSS-in-JS, no component library
- `next/font/google`, wired as CSS variables in [app/layout.tsx](app/layout.tsx)
  into Tailwind's `fontFamily` in [tailwind.config.ts](tailwind.config.ts):
  - **Anton** (`font-display`) — still loaded, now only used for the
    Header "VICTOR" wordmark and a couple of small Footer/Cta labels.
    Section headings no longer use it (see the heading-pivot note above) —
    don't assume `font-display` still means "the big heading font"
    everywhere.
  - **Inter** (`font-body`) — paragraph/body text.
  - **JetBrains Mono** (`font-mono`) — section headings (`.section-heading`,
    post heading-pivot), small labels (`.eyebrow`), nav links, dates,
    tags, buttons; this is what gives the "technical/dossier" mood and is
    now the page's dominant typeface, not a secondary one.
  - All three are loaded with `subsets: ["latin", "latin-ext", "vietnamese"]`
    — the `vietnamese` subset is no longer load-bearing for body copy
    (that's English now), but the proper noun "Phạm Anh Tuấn" still needs
    it, so don't drop the subset when picking future fonts.
- The portrait in `About.tsx` is
  [public/images/victor-portrait.jpg](public/images/victor-portrait.jpg) —
  a crop of [design-reference/IMG_2298.jpg](design-reference/IMG_2298.jpg)
  made with `sharp` `.extract()` to a 4:5 frame
  (`left:0, top:100, width:992, height:1240`) — **crop only**, no
  color/contrast edits. This is the one spot on the site that isn't
  grayscale/monochrome: the user asked to keep the avatar's original
  color (deep-blue night sky, moonlight) — don't add a `grayscale` class
  back here without being asked.
- **Header logo & favicon → Spidey mascot** (see the heading-pivot note
  above for the favicon specifics).
  [components/Header.tsx](components/Header.tsx) renders
  `<Spidey state="awake" glow />` next to "VICTOR" instead of an
  `<Image>` of a logo file. `public/images/logo-v.png` (the old header
  logo asset) was deleted since nothing references it anymore.
  `design-reference/logo-v.png` (raw source art for that old logo) is
  still there, unused, kept only as history — don't confuse the two.
- ESLint 9 flat config ([eslint.config.mjs](eslint.config.mjs)) importing
  `eslint-config-next/core-web-vitals` directly — **not** via `FlatCompat`,
  which throws a circular-JSON error with this eslint-config-next version.
  `next lint` is removed in Next 16; run `npx eslint .` instead.
- **This is no longer a pure static site.** [app/api/pet/route.ts](app/api/pet/route.ts)
  and [app/api/activity/route.ts](app/api/activity/route.ts) are real
  backend routes: both call the GitHub GraphQL API server-side (via the
  shared `getContributionDays()` in [lib/github.ts](lib/github.ts)) and
  stream back a generated SVG. They need a `GITHUB_TOKEN` env var (classic
  PAT, `read:user` scope) set locally in `.env.local` (gitignored via the
  `.env*.local` pattern) **and** on Vercel for production. `GITHUB_USERNAME`
  is optional, defaulting to `"ahtuan171"`. If the token is missing or the
  GitHub API call fails, neither route 500s — both fall back to a themed
  placeholder card (`/api/pet`: asleep mascot, em-dash streak, "GITHUB_TOKEN
  not configured" status; `/api/activity`: same card shell with a centered
  status message, no graph) so the embeds on the live homepage never show a
  broken-image icon. (A working `.env.local` with a real token already
  exists locally as of this writing — real streak data renders in dev.)

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npx eslint .      # lint (next lint no longer exists in Next 16)
```

## Design system

Defined in [tailwind.config.ts](tailwind.config.ts) and
[app/globals.css](app/globals.css). Reuse these tokens instead of raw hex
values or ad-hoc fonts. The palette is the **Spidey palette** — `chrome`
is red, not white; don't reintroduce a pure-grayscale/no-accent treatment
without the user asking again.

| Token | Use |
|---|---|
| `ink` (+ `ink-50`…`ink-900`) | Backgrounds, borders. Base is near-black `#0B0D10`; `ink-400` (`#2A2D34`) is the standard border tone, usually at `/30`–`/50` opacity. |
| `bone` / `bone-dim` / `bone-muted` | Body text, in decreasing emphasis. `bone` is cream (`#F5F2E8`), `bone-muted` (`#8A8F98`) matches the widget's "muted" tone exactly. |
| `chrome` (+ `dim`) | The accent — red `#FF1F35` (`dim` = dark red `#A81222`). Used for section headings, emphasis, rings, dots, hover states, active nav. This is the one color in the site; don't add a second accent hue. |
| `font-display` | Anton — Header wordmark + a couple of small labels only, post heading-pivot (see Stack above). |
| `font-body` | Inter — paragraphs. |
| `font-mono` | JetBrains Mono — now the dominant typeface: section headings, small labels, nav links, tags, dates/periods, buttons. Also what [app/api/pet/route.ts](app/api/pet/route.ts)'s generated SVG uses, so the widget and the site read as one system. |

Raw hex values that live outside Tailwind's token system (so a token-only
edit to `tailwind.config.ts` won't touch them — keep these in sync by hand
if the palette changes again): `body` background + radial glow,
`::selection`, scrollbar colors, and `.text-shadow-glow` (now unused, see
below), all in [app/globals.css](app/globals.css); and the `PALETTE`
object in [app/api/pet/route.ts](app/api/pet/route.ts) (the mascot sprites
themselves are pre-colored SVG files, not generated from this palette —
see Spidey mascot below).

Component classes in `globals.css` `@layer components`:
- `.eyebrow` — small uppercase mono label, red. Post heading-pivot, only
  used for genuinely small sub-labels (StatusLog's three card labels) —
  **not** for section headings anymore, see the heading-pivot note above.
- `.section-heading` — **redefined in the heading pivot**: red/mono/bold,
  `text-3xl md:text-5xl`, used directly as a section's one and only
  heading (e.g. `<h2 className="section-heading">stack</h2>`). Used to be
  a big white Anton heading paired with a separate `.eyebrow` — that
  pairing is gone, see the heading-pivot note at the top of this file.
- `.ornament-divider` — centered line-flanked mono divider. No longer used
  anywhere (Footer's old hanging-icon-plus-divider header was replaced by
  `footer.svg`) — kept in case a future section wants it, not dead code to
  delete on sight.
- `.paper-card` — translucent bordered card (goals card in Cta, StatusLog
  cards).
- `.chrome-ring` — thin bone-toned circular or pill border (buttons, tags)
  — intentionally stayed on `bone/30`, not `chrome`, so rings don't turn
  red.
- `.film-grain` (applied to `<body>`) — subtle noise overlay for texture;
  keep it, removing it flattens the mood considerably.
- `.text-shadow-glow` (`@layer utilities`) — was used on the old
  "Discipline" heading, now unused since that heading was removed. Left
  defined in case a future large heading wants the glow; not currently
  referenced anywhere.

Avoid pure `#fff` for body text — use `bone` (`#F5F2E8`); reserve red
(`chrome`) for headings and small high-emphasis elements, so it stays a
genuine accent instead of just "the text color."

### Spidey mascot

Real pixel-art sprites, copied byte-for-byte from the sibling
`github-readme-widget` project's `public/assets/` into this repo's
[public/assets/](public/assets/) — **all 10 mascot states**
(`spidey-awake/asleep/coffee/web-shoot/thinking/hanging/coding/success/
confused/error.svg`) plus the three layout-art SVGs `banner.svg`,
`divider.svg`, `footer.svg`, and `MASCOT.md` as the style-guide copy.
**Don't hand-draw or regenerate any of these** — if the sibling project's
files change, re-copy by hand rather than editing the copies here or
reinventing the pixel grid.

Three independent consumers:
- [components/Spidey.tsx](components/Spidey.tsx) — thin wrapper around
  `next/image`, `src={`/assets/spidey-${state}.svg`}`, `unoptimized`. Every
  one of the 10 states is in use somewhere on the page — see the table
  below. The `SpideyState` union in that file is the source of truth for
  which states exist.
- [lib/assets.ts](lib/assets.ts) + [app/api/pet/route.ts](app/api/pet/route.ts)
  — `getAssetDataUri()` reads an SVG off disk, base64-encodes it (in-memory
  cache, keyed by filename), and the route embeds it via
  `<image href="data:...">` inside the generated commit-streak card
  (`awake`/`asleep` only, matching "did they commit today").
- Plain `<img src="/assets/....svg">` (not `next/image`) for `banner.svg`,
  `divider.svg`, and `footer.svg` — in
  [components/Banner.tsx](components/Banner.tsx),
  [components/SectionDivider.tsx](components/SectionDivider.tsx), and
  [components/Footer.tsx](components/Footer.tsx) respectively, plus
  [app/icon.svg](app/icon.svg) which inlines `spidey-awake.svg`'s pixels
  directly (see the heading-pivot note above). These skip `Spidey.tsx` and
  each has an `eslint-disable-next-line @next/next/no-img-element` comment
  — intentional, not an oversight to "fix" by converting to `next/image`.

State → where-it-goes, per [public/assets/MASCOT.md](public/assets/MASCOT.md)'s
own table (follow it for any new usage — don't pick a state that "looks
right" instead):

| State | Component | Section |
|---|---|---|
| `coffee` | [About.tsx](components/About.tsx) | about |
| `awake` | [Header.tsx](components/Header.tsx) (logo) + [app/icon.svg](app/icon.svg) (favicon) + [Stack.tsx](components/Stack.tsx) + `/api/pet` | header · favicon · stack · commit widget (committed today) |
| `web-shoot` | [Resume.tsx](components/Resume.tsx) | projects |
| `thinking` | [GithubActivity.tsx](components/GithubActivity.tsx) + [Cta.tsx](components/Cta.tsx) | numbers · goals card |
| `hanging` | [TheWebIWeave.tsx](components/TheWebIWeave.tsx) | the web i weave |
| `coding` / `success` / `confused` | [StatusLog.tsx](components/StatusLog.tsx) | currently (three cards) |
| `asleep` | [OffTheClock.tsx](components/OffTheClock.tsx) + `/api/pet` | off the clock · commit widget (no commits today) |
| `error` | *(not used yet)* | reserved for a future error/404 page, per `MASCOT.md` |

## Structure

```
app/
  layout.tsx      # fonts, metadata (English now), <body> wrapper
  page.tsx        # assembles sections in order — the literal README structure, see above
  globals.css     # design tokens' CSS-side (@layer base/components/utilities)
  icon.svg        # favicon — Spidey mascot, see the heading-pivot note above
  api/pet/route.ts  # GitHub commit-streak SVG widget — see "Spidey mascot" above
  api/activity/route.ts  # self-hosted weekly-contribution graph SVG (no third-party service)
lib/
  github.ts       # GitHub GraphQL contribution-calendar fetch (needs GITHUB_TOKEN)
  pet.ts          # contribution days -> streak count + awake/sleeping state
  assets.ts       # reads public/assets/*.svg, base64-encodes for the API route
components/        # page.tsx renders these in exactly this order
  Header.tsx        # sticky nav (English labels), Spidey logo, mobile menu
  Banner.tsx         # banner.svg + external typing-effect image — page-open art
  About.tsx          # "about" — bio, pipeline tagline, quote, portrait photo
  SectionDivider.tsx # divider.svg strip — reused between every section below
  Stack.tsx          # "stack" — shields.io badges grouped by category
  Resume.tsx         # "projects" — 2×2 grid: 3 real projects + "more experiments"
  GithubActivity.tsx # "numbers" — /api/pet commit-streak card + /api/activity graph
  TheWebIWeave.tsx   # "the web i weave" — contribution snake embed
  StatusLog.tsx      # "currently" — coding/success/confused status cards
  OffTheClock.tsx    # "off the clock" — hobbies list (4 items, no journaling)
  Cta.tsx            # headline + goals card — site-original, no README equivalent
  Footer.tsx         # footer.svg + contact email + social links
  Spidey.tsx         # mascot icon component — see "Spidey mascot" above
public/
  images/victor-portrait.jpg   # avatar in use — cropped from IMG_2298.jpg
  assets/spidey-*.svg          # all 10 mascot sprites — see "Spidey mascot" above
  assets/banner.svg, divider.svg, footer.svg  # layout art — see "Spidey mascot" above
  assets/MASCOT.md             # mascot style guide (states, palette, usage rules)
design-reference/
  logo-v.png                    # old header-logo source art — unused, historical
  VICTOR~4.SVG                  # source logo artwork (SVG: "V." + "VICTOR" wordmark)
  nils-template-reference.png  # OLD layout reference — superseded, see Layout pivot above
  Gioi_thieu_ve_Toi.md          # source bio notes some hobby copy was originally written from
  IMG_2298.jpg                  # source photo for the current avatar (uncropped)
```

Sibling project [../github-readme-widget](../github-readme-widget) is where
the commit-streak widget concept, Spidey palette, and the mascot sprite
files originally came from — a separate Next.js app, not a dependency of
this one (`public/assets/spidey-*.svg` here are copies, not a symlink or
shared package; if the sibling project's sprites change, re-copy by hand).

## Content — what's real vs. still placeholder

Most content is sourced from the user's actual GitHub profile README
(pasted directly, 2026-08-18 — the source of truth for bio/stack/projects/
status copy, now quoted close to verbatim in English per the
language-pivot note above) plus
[design-reference/Gioi_thieu_ve_Toi.md](design-reference/Gioi_thieu_ve_Toi.md)
for hobby details that predate it. Mapped one section at a time:
- **about** ([About.tsx](components/About.tsx)): CS student at the
  University of Science, VNU-HCM, career direction Data Analytics, also
  interested in UI/UX and AI automation. The `idea → build → automate →
  analyze → improve` pipeline tagline and the closing quote are verbatim
  from the README's "about" section — don't reword without checking back
  against that source. Hobbies used to live here too; they moved to their
  own section (see "off the clock" below).
- **stack** ([Stack.tsx](components/Stack.tsx)): shields.io badge images
  (not text pills), grouped exactly as the README does — Languages (C,
  C++, Python, SQL, HTML5, CSS3), Frontend (Flutter, React), Backend
  (Python), Database (MySQL, MongoDB, Supabase), Tools (Git, Docker,
  Postman, Figma, Claude Code, Vercel, Render). Badge URLs are built by
  the `badge()` helper in that file from label + shields.io logo slug —
  extend the `groups` array rather than hand-writing a new badge URL.
- **projects** ([Resume.tsx](components/Resume.tsx)): three real project
  cards plus a "more experiments" card, in a 2×2 grid (see the
  heading-pivot note above — the education column was removed entirely,
  don't add it back). Each real card has an emoji, description,
  `Stack:`/`Highlight:` lines, a status badge (`RELEASED`/`PROTOTYPE`),
  and a red `view_project` shields.io button — **Web-Shooter**
  (`github.com/ahtuan171/Web-Shooter`), **Victor-Tracker**
  (`github.com/ahtuan171/Victor-Tracker`), **TourXport**
  (`github.com/quocnam612/TourXport` — under a teammate's account since
  the user was team lead, not repo owner; don't "fix" that URL to point
  at `ahtuan171`).
- **numbers** ([GithubActivity.tsx](components/GithubActivity.tsx)): the
  real `/api/pet` commit-streak card, plus a second self-hosted card from
  [app/api/activity/route.ts](app/api/activity/route.ts) (both project
  additions, not in the README). **2026-08-18: switched off the README's
  `github-readme-activity-graph.vercel.app` embed** — that free
  third-party service intermittently returns a "Can't fetch any
  contribution" error card (confirmed independently broken on the user's
  live GitHub README too, same URL, same day — not a bug in this repo).
  `app/api/activity/route.ts` reuses `getContributionDays()` from
  [lib/github.ts](lib/github.ts) (same GraphQL call `/api/pet` already
  makes) to build its own area/line-chart SVG — no external graph
  service, no more dependence on a flaky third party. Plots a **rolling
  30-day window ending today** (30 daily points, x-axis labeled `D/M`
  every 5th day plus today, today's point drawn slightly larger) — went
  through two earlier iterations first: weekly totals over the past year
  (52-53 points, no labels — too dense to label) and monthly totals over
  the past year (12 points, `Jan`…`Dec` labels) — the user asked for
  "current month's contributions, e.g. if today is 18/8/2026 show the
  last 30 days" specifically, i.e. a trailing window anchored on the
  current date, not a fixed calendar bucket. If changing the window size
  again, the label-thinning step (`labelStep` in `buildGraphSvg`) needs
  adjusting too or labels will overlap. Same graceful-fallback pattern as
  `/api/pet`: missing `GITHUB_TOKEN` or a failed fetch renders a themed
  placeholder card instead of a broken image or an error string.
- **the web i weave** ([TheWebIWeave.tsx](components/TheWebIWeave.tsx)):
  the contribution-snake SVG, embedded from
  `raw.githubusercontent.com/ahtuan171/ahtuan171/output/snake.svg` — this
  depends on a GitHub Actions workflow running on the user's `ahtuan171`
  profile repo (documented in the sibling project's `SETUP.md`); if that
  workflow isn't set up yet, this embed 404s to a broken image. That's
  expected until the user configures it there — not a bug to "fix" here.
- **currently** ([StatusLog.tsx](components/StatusLog.tsx)): "working on
  / shipped / stuck on", from the README's "currently working on /
  recently shipped / currently stuck on" sections, combined into one
  three-card section rather than three separate near-empty ones. This is
  a snapshot in time — update it as the user's actual status changes
  rather than leaving it stale.
- **off the clock** ([OffTheClock.tsx](components/OffTheClock.tsx)): the
  README's literal 4 hobbies — badminton, reading, gym, movies. Journaling
  (from `Gioi_thieu_ve_Toi.md`, predates the README) was explicitly
  removed — don't add it back without being asked.
- Contact/socials in [Footer.tsx](components/Footer.tsx):
  `ahtuan1701@gmail.com`, GitHub (`github.com/ahtuan171` — differs from
  the email's `ahtuan1701`, intentional, not a typo), Facebook, and
  LinkedIn (`linkedin.com/in/tuấn-phạm-49a6a4356`, from the README's
  footer links).
- Portrait photo in About (real photo, cropped only — see Stack section
  above for the exact crop) and the **headline + goals card in
  [Cta.tsx](components/Cta.tsx)** are the two pieces of real content with
  no README equivalent — both predate the README and are kept since
  they're real, not fabricated to fill a gap.

Still placeholder / needs the user's input before treating as final:
- **Location/city**: not shown anywhere on the site because it's unknown
  — add it if/when provided rather than guessing which campus city.
- **More projects**: extend `projects` in `Resume.tsx` as real ones are
  shared instead of inventing placeholder cards. Note the grid is 2 wide
  (see the heading-pivot note above) — a 5th real project would make the
  "more experiments" filler card the 6th cell rather than displacing it;
  decide with the user whether "more experiments" should move to always
  be last, or be dropped once there are enough real projects to fill the
  grid on its own.

There's no CMS or data layer; content lives inline in the components —
edit the arrays/JSX directly.

## Conventions

- **All copy is in English** (language pivot, see the top of this file —
  supersedes the earlier Vietnamese-body-copy convention from the palette/
  layout pivots, don't resurrect that). The only exception is the proper
  noun "Phạm Anh Tuấn" (a person's name isn't translated) wherever it
  appears (About, the portrait caption, Footer's copyright line, Banner's
  alt text).
- Section headings are the literal lowercase README section names
  (`about`, `stack`, `projects`, `numbers`, `the web i weave`, `currently`,
  `off the clock`) rendered via `.section-heading` (see the heading-pivot
  note and Design system above) — one heading per section, no separate
  Anton heading underneath. Sections with no README equivalent (Cta) use
  the same `.section-heading` style with original copy ("let's talk",
  "goals") rather than reverting to the old Anton pattern.
- Server components by default; only `Header.tsx` is a client component
  (needs `useState` for the mobile menu toggle). `Spidey.tsx` uses `useId`
  but stays a server component — that hook doesn't require `"use client"`.
  Don't add `"use client"` elsewhere unless genuinely needed.
- No test suite, no CMS, no database, no auth. There **are** now two
  backend routes (`app/api/pet/route.ts`, `app/api/activity/route.ts`, see
  Stack above) — that's an intentional, narrow exception for GitHub-data
  widgets, not a green light to add general-purpose API routes/auth
  without being asked.
- Git repo, hosted at `github.com/ahtuan171/Porfolio` (`main` branch), with
  a GitHub Actions CI workflow at
  [.github/workflows/ci.yml](.github/workflows/ci.yml) running
  `eslint` + `next build` on every push/PR to `main`. Deployed on Vercel
  (auto-deploys `main`, default Next.js build settings). **Needs
  `GITHUB_TOKEN` set in the Vercel project's environment variables** for
  the commit-streak widget to show real data in production — without it,
  `/api/pet` still renders (falls back to a placeholder card, see Stack
  above), it just won't show a real streak. `GITHUB_USERNAME` is optional.
- Don't fabricate biographical details (dates, employers, quotes,
  proficiency percentages) to fill a section that looks empty — leave a
  clearly-marked gap or ask, as done above for location.
