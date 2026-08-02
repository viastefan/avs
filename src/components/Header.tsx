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
      <header className="fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b border-[var(--line-on-dark)] bg-[var(--ink)]/92 backdrop-blur-md">
        <div className="wrap flex h-full items-center justify-between gap-6">
          <Link
            href="/"
            onClick={closeNav}
            className="font-display font-display-caps text-[0.95rem] font-bold tracking-tight"
            aria-label={`${site.name} Startseite`}
          >
            {site.name}
            <span className="ml-2 hidden text-[var(--mute-on-dark)] sm:inline">München</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Hauptnavigation">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[0.8rem] tracking-[0.02em] transition-colors ${
                    active
                      ? "text-[var(--paper)]"
                      : "text-[var(--steel-on-dark)] hover:text-[var(--paper)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={site.phoneHref}
              className="text-[0.8rem] text-[var(--paper)] hover:text-[var(--green-bright)]"
            >
              {site.phone}
            </a>
          </nav>

          <button
            type="button"
            className="meta text-[var(--paper)] lg:hidden"
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
          <div className="flex h-[var(--header-h)] items-center justify-between border-b border-[var(--line-on-dark)] px-[var(--gutter)]">
            <span className="font-display font-display-caps text-[0.95rem] font-bold">{site.name}</span>
            <button type="button" className="meta text-[var(--paper)]" onClick={closeNav} aria-label="Menü schließen">
              Schließen
            </button>
          </div>
          <nav className="flex flex-col px-[var(--gutter)] pt-2" aria-label="Mobile Navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeNav}
                className="border-b border-[var(--line-on-dark)] py-5 text-xl text-[var(--paper)]"
              >
                {item.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="mt-8 text-sm text-[var(--steel-on-dark)]">
              {site.phone}
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
