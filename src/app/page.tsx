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
          <p className="meta fade-in text-[var(--green-bright)]">Flughafen München · Modul H</p>
          <h1 className="font-display font-display-caps fade-in fade-in-1 mt-3 text-[clamp(3.75rem,11vw,7.5rem)] font-black leading-[0.88]">
            {site.name}
          </h1>
          <p className="fade-in fade-in-2 mt-5 max-w-md text-base leading-relaxed text-[var(--steel-on-dark)] md:text-lg">
            Verpackungs-Profis für Export, Gefahrgut und Schwergut.
          </p>
          <div className="fade-in fade-in-2 mt-8 flex flex-wrap gap-3">
            <Link href="/kontakt" className="btn-primary">
              Anfrage stellen
            </Link>
            <Link href="/leistungen" className="btn-ghost">
              Leistungen
            </Link>
          </div>
        </div>
      </section>

      <section className="band-light">
        <div className="wrap grid gap-10 py-16 md:grid-cols-[1fr_1.2fr] md:items-end md:gap-16 md:py-24">
          <h2 className="font-display max-w-sm text-[clamp(1.75rem,3.5vw,2.35rem)] font-bold leading-tight tracking-tight text-[var(--charcoal)]">
            Am Frachtzentrum. Für die Welt.
          </h2>
          <div>
            <p className="max-w-xl text-base leading-relaxed text-[var(--steel-on-light)]">
              Wir verpacken Transportgüter für Luft, See und Straße — IATA-, ADR- und IMDG-konform,
              mit klarer Dokumentation. Zulassung als Reglementierter Beauftragter{" "}
              <span className="font-medium text-[var(--charcoal)]">{site.approval}</span>.
            </p>
            <p className="meta mt-7">
              {site.address.line2} · {site.address.city}
            </p>
          </div>
        </div>
      </section>

      <section id="leistungen" className="band-dark">
        <div className="wrap py-16 md:py-24">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="meta">Verpackungsservice</p>
              <h2 className="font-display mt-2 text-[clamp(1.75rem,3.5vw,2.35rem)] font-bold">
                Leistungen
              </h2>
            </div>
            <Link
              href="/leistungen"
              className="meta text-[var(--steel-on-dark)] hover:text-[var(--green-bright)]"
            >
              Alle →
            </Link>
          </div>

          <div className="relative mb-12 aspect-[16/7] overflow-hidden bg-[var(--ink-2)] md:aspect-[2.4/1]">
            <Image
              src={images.warehouse.src}
              alt={images.warehouse.alt}
              fill
              className="object-cover opacity-90"
              sizes="(max-width: 1200px) 100vw, 72rem"
            />
            <div className="absolute inset-0 bg-[var(--ink)]/25" />
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
            <h2 className="font-display mt-2 text-[clamp(1.75rem,3.5vw,2.35rem)] font-bold tracking-tight">
              Containerstauung
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--steel-on-light)]">
              Optimale Raumnutzung, Ladungssicherung und Palettisierung — schnell geplant und
              fachgerecht ausgeführt für Land, See und Luft.
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
            <p className="meta text-[var(--green-bright)]">Qualifikation</p>
            <h2 className="font-display mt-2 text-[clamp(1.75rem,3.5vw,2.35rem)] font-bold tracking-tight">
              Gefahrgutschulung
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--steel-on-dark)]">
              Praxisnahe Schulungen zu IATA, ADR und IMDG — Verpacken, Kennzeichnen und
              Dokumentieren nach Versenderpflichten.
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
            <p className="meta">Netzwerk</p>
            <h2 className="font-display mt-2 text-[clamp(1.75rem,3.5vw,2.35rem)] font-bold tracking-tight">
              Hub München
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--steel-on-light)]">
              Von MUC aus begleiten wir Sendungen in die globalen Frachtnetzwerke — gestaut,
              gesichert, dokumentiert.
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
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.35rem)] font-bold tracking-tight">
              Sprechen wir über Ihre Sendung.
            </h2>
            <p className="mt-3 text-[var(--steel-on-dark)]">Kurz anfragen — wir melden uns zeitnah.</p>
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
