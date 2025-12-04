import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  intro?: string;
  children: ReactNode;
};

export function PageShell({ title, intro, children }: PageShellProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        {intro && (
          <p className="max-w-3xl text-sm text-slate-600 sm:text-base">
            {intro}
          </p>
        )}
      </header>
      <main className="space-y-6">{children}</main>
    </div>
  );
}

