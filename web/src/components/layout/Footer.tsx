export function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-slate-500 sm:px-6 sm:py-6 sm:text-[0.8rem] lg:px-8">
        <p className="leading-relaxed">
          <span className="font-semibold text-slate-600">Disclaimer:</span>{" "}
          HealthArchive.ca is an independent project and is not affiliated with,
          endorsed by, or associated with the Public Health Agency of Canada,
          Health Canada, or any other government agency. Archived content is
          provided for reference and research purposes only and may be
          incomplete, outdated, or superseded. Nothing on this site should be
          interpreted as medical advice.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <p>© 2025 HealthArchive.ca Project.</p>
          <p className="text-slate-400">
            Not an official government website.
          </p>
        </div>
      </div>
    </footer>
  );
}

