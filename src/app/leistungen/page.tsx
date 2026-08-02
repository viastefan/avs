import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Verpackungsservice",
  description:
    "Export-, Gefahrgut-, Schwergut- und Spezialverpackung am Flughafen München — IATA, ADR und IMDG konform.",
};

export default function LeistungenPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden grain">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=2200&auto=format&fit=crop"
            alt="Luftfrachtcontainer und Verpackung"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[rgba(8,16,13,0.78)]" />
        </div>
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)]">
            Verpackungsservice
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Spezialisten für Verpackung aller Art
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#d5e6dc]">
            Gefahrgüter und Transportgüter für Straße, See und Luftfracht — fachgerecht, aktuell und
            dokumentiert.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">Unser Gewährleistungsanspruch</h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--steel)]">
            Unser Fachgebiet umfasst die fachgerechte Verpackung von Gefahrgütern für den Straßen-, See-
            und Luftfrachttransport. Dabei verwenden wir stets die aktuellsten Versionen der
            IATA/ICAO-, IMDG-Code- sowie ADR-Vorschriften.
          </p>
          <ul className="mt-8 space-y-2 text-sm font-medium text-[var(--ink)]">
            <li>Luftfracht — Shipper&apos;s Declaration</li>
            <li>Seefracht — IMO-Erklärung</li>
            <li>Straße — ADR-Beförderungsdokumente</li>
          </ul>
        </div>

        <div className="mt-16 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {services.map((service) => (
            <article key={service.slug} className="grid gap-4 py-10 md:grid-cols-[1fr_1.4fr] md:gap-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                  {service.sector}
                </p>
                <h3 className="font-display mt-2 text-2xl font-semibold">{service.title}</h3>
              </div>
              <div>
                <p className="text-base leading-relaxed text-[var(--steel)]">{service.summary}</p>
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="btn-ghost mt-5 px-0 text-[var(--accent-deep)]"
                >
                  Details ansehen →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
