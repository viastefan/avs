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
        description="Optimale Raumnutzung, Ladungssicherung und Palettisierung für Land, See und Luft."
        image={images.containers}
        eyebrow="Stauung & Sicherung"
      />
      <section className="section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {containerFeatures.map((feature, i) => (
              <div key={feature.title} className="bento-card" style={{ minHeight: 180 }}>
                <span className="bento-card__idx">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="bento-card__title">{feature.title}</h2>
                <p className="bento-card__text">{feature.text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, display: "flex", gap: 12 }}>
            <Link href="/kontakt" className="btn btn-primary">Anfrage senden</Link>
            <a href="tel:+498997594591" className="btn btn-outline">Anrufen</a>
          </div>
        </div>
      </section>
    </>
  );
}
