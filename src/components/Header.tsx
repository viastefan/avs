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
      <header className="fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b border-[var(--line)] bg-[var(--ink)]">
        <div className="wrap flex h-full items-center justify-between gap-4">
          <Link
            href="/"
            onClick={closeNav}
            className="flex items-center gap-3"
            aria-label={`${site.name} Startseite`}
          >
            <span className="flex h-8 w-8 items-center justify-center border border-[var(--line)] bg-[var(--ink-2)] text-[var(--green)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 18L12 4L20 18H4Z" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8.5 14H15.5" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </span>
            <span className="leading-none">
              <span className="font-display block text-[1.35rem] font-extrabold tracking-tight text-[var(--paper)]">
                {site.name}
              </span>
              <span className="meta mt-0.5 block text-[var(--mute)]">MUC · Modul H</span>
            </span>
          </Link>

          <nav className="hidden items-stretch self-stretch lg:flex" aria-label="Hauptnavigation">
            {nav.map((item, i) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center border-l border-[var(--line)] px-5 text-[0.72rem] font-medium uppercase tracking-[0.08em] transition-colors ${
                    isActive
                      ? "text-[var(--green)]"
                      : "text-[var(--paper)] hover:bg-[var(--ink-2)]"
                  }`}
                >
                  <span className="mr-2 text-[var(--mute)]">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              );
            })}
            <a
              href={site.phoneHref}
              className="flex items-center border-l border-[var(--line)] bg-[var(--paper)] px-5 text-[0.72rem] font-medium uppercase tracking-[0.08em] text-[var(--ink)] hover:bg-[var(--green)]"
            >
              Anrufen
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex h-9 items-center border border-[var(--line)] px-3 text-[0.72rem] font-medium uppercase tracking-[0.08em] text-[var(--paper)] lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Schließen" : "Menü"}
          </button>
        </div>
      </header>

      {open ? (
        <div
          id={panelId}
          className="fixed inset-0 z-[100] bg-[var(--ink)] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="flex h-[var(--header-h)] items-center justify-between border-b border-[var(--line)] px-[var(--gutter)]">
            <span className="font-display text-xl font-extrabold text-[var(--paper)]">{site.name}</span>
            <button
              type="button"
              className="border border-[var(--line)] px-3 py-2 text-[0.72rem] uppercase tracking-[0.08em] text-[var(--paper)]"
              aria-label="Menü schließen"
              onClick={closeNav}
            >
              Schließen
            </button>
          </div>
          <nav className="flex flex-col" aria-label="Mobile Navigation">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeNav}
                className="flex items-center justify-between border-b border-[var(--line)] px-[var(--gutter)] py-5 text-lg font-medium uppercase tracking-wide text-[var(--paper)]"
              >
                <span>{item.label}</span>
                <span className="meta text-[var(--mute)]">{String(i + 1).padStart(2, "0")}</span>
              </Link>
            ))}
            <a href={site.phoneHref} className="btn-primary m-[var(--gutter)]">
              {site.phone}
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
