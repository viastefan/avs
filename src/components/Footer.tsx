import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="wrap flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between md:gap-8">
        <div>
          <p className="font-display text-lg font-bold">{site.name}</p>
          <p className="mt-2 text-sm text-[var(--mute)]">{site.legalName}</p>
          <p className="mt-4 text-sm text-[var(--steel)]">
            <a href={site.phoneHref} className="hover:text-[var(--paper)]">
              {site.phone}
            </a>
            <span className="mx-2 text-[var(--line)]">·</span>
            <a href={site.emailHref} className="hover:text-[var(--paper)]">
              {site.email}
            </a>
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--mute)]" aria-label="Footer">
          <Link href="/leistungen" className="hover:text-[var(--paper)]">
            Leistungen
          </Link>
          <Link href="/kontakt" className="hover:text-[var(--paper)]">
            Kontakt
          </Link>
          <Link href="/impressum" className="hover:text-[var(--paper)]">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-[var(--paper)]">
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
