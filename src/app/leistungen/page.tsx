import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { services } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Verpackungsservice",
  description:
    "Export-, Gefahrgut-, Schwergut- und Spezialverpackung am Flughafen München — IATA, ADR und IMDG konform.",
};

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        title="Verpackungsservice"
        description="Gefahrgüter und Transportgüter für Straße, See und Luftfracht."
        image={images.packaging}
        eyebrow="Leistungen"
      />

      <section className="band-light">
        <div className="wrap py-14 md:py-20">
          <ul>
            {services.map((service) => (
              <li
                key={service.slug}
                className="border-t border-[var(--line-on-light)] last:border-b"
              >
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group grid gap-2 py-7 md:grid-cols-[1fr_1.5fr] md:gap-14"
                >
                  <h2 className="font-display text-xl font-bold tracking-tight transition-colors group-hover:text-[var(--green)] md:text-2xl">
                    {service.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[var(--steel-on-light)] md:text-[0.95rem]">
                    {service.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
