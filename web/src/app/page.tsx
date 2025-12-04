import Link from "next/link";

export default function HomePage() {
  return (
    <div className="ha-page">
      <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            Independent public health archive · Demo
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Preserving snapshots of Canadian public health information and data.
          </h1>
          <p className="mt-4 max-w-xl text-sm text-slate-600 sm:text-base">
            HealthArchive.ca is a volunteer-led project to capture and replay key pages
            from Canadian public health websites, so clinicians, researchers,
            journalists, and the public can see what was published even after it changes
            or disappears.
          </p>
          <p className="mt-3 text-xs text-slate-500 sm:text-sm">
            <span className="font-medium text-slate-700">Project status:</span>{" "}
            Early development – archive infrastructure and a demo explorer are being
            built.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/archive"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
            >
              Open demo archive
            </Link>
            <Link
              href="/methods"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1"
            >
              How this will work
            </Link>
          </div>
        </div>

        <div>
          <div className="ha-card space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">
              What you can do on this demo
            </h2>
            <ul className="space-y-2 text-xs text-slate-600 sm:text-sm">
              <li>• Explore the planned structure for an archive explorer.</li>
              <li>• See how pages will be grouped by source and topic.</li>
              <li>• Preview how snapshot pages will be presented and labelled.</li>
            </ul>
            <div className="h-px bg-slate-200" />
            <div className="space-y-1 text-xs text-slate-600 sm:text-sm">
              <p className="font-medium text-slate-800">For researchers</p>
              <p>
                The full system is being designed with reproducible research in mind. See{" "}
                <Link href="/researchers" className="text-sky-700 hover:text-sky-900">
                  the researcher overview
                </Link>{" "}
                for planned capabilities and limitations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

