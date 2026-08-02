import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="band-dark border-t border-[var(--line-on-dark)]">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr] md:gap-10">
        <div>
          <p className="font-display font-display-caps text-xl font-bold">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--steel-on-dark)]">
            {site.legalName}
            <br />
            Reglementierter Beauftragter {site.approval}
          </p>
        </div>

        <div>
          <p className="meta mb-4">Leistungen</p>
          <ul className="space-y-2.5 text-sm text-[var(--steel-on-dark)]">
            <li>
              <Link href="/leistungen" className="hover:text-[var(--paper)]">
                Verpackungsservice
              </Link>
            </li>
            <li>
              <Link href="/containerstauung" className="hover:text-[var(--paper)]">
                Containerstauung
              </Link>
            </li>
            <li>
              <Link href="/gefahrgutschulung" className="hover:text-[var(--paper)]">
                Gefahrgutschulung
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="meta mb-4">Kontakt</p>
          <address className="space-y-1 text-sm not-italic text-[var(--steel-on-dark)]">
            <p>{site.address.line2}</p>
            <p>{site.address.line1}</p>
            <p>{site.address.city}</p>
            <p className="pt-3">
              <a href={site.phoneHref} className="text-[var(--paper)] hover:text-[var(--green-bright)]">
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

      <div className="border-t border-[var(--line-on-dark)]">
        <div className="wrap flex flex-col gap-3 py-5 text-xs text-[var(--mute-on-dark)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}</p>
          <nav className="flex gap-5" aria-label="Rechtliches">
            <Link href="/impressum" className="hover:text-[var(--paper)]">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-[var(--paper)]">
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
