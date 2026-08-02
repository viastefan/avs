import Image from "next/image";
import Link from "next/link";
import { Globe } from "@/components/Globe";
import { services } from "@/lib/content";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const featured = services.slice(0, 5);

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
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
        </div>
        <div className="hero__shade" aria-hidden />
        <div className="wrap hero__inner">
          <div className="hero__stack">
            <p className="kicker fade-up">Flughafen München · Südallee</p>
            <h1 className="h1 fade-up fade-up-1" style={{ marginTop: 14 }}>
              {site.name}
            </h1>
            <p className="lead fade-up fade-up-2">
              Verpackung, Containerstauung und Gefahrgutschulung am Frachtzentrum Modul&nbsp;H.
            </p>
            <div className="hero__actions fade-up fade-up-2">
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

      <div className="info-bar">
        <div className="wrap info-bar__inner">
          <p style={{ margin: 0 }}>
            <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{site.legalName}</strong>
            {" · "}
            {site.address.line2}, {site.address.city}
          </p>
          <p style={{ margin: 0 }}>
            Reglementierter Beauftragter{" "}
            <strong style={{ color: "var(--ink)" }}>{site.approval}</strong>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap grid-2">
          <div>
            <p className="kicker">Standort</p>
            <h2 className="h2" style={{ marginTop: 12 }}>
              Direkt am Frachtzentrum München
            </h2>
            <p className="lead" style={{ marginTop: 16, maxWidth: 460 }}>
              Fachgerechte Verpackung und Dokumentation für Luft-, See- und Straßenfracht —
              IATA-, ADR- und IMDG-konform.
            </p>
            <a
              href={site.phoneHref}
              style={{
                display: "inline-block",
                marginTop: 24,
                fontWeight: 600,
                color: "var(--green)",
              }}
            >
              {site.phone}
            </a>
          </div>
          <div className="figure">
            <Image
              src={images.warehouse.src}
              alt={images.warehouse.alt}
              fill
              sizes="(max-width: 900px) 100vw, 540px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} id="leistungen">
        <div className="wrap">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <div>
              <p className="kicker">Leistungen</p>
              <h2 className="h2" style={{ marginTop: 10 }}>
                Unsere Services
              </h2>
            </div>
            <Link href="/leistungen" style={{ fontSize: 14, fontWeight: 600, color: "var(--green)" }}>
              Alle ansehen
            </Link>
          </div>
          <div className="list">
            {featured.map((service, i) => (
              <Link key={service.slug} href={`/leistungen/${service.slug}`}>
                <span className="list__idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="list__title">{service.title}</span>
                <span className="list__text">{service.summary}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <article className="feature">
            <div className="feature__media">
              <Image
                src={images.containerYard.src}
                alt={images.containerYard.alt}
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="feature__body">
              <p className="kicker">Containerstauung</p>
              <h2 className="h2" style={{ marginTop: 12 }}>
                Effizient gestaut
              </h2>
              <p className="muted" style={{ marginTop: 14, maxWidth: 380 }}>
                Optimale Raumnutzung, Ladungssicherung und Palettisierung für Land, See und Luft.
              </p>
              <Link
                href="/containerstauung"
                className="btn btn-dark"
                style={{ marginTop: 28, alignSelf: "flex-start" }}
              >
                Mehr erfahren
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <article className="feature feature--flip">
            <div className="feature__media">
              <Image
                src={images.training.src}
                alt={images.training.alt}
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="feature__body">
              <p className="kicker">Gefahrgutschulung</p>
              <h2 className="h2" style={{ marginTop: 12 }}>
                Sicher geschult
              </h2>
              <p className="muted" style={{ marginTop: 14, maxWidth: 380 }}>
                Praxisnahe Schulungen zu IATA, ADR und IMDG — Verpacken, Kennzeichnen und
                Dokumentieren.
              </p>
              <Link
                href="/gefahrgutschulung"
                className="btn btn-primary"
                style={{ marginTop: 28, alignSelf: "flex-start" }}
              >
                Mehr erfahren
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap grid-2" style={{ alignItems: "center" }}>
          <div>
            <p className="kicker">Netzwerk</p>
            <h2 className="h2" style={{ marginTop: 12 }}>
              Von München in die Welt
            </h2>
            <p className="lead" style={{ marginTop: 16, maxWidth: 400 }}>
              Vom Hub München begleiten wir Sendungen in internationale Frachtnetzwerke.
            </p>
          </div>
          <Globe />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta">
            <div>
              <h2 className="h2">Wie können wir helfen?</h2>
              <p className="muted" style={{ marginTop: 10 }}>
                Anfrage senden oder anrufen — {site.address.line2}
              </p>
            </div>
            <div className="cta__actions">
              <Link href="/kontakt" className="btn btn-primary">
                Kontakt
              </Link>
              <a href={site.phoneHref} className="btn btn-outline">
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
