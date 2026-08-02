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
  return { title: service.title, description: service.summary };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const image = serviceImages[slug] ?? images.warehouse;

  return (
    <>
      <PageHero title={service.title} image={image} backHref="/leistungen" backLabel="Leistungen" />
      <section className="section">
        <article className="wrap max-w-2xl">
          <p className="text-[length:var(--lead)] leading-relaxed text-[var(--fog)]">{service.summary}</p>
          <div className="mt-8 space-y-4 text-[var(--fog)]">
            {service.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {service.highlights?.length ? (
            <ul className="mt-8 space-y-2 text-sm text-[var(--mist)]">
              {service.highlights.map((h) => (
                <li key={h}>— {h}</li>
              ))}
            </ul>
          ) : null}
          <Link href="/kontakt" className="btn btn-primary mt-10">
            Anfrage senden
          </Link>
        </article>
      </section>
    </>
  );
}
