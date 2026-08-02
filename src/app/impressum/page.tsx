import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <section className="section">
      <div className="wrap" style={{ maxWidth: 680 }}>
        <h1 className="h2">Impressum</h1>
        <div className="muted" style={{ marginTop: 28, display: "grid", gap: 24, fontSize: 14 }}>
          <div>
            <h2 style={{ margin: "0 0 8px", fontSize: 16, color: "var(--ink)" }}>Angaben gemäß § 5 TMG</h2>
            <p style={{ margin: 0 }}>
              {site.legalName}<br />
              {site.address.line1}<br />
              {site.address.line2}<br />
              {site.address.city}
            </p>
          </div>
          <div>
            <h2 style={{ margin: "0 0 8px", fontSize: 16, color: "var(--ink)" }}>Kontakt</h2>
            <p style={{ margin: 0 }}>
              {site.phone}<br />
              {site.phoneAlt}<br />
              {site.email}
            </p>
          </div>
          <div>
            <h2 style={{ margin: "0 0 8px", fontSize: 16, color: "var(--ink)" }}>Reglementierter Beauftragter</h2>
            <p style={{ margin: 0 }}>{site.approval}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
