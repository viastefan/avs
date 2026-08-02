import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { trainingTopics } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Gefahrgutschulung",
  description:
    "Professionelle Gefahrgutschulung am Flughafen München — IATA, ADR und IMDG, Dokumentation und Kennzeichnung.",
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
        <div className="wrap max-w-2xl">
          <ul className="border-t border-[var(--line)]">
            {trainingTopics.map((topic) => (
              <li key={topic.title} className="border-b border-[var(--line)] py-7">
                <h2 className="font-display text-xl font-semibold">{topic.title}</h2>
                <p className="mt-2 text-[var(--fog)]">{topic.items.join(" · ")}</p>
              </li>
            ))}
          </ul>
          <Link href="/kontakt" className="btn btn-primary mt-10">
            Termin anfragen
          </Link>
        </div>
      </section>
    </>
  );
}
