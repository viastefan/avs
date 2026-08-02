import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
        <div>
          <p className="font-display text-2xl font-bold">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--steel)]">
            {site.legalName}
            <br />
            Reglementierter Beauftragter {site.approval}
          </p>
        </div>

        <div>
          <p className="meta mb-4">Seiten</p>
          <ul className="space-y-2 text-sm text-[var(--steel)]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[var(--paper)]">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/impressum" className="hover:text-[var(--paper)]">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:text-[var(--paper)]">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="meta mb-4">Kontakt</p>
          <address className="space-y-1 text-sm not-italic text-[var(--steel)]">
            <p>{site.address.line1}</p>
            <p>{site.address.city}</p>
            <p className="pt-3">
              <a href={site.phoneHref} className="text-[var(--paper)] hover:text-[var(--green)]">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={site.emailHref} className="hover:text-[var(--paper)]">
                {site.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="wrap flex flex-col gap-2 py-5 text-xs text-[var(--mute)] md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}</p>
          <p>Stefan Dirnberger · München</p>
        </div>
      </div>
    </footer>
  );
}
