import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact & follow"
      title="Staying in touch with the project"
      intro="HealthArchive.ca is currently a volunteer-led effort in an early demo phase. If you are interested in following the work or exploring collaboration, the options below are a starting point."
    >
      <section className="ha-grid-2">
        <div className="ha-card p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            Email (placeholder)
          </h2>
          <p className="mt-2 text-sm text-ha-muted">
            For now, the simplest way to express interest or ask questions is by
            email.
          </p>
          <p className="mt-3 text-sm">
            <a
              href="mailto:contact@healtharchive.ca"
              className="font-medium text-ha-accent hover:text-blue-700"
            >
              contact@healtharchive.ca
            </a>
          </p>
          <p className="mt-2 text-xs text-ha-muted">
            Please note that this address may change as the project&apos;s
            governance and infrastructure evolve.
          </p>
        </div>

        <div className="ha-card p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-slate-900">
            GitHub repository
          </h2>
          <p className="mt-2 text-sm text-ha-muted">
            The frontend you are viewing is open source. If you&apos;re
            comfortable with GitHub, you can watch the repository to follow
            changes.
          </p>
          <p className="mt-3 text-sm">
            <Link
              href="https://github.com/jerdaw/healtharchive-frontend"
              className="font-medium text-ha-accent hover:text-blue-700"
            >
              github.com/jerdaw/healtharchive-frontend
            </Link>
          </p>
          <p className="mt-2 text-xs text-ha-muted">
            Contributions are welcome, particularly from people with experience
            in web archiving, public health, or accessible interface design.
            Please open an issue first to discuss substantial changes.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

