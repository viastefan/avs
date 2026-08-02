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

      <section className="band-light">
        <div className="wrap py-14 md:py-20">
          <ul className="max-w-2xl">
            {trainingTopics.map((topic) => (
              <li
                key={topic.title}
                className="border-t border-[var(--line-on-light)] py-6 last:border-b"
              >
                <h2 className="font-display text-lg font-bold tracking-tight md:text-xl">
                  {topic.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--steel-on-light)] md:text-[0.95rem]">
                  {topic.items.join(" · ")}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <Link href="/kontakt" className="btn-dark">
              Termin anfragen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
