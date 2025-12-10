"use client";

import { useEffect, useState } from "react";
import { fetchHealth } from "@/lib/api";

const ENABLE_HEALTH_BANNER =
  process.env.NEXT_PUBLIC_SHOW_API_HEALTH_BANNER === "true";
const LOG_HEALTH_FAILURE =
  process.env.NEXT_PUBLIC_LOG_API_HEALTH_FAILURE === "true";

export function ApiHealthBanner() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  useEffect(() => {
    if (!ENABLE_HEALTH_BANNER && !LOG_HEALTH_FAILURE) return;
    let cancelled = false;
    fetchHealth()
      .then(() => {
        if (!cancelled) setStatus("ok");
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("error");
          if (LOG_HEALTH_FAILURE) {
            console.warn(
              "[healtharchive] API health check failed. Verify NEXT_PUBLIC_API_BASE_URL.",
            );
          }
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ENABLE_HEALTH_BANNER || status === "ok" || status === "idle") {
    return null;
  }

  return (
    <div className="ha-callout mb-4 border-amber-300 bg-amber-50 text-amber-900">
      <h3 className="ha-callout-title">Backend unreachable</h3>
      <p className="text-xs leading-relaxed sm:text-sm">
        The API health check failed. Make sure <code>NEXT_PUBLIC_API_BASE_URL</code>{" "}
        points to a running backend.
      </p>
    </div>
  );
}
