import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
      <section className="relative -mt-[var(--header-h)] min-h-[56svh] band-dark md:min-h-[64svh]">
        <Image
          src={images.containers.src}
          alt={images.containers.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/55 to-[var(--ink)]/40" />
        <div className="relative z-[1] wrap flex min-h-[56svh] flex-col justify-end pb-12 pt-28 md:min-h-[64svh] md:pb-16">
          <h1 className="font-display max-w-2xl text-4xl font-black leading-none md:text-6xl">
            Containerstauung
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--steel-on-dark)] md:text-lg">
            Raumnutzung, Ladungssicherung und Palettisierung — für Land, See und Luft.
          </p>
        </div>
      </section>

      <section className="band-light">
        <div className="wrap py-16 md:py-24">
          <ul className="max-w-2xl">
            {containerFeatures.map((feature) => (
              <li
                key={feature.title}
                className="border-t border-[var(--line-on-light)] py-7 last:border-b"
              >
                <h2 className="font-display text-xl font-bold tracking-tight">{feature.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--steel-on-light)] md:text-base">
                  {feature.text}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <Link href="/kontakt" className="btn-dark">
              Anfrage stellen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
