"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/archive", label: "Browse & search" },
  { href: "/methods", label: "Methods" },
  { href: "/researchers", label: "For researchers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="ha-container flex items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-sm font-semibold text-blue-700 shadow-sm">
              HA
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-slate-900">
                HealthArchive.ca
              </span>
              <span className="text-xs text-ha-muted">
                Independent archive of Canadian public health information
              </span>
            </div>
          </Link>
          <span className="ml-2 hidden items-center rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-800 sm:inline-flex">
            Early demo
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-4 text-sm font-medium text-ha-muted md:flex">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1 ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-ha-muted hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-ha-border bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            aria-hidden="true"
            role="img"
          >
            {mobileOpen ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="ha-container flex flex-col gap-1 py-3 text-sm font-medium text-ha-muted">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-ha-muted hover:bg-slate-100 hover:text-slate-900"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

