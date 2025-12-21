"use client";

import { useMemo, useState } from "react";

type IssueCategory = {
  value: string;
  label: string;
  helper: string;
};

const ISSUE_CATEGORIES: IssueCategory[] = [
  {
    value: "broken_snapshot",
    label: "Broken snapshot or replay",
    helper: "The snapshot viewer is blank, errors, or does not load correctly.",
  },
  {
    value: "incorrect_metadata",
    label: "Incorrect metadata",
    helper: "The capture date, source label, or original URL looks wrong.",
  },
  {
    value: "missing_snapshot",
    label: "Missing snapshot / request a capture",
    helper: "A page you expected is not in the archive yet.",
  },
  {
    value: "takedown",
    label: "Takedown or content concern",
    helper: "Request review or restriction for a specific snapshot.",
  },
  {
    value: "general_feedback",
    label: "General feedback",
    helper: "Share ideas or general feedback about the project.",
  },
];

type IssueReportPayload = {
  category: string;
  description: string;
  snapshotId?: number | null;
  originalUrl?: string | null;
  reporterEmail?: string | null;
  pageUrl?: string | null;
  website?: string | null;
};

type ReportIssueFormProps = {
  initialSnapshotId?: number | null;
  initialOriginalUrl?: string | null;
  initialPageUrl?: string | null;
};

function buildMailto(payload: IssueReportPayload, categoryLabel: string): string {
  const lines = [
    `Category: ${categoryLabel}`,
    payload.snapshotId ? `Snapshot ID: ${payload.snapshotId}` : "Snapshot ID: (not provided)",
    payload.originalUrl ? `Original URL: ${payload.originalUrl}` : "Original URL: (not provided)",
    payload.pageUrl ? `Page URL: ${payload.pageUrl}` : "Page URL: (not provided)",
    "",
    "Description:",
    payload.description,
  ];

  const subject = `HealthArchive issue report: ${categoryLabel}`;
  const body = lines.join("\n");
  return `mailto:contact@healtharchive.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ReportIssueForm({
  initialSnapshotId,
  initialOriginalUrl,
  initialPageUrl,
}: ReportIssueFormProps) {
  const inputClassName =
    "w-full rounded-lg border border-ha-border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-[#11588f] focus:ring-2 focus:ring-[#11588f]";
  const textareaClassName =
    "w-full rounded-lg border border-ha-border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-[#11588f] focus:ring-2 focus:ring-[#11588f]";

  const [category, setCategory] = useState<string>(
    ISSUE_CATEGORIES[0]?.value ?? "general_feedback",
  );
  const [description, setDescription] = useState<string>("");
  const [snapshotId, setSnapshotId] = useState<string>(
    initialSnapshotId ? String(initialSnapshotId) : "",
  );
  const [originalUrl, setOriginalUrl] = useState<string>(initialOriginalUrl ?? "");
  const [reporterEmail, setReporterEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fallbackMailto, setFallbackMailto] = useState<string | null>(null);

  const categoryLabel = useMemo(() => {
    return ISSUE_CATEGORIES.find((item) => item.value === category)?.label ?? "Issue";
  }, [category]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setFallbackMailto(null);

    const trimmedDescription = description.trim();
    if (trimmedDescription.length < 20) {
      setError("Please provide at least 20 characters describing the issue.");
      return;
    }

    const snapshotIdValue =
      snapshotId && /^\d+$/.test(snapshotId) ? Number(snapshotId) : null;

    const payload: IssueReportPayload = {
      category,
      description: trimmedDescription,
      snapshotId: snapshotIdValue,
      originalUrl: originalUrl.trim() || null,
      reporterEmail: reporterEmail.trim() || null,
      pageUrl: initialPageUrl ?? null,
      website: website.trim() || null,
    };

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }

      const data = (await res.json()) as { reportId?: number | null };
      setSubmittedId(data.reportId ?? null);
      setIsSubmitted(true);
    } catch {
      setError("The report could not be submitted automatically.");
      setFallbackMailto(buildMailto(payload, categoryLabel));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="ha-callout">
        <h3 className="ha-callout-title">Report received</h3>
        <p className="mt-2 text-xs leading-relaxed sm:text-sm">
          Thank you for the report. We will review it and follow up if you
          provided an email address.
        </p>
        {submittedId != null && (
          <p className="mt-3 text-xs leading-relaxed sm:text-sm">
            Reference ID: <span className="font-semibold">#{submittedId}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="ha-card space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900" htmlFor="category">
            Issue category
          </label>
          <select
            id="category"
            className="ha-select w-full"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {ISSUE_CATEGORIES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-ha-muted">
            {ISSUE_CATEGORIES.find((item) => item.value === category)?.helper}
          </p>
        </div>

        <div className="ha-grid-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900" htmlFor="snapshotId">
              Snapshot ID (optional)
            </label>
            <input
              id="snapshotId"
              name="snapshotId"
              inputMode="numeric"
              className={inputClassName}
              value={snapshotId}
              onChange={(event) => setSnapshotId(event.target.value)}
              placeholder="12345"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-900" htmlFor="reporterEmail">
              Email (optional)
            </label>
            <input
              id="reporterEmail"
              name="reporterEmail"
              type="email"
              className={inputClassName}
              value={reporterEmail}
              onChange={(event) => setReporterEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900" htmlFor="originalUrl">
            Original URL (optional)
          </label>
          <input
            id="originalUrl"
            name="originalUrl"
            type="url"
            className={inputClassName}
            value={originalUrl}
            onChange={(event) => setOriginalUrl(event.target.value)}
            placeholder="https://www.canada.ca/..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-900" htmlFor="description">
            What is the issue?
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            className={textareaClassName}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Include enough detail for us to reproduce the problem."
          />
          <p className="text-xs text-ha-muted">
            Please do not include personal or health information. Minimum 20
            characters.
          </p>
        </div>

        <div className="hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="ha-callout">
          <h3 className="ha-callout-title">Submission issue</h3>
          <p className="mt-2 text-xs leading-relaxed sm:text-sm">{error}</p>
          {fallbackMailto && (
            <p className="mt-3 text-xs leading-relaxed sm:text-sm">
              You can email the report instead: {" "}
              <a
                href={fallbackMailto}
                className="font-medium text-ha-accent hover:text-blue-700"
              >
                open a pre-filled email
              </a>
              .
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="ha-btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit report"}
        </button>
        <p className="text-xs text-ha-muted">
          We aim to acknowledge reports within 7 days.
        </p>
      </div>
    </form>
  );
}
