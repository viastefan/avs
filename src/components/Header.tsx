"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const panelId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`site-header ${solid || open ? "site-header--solid" : "site-header--clear"}`}
      >
        <div className="wrap site-header__inner">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label={`${site.name} Startseite`}
            className="brand-mark"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/avs-logo.svg" alt="" width={36} height={36} />
            <span className="brand-mark__text">{site.name}</span>
          </Link>

          <nav className="nav-desktop" aria-label="Hauptnavigation">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link${active ? " nav-link--active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/kontakt" className="btn nav-cta">
              Anfrage
            </Link>
          </nav>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Schließen" : "Menü"}
          </button>
        </div>
      </header>

      {open ? (
        <div id={panelId} role="dialog" aria-modal="true" className="mobile-nav">
          <div className="mobile-nav__top">
            <span className="brand-mark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/avs-logo.svg" alt="" width={36} height={36} />
              <span className="brand-mark__text">{site.name}</span>
            </span>
            <button type="button" className="menu-toggle" onClick={() => setOpen(false)}>
              Schließen
            </button>
          </div>
          <nav className="mobile-nav__links" aria-label="Mobile Navigation">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
