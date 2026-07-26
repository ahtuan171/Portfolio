# Victor — Personal Portfolio Site

Single-page personal introduction site for **Phạm Anh Tuấn (Victor)**, an IT
student. Monochrome, high-contrast black & white aesthetic — "ngầu, bí ẩn,
manly": poster-style condensed type, grainy film texture, moody grayscale
portrait, no color accents at all. Think a mysterious dossier/case-file
mood, not a colorful tech-startup landing page.

Layout structure is adapted from the reference template in
[design-reference/nils-template-reference.png](design-reference/nils-template-reference.png)
(a modern dark portfolio called "NILS"): About/hero → Resume → Skills →
CTA → Footer. The structure was kept; the visual language went through two
passes — first a "dark academia" (warm brown/gold) treatment, then replaced
with the current pure black & white treatment per the user's request to
match the original reference's grayscale mood more directly.

## Stack

- Next.js 16 (App Router, Turbopack), TypeScript, React 19
- Tailwind CSS 3 for styling — no CSS-in-JS, no component library
- `next/font/google`, wired as CSS variables in [app/layout.tsx](app/layout.tsx)
  into Tailwind's `fontFamily` in [tailwind.config.ts](tailwind.config.ts):
  - **Anton** (`font-display`) — big bold poster-style headings
  - **Inter** (`font-body`) — all paragraph/body text
  - **JetBrains Mono** (`font-mono`) — eyebrow labels, nav links, dates,
    tags, buttons; this is what gives the "technical/dossier" mood
  - All three are loaded with `subsets: ["latin", "latin-ext", "vietnamese"]`.
    **This matters**: the first version of this site used **Bebas Neue**,
    which visually looks similar to Anton but only ships `latin`/`latin-ext`
    in Google Fonts (no `vietnamese` subset) — it silently mis-rendered
    Vietnamese diacritics. Before picking any display font here, verify it
    has a `vietnamese` subset via
    `node_modules/next/dist/compiled/@next/font/dist/google/font-data.json`
    (look up the family, check `.subsets`) — don't rely on how it looks in
    a screenshot, some diacritic combinations only break in certain browsers.
- The portrait in `About.tsx` is
  [public/images/victor-portrait.jpg](public/images/victor-portrait.jpg) —
  a crop of [design-reference/IMG_2298.jpg](design-reference/IMG_2298.jpg)
  (profile silhouette looking up at the moon, night sky) made with `sharp`
  `.extract()` to a 4:5 frame (`left:0, top:100, width:992, height:1240`)
  to match the photo panel's `aspect-[4/5]` container — **crop only**, no
  color/contrast edits baked into the file or applied via CSS. This is the
  one spot on the site that isn't grayscale: the user explicitly asked to
  keep the avatar's original color (deep-blue night sky, moonlight) rather
  than force it through the site's monochrome filter — don't add a
  `grayscale` class back here without being asked. An earlier avatar
  (`victor-portrait-original.png`, from `IMG_8740.PNG`) was replaced by
  this one and deleted — if cropping a new avatar photo, follow the same
  pattern: crop with `sharp`, keep color/exposure edits to CSS only, and
  remove the old file from `public/images/` instead of leaving it orphaned.
- The logo mark ([public/images/logo-v.png](public/images/logo-v.png), used
  in [components/Header.tsx](components/Header.tsx) next to the "VICTOR"
  wordmark, and as [app/icon.png](app/icon.png) for the favicon) is a chrome
  "V" glyph, derived from source art the user dropped at
  [design-reference/logo-v.png](design-reference/logo-v.png) (opaque, black
  background — same visual family/style as a previous "T" version, see
  below). Processed the same way as that earlier logo: crop to bounding box,
  then convert the glyph's **luminance to the alpha channel** (white RGB,
  alpha = grayscale value) via a one-off `sharp` script — not a flat
  background-color removal, since the source has soft/gradient chrome
  edges a hard chroma-key would leave jagged.
  - This is the **second** logo iteration. The first was a crop of just
    "V." (letter + dot, no chrome effect) from
    [design-reference/VICTOR~4.SVG](design-reference/VICTOR~4.SVG); before
    that, a chrome "T" glyph from `design-reference/logo_T.png`. Both
    earlier source files and generated assets were deleted when superseded
    — don't expect them to still be around.
  - **Naming collision to watch for**: the source art and the final site
    asset are both named `logo-v.png`, just in different folders
    (`design-reference/logo-v.png` = raw opaque source,
    `public/images/logo-v.png` = processed transparent asset actually used
    by the app). Don't confuse the two or overwrite one with the other.
  - If swapping the logo again: drop the new source art in
    `design-reference/`, derive the transparent asset into
    `public/images/logo-v.png` (reuse the luminance-as-alpha `sharp`
    approach if the source has soft/gradient edges), regenerate
    `app/icon.png` from it, and delete whatever it superseded from both
    folders.
- ESLint 9 flat config ([eslint.config.mjs](eslint.config.mjs)) importing
  `eslint-config-next/core-web-vitals` directly — **not** via `FlatCompat`,
  which throws a circular-JSON error with this eslint-config-next version.
  `next lint` is removed in Next 16; run `npx eslint .` instead.

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
values or ad-hoc fonts — **no color accents**; this palette is strictly
grayscale by design intent, don't reintroduce a tint (gold/red/etc.)
without the user asking for it again.

