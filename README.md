# City Pulse
Explore neighborhoods through clearer livability signals — air quality, transit, green space, and quietness.
> A frontend portfolio project built to demonstrate production-minded React/Next.js craft: readable architecture, accessible UI, URL-driven state, and CI-backed quality.
**Live demo:** _Coming soon_ <!-- replace with your Vercel URL -->
---
## Why this project
In my city, livability information already exists — air quality readings, transit coverage, green space, and noise-related signals — but most people never see it in a useful way.
The data is available in fragments across reports, portals, and internal systems. Residents still struggle to answer simple questions like:
- Which areas feel healthier to live in?
- Where is transit actually strong?
- How has air quality been changing near me?
**City Pulse** was built to solve that gap: take resources the city already has and **encode them into a clear, public-facing frontend** people can explore in seconds.
This project is less about inventing new data, and more about making existing civic data **readable, shareable, and actionable**.
---
## The problem
Cities collect valuable environmental and mobility data, but the public experience is often:
- buried in dense dashboards
- split across multiple portals
- hard to compare neighborhood to neighborhood
- difficult to share as a specific filtered view
So the insight exists — the interface does not.
---
## The solution
**City Pulse** is a lightweight neighborhood explorer that turns civic signals into a simple product flow:
1. **Land** on a clear brand-first entry point
2. **Explore** neighborhoods with search, district filters, and metric sorting
3. **Inspect** a single place’s livability scores and air-quality trend
In this portfolio version, the dataset is mocked but structured like real open data (validated with Zod), so the focus stays on the product layer cities usually under-invest in: **frontend clarity, accessibility, and shareable state**.
If connected to real city feeds later, the same architecture can encode live values without redesigning the experience.
## Design spec
### Visual direction
- **Name:** Civic / calm signal system (not neon SaaS, not purple AI defaults)
- **Accent:** soft sky blue `#6a9ebe`
- **Surfaces:** light paper grays (`#f8fafc` background, white panels)
- **Type:** Newsreader (display) + Source Sans 3 (body) for readable hierarchy
- **Motion:** short rise-in transitions + reduced-motion support
### Composition rules
- **Brand first** on the home viewport (product name is a hero-level signal)
- **One job per section** — no card soup in the hero
- **Full-bleed atmosphere** with soft gradients/grid, plus an abstract signal visual
- Interactive cards only where users act (filters/results/metrics)
### UX principles
- Shareable explore state via query params
- Explicit loading / empty / error states
- Keyboard-friendly controls, skip link, landmarks, live result counts
---
## What this demonstrates
- Next.js App Router + TypeScript
- Feature-based folders (`app` / `features` / `shared`)
- URL as state (`nuqs`)
- Debounced search
- TanStack Query for client server-state
- Server Components + `"use cache"` on place detail
- Zod contracts for place data
- Vitest for filter/sort logic
- Shared UI primitives (`Button`, `Input`, `Select`)
- Accessibility basics (skip link, labels, reduced motion)
- CI on every PR
---
## Features
### Home (`/`)
Brand-first landing with signal visual and clear CTAs.
### Explore (`/explore`)
- Debounced search
- District filter + metric sort
- Loading / empty / error states
- Shareable URLs, e.g. `/explore?district=north&sort=airQuality`
### Place detail (`/place/[id]`)
- Livability metrics
- Air-quality trend bars
- Cached server fetch + Suspense-friendly rendering
- Custom not-found for unknown IDs
---
## Tech stack
| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS design tokens |
| Client server-state | TanStack Query |
| URL state | nuqs |
| Validation | Zod |
| Testing | Vitest |
| CI | GitHub Actions |
| Fonts | Newsreader + Source Sans 3 |
---
## Architecture
```text
app/                     # routes only (composition)
  explore/
  place/[id]/
features/
  explore/               # filters, list UI, query keys, fetch helpers
  place/                 # detail UI + cached getPlace
shared/
  data/places.ts         # Zod-validated mock dataset
  lib/                   # formatters, cn helper, schemas
  providers/             # QueryProvider
  ui/                    # shared Button, Input, Select
Split intentionally:

Explore = interactive/client-driven (filters + Query)
Place detail = server-first and cacheable
That mirrors how many real products separate browse vs detail.

CI
CI runs on GitHub Actions (.github/workflows/ci.yml) for:

every pull request
every push to main
Pipeline:

npm ci
npm run lint — ESLint / Next best practices
npm test — Vitest unit tests (filter/sort helpers)
npm run build — production build must succeed
Why this CI: it catches broken types/UI contracts early, keeps main releasable, and shows engineering discipline without overbuilding a huge pipeline.

Getting started
Requirements
Node.js 20.9+
npm
Run locally

npm install
npm run dev
Open http://localhost:3000.

Scripts

npm run dev      # development server
npm run build    # production build
npm run start    # run production build
npm run lint     # ESLint
npm test         # Vitest unit tests
Sample flows to try
Home → Explore neighborhoods
Filter district=east and sort by transitScore
Open Harbor Line
Keyboard-only: Tab to skip link, then through header, filters, and results