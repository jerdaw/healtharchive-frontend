## 1. High-level project summary

**Project name:** HealthArchive.ca frontend
**Goal:** Public-facing web UI for an independent archive of Canadian public health websites.

Core ideas:

* Preserve **snapshots** of Canadian public health pages (e.g., PHAC, Health Canada).
* Allow users to:

  * Browse/search snapshots by **keywords**, **source**, and **topic**.
  * Open a **snapshot viewer** that:

    * Shows clear metadata: source, capture date, topics, original URL.
    * Embeds the captured page (demo: static HTML in `/public/demo-archive`).
* Be **explicitly non-governmental** and **non-authoritative**:

  * Repeated disclaimers.
  * Clear separation between current guidance (official websites) vs archival record.

You’re joining after:

* The project has been fully migrated from a static HTML/CSS site to a **Next.js 16 App Router** app.
* A small demo dataset is wired through:

  * A search UI (`/archive`) and browse-by-source UI (`/archive/browse-by-source`).
  * A snapshot viewer route (`/snapshot/[id]`).
* Deployment is live on **Vercel**, with **Namecheap DNS** pointing at Vercel.

---

## 2. Tech stack & versions

* **Framework:** Next.js 16.x (App Router)
* **Language:** TypeScript
* **Styling:**

  * TailwindCSS is installed and available.
  * But primary design is expressed via **hand-written CSS utility classes** with `.ha-*` prefixes in `src/app/globals.css`.
  * Tailwind is used selectively for layout/spacing/typography (e.g., `flex`, `grid`, `text-sm`).
* **Package manager:** npm
* **Build tooling:** PostCSS + Tailwind, Next’s Turbopack dev server.

Key commands:

```bash
# Dev
npm run dev

# Build
npm run build

# Production start (typically handled by Vercel)
npm start
```

---

## 3. Git & branch history

**Repo:** `github.com/jerdaw/healtharchive-frontend`

Branches:

* `main`

  * **Current production** branch.
  * Contains the **Next.js app** plus a markdown `README-static-legacy.md` describing the old static site.

* `next`

  * Was used as the working branch for the Next.js migration.
  * Has now been **fast-forward merged into `main`**.

* `static-legacy`

  * Frozen snapshot of the original static site (HTML/CSS/JS).
  * Kept for reference only.

Migration steps already done:

* Old assets (`index.html`, `browse.html`, `search.html`, old `styles.css`, etc.) have been deleted or moved.
* Demo HTML pages moved from `demo-archive/**` → `public/demo-archive/**`.
* Old `README.md` renamed to `README-static-legacy.md`.
* New `README.md` is the Next.js-focused one.

---

## 4. Current repo structure (high-level)

From the repo root:

```text
.
├── README.md                  # Next.js app README (current)
├── README-static-legacy.md    # Old static site README (historic)
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.mjs
├── postcss.config.mjs
├── eslint.config.mjs
├── next-env.d.ts
├── public/
│   ├── healtharchive-logo.webp    # Primary logo used in header
│   ├── demo-archive/
│   │   ├── hc/
│   │   │   ├── 2022-09-30-water-quality.html
│   │   │   ├── 2023-04-20-naloxone.html
│   │   │   ├── 2024-03-05-food-recalls.html
│   │   │   └── 2024-11-01-covid-vaccines.html
│   │   └── phac/
│   │       ├── 2022-12-01-hiv-surveillance.html
│   │       ├── 2023-06-15-climate-health.html
│   │       ├── 2023-10-01-flu-recs-en.html
│   │       ├── 2023-10-01-flu-recs-fr.html
│   │       ├── 2024-07-10-mpox-update.html
│   │       └── 2025-02-15-covid-epi.html
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── window.svg
│   ├── vercel.svg
│   └── styles.css                 # Basic CSS used by the stock Next starter (not heavily used)
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── globals.css
    │   ├── favicon.ico
    │   ├── page.tsx
    │   ├── archive/
    │   │   ├── page.tsx
    │   │   └── browse-by-source/
    │   │       └── page.tsx
    │   ├── methods/
    │   │   └── page.tsx
    │   ├── researchers/
    │   │   └── page.tsx
    │   ├── about/
    │   │   └── page.tsx
    │   ├── contact/
    │   │   └── page.tsx
    │   └── snapshot/
    │       └── [id]/
    │           └── page.tsx
    ├── components/
    │   └── layout/
    │       ├── Header.tsx
    │       ├── Footer.tsx
    │       └── PageShell.tsx
    ├── data/
    │   └── demo-records.ts
    └── assets/
        ├── healtharchive-favicon.ico
        ├── healtharchive-logo.webp
        └── healtharchive-logo.xcf
```

