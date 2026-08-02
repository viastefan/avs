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
      <section className="section">
        <div className="wrap">
          <div className="border-t border-[var(--line)]">
            {services.map((service) => (
              <Link key={service.slug} href={`/leistungen/${service.slug}`} className="service-row">
                <h2 className="service-row__title font-display text-xl font-semibold">
                  {service.title}
                </h2>
                <p className="text-sm leading-relaxed text-[var(--muted)] md:text-base">
                  {service.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
