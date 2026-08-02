import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="band-dark border-t border-[var(--line-on-dark)]">
      <div className="wrap grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10">
        <div>
          <p className="font-display text-xl font-semibold text-[#eef0f2]">{site.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--steel-on-dark)]">
            {site.legalName}
            <br />
            Reglementierter Beauftragter {site.approval}
          </p>
        </div>

        <div>
          <p className="meta mb-4">Leistungen</p>
          <ul className="space-y-2.5 text-sm text-[var(--steel-on-dark)]">
            <li>
              <Link href="/leistungen" className="hover:text-[#eef0f2]">
                Verpackungsservice
              </Link>
            </li>
            <li>
              <Link href="/containerstauung" className="hover:text-[#eef0f2]">
                Containerstauung
              </Link>
            </li>
            <li>
              <Link href="/gefahrgutschulung" className="hover:text-[#eef0f2]">
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
              <a href={site.phoneHref} className="text-[#eef0f2] hover:text-[var(--green-bright)]">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={site.emailHref} className="hover:text-[#eef0f2]">
                {site.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-[var(--line-on-dark)]">
        <div className="wrap flex flex-col gap-3 py-5 text-xs text-[var(--mute-on-dark)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <nav className="flex gap-5" aria-label="Rechtliches">
            <Link href="/impressum" className="hover:text-[#eef0f2]">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-[#eef0f2]">
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
