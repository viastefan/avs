import type { Metadata } from "next";
import Link from "next/link";
import { containerFeatures } from "@/lib/content";

export const metadata: Metadata = {
  title: "Containerstauung",
  description:
    "Effiziente Containerstauung am Flughafen München — optimale Raumnutzung, Ladungssicherung und Palettisierung.",
};

export default function ContainerstauungPage() {
  return (
    <section className="wrap py-20 md:py-28">
      <h1 className="font-display max-w-xl text-4xl font-black leading-none md:text-6xl">
        Containerstauung
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--steel)]">
        Raumnutzung, Ladungssicherung und Palettisierung — für Land, See und Luft.
      </p>

      <ul className="mt-16 max-w-lg">
        {containerFeatures.map((feature) => (
          <li key={feature.title} className="border-t border-[var(--line)] py-6 last:border-b">
            <h2 className="font-display text-lg font-bold">{feature.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--steel)]">{feature.text}</p>
          </li>
        ))}
      </ul>

      <div className="mt-14">
        <Link href="/kontakt" className="btn-primary">
          Anfrage stellen
        </Link>
      </div>
    </section>
  );
}
