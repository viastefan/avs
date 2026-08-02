import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { services } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Verpackungsservice",
  description: "Export-, Gefahrgut-, Schwergut- und Spezialverpackung am Flughafen München.",
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
          <div className="list">
            {services.map((service, i) => (
              <Link key={service.slug} href={`/leistungen/${service.slug}`}>
                <span className="list__idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="list__title">{service.title}</span>
                <span className="list__text">{service.summary}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
