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
      <section className="relative isolate -mt-[4.5rem] overflow-hidden grain">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2200&auto=format&fit=crop"
            alt="Containerschiff und Frachtlogistik"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[rgba(8,16,13,0.78)]" />
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)]">
            Containerstauung
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Containerstauung durch Profis am Flughafen München
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#d5e6dc]">
            Schnell geplant, optimal genutzt, gegen Bruchgefahr gesichert.
          </p>
          <Link
            href="/kontakt"
            className="btn-primary mt-8 bg-[var(--accent-bright)] text-[var(--ink)] hover:bg-white"
          >
            Termin vereinbaren
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Effiziente Stauung mit optimaler Raumnutzung
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--steel)]">
            Unser Team verstaut Ihre Waren und Transportgüter unter optimaler Raumnutzung. So
            transportieren Sie effizient — und dennoch bestens gegen Bruchgefahr gesichert.
          </p>
        </div>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2">
          {containerFeatures.map((feature) => (
            <li key={feature.title} className="border-t border-[var(--line)] pt-6">
              <h3 className="font-display text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--steel)]">{feature.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold">Ladungssicherung für Land, See & Luft</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--steel)]">
            Egal für welche Transportart Sie sich entscheiden — wir informieren Sie über die
            bestmöglichen Verpackungsoptionen. Unsere fachgerechte Stauung gewährleistet, dass Ihre
            Waren unbeschadet ihr Ziel erreichen.
          </p>
          <p className="mt-6 text-sm text-[var(--ink)]">
            Telefonische Beratung:{" "}
            <a href={site.phoneHref} className="font-semibold text-[var(--accent-deep)]">
              {site.phone} / 92
            </a>
          </p>
          <Link href="/kontakt" className="btn-primary mt-8">
            Angebot anfordern
          </Link>
        </div>
      </section>
    </>
  );
}
