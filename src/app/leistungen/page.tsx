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
    <section className="wrap py-20 md:py-28">
      <h1 className="font-display max-w-xl text-4xl font-black leading-none md:text-6xl">
        Leistungen
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--steel)]">
        Gefahrgüter und Transportgüter für Straße, See und Luftfracht.
      </p>

      <ul className="mt-16">
        {services.map((service) => (
          <li key={service.slug} className="border-t border-[var(--line)] last:border-b">
            <Link
              href={`/leistungen/${service.slug}`}
              className="group flex items-baseline justify-between gap-8 py-7 md:py-8"
            >
              <span className="font-display text-xl font-bold group-hover:text-[var(--green)] md:text-2xl">
                {service.title}
              </span>
              <span className="meta shrink-0 text-[var(--mute)] group-hover:text-[var(--green)]">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
