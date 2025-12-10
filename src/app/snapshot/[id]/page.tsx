import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { getRecordById } from "@/data/demo-records";
import { fetchSnapshotDetail } from "@/lib/api";
import { SnapshotFrame } from "@/components/SnapshotFrame";

function formatDate(iso: string): string {
  const [yearStr, monthStr, dayStr] = iso.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  if (!year || !month || !day) {
    return iso;
  }

  const d = new Date(year, month - 1, day);

  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function SnapshotPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let snapshotMeta: Awaited<ReturnType<typeof fetchSnapshotDetail>> | null =
    null;
  let usingBackend = false;

  // Attempt to fetch real snapshot metadata from the backend. If that fails
  // (e.g., backend not running or this ID not present), fall back to the demo
  // record lookup.
  try {
    const numericId = Number(id);
    if (!Number.isNaN(numericId)) {
      snapshotMeta = await fetchSnapshotDetail(numericId);
      usingBackend = true;
    }
  } catch {
    snapshotMeta = null;
    usingBackend = false;
  }

  const record = getRecordById(id);

  if (!snapshotMeta && !record) {
    return notFound();
  }

  const title = snapshotMeta?.title ?? record?.title ?? "Snapshot";
  const captureDate =
    snapshotMeta?.captureDate ?? record?.captureDate ?? "Unknown";
  const sourceName =
    snapshotMeta?.sourceName ?? record?.sourceName ?? "Unknown source";
  const language = snapshotMeta?.language ?? record?.language ?? "Unknown";
  const originalUrl =
    snapshotMeta?.originalUrl ?? record?.originalUrl ?? "Unknown URL";
  const topics = snapshotMeta?.topics ?? record?.topics ?? [];
  const rawSnapshotUrl =
    snapshotMeta?.rawSnapshotUrl ?? record?.snapshotPath ?? null;

  return (
    <PageShell
      eyebrow="Archived snapshot"
      title={title}
      intro="This page shows how individual snapshots from the archive will appear. In the full system, this view would be powered by a dedicated web archive replay engine."
    >
      <section className="ha-grid-2">
        {/* Metadata card */}
        <div className="space-y-4">
          <div className="ha-card p-4 sm:p-5">
            <p className="text-xs font-medium text-ha-muted">
              Archived snapshot from {formatDate(captureDate)}.
            </p>
            {!usingBackend && record && (
              <p className="mt-1 text-xs text-ha-muted">
                This is a demo view based on a small static snapshot stored under{" "}
                <code>public/demo-archive</code>.
              </p>
            )}
            <dl className="mt-3 space-y-1 text-xs text-slate-800 sm:text-sm">
              <div className="flex gap-2">
                <dt className="w-28 text-ha-muted">Source</dt>
                <dd>{sourceName}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 text-ha-muted">Capture date</dt>
                <dd>{formatDate(captureDate)}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 text-ha-muted">Language</dt>
                <dd>{language}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 text-ha-muted">Original URL</dt>
                <dd className="break-all">{originalUrl}</dd>
              </div>
            </dl>

            {topics.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {topics.map((topic) => (
                  <span key={topic} className="ha-badge">
                    {topic}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/archive" className="ha-btn-secondary text-xs">
                ← Back to archive
              </Link>
              {rawSnapshotUrl && (
                <a
                  href={rawSnapshotUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ha-btn-primary text-xs"
                >
                  Open raw snapshot
                </a>
              )}
            </div>
          </div>

          <div className="ha-callout">
            <h3 className="ha-callout-title">Important note</h3>
            <p className="text-xs leading-relaxed sm:text-sm">
              Archived content reflects what public websites displayed at the
              time of capture. It may be incomplete, outdated, or superseded.
              Nothing in this viewer should be treated as current clinical
              guidance or official policy. For up-to-date recommendations,
              always refer to the relevant official websites.
            </p>
          </div>
        </div>

        {/* Embedded snapshot */}
        <div className="ha-card ha-card-elevated flex min-h-[320px] flex-col">
          <div className="border-b border-ha-border px-4 py-3 text-xs text-ha-muted sm:px-5">
            <span className="font-medium text-slate-900">Archived content</span>{" "}
            {rawSnapshotUrl ? (
              <>
                {" "}
                · served from{" "}
                <code>
                  {rawSnapshotUrl}
                </code>{" "}
                {usingBackend ? "from the live API." : "for this demo."}
              </>
            ) : (
              <>
                {" "}
                · viewer integration for this snapshot is not yet available.
              </>
            )}
            <span className="sr-only">
              {" "}
              The following section is an embedded snapshot of the archived page.
            </span>
          </div>
          <div className="flex-1">
            {rawSnapshotUrl ? (
              <SnapshotFrame src={rawSnapshotUrl} title={title} />
            ) : (
              <div className="flex h-[320px] items-center justify-center px-4 text-center text-xs text-ha-muted sm:h-[560px] sm:text-sm">
                Viewer for this snapshot will be powered by the full replay
                engine in a future phase. For now, only demo snapshots stored
                under <code>public/demo-archive</code> are embedded here.
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
