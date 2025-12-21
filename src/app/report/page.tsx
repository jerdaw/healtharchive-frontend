import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { ReportIssueForm } from "@/components/report/ReportIssueForm";

const DEFAULT_INTRO =
  "Use this form to report broken snapshots, metadata errors, missing pages, or takedown requests. Please do not submit personal or health information.";

type ReportSearchParams = {
  snapshot?: string;
  url?: string;
  page?: string;
};

export default async function ReportPage({
  searchParams,
}: {
  searchParams: Promise<ReportSearchParams>;
}) {
  const params = await searchParams;
  const snapshotId = params.snapshot ? Number(params.snapshot) : null;
  const initialSnapshotId = Number.isFinite(snapshotId) ? snapshotId : null;
  const initialOriginalUrl = params.url?.trim() || null;
  const initialPageUrl = params.page?.trim() || null;

  return (
    <PageShell
      eyebrow="Report"
      title="Report an issue"
      intro={DEFAULT_INTRO}
    >
      <section className="ha-home-hero space-y-4">
        <h2 className="ha-section-heading">What happens next</h2>
        <p className="text-sm sm:text-base leading-relaxed text-ha-muted">
          Reports are reviewed by the project maintainers. We may follow up by
          email if you provide contact information. For urgent safety labeling
          concerns, we prioritize review within 48 hours.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-ha-muted">
          You can also reach us directly at{" "}
          <a
            href="mailto:contact@healtharchive.ca"
            className="font-medium text-ha-accent hover:text-blue-700"
          >
            contact@healtharchive.ca
          </a>
          .
        </p>
      </section>

      <ReportIssueForm
        initialSnapshotId={initialSnapshotId}
        initialOriginalUrl={initialOriginalUrl}
        initialPageUrl={initialPageUrl}
      />

      <section className="ha-home-hero ha-home-hero-plain space-y-4">
        <div className="ha-callout">
          <h3 className="ha-callout-title">Looking for policies?</h3>
          <p className="mt-2 text-xs leading-relaxed sm:text-sm">
            See the governance page for scope, corrections, and takedown
            policies.
          </p>
          <p className="mt-3 text-xs leading-relaxed sm:text-sm">
            <Link
              href="/governance"
              className="font-medium text-ha-accent hover:text-blue-700"
            >
              Read governance & policies
            </Link>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
