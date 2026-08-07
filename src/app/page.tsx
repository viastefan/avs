import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Globe } from "@/components/Globe";
import { ScrollReveal } from "@/components/ScrollReveal";
import { services, stats, whyPoints } from "@/lib/content";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero__inner">
          <p className="hero__eyebrow fade-up">{site.name}</p>
          <h1 className="hero__title fade-up fade-up-1">
            Verpackung für die Luftfracht.
          </h1>
          <p className="hero__sub fade-up fade-up-2">
            Normkonform, vollständig dokumentiert und termintreu — direkt am Frachtzentrum
            des Flughafens München.
          </p>
          <div className="hero__links fade-up fade-up-3">
            <Link href="/kontakt" className="hero__link">
              Anfrage senden
            </Link>
            <Link href="/leistungen" className="hero__link">
              Leistungen ansehen
            </Link>
          </div>
        </div>
        <div className="hero__stage fade-up fade-up-3">
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      <div className="rail">
        <div className="wrap rail__inner">
          <p style={{ margin: 0 }}>
            <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{site.legalName}</strong>
            {" · "}
            {site.address.line2}
          </p>
          <p style={{ margin: 0 }}>
            Reglementierter Beauftragter{" "}
            <strong style={{ color: "var(--ink)" }}>{site.approval}</strong>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap grid-2">
          <ScrollReveal>
            <div className="split-copy">
              <p className="kicker">Über uns</p>
              <h2 className="h2">Verpackung mit System — direkt am Frachtzentrum</h2>
              <p className="lead">
                Die Airport-Verpackungs-Service GmbH verpackt Transport- und Gefahrgüter für Luft-,
                See- und Straßenfracht. Ob einzelnes Packstück, sensible Spezialware oder tonnenschwere
                Maschine — wir liefern die normkonforme Lösung, inklusive Dokumentation und Beratung.
              </p>
              <p className="muted" style={{ marginTop: 16, fontSize: 15, lineHeight: 1.7 }}>
                Als reglementierter Beauftragter arbeiten wir nach HPE, IATA/ICAO, IMDG und ADR —
                zuverlässig, termintreu und direkt dort, wo Ihre Sendung umgeschlagen wird.
              </p>
              <a href={site.phoneHref} className="link-accent">
                {site.phone} →
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="figure">
              <Image
                src={images.packaging.src}
                alt={images.packaging.alt}
                fill
                sizes="(max-width: 900px) 100vw, 540px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ScrollReveal>
            <div className="stats">
              {stats.map((s) => (
                <div key={s.label} className="stat">
                  <div className="stat__value">{s.value}</div>
                  <div className="stat__label">{s.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="leistungen">
        <div className="wrap">
          <ScrollReveal>
            <div className="section-head">
              <div>
                <p className="kicker">Leistungen</p>
                <h2 className="h2">Was wir bewegen</h2>
              </div>
              <Link href="/leistungen" className="section-head__link">
                Alle ansehen →
              </Link>
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
            <div className="section-head">
              <div>
                <p className="kicker">Warum AVS</p>
                <h2 className="h2">Darauf können Sie sich verlassen</h2>
              </div>
            </div>
          </ScrollReveal>
          <div className="why-grid">
            {whyPoints.map((point, i) => (
              <ScrollReveal key={point.title} delay={i * 60}>
                <div className="why-card">
                  <div className="why-card__num">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="why-card__title">{point.title}</h3>
                  <p className="why-card__text">{point.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="feature-band">
        <ScrollReveal>
          <article className="feature">
            <div className="feature__media">
              <Image
                src={images.containerYard.src}
                alt={images.containerYard.alt}
                fill
                sizes="(max-width: 960px) 100vw, 58vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="feature__body">
              <p className="kicker">Containerstauung</p>
              <h2 className="h2">Effizient gestaut</h2>
              <p className="muted">
                Optimale Raumnutzung, Ladungssicherung und Palettisierung für Land, See und Luft.
              </p>
              <Link href="/containerstauung" className="btn btn-secondary">
                Mehr erfahren
              </Link>
            </div>
          </article>
        </ScrollReveal>

        <ScrollReveal>
          <article className="feature feature--flip">
            <div className="feature__media">
              <Image
                src={images.training.src}
                alt={images.training.alt}
                fill
                sizes="(max-width: 960px) 100vw, 58vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="feature__body">
              <p className="kicker">Gefahrgutschulung</p>
              <h2 className="h2">Sicher geschult</h2>
              <p className="muted">
                Praxisnahe Schulungen zu IATA, ADR und IMDG — Verpacken, Kennzeichnen und
                Dokumentieren.
              </p>
              <Link href="/gefahrgutschulung" className="btn btn-primary">
                Mehr erfahren
              </Link>
            </div>
          </article>
        </ScrollReveal>
      </section>

      <section className="section network">
        <div className="wrap grid-2">
          <ScrollReveal>
            <div className="split-copy">
              <p className="kicker">Netzwerk</p>
              <h2 className="h2">Von München in die Welt</h2>
              <p className="lead">
                Vom Hub München begleiten wir Sendungen in internationale Frachtnetzwerke.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Globe />
          </ScrollReveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap prose-narrow">
          <ScrollReveal>
            <div className="section-head" style={{ marginBottom: 8 }}>
              <div>
                <p className="kicker">Häufige Fragen</p>
                <h2 className="h2">Gut zu wissen</h2>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <Faq />
          </ScrollReveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
