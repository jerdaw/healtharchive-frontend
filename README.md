# HealthArchive.ca – Frontend (Next.js)

HealthArchive.ca is an independent, non-governmental project to preserve and surface
historical versions of **Canadian public health web content** (e.g., PHAC, Health Canada).

This repository contains the **Next.js frontend** for the public site at:

- https://healtharchive.ca (production, early demo)
- https://healtharchive.vercel.app (Vercel default domain)

> **Status:** Early demo  
> The UI now prefers live backend APIs for search, browse, and snapshot detail
> (configured via `NEXT_PUBLIC_API_BASE_URL`), and gracefully falls back to the
> bundled demo dataset when the API is unreachable.

---

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:**
  - TailwindCSS for layout/spacing
  - Custom `.ha-*` utility classes in `src/app/globals.css` for the design system
- **Package manager:** npm
- **Hosting:** Vercel

### Key UI/UX features

- Sticky, scroll-aware header that gently condenses on scroll and uses a blurred, translucent background so it stays present without obscuring content.
- Accessible light/dark theme toggle:
  - Uses CSS variables and a `data-theme="light" | "dark"` attribute on `<html>`.
  - Respects the user’s OS preference (`prefers-color-scheme`) on first load.
  - Persists the user’s choice in `localStorage` for subsequent visits.
- Shared `.ha-*` design system for cards, buttons, badges, and page shells to keep the site visually consistent.

---

## Getting started

### 1. Install dependencies

```bash
npm install
````

### 2. Configure API base URL

Create a `.env` (copy from `.env.example`) to point the frontend at a live backend. By default the API client falls back to `http://localhost:8001`.

```bash
cp .env.example .env
# edit .env and set NEXT_PUBLIC_API_BASE_URL if your backend is not on localhost:8001
```

### 3. Run the dev server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

(In production, Vercel runs the build and serves the app.)

### 5. Lint (recommended)

```bash
npm run lint
```

---

## Backend integration overview

- Data sources:
  - Live APIs (preferred): `/api/search`, `/api/sources`, `/api/snapshot/{id}`, `/api/snapshots/raw/{id}`, `/api/health`.
  - Demo fallback: bundled sample records under `src/data/demo-records.ts` and static snapshots under `public/demo-archive/**` when the API is unavailable.
- API client: `src/lib/api.ts` (uses `NEXT_PUBLIC_API_BASE_URL`, defaulting to `http://localhost:8001`).
- Pages:
  - `/archive`: uses backend search with pagination and page-size selection; falls back to demo data and shows a fallback notice.
  - `/archive/browse-by-source`: uses backend source summaries; falls back to demo summaries with a notice.
  - `/snapshot/[id]`: fetches backend snapshot detail/raw URL first; falls back to demo record/static snapshot if needed. The viewer shows a loading overlay and a friendly error state if the iframe fails.

This runs the Next.js/ESLint config for the app.

---

## Project structure (high-level)

```text
.
├── README.md
├── docs/
│   └── documentation.md       # Deep-dive architecture, design, and project state
├── package.json
├── next.config.ts
├── tailwind.config.mjs
├── postcss.config.mjs
├── tsconfig.json
├── public/
│   ├── healtharchive-logo.webp  # Primary logo used in header/hero
│   └── demo-archive/            # Static HTML stubs used by the snapshot viewer
└── src/
    ├── app/                   # Next.js App Router routes
    │   ├── favicon.ico        # Favicon wired via Next metadata
    │   ├── page.tsx           # Home
    │   ├── archive/           # Search & browse
    │   ├── methods/           # Methods & scope
    │   ├── researchers/       # For researchers
    │   ├── about/             # About the project
    │   ├── contact/           # Contact info
    │   └── snapshot/[id]/     # Snapshot viewer
    ├── components/
    │   └── layout/            # Header, Footer, PageShell
    └── data/
        └── demo-records.ts    # Demo dataset + search helpers
```

---

## Deployment

Production is managed via Vercel:

* GitHub repo: [https://github.com/jerdaw/healtharchive-frontend](https://github.com/jerdaw/healtharchive-frontend)
* Production branch: `main`
* Domains:

  * `healtharchive.ca` (apex, A record → Vercel IP)
  * `www.healtharchive.ca` (CNAME → Vercel DNS host)
  * `healtharchive.vercel.app` (default Vercel URL)

Any push to `main` triggers a new Vercel deployment.

---

## Further documentation

* **Architecture & project state:**
  See [`docs/documentation.md`](docs/documentation.md) for a detailed overview
  of the data model, routes, design system, accessibility primitives, and
  planned future phases.
