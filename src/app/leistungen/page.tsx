import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Verpackungsservice",
  description:
    "Export-, Gefahrgut-, Schwergut- und Spezialverpackung am Flughafen München — IATA, ADR und IMDG konform.",
};

export default function LeistungenPage() {
  return (
    <section className="wrap py-16 md:py-24">
      <p className="meta">Leistungen</p>
      <h1 className="font-display mt-3 max-w-2xl text-4xl font-black leading-none md:text-6xl">
        Verpackung aller Art
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--steel)]">
        Gefahrgüter und Transportgüter für Straße, See und Luftfracht — fachgerecht und dokumentiert.
      </p>

      <ul className="mt-16 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/leistungen/${service.slug}`}
              className="group grid gap-3 py-10 md:grid-cols-[1fr_1.4fr] md:gap-16"
            >
              <h2 className="font-display text-2xl font-bold group-hover:text-[var(--green)] md:text-3xl">
                {service.title}
              </h2>
              <div>
                <p className="text-sm leading-relaxed text-[var(--steel)] md:text-base">
                  {service.summary}
                </p>
                <span className="meta mt-4 inline-block text-[var(--mute)] group-hover:text-[var(--green)]">
                  Mehr →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-16 max-w-xl">
        <h2 className="font-display text-2xl font-bold">Vorschriften</h2>
        <p className="mt-4 text-sm leading-relaxed text-[var(--steel)]">
          IATA/ICAO, IMDG und ADR — inklusive Shipper&apos;s Declaration, IMO-Erklärung und
          ADR-Beförderungspapier.
        </p>
      </div>
    </section>
  );
}
