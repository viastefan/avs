"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeNav() {
    setOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(238,242,239,0.92)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
          <Link
            href="/"
            onClick={closeNav}
            className="group flex items-center gap-3"
            aria-label={`${site.name} Startseite`}
          >
            <span className="flex h-10 w-10 items-center justify-center bg-[var(--ink)] text-[var(--accent-bright)] transition-colors group-hover:bg-[var(--accent-deep)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 3L4 7.5V16.5L12 21L20 16.5V7.5L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M12 8V16M8.5 10.5L12 12.5L15.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="font-display block text-lg font-bold tracking-tight text-[var(--ink)]">
                {site.name}
              </span>
              <span className="hidden text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--steel)] sm:block">
                München Flughafen
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Hauptnavigation">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    active
                      ? "text-[var(--accent-deep)]"
                      : "text-[var(--ink-soft)] hover:text-[var(--accent)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a href={site.phoneHref} className="btn-primary hidden text-sm sm:inline-flex">
              Anrufen
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-[var(--line)] bg-white lg:hidden"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menü</span>
              <span className="relative block h-3.5 w-4">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-4 bg-[var(--ink)] transition ${open ? "translate-y-[6px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[6px] h-0.5 w-4 bg-[var(--ink)] transition ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[12px] h-0.5 w-4 bg-[var(--ink)] transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id={panelId}
          className="fixed inset-0 z-[100] bg-[var(--paper)] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="flex h-16 items-center justify-between border-b border-[var(--line)] px-5">
            <span className="font-display text-lg font-bold">{site.name}</span>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-[var(--line)] bg-white"
              aria-label="Menü schließen"
              onClick={closeNav}
            >
              <span className="relative block h-3.5 w-4">
                <span className="absolute left-0 top-[6px] h-0.5 w-4 rotate-45 bg-[var(--ink)]" />
                <span className="absolute left-0 top-[6px] h-0.5 w-4 -rotate-45 bg-[var(--ink)]" />
              </span>
            </button>
          </div>
          <nav className="flex flex-col px-5 py-4" aria-label="Mobile Navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeNav}
                className="border-b border-[var(--line)] py-4 text-lg font-medium text-[var(--ink)]"
              >
                {item.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="btn-primary mt-6 w-full text-sm">
              {site.phone}
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
