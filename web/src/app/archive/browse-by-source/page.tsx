import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { getSourcesSummary } from "@/data/demo-records";

function formatDate(iso: string): string {
  const [yearStr, monthStr, dayStr] = iso.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (!year || !month || !day) return iso;
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BrowseBySourcePage() {
  const summaries = getSourcesSummary();

  return (
    <PageShell
      eyebrow="Archive explorer (demo)"
      title="Browse demo records by source"
      intro="This view summarizes which demo snapshots are currently available for each federal source. In the full archive, this would expand to a broader set of agencies and jurisdictions."
    >
      <div className="ha-grid-2">
        {summaries.map((source) => (
          <article
            key={source.sourceCode}
            className="ha-card ha-card-elevated p-4 sm:p-5"
          >
            <h2 className="text-sm font-semibold text-slate-900">
              {source.sourceName}
            </h2>
            <p className="mt-1 text-xs text-ha-muted">
              {source.recordCount} demo snapshot
              {source.recordCount === 1 ? "" : "s"} captured between{" "}
              {formatDate(source.firstCapture)} and{" "}
              {formatDate(source.lastCapture)}.
            </p>

            {source.topics.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {source.topics.slice(0, 6).map((topic) => (
                  <span key={topic} className="ha-badge">
                    {topic}
                  </span>
                ))}
                {source.topics.length > 6 && (
                  <span className="ha-badge ha-badge-amber">
                    +{source.topics.length - 6} more
                  </span>
                )}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/archive?source=${source.sourceCode}`}
                className="ha-btn-secondary text-xs"
              >
                Browse records
              </Link>
              {source.latestRecordId && (
                <Link
                  href={`/snapshot/${source.latestRecordId}`}
                  className="text-xs font-medium text-ha-accent hover:text-blue-700"
                >
                  View latest snapshot →
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

