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
            {services.map((service, index) => (
              <Link key={service.slug} href={`/leistungen/${service.slug}`} className="service-link">
                <span className="service-link__idx">{String(index + 1).padStart(2, "0")}</span>
                <span className="service-link__title">{service.title}</span>
                <span className="text-sm leading-relaxed text-[var(--fog)] md:text-[0.95rem]">
                  {service.summary}
                </span>
                <span className="service-link__arrow hidden md:inline" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
