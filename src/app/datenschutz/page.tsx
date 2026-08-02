import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 680 }}>
        <h1 className="h2">Datenschutz</h1>
        <div className="muted" style={{ marginTop: 28, display: "grid", gap: 24, fontSize: 14 }}>
          <div>
            <h2 style={{ margin: "0 0 8px", fontSize: 16, color: "var(--ink)" }}>Verantwortlicher</h2>
            <p style={{ margin: 0 }}>
              {site.legalName}<br />
              {site.address.line1}<br />
              {site.address.city}<br />
              {site.email}
            </p>
          </div>
          <div>
            <h2 style={{ margin: "0 0 8px", fontSize: 16, color: "var(--ink)" }}>Hosting</h2>
            <p style={{ margin: 0 }}>
              Beim Besuch werden technisch notwendige Server-Logfiles durch den Hosting-Anbieter (Vercel) verarbeitet.
            </p>
          </div>
          <div>
            <h2 style={{ margin: "0 0 8px", fontSize: 16, color: "var(--ink)" }}>Kontaktformular</h2>
            <p style={{ margin: 0 }}>
              Anfragedaten verarbeiten wir zur Bearbeitung Ihrer Nachricht (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b bzw. lit.&nbsp;f DSGVO).
            </p>
          </div>
          <div>
            <h2 style={{ margin: "0 0 8px", fontSize: 16, color: "var(--ink)" }}>Ihre Rechte</h2>
            <p style={{ margin: 0 }}>
              Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch, Datenübertragbarkeit sowie Beschwerde bei einer Aufsichtsbehörde.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
