import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <section className="border-b border-[var(--line)]">
      <div className="wrap max-w-3xl py-12 md:py-16">
        <p className="meta text-[var(--steel)]">Legal / 01</p>
        <h1 className="font-display mt-3 text-5xl font-black">Impressum</h1>
        <div className="mt-10 space-y-8 text-sm leading-relaxed text-[var(--steel)]">
          <div>
            <h2 className="font-display text-xl font-extrabold text-[var(--paper)]">Angaben gemäß § 5 TMG</h2>
            <p className="mt-3">
              {site.legalName}
              <br />
              {site.address.line1}
              <br />
              {site.address.city}
              <br />
              {site.address.region}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-extrabold text-[var(--paper)]">Kontakt</h2>
            <p className="mt-3">
              Telefon: {site.phone}
              <br />
              Telefon: {site.phoneAlt}
              <br />
              E-Mail: {site.email}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-extrabold text-[var(--paper)]">
              Reglementierter Beauftragter
            </h2>
            <p className="mt-3 font-mono">{site.approval}</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-extrabold text-[var(--paper)]">Haftungshinweis</h2>
            <p className="mt-3">
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte
              externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
              verantwortlich.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
