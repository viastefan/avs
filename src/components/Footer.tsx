import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)] text-[#e8f2ec]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-3xl font-semibold tracking-tight">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#a8bdb2]">
            {site.legalName} — {site.tagline}. Reglementierter Beauftragter {site.approval}.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-bright)]">
            Navigation
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[#d5e6dc] transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/impressum" className="text-[#d5e6dc] transition hover:text-white">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="text-[#d5e6dc] transition hover:text-white">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-bright)]">
            Standort
          </p>
          <address className="mt-4 space-y-1 text-sm not-italic text-[#d5e6dc]">
            <p>{site.address.line1}</p>
            <p>{site.address.line2}</p>
            <p>{site.address.city}</p>
            <p className="pt-3">
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={site.phoneHref.replace("591", "592")} className="hover:text-white">
                {site.phoneAlt}
              </a>
            </p>
            <p>
              <a href={site.emailHref} className="hover:text-white">
                {site.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-[#8fa89c] md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <p>Made by Stefan Dirnberger · München</p>
        </div>
      </div>
    </footer>
  );
}
