import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/content";
import { images } from "@/lib/images";

type Props = { params: Promise<{ slug: string }> };

const serviceImages: Record<string, { src: string; alt: string }> = {
  exportverpackung: images.packaging,
  gefahrgutverpackung: images.warehouse,
  schwergutverpackung: images.trucks,
  spezialverpackung: images.airport,
  verpackungsberatung: images.cargoPlane,
  "vor-ort-verpackung": images.warehouse,
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const image = serviceImages[slug] ?? images.warehouse;

  return (
    <>
      <section className="relative -mt-[var(--header-h)] min-h-[46svh] band-dark md:min-h-[52svh]">
        <Image src={image.src} alt={image.alt} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/55 to-[var(--ink)]/40" />
        <div className="relative z-[1] wrap flex min-h-[46svh] flex-col justify-end pb-12 pt-28 md:min-h-[52svh] md:pb-16">
          <Link href="/leistungen" className="meta text-[var(--steel-on-dark)] hover:text-[var(--green-bright)]">
            ← Leistungen
          </Link>
          <h1 className="font-display mt-4 max-w-2xl text-4xl font-black leading-none md:text-6xl">
            {service.title}
          </h1>
        </div>
      </section>

      <section className="band-light">
        <article className="wrap py-16 md:py-24">
          <p className="max-w-xl text-lg leading-relaxed text-[var(--steel-on-light)]">
            {service.summary}
          </p>

          <div className="mt-10 max-w-xl space-y-5 text-base leading-relaxed text-[var(--steel-on-light)]">
            {service.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {service.highlights?.length ? (
            <ul className="mt-12 space-y-2 text-sm text-[var(--mute-on-light)]">
              {service.highlights.map((h) => (
                <li key={h}>— {h}</li>
              ))}
            </ul>
          ) : null}

          <div className="mt-14">
            <Link href="/kontakt" className="btn-dark">
              Anfrage stellen
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
