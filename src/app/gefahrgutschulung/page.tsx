import type { Metadata } from "next";
import Image from "next/image";
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
    <>
      <section className="relative isolate -mt-[4.5rem] overflow-hidden grain">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2200&auto=format&fit=crop"
            alt="Schulung und Dokumentation in der Logistik"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[rgba(8,16,13,0.8)]" />
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)]">
            Gefahrgutschulung
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Erfolgreiche Gefahrgutschulung am Standort München Flughafen
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#d5e6dc]">
            Qualifiziertes Personal für sicheren Gefahrguttransport — praxisnah und vorschriftenaktuell.
          </p>
          <Link
            href="/kontakt"
            className="btn-primary mt-8 bg-[var(--accent-bright)] text-[var(--ink)] hover:bg-white"
          >
            Termin anfragen
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-3xl">
          <p className="text-base leading-relaxed text-[var(--steel)]">
            Als Airport-Verpackungs-Service legen wir großen Wert auf Sicherheit und verantwortungsvollen
            Umgang mit Gefahrgut. Durch regelmäßige Schulungen bleiben Sie und Ihr Team auf dem neuesten
            Stand der Vorschriften und Best Practices.
          </p>
          <p className="mt-5 text-base leading-relaxed text-[var(--steel)]">
            Unser Leistungsspektrum umfasst IATA-Schulungen sowie die Verantwortung für korrektes
            Verpacken und die erforderliche Dokumentation — für ADR/Straße, IMDG/Seefracht und
            IATA/Luftfracht.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {trainingTopics.map((topic) => (
            <div key={topic.title} className="border-t border-[var(--line)] pt-6">
              <h2 className="font-display text-xl font-semibold">{topic.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-[var(--steel)]">
                {topic.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border border-[var(--line)] bg-white/50 p-8 md:p-10">
          <h2 className="font-display text-2xl font-semibold">Vereinbaren Sie jetzt einen Termin</h2>
          <p className="mt-3 max-w-xl text-base text-[var(--steel)]">
            Sie möchten eine Gefahrgutschulung für sich oder Ihre Mitarbeiter buchen? Wir beraten Sie
            telefonisch oder vereinbaren direkt einen Termin.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={site.phoneHref} className="btn-primary">
              {site.phone}
            </a>
            <Link href="/kontakt" className="btn-ghost border border-[var(--line)] bg-white">
              Schreiben Sie uns
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
