import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { containerFeatures } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Containerstauung",
  description:
    "Effiziente Containerstauung am Flughafen München — optimale Raumnutzung, Ladungssicherung und Palettisierung.",
};

export default function ContainerstauungPage() {
  return (
    <>
      <PageHero
        title="Containerstauung"
        description="Raumnutzung, Ladungssicherung und Palettisierung für Land, See und Luft."
        image={images.containers}
        eyebrow="Stauung & Sicherung"
      />
      <section className="section">
        <div className="wrap max-w-2xl">
          <ul className="border-t border-[var(--line)]">
            {containerFeatures.map((feature) => (
              <li key={feature.title} className="border-b border-[var(--line)] py-6">
                <h2 className="font-display text-lg font-semibold">{feature.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] md:text-base">
                  {feature.text}
                </p>
              </li>
            ))}
          </ul>
          <Link href="/kontakt" className="btn btn-primary mt-10">
            Anfrage senden
          </Link>
        </div>
      </section>
    </>
  );
}
