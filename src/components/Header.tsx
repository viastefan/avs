"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";
import { openContact } from "@/lib/dialogs";
import { nav, site } from "@/lib/site";
import {
  applyTheme,
  readChoice,
  resolveTheme,
  writeChoice,
  type Theme,
  type ThemeChoice,
} from "@/lib/theme";

const order: ThemeChoice[] = ["auto", "light", "dark"];

const label: Record<ThemeChoice, string> = {
  auto: "Design folgt der Uhrzeit — jetzt hell/dunkel umschalten",
  light: "Helles Design — auf dunkel umschalten",
  dark: "Dunkles Design — zurück auf automatisch",
};

export function ThemeToggle({ className = "theme-toggle" }: { className?: string } = {}) {
  const [choice, setChoice] = useState<ThemeChoice>("auto");
  const [resolved, setResolved] = useState<Theme>("dark");

  useEffect(() => {
    const current = readChoice();
    setChoice(current);
    setResolved(resolveTheme(current));
  }, []);

  /* On auto the page has to cross 18:00 on its own — a tab left open all
     afternoon should not still be light at nine in the evening. */
  useEffect(() => {
    if (choice !== "auto") return;
    const tick = () => {
      const next = resolveTheme("auto");
      setResolved((prev) => (prev === next ? prev : next));
      applyTheme("auto");
    };
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [choice]);

  const cycle = useCallback(() => {
    const next = order[(order.indexOf(choice) + 1) % order.length];
    setChoice(next);
    setResolved(resolveTheme(next));
    writeChoice(next);
    applyTheme(next);
  }, [choice]);

  return (
    <button
      type="button"
      className={`${className}${choice === "auto" ? " theme-toggle--auto" : ""}`}
      onClick={cycle}
      aria-label={label[choice]}
      title={label[choice]}
    >
      {resolved === "dark" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20.5 14.3A8.5 8.5 0 1 1 9.7 3.5a7 7 0 0 0 10.8 10.8z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.6v2.2M12 19.2v2.2M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.4 19.6 6 18M18 6l1.6-1.6" />
        </svg>
      )}
      {choice === "auto" ? <span className="theme-toggle__auto" aria-hidden /> : null}
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const panelId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setSolid(window.scrollY > 24);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) setOpen(false);
    setOverDark(!!document.querySelector(".hero--dark, .page-hero, .c-hero"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <header
        className={`site-header ${
          overDark && !solid && !open ? "site-header--over" : "site-header--solid"
        }${solid ? " site-header--scrolled" : ""}`}
      >
        <div className="wrap site-header__inner">
          <Link href="/" onClick={() => setOpen(false)} aria-label={`${site.name} Startseite`} className="brand-mark">
            <span className="brand-logo" aria-hidden="true" />
            <span className="brand-mark__text">{site.name}</span>
          </Link>

          <nav className="nav-desktop" aria-label="Hauptnavigation">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link key={item.href} href={item.href} className={`nav-link${active ? " nav-link--active" : ""}`}>
                  {item.label}
                </Link>
              );
            })}
            <ThemeToggle />
            <button type="button" className="btn nav-cta" onClick={openContact}>Anfrage</button>
          </nav>

          <button
            type="button"
            className={`menu-toggle lg-hidden${open ? " menu-toggle--open" : ""}`}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-toggle__bars" aria-hidden />
          </button>
        </div>
      </header>

      {/* The dim sits between the page and the panel, so the page reads as
          pushed away rather than merely covered. */}
      <button
        type="button"
        className={`mobile-nav__scrim${open ? " mobile-nav__scrim--on" : ""}`}
        tabIndex={-1}
        aria-hidden
        onClick={() => setOpen(false)}
      />

      <div id={panelId} role="dialog" aria-modal={open} className={`mobile-nav${open ? " mobile-nav--open" : ""}`} aria-hidden={!open}>
        <div className="mobile-nav__top">
          <Link href="/" className="brand-mark" onClick={() => setOpen(false)}>
            <span className="brand-logo" aria-hidden="true" />
            <span className="brand-mark__text">{site.name}</span>
          </Link>
          {/* A ringed button rather than the header's morphing bars: on the
              black panel a bare 2px cross reads as a smudge. */}
          <button
            type="button"
            className="menu-close"
            aria-label="Menü schließen"
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              <path d="M17.5 6.5 6.5 17.5M6.5 6.5l11 11" />
            </svg>
            <span className="menu-close__word">Schließen</span>
          </button>
        </div>
        <nav className="mobile-nav__links" aria-label="Mobile Navigation">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mobile-nav__foot">
          <div className="mobile-nav__contact">
            <a href={site.phoneHref} tabIndex={open ? 0 : -1}>{site.phone}</a>
            <a href={site.emailHref} tabIndex={open ? 0 : -1}>{site.email}</a>
          </div>
          <ThemeToggle className="theme-toggle theme-toggle--nav" />
        </div>
      </div>
    </>
  );
}
