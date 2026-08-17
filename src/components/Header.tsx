"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useState } from "react";
import { nav, site } from "@/lib/site";

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark" ||
      (!document.documentElement.getAttribute("data-theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches));
  }, []);

  const toggle = useCallback(() => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  }, [dark]);

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={dark ? "Zu hellem Design wechseln" : "Zu dunklem Design wechseln"}>
      {dark ? (
        <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/></svg>
      ) : (
        <svg viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
      )}
    </button>
  );
}

function openContact() {
  window.dispatchEvent(new CustomEvent("avs:contact"));
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
    setOverDark(!!document.querySelector(".hero--dark"));
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

          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="lg-hidden">
            <ThemeToggle />
            <button type="button" className="menu-toggle" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((v) => !v)}>
              {open ? "Schliessen" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <div id={panelId} role="dialog" aria-modal={open} className={`mobile-nav${open ? " mobile-nav--open" : ""}`} aria-hidden={!open}>
        <div className="mobile-nav__top">
          <span className="brand-mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/avs-logo.svg" alt="" width={36} height={36} />
            <span className="brand-mark__text" style={{ color: "#fff" }}>{site.name}</span>
          </span>
          <button type="button" className="menu-toggle" style={{ color: "#fff" }} onClick={() => setOpen(false)}>Schliessen</button>
        </div>
        <nav className="mobile-nav__links" aria-label="Mobile Navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
          ))}
        </nav>
        <div className="mobile-nav__contact">
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={site.emailHref}>{site.email}</a>
        </div>
      </div>
    </>
  );
}
