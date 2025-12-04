import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { demoRecords, type DemoRecord } from "@/data/demo-records";

type SearchParams = {
  q?: string | string[];
  source?: string | string[];
  topic?: string | string[];
};

function normalize(value: string): string {
  return value.toLowerCase();
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function recordMatches(
  record: DemoRecord,
  filters: { q: string; source: string; topic: string }
): boolean {
  const { q, source, topic } = filters;

  // Source filter
  if (source && record.sourceId !== source) return false;

  // Topic filter
  if (topic) {
    const topicsLower = record.topics.map((t) => normalize(t));
    if (!topicsLower.includes(normalize(topic))) return false;
  }

  // Text query
  if (!q) return true;

  const haystack = [
    record.title,
    record.snippet,
    record.url,
    record.sourceName,
    record.topics.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalize(q));
}

// Next.js 16: searchParams is a Promise and must be awaited
export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = (await searchParams) || {};

  const rawQ = params.q;
  const rawSource = params.source;
  const rawTopic = params.topic;

  const q =
    typeof rawQ === "string" ? rawQ.trim() : Array.isArray(rawQ) ? rawQ[0]?.trim() ?? "" : "";
  const source =
    typeof rawSource === "string"
      ? rawSource
      : Array.isArray(rawSource)
      ? rawSource[0] ?? ""
      : "";
  const topic =
    typeof rawTopic === "string"
      ? rawTopic
      : Array.isArray(rawTopic)
      ? rawTopic[0] ?? ""
      : "";

  const sourceOptions = Array.from(
    new Map(demoRecords.map((r) => [r.sourceId, r.sourceName])).entries()
  ).map(([id, name]) => ({ id, name }));

  const topicOptions = Array.from(
    new Set(demoRecords.flatMap((r) => r.topics))
  ).sort((a, b) => a.localeCompare(b));

  const filteredRecords = demoRecords.filter((rec) =>
    recordMatches(rec, { q, source, topic })
  );
  const totalCount = demoRecords.length;
  const hasFilters = Boolean(q || source || topic);

  return (
    <PageShell
      title="Archive explorer (demo)"
      intro="Search a small demo dataset representing public-facing pages from Canadian federal public health sources. The full archive explorer will use the same structure with a much larger index."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.1fr)]">
        {/* LEFT: search + results */}
        <section className="space-y-4">
          {/* Search form */}
          <form
            method="get"
            className="ha-card space-y-4"
            aria-label="Search archived demo pages"
          >
            <div>
              <label
                htmlFor="q"
                className="block text-xs font-medium text-slate-700 sm:text-sm"
              >
                Keyword search
              </label>
              <p className="ha-muted mt-1">
                Search within titles, snippets, topics, and original URLs.
              </p>
              <input
                id="q"
                name="q"
                type="search"
                defaultValue={q}
                placeholder="e.g. COVID epidemiology, naloxone, food recalls…"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="source"
                  className="block text-xs font-medium text-slate-700 sm:text-sm"
                >
                  Source agency
                </label>
                <select
                  id="source"
                  name="source"
                  defaultValue={source}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
                >
                  <option value="">All sources</option>
                  {sourceOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="topic"
                  className="block text-xs font-medium text-slate-700 sm:text-sm"
                >
                  Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  defaultValue={topic}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
                >
                  <option value="">All topics</option>
                  {topicOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
              >
                Search demo archive
              </button>

              {hasFilters && (
                <a
                  href="/archive"
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  Clear filters
                </a>
              )}
            </div>
          </form>

          {/* Results */}
          <section className="ha-card space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="ha-muted">
                {hasFilters ? (
                  <>
                    Showing{" "}
                    <span className="font-medium text-slate-800">
                      {filteredRecords.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-slate-800">
                      {totalCount}
                    </span>{" "}
                    demo records.
                  </>
                ) : (
                  <>
                    Showing all{" "}
                    <span className="font-medium text-slate-800">
                      {totalCount}
                    </span>{" "}
                    demo records.
                  </>
                )}
              </p>
              <p className="ha-muted">
                Demo only – not a complete archive and not official guidance.
              </p>
            </div>

            <div className="h-px bg-slate-200" />

            <div className="space-y-3">
              {filteredRecords.length === 0 ? (
                <p className="text-sm text-slate-600">
                  No records match your current filters. Try broadening your search
                  terms or clearing filters.
                </p>
              ) : (
                filteredRecords.map((rec) => (
                  <article
                    key={rec.id}
                    className="rounded-lg border border-slate-200 bg-white/95 p-3 text-sm shadow-sm sm:p-4"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h2 className="text-sm font-semibold text-slate-900 sm:text-[0.95rem]">
                        <a
                          href={rec.archivedUrl}
                          className="hover:text-sky-700 hover:underline"
                        >
                          {rec.title}
                        </a>
                      </h2>
                      <p className="ha-muted">
                        {rec.sourceName} · archived {formatDate(rec.captureDate)} ·{" "}
                        {rec.language}
                      </p>
                    </div>

                    <p className="mt-2 text-sm text-slate-700">{rec.snippet}</p>

                    <p className="mt-1 font-mono text-[0.7rem] text-slate-500">
                      {rec.url}
                    </p>

                    {rec.topics.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {rec.topics.map((topic) => (
                          <span key={topic} className="ha-badge">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                ))
              )}
            </div>
          </section>
        </section>

        {/* RIGHT: sidebar */}
        <aside className="space-y-4">
          <section className="ha-card ha-section">
            <h2 className="ha-section-heading">What this demo shows</h2>
            <div className="ha-section-body">
              <p>
                This page illustrates how the full archive explorer is intended to work:
                search across selected federal public health sources, filter by agency
                and topic, and click through to timestamped snapshots.
              </p>
              <p>
                In the full system, this interface will be backed by a much larger
                index and dedicated archive storage. The same structure will be reused
                so that researchers and clinicians can move from this demo to the live
                archive without relearning the interface.
              </p>
            </div>
          </section>

          <section className="ha-card ha-section">
            <h2 className="ha-section-heading">Browse by source</h2>
            <div className="ha-section-body">
              <p>
                If you prefer to start from a specific agency, the{" "}
                <Link
                  href="/archive/browse-by-source"
                  className="text-sky-700 hover:text-sky-900"
                >
                  browse by source
                </Link>{" "}
                view summarizes how many demo records are available per source and
                topic.
              </p>
            </div>
          </section>

          <section className="ha-card ha-section">
            <h2 className="ha-section-heading">For researchers</h2>
            <div className="ha-section-body">
              <p>
                The explorer is being designed to support reproducible research and
                policy analysis. See the{" "}
                <Link
                  href="/researchers"
                  className="text-sky-700 hover:text-sky-900"
                >
                  researcher overview
                </Link>{" "}
                for details on use cases, limitations, and planned APIs.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </PageShell>
  );
}

