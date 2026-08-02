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
      <section className="relative -mt-[var(--header-h)] border-b border-[var(--line)]">
        <div className="grid lg:grid-cols-12">
          <div className="bg-[var(--ink)] px-[var(--gutter)] py-16 lg:col-span-5 lg:py-24">
            <p className="meta text-[var(--mute)]">Katalog / Leistungen</p>
            <h1 className="font-display mt-4 text-5xl font-black leading-none md:text-6xl">
              Verpackung aller Art
            </h1>
            <div className="mt-6 h-px w-16 bg-[var(--green)]" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--steel)]">
              Gefahrgüter und Transportgüter für Straße, See und Luftfracht — fachgerecht, aktuell und
              dokumentiert.
            </p>
          </div>
          <div className="relative min-h-[280px] lg:col-span-7">
            <Image
              src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=2200&auto=format&fit=crop"
              alt="Luftfrachtcontainer und Verpackung"
              fill
              priority
              className="object-cover grayscale contrast-125"
              sizes="(max-width:1024px) 100vw, 58vw"
            />
            <div className="absolute inset-0 bg-[var(--ink)]/45" />
            <span className="meta absolute left-4 top-4 border border-[var(--line)] bg-[var(--ink)]/80 px-2 py-1 text-[var(--steel)]">
              Fig. A
            </span>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)]">
        <div className="wrap grid gap-0 md:grid-cols-12">
          <div className="border-b border-[var(--line)] py-12 md:col-span-4 md:border-b-0 md:border-r md:pr-8">
            <p className="index">Vorschriften</p>
            <h2 className="font-display mt-3 text-3xl font-black">Gewährleistung</h2>
          </div>
          <div className="py-12 md:col-span-8 md:pl-10">
            <p className="max-w-2xl text-base leading-relaxed text-[var(--steel)]">
              Fachgerechte Verpackung von Gefahrgütern für Straßen-, See- und Luftfracht. Aktuelle
              IATA/ICAO-, IMDG- und ADR-Vorschriften. Begleitpapiere inklusive.
            </p>
            <ul className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)] text-sm">
              <li className="py-3">Luftfracht — Shipper&apos;s Declaration</li>
              <li className="py-3">Seefracht — IMO-Erklärung</li>
              <li className="py-3">Straße — ADR-Beförderungsdokumente</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="wrap py-4">
        {services.map((service, i) => (
          <article
            key={service.slug}
            className="grid gap-4 border-b border-[var(--line)] py-10 md:grid-cols-[5rem_1fr_1.2fr]"
          >
            <p className="meta text-[var(--mute)]">{String(i + 1).padStart(2, "0")}</p>
            <div>
              <p className="meta text-[var(--mute)]">{service.sector}</p>
              <h3 className="font-display mt-2 text-3xl font-extrabold">{service.title}</h3>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-[var(--steel)]">{service.summary}</p>
              <Link href={`/leistungen/${service.slug}`} className="btn-ghost mt-5">
                Spec öffnen
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
