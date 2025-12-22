import Link from "next/link";

import { PageShell } from "@/components/layout/PageShell";
import { siteCopy } from "@/lib/siteCopy";

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Terms"
      title="Terms of use"
      intro="HealthArchive.ca provides archived snapshots for research, education, and public-interest reference. These terms describe the intended use and limitations of the service."
    >
      <section className="ha-home-hero space-y-4">
        <h2 className="ha-section-heading">Acceptable use</h2>
        <p className="text-ha-muted text-sm leading-relaxed sm:text-base">
          HealthArchive.ca is intended for research, journalism, education, and historical
          reference. Use archived content to cite what was published at a specific time, not as a
          substitute for current official guidance.
        </p>
        <ul className="text-ha-muted list-disc space-y-1 pl-5 text-sm leading-relaxed sm:text-base">
          <li>{siteCopy.whatThisSiteIs.is}</li>
          <li>{siteCopy.whatThisSiteIs.isNot}</li>
          <li>For up-to-date recommendations, always consult the official source website.</li>
        </ul>
      </section>

      <section className="ha-home-hero ha-home-hero-plain space-y-4">
        <h2 className="ha-section-heading">No medical advice</h2>
        <p className="text-ha-muted text-sm leading-relaxed sm:text-base">
          Archived content may be incomplete, outdated, or superseded. Nothing on this site should
          be interpreted as medical advice or current clinical guidance.
        </p>
      </section>

      <section className="ha-home-hero ha-home-hero-plain space-y-4">
        <h2 className="ha-section-heading">Citation and attribution</h2>
        <p className="text-ha-muted text-sm leading-relaxed sm:text-base">
          When referencing archived content, include the capture date, original URL, and the
          HealthArchive snapshot link. See the researchers page for a citation example.
        </p>
        <p className="text-ha-muted text-sm leading-relaxed sm:text-base">
          <Link href="/researchers" className="text-ha-accent font-medium hover:text-blue-700">
            View citation guidance
          </Link>
          .
        </p>
      </section>

      <section className="ha-home-hero ha-home-hero-plain space-y-4">
        <h2 className="ha-section-heading">Availability</h2>
        <p className="text-ha-muted text-sm leading-relaxed sm:text-base">
          The archive is provided on an as-is basis. We do our best to maintain access, but
          availability, completeness, and replay fidelity can vary.
        </p>
      </section>

      <section className="ha-home-hero ha-home-hero-plain space-y-4">
        <div className="ha-callout">
          <h3 className="ha-callout-title">Questions or corrections</h3>
          <p className="mt-2 text-xs leading-relaxed sm:text-sm">
            If you spot a metadata error or a broken replay, submit a report so we can review it.
            For other questions, use the contact page.
          </p>
          <p className="mt-3 text-xs leading-relaxed sm:text-sm">
            <Link href="/report" className="text-ha-accent font-medium hover:text-blue-700">
              Report an issue
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-ha-accent font-medium hover:text-blue-700">
              Contact the project
            </Link>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
