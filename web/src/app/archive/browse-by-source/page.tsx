import { PageShell } from "@/components/layout/PageShell";

export default function BrowseBySourcePage() {
  return (
    <PageShell
      title="Browse by source (demo)"
      intro="This view will summarize archived coverage by source agency, topic, and time period, and provide quick entry points into the archive explorer."
    >
      <div className="ha-card ha-prose">
        <p>
          In the full system, this view will display cards for key sources such as the
          Public Health Agency of Canada and Health Canada. Each card will show:
        </p>
        <ul>
          <li>How many pages have been archived for that source.</li>
          <li>When those captures start and end.</li>
          <li>Which topics appear most frequently.</li>
          <li>Shortcuts into the archive explorer filtered to that source.</li>
        </ul>
        <p className="ha-muted">
          For now this page is a structural placeholder so the navigation, layout, and
          terminology can be finalized before wiring in the demo dataset and backend
          services.
        </p>
      </div>
    </PageShell>
  );
}

