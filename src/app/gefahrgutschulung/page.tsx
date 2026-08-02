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
        <div className="wrap" style={{ maxWidth: 680 }}>
          <div className="list">
            {trainingTopics.map((topic) => (
              <div key={topic.title} className="list-item">
                <h2 className="list__title">{topic.title}</h2>
                <p className="list__text" style={{ margin: 0 }}>{topic.items.join(" · ")}</p>
              </div>
            ))}
          </div>
          <Link href="/kontakt" className="btn btn-primary" style={{ marginTop: 36 }}>
            Termin anfragen
          </Link>
        </div>
      </section>
    </>
  );
}
