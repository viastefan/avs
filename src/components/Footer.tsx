import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]">
      <div className="wrap grid gap-0 md:grid-cols-12">
        <div className="border-b border-white/15 py-10 md:col-span-5 md:border-b-0 md:border-r md:border-white/15 md:pr-10">
          <p className="font-display text-5xl font-black tracking-tight">{site.name}</p>
          <p className="meta mt-4 text-[var(--signal)]">{site.legalName}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            Reglementierter Beauftragter {site.approval}. Verpackung, Stauung und Schulung am Flughafen
            München.
          </p>
        </div>

        <div className="border-b border-white/15 py-10 md:col-span-3 md:border-b-0 md:border-r md:border-white/15 md:px-8">
          <p className="meta text-white/45">Index</p>
          <ul className="mt-4 space-y-2 text-sm uppercase tracking-wide">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[var(--signal)]">
                  <span className="mr-2 text-white/35">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/impressum" className="hover:text-[var(--signal)]">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:text-[var(--signal)]">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>

        <div className="py-10 md:col-span-4 md:pl-8">
          <p className="meta text-white/45">Standort</p>
          <address className="mt-4 space-y-1 text-sm not-italic text-white/80">
            <p>{site.address.line1}</p>
            <p>{site.address.line2}</p>
            <p>{site.address.city}</p>
            <p className="pt-4">
              <a href={site.phoneHref} className="hover:text-[var(--signal)]">
                {site.phone}
              </a>
            </p>
            <p>
              <a href="tel:+498997594592" className="hover:text-[var(--signal)]">
                {site.phoneAlt}
              </a>
            </p>
            <p>
              <a href={site.emailHref} className="hover:text-[var(--signal)]">
                {site.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="wrap flex flex-col gap-2 py-4 text-[0.7rem] uppercase tracking-[0.08em] text-white/40 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <p>Stefan Dirnberger · München</p>
        </div>
      </div>
    </footer>
  );
}