---

## 5. Styling & design system

### 5.1 Tailwind setup

`tailwind.config.mjs`:

* `content` points to `./src/app/**/*.{js,ts,jsx,tsx,mdx}` and `./src/components/**/*.{js,ts,jsx,tsx,mdx}`.
* Custom theme includes:

  * `container` config (centered, padded, max width ~1120px at 2xl).
  * Extended `colors`:

    * `ha-bg`, `ha-card`, `ha-border`, `ha-accent`, `ha-accent-soft`, `ha-muted`, `ha-danger`.
  * Custom `boxShadow` (`ha-soft`) and `borderRadius.2xl`.

Tailwind is mainly used for:

* Layout: `flex`, `grid`, `gap-*`, `px-*`, `py-*`, `max-w-*`.
* Typography: `text-sm`, `text-xs`, `font-semibold`.
* Utilities: `border`, `rounded-full`, `shadow-sm`, etc.

### 5.2 Global CSS & `.ha-*` classes

`src/app/globals.css`:

* Imports Tailwind via `@import "tailwindcss";`.
* Defines design tokens as CSS variables on `:root`:

  * `--page-bg`, `--card-bg`, `--border`, `--text`, `--muted`, `--accent`, `--accent-hover`, `--brand`, `--brand-subtle`, `--font-sans`.
* Base reset & `body` styling (background, font family).
* Global link styles.

Then defines a small **design system** with `.ha-*` classes:

* Layout & typography:

  * `.ha-main`, `.ha-page-title`, `.ha-hero`, `.ha-hero-inner`, etc.
* Buttons:

  * `.ha-button-primary`, `.ha-button-secondary` (older classes).
  * **In newer components** we use `.ha-btn-primary`, `.ha-btn-secondary`, `.ha-badge`, `.ha-callout`, `.ha-eyebrow`, `.ha-grid-2`, `.ha-grid-3`, `.ha-section-heading`, `.ha-section-subtitle`.
  * These classes are referenced in JSX, so any new components should either:

    * Reuse these, or
    * Extend the design system in `globals.css`.
* Cards:

  * `.ha-card`, `.ha-card-title`, `.ha-card-meta`, `.ha-card-body`.
* Tags/chips:

  * `.ha-tag` and `.ha-badge` for visual chips.
* Footer:

  * `.ha-footer`, `.ha-footer-inner`, `.ha-footer-disclaimer`, `.ha-footer-meta`.
* Responsive tweaks for small viewports, especially header, nav, and hero.

Accessibility-related helpers:

* Global `a:focus-visible` outline using the brand color.
* `.ha-btn-primary` / `.ha-btn-secondary` include `:focus-visible` outlines.
* `.ha-card` transitions are disabled under `prefers-reduced-motion: reduce`.

**Important:** There was previously a Tailwind class usage like `bg-ha-bg` that broke Tailwind validation. That’s been removed; we now use pure CSS classes for colors (`ha-*`) instead of Tailwind’s `bg-*` custom colors in `globals.css`.

---

## 6. Core layout components

### 6.1 Root layout: `src/app/layout.tsx`

Responsibility:

* Global `<html>` and `<body>`.
* Apply base typography via `className="antialiased"`.
* Render persistent **Header** and **Footer** around the route content.

Structure:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-slate-900 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main
          id="main-content"
          className="pt-20 pb-10 sm:pt-24 sm:pb-12"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### 6.2 `<Header />`: `src/components/layout/Header.tsx`

* `"use client"` component, uses:

  * `usePathname()` from `next/navigation` to highlight the active nav item.
  * A **mobile menu** toggled by local `useState`.

Key features:

* Logo block with:

  * `next/image`-rendered logo (`/public/healtharchive-logo.webp`).
  * Project title “HealthArchive.ca” in a brand blue (`#11588f`).
  * Subtitle “Independent archive of Canadian public health information”.
