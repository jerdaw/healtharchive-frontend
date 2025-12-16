"use client";

import { useEffect } from "react";

type ArchiveFiltersAutoscrollProps = {
  targetId: string;
};

export function ArchiveFiltersAutoscroll({
  targetId,
}: ArchiveFiltersAutoscrollProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== `#${targetId}`) return;

    const el = document.getElementById(targetId);
    if (!el) return;
    if (typeof el.scrollIntoView !== "function") return;

    const handle = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);

    return () => window.clearTimeout(handle);
  }, [targetId]);

  return null;
}

