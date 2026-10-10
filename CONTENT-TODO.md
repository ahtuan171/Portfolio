# Content still needed

Everything on the live site is real. Gaps show up as dashed "TODO (dev
only)" markers in `npm run dev` and are simply absent in production.

## Review the Vietnamese (high priority)
All Vietnamese copy was **drafted by Claude**. Please read it as yourself
and correct anything that doesn't sound like you:
- [ ] Interface: `lib/i18n/dictionaries/vi.ts`
- [ ] Profile and About: `content/profile.ts`, `content/about.ts`
- [ ] Projects and milestones: `content/projects.ts`, `content/milestones.ts`
- [ ] Wording: the site now says **"Information Technology"** in English and
      **"Công nghệ Thông tin"** in Vietnamese (changed from "Computer Science"
      on 2026-10-10). Confirm the official program name.
- [ ] Themed section labels (e.g. Pixel Art "Sổ nhiệm vụ", Classic "Biên niên")
      are in `home.eyebrows` in both dictionaries.
- [ ] Classic editorial labels (`classic.*` in both dictionaries): "Kho lưu trữ
      cá nhân", "Bản I — Thư phòng lúc hoàng hôn", "Hồ sơ", "Đôi nét",
      "Cách làm", "Năm", "Chú giải", "Công nghệ". The English uses "Anno" before
      the year; say if you'd rather have plain "Year".

## Real content
- [ ] **CV PDF** → `public/`, then set `cvUrl` in `content/profile.ts`.
- [ ] **Data Analyst project** → copy the template at the bottom of
      `content/projects.ts`; keep `draft: true` until ready. Real data only.
- [ ] **Ongoing competitions** → `content/milestones.ts` with
      `outcome.kind: "ongoing"` (name, organizer, dates, role, link). Change it to
      `award` / `participated` with the factual result when results are out. Then
      delete the `placeholder-competition` entry.
- [x] **Web-Shooter screenshot** → `cover` in `content/projects.ts` (a GIF could replace it later).
- [ ] Enrollment period → `education[0].period` in `content/about.ts`, and turn
      the `placeholder-university` milestone into a real one.
- [ ] Confirm milestone dates (taken from repo commit history).
- [ ] Web-Shooter role ("Creator", solo?) and contributions. TourXport: your
      specific contributions.
- [ ] Challenges and lessons learned for Web-Shooter and TourXport.
- [ ] Data tools you actually use → `toolkit` in `content/about.ts`.
- [ ] Refresh the "Now" block (`content/about.ts`, `nowUpdated`, currently 2026-08-18).
- [ ] Optional: location (`content/profile.ts`).

## Art direction assets
### Pixel Art backgrounds (`public/assets/themes/pixel-art/`, wired in `lib/themeArt.ts`)
- [x] `forest-home.webp`: Home hero. Converted from your `assets/Pixel-background.png`
      (3 MB → 272 KB). The original PNG is untouched.
- [x] `lakeside-footer.webp`: Contact section backdrop. Converted from your
      `assets/Pixel-footer-background.png` (2.6 MB → 259 KB).
- [ ] `archive-projects.webp` (optional): Selected Projects backdrop. Currently none.
- [ ] `misty-journey.webp` (optional): Journey backdrop. Currently falls back to none on Home.
- [ ] `quiet-journal.webp` (optional): Journal/About header band. Currently uses `forest-home`.
To add one, put the file in that folder (WebP, about 1600–2400px wide) and replace
the matching `null` in `lib/themeArt.ts` with an import. Please confirm the
artwork's license or source, since it ships with the site.

### Classic artwork
- [ ] Confirm the license/source of `assets/Classic-header-bg.png` (now
      `public/assets/themes/classic/candlelit-study.webp`, the Classic hero,
      page-header and footer art), since it ships with the site. The Met
      cathedral engraving is no longer used and was removed.
- [ ] Optional, better hero: the current art is only 1983×793, so it's
      cropped (castle removed), brightened and upscaled — fine on standard
      screens, soft on retina. For a crisp version, generate ≥ 3200×1350 and
      replace the WebP (same name). Suggested prompt:
      > Cinematic film still, wide 21:9. A young man with dark, slightly wavy
      > hair sits at a large antique window in a quiet European study, seen
      > from behind at a slight three-quarter angle, chin resting on his hand,
      > looking into the distance. His silhouette, hair, shoulders and white
      > shirt with a dark waistcoat are clearly lit by warm amber sunset light.
      > Beyond the window: a calm lake, layered distant mountains in soft mist,
      > a few old rooftops of a small town, fading sunset — no castle. Interior
      > in deep walnut shadows with visible detail, minimal objects (a desk, a
      > closed book, a cup). Left third of the frame calm and dark for text.
      > Muted bronze highlights, restrained haze, sharp subject, gentle
      > softness in the far landscape. Painterly realism, 35mm lens, no text.
      Keep the man in the middle third and the window in the right third so
      the current crops still work.

### Per-theme portraits
Spidey, Classic and Minimalist use your own photos
(`public/images/portraits/<theme>.jpg`, wired in `components/ThemePortrait.tsx`).
Pixel Art still uses the earlier portrait (`pixel.jpg`); drop in a new file with
the same name to replace it. The portrait alt texts (EN + a Claude-drafted VI)
are in the dictionaries under `hero.portraitAlt` — please review the Vietnamese.

## Journal
- [ ] `content/journal/rebuilding-my-portfolio.md` is a **draft Claude wrote**.
      Rewrite or delete it. For a Vietnamese version, write
      `rebuilding-my-portfolio.vi.md` yourself (posts are never machine-translated).

## Deployment
- [ ] (Optional) `GITHUB_TOKEN` on Vercel — the activity widget already works without it by reading the public contribution calendar; a token switches it to the official API.
- [ ] Optional: `NEXT_PUBLIC_SITE_URL` for a custom domain.
- [ ] Optional: rename the repo `Porfolio` → `Portfolio`.
