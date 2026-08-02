import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[rgba(255,255,255,0.35)]">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
        <div>
          <p className="font-display text-2xl font-semibold">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--fog)]">
            {site.legalName}
            <br />
            {site.address.line2} · {site.address.city}
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Leistungen</p>
          <ul className="space-y-2.5 text-sm text-[var(--fog)]">
            <li>
              <Link href="/leistungen" className="hover:text-[var(--ink)]">
                Verpackungsservice
              </Link>
            </li>
            <li>
              <Link href="/containerstauung" className="hover:text-[var(--ink)]">
                Containerstauung
              </Link>
            </li>
            <li>
              <Link href="/gefahrgutschulung" className="hover:text-[var(--ink)]">
                Gefahrgutschulung
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Kontakt</p>
          <div className="space-y-2 text-sm text-[var(--fog)]">
            <p>
              <a href={site.phoneHref} className="font-semibold text-[var(--ink)] hover:text-[var(--green)]">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={site.emailHref} className="hover:text-[var(--ink)]">
                {site.email}
              </a>
            </p>
            <p className="pt-2 text-xs">Reglementierter Beauftragter {site.approval}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="wrap flex flex-col gap-3 py-5 text-xs text-[var(--mist)] sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <nav className="flex gap-5">
            <Link href="/impressum" className="hover:text-[var(--ink)]">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-[var(--ink)]">
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
