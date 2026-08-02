import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { containerFeatures } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Containerstauung",
  description:
    "Effiziente Containerstauung am Flughafen München — optimale Raumnutzung, Ladungssicherung und Palettisierung.",
};

export default function ContainerstauungPage() {
  return (
    <>
      <section className="relative -mt-[var(--header-h)] border-b border-[var(--line)]">
        <div className="grid lg:grid-cols-12">
          <div className="bg-[var(--ink)] px-[var(--gutter)] py-16 lg:col-span-5 lg:py-24">
            <p className="meta text-[var(--mute)]">Service / Container</p>
            <h1 className="font-display mt-4 text-5xl font-black leading-none md:text-6xl">
              Containerstauung
            </h1>
            <div className="mt-6 h-px w-16 bg-[var(--green)]" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--steel)]">
              Schnell geplant, optimal genutzt, gegen Bruchgefahr gesichert — am Standort Flughafen
              München.
            </p>
            <Link href="/kontakt" className="btn-primary mt-8">
              Termin anfragen
            </Link>
          </div>
          <div className="relative min-h-[280px] lg:col-span-7">
            <Image
              src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2200&auto=format&fit=crop"
              alt="Containerschiff und Frachtlogistik"
              fill
              priority
              className="object-cover grayscale contrast-125"
              sizes="(max-width:1024px) 100vw, 58vw"
            />
            <div className="absolute inset-0 bg-[var(--ink)]/50" />
          </div>
        </div>
      </section>

      <section className="wrap py-12">
        <p className="index">Module</p>
        <h2 className="font-display mt-2 text-4xl font-black">Leistungsumfang</h2>
        <ul className="mt-10 grid gap-0 sm:grid-cols-2">
          {containerFeatures.map((feature, i) => (
            <li
              key={feature.title}
              className="border border-[var(--line)] p-6 sm:-mt-px sm:-ml-px first:mt-0"
            >
              <p className="meta text-[var(--mute)]">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-display mt-3 text-2xl font-extrabold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--steel)]">{feature.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 border border-[var(--line)] bg-[var(--ink-2)] p-8">
          <h2 className="font-display text-3xl font-black">Land · See · Luft</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--steel)]">
            Fachgerechte Stauung für jede Transportart. Telefonische Beratung unter{" "}
            <a href={site.phoneHref} className="text-[var(--paper)] underline decoration-[var(--green)] decoration-1">
              {site.phone}
            </a>
            .
          </p>
          <Link href="/kontakt" className="btn-primary mt-6">
            Angebot anfordern
          </Link>
        </div>
      </section>
    </>
  );
}
