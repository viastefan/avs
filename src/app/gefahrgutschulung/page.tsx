import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { trainingTopics } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Gefahrgutschulung",
  description:
    "Professionelle Gefahrgutschulung am Flughafen München — IATA, ADR und IMDG, Dokumentation und Kennzeichnung.",
};

export default function GefahrgutschulungPage() {
  return (
    <>
      <section className="relative -mt-[var(--header-h)] min-h-[56svh] band-dark md:min-h-[64svh]">
        <Image
          src={images.training.src}
          alt={images.training.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/60 to-[var(--ink)]/45" />
        <div className="relative z-[1] wrap flex min-h-[56svh] flex-col justify-end pb-12 pt-28 md:min-h-[64svh] md:pb-16">
          <h1 className="font-display max-w-2xl text-4xl font-black leading-none md:text-6xl">
            Gefahrgutschulung
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--steel-on-dark)] md:text-lg">
            IATA, ADR und IMDG — praxisnah für Verpacken, Kennzeichnen und Dokumentieren.
          </p>
        </div>
      </section>

      <section className="band-light">
        <div className="wrap py-16 md:py-24">
          <ul className="max-w-2xl">
            {trainingTopics.map((topic) => (
              <li
                key={topic.title}
                className="border-t border-[var(--line-on-light)] py-7 last:border-b"
              >
                <h2 className="font-display text-xl font-bold tracking-tight">{topic.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--steel-on-light)] md:text-base">
                  {topic.items.join(" · ")}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <Link href="/kontakt" className="btn-dark">
              Termin anfragen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
