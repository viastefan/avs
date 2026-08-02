import type { Metadata } from "next";
import Link from "next/link";
import { trainingTopics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gefahrgutschulung",
  description:
    "Professionelle Gefahrgutschulung am Flughafen München — IATA, ADR und IMDG, Dokumentation und Kennzeichnung.",
};

export default function GefahrgutschulungPage() {
  return (
    <section className="wrap py-20 md:py-28">
      <h1 className="font-display max-w-xl text-4xl font-black leading-none md:text-6xl">
        Gefahrgutschulung
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--steel)]">
        IATA, ADR und IMDG — praxisnah für Verpacken, Kennzeichnen und Dokumentieren.
      </p>

      <ul className="mt-16 max-w-lg">
        {trainingTopics.map((topic) => (
          <li key={topic.title} className="border-t border-[var(--line)] py-6 last:border-b">
            <h2 className="font-display text-lg font-bold">{topic.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--steel)]">
              {topic.items.join(" · ")}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-14">
        <Link href="/kontakt" className="btn-primary">
          Termin anfragen
        </Link>
      </div>
    </section>
  );
}
