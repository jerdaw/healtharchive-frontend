export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white/70">
      <div className="ha-container space-y-3 py-6 text-xs text-ha-muted sm:flex sm:flex-col">
        <p className="leading-relaxed">
          <strong className="font-semibold text-slate-800">
            Disclaimer:
          </strong>{" "}
          HealthArchive.ca is an independent project and is not affiliated
          with, endorsed by, or associated with the Public Health Agency of
          Canada, Health Canada, or any other government agency. Archived
          content is provided for reference and research purposes only and may
          be incomplete, outdated, or superseded. Nothing on this site should be
          interpreted as medical advice.
        </p>
        <div className="flex flex-col gap-1 text-[11px] text-ha-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} HealthArchive.ca Project.{" "}
            <span className="font-medium text-slate-800">
              Not an official government website.
            </span>
          </p>
          <p className="text-[11px]">
            This site is in an{" "}
            <span className="font-medium text-amber-800">early demo phase</span>
            . Coverage, data, and functionality are incomplete and subject to
            change.
          </p>
        </div>
      </div>
    </footer>
  );
}

