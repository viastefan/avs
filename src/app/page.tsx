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
      {/* Hero */}
      <section className="relative -mt-[var(--header-h)] min-h-[100svh] band-dark">
        <Image
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          priority
          className="hero-media object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/80 to-[var(--ink)]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-[var(--ink)]/45" />

        <div className="relative z-[1] wrap flex min-h-[100svh] flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24">
          <p className="meta fade-in text-[var(--green-bright)]">Flughafen München · Modul H</p>
          <h1 className="font-display font-display-caps fade-in fade-in-1 mt-4 text-[clamp(4.5rem,12vw,8.5rem)] font-black leading-[0.88]">
            {site.name}
          </h1>
          <p className="fade-in fade-in-2 mt-6 max-w-md text-lg leading-relaxed text-[var(--steel-on-dark)] md:text-xl">
            Verpackungs-Profis für Export, Gefahrgut und Schwergut.
          </p>
          <div className="fade-in fade-in-2 mt-10 flex flex-wrap gap-3">
            <Link href="/kontakt" className="btn-primary">
              Anfrage stellen
            </Link>
            <Link href="/leistungen" className="btn-ghost">
              Leistungen
            </Link>
          </div>
        </div>
      </section>

      {/* Intro — light */}
      <section className="band-light">
        <div className="wrap grid gap-12 py-20 md:grid-cols-[1fr_1.15fr] md:items-end md:gap-20 md:py-28">
          <h2 className="font-display max-w-sm text-3xl font-bold leading-tight tracking-tight text-[var(--charcoal)] md:text-4xl">
            Am Frachtzentrum. Für die Welt.
          </h2>
          <div>
            <p className="max-w-xl text-base leading-relaxed text-[var(--steel-on-light)] md:text-lg">
              Wir verpacken Transportgüter für Luft, See und Straße — IATA-, ADR- und IMDG-konform,
              mit klarer Dokumentation. Zulassung als Reglementierter Beauftragter{" "}
              <span className="font-medium text-[var(--charcoal)]">{site.approval}</span>.
            </p>
            <p className="meta mt-8">
              {site.address.line2} · {site.address.city}
            </p>
          </div>
        </div>
      </section>

      {/* Packaging services */}
      <section id="leistungen" className="band-dark border-t border-[var(--line-on-dark)]">
        <div className="wrap py-20 md:py-28">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="meta">Verpackungsservice</p>
              <h2 className="font-display mt-3 text-3xl font-bold md:text-4xl">Leistungen</h2>
            </div>
            <Link href="/leistungen" className="meta text-[var(--steel-on-dark)] hover:text-[var(--green-bright)]">
              Alle ansehen →
            </Link>
          </div>

          <div className="relative mb-14 aspect-[21/9] overflow-hidden md:aspect-[2.8/1]">
            <Image
              src={images.warehouse.src}
              alt={images.warehouse.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 72rem"
            />
          </div>

          <ul className="border-t border-[var(--line-on-dark)]">
            {featured.map((service) => (
              <li key={service.slug} className="border-b border-[var(--line-on-dark)]">
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group grid gap-2 py-7 md:grid-cols-[0.9fr_1.3fr] md:items-baseline md:gap-12"
                >
                  <span className="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-[var(--green-bright)] md:text-2xl">
                    {service.title}
                  </span>
                  <span className="text-sm leading-relaxed text-[var(--steel-on-dark)] md:text-base">
                    {service.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Containerstauung — light + image */}
      <section className="band-light">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[320px] lg:min-h-[520px]">
            <Image
              src={images.containerYard.src}
              alt={images.containerYard.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center px-[var(--gutter)] py-16 lg:px-16 xl:px-20 lg:py-24">
            <p className="meta">Stauung & Sicherung</p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Containerstauung
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--steel-on-light)]">
              Optimale Raumnutzung, Ladungssicherung und Palettisierung — schnell geplant und
              fachgerecht ausgeführt für Land, See und Luft.
            </p>
            <div className="mt-8">
              <Link href="/containerstauung" className="btn-dark">
                Mehr erfahren
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gefahrgutschulung — image + dark */}
      <section className="band-dark">
        <div className="grid lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center px-[var(--gutter)] py-16 lg:order-1 lg:px-16 xl:px-20 lg:py-24">
            <p className="meta text-[var(--green-bright)]">Qualifikation</p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Gefahrgutschulung
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--steel-on-dark)]">
              Praxisnahe Schulungen zu IATA, ADR und IMDG — Verpacken, Kennzeichnen und
              Dokumentieren nach Versenderpflichten.
            </p>
            <div className="mt-8">
              <Link href="/gefahrgutschulung" className="btn-primary">
                Mehr erfahren
              </Link>
            </div>
          </div>
          <div className="relative order-1 min-h-[320px] lg:order-2 lg:min-h-[520px]">
            <Image
              src={images.training.src}
              alt={images.training.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Hub */}
      <section className="band-light border-t border-[var(--line-on-light)]">
        <div className="wrap grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="meta">Netzwerk</p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Hub München
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--steel-on-light)]">
              Von MUC aus begleiten wir Sendungen in die globalen Frachtnetzwerke — gestaut,
              gesichert, dokumentiert.
            </p>
          </div>
          <Globe className="w-full" />
        </div>
      </section>

      {/* CTA */}
      <section className="band-dark border-t border-[var(--line-on-dark)]">
        <div className="wrap flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center md:py-24">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Sprechen wir über Ihre Sendung.
            </h2>
            <p className="mt-3 text-[var(--steel-on-dark)]">
              Kurz anfragen — wir melden uns zeitnah.
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
