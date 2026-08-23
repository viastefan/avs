import type { Metadata } from "next";
import Link from "next/link";
import { nav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <section className="page-hero page-hero--compact">
        <div className="page-hero__dots" aria-hidden />
        <div className="wrap page-hero__inner">
          <span className="badge">
            <span className="badge__dot" aria-hidden />
            Fehler 404
          </span>
          <h1 className="page-hero__title">Diese Seite gibt es nicht</h1>
          <p className="page-hero__sub">
            Die aufgerufene Adresse existiert nicht oder wurde verschoben. Über die folgenden
            Links finden Sie zurück.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <p className="kicker">Weiter zu</p>
          <div className="spec" style={{ marginTop: 18 }}>
            <div className="spec__row">
              <div className="spec__label">Startseite</div>
              <div className="spec__value">
                <Link href="/" className="link-accent">
                  Zur Übersicht →
                </Link>
              </div>
            </div>
            {nav.map((item) => (
              <div key={item.href} className="spec__row">
                <div className="spec__label">{item.label}</div>
                <div className="spec__value">
                  <Link href={item.href} className="link-accent">
                    Öffnen →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
