import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getService, services } from "@/lib/content";
import { images } from "@/lib/images";

type Props = { params: Promise<{ slug: string }> };

const serviceImages: Record<string, { src: string; alt: string }> = {
  exportverpackung: images.containerYard,
  gefahrgutverpackung: images.warehouse,
  schwergutverpackung: images.welding,
  spezialverpackung: images.packaging,
  verpackungsberatung: images.handshake,
  "vor-ort-verpackung": images.workshop,
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
  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        title={service.title}
        image={image}
        eyebrow={service.sector}
        description={service.summary}
      />

      <Breadcrumbs trail={[{ label: "Leistungen", href: "/leistungen" }, { label: service.title }]} />

      <section className="section">
        <div className="wrap detail-grid">
          <div className="prose-narrow">
            <ScrollReveal>
              <div className="sec-intro sec-intro--start">
                <p className="kicker">Im Detail</p>
                <h2 className="h2">{service.detailHeading}</h2>
              </div>
            </ScrollReveal>

            <div className="prose-body">
              {service.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {service.highlights?.length ? (
              <div className="detail-highlights">
                <p className="field-label">Auf einen Blick</p>
                <div className="taglist">
                  {service.highlights.map((h) => (
                    <span key={h} className="taglist__item">{h}</span>
                  ))}
                </div>
              </div>
            ) : null}

            <Link href="/kontakt" className="btn btn-primary detail-cta">
              Anfrage senden
            </Link>
          </div>

          <div>
            <div className="section-head detail-related__head">
              <div>
                <p className="kicker">Weitere Leistungen</p>
                <h2 className="h3">Das könnte Sie auch interessieren</h2>
              </div>
            </div>
            <div className="bento">
              {others.map((s) => (
                <Link key={s.slug} href={`/leistungen/${s.slug}`} className="bento-card">
                  <p className="bento-card__sector">{s.sector}</p>
                  <h3 className="bento-card__title">{s.title}</h3>
                  <p className="bento-card__text">{s.summary}</p>
                  <span className="bento-card__arrow">
                    <svg viewBox="0 0 16 16"><path d="M4 12 L12 4 M12 4 L5 4 M12 4 L12 11" /></svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
