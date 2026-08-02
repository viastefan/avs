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
    <article className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
        {service.sector}
      </p>
      <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
        {service.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--steel)]">{service.summary}</p>

      <div className="mt-12 max-w-2xl space-y-5 text-base leading-relaxed text-[var(--ink-soft)]">
        {service.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      {service.highlights?.length ? (
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-[var(--accent-deep)]">
          {service.highlights.map((h) => (
            <li key={h}>· {h}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-14 flex flex-wrap gap-3">
        <Link href="/kontakt" className="btn-primary">
          Beratung anfragen
        </Link>
        <a href={site.phoneHref} className="btn-ghost border border-[var(--line)] bg-white/60">
          {site.phone}
        </a>
        <Link href="/leistungen" className="btn-ghost">
          ← Alle Leistungen
        </Link>
      </div>
    </article>
  );
}