* “Early demo” pill next to logo on desktop.
* Desktop nav: `Home`, `Browse`, `Methods`, `Researchers`, `About`, `Contact`.

  * Active link styling vs inactive (blue background for active).
  * `aria-current="page"` set on the active link.
  * `aria-label="Primary"` on the `<nav>` for semantic clarity.
* Mobile nav:

  * Compact button that toggles between hamburger and X icon.
  * `aria-expanded`, `aria-controls`, and `aria-label` updated based on open state.
  * When open, a vertical nav list, using the same active styling and closing the menu on click.
* Mobile nav:

  * Compact button that toggles between hamburger and X icon.
  * When open, a vertical nav list, using the same active styling and closing the menu on click.

### 6.3 `<Footer />`: `src/components/layout/Footer.tsx`

* Single component at the bottom of every page.
* Provides:

  * Long disclaimer about independence and non-affiliation with government.
  * Dynamic year.
  * Statement: “Not an official government website.”
  * Extra note about early demo phase.

### 6.4 `<PageShell />`: `src/components/layout/PageShell.tsx`

* Shared wrapper for inner pages (everything except the home page).
* Props:

  * `title: string`
  * `intro?: string`
  * `eyebrow?: string`
  * `children: ReactNode`
* Responsibilities:

  * Provide consistent **page header** layout (eyebrow, title, intro).
  * Wrap content in a `.ha-container` and apply standard spacing.

Usage pattern:

```tsx
<PageShell
  eyebrow="Methods & coverage"
  title="How HealthArchive.ca is being built"
  intro="This page outlines..."
>
  {/* Page body sections here */}
</PageShell>
```

---

## 7. Data model & demo dataset

### 7.1 DemoRecord type

`src/data/demo-records.ts` defines:

```ts
export type DemoRecord = {
  id: string;            // slug used in /snapshot/[id]
  title: string;
  sourceCode: "phac" | "hc";
  sourceName: string;
  language: string;
  topics: string[];
  captureDate: string;   // YYYY-MM-DD
  originalUrl: string;
  snapshotPath: string;  // path under /public
  snippet: string;
};
```

Key fields:

* `id`: unique ID of snapshot, used in URL path `/snapshot/[id]`.
* `snapshotPath`: relative path to static HTML in `/public/demo-archive/...`.
* `topics`: an array of topic tags used for filtering and badges.

### 7.2 Demo data records

`demoRecords` array includes sample records from:

* `phac` (Public Health Agency of Canada)

  * COVID epi update
  * NACI influenza recommendations (EN/FR)
  * Mpox update
  * HIV surveillance
  * Climate change & health
* `hc` (Health Canada)

  * COVID-19 vaccines (industry/vaccine page)
  * Naloxone info
  * Food recall warnings
  * Drinking water quality guidelines

Each record’s `snapshotPath` is a valid file in `public/demo-archive/**`.

### 7.3 Helper functions

All in `src/data/demo-records.ts`:

1. **`searchDemoRecords(params: SearchParams): DemoRecord[]`**

   ```ts
   export type SearchParams = {
     q?: string;
     source?: string;
     topic?: string;
   };
   ```

   Logic:

   * `source`: if provided, filters `record.sourceCode === source`.
   * `topic`: if provided, filters `record.topics.includes(topic)`.
   * `q`: if not provided, returns all records passing above filters.
   * If `q` provided:

     * Normalize to lowercase.
     * Build a haystack string from:

       * `title`, `snippet`, `sourceName`, `topics.join(" ")`, `language`.
     * Check if haystack contains normalized `q`.

2. **`getSourcesSummary(): SourceSummary[]`**

   ```ts
   export type SourceSummary = {
     sourceCode: string;
     sourceName: string;
     recordCount: number;
     firstCapture: string;
     lastCapture: string;
     topics: string[];
     latestRecordId: string | null;
   };
   ```

   * Aggregates `demoRecords` grouped by `sourceCode`.
   * Tracks first/last capture, total records, unique topics, and the ID of the latest record.
   * Returns array sorted by `sourceName`.

3. **`getAllTopics(): string[]`**

   * Collects all topics from all records into a Set, returns sorted alphabetically.

4. **`getRecordById(id: string)`**

   * Finds a single record by `id` or returns `undefined`.

---

## 8. Routes & pages

### 8.1 Home page `/` – `src/app/page.tsx`

