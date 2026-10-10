---
title: "Rebuilding my portfolio: from README to personal universe"
subtitle: "Why my GitHub README made a bad website, and what I changed."
date: 2026-10-09
category: building-in-public
lang: en
tags: [portfolio, nextjs, design]
draft: true
---

> **Draft, written by Claude from the redesign notes.** Rewrite it in your own voice (or delete it) before setting `draft: false`. It only renders in `npm run dev` for now.

My first portfolio copied my GitHub profile README one section at a time: the same headings, the same shields.io badges, the same contribution snake. It was fast to build and it looked fine on GitHub. As a website it read like a README that had wandered onto the wrong domain.

## What wasn't working

A visitor gets about five seconds. The old homepage opened on a small banner and a section titled "about", and three different names competed for attention. The projects had no screenshots and no live demo links. Two whole sections showed GitHub activity graphs and not much else.

None of it was broken. It just didn't answer the questions a recruiter actually has: who is this, what can they do, and what have they built?

## What changed

- **One identity.** "Ah Tuấn (Victor)" everywhere, from a single profile config instead of strings scattered through components.
- **Three pages instead of one long scroll.** Home is the showcase (projects and milestones), the Journal stands on its own, and About is about me as a person.
- **Projects with evidence.** Real screenshots, live demos, my actual role, and case studies built from what each repository documents.
- **A journey log** that keeps "participated", "ongoing" and "won" clearly apart.
- **English and Vietnamese**, switchable on every page.

## Four worlds, one site

I couldn't pick a single look, so the site has four: *Spidey Universe* (my developer identity), *Pixel Art* (the creative, game-loving side), *Classic* (old libraries and literature) and *Minimalist* (quiet, light and exact, with a Stoic restraint). They share one design system, so pages, URLs and content never fork. Type, imagery, texture and how each project is presented change.

## What's next

Better screenshots and GIFs, a data-analysis project, real competition entries in the journey log, and posts here about data analysis as I learn it.
