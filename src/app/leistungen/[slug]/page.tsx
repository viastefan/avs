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
        <article className="wrap" style={{ maxWidth: 680 }}>
          <p className="lead">{service.summary}</p>
          <div className="muted" style={{ marginTop: 28, display: "grid", gap: 16 }}>
            {service.body.map((p) => (
              <p key={p} style={{ margin: 0 }}>{p}</p>
            ))}
          </div>
          {service.highlights?.length ? (
            <ul className="muted" style={{ marginTop: 28, paddingLeft: 18, display: "grid", gap: 6, fontSize: 14 }}>
              {service.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          ) : null}
          <Link href="/kontakt" className="btn btn-primary" style={{ marginTop: 36 }}>
            Anfrage senden
          </Link>
        </article>
      </section>
    </>
  );
}
