import Image from "next/image";
import Link from "next/link";
import { Globe } from "@/components/Globe";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

const featured = services.slice(0, 4);

export default function HomePage() {
  return (
    <>
      {/* Hero — one composition */}
      <section className="relative -mt-[var(--header-h)] min-h-[100svh]">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2400&auto=format&fit=crop"
          alt="Frachtlager am Flughafen"
          fill
          priority
          className="hero-media object-cover grayscale contrast-[1.15]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/85 to-[var(--ink)]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-[var(--ink)]/50" />

        <div className="relative z-[1] wrap flex min-h-[100svh] flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24">
          <p className="meta fade-in text-[var(--green)]">Flughafen München</p>
          <h1 className="font-display fade-in fade-in-1 mt-4 text-[clamp(4.5rem,12vw,8rem)] font-black leading-[0.88] tracking-[-0.04em]">
            {site.name}
          </h1>
          <p className="fade-in fade-in-2 mt-6 max-w-md text-lg leading-relaxed text-[var(--steel)] md:text-xl">
            Verpackungs-Profis für Export, Gefahrgut und Schwergut.
          </p>
          <div className="fade-in fade-in-3 mt-10 flex flex-wrap gap-3">
            <Link href="/kontakt" className="btn-primary">
              Anfrage stellen
            </Link>
            <Link href="/leistungen" className="btn-ghost">
              Leistungen
            </Link>
          </div>
        </div>
      </section>

      {/* Intro — one job */}
      <section className="border-t border-[var(--line)]">
        <div className="wrap grid gap-10 py-20 md:grid-cols-[1fr_1.2fr] md:gap-20 md:py-28">
          <h2 className="font-display max-w-xs text-3xl font-bold leading-tight md:text-4xl">
            Am Frachtzentrum. Für die Welt.
          </h2>
          <div>
            <p className="max-w-xl text-base leading-relaxed text-[var(--steel)] md:text-lg">
              Wir verpacken Transportgüter für Luft, See und Straße — IATA-, ADR- und IMDG-konform,
              mit klarer Dokumentation und Zulassung als Reglementierter Beauftragter{" "}
              <span className="text-[var(--paper)]">{site.approval}</span>.
            </p>
            <p className="meta mt-8">
              {site.address.line2} · {site.address.city}
            </p>
          </div>
        </div>
      </section>

      {/* Services — lean list */}
      <section id="leistungen" className="border-t border-[var(--line)]">
        <div className="wrap py-20 md:py-28">
          <div className="mb-14 flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Leistungen</h2>
            <Link href="/leistungen" className="meta text-[var(--steel)] hover:text-[var(--green)]">
              Alle ansehen →
            </Link>
          </div>

          <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {featured.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group flex flex-col gap-2 py-8 transition-colors md:flex-row md:items-baseline md:justify-between md:gap-12"
                >
                  <span className="font-display text-2xl font-bold group-hover:text-[var(--green)] md:text-3xl">
                    {service.title}
                  </span>
                  <span className="max-w-md text-sm leading-relaxed text-[var(--steel)] md:text-right">
                    {service.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Hub */}
      <section className="border-t border-[var(--line)]">
        <div className="wrap grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Hub München</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--steel)]">
              Von MUC aus begleiten wir Sendungen in die globalen Frachtnetzwerke — gestaut, gesichert,
              dokumentiert.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/containerstauung" className="btn-ghost">
                Containerstauung
              </Link>
              <Link href="/gefahrgutschulung" className="btn-ghost">
                Gefahrgutschulung
              </Link>
            </div>
          </div>
          <Globe className="w-full" />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--line)]">
        <div className="wrap flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center md:py-24">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Sprechen wir.</h2>
            <p className="mt-3 text-[var(--steel)]">Kurz anfragen — wir melden uns zeitnah.</p>
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
