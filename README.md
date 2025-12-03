# HealthArchive.ca – Frontend

This repository contains the frontend code for **HealthArchive.ca**, an independent, non-governmental archive of Canadian public health information and data.

The goal of HealthArchive.ca is to provide stable, transparent access to historical versions of key public health web content (for example, pages from the Public Health Agency of Canada and Health Canada), so that clinicians, researchers, journalists, and the public can see what was published at specific points in time even after pages change or disappear.

> **Status:** Early development  
> This repository currently powers a static landing page for https://healtharchive.ca. The archive infrastructure (crawling, storage, replay, and search) is being developed separately.

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

## Development (Phase 0 / static site)

During the initial phase, the site is a simple static frontend:

- Hosted via GitHub Pages under the `healtharchive.ca` domain
- Implemented with plain HTML and CSS for maximum simplicity and reliability
- Designed to present:
  - A clear description of the project
  - High-level methodology
  - Current project status
  - Contact/follow information

As the project matures, this repository may be upgraded to use a modern framework (e.g., Next.js) while still deploying as a static site where possible.

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

Additional contributing guidelines will be added as the project grows.

---

## License

This repository is licensed under the **MIT License**. See the [`LICENSE`](LICENSE) file for details.

> Note: This license applies to the **code and site assets** in this repository.  
> It does **not** change the copyright status of any underlying government or third-party content that may be referenced or linked from the site.
