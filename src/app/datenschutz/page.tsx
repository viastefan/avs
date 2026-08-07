import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 680 }}>
        <p className="kicker">Rechtliches</p>
        <h1 className="h2" style={{ marginTop: 14 }}>Datenschutz</h1>
        <div style={{ marginTop: 36, display: "grid", gap: 32 }}>
          <div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.7 }}>Verantwortlicher</p>
            <p style={{ margin: "10px 0 0", fontSize: 15, color: "var(--muted)", lineHeight: 1.75 }}>
              {site.legalName}<br />
              {site.address.line1}<br />
              {site.address.city}<br />
              <a href={site.emailHref} style={{ color: "var(--accent)" }}>{site.email}</a>
            </p>
          </div>
          <div style={{ height: 1, background: "var(--line)" }} />
          <div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.7 }}>Hosting</p>
            <p style={{ margin: "10px 0 0", fontSize: 15, color: "var(--muted)", lineHeight: 1.75 }}>
              Beim Besuch werden technisch notwendige Server-Logfiles durch den Hosting-Anbieter (Vercel) verarbeitet.
            </p>
          </div>
          <div style={{ height: 1, background: "var(--line)" }} />
          <div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.7 }}>Kontaktformular</p>
            <p style={{ margin: "10px 0 0", fontSize: 15, color: "var(--muted)", lineHeight: 1.75 }}>
              Anfragedaten verarbeiten wir zur Bearbeitung Ihrer Nachricht (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b bzw. lit.&nbsp;f DSGVO).
            </p>
          </div>
          <div style={{ height: 1, background: "var(--line)" }} />
          <div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.7 }}>Ihre Rechte</p>
            <p style={{ margin: "10px 0 0", fontSize: 15, color: "var(--muted)", lineHeight: 1.75 }}>
              Auskunft, Berichtigung, Loeschung, Einschraenkung, Widerspruch, Datenuebertragbarkeit sowie Beschwerde bei einer Aufsichtsbehoerde.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
