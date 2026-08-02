import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/content";

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
    <article className="wrap py-20 md:py-28">
      <Link href="/leistungen" className="meta hover:text-[var(--green)]">
        ← Leistungen
      </Link>
      <h1 className="font-display mt-6 max-w-2xl text-4xl font-black leading-none md:text-6xl">
        {service.title}
      </h1>
      <p className="mt-8 max-w-lg text-lg leading-relaxed text-[var(--steel)]">
        {service.summary}
      </p>

      <div className="mt-12 max-w-lg space-y-5 text-base leading-relaxed text-[var(--steel)]">
        {service.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      {service.highlights?.length ? (
        <ul className="mt-12 space-y-2 text-sm text-[var(--mute)]">
          {service.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-16">
        <Link href="/kontakt" className="btn-primary">
          Anfrage stellen
        </Link>
      </div>
    </article>
  );
}
