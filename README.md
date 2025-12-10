# HealthArchive.ca – Frontend (Next.js)

HealthArchive.ca is an independent, non-governmental project to preserve and surface
historical versions of **Canadian public health web content** (e.g., PHAC, Health Canada).

This repository contains the **Next.js frontend** for the public site at:

- https://healtharchive.ca (production, early demo)
- https://healtharchive.vercel.app (Vercel default domain)

> **Status:** Early demo  
> This frontend currently exposes a small curated demo dataset to prototype the
> archive UI (search, browse, and snapshot viewing). The full crawling / storage /
> replay infrastructure is being built separately.

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

### 2. Run the dev server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm start
```

(In production, Vercel runs the build and serves the app.)

### 4. Lint (recommended)

```bash
npm run lint
```

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
