import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { containerFeatures, containerIntro } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Containerstauung",
  description:
    "Containerstauung, Ladungssicherung und Palettisierung am Frachtzentrum Flughafen München — für Land, See und Luft.",
};

const featureIconPaths: Record<string, string> = {
  crate: "M4 6h16v12H4z M4 12h16 M12 6v12",
  package: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z M4 7.5l8 4.5 8-4.5 M12 12v9",
  lock: "M7 10V7a5 5 0 0 1 10 0v3 M5 10h14v10H5z M12 14v3",
  scale: "M12 4v15 M8 20h8 M5 8h14 M5 8l-2.5 6a3 3 0 0 0 6 0L5 8z M19 8l-2.5 6a3 3 0 0 0 6 0L19 8z",
};

function FeatureIcon({ name }: { name: string }) {
  const d = featureIconPaths[name];
  if (!d) return null;
  return (
    <span className="bento-card__icon" aria-hidden>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={d} />
      </svg>
    </span>
  );
}

export default function ContainerstauungPage() {
  return (
    <>
      <PageHero
        title="Containerstauung und Ladungssicherung"
        description="Optimale Raumnutzung, sichere Fixierung und kontrollierte Gewichtsverteilung — für Land, See und Luft."
        image={images.containers}
        eyebrow="Stauung & Sicherung"
      />

      <Breadcrumbs trail={[{ label: "Containerstauung" }]} />

      <section className="section">
        <div className="wrap split">
          <ScrollReveal>
            <div className="split__body">
              <p className="kicker">Ansatz</p>
              <h2>Jeder Zentimeter zählt — und jede Sicherung</h2>
              {containerIntro.map((p, i) => (
                <p key={i}>{p}</p>
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
                  <FeatureIcon name={feature.icon} />
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
