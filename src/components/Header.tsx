"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { nav, site } from "@/lib/site";

const HERO_ROUTES = [
  "/",
  "/leistungen",
  "/containerstauung",
  "/gefahrgutschulung",
] as const;

function routeHasHero(pathname: string) {
  if (HERO_ROUTES.includes(pathname as (typeof HERO_ROUTES)[number])) return true;
  if (pathname.startsWith("/leistungen/")) return true;
  return false;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();
  const hasHero = routeHasHero(pathname);
  const solid = open || !hasHero || scrolled;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${solid ? "site-header--solid" : "site-header--clear"}`}>
        <div className="wrap site-header__inner">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label={`${site.name} Startseite`}
            className="brand-mark"
          >
            <Image src="/brand/avs-logo.png" alt="" width={32} height={30} priority />
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
            <Link href="/kontakt" className="btn btn-primary nav-cta">
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
              <Image src="/brand/avs-logo.png" alt="" width={32} height={30} />
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
          <div className="mobile-nav__cta">
            <Link href="/kontakt" className="btn btn-primary" onClick={() => setOpen(false)}>
              Anfrage senden
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
