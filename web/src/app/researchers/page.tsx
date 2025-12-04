import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export default function ResearchersPage() {
  return (
    <PageShell
      title="For researchers"
      intro="HealthArchive.ca is being designed to support reproducible research, policy analysis, and accountability work by preserving what public health sites showed at specific points in time."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        {/* Main column */}
        <div className="ha-prose">
          <h2>Use cases this archive aims to support</h2>
          <ul>
            <li>
              <strong>Policy and guideline history:</strong> Tracing how guidance on
              topics like COVID-19, influenza vaccination, naloxone distribution, or mpox
              has changed over time.
            </li>
            <li>
              <strong>Reproducibility of analyses:</strong> Linking analyses to the exact
              wording, tables, and figures visible on a given date, rather than whatever
              a page shows today.
            </li>
            <li>
              <strong>Media and communication studies:</strong> Examining how risk
              communication, disclaimers, or emphasis on specific populations evolved
              across different periods.
            </li>
            <li>
              <strong>Audit and accountability work:</strong> Comparing archived content
              with later messaging to understand shifts in emphasis, framing, or scope.
            </li>
          </ul>

          <h2>Working with the demo archive</h2>
          <p>
            During early development, HealthArchive.ca will provide a small demo dataset
            and interface to illustrate how the archive explorer is intended to work
            before full-scale crawling and storage are in place.
          </p>
          <ul>
            <li>
              A curated set of example records representing public-facing pages from
              federal health sources (for example, PHAC and Health Canada).
            </li>
            <li>
              A search experience that lets you query this demo set by keywords, topics,
              source, and capture date.
            </li>
            <li>
              A “browse by source” view that groups records by agency and topic to
              illustrate how coverage summaries will look.
            </li>
            <li>
              HTML snapshot stubs for each record that show how archived URLs and capture
              labels will be presented.
            </li>
          </ul>

          <h2>Citing HealthArchive.ca</h2>
          <p>
            Until there is a formal citation guide, a practical pattern for citing an
            archived page is:
          </p>
          <p className="font-mono text-xs leading-relaxed text-slate-700">
            HealthArchive.ca Project. &quot;&lt;Page title&gt;&quot; (snapshot from
            &lt;capture date&gt;). Archived copy of &lt;original agency&gt; web page
            (&lt;original URL&gt;). Accessed &lt;access date&gt;. Available from:
            &lt;HealthArchive.ca archived URL&gt;.
          </p>
          <p>
            For example, a citation for a COVID-19 epidemiology snapshot might look like:
          </p>
          <p className="font-mono text-xs leading-relaxed text-slate-700">
            HealthArchive.ca Project. &quot;COVID-19 epidemiology update: Canada&quot;
            (snapshot from 15 Feb 2025). Archived copy of Public Health Agency of Canada
            web page (https://www.canada.ca/…). Accessed 3 Dec 2025. Available from:
            https://healtharchive.ca/&lt;archive-url&gt;.
          </p>

          <h2>Limitations and interpretation</h2>
          <ul>
            <li>
              <strong>Not official guidance:</strong> Archived content reflects what
              public sites showed at capture time. It may be incomplete, outdated, or
              superseded, and should not be treated as current clinical guidance.
            </li>
            <li>
              <strong>Sampling and coverage:</strong> Early phases will focus on specific
              high-value domains and sections. Coverage notes will document what was in
              scope so users do not over-interpret the absence of a page.
            </li>
            <li>
              <strong>Technical artefacts:</strong> Some interactive dashboards, embedded
              visualizations, or third-party assets may not replay perfectly due to
              JavaScript, API, or hosting constraints.
            </li>
          </ul>

          <h2>Planned researcher-focused capabilities</h2>
          <p>
            The project roadmap includes several features specifically aimed at research
            workflows. These are{" "}
            <strong>not implemented in the early frontend demo</strong> but are part of
            the intended design:
          </p>
          <ul>
            <li>
              Snapshot-level version history for individual URLs, exposing a timeline of
              captures for each page.
            </li>
            <li>
              Side-by-side comparison views to highlight textual changes between two
              archived snapshots.
            </li>
            <li>
              Machine-readable exports (for example, JSON/CSV) describing changes over
              time for selected URLs or topics.
            </li>
            <li>
              Lightweight APIs for programmatic querying of snapshot metadata, with rate
              limits and sustainability in mind.
            </li>
          </ul>
        </div>

        {/* Sidebar column */}
        <aside className="space-y-4">
          <section className="ha-card">
            <h2 className="ha-card-title">Quick summary</h2>
            <div className="ha-card-body">
              <p>
                HealthArchive.ca aims to make it easier to see what Canadian public health
                sites showed at specific points in time and to link analyses to concrete,
                timestamped evidence.
              </p>
            </div>
          </section>

          <section className="ha-card">
            <h2 className="ha-card-title">Good fit use cases</h2>
            <div className="ha-card-body">
              <ul className="ha-list-disc">
                <li>Policy and guideline timelines.</li>
                <li>Reproducible data analyses.</li>
                <li>Communication and framing studies.</li>
                <li>Audit and accountability work.</li>
              </ul>
            </div>
          </section>

          <section className="ha-card">
            <h2 className="ha-card-title">Stay in touch</h2>
            <div className="ha-card-body">
              <p>
                As infrastructure and coverage mature, the{" "}
                <Link href="/contact" className="text-sky-700 hover:text-sky-900">
                  contact page
                </Link>{" "}
                will provide details on how to share use cases, request features, or
                discuss collaborations.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </PageShell>
  );
}

