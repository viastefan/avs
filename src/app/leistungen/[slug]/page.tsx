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
  const index = services.findIndex((s) => s.slug === slug);

  return (
    <article className="border-b border-[var(--ink)]">
      <div className="wrap py-12 md:py-16">
        <p className="meta text-[var(--steel)]">
          Spec / {String(index + 1).padStart(2, "0")} · {service.sector}
        </p>
        <h1 className="font-display mt-3 max-w-4xl text-5xl font-black leading-none md:text-7xl">
          {service.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--steel)]">{service.summary}</p>

        <div className="mt-12 max-w-2xl space-y-5 border-t border-[var(--ink)] pt-8 text-base leading-relaxed text-[var(--ink)]">
          {service.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        {service.highlights?.length ? (
          <ul className="mt-10 grid gap-0 border border-[var(--ink)] sm:grid-cols-3">
            {service.highlights.map((h) => (
              <li
                key={h}
                className="border-b border-[var(--ink)] p-4 text-sm font-medium sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                {h}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-12 flex flex-wrap">
          <Link href="/kontakt" className="btn-accent">
            Beratung
          </Link>
          <a href={site.phoneHref} className="btn-primary -ml-px">
            {site.phone}
          </a>
          <Link href="/leistungen" className="btn-ghost -ml-px">
            ← Katalog
          </Link>
        </div>
      </div>
    </article>
  );
}
