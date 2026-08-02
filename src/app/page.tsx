import Image from "next/image";
import Link from "next/link";
import { Globe } from "@/components/Globe";
import { services } from "@/lib/content";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const featured = services.slice(0, 4);

export default function HomePage() {
  return (
    <>
      <section className="home-hero band-dark">
        <div className="home-hero__media">
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            priority
            className="home-hero__img"
            sizes="100vw"
          />
        </div>
        <div className="home-hero__shade" aria-hidden />

        <div className="home-hero__content wrap">
          <p className="meta fade-in">
            {site.address.line2} · {site.address.city}
          </p>
          <h1 className="font-display font-display-caps fade-in fade-in-1 mt-4 text-[clamp(3.5rem,10vw,7rem)] font-bold leading-[0.9]">
            {site.name}
          </h1>
          <p className="fade-in fade-in-1 mt-3 text-sm tracking-wide text-[var(--steel-on-dark)] md:text-base">
            {site.legalName}
          </p>
          <p className="fade-in fade-in-2 mt-6 max-w-lg text-base leading-relaxed text-[var(--steel-on-dark)] md:text-lg">
            Verpackung, Containerstauung und Gefahrgutschulung am Frachtzentrum München.
          </p>
          <div className="fade-in fade-in-2 mt-8 flex flex-wrap gap-3">
            <Link href="/kontakt" className="btn-primary">
              Kontakt aufnehmen
            </Link>
            <Link href="/leistungen" className="btn-ghost">
              Leistungen
            </Link>
          </div>
          <p className="fade-in fade-in-2 mt-8 text-sm text-[var(--mute-on-dark)]">
            {site.address.line1}
          </p>
        </div>
      </section>

      <section className="band-light">
        <div className="wrap grid gap-12 py-16 md:grid-cols-[1fr_1.15fr] md:gap-20 md:py-24">
          <div>
            <p className="meta">Standort</p>
            <h2 className="font-display mt-3 text-[clamp(1.65rem,3.2vw,2.15rem)] font-bold leading-tight tracking-tight text-[var(--charcoal)]">
              Südallee, Frachtzentrum Modul&nbsp;H
            </h2>
            <address className="mt-6 space-y-1 text-sm not-italic leading-relaxed text-[var(--steel-on-light)]">
              <p className="font-medium text-[var(--charcoal)]">{site.legalName}</p>
              <p>{site.address.line1}</p>
              <p>
                {site.address.line2}
                <br />
                {site.address.city}
              </p>
            </address>
          </div>
          <div>
            <p className="meta">Zulassung</p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--steel-on-light)]">
              Transportgüter für Luft, See und Straße — IATA-, ADR- und IMDG-konform, mit
              nachvollziehbarer Dokumentation.
            </p>
            <p className="mt-6 text-sm text-[var(--charcoal)]">
              Reglementierter Beauftragter{" "}
              <span className="font-medium">{site.approval}</span>
            </p>
          </div>
        </div>
      </section>

      <section id="leistungen" className="band-dark">
        <div className="wrap py-16 md:py-24">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="meta">Verpackungsservice</p>
              <h2 className="font-display mt-2 text-[clamp(1.65rem,3.2vw,2.15rem)] font-bold">
                Leistungen
              </h2>
            </div>
            <Link
              href="/leistungen"
              className="meta text-[var(--steel-on-dark)] hover:text-[var(--paper)]"
            >
              Übersicht →
            </Link>
          </div>

          <div className="relative mb-12 aspect-[16/7] overflow-hidden bg-[var(--ink-2)] md:aspect-[2.4/1]">
            <Image
              src={images.warehouse.src}
              alt={images.warehouse.alt}
              fill
              className="object-cover opacity-85"
              sizes="(max-width: 1200px) 100vw, 72rem"
            />
            <div className="absolute inset-0 bg-[var(--ink)]/30" />
          </div>

          <ul className="border-t border-[var(--line-on-dark)]">
            {featured.map((service) => (
              <li key={service.slug} className="border-b border-[var(--line-on-dark)]">
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group grid gap-2 py-6 md:grid-cols-[0.85fr_1.35fr] md:items-baseline md:gap-10"
                >
                  <span className="font-display text-lg font-bold tracking-tight transition-colors group-hover:text-[var(--green-bright)] md:text-xl">
                    {service.title}
                  </span>
                  <span className="text-sm leading-relaxed text-[var(--steel-on-dark)]">
                    {service.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band-light">
        <div className="grid lg:grid-cols-2">
          <div className="feature-media">
            <Image
              src={images.containerYard.src}
              alt={images.containerYard.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="feature-media__shade" />
          </div>
          <div className="feature-copy">
            <p className="meta">Stauung & Sicherung</p>
            <h2 className="font-display mt-2 text-[clamp(1.65rem,3.2vw,2.15rem)] font-bold tracking-tight">
              Containerstauung
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--steel-on-light)]">
              Planung und Ausführung mit optimaler Raumnutzung, Ladungssicherung und
              Palettisierung für Land-, See- und Luftfracht.
            </p>
            <div className="mt-7">
              <Link href="/containerstauung" className="btn-dark">
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="band-dark">
        <div className="grid lg:grid-cols-2">
          <div className="feature-copy order-2 lg:order-1">
            <p className="meta">Schulung</p>
            <h2 className="font-display mt-2 text-[clamp(1.65rem,3.2vw,2.15rem)] font-bold tracking-tight">
              Gefahrgutschulung
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--steel-on-dark)]">
              Schulungen zu IATA, ADR und IMDG — Verpacken, Kennzeichnen und Dokumentieren
              nach den Versenderpflichten.
            </p>
            <div className="mt-7">
              <Link href="/gefahrgutschulung" className="btn-primary">
                Mehr erfahren
              </Link>
            </div>
          </div>
          <div className="feature-media order-1 lg:order-2">
            <Image
              src={images.training.src}
              alt={images.training.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="feature-media__shade" />
          </div>
        </div>
      </section>

      <section className="band-light overflow-visible">
        <div className="wrap grid items-center gap-10 overflow-visible py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <div>
            <p className="meta">Standort München</p>
            <h2 className="font-display mt-2 text-[clamp(1.65rem,3.2vw,2.15rem)] font-bold tracking-tight">
              Anbindung an globale Frachtnetze
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--steel-on-light)]">
              Vom Frachtzentrum München begleiten wir Sendungen in internationale
              Luft-, See- und Straßennetzwerke.
            </p>
          </div>
          <div className="overflow-visible py-4">
            <Globe className="w-full" />
          </div>
        </div>
      </section>

      <section className="band-dark border-t border-[var(--line-on-dark)]">
        <div className="wrap flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
          <div>
            <h2 className="font-display text-[clamp(1.65rem,3.2vw,2.15rem)] font-bold tracking-tight">
              Anfrage zu Ihrer Sendung
            </h2>
            <p className="mt-3 max-w-md text-[var(--steel-on-dark)]">
              Telefonisch oder per Formular — wir melden uns zeitnah.
            </p>
            <p className="meta mt-5">
              {site.address.line2} · {site.address.city}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/kontakt" className="btn-primary">
              Kontakt
            </Link>
            <a href={site.phoneHref} className="btn-ghost">
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
