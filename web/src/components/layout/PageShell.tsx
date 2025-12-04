import type { ReactNode } from "react";

interface PageShellProps {
  title: string;
  intro?: string;
  children?: ReactNode;
}

export function PageShell({ title, intro, children }: PageShellProps) {
  return (
    <div className="ha-page">
      <header className="ha-page-header">
        <h1 className="ha-page-title">{title}</h1>
        {intro && <p className="ha-page-intro">{intro}</p>}
      </header>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}

