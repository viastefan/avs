import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { containerFeatures } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Containerstauung",
  description: "Effiziente Containerstauung am Flughafen München.",
};

export default function ContainerstauungPage() {
  return (
    <>
      <PageHero
        title="Containerstauung"
        description="Optimale Raumnutzung, Ladungssicherung und Palettisierung für Land, See und Luft."
        image={images.containers}
        eyebrow="Stauung & Sicherung"
      />

      <section className="section">
        <div className="wrap grid-2">
          <ScrollReveal>
            <div className="split-copy">
              <p className="kicker">Ansatz</p>
              <h2 className="h2">Jeder Zentimeter zählt</h2>
              <p className="lead">
                Wir planen und stauen Ihre Container so, dass der verfügbare Raum optimal genutzt und
                die Ladung sicher fixiert ist — für einen bruchfreien Transport auf jedem Verkehrsweg.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images.containerYard.src} alt={images.containerYard.alt} loading="lazy" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <p className="kicker">Leistungsumfang</p>
                <h2 className="h2">Von der Planung bis zur Sicherung</h2>
              </div>
            </div>
          </ScrollReveal>
          <div className="bento">
            {containerFeatures.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 60}>
                <div className="bento-card">
                  <span className="bento-card__idx">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="bento-card__title">{feature.title}</h3>
                  <p className="bento-card__text">{feature.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Containerstauung"
        title="Bereit für Ihre nächste Sendung?"
        text="Wir stauen und sichern Ihre Ladung fachgerecht — sprechen Sie uns an."
      />
    </>
  );
}
