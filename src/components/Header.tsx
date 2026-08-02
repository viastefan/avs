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
      <header className="fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b border-[var(--line-on-dark)] bg-[var(--ink)]/95 backdrop-blur-md">
        <div className="wrap flex h-full items-center justify-between gap-6">
          <Link
            href="/"
            onClick={closeNav}
            className="flex flex-col leading-none"
            aria-label={`${site.name} Startseite`}
          >
            <span className="font-display text-[1.15rem] font-semibold tracking-tight text-[#eef0f2]">
              {site.name}
            </span>
            <span className="mt-1 hidden text-[0.68rem] tracking-[0.04em] text-[var(--mute-on-dark)] sm:block">
              Flughafen München
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Hauptnavigation">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[0.92rem] transition-colors ${
                    active
                      ? "text-[#eef0f2]"
                      : "text-[var(--steel-on-dark)] hover:text-[#eef0f2]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/kontakt" className="btn-primary !min-h-9 !px-4 !text-[0.85rem]">
              Kontakt
            </Link>
          </nav>

          <button
            type="button"
            className="text-sm text-[#eef0f2] lg:hidden"
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
            <span className="font-display text-[1.15rem] font-semibold text-[#eef0f2]">{site.name}</span>
            <button type="button" className="text-sm text-[#eef0f2]" onClick={closeNav} aria-label="Menü schließen">
              Schließen
            </button>
          </div>
          <nav className="flex flex-col px-[var(--gutter)] pt-2" aria-label="Mobile Navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeNav}
                className="border-b border-[var(--line-on-dark)] py-5 text-xl text-[#eef0f2]"
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
