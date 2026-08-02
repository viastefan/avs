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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b border-white/10 bg-[var(--ink)]/90 backdrop-blur-xl">
        <div className="wrap flex h-full items-center justify-between gap-6">
          <Link href="/" onClick={() => setOpen(false)} className="min-w-0" aria-label={`${site.name} Startseite`}>
            <span className="font-display text-[1.2rem] font-semibold tracking-tight text-white">
              {site.name}
            </span>
            <span className="ml-2 hidden text-[0.8rem] text-white/55 sm:inline">München</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Hauptnavigation">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[0.92rem] transition-colors ${
                    active ? "text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/kontakt" className="btn btn-primary !min-h-9 !px-4 !text-sm">
              Kontakt
            </Link>
          </nav>

          <button
            type="button"
            className="text-sm text-white lg:hidden"
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
          <div className="flex h-[var(--header-h)] items-center justify-between border-b border-white/10 px-[var(--gutter)]">
            <span className="font-display text-[1.2rem] font-semibold text-white">{site.name}</span>
            <button type="button" className="text-sm text-white" onClick={() => setOpen(false)}>
              Schließen
            </button>
          </div>
          <nav className="flex flex-col px-[var(--gutter)] pt-4" aria-label="Mobile Navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-5 text-xl text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