* Uses `demoRecords` to compute:

  * `recordCount = demoRecords.length`
  * `sourceCount = unique sourceName count`
* Content:

  1. **Hero section:**

     * H1: “See what Canadian public health websites used to say…”
     * Paragraph describing project.
     * “Early development” pill.
     * Buttons:

       * `Browse demo archive` → `/archive`
       * `Methods & scope` → `/methods`

  2. **Side card: “Project snapshot”**

     * Displays sample record and source counts.
     * Summaries for focus and intended users.

  3. **“Who is this for?” section**

     * Three cards for:

       * Clinicians & public health practitioners
       * Researchers & data journalists
       * Members of the public

  4. **“What is HealthArchive.ca?” section**

     * Explains independence and non-governmental status.
     * Simple link to `/methods`.

  5. **Callout: “What this demo is (and isn’t)”**

     * Bullet list clarifying demo scope and limitations.

### 8.2 Archive search `/archive` – `src/app/archive/page.tsx`

* Async server component using App Router pattern where `searchParams` is a **Promise**:

  ```ts
  type ArchiveSearchParams = { q?: string; source?: string; topic?: string; };

  export default async function ArchivePage({ searchParams }: { searchParams: Promise<ArchiveSearchParams>; }) {
    const params = await searchParams;
    const q = params.q?.trim() ?? "";
    const source = params.source?.trim() ?? "";
    const topic = params.topic?.trim() ?? "";

    const allTopics = getAllTopics();
    const results = searchDemoRecords({ q, source, topic });
    ...
  }
  ```

* Uses `<PageShell>` with:

  * Eyebrow: “Archive explorer (demo)”
  * Title: “Browse & search demo snapshots”
  * Intro explaining it’s a prototype.

* Layout:

  * `grid` with two columns on large screens:

    1. Left: **Filters panel** (inside `.ha-card`).
    2. Right: **Search box + results list**.

#### Filters panel

* Filter form (`method="get"`) with controls:

  * Keywords (`input name="q"`).
  * Source (`select name="source"` with values `""`, `"phac"`, `"hc"`).
  * Topic (`select name="topic"` built from `getAllTopics()`).

* “Apply filters” button (`type="submit"`).

* “Clear” link resets to `/archive`.

#### Search box & results

* Top card shows:

  * “Search results” header.
  * Summary text: “X demo snapshot(s) matching “q””.

* Secondary search form that:

  * Reuses `q` but preserves `source` and `topic` via hidden inputs.
  * Allows user to quickly adjust keywords without re-choosing filters.

* Results list:

  * If empty: show explanatory message.
  * Else: for each `record`:

    * Article with `.ha-card ha-card-elevated`:

      * Title (link to `/snapshot/${record.id}`).
      * Meta line: `sourceName · captured {formatted date} · language`.
      * “View snapshot” button linking to same snapshot.
      * Snippet paragraph.
      * Original URL line.
      * Topic badges (`record.topics`).

### 8.3 Browse by source `/archive/browse-by-source` – `src/app/archive/browse-by-source/page.tsx`

* Server component using `getSourcesSummary()`.

* `<PageShell>` with:

  * Eyebrow: “Archive explorer (demo)”
  * Title: “Browse demo records by source”

* Displays a `.ha-grid-2` of cards, one per source:

  * Card shows:

    * `sourceName`
    * “N demo snapshots captured between [first] and [last]”.
    * Top ~6 topics as badges + “+N more” if more topics exist.
    * Buttons:

      * “Browse records” → `/archive?source=${sourceCode}`
      * “View latest snapshot →” → `/snapshot/${latestRecordId}` (if exists).

### 8.4 Methods `/methods` – `src/app/methods/page.tsx`

* Explains:

  * Scope of the archive (early phase).
  * Capture methods (conceptual pipeline).
  * Storage & replay strategy (WARC, pywb, etc.).
  * Limitations and interpretation in a callout.

All text is stable, but can be refined later.

### 8.5 Researchers `/researchers` – `src/app/researchers/page.tsx`

* Sections:

  * Use cases:

    * Policy/guideline history, reproducibility, media studies, audit/accountability.
  * Working with demo archive:

    * Small curated dataset + search interface + snapshot stubs.
  * Citation guidance:

    * Provides a suggested citation format.
  * Planned future capabilities (callout):

    * Version history, diff views, machine-readable exports, APIs.

