import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
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
      <PageHero
        title={service.title}
        image={image}
        backHref="/leistungen"
        backLabel="Leistungen"
      />

      <section className="band-light">
        <article className="wrap py-14 md:py-20">
          <p className="max-w-xl text-lg leading-relaxed text-[var(--steel-on-light)]">
            {service.summary}
          </p>

          <div className="mt-8 max-w-xl space-y-4 text-base leading-relaxed text-[var(--steel-on-light)]">
            {service.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {service.highlights?.length ? (
            <ul className="mt-10 space-y-2 text-sm text-[var(--mute-on-light)]">
              {service.highlights.map((h) => (
                <li key={h}>— {h}</li>
              ))}
            </ul>
          ) : null}

          <div className="mt-12">
            <Link href="/kontakt" className="btn-dark">
              Anfrage stellen
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
