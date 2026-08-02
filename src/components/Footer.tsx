import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="wrap grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
        <div>
          <p className="font-display text-xl font-semibold">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
            {site.legalName}
            <br />
            {site.address.line2}, {site.address.city}
          </p>
        </div>
        <div>
          <p className="eyebrow mb-3">Leistungen</p>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
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
          <p className="eyebrow mb-3">Kontakt</p>
          <div className="space-y-2 text-sm text-[var(--muted)]">
            <p>
              <a href={site.phoneHref} className="font-medium text-[var(--ink)] hover:text-[var(--green)]">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={site.emailHref} className="hover:text-[var(--ink)]">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="wrap flex flex-col gap-3 py-4 text-xs text-[var(--muted)] sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <nav className="flex gap-4">
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
