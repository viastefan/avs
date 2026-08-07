import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 680 }}>
        <p className="kicker">Rechtliches</p>
        <h1 className="h2" style={{ marginTop: 14 }}>Impressum</h1>
        <div style={{ marginTop: 36, display: "grid", gap: 32 }}>
          <div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.7 }}>Angaben gemaess 5 TMG</p>
            <p style={{ margin: "10px 0 0", fontSize: 15, color: "var(--ink)", lineHeight: 1.75 }}>
              {site.legalName}<br />
              {site.address.line1}<br />
              {site.address.line2}<br />
              {site.address.city}
            </p>
          </div>
          <div style={{ height: 1, background: "var(--line)" }} />
          <div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.7 }}>Kontakt</p>
            <p style={{ margin: "10px 0 0", fontSize: 15, color: "var(--ink)", lineHeight: 1.75 }}>
              {site.phone}<br />
              {site.phoneAlt}<br />
              <a href={site.emailHref} style={{ color: "var(--accent)" }}>{site.email}</a>
            </p>
          </div>
          <div style={{ height: 1, background: "var(--line)" }} />
          <div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.7 }}>Reglementierter Beauftragter</p>
            <p style={{ margin: "10px 0 0", fontSize: 15, color: "var(--ink)" }}>{site.approval}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
