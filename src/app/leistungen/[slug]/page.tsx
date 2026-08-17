import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
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
        backHref="/leistungen"
        backLabel="Leistungen"
        eyebrow={service.sector}
        description={service.summary}
      />

      <section className="section">
        <div className="wrap" style={{ display: "grid", gap: "clamp(40px, 6vw, 80px)", gridTemplateColumns: "minmax(0, 1fr)" }}>
          <ScrollReveal>
            <div className="detail-figure">
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 100vw, 1100px" style={{ objectFit: "cover" }} />
            </div>
          </ScrollReveal>

          <div className="prose-narrow">
            <p className="lead" style={{ marginBottom: 24 }}>{service.summary}</p>
            <div className="prose-body">
              {service.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {service.highlights?.length ? (
              <div style={{ marginTop: 36 }}>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", opacity: 0.7 }}>
                  Auf einen Blick
                </p>
                <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {service.highlights.map((h) => (
                    <span
                      key={h}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        height: 40,
                        padding: "0 16px",
                        borderRadius: 999,
                        border: "1px solid var(--line-strong)",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--ink)",
                      }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <Link href="/kontakt" className="btn btn-primary" style={{ marginTop: 40 }}>
              Anfrage senden
            </Link>
          </div>

          <div>
            <div className="section-head" style={{ marginBottom: 24, paddingTop: 8, borderTop: "1px solid var(--line)" }}>
              <div>
                <p className="kicker">Weitere Leistungen</p>
                <h2 className="h3" style={{ marginTop: 8 }}>Das könnte Sie auch interessieren</h2>
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
