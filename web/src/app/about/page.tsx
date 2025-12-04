import { PageShell } from "@/components/layout/PageShell";

export default function AboutPage() {
  return (
    <PageShell
      title="About HealthArchive.ca"
      intro="HealthArchive.ca is a volunteer-led, independent project focused on preserving access to public health information and data from Canadian government websites."
    >
      <div className="ha-prose">
        <p>
          Public health websites are living documents. Pages move, dashboards change, and
          content can be updated or removed with little notice. For clinicians,
          researchers, journalists, and members of the public, those changes can make it
          difficult to reconstruct what information was available at particular points in
          time.
        </p>

        <p>
          HealthArchive.ca aims to provide a transparent, well-documented archive of key
          public health web content from Canadian federal sources. The project is
          non-governmental and non-partisan. Its focus is data continuity and
          accountability, not replacing official guidance or offering medical advice.
        </p>

        <h2>What this project is trying to solve</h2>
        <p>
          When web content changes without a clear public record, it becomes harder to:
        </p>
        <ul>
          <li>
            Verify what guidance clinicians and the public were relying on at specific
            points in an outbreak or policy change.
          </li>
          <li>
            Reproduce analyses that used tables, dashboards, or downloadable data that may
            later be moved or retired.
          </li>
          <li>
            Understand how messaging around key topics evolved over time, including which
            populations or risks were emphasized.
          </li>
        </ul>
        <p>
          By capturing and replaying snapshots of selected public health web content,
          HealthArchive.ca aims to make those questions easier to answer.
        </p>

        <h2>High-level principles</h2>
        <ul>
          <li>
            <strong>Independence:</strong> The project is not affiliated with any
            government agency. Archived material is presented for reference and research
            purposes only.
          </li>
          <li>
            <strong>Transparency:</strong> Methods, coverage, and limitations will be
            documented so users can understand what has been archived and what has not.
          </li>
          <li>
            <strong>Traceability:</strong> Every snapshot will be clearly labelled with
            capture timestamps and original URLs, and where possible linked to the
            originating agency.
          </li>
          <li>
            <strong>Non-substitution:</strong> The archive is not a source of current
            clinical guidance. Users will be reminded to consult official government and
            professional sources for up-to-date recommendations.
          </li>
        </ul>

        <p className="ha-muted">
          This page will expand as the project matures to include more detail on
          governance, contributors, and long-term sustainability.
        </p>
      </div>
    </PageShell>
  );
}

