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
          <h1 className="h2">Anfrage stellen</h1>
          <p className="lead">
            Verpackung, Containerstauung oder Gefahrgutschulung — wir melden uns zeitnah.
          </p>
          <div className="contact-aside">
            <p style={{ margin: 0 }}>
              <strong>{site.legalName}</strong>
            </p>
            <p style={{ margin: 0 }}>
              {site.address.line2}
              <br />
              {site.address.line1}
              <br />
              {site.address.city}
            </p>
            <p style={{ margin: "8px 0 0" }}>
              <a href={site.phoneHref} style={{ color: "var(--green)", fontWeight: 600 }}>
                {site.phone}
              </a>
            </p>
            <p style={{ margin: 0 }}>
              <a href={site.emailHref}>{site.email}</a>
            </p>
            <p style={{ margin: "12px 0 0", fontSize: 13 }}>
              Reglementierter Beauftragter {site.approval}
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
