import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { trainingFormats, trainingIntro, trainingTopics } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Gefahrgutschulung",
  description:
    "Praxisnahe Gefahrgutschulung zu IATA, ADR und IMDG am Flughafen München — Verpacken, Kennzeichnen, Dokumentieren.",
};

export default function GefahrgutschulungPage() {
  return (
    <>
      <PageHero
        title="Gefahrgutschulung für Ihr Team"
        description="IATA, ADR und IMDG — praxisnah vermittelt für Verpacken, Kennzeichnen und Dokumentieren."
        image={images.training}
        eyebrow="Qualifikation"
      />

      <section className="section">
        <div className="wrap split">
          <ScrollReveal>
            <div className="split__body">
              <p className="kicker">Warum schulen</p>
              <h2>Sicherheit beginnt mit Wissen</h2>
              {trainingIntro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="split__media">
              <Image
                src={images.workshop.src}
                alt={images.workshop.alt}
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
              <p className="kicker">Schulungsinhalte</p>
              <h2>Das lernen Sie bei uns</h2>
              <p>
                Vier Themenblöcke, die den gesamten Weg eines Gefahrgut-Packstücks abdecken — von
                der Vorschrift bis zum fertigen Dokument.
              </p>
            </div>
          </ScrollReveal>
          <div className="bento">
            {trainingTopics.map((topic, i) => (
              <ScrollReveal key={topic.title} delay={i * 60}>
                <div className="bento-card">
                  <span className="bento-card__idx">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="bento-card__title">{topic.title}</h3>
                  <ul
                    style={{
                      margin: "12px 0 0",
                      padding: "0 0 0 16px",
                      display: "grid",
                      gap: 5,
                      fontSize: 13,
                      color: "var(--muted)",
                      lineHeight: 1.55,
                    }}
                  >
                    {topic.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ScrollReveal>
            <div className="sec-intro">
              <p className="kicker">Formate</p>
              <h2>Wo und wie wir schulen</h2>
            </div>
          </ScrollReveal>
          <div className="why-grid">
            {trainingFormats.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 60}>
                <div className="why-card">
                  <div className="why-card__num">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="why-card__title">{f.title}</h3>
                  <p className="why-card__text">{f.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Gefahrgutschulung"
        title="Schulung für Ihr Team anfragen"
        text="Wir stimmen Inhalt, Umfang und Termin auf Ihren Betrieb ab — vor Ort oder bei uns."
      />
    </>
  );
}
