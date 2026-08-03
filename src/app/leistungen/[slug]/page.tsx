import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { getService, services } from "@/lib/content";
import { getServiceImage } from "@/lib/images";

type Props = { params: Promise<{ slug: string }> };

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
  const image = getServiceImage(slug);

  return (
    <>
      <PageHero
        title={service.title}
        image={image}
        backHref="/leistungen"
        backLabel="Leistungen"
        eyebrow={service.sector}
        description={service.summary}
      />
      <section className="section">
        <article className="wrap prose-narrow">
          <div className="prose-body">
            {service.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {service.highlights?.length ? (
            <ul className="prose-list">
              {service.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          ) : null}
          <Link href="/kontakt" className="btn btn-primary" style={{ marginTop: 40 }}>
            Anfrage senden
          </Link>
        </article>
      </section>
    </>
  );
}
