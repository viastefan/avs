import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { trainingTopics } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Gefahrgutschulung",
  description: "Professionelle Gefahrgutschulung am Flughafen München.",
};

export default function GefahrgutschulungPage() {
  return (
    <>
      <PageHero
        title="Gefahrgutschulung"
        description="IATA, ADR und IMDG — praxisnah für Verpacken, Kennzeichnen und Dokumentieren."
        image={images.training}
        eyebrow="Qualifikation"
      />
      <section className="section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {trainingTopics.map((topic, i) => (
              <div key={topic.title} className="bento-card" style={{ minHeight: 200 }}>
                <span className="bento-card__idx">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="bento-card__title">{topic.title}</h2>
                <ul style={{ margin: "10px 0 0", padding: "0 0 0 16px", display: "grid", gap: 4, fontSize: 13, color: "var(--muted)" }}>
                  {topic.items.map((item) => (
                    <li key={item} style={{ lineHeight: 1.5 }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, display: "flex", gap: 12 }}>
            <Link href="/kontakt" className="btn btn-primary">Termin anfragen</Link>
            <a href="tel:+498997594591" className="btn btn-outline">Anrufen</a>
          </div>
        </div>
      </section>
    </>
  );
}
