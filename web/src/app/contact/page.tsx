import { PageShell } from "@/components/layout/PageShell";

export default function ContactPage() {
  return (
    <PageShell
      title="Contact & follow"
      intro="If you are interested in following HealthArchive.ca or exploring potential collaborations, this page will provide simple ways to stay connected."
    >
      <div className="grid gap-6 md:grid-cols-2 text-sm text-slate-600">
        <section className="ha-card ha-section">
          <h2 className="ha-section-heading">Project updates</h2>
          <div className="ha-section-body">
            <p>
              As the archive infrastructure matures, public updates and technical notes
              will be shared via the project repositories and this website. Links to
              specific channels (for example, a project blog or mailing list) will be
              added here once they are established.
            </p>
          </div>
        </section>

        <section className="ha-card ha-section">
          <h2 className="ha-section-heading">Email</h2>
          <div className="ha-section-body">
            <p>
              A dedicated project email address (for example,
              <span className="font-mono text-xs text-slate-700">
                {" "}
                contact@healtharchive.ca
              </span>
              ) will be published here once the initial infrastructure and governance are
              in place.
            </p>
            <p className="ha-muted">
              For now, this page serves as a placeholder so layout and navigation can be
              finalized without implying a live support channel.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

