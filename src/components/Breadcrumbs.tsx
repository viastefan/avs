import Link from "next/link";
import { site } from "@/lib/site";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const items = [{ label: "Startseite", href: "/" }, ...trail];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };

  return (
    <nav className="crumbs" aria-label="Brotkrumennavigation">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.label}>
              {c.href && !last ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              {!last ? <span className="crumbs__sep" aria-hidden>›</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
