import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktieren Sie die Airport-Verpackungs-Service GmbH am Flughafen München.",
};

export default function KontaktPage() {
  return (
    <section className="section">
      <div className="wrap grid-2" style={{ alignItems: "start" }}>
        <div className="split-copy">
          <p className="kicker">Kontakt</p>
          <h1 className="h2">Schreiben Sie uns</h1>
          <p className="lead">
            Anfragen zu Verpackung, Containerstauung oder Gefahrgutschulung.
          </p>
          <div className="muted" style={{ marginTop: 36, fontSize: 14, display: "grid", gap: 8 }}>
            <p style={{ margin: 0, fontWeight: 600, color: "var(--ink)" }}>{site.legalName}</p>
            <p style={{ margin: 0 }}>
              {site.address.line2}
              <br />
              {site.address.line1}
              <br />
              {site.address.city}
            </p>
            <p style={{ margin: "10px 0 0" }}>
              <a href={site.phoneHref} style={{ color: "var(--green)", fontWeight: 600 }}>
                {site.phone}
              </a>
            </p>
            <p style={{ margin: 0 }}>
              <a href={site.emailHref}>{site.email}</a>
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
