import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { containerFeatures } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Containerstauung",
  description: "Effiziente Containerstauung am Flughafen München.",
};

export default function ContainerstauungPage() {
  return (
    <>
      <PageHero
        title="Containerstauung"
        description="Raumnutzung, Ladungssicherung und Palettisierung für Land, See und Luft."
        image={images.containers}
        eyebrow="Stauung & Sicherung"
      />
      <section className="section">
        <div className="wrap prose-narrow">
          <div className="list">
            {containerFeatures.map((feature) => (
              <div key={feature.title} className="list-item">
                <h2 className="list__title">{feature.title}</h2>
                <p className="list__text" style={{ margin: 0 }}>
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
          <Link href="/kontakt" className="btn btn-primary" style={{ marginTop: 40 }}>
            Anfrage senden
          </Link>
        </div>
      </section>
    </>
  );
}
