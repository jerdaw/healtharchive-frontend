import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export default function ArchivePage() {
  return (
    <PageShell
      title="Archive explorer (demo)"
      intro="This page will host the interactive explorer for archived public health pages. For now, it describes the planned search and browse experience using a small demo dataset."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        <section className="ha-card ha-section">
          <h2 className="ha-section-heading">Search and filter archived pages</h2>
          <div className="ha-section-body">
            <p>
              The archive explorer is intended to support full-text search across
              selected public health domains, with filters for:
            </p>
            <ul className="ha-list-disc">
              <li>Source agency (for example, PHAC, Health Canada).</li>
              <li>Topic tags (COVID-19, influenza, naloxone, mpox, climate and health).</li>
              <li>Capture date ranges and time windows.</li>
            </ul>
            <p>
              Each result will link to a specific snapshot of a page, clearly labelled
              with capture timestamp and original URL, and presented in an archive viewer
              that emphasizes that content may be outdated or superseded.
            </p>
            <p className="ha-muted">
              In the early demo phases, search will operate over a small curated dataset
              to illustrate behaviour before full-scale indexing is in place.
            </p>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="ha-card ha-section">
            <h2 className="ha-section-heading">Browse by source</h2>
            <div className="ha-section-body">
              <p>
                Some users will prefer to start from a specific agency or topic. A{" "}
                <Link
                  href="/archive/browse-by-source"
                  className="text-sky-700 hover:text-sky-900"
                >
                  browse by source
                </Link>{" "}
                view will summarize coverage with:
              </p>
              <ul className="ha-list-disc">
                <li>Counts of archived pages per agency and topic.</li>
                <li>First and most recent capture dates.</li>
                <li>Quick links into the archive explorer for that subset.</li>
              </ul>
            </div>
          </section>

          <section className="ha-card ha-section">
            <h2 className="ha-section-heading">Snapshot pages</h2>
            <div className="ha-section-body">
              <p>
                Every record in the explorer will open a dedicated snapshot view showing:
              </p>
              <ul className="ha-list-disc">
                <li>The archived page itself (replayed where possible).</li>
                <li>Capture timestamp and original URL.</li>
                <li>
                  Source agency and basic metadata (for example, topics, language).
                </li>
                <li>
                  Prominent disclaimers indicating that the snapshot may no longer match
                  current official guidance.
                </li>
              </ul>
            </div>
          </section>
        </aside>
      </div>
    </PageShell>
  );
}

