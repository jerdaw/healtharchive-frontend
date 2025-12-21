import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { siteCopy } from "@/lib/siteCopy";

export default function BriefPage() {
  return (
    <PageShell
      eyebrow="Brief"
      title="One-page project brief"
      intro="A partner-friendly summary of what HealthArchive.ca is, what it does, and how to describe it without implying endorsement or medical guidance."
    >
      <section className="ha-home-hero space-y-5">
        <h2 className="ha-section-heading">At a glance</h2>
        <p className="ha-section-subtitle ha-section-lede leading-relaxed">
          {siteCopy.mission.line1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-ha-muted">
          This is an archival record and change-tracking tool. It is not current
          guidance and not medical advice.
        </p>
        <div className="ha-callout">
          <h3 className="ha-callout-title">Download / print</h3>
          <p className="mt-2 text-xs leading-relaxed sm:text-sm">
            <a
              className="font-medium text-ha-accent hover:text-blue-700"
              href="/partner-kit/healtharchive-brief.md"
            >
              Download this brief (Markdown)
            </a>
            {" "}or use your browser’s print dialog to save as PDF.
          </p>
        </div>
      </section>

      <section className="ha-home-hero ha-home-hero-plain space-y-5">
        <h2 className="ha-section-heading">What it does</h2>
        <ul className="list-disc pl-5 text-sm sm:text-base text-ha-muted leading-relaxed space-y-1">
          <li>Captures time-stamped snapshots of selected public health web pages.</li>
          <li>Indexes snapshots into a searchable archive.</li>
          <li>
            Provides descriptive change tracking between archived editions:
            a changes feed, compare views, and RSS feeds.
          </li>
        </ul>
      </section>

      <section className="ha-home-hero ha-home-hero-plain space-y-5">
        <h2 className="ha-section-heading">What it is not</h2>
        <ul className="list-disc pl-5 text-sm sm:text-base text-ha-muted leading-relaxed space-y-1">
          <li>Not a source of current guidance.</li>
          <li>Not medical advice.</li>
          <li>Not an official government website.</li>
          <li>
            Not affiliated with, endorsed by, or associated with PHAC, Health
            Canada, or any government agency.
          </li>
        </ul>
      </section>

      <section className="ha-home-hero ha-home-hero-plain space-y-5">
        <h2 className="ha-section-heading">Intended audiences</h2>
        <ul className="list-disc pl-5 text-sm sm:text-base text-ha-muted leading-relaxed space-y-1">
          <li>
            <strong>Researchers and trainees:</strong> reproducible citations
            and historical context.
          </li>
          <li>
            <strong>Journalists and science communicators:</strong> timelines
            and wording changes.
          </li>
          <li>
            <strong>Educators:</strong> teaching how evidence communication
            evolves over time.
          </li>
        </ul>
      </section>

      <section className="ha-home-hero ha-home-hero-plain space-y-5">
        <h2 className="ha-section-heading">Key links</h2>
        <ul className="list-disc pl-5 text-sm sm:text-base text-ha-muted leading-relaxed space-y-1">
          <li>
            Home:{" "}
            <a className="font-medium text-ha-accent hover:text-blue-700" href="https://www.healtharchive.ca/">
              https://www.healtharchive.ca/
            </a>
          </li>
          <li>
            Archive search:{" "}
            <Link className="font-medium text-ha-accent hover:text-blue-700" href="/archive">
              /archive
            </Link>
          </li>
          <li>
            Changes feed:{" "}
            <Link className="font-medium text-ha-accent hover:text-blue-700" href="/changes">
              /changes
            </Link>
          </li>
          <li>
            Digest + RSS:{" "}
            <Link className="font-medium text-ha-accent hover:text-blue-700" href="/digest">
              /digest
            </Link>
          </li>
          <li>
            Methods and scope:{" "}
            <Link className="font-medium text-ha-accent hover:text-blue-700" href="/methods">
              /methods
            </Link>
          </li>
          <li>
            Governance and policies:{" "}
            <Link className="font-medium text-ha-accent hover:text-blue-700" href="/governance">
              /governance
            </Link>
          </li>
          <li>
            Status and metrics:{" "}
            <Link className="font-medium text-ha-accent hover:text-blue-700" href="/status">
              /status
            </Link>
          </li>
          <li>
            Monthly impact report:{" "}
            <Link className="font-medium text-ha-accent hover:text-blue-700" href="/impact">
              /impact
            </Link>
          </li>
        </ul>
      </section>

      <section className="ha-home-hero ha-home-hero-plain space-y-5">
        <h2 className="ha-section-heading">Safety posture (plain-language)</h2>
        <ul className="list-disc pl-5 text-sm sm:text-base text-ha-muted leading-relaxed space-y-1">
          <li>Archived content can be incomplete, outdated, or superseded.</li>
          <li>
            Change tracking is descriptive only and does not interpret meaning.
          </li>
          <li>
            For up-to-date recommendations, always consult the official source
            website.
          </li>
        </ul>
      </section>

      <section className="ha-home-hero ha-home-hero-plain space-y-4">
        <div className="ha-callout">
          <h3 className="ha-callout-title">Contact and reporting</h3>
          <p className="mt-2 text-xs leading-relaxed sm:text-sm">
            For collaboration, feedback, missing pages, or corrections, use the
            contact page or submit an issue report.
          </p>
          <p className="mt-3 text-xs leading-relaxed sm:text-sm">
            <Link
              href="/contact"
              className="font-medium text-ha-accent hover:text-blue-700"
            >
              Contact
            </Link>
            {" "}·{" "}
            <Link
              href="/report"
              className="font-medium text-ha-accent hover:text-blue-700"
            >
              Report an issue
            </Link>
          </p>
        </div>
      </section>
    </PageShell>
  );
}

