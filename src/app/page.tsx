import Image from "next/image";
import Link from "next/link";
import { Globe } from "@/components/Globe";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

const featured = services.slice(0, 5);

export default function HomePage() {
  return (
    <>
      <section className="relative -mt-[var(--header-h)] min-h-[100svh]">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2400&auto=format&fit=crop"
          alt="Frachtlager am Flughafen"
          fill
          priority
          className="hero-media object-cover grayscale contrast-[1.15]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/88 to-[var(--ink)]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-[var(--ink)]/40" />

        <div className="relative z-[1] wrap flex min-h-[100svh] flex-col justify-end pb-20 pt-28 md:justify-center md:pb-28">
          <h1 className="font-display fade-in text-[clamp(5rem,14vw,9rem)] font-black leading-[0.85] tracking-[-0.05em]">
            {site.name}
          </h1>
          <p className="fade-in fade-in-1 mt-8 max-w-sm text-lg leading-relaxed text-[var(--steel)]">
            Verpackung für Export, Gefahrgut und Schwergut — am Flughafen München.
          </p>
          <div className="fade-in fade-in-2 mt-12">
            <Link href="/kontakt" className="btn-primary">
              Anfrage stellen
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap py-24 md:py-36">
        <p className="max-w-2xl text-xl leading-relaxed text-[var(--steel)] md:text-2xl md:leading-relaxed">
          Transportgüter für Luft, See und Straße — IATA-, ADR- und IMDG-konform.
          Reglementierter Beauftragter{" "}
          <span className="text-[var(--paper)]">{site.approval}</span>.
        </p>
      </section>

      <section id="leistungen" className="wrap pb-24 md:pb-36">
        <div className="mb-12 flex items-baseline justify-between gap-6">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Leistungen</h2>
          <Link href="/leistungen" className="meta hover:text-[var(--green)]">
            Alle →
          </Link>
        </div>
        <ul>
          {featured.map((service) => (
            <li key={service.slug} className="border-t border-[var(--line)] last:border-b">
              <Link
                href={`/leistungen/${service.slug}`}
                className="group flex items-baseline justify-between gap-8 py-6 md:py-7"
              >
                <span className="font-display text-xl font-bold tracking-tight group-hover:text-[var(--green)] md:text-2xl">
                  {service.title}
                </span>
                <span className="meta shrink-0 text-[var(--mute)] transition-colors group-hover:text-[var(--green)]">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap pb-24 md:pb-36">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Hub München</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--steel)]">
            Von MUC in die globalen Frachtnetzwerke.
          </p>
        </div>
        <Globe className="mt-12 w-full" />
      </section>

      <section className="wrap border-t border-[var(--line)] py-20 md:py-28">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Sprechen wir.</h2>
          <Link href="/kontakt" className="btn-primary">
            Kontakt
          </Link>
        </div>
      </section>
    </>
  );
}
