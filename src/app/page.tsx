import Image from "next/image";
import Link from "next/link";
import { Globe } from "@/components/Globe";
import { ScrollReveal } from "@/components/ScrollReveal";
import { services } from "@/lib/content";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__media">
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 36%" }}
          />
        </div>
        <div className="hero__shade" aria-hidden />
        <div className="wrap hero__inner">
          <div className="hero__stack">
            <p className="kicker fade-up">Flughafen München · Modul H</p>
            <h1 className="display fade-up fade-up-1">{site.name}</h1>
            <p className="lead fade-up fade-up-2">
              Verpackung, Containerstauung und Gefahrgutschulung — präzise am Frachtzentrum.
            </p>
            <div className="hero__actions fade-up fade-up-3">
              <Link href="/kontakt" className="btn btn-primary">
                Anfrage senden
              </Link>
              <Link href="/leistungen" className="btn btn-secondary">
                Leistungen
              </Link>
            </div>
          </div>
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
              <p className="kicker">Standort</p>
              <h2 className="h2">Direkt am Frachtzentrum</h2>
              <p className="lead">
                Fachgerechte Verpackung und Dokumentation für Luft-, See- und Straßenfracht —
                IATA-, ADR- und IMDG-konform.
              </p>
              <a href={site.phoneHref} className="link-accent">
                {site.phone} →
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="figure">
              <Image
                src={images.warehouse.src}
                alt={images.warehouse.alt}
                fill
                sizes="(max-width: 900px) 100vw, 540px"
                style={{ objectFit: "cover" }}
              />
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

      <section className="cta-band">
        <div className="wrap cta-band__row">
          <ScrollReveal>
            <div>
              <p className="kicker">Nächster Schritt</p>
              <h2 className="h2">Wie können wir helfen?</h2>
              <p className="muted">Anfrage senden oder anrufen — {site.address.line2}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="cta__actions">
              <Link href="/kontakt" className="btn btn-primary">
                Kontakt
              </Link>
              <a href={site.phoneHref} className="btn btn-outline">
                {site.phone}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
