"use client";

import Image from "next/image";
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
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          insetInline: 0,
          top: 0,
          zIndex: 50,
          height: "var(--header-h)",
          borderBottom: solid || open ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
          background:
            solid || open
              ? "rgba(12,18,14,0.96)"
              : "linear-gradient(to bottom, rgba(12,18,14,0.78), transparent)",
          backdropFilter: solid || open ? "blur(16px)" : "none",
          transition: "background 0.25s ease, border-color 0.25s ease",
        }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label={`${site.name} Startseite`}
            className="brand-mark"
          >
            <Image src="/brand/avs-logo.png" alt="" width={36} height={34} priority />
            <span className="brand-mark__text">{site.name}</span>
          </Link>

          <nav
            className="hidden lg:flex"
            aria-label="Hauptnavigation"
            style={{ alignItems: "center", gap: 28 }}
          >
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: active ? "var(--green-mist)" : "rgba(255,255,255,0.72)",
                    transition: "color 0.15s ease",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/kontakt"
              className="btn btn-primary"
              style={{ minHeight: 40, paddingInline: 16, fontSize: 13 }}
            >
              Kontakt
            </Link>
          </nav>

          <button
            type="button"
            className="lg:hidden"
            style={{ background: "none", border: 0, color: "#fff", fontSize: 14, fontWeight: 600 }}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Schließen" : "Menü"}
          </button>
        </div>
      </header>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          className="lg:hidden"
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "#101612" }}
        >
          <div
            style={{
              display: "flex",
              height: "var(--header-h)",
              alignItems: "center",
              justifyContent: "space-between",
              paddingInline: "var(--gutter)",
            }}
          >
            <span className="brand-mark">
              <Image src="/brand/avs-logo.png" alt="" width={36} height={34} />
              <span className="brand-mark__text">{site.name}</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{ background: "none", border: 0, color: "#fff", fontSize: 14 }}
            >
              Schließen
            </button>
          </div>
          <nav
            style={{ display: "flex", flexDirection: "column", padding: "8px var(--gutter)" }}
            aria-label="Mobile Navigation"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  padding: "20px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 600,
                }}
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
