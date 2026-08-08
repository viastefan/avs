import type { Metadata } from "next";
import Link from "next/link";
import { nav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="page-hero page-hero--compact">
      <div className="page-hero__dots" aria-hidden />
      <div className="wrap page-hero__inner">
        <p className="page-hero__eyebrow">Fehler 404</p>
        <h1 className="page-hero__title">Diese Seite gibt es nicht</h1>
        <p className="page-hero__sub">
          Die aufgerufene Adresse existiert nicht oder wurde verschoben. Über die folgenden Links
          finden Sie zurück.
        </p>

        <div className="hero__links" style={{ marginTop: 30 }}>
          <Link href="/" className="hero__link">
            Zur Startseite
          </Link>
          <Link href="/kontakt" className="hero__link">
            Kontakt aufnehmen
          </Link>
        </div>

        <nav
          aria-label="Weitere Seiten"
          style={{
            marginTop: 44,
            paddingTop: 24,
            borderTop: "1px solid var(--line)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px 28px",
            fontSize: 14,
          }}
        >
          {nav.map((item) => (
            <Link key={item.href} href={item.href} style={{ color: "var(--muted)" }}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
