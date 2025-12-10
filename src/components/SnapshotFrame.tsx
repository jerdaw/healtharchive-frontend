"use client";

import { useState } from "react";

type SnapshotFrameProps = {
  src: string;
  title: string;
};

export function SnapshotFrame({ src, title }: SnapshotFrameProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <div className="relative h-full w-full">
      {status === "error" ? (
        <div className="flex h-full min-h-[320px] items-center justify-center px-4 text-center text-xs text-ha-muted sm:min-h-[560px] sm:text-sm">
          <div className="space-y-2">
            <p className="font-semibold text-slate-900">
              Archived content unavailable
            </p>
            <p>
              The snapshot failed to load. Try opening the raw snapshot link
              above or reloading the page.
            </p>
          </div>
        </div>
      ) : (
        <iframe
          src={src}
          title={title}
          className="h-[480px] w-full border-0 sm:h-[560px]"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}
      {status === "loading" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/40 text-xs text-ha-muted">
          Loading snapshot…
        </div>
      )}
    </div>
  );
}
