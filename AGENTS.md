# CLAUDE.md — Lina Al-Aali Portfolio (Website)

> This file explains the project to any AI assistant working on it. Read it first.

## About the project

A portfolio website for the artist **Lina Al-Aali (لينا العالي)** — showcasing her
artwork and professional background.

This is a personal volunteer project, **completely separate from any government
employer**. All accounts and ownership belong to Lina.

This folder (`lina-portfolio`) is the **public-facing website** (the frontend).
The control panel where Lina edits content lives in a separate project: `lina-studio`.

## Stack

- **Astro** — the website framework (outputs lightweight static HTML)
- **Tailwind CSS** — styling
- **Sanity** — the content source (CMS); the site pulls artwork from it via API
  - projectId: `8t1sl8zv`
  - dataset: `production`
- **JavaScript only** — no TypeScript
- **Hosting:** Cloudflare Pages (free deploy from the GitHub repo)

## Languages

The site is **bilingual: Arabic + English**.
- Arabic is primary, direction RTL. English is LTR.
- Text fields (titles, descriptions) come from Sanity in both languages.

## Content model (comes from Sanity)

- **artwork:** image, title (AR/EN), description (AR/EN), category, display order.
- **category:** groups artworks. Lina can add and edit categories freely from the Studio.
- **about:** portrait, bio (AR/EN), contact links.

The site must render any new category or artwork Lina adds **automatically**, without
code changes — categories are read dynamically from Sanity.

## How I like to work (developer preferences — Shumokh)

- **Explain in Arabic.**
- **Keep it simple — I'm a beginner.** Avoid heavy jargon, go step by step.
- **Give terminal commands one at a time**, not batched; wait for confirmation before the next.
- **No TypeScript** — plain JavaScript.

## Useful commands

    npm run dev      # run the site locally (localhost:4321)
    npm run build    # build the production version