import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { trainingTopics } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Gefahrgutschulung",
  description: "Professionelle Gefahrgutschulung am Flughafen München.",
};

export default function GefahrgutschulungPage() {
  return (
    <>
      <PageHero
        title="Gefahrgutschulung"
        description="IATA, ADR und IMDG — praxisnah für Verpacken, Kennzeichnen und Dokumentieren."
        image={images.training}
        eyebrow="Qualifikation"
      />

      <section className="section">
        <div className="wrap prose-narrow">
          <ScrollReveal>
            <div className="split-copy">
              <p className="kicker">Warum schulen</p>
              <h2 className="h2">Sicherheit beginnt mit Wissen</h2>
              <p className="lead">
                Wer Gefahrgut verpackt, kennzeichnet oder versendet, trägt Verantwortung für Mensch
                und Umwelt. In unseren praxisnahen Schulungen vermitteln wir die aktuellen Vorschriften
                für Straße, See und Luft — verständlich und direkt anwendbar.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <p className="kicker">Schulungsinhalte</p>
                <h2 className="h2">Das lernen Sie bei uns</h2>
              </div>
            </div>
          </ScrollReveal>
          <div className="bento">
            {trainingTopics.map((topic, i) => (
              <ScrollReveal key={topic.title} delay={i * 60}>
                <div className="bento-card">
                  <span className="bento-card__idx">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="bento-card__title">{topic.title}</h3>
                  <ul style={{ margin: "12px 0 0", padding: "0 0 0 16px", display: "grid", gap: 5, fontSize: 13, color: "var(--muted)", lineHeight: 1.55 }}>
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

      <CtaBand
        kicker="Gefahrgutschulung"
        title="Schulung für Ihr Team anfragen"
        text="Wir stimmen Inhalt und Termin auf Ihren Betrieb ab — vor Ort oder bei uns."
      />
    </>
  );
}
