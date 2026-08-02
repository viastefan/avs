import Image from "next/image";
import Link from "next/link";
import { Globe } from "@/components/Globe";
import { services } from "@/lib/content";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const featured = services.slice(0, 4);

export default function HomePage() {
  return (
    <div className="bg-[var(--bg)]">
      <section className="home-hero">
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
          <p className="eyebrow rise text-white/70">Flughafen München · Südallee</p>
          <h1 className="font-display rise rise-1 mt-3 max-w-2xl text-[length:var(--t-display)] font-semibold text-white">
            {site.name}
            <span className="mt-2 block text-[clamp(1.15rem,2.2vw,1.45rem)] font-medium tracking-normal text-white/80">
              Airport-Verpackungs-Service
            </span>
          </h1>
          <p className="rise rise-2 mt-5 max-w-lg text-[length:var(--t-body)] leading-relaxed text-white/80">
            Verpackung, Containerstauung und Gefahrgutschulung am Frachtzentrum Modul&nbsp;H.
          </p>
          <div className="rise rise-2 mt-7 flex flex-wrap gap-3">
            <Link href="/kontakt" className="btn btn-primary">
              Nachricht senden
            </Link>
            <Link href="/leistungen" className="btn btn-secondary">
              Leistungen
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="eyebrow">Standort</p>
            <h2 className="font-display mt-3 text-[length:var(--t-title)] font-semibold">
              Südallee, Frachtzentrum Modul&nbsp;H
            </h2>
            <p className="mt-4 max-w-md text-[var(--muted)]">
              Persönliche Beratung und fachgerechte Abwicklung direkt am Münchner Flughafen —
              für Luft-, See- und Straßenfracht.
            </p>
          </div>
          <div>
            <address className="not-italic text-[var(--muted)]">
              <p className="font-medium text-[var(--ink)]">{site.legalName}</p>
              <p className="mt-2">{site.address.line1}</p>
              <p>{site.address.line2}</p>
              <p>{site.address.city}</p>
            </address>
            <p className="mt-5 text-sm text-[var(--muted)]">
              Reglementierter Beauftragter{" "}
              <span className="font-semibold text-[var(--ink)]">{site.approval}</span>
            </p>
            <a href={site.phoneHref} className="mt-4 inline-block font-semibold text-[var(--green)]">
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section id="leistungen" className="section pt-0">
        <div className="wrap">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Service</p>
              <h2 className="font-display mt-2 text-[length:var(--t-title)] font-semibold">Leistungen</h2>
            </div>
            <Link href="/leistungen" className="text-sm font-semibold text-[var(--green)]">
              Alle ansehen
            </Link>
          </div>

          <div className="media-frame mb-10">
            <Image
              src={images.warehouse.src}
              alt={images.warehouse.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1120px) 100vw, 1120px"
            />
          </div>

          <div className="border-t border-[var(--line)]">
            {featured.map((service) => (
              <Link key={service.slug} href={`/leistungen/${service.slug}`} className="service-row">
                <span className="service-row__title font-display text-lg font-semibold md:text-xl">
                  {service.title}
                </span>
                <span className="text-[var(--t-small)] leading-relaxed text-[var(--muted)] md:text-base">
                  {service.summary}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap split">
          <div className="media-frame media-frame--tall">
            <Image
              src={images.containerYard.src}
              alt={images.containerYard.alt}
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="eyebrow">Stauung</p>
            <h2 className="font-display mt-2 text-[length:var(--t-title)] font-semibold">
              Containerstauung
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              Effiziente Raumnutzung, Ladungssicherung und Palettisierung — geplant und
              ausgeführt für Land, See und Luft.
            </p>
            <Link href="/containerstauung" className="btn btn-ink mt-7">
              Mehr erfahren
            </Link>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap split split--flip">
          <div className="media-frame media-frame--tall">
            <Image
              src={images.training.src}
              alt={images.training.alt}
              fill
              className="object-cover"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="eyebrow">Schulung</p>
            <h2 className="font-display mt-2 text-[length:var(--t-title)] font-semibold">
              Gefahrgutschulung
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              Praxisnahe Schulungen zu IATA, ADR und IMDG für sicheres Verpacken, Kennzeichnen
              und Dokumentieren.
            </p>
            <Link href="/gefahrgutschulung" className="btn btn-primary mt-7">
              Mehr erfahren
            </Link>
          </div>
        </div>
      </section>

      <section className="section pt-0 overflow-visible">
        <div className="wrap split overflow-visible">
          <div>
            <p className="eyebrow">Netzwerk</p>
            <h2 className="font-display mt-2 text-[length:var(--t-title)] font-semibold">
              Von München in die Welt
            </h2>
            <p className="mt-4 max-w-md text-[var(--muted)]">
              Vom Hub München begleiten wir Sendungen in internationale Frachtnetzwerke.
            </p>
          </div>
          <Globe />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap flex flex-col items-start justify-between gap-6 rounded-[var(--radius)] bg-[var(--surface)] px-6 py-10 md:flex-row md:items-center md:px-10 md:py-12">
          <div>
            <h2 className="font-display text-[length:var(--t-title)] font-semibold">
              Wie können wir helfen?
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Anfrage senden oder anrufen — {site.address.line2}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/kontakt" className="btn btn-primary">
              Kontakt
            </Link>
            <a href={site.phoneHref} className="btn btn-outline">
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
