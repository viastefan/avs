import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { containerFeatures, containerIntro } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Containerstauung",
  description:
    "Containerstauung, Ladungssicherung und Palettisierung am Frachtzentrum Flughafen München — für Land, See und Luft.",
};

export default function ContainerstauungPage() {
  return (
    <>
      <PageHero
        title="Containerstauung und Ladungssicherung"
        description="Optimale Raumnutzung, sichere Fixierung und kontrollierte Gewichtsverteilung — für Land, See und Luft."
        image={images.containers}
        eyebrow="Stauung & Sicherung"
      />

      <section className="section">
        <div className="wrap split">
          <ScrollReveal>
            <div className="split__body">
              <p className="kicker">Ansatz</p>
              <h2>Jeder Zentimeter zählt — und jede Sicherung</h2>
              {containerIntro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="split__media">
              <Image
                src={images.warehouse.src}
                alt={images.warehouse.alt}
                fill
                sizes="(max-width: 900px) 100vw, 560px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="wrap">
          <ScrollReveal>
            <div className="sec-intro">
              <p className="kicker">Leistungsumfang</p>
              <h2>Von der Planung bis zur Sicherung</h2>
              <p>
                Wir übernehmen die komplette Vorbereitung Ihrer Ladeeinheit — damit am Terminal
                nichts nachgearbeitet werden muss.
              </p>
            </div>
          </ScrollReveal>
          <div className="bento">
            {containerFeatures.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 60}>
                <div className="bento-card">
                  <h3 className="bento-card__title">{feature.title}</h3>
                  <p className="bento-card__text">{feature.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split split--flip">
          <ScrollReveal>
            <div className="split__body">
              <p className="kicker">Verkehrsträger</p>
              <h2>See, Straße und Luft — jeweils andere Regeln</h2>
              <p>
                Ein Seecontainer erlebt Schräglagen und Dauerschwingungen, ein Lkw abrupte
                Bremsvorgänge, eine Luftfrachtpalette Höhen- und Druckwechsel. Wir stauen und
                sichern deshalb nicht nach Schema F, sondern nach dem tatsächlichen Transportweg.
              </p>
              <p>
                Auf Wunsch dokumentieren wir die Ladungssicherung und stimmen die Gewichtsverteilung
                mit Ihrem Spediteur oder dem Handling am Frachtzentrum ab.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="split__media">
              <Image
                src={images.trucks.src}
                alt={images.trucks.alt}
                fill
                sizes="(max-width: 900px) 100vw, 560px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </ScrollReveal>
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
