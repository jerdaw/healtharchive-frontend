import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import {
  getAllTopics,
  searchDemoRecords,
  type SearchParams,
} from "@/data/demo-records";

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

type ArchiveSearchParams = {
  q?: string;
  source?: string;
  topic?: string;
};

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<ArchiveSearchParams>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const source = params.source?.trim() ?? "";
  const topic = params.topic?.trim() ?? "";

  const allTopics = getAllTopics();
  const results = searchDemoRecords({ q, source, topic } as SearchParams);

  const resultCountText =
    results.length === 1 ? "1 demo snapshot" : `${results.length} demo snapshots`;

  return (
    <PageShell
      eyebrow="Archive explorer (demo)"
      title="Browse & search demo snapshots"
      intro="This is a prototype view showing how the archive explorer will behave. Search and filters are powered by a small demo dataset from selected Public Health Agency of Canada and Health Canada pages."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,260px),minmax(0,1fr)] lg:items-start">
        {/* Filters panel */}
        <aside className="ha-card p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Filters (demo dataset)
          </h2>
          <p className="mt-1 text-xs text-ha-muted">
            Adjust these filters and re-run the search on the right. In the full
            archive, more granular options such as date ranges and jurisdictions
            would be available.
          </p>

          <form className="mt-4 space-y-4" method="get">
            {/* Text search */}
            <div className="space-y-1">
              <label htmlFor="q" className="text-xs font-medium text-slate-800">
                Keywords
              </label>
              <input
                id="q"
                name="q"
                type="search"
                defaultValue={q}
                placeholder="e.g. influenza, naloxone, HIV"
                className="w-full rounded-lg border border-ha-border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[11px] text-ha-muted">
                Search across titles, snippets, sources, topics, and language.
              </p>
            </div>

            {/* Source select */}
            <div className="space-y-1">
              <label
                htmlFor="source"
                className="text-xs font-medium text-slate-800"
              >
                Source
              </label>
              <select
                id="source"
                name="source"
                defaultValue={source}
                className="w-full rounded-lg border border-ha-border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All sources</option>
                <option value="phac">Public Health Agency of Canada</option>
                <option value="hc">Health Canada</option>
              </select>
            </div>

            {/* Topic select */}
            <div className="space-y-1">
              <label
                htmlFor="topic"
                className="text-xs font-medium text-slate-800"
              >
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                defaultValue={topic}
                className="w-full rounded-lg border border-ha-border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All topics</option>
                {allTopics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <button type="submit" className="ha-btn-primary text-xs">
                Apply filters
              </button>
              <Link
                href="/archive"
                className="text-xs font-medium text-ha-muted hover:text-slate-900"
              >
                Clear
              </Link>
            </div>
          </form>
        </aside>

        {/* Search & results */}
        <section className="space-y-4">
          <div className="ha-card p-4 sm:p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Search results
                </h2>
                <p className="text-xs text-ha-muted">
                  {resultCountText}
                  {q && (
                    <>
                      {" "}
                      matching <span className="font-medium">“{q}”</span>
                    </>
                  )}
                </p>
              </div>
              <Link
                href="/archive/browse-by-source"
                className="text-xs font-medium text-ha-accent hover:text-blue-700"
              >
                Browse by source instead →
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              <form className="flex flex-col gap-2 sm:flex-row" method="get">
                <label className="sr-only" htmlFor="q2">
                  Search keywords
                </label>
                <input
                  id="q2"
                  name="q"
                  type="search"
                  defaultValue={q}
                  placeholder="Search within demo snapshots…"
                  className="flex-1 rounded-full border border-ha-border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                {/* Keep filters in sync */}
                <input type="hidden" name="source" value={source} />
                <input type="hidden" name="topic" value={topic} />
                <button type="submit" className="ha-btn-secondary text-xs">
                  Search
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-3">
            {results.length === 0 ? (
              <div className="ha-card p-4 sm:p-5">
                <p className="text-sm text-ha-muted">
                  No demo records match the current filters. Try removing some
                  filters, using broader keywords, or{" "}
                  <Link
                    href="/archive"
                    className="font-medium text-ha-accent hover:text-blue-700"
                  >
                    resetting the search
                  </Link>
                  .
                </p>
              </div>
            ) : (
              results.map((record) => (
                <article
                  key={record.id}
                  className="ha-card ha-card-elevated p-4 sm:p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-slate-900">
                        <Link
                          href={`/snapshot/${record.id}`}
                          className="hover:text-ha-accent"
                        >
                          {record.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-ha-muted">
                        {record.sourceName} · captured {formatDate(record.captureDate)} ·{" "}
                        {record.language}
                      </p>
                    </div>
                    <Link
                      href={`/snapshot/${record.id}`}
                      className="ha-btn-secondary text-xs"
                    >
                      View snapshot
                    </Link>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-800 sm:text-sm">
                    {record.snippet}
                  </p>
                  <p className="mt-2 text-[11px] text-ha-muted">
                    Original URL:{" "}
                    <span className="break-all">{record.originalUrl}</span>
                  </p>
                  {record.topics.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {record.topics.map((t) => (
                        <span key={t} className="ha-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
