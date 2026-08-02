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
        description="Raumnutzung, Ladungssicherung und Palettisierung — für Land, See und Luft."
        image={images.containers}
        eyebrow="Stauung & Sicherung"
      />

      <section className="band-light">
        <div className="wrap py-14 md:py-20">
          <ul className="max-w-2xl">
            {containerFeatures.map((feature) => (
              <li
                key={feature.title}
                className="border-t border-[var(--line-on-light)] py-6 last:border-b"
              >
                <h2 className="font-display text-lg font-bold tracking-tight md:text-xl">
                  {feature.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--steel-on-light)] md:text-[0.95rem]">
                  {feature.text}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <Link href="/kontakt" className="btn-dark">
              Anfrage stellen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
