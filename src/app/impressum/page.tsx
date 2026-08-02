import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Impressum</h1>
      <div className="mt-10 space-y-8 text-base leading-relaxed text-[var(--ink-soft)]">
        <div>
          <h2 className="font-display text-xl font-semibold text-[var(--ink)]">Angaben gemäß § 5 TMG</h2>
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
          <h2 className="font-display text-xl font-semibold text-[var(--ink)]">Kontakt</h2>
          <p className="mt-3">
            Telefon: {site.phone}
            <br />
            Telefon: {site.phoneAlt}
            <br />
            E-Mail: {site.email}
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-[var(--ink)]">
            Reglementierter Beauftragter
          </h2>
          <p className="mt-3">Zulassungsnummer: {site.approval}</p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-[var(--ink)]">
            Verantwortlich für den Inhalt
          </h2>
          <p className="mt-3">
            {site.legalName}
            <br />
            {site.address.city}
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-[var(--ink)]">Haftungshinweis</h2>
          <p className="mt-3">
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte
            externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
            verantwortlich.
          </p>
        </div>
      </div>
    </section>
  );
}
