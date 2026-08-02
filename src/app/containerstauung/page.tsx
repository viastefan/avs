import type { Metadata } from "next";
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
    <section className="wrap py-16 md:py-24">
      <p className="meta">Containerstauung</p>
      <h1 className="font-display mt-3 max-w-2xl text-4xl font-black leading-none md:text-6xl">
        Effizient gestaut
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--steel)]">
        Optimale Raumnutzung, Ladungssicherung und Palettisierung — für Land, See und Luft.
      </p>
      <Link href="/kontakt" className="btn-primary mt-8">
        Termin anfragen
      </Link>

      <ul className="mt-20 grid gap-10 sm:grid-cols-2">
        {containerFeatures.map((feature) => (
          <li key={feature.title} className="border-t border-[var(--line)] pt-6">
            <h2 className="font-display text-xl font-bold">{feature.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--steel)]">{feature.text}</p>
          </li>
        ))}
      </ul>

      <p className="mt-16 text-sm text-[var(--steel)]">
        Beratung unter{" "}
        <a href={site.phoneHref} className="text-[var(--paper)] hover:text-[var(--green)]">
          {site.phone}
        </a>
      </p>
    </section>
  );
}