| Token | Use |
|---|---|
| `ink` (+ `ink-50`…`ink-900`) | Backgrounds, borders. Base is near-black (`#0a0a0a`), not warm. |
| `bone` / `bone-dim` / `bone-muted` | Body text (soft off-white), in decreasing emphasis. |
| `chrome` (+ `dim`) | The one "bright" accent — pure/near-white, used for emphasis: rings, dots, hover states, active nav. |
| `font-display` | Anton — all headings (`section-heading`, nav wordmark), always uppercase. |
| `font-body` | Inter — paragraphs. |
| `font-mono` | JetBrains Mono — eyebrow labels, nav links, tags, dates/periods, buttons. |

Component classes in `globals.css` `@layer components`:
- `.eyebrow` — small uppercase mono label above a heading (e.g. "GIỚI THIỆU")
- `.section-heading` — large uppercase Anton heading
- `.ornament-divider` — centered line-flanked mono divider (footer)
- `.paper-card` — translucent bordered card (goals box in CTA section)
- `.chrome-ring` — thin white/bone circular or pill border (buttons, tags)
- `.film-grain` (applied to `<body>`) — subtle noise overlay for texture;
  keep it, removing it flattens the mood considerably

Avoid pure `#fff` for body text — use `bone` (`#ece9e2`); reserve pure
white (`chrome`) for small high-emphasis elements only, so it stays a
genuine accent instead of just "the text color."

## Structure

```
app/
  layout.tsx      # fonts, metadata, <body> wrapper
  page.tsx        # assembles sections in order
  globals.css     # design tokens' CSS-side (@layer base/components/utilities)
  icon.png        # favicon/app icon — generated from the logo mark, see below
components/
  Header.tsx      # sticky nav, mobile menu (client component), shows the logo mark
  About.tsx       # hero/intro copy + real portrait photo
  Resume.tsx      # "Dự án & Hoạt động" / "Học vấn" two-column list
  Skills.tsx      # skill tag pills (no fabricated proficiency %)
  Cta.tsx         # contact CTA + "Mục tiêu hiện tại" goals card
  Footer.tsx      # contact email, social links
public/
  images/victor-portrait.jpg   # avatar in use — cropped from IMG_2298.jpg
  images/logo-v.png            # logo mark in use — see below
design-reference/
  VICTOR~4.SVG                  # source logo artwork (SVG: "V." + "VICTOR" wordmark)
  nils-template-reference.png  # original layout/style reference screenshot
  Gioi_thieu_ve_Toi.md          # source bio notes the content was written from
  IMG_2298.jpg                  # source photo for the current avatar (uncropped)
```

## Content — what's real vs. still placeholder

Real content already wired in, sourced from
[design-reference/Gioi_thieu_ve_Toi.md](design-reference/Gioi_thieu_ve_Toi.md)
and the user directly:
- Bio, goals, hobbies in [components/About.tsx](components/About.tsx) and
  the goals list in [components/Cta.tsx](components/Cta.tsx)
- Skill tags in [components/Skills.tsx](components/Skills.tsx): C/C++,
  Python, OOP, DSA, SQL, Design, English Communication — deliberately shown
  as plain tags, **not** progress-bar percentages, since no real
  self-assessed proficiency numbers were provided (don't invent numbers to
  fill the old percentage-bar layout)
- Contact/socials: `ahtuan1701@gmail.com`, GitHub
  (`github.com/ahtuan171` — note this differs from the email's
  `ahtuan1701`, that's correct/intentional, not a typo), Facebook — in
  [components/Footer.tsx](components/Footer.tsx) and [components/About.tsx](components/About.tsx)/[components/Cta.tsx](components/Cta.tsx)
- Portrait photo in the About section (real photo, cropped only — see Stack
  section above for the exact crop)
- One real project, **TourXport**, in
  [components/Resume.tsx](components/Resume.tsx)'s `projects` array

Still placeholder / needs the user's input before treating as final:
- **Education period** in `Resume.tsx`'s `education` array shows just
  "Hiện tại" — the actual enrollment year (e.g. "2024 — Hiện tại") wasn't
  provided; don't guess and fill it in, ask or leave as-is.
- **Location/city** was intentionally dropped from the footer (previously
  a "Địa điểm" column) because it's unknown — add it back if/when provided
  rather than guessing which campus city.
- **More projects/activities**: only TourXport was provided; the
  `projects` array in `Resume.tsx` is expected to grow as more are shared.

There's no CMS or data layer; content lives inline in the components —
edit the arrays/JSX directly.

## Conventions

- All copy is in Vietnamese, with one deliberate exception: the hero
  headline in `About.tsx` is the single English word "Discipline" (the
  user asked for this specifically, replacing an earlier Vietnamese
  three-line slogan; the trailing period was later removed too, along
  with the one after "VICTOR" in the header wordmark — both are
  intentionally bare, don't add punctuation back). Don't Vietnamese-ify
  the headline back without being asked; otherwise keep new copy in
  Vietnamese.
- Server components by default; only `Header.tsx` is a client component
  (needs `useState` for the mobile menu toggle). Don't add `"use client"`
  elsewhere unless genuinely needed.
- No test suite, no CMS, no backend — this is a static single-page site.
  Don't introduce a database, API routes, or auth unless explicitly asked.
- Git repo, hosted at `github.com/ahtuan171/Porfolio` (`main` branch), with
  a GitHub Actions CI workflow at
  [.github/workflows/ci.yml](.github/workflows/ci.yml) running
  `eslint` + `next build` on every push/PR to `main`. Deployed on Vercel
  (auto-deploys `main`, default Next.js build settings, no environment
  variables needed — the app doesn't read `process.env` anywhere).
- Don't fabricate biographical details (dates, employers, quotes,
  proficiency percentages) to fill a section that looks empty — leave a
  clearly-marked gap or ask, as done above for education dates and location.
