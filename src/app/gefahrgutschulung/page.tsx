import type { Metadata } from "next";
import Link from "next/link";
import { trainingTopics } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gefahrgutschulung",
  description:
    "Professionelle Gefahrgutschulung am Flughafen München — IATA, ADR und IMDG, Dokumentation und Kennzeichnung.",
};

export default function GefahrgutschulungPage() {
  return (
    <section className="wrap py-16 md:py-24">
      <p className="meta">Gefahrgutschulung</p>
      <h1 className="font-display mt-3 max-w-2xl text-4xl font-black leading-none md:text-6xl">
        Sicher geschult
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--steel)]">
        IATA, ADR und IMDG — praxisnah für korrektes Verpacken, Kennzeichnen und Dokumentieren.
      </p>
      <Link href="/kontakt" className="btn-primary mt-8">
        Termin anfragen
      </Link>

      <div className="mt-20 grid gap-12 md:grid-cols-2">
        {trainingTopics.map((topic) => (
          <div key={topic.title} className="border-t border-[var(--line)] pt-6">
            <h2 className="font-display text-xl font-bold">{topic.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-[var(--steel)]">
              {topic.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-16 text-sm text-[var(--steel)]">
        Telefonisch unter{" "}
        <a href={site.phoneHref} className="text-[var(--paper)] hover:text-[var(--green)]">
          {site.phone}
        </a>
      </p>
    </section>
  );
}
