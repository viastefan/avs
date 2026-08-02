import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/content";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Verpackungsservice",
  description:
    "Export-, Gefahrgut-, Schwergut- und Spezialverpackung am Flughafen München — IATA, ADR und IMDG konform.",
};

export default function LeistungenPage() {
  return (
    <>
      <section className="relative -mt-[var(--header-h)] min-h-[50svh] band-dark md:min-h-[58svh]">
        <Image
          src={images.packaging.src}
          alt={images.packaging.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/55 to-[var(--ink)]/40" />
        <div className="relative z-[1] wrap flex min-h-[50svh] flex-col justify-end pb-12 pt-28 md:min-h-[58svh] md:pb-16">
          <h1 className="font-display max-w-2xl text-4xl font-black leading-none md:text-6xl">
            Verpackungsservice
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--steel-on-dark)]">
            Gefahrgüter und Transportgüter für Straße, See und Luftfracht.
          </p>
        </div>
      </section>

      <section className="band-light">
        <div className="wrap py-16 md:py-24">
          <ul>
            {services.map((service) => (
              <li
                key={service.slug}
                className="border-t border-[var(--line-on-light)] last:border-b"
              >
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group grid gap-3 py-8 md:grid-cols-[1fr_1.5fr] md:gap-16"
                >
                  <h2 className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-[var(--green)]">
                    {service.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-[var(--steel-on-light)] md:text-base">
                    {service.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
