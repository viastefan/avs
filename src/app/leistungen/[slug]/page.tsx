import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

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

  return (
    <article className="wrap py-16 md:py-24">
      <p className="meta">{service.sector}</p>
      <h1 className="font-display mt-3 max-w-3xl text-4xl font-black leading-none md:text-6xl">
        {service.title}
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--steel)] md:text-lg">
        {service.summary}
      </p>

      <div className="mt-12 max-w-xl space-y-5 text-base leading-relaxed text-[var(--steel)]">
        {service.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      {service.highlights?.length ? (
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--paper)]">
          {service.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-14 flex flex-wrap gap-3">
        <Link href="/kontakt" className="btn-primary">
          Beratung
        </Link>
        <a href={site.phoneHref} className="btn-ghost">
          {site.phone}
        </a>
        <Link href="/leistungen" className="btn-ghost">
          ← Leistungen
        </Link>
      </div>
    </article>
  );
}
