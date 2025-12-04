// web/src/app/snapshot/[id]/page.tsx

import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { demoRecords } from "@/data/demo-records";

function formatDate(iso: string): string {
  // Expecting "YYYY-MM-DD" for demo records
  const [yearStr, monthStr, dayStr] = iso.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  if (!year || !month || !day) {
    return iso;
  }

  // Construct a local date with the given calendar components
  const d = new Date(year, month - 1, day);

  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}


type Params = {
  id: string;
};

export default async function SnapshotPage({
  params,
}: {
  params: Promise<Params>;
}) {
  // Next 16: params is a Promise, so we unwrap it first
  const { id } = await params;

  const record = demoRecords.find((r) => r.id === id);

  if (!record) {
    return notFound();
  }

  const captureDate = formatDate(record.captureDate);

  return (
    <PageShell
      title={record.title}
      intro={`Archived snapshot from ${captureDate}. This is a demo view showing how individual pages from Canadian public health sites will appear in the archive viewer.`}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
        {/* LEFT: metadata + notices */}
        <section className="space-y-4">
          <div className="ha-card space-y-3">
            <h2 className="ha-section-heading">Snapshot details (demo)</h2>
            <dl className="grid gap-2 text-sm text-slate-700">
              <div>
                <dt className="font-medium text-slate-600">Source</dt>
                <dd>{record.sourceName}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-600">Capture date</dt>
                <dd>{captureDate}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-600">Language</dt>
                <dd>{record.language}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-600">Original URL</dt>
                <dd className="break-words font-mono text-xs text-slate-500">
                  <a
                    href={record.url}
                    className="text-sky-700 hover:text-sky-900 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {record.url}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-600">Topics</dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {record.topics.map((topic) => (
                    <span key={topic} className="ha-badge">
                      {topic}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-3 space-y-2 text-xs text-slate-500">
              <p>
                This snapshot is part of a small demo dataset. In the full
                archive, similar records will be served from dedicated archive
                storage and linked to a capture timeline for each URL.
              </p>
              <p>
                From here you can either explore the embedded content below or
                open the raw HTML snapshot in a separate tab.
              </p>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/archive"
                className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
              >
                ← Back to demo archive
              </Link>
              <a
                href={record.archivedUrl}
                className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-800 hover:bg-sky-100"
                target="_blank"
                rel="noreferrer"
              >
                Open raw snapshot
              </a>
            </div>
          </div>

          <div className="ha-card bg-sky-50/70">
            <h2 className="ha-section-heading">Important note</h2>
            <div className="ha-section-body">
              <p className="text-xs text-slate-700 sm:text-sm">
                Archived content reflects what public websites displayed at the
                time of capture. It may be incomplete, outdated, or superseded.
                Nothing in this viewer should be treated as current clinical
                guidance or official policy.
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT: embedded archived HTML */}
        <section className="space-y-3">
          <div className="ha-card">
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="ha-section-heading mb-0">
                Archived content (demo)
              </h2>
              <p className="ha-muted text-xs">
                Served from{" "}
                <code className="font-mono text-[0.7rem]">
                  /public/demo-archive
                </code>{" "}
                for this prototype.
              </p>
            </div>
            <p className="ha-muted mb-3 text-xs sm:text-sm">
              In a full deployment, this panel would be powered by a dedicated
              web archive replay engine (for example, WARC-based replay such as
              pywb) so that interactive content is preserved as faithfully as
              possible.
            </p>
            <div className="relative h-[640px] w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <iframe
                src={record.archivedUrl}
                title={`Archived snapshot: ${record.title}`}
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

