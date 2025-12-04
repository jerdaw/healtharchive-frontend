"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/archive", label: "Browse & search" },
  { href: "/methods", label: "Methods" },
  { href: "/researchers", label: "For researchers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  if (pathname === href) return true;
  if (pathname.startsWith(href + "/")) return true;
  return false;
}

export function Header() {
  const pathname = usePathname() || "/";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 text-slate-900"
          aria-label="HealthArchive.ca home"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-600 text-xs font-semibold text-white shadow-sm">
            HA
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight sm:text-base">
              HealthArchive.ca
            </span>
            <span className="text-[0.70rem] font-normal text-slate-500 sm:text-xs">
              Independent archive of Canadian public health information
            </span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-3 text-xs sm:text-sm">
          {navLinks.map((item) => {
            const active = isActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "rounded-full px-3 py-1.5 font-medium transition-colors",
                  active
                    ? "bg-sky-50 text-sky-800 border border-sky-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

