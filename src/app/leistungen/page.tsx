import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { capabilities, processSteps, services } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Verpackungsservice",
  description: "Export-, Gefahrgut-, Schwergut- und Spezialverpackung am Flughafen München.",
};

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        title="Verpackungsservice"
        description="Fachgerechte Verpackung für Gefahrgüter und Transportgüter — Straße, See und Luftfracht."
        image={images.materials}
        eyebrow="Leistungen"
      />

      <section className="section">
        <div className="wrap grid-2">
          <ScrollReveal>
            <div className="split-copy">
              <p className="kicker">Überblick</p>
              <h2 className="h2">Verpackung, auf die Verlass ist</h2>
              <p className="lead">
                Als reglementierter Beauftragter am Frachtzentrum des Flughafens München verpacken
                wir Ihre Güter normkonform, sicher und termingerecht — vom einzelnen Packstück bis
                zur kompletten Maschine.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div>
              <p className="kicker">Leistungsübersicht</p>
              <div className="spec" style={{ marginTop: 18 }}>
                {capabilities.map((c) => (
                  <div key={c.label} className="spec__row">
                    <div className="spec__label">{c.label}</div>
                    <div className="spec__value">{c.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <p className="kicker">Alle Leistungen</p>
                <h2 className="h2">Was wir verpacken</h2>
              </div>
            </div>
          </ScrollReveal>
          <div className="bento">
            {services.map((service, i) => (
              <ScrollReveal key={service.slug} delay={i * 60} className={i === 0 ? "bento-wide" : ""}>
                <Link href={`/leistungen/${service.slug}`} className={`bento-card${i === 0 ? " bento-wide" : ""}`}>
                  <span className="bento-card__idx">{String(i + 1).padStart(2, "0")}</span>
                  <p className="bento-card__sector">{service.sector}</p>
                  <h3 className="bento-card__title">{service.title}</h3>
                  <p className="bento-card__text">{service.summary}</p>
                  <span className="bento-card__arrow">
                    <svg viewBox="0 0 16 16"><path d="M4 12 L12 4 M12 4 L5 4 M12 4 L12 11" /></svg>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ScrollReveal>
            <div className="sec-intro">
              <p className="kicker">Ablauf</p>
              <h2>So läuft eine Anfrage bei uns</h2>
              <p>
                Vier Schritte von der ersten Rückfrage bis zur abfertigungsbereiten Sendung.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="steps">
              {processSteps.map((s, i) => (
                <div key={s.title} className="step">
                  <div className="step__num">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__text">{s.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CtaBand
        kicker="Individuelle Anfrage"
        title="Sie haben besondere Anforderungen?"
        text="Sprechen Sie mit uns — wir finden die passende Verpackungslösung für Ihre Güter."
      />
    </>
  );
}
