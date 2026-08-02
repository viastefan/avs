import Image from "next/image";
import Link from "next/link";
import { Globe } from "@/components/Globe";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero — one composition, brand first, full-bleed visual */}
      <section className="relative isolate min-h-[min(92vh,920px)] overflow-hidden grain">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2400&auto=format&fit=crop"
            alt="Frachtflugzeug am Himmel — Luftfracht aus München"
            fill
            priority
            className="hero-media object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,16,13,0.88)] via-[rgba(8,16,13,0.62)] to-[rgba(8,16,13,0.28)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,16,13,0.55)] via-transparent to-[rgba(8,16,13,0.2)]" />
        </div>

        <div className="relative z-[2] mx-auto flex min-h-[min(92vh,920px)] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-8 md:pb-24 md:pt-20">
          <p className="font-display reveal text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {site.name}
          </p>
          <div className="accent-line mt-4 h-0.5 w-24 bg-[var(--accent-bright)]" />
          <h1 className="reveal reveal-delay-1 font-display mt-7 max-w-2xl text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl md:text-4xl">
            Verpackungs-Profis am Flughafen München
          </h1>
          <p className="reveal reveal-delay-2 mt-5 max-w-xl text-base leading-relaxed text-[#d5e6dc] sm:text-lg">
            Export, Gefahrgut und Schwergut — präzise verpackt für Luft, See und Straße.
          </p>
          <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
            <Link href="/kontakt" className="btn-primary bg-[var(--accent-bright)] text-[var(--ink)] hover:bg-white">
              Anfrage stellen
            </Link>
            <Link href="/leistungen" className="btn-ghost border-0 text-white hover:text-[var(--accent-bright)]">
              Leistungen ansehen →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip — single purpose */}
      <section className="border-y border-[var(--line)] bg-white/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 text-sm text-[var(--steel)] md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            Standort: <span className="font-medium text-[var(--ink)]">{site.address.city}</span>
          </p>
          <p>
            Reglementierter Beauftragter:{" "}
            <span className="font-medium text-[var(--ink)]">{site.approval}</span>
          </p>
          <p>
            Tel.{" "}
            <a href={site.phoneHref} className="font-medium text-[var(--ink)] hover:text-[var(--accent)]">
              {site.phone}
            </a>
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            {site.legalName}
          </p>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-5xl">
            Spezialisten für Transportverpackung am Münchner Flughafen
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--steel)]">
            Am Flughafen München werden täglich tonnenweise Waren abgefertigt. Wir verpacken große und
            kleine Transportgüter — mit Erfahrung, Vorschriftenkenntnis und klarer Beratung, egal wohin
            Ihre Sendung geht.
          </p>
        </div>
      </section>

      {/* Services overview — one job */}
      <section className="border-t border-[var(--line)] bg-[rgba(255,255,255,0.35)]">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Sektor Verpackung
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Unsere Leistungen
              </h2>
            </div>
            <Link href="/leistungen" className="btn-ghost px-0">
              Alle Leistungen →
            </Link>
          </div>

          <ul className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group grid gap-3 py-7 transition md:grid-cols-[220px_1fr_auto] md:items-center md:gap-8"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                    {service.sector}
                  </span>
                  <span>
                    <span className="font-display block text-xl font-semibold text-[var(--ink)] group-hover:text-[var(--accent-deep)] md:text-2xl">
                      {service.title}
                    </span>
                    <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-[var(--steel)] md:text-base">
                      {service.summary}
                    </span>
                  </span>
                  <span className="text-sm font-semibold text-[var(--ink)] opacity-60 transition group-hover:opacity-100">
                    Mehr →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Globe hub — second viewport, one purpose */}
      <section className="overflow-hidden border-t border-[var(--line)]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:px-8 md:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Hub München
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Weltweite Verbindungen. Ein klarer Ausgangspunkt.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--steel)]">
              Von MUC aus begleiten wir Ihre Güter in die globalen Frachtnetzwerke — mit korrekter
              Dokumentation und verlässlicher Verpackung.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/containerstauung" className="btn-primary">
                Containerstauung
              </Link>
              <Link href="/gefahrgutschulung" className="btn-ghost">
                Gefahrgutschulung
              </Link>
            </div>
          </div>
          <Globe className="h-[min(70vw,520px)] w-full" />
        </div>
      </section>

      {/* Visual anchor section */}
      <section className="relative isolate min-h-[52vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2200&auto=format&fit=crop"
          alt="Lagerhalle mit Frachtgut und Paletten"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(8,16,13,0.72)]" />
        <div className="relative z-[1] mx-auto flex min-h-[52vh] max-w-6xl flex-col justify-end px-5 py-16 md:px-8">
          <h2 className="font-display max-w-2xl text-3xl font-semibold text-white md:text-5xl">
            Effizient gestaut. Sicher dokumentiert.
          </h2>
          <p className="mt-4 max-w-lg text-base text-[#d5e6dc]">
            Containerstauung, Ladungssicherung und Gefahrgutdokumente — aus einer Hand am Standort
            Flughafen München.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 border border-[var(--line)] bg-white/50 p-8 md:grid-cols-[1.2fr_1fr] md:p-12">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Sie haben Fragen?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--steel)]">
              Schreiben Sie uns oder rufen Sie an. Wir beraten Sie zu Verpackung, Stauung und Schulung.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link href="/kontakt" className="btn-primary">
              Kontaktformular
            </Link>
            <a href={site.phoneHref} className="btn-ghost justify-center border border-[var(--line)] bg-white/70">
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
