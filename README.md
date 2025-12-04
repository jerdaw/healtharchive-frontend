# HealthArchive.ca – Frontend

This repository contains the frontend code for **HealthArchive.ca**, an independent, non-governmental archive of Canadian public health information and data.

The goal of HealthArchive.ca is to provide stable, transparent access to historical versions of key public health web content (for example, pages from the Public Health Agency of Canada and Health Canada), so that clinicians, researchers, journalists, and the public can see what was published at specific points in time even after pages change or disappear.

> **Status:** Early development  
> This repository currently powers a static landing page and demo search/browse experience for https://healtharchive.ca.  
> The archive infrastructure (crawling, storage, replay, and search) is being developed separately.

---

## Project goals

- Preserve historical versions of important Canadian public health web content.
- Provide a clear, usable interface for searching and viewing archived pages.
- Document methods, coverage, and limitations in a transparent way.
- Maintain a non-partisan, independent stance focused on data continuity.

---

## Repository scope

This repo is focused on:

- The **public-facing website** at `healtharchive.ca`
- Static assets (HTML, CSS, JavaScript, images, SVGs)
- Later: any frontend framework code (e.g., Next.js) if the project evolves beyond a purely static site

The **archiving and backend infrastructure** (e.g., crawlers, WARCs, pywb, search index) will live in separate repositories.

---

## Current frontend features

### Landing page

The main landing page (`index.html`) provides:

- A high-level description of the project and its motivation.
- A simple demo search box wired to a small placeholder dataset.
- Status information about the project.
- A “For researchers” section explaining intended research use cases, citation patterns, and limitations.

### Demo search and browse (Phase 1)

The initial demo archive is intentionally small and static:

- `data/demo-records.json` contains a curated set of example records that simulate archived pages from:
  - Public Health Agency of Canada (PHAC)
  - Health Canada
- `search.html` + `search.js` provide a simple, client-side search over the demo records:
  - Keyword matching across title, snippet, topics, and source.
  - Optional filtering by source via query string (e.g., `?q=covid&source=PHAC`).
- `browse.html` + `browse.js` provide a “browse by source” view:
  - Groups records by source.
  - Shows counts, example topics, and date ranges per source.
  - Links back into `search.html` filtered by that source.
- `demo-archive/` contains HTML stubs representing “archived” pages:
  - These are placeholders used purely for UI development.
  - In a real deployment, they would be replaced by content served from an archive replay layer (e.g., pywb backed by WARC files).

This setup keeps the frontend simple while making it clear how a real archive-backed implementation will behave.

---

## Development (Phase 0 / static site)

During the initial phase, the site is a simple static frontend:

- Hosted via GitHub Pages under the `healtharchive.ca` domain.
- Implemented with plain HTML, CSS, and vanilla JavaScript for maximum simplicity and reliability.
- Designed to present:
  - A clear description of the project.
  - High-level methodology.
  - Current project status.
  - Contact/follow information.
  - A demo search/browse interface built on placeholder data.

As the project matures, this repository may be upgraded to use a modern framework (e.g., Next.js) while still deploying as a static site where possible.

---

## Planned features (Phase 3+ – **not implemented yet**)

These are explicit TODOs and are **not** implemented in the current frontend. They will require backend/archive support as well:

- **Snapshot version history**
  - Per-URL timelines of captures, exposed in the UI and via metadata.
  - Ability to view “all snapshots” for a given URL over time.

- **Text diff and comparison UI**
  - Side-by-side comparison of two archived snapshots.
  - Highlighting of changed, added, and removed text.
  - Support for “before/after” views around key dates (e.g., policy changes, guideline updates).

- **Programmatic change exports**
  - Machine-readable descriptions of changes (e.g., JSON/CSV exports) for selected URLs or topics.
  - Designed to support research workflows (e.g., reproducible analyses or audits of guideline evolution).

- **Research-friendly APIs (subject to resources)**
  - Lightweight endpoints for querying snapshot metadata (e.g., list of captures for a URL, basic search over titles/snippets).
  - Rate limiting and sustainability constraints documented explicitly.

The **“For researchers”** section on the landing page describes these as planned capabilities and clarifies that they are not active yet. Implementation details and technical documentation will be added once the underlying archive and index infrastructure is ready.

---

## Deployment

The site is deployed using **GitHub Pages**:

1. The `main` branch is configured as the Pages source.
2. The custom domain `healtharchive.ca` is attached in the repository’s Pages settings.
3. HTTPS is enforced once GitHub has issued a certificate for the domain.

To update the live site, make changes on `main` (or merge PRs into `main`) and GitHub Pages will redeploy automatically.

---

## Contributing

In this early stage the project is primarily experimental and under active design. If you are interested in contributing:

- Open an issue to discuss proposed changes or improvements.
- Keep the tone neutral, factual, and focused on data continuity rather than partisan positions.
- Aim for accessibility (WCAG 2.1 AA where practical), performance, and clarity.
- For research-focused suggestions, consider:
  - How the feature would affect long-term maintenance costs.
  - How it impacts reproducibility, transparency, and interpretability of archived content.

Additional contributing guidelines will be added as the project grows.

---

## License

This repository is licensed under the **MIT License**. See the [`LICENSE`](LICENSE) file for details.

> Note: This license applies to the **code and site assets** in this repository.  
> It does **not** change the copyright status of any underlying government or third-party content that may be referenced or linked from the site.