### 8.6 About `/about` – `src/app/about/page.tsx`

* Explains motivations, independence/non-partisanship, and current project status.

### 8.7 Contact `/contact` – `src/app/contact/page.tsx`

* Two cards:

  * Email: `contact@healtharchive.ca` (placeholder).
  * GitHub: `https://github.com/jerdaw/healtharchive-frontend`.

### 8.8 Snapshot viewer `/snapshot/[id]` – `src/app/snapshot/[id]/page.tsx`

* Async server component with `params` as **Promise** (Next 16 dynamic API).

  ```ts
  export default async function SnapshotPage({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;
    const record = getRecordById(id);

    if (!record) {
      return notFound();
    }

    // Render PageShell + metadata + iframe
  }
  ```

* Uses `<PageShell>` with:

  * Eyebrow: “Archived snapshot (demo)”
  * Title: `record.title`
  * Intro: Explains this is a demo view.

* Layout: `.ha-grid-2`:

  1. Left column:

     * **Metadata card**:

       * Capture date.
       * Explanation that it’s a static demo snapshot.
       * Details: Source, capture date, language, original URL.
       * Topics as badges.
       * Buttons:

         * Back to `/archive`.
         * “Open raw snapshot” (link to `record.snapshotPath`, opens in new tab).
     * **Important note callout**:

       * Emphasizes archival, outdated nature; not current guidance.

  2. Right column:

     * **Viewer card** with:

       * Header: “Archived content · served from {snapshotPath} for this demo.”
       * `<iframe src={record.snapshotPath} ...>` to render static HTML.

* **Important**: `snapshotPath` is relative to `/public`, but used as absolute path in `href`/`src` (e.g., `/demo-archive/hc/2024-11-01-covid-vaccines.html`).

---

## 9. Deployment & DNS

### 9.1 Vercel project

* Project: `healtharchive` on Vercel.
* Connected to GitHub repo: `jerdaw/healtharchive-frontend`.
* Production branch: `main`.
* Build settings:

  * Root Directory: repo root.
  * Framework Preset: Next.js.
  * Build Command: `npm run build` (default).
  * Install Command: `npm install` (default).
  * Output Directory: `.next` (handled automatically by Vercel).

### 9.2 Domains (Vercel side)

* `healtharchive.vercel.app` – Vercel default URL (valid, production).
* `healtharchive.ca` – apex domain (Configured via A record).
* `www.healtharchive.ca` – CNAME to Vercel DNS host.

Vercel expects:

* `A @ 216.198.79.1` (apex).
* `CNAME www → ba6b8a306401d981.vercel-dns-017.com.` (or similar `vercel-dns-*` host).

### 9.3 Namecheap DNS configuration

Under **Advanced DNS** for `healtharchive.ca`:

Host Records:

* `A @ 216.198.79.1`
  → Points apex to Vercel.

* `CNAME www ba6b8a306401d981.vercel-dns-017.com.`
  → Points `www` subdomain to Vercel.

* TXT SPF record for email (unchanged).

Old GitHub Pages `A @ 185.199.*` records have been **removed**.

---

## 10. Phase summary (what’s done vs future)

We followed an 8-phase plan. Status:

* **Phase 0 – Repo & environment**

  * ✅ Branch strategy: `main` (prod), `static-legacy` (old site), `next` (development, now merged).
  * ✅ Node + npm + TS + Tailwind set up.

* **Phase 1 – Scaffold Next.js app**

  * ✅ Next.js 16 App Router app created.
  * ✅ Typescript and Tailwind integrated.
  * ✅ Basic dev server works.

* **Phase 2 – Global layout & navigation shell**

  * ✅ `<Header>`, `<Footer>`, `<PageShell>` created.
  * ✅ Navigation items finalized.
  * ✅ Disclaimer in Footer.

* **Phase 3 – Page skeletons & content migration**

  * ✅ Routes `/`, `/archive`, `/archive/browse-by-source`, `/methods`, `/researchers`, `/about`, `/contact` created.
  * ✅ Original single-page content split and restructured into these routes.

* **Phase 4 – Data model & demo API**

  * Partially integrated directly into server components instead of separate `/api` routes.
  * ✅ `DemoRecord` type, demo data, and helper functions created in `src/data/demo-records.ts`.
  * ⏳ Could still add `/api/search` and `/api/sources` for client-side data fetching if desired.

