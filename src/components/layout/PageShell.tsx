import type { ReactNode } from "react";

interface PageShellProps {
  title: string;
  intro?: string;
  eyebrow?: string;
  children: ReactNode;
}

export function PageShell({ title, intro, eyebrow, children }: PageShellProps) {
  return (
    <div className="ha-container">
      <section className="pt-6 pb-10">
        <header className="mb-8 max-w-3xl space-y-3">
          {eyebrow && <p className="ha-eyebrow">{eyebrow}</p>}
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h1>
          {intro && (
            <p className="text-sm leading-relaxed text-ha-muted sm:text-base">
              {intro}
            </p>
          )}
        </header>
        <div className="space-y-8">{children}</div>
      </section>
    </div>
  );
}
