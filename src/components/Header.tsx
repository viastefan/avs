"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-[background,border-color,backdrop-filter] duration-300 ${
          scrolled || open
            ? "border-b border-white/10 bg-[var(--ink)]/92 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-[var(--ink)]/70 to-transparent"
        }`}
      >
        <div className="wrap flex h-full items-center justify-between gap-6">
          <Link href="/" onClick={() => setOpen(false)} aria-label={`${site.name} Startseite`}>
            <span className="font-display text-[1.35rem] font-semibold tracking-tight text-white">
              {site.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Hauptnavigation">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[0.95rem] transition-colors ${
                    active ? "text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/kontakt" className="btn btn-primary !min-h-10 !px-4 !text-sm">
              Kontakt
            </Link>
          </nav>

          <button
            type="button"
            className="text-sm font-medium text-white lg:hidden"
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
          <div className="flex h-[var(--header-h)] items-center justify-between px-[var(--gutter)]">
            <span className="font-display text-[1.35rem] font-semibold text-white">{site.name}</span>
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
                className="border-b border-white/10 py-5 text-2xl text-white"
              >
                {item.label}
              </Link>
            ))}
            <a href={site.phoneHref} className="mt-8 text-sm text-white/60">
              {site.phone}
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