* **Phase 5 – Archive UI**

  * ✅ `/archive` implemented with server-side filtering via URL `searchParams`.
  * ✅ Filters panel + search box + results list.
  * ✅ `/archive/browse-by-source` implemented using `getSourcesSummary`.

* **Phase 6 – Snapshot demo pages**

  * ✅ `/snapshot/[id]` route implemented with metadata and iframe viewer.
  * ✅ Static snapshot HTML files wired via `snapshotPath` and stored in `public/demo-archive/**`.

* **Phase 7 – Design system & polish**

  * ✅ Basic design system (.ha-* classes) in `globals.css`.
  * ✅ Layout reasonably modern and coherent.
  * ⏳ Further polish (e.g., more advanced responsive tweaks, accessibility audit) still possible.

* **Phase 8 – Deployment & DNS**

  * ✅ Next.js app deployed to Vercel.
  * ✅ GitHub integration configured.
  * ✅ `healtharchive.ca` and `www.healtharchive.ca` pointed to Vercel.

---

## 11. Known patterns & gotchas for future work

* **Next 16 dynamic APIs:**

  * `searchParams` and `params` are **Promises** and must be `await`ed in server components:

    * We already fixed:

      * `ArchivePage({ searchParams }: { searchParams: Promise<ArchiveSearchParams> })`.
      * `SnapshotPage({ params }: { params: Promise<{ id: string }> })`.
* **Styling mix:**

  * There’s a hybrid of Tailwind utilities and `.ha-*` CSS classes.
  * When adding new UI elements:

    * Prefer using existing `.ha-*` primitives for visual consistency.
    * Use Tailwind mostly for layout/spacing tweaks.
* **No real backend yet:**

  * All data is static (`demoRecords` array).
  * No `/api` routes currently — everything is server-rendered using local data.
* **Accessibility primitives:**

  * Skip link to `#main-content` before the header.
  * Main content wrapped in a `<main id="main-content">` landmark.
  * `aria-current="page"` for active nav links, and labeled primary nav.
  * Focus-visible outlines on buttons, links, and nav items using the brand color.
  * `prefers-reduced-motion` respected for card transitions.

---

## 12. Suggested future directions (for the next LLM)

If you’re continuing dev, some clear next steps could be:

1. **Introduce real API routes**:

   * `/api/search` and `/api/sources` reusing the logic in `demo-records.ts`.
   * Convert `/archive` UI into a `"use client"` component that fetches from these APIs (to support filtering without full SSR reloads).

2. **Version history & timeline UI**:

   * Extend `DemoRecord` with `urlGroup` or similar.
   * Add a “View timeline” link on snapshot cards to show capture history for a given URL.

3. **Improved topic handling**:

   * Add grouping or hierarchy for topics (e.g., Infectious diseases → Respiratory → COVID-19).

4. **Accessibility audit**:

   * A first pass has been completed (skip link, nav landmarks, focus-visible styles, and basic ARIA).
   * Future work could include automated testing (e.g., axe), screen reader testing across platforms, and deeper contrast audits.

5. **Analytics / logging** (if desired):

   * E.g., simple pageview tracking or logging to a privacy-respecting service.

---

## 13. Command to print all project file paths & contents

The user specifically wanted this in the outline.

⚠️ **This will be huge** if you include `node_modules` or `.git`. You almost never want that. Use exclusions.

From the repo root, a **safer** command that prints **all tracked project files except some heavy directories**:

```bash
# From /path/to/healtharchive-frontend
find . \
  \( -path "./node_modules" -o -path "./.next" -o -path "./.git" \) -prune -false -o \
  -type f \
  -print0 | while IFS= read -r -d '' f; do
    echo "=== $f ==="
    cat "$f"
    echo
  done
```

Explanation:

* `find .` – start at repo root.
* `\( -path "./node_modules" -o -path "./.next" -o -path "./.git" \) -prune -false -o`:

  * Prunes `node_modules`, `.next`, and `.git` entirely.
* `-type f` – only regular files.
* `-print0 | while ...` – iterates filenames robustly even if they contain spaces.
* For each file:

  * Prints a header `=== path ===`.
  * `cat`s the file contents.
  * Adds a blank line separator.

You can hand this command plus the repo to another LLM if you want it to see all file contents programmatically.
