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
          <p className="meta fade-in text-[var(--steel-on-dark)]">
            Flughafen München · Frachtzentrum
          </p>
          <h1 className="font-display fade-in fade-in-1 mt-4 max-w-3xl text-[clamp(2.6rem,6.5vw,4.5rem)] font-semibold leading-[1.05]">
            {site.legalName}
          </h1>
          <p className="fade-in fade-in-2 mt-5 max-w-xl text-base leading-relaxed text-[var(--steel-on-dark)] md:text-lg">
            Ihr Ansprechpartner für Exportverpackung, Gefahrgut, Containerstauung und Schulung —
            direkt an der Südallee, Modul&nbsp;H.
          </p>
          <div className="fade-in fade-in-2 mt-8 flex flex-wrap gap-3">
            <Link href="/kontakt" className="btn-primary">
              Nachricht senden
            </Link>
            <Link href="/leistungen" className="btn-ghost">
              Unsere Leistungen
            </Link>
          </div>
        </div>
      </section>

      <section className="band-light border-b border-[var(--line-on-light)]">
        <div className="wrap grid gap-10 py-14 md:grid-cols-[1.1fr_1fr] md:items-start md:gap-16 md:py-20">
          <div>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2rem)] font-semibold leading-snug">
              Willkommen am Standort Südallee
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--steel-on-light)]">
              Am Münchner Flughafen werden täglich Güter für die ganze Welt abgefertigt. Wir
              unterstützen Sie dabei mit fachgerechter Verpackung, klarer Dokumentation und
              persönlicher Beratung vor Ort.
            </p>
          </div>
          <div>
            <p className="meta">Adresse</p>
            <address className="mt-3 space-y-1 text-sm not-italic leading-relaxed text-[var(--steel-on-light)]">
              <p className="font-medium text-[var(--charcoal)]">{site.legalName}</p>
              <p>{site.address.line1}</p>
              <p>{site.address.line2}</p>
              <p>{site.address.city}</p>
            </address>
            <p className="mt-5 text-sm text-[var(--steel-on-light)]">
              Reglementierter Beauftragter{" "}
              <span className="font-medium text-[var(--charcoal)]">{site.approval}</span>
            </p>
            <a
              href={site.phoneHref}
              className="mt-4 inline-block text-sm font-medium text-[var(--green)] hover:underline"
            >
              {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section id="leistungen" className="band-light">
        <div className="wrap py-16 md:py-24">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="meta">Verpackungsservice</p>
              <h2 className="font-display mt-2 text-[clamp(1.6rem,3vw,2rem)] font-semibold">
                Leistungen
              </h2>
            </div>
            <Link href="/leistungen" className="text-sm text-[var(--green)] hover:underline">
              Alle Leistungen
            </Link>
          </div>

          <div className="relative mb-12 aspect-[16/7] overflow-hidden rounded-[var(--radius)] bg-[var(--ink-2)] md:aspect-[2.35/1]">
            <Image
              src={images.warehouse.src}
              alt={images.warehouse.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 70rem"
            />
            <div className="absolute inset-0 bg-[var(--ink)]/20" />
          </div>

          <ul className="border-t border-[var(--line-on-light)]">
            {featured.map((service) => (
              <li key={service.slug} className="border-b border-[var(--line-on-light)]">
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group grid gap-2 py-6 md:grid-cols-[0.85fr_1.35fr] md:items-baseline md:gap-10"
                >
                  <span className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-[var(--green)]">
                    {service.title}
                  </span>
                  <span className="text-sm leading-relaxed text-[var(--steel-on-light)] md:text-[0.95rem]">
                    {service.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band-light border-t border-[var(--line-on-light)]">
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
            <h2 className="font-display mt-2 text-[clamp(1.6rem,3vw,2rem)] font-semibold">
              Containerstauung
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--steel-on-light)]">
              Wir planen und stauen Ihre Güter effizient und sicher — mit optimaler Raumnutzung
              und fachgerechter Ladungssicherung für Land, See und Luft.
            </p>
            <div className="mt-7">
              <Link href="/containerstauung" className="btn-dark">
                Mehr zur Containerstauung
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="band-light border-t border-[var(--line-on-light)]">
        <div className="grid lg:grid-cols-2">
          <div className="feature-copy order-2 lg:order-1">
            <p className="meta">Qualifikation</p>
            <h2 className="font-display mt-2 text-[clamp(1.6rem,3vw,2rem)] font-semibold">
              Gefahrgutschulung
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--steel-on-light)]">
              Praxisnahe Schulungen zu IATA, ADR und IMDG — damit Ihr Team Verpacken,
              Kennzeichnen und Dokumentieren sicher beherrscht.
            </p>
            <div className="mt-7">
              <Link href="/gefahrgutschulung" className="btn-primary">
                Mehr zur Schulung
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

      <section className="band-light border-t border-[var(--line-on-light)] overflow-visible">
        <div className="wrap grid items-center gap-10 overflow-visible py-16 md:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div>
            <p className="meta">Netzwerk</p>
            <h2 className="font-display mt-2 text-[clamp(1.6rem,3vw,2rem)] font-semibold">
              Von München in die Welt
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--steel-on-light)]">
              Über den Hub München begleiten wir Sendungen in internationale Frachtnetzwerke —
              sorgfältig verpackt, gestaut und dokumentiert.
            </p>
          </div>
          <div className="overflow-visible py-2">
            <Globe className="w-full" />
          </div>
        </div>
      </section>

      <section className="band-dark">
        <div className="wrap flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center md:py-20">
          <div>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2rem)] font-semibold">
              Wie können wir Ihnen helfen?
            </h2>
            <p className="mt-3 max-w-lg text-[var(--steel-on-dark)]">
              Schreiben Sie uns Ihre Anfrage — oder rufen Sie uns direkt am Frachtzentrum an.
            </p>
            <p className="mt-4 text-sm text-[var(--mute-on-dark)]">
              {site.address.line2}, {site.address.city}
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
