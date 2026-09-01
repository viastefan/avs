import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqGroup } from "@/components/FaqGroup";
import { HeroEnquiry } from "@/components/HeroEnquiry";
import { ScrollReveal } from "@/components/ScrollReveal";
import { faqGroups, norms, services, whyPoints } from "@/lib/content";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="hero hero--dark">
        <div className="hero__bg">
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 55%" }}
          />
        </div>
        <div className="hero__scrim" aria-hidden />
        <div className="hero__dots" aria-hidden />
        <div className="wrap hero__grid">
          <div className="hero__col">
            <span className="badge fade-up">
              <span className="badge__dot" aria-hidden />
              Frachtzentrum · Modul H · Südallee
            </span>
            {/* Four words that say exactly what the firm does. The place
                belongs in the line below, where it can be spelled out —
                at this size it would only break badly. */}
            <h1 className="hero__title fade-up fade-up-1">
              Verpackt für den Abflug.
            </h1>
            <p className="hero__sub fade-up fade-up-2">
              Export, Gefahrgut und Schwergut — verpackt und dokumentiert im Frachtzentrum des
              Flughafens München. Kein Umweg über ein Gewerbegebiet, kein verlorener Tag.
            </p>
            <div className="fade-up fade-up-3">
              <HeroEnquiry />
            </div>
            <ul className="hero__creds fade-up fade-up-3">
              <li>Begleitpapiere inklusive</li>
              <li>Verpackung auch bei Ihnen vor Ort</li>
              <li>Antwort werktags</li>
            </ul>
          </div>
          <div className="hero__card fade-up fade-up-3">
            <p className="hero__card-k">Zulassung</p>
            <p className="hero__card-v">{site.approval}</p>
            <p className="hero__card-sub">Reglementierter Beauftragter · EU-Luftsicherheit</p>
          </div>
        </div>
      </section>


      <section className="section">
        <div className="wrap grid-2">
          <ScrollReveal>
            <div className="split-copy">
              <p className="kicker">Über uns</p>
              <h2 className="h2">Verpackung ist bei uns Handwerk</h2>
              <p className="lead">
                Wir verpacken Transport- und Gefahrgüter für Luft-, See- und Straßenfracht — vom
                einzelnen Packstück bis zur tonnenschweren Maschine, samt aller Papiere.
              </p>
              <p className="split-copy__note">
                Jede Kiste entsteht um das Gut herum: nach Gewicht, Schwerpunkt und Transportweg.
                Und wenn eine günstigere Bauart denselben Schutz bietet, sagen wir das vorher.
              </p>
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


      <section className="section section--alt">
        <div className="wrap">
          <ScrollReveal>
            <div className="sec-intro">
              <p className="kicker">Normen &amp; Zulassungen</p>
              <h2>Nach diesen Regeln arbeiten wir</h2>
              <p>
                Verpackung in der Luftfracht ist kein Ermessensspielraum. Welche Vorschrift greift,
                hängt von Gut und Verkehrsträger ab — hier die Regelwerke, nach denen wir arbeiten.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="norms">
              {norms.map((n) => (
                <div key={n.code} className="norm">
                  <span className="norm__code">{n.code}</span>
                  <h3 className="norm__name">{n.name}</h3>
                  <p className="norm__text">{n.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section" id="leistungen">
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
                  <p className="bento-card__sector">{service.sector}</p>
                  <h3 className="bento-card__title">{service.title}</h3>
                  <p className="bento-card__text">{service.short}</p>
                  <span className="bento-card__arrow">
                    <svg viewBox="0 0 16 16"><path d="M4 12 L12 4 M12 4 L5 4 M12 4 L12 11" /></svg>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
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
                Zur Containerstauung
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
                Zur Gefahrgutschulung
              </Link>
            </div>
          </article>
        </ScrollReveal>
      </section>

      <section className="section network">
        <div className="wrap split">
          <ScrollReveal>
            <div className="split__body">
              <p className="kicker">Standort</p>
              <h2>Südallee, Modul H</h2>
              <p>
                Sie finden uns an der Südallee im Frachtzentrum des Flughafens München. Größere
                Sendungen nehmen wir per Lkw oder Transporter an der Rampe an, kleinere im Pavillon.
                Wer mag, bringt das Gut vorbei und sieht sich die Bauart vorher an.
              </p>
              <p>
                Als reglementierter Beauftragter dürfen wir Luftfracht als sicher einstufen.
                Anliefern, verpacken, dokumentieren, abgeben — die Sendung verlässt dafür
                zwischendurch nicht das Gelände.
              </p>
              <a href={site.phoneHref} className="link-accent">
                {site.phone} →
              </a>
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

      <section className="section">
        <div className="wrap prose-narrow">
          <ScrollReveal>
            <div className="section-head" style={{ marginBottom: 8 }}>
              <div>
                <p className="kicker">Häufige Fragen</p>
                <h2 className="h2">Gut zu wissen</h2>
              </div>
              <Link href="/faq" className="section-head__link">
                Alle Fragen →
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <FaqGroup items={faqGroups[0].items} />
          </ScrollReveal>
        </div>
      </section>

      {/* enquiry={false}: the hero above already asks the same question. */}
      <CtaBand
        kicker="Nächster Schritt"
        title="Sprechen wir über Ihre Sendung"
        text="Sagen Sie uns, was verpackt werden soll, wohin es geht und bis wann — den Rest klären wir."
        enquiry={false}
      />
    </>
  );
}
