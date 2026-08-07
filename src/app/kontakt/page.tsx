import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktieren Sie die Airport-Verpackungs-Service GmbH am Flughafen München.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        title="Kontakt aufnehmen"
        description="Wir freuen uns auf Ihre Anfrage zu Verpackung, Containerstauung oder Gefahrgutschulung."
        image={images.airport}
        eyebrow="Kontakt"
      />
      <section className="section">
        <div className="wrap grid-2" style={{ alignItems: "start" }}>
          <div>
            <p className="kicker">Ansprechpartner</p>
            <h2 className="h2" style={{ marginTop: 14 }}>So erreichen Sie uns</h2>
            <div style={{ marginTop: 32, display: "grid", gap: 28 }}>
              <div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.7 }}>Adresse</p>
                <p style={{ margin: "8px 0 0", fontSize: 15, color: "var(--ink)", lineHeight: 1.7 }}>
                  {site.legalName}<br />
                  {site.address.line1}<br />
                  {site.address.line2}<br />
                  {site.address.city}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.7 }}>Telefon</p>
                <p style={{ margin: "8px 0 0" }}>
                  <a href={site.phoneHref} style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>{site.phone}</a>
                </p>
                <p style={{ margin: "4px 0 0", fontSize: 14, color: "var(--muted)" }}>{site.phoneAlt}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.7 }}>E-Mail</p>
                <p style={{ margin: "8px 0 0" }}>
                  <a href={site.emailHref} style={{ fontSize: 15, color: "var(--accent)", fontWeight: 600 }}>{site.email}</a>
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.7 }}>Zulassung</p>
                <p style={{ margin: "8px 0 0", fontSize: 14, color: "var(--muted)" }}>
                  Reglementierter Beauftragter <strong style={{ color: "var(--ink)" }}>{site.approval}</strong>
                </p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 24 }}>
            <div>
              <p className="kicker">Standort</p>
              <h2 className="h2">Frachtzentrum Flughafen München</h2>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Frachtzentrum+Flughafen+M%C3%BCnchen+S%C3%BCdallee"
              target="_blank"
              rel="noopener noreferrer"
              className="section-head__link"
            >
              In Google Maps öffnen →
            </a>
          </div>
          <div className="map-frame">
            <iframe
              title="Standort AVS am Frachtzentrum Flughafen München"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Frachtzentrum%20Flughafen%20M%C3%BCnchen%20S%C3%BCdallee&z=14&output=embed"
            />
          </div>
        </div>
      </section>
    </>
  );
}
