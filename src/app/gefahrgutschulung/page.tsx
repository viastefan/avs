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
      <section className="relative -mt-[var(--header-h)] border-b border-[var(--line)]">
        <div className="grid lg:grid-cols-12">
          <div className="bg-[var(--ink)] px-[var(--gutter)] py-16 lg:col-span-5 lg:py-24">
            <p className="meta text-[var(--mute)]">Training / Compliance</p>
            <h1 className="font-display mt-4 text-5xl font-black leading-none md:text-6xl">
              Gefahrgutschulung
            </h1>
            <div className="mt-6 h-px w-16 bg-[var(--green)]" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--steel)]">
              Qualifiziertes Personal für sicheren Gefahrguttransport — praxisnah und
              vorschriftenaktuell.
            </p>
            <Link href="/kontakt" className="btn-primary mt-8">
              Termin anfragen
            </Link>
          </div>
          <div className="relative min-h-[280px] lg:col-span-7">
            <Image
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2200&auto=format&fit=crop"
              alt="Dokumentation und Schulung"
              fill
              priority
              className="object-cover grayscale contrast-125"
              sizes="(max-width:1024px) 100vw, 58vw"
            />
            <div className="absolute inset-0 bg-[var(--ink)]/55" />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)]">
        <div className="wrap grid gap-0 md:grid-cols-12">
          <div className="border-b border-[var(--line)] py-12 md:col-span-4 md:border-b-0 md:border-r md:pr-8">
            <p className="index">Briefing</p>
            <h2 className="font-display mt-3 text-3xl font-black">Sicherheit zuerst</h2>
          </div>
          <div className="space-y-4 py-12 text-sm leading-relaxed text-[var(--steel)] md:col-span-8 md:pl-10">
            <p>
              Als Airport-Verpackungs-Service legen wir großen Wert auf Sicherheit und
              verantwortungsvollen Umgang mit Gefahrgut. Regelmäßige Schulungen halten Ihr Team auf dem
              aktuellen Stand.
            </p>
            <p>
              Leistungsspektrum: IATA-Schulungen, korrektes Verpacken, Dokumentation — für ADR/Straße,
              IMDG/Seefracht und IATA/Luftfracht.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap py-12">
        <div className="grid gap-0 md:grid-cols-2">
          {trainingTopics.map((topic, i) => (
            <div key={topic.title} className="border border-[var(--line)] p-6 md:-mt-px md:-ml-px">
              <p className="meta text-[var(--mute)]">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="font-display mt-3 text-2xl font-extrabold">{topic.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-[var(--steel)]">
                {topic.items.map((item) => (
                  <li key={item} className="border-t border-[var(--line)] pt-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border border-[var(--line)] bg-[var(--ink-2)] p-8">
          <h2 className="font-display text-3xl font-black">Termin vereinbaren</h2>
          <p className="mt-3 max-w-xl text-sm text-[var(--steel)]">
            Schulung für Sie oder Ihr Team — telefonisch vorab oder direkt Termin.
          </p>
          <div className="mt-6 flex flex-wrap">
            <a href={site.phoneHref} className="btn-primary">
              {site.phone}
            </a>
            <Link href="/kontakt" className="btn-ghost -ml-px">
              Schreiben
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
