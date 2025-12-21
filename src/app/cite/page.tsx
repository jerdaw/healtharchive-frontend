import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";

export default function CitePage() {
  return (
    <PageShell
      eyebrow="Cite"
      title="How to cite HealthArchive.ca"
      intro="Pragmatic citation guidance for archived snapshots and compare views."
    >
      <section className="ha-home-hero space-y-5">
        <h2 className="ha-section-heading">Important note</h2>
        <p className="ha-section-subtitle ha-section-lede leading-relaxed">
          These citations refer to archived content — not current guidance.
        </p>
        <div className="ha-callout">
          <h3 className="ha-callout-title">Download / print</h3>
          <p className="mt-2 text-xs leading-relaxed sm:text-sm">
            <a
              className="font-medium text-ha-accent hover:text-blue-700"
              href="/partner-kit/healtharchive-citation.md"
            >
              Download citation handout (Markdown)
            </a>
            {" "}or use your browser’s print dialog to save as PDF.
          </p>
        </div>
      </section>

      <section className="ha-home-hero ha-home-hero-plain space-y-5">
        <h2 className="ha-section-heading">1) Cite a snapshot</h2>
        <p className="ha-section-subtitle ha-section-lede leading-relaxed">
          Recommended format
        </p>
        <div className="ha-card ha-home-panel p-4 sm:p-5 text-xs text-slate-800 sm:text-sm space-y-1">
          HealthArchive.ca Project. “&lt;Page title&gt;” (snapshot from &lt;capture
          date/time&gt;). Archived copy of &lt;source organization&gt; web page
          (&lt;original URL&gt;). Accessed &lt;access date&gt;. Available from:
          &lt;HealthArchive snapshot URL&gt;.
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-ha-muted">
          Example
        </p>
        <div className="ha-card ha-home-panel p-4 sm:p-5 text-xs text-slate-800 sm:text-sm space-y-1">
          HealthArchive.ca Project. “COVID-19 epidemiology update: Canada”
          (snapshot from 2025-02-15 00:00 UTC). Archived copy of Public Health
          Agency of Canada web page (https://www.canada.ca/...). Accessed
          2025-12-03. Available from: https://www.healtharchive.ca/snapshot/12345.
        </div>
        <ul className="list-disc pl-5 text-sm sm:text-base text-ha-muted leading-relaxed space-y-1">
          <li>Use the exact snapshot URL you visited.</li>
          <li>Use the capture timestamp shown on the snapshot page (UTC).</li>
          <li>Always cite the original URL as well.</li>
        </ul>
      </section>

      <section className="ha-home-hero ha-home-hero-plain space-y-5">
        <h2 className="ha-section-heading">2) Cite a compare view</h2>
        <p className="ha-section-subtitle ha-section-lede leading-relaxed">
          Compare views highlight descriptive text differences between two
          archived captures of the same page.
        </p>
        <div className="ha-card ha-home-panel p-4 sm:p-5 text-xs text-slate-800 sm:text-sm space-y-1">
          HealthArchive.ca Project. “Comparison of archived captures” (from snapshot
          &lt;ID A&gt; to snapshot &lt;ID B&gt;). Archived copies of &lt;source
          organization&gt; web page (&lt;original URL&gt;). Accessed &lt;access
          date&gt;. Available from:
          https://www.healtharchive.ca/compare?from=&lt;ID A&gt;&amp;to=&lt;ID B&gt;.
        </div>
        <ul className="list-disc pl-5 text-sm sm:text-base text-ha-muted leading-relaxed space-y-1">
          <li>Compare output is descriptive only and does not interpret meaning.</li>
          <li>
            Record both snapshot IDs and the capture timestamps shown on the
            compare page.
          </li>
        </ul>
      </section>

      <section className="ha-home-hero ha-home-hero-plain space-y-4">
        <div className="ha-callout">
          <h3 className="ha-callout-title">Where to find the citation fields</h3>
          <p className="mt-2 text-xs leading-relaxed sm:text-sm">
            On{" "}
            <span className="font-medium text-slate-800">
              /snapshot/&lt;id&gt;
            </span>{" "}
            you can find the page title, capture date/time (UTC), source
            organization, original URL, and the snapshot URL.
          </p>
          <p className="mt-3 text-xs leading-relaxed sm:text-sm">
            On{" "}
            <span className="font-medium text-slate-800">
              /compare?from=&lt;id&gt;&amp;to=&lt;id&gt;
            </span>{" "}
            you can find both snapshot IDs, both capture timestamps (UTC), the
            original URL, and a descriptive change summary.
          </p>
          <p className="mt-3 text-xs leading-relaxed sm:text-sm">
            Want help finding an example? Start from the{" "}
            <Link
              href="/archive"
              className="font-medium text-ha-accent hover:text-blue-700"
            >
              archive explorer
            </Link>
            {" "}and open any snapshot.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

