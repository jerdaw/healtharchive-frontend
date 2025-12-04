import { PageShell } from "@/components/layout/PageShell";

export default function MethodsPage() {
  return (
    <PageShell
      title="Methods & coverage"
      intro="A high-level overview of how HealthArchive.ca will capture, store, and replay selected public health web content from Canadian federal sources."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <section className="ha-card ha-section">
          <h2 className="ha-section-heading">Capture</h2>
          <div className="ha-section-body">
            <p>
              The project will use browser-based crawlers to snapshot selected areas of
              federal public health websites. Initial focus will be on sources such as the
              Public Health Agency of Canada and Health Canada, with a priority on pages
              that:
            </p>
            <ul className="ha-list-disc">
              <li>Provide clinical or public-facing guidance.</li>
              <li>
                Contain data tables, dashboards, or regular epidemiological updates.
              </li>
              <li>
                Summarize policies, directives, or surveillance findings that are likely
                to change over time.
              </li>
            </ul>
            <p>
              Capture frequency and scope will be tuned to the stability and importance of
              each resource.
            </p>
          </div>
        </section>

        <section className="ha-card ha-section">
          <h2 className="ha-section-heading">Preserve & replay</h2>
          <div className="ha-section-body">
            <p>
              Captures will be stored in standard web archive formats suitable for
              long-term preservation. A replay service will present archived pages with:
            </p>
            <ul className="ha-list-disc">
              <li>Clear capture timestamps.</li>
              <li>Original URLs and source agency.</li>
              <li>
                Prominent labelling that content may be outdated, incomplete, or
                superseded.
              </li>
            </ul>
            <p>
              Where interactive dashboards or embedded visualizations cannot be fully
              replayed, this will be explicitly noted.
            </p>
          </div>
        </section>

        <section className="ha-card ha-section">
          <h2 className="ha-section-heading">Scope & coverage</h2>
          <div className="ha-section-body">
            <p>
              Early phases will focus on a defined set of domains and paths. Coverage
              notes will describe:
            </p>
            <ul className="ha-list-disc">
              <li>Which domains and sections are in scope.</li>
              <li>Known gaps (for example, missing file types or paths).</li>
              <li>
                Approximate capture windows and frequencies for major content areas.
              </li>
            </ul>
            <p>
              These notes are important so users can correctly interpret what the presence
              or absence of a given page in the archive actually means.
            </p>
          </div>
        </section>

        <section className="ha-card ha-section">
          <h2 className="ha-section-heading">Limitations</h2>
          <div className="ha-section-body">
            <p>
              Even with careful tooling, web archives have intrinsic limitations. Some of
              the key ones for HealthArchive.ca will include:
            </p>
            <ul className="ha-list-disc">
              <li>
                <strong>Incomplete captures:</strong> Certain embedded resources,
                third-party scripts, or media may not be archived or may not replay as
                originally seen.
              </li>
              <li>
                <strong>Sampling effects:</strong> Not every page change can be captured.
                A snapshot only shows the state of a page at specific times.
              </li>
              <li>
                <strong>Non-authoritative copies:</strong> Archived copies are for
                reference; the authoritative source remains the original agency.
              </li>
            </ul>
            <p className="ha-muted">
              Detailed technical documentation—covering crawling configuration, formats,
              and replay behaviour—will be published as the archive moves from prototype
              to production.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

