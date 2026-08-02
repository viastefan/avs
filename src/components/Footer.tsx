import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)] text-[var(--paper)]">
      <div className="wrap grid gap-0 md:grid-cols-12">
        <div className="border-b border-[var(--line)] py-10 md:col-span-5 md:border-b-0 md:border-r md:pr-10">
          <p className="font-display text-5xl font-black tracking-tight">{site.name}</p>
          <p className="meta mt-4 text-[var(--mute)]">{site.legalName}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--steel)]">
            Reglementierter Beauftragter{" "}
            <span className="text-[var(--green)]">{site.approval}</span>. Verpackung, Stauung und
            Schulung am Flughafen München.
          </p>
        </div>

        <div className="border-b border-[var(--line)] py-10 md:col-span-3 md:border-b-0 md:border-r md:px-8">
          <p className="meta text-[var(--mute)]">Index</p>
          <ul className="mt-4 space-y-2 text-sm uppercase tracking-wide">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[var(--green)]">
                  <span className="mr-2 text-[var(--mute)]">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/impressum" className="hover:text-[var(--green)]">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:text-[var(--green)]">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>

        <div className="py-10 md:col-span-4 md:pl-8">
          <p className="meta text-[var(--mute)]">Standort</p>
          <address className="mt-4 space-y-1 text-sm not-italic text-[var(--steel)]">
            <p>{site.address.line1}</p>
            <p>{site.address.line2}</p>
            <p>{site.address.city}</p>
            <p className="pt-4">
              <a href={site.phoneHref} className="text-[var(--paper)] hover:text-[var(--green)]">
                {site.phone}
              </a>
            </p>
            <p>
              <a href="tel:+498997594592" className="text-[var(--paper)] hover:text-[var(--green)]">
                {site.phoneAlt}
              </a>
            </p>
            <p>
              <a href={site.emailHref} className="text-[var(--paper)] hover:text-[var(--green)]">
                {site.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="wrap flex flex-col gap-2 py-4 text-[0.7rem] uppercase tracking-[0.08em] text-[var(--mute)] md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <p>Stefan Dirnberger · München</p>
        </div>
      </div>
    </footer>
  );
}
