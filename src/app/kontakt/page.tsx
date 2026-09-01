import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactHero } from "@/components/ContactHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { commitments } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktieren Sie die Airport-Verpackungs-Service GmbH am Flughafen München.",
};

export default function KontaktPage() {
  return (
    <>
      <ContactHero />

      <Breadcrumbs trail={[{ label: "Kontakt" }]} />
      <section className="section">
        <div className="wrap grid-2" style={{ alignItems: "start" }}>
          <div className="contact-aside">
            <p className="kicker">Ansprechpartner</p>
            <h2 className="h2" style={{ marginTop: 14 }}>Direkt zum richtigen Kontakt</h2>
            <p className="lead" style={{ marginTop: 16 }}>
              Rufen Sie an, wenn es eilig ist — am Telefon klären wir in fünf Minuten, was
              schriftlich mehrere Nachrichten braucht.
            </p>

            <div className="contact-lines">
              <a className="contact-line" href={site.phoneHref}>
                <span className="contact-line__label">Zentrale</span>
                <span className="contact-line__value">{site.phone}</span>
                <span className="contact-line__note">Werktags erreichbar</span>
              </a>
              <a className="contact-line" href={`tel:${site.phoneAlt.replace(/[^+\d]/g, "")}`}>
                <span className="contact-line__label">Zweitanschluss</span>
                <span className="contact-line__value">{site.phoneAlt}</span>
                <span className="contact-line__note">Falls besetzt</span>
              </a>
              <a className="contact-line" href={site.emailHref}>
                <span className="contact-line__label">E-Mail</span>
                <span className="contact-line__value">{site.email}</span>
                <span className="contact-line__note">Antwort werktags</span>
              </a>
            </div>

            <div className="spec" style={{ marginTop: 36 }}>
              <div className="spec__row">
                <div className="spec__label">Anschrift</div>
                <div className="spec__value">
                  {site.legalName}
                  <br />
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.city}
                </div>
              </div>
              <div className="spec__row">
                <div className="spec__label">Zulassung</div>
                <div className="spec__value">
                  Reglementierter Beauftragter {site.approval}
                </div>
              </div>
              <div className="spec__row">
                <div className="spec__label">Erreichbarkeit</div>
                <div className="spec__value">Montag bis Freitag, 08:00–17:00 Uhr</div>
              </div>
            </div>
          </div>

          <Suspense fallback={<div className="form-panel" style={{ minHeight: 480 }} />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap">
          <ScrollReveal>
            <div className="sec-intro">
              <p className="kicker">Was Sie erwarten können</p>
              <h2>Wie wir mit Anfragen umgehen</h2>
              <p>
                Vier Zusagen, an denen Sie uns messen können — vom ersten Anruf bis zur Übergabe
                der Sendung.
              </p>
            </div>
          </ScrollReveal>
          <div className="commit-grid">
            {commitments.map((c, i) => (
              <ScrollReveal key={c.title} delay={i * 60}>
                <div className="commit">
                  <span className="commit__check" aria-hidden>
                    <svg viewBox="0 0 16 16" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8.5 6.2 11.5 13 4.5" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="commit__title">{c.title}</h3>
                    <p className="commit__text">{c.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
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
          <div className="anfahrt">
            <div className="anfahrt__item">
              <p className="anfahrt__label">Mit dem Auto</p>
              <p className="anfahrt__text">
                A92, Ausfahrt Flughafen München. Der Beschilderung „Frachtzentrum / Cargo“ folgen,
                dann zur Südallee. Modul H liegt im Pavillon-Bereich; Besucherparkplätze sind
                ausgeschildert.
              </p>
            </div>
            <div className="anfahrt__item">
              <p className="anfahrt__label">Mit S-Bahn und Bus</p>
              <p className="anfahrt__text">
                S1 oder S8 bis München Flughafen Terminal, weiter mit dem Bus Richtung
                Frachtzentrum. Planen Sie ab Terminal etwa 15 Minuten ein.
              </p>
            </div>
            <div className="anfahrt__item">
              <p className="anfahrt__label">Anlieferung</p>
              <p className="anfahrt__text">
                Bitte melden Sie größere Anlieferungen vorab telefonisch an, damit wir die Annahme
                vorbereiten und Wartezeiten vermeiden.
              </p>
            </div>
          </div>

          <div className="map-frame" style={{ marginTop: 24 }}>
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
