import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <section className="border-b border-[var(--ink)]">
      <div className="wrap max-w-3xl py-12 md:py-16">
        <p className="meta text-[var(--steel)]">Legal / 02</p>
        <h1 className="font-display mt-3 text-5xl font-black">Datenschutz</h1>
        <div className="mt-10 space-y-8 text-sm leading-relaxed text-[var(--steel)]">
          <div>
            <h2 className="font-display text-xl font-extrabold text-[var(--ink)]">1. Verantwortlicher</h2>
            <p className="mt-3">
              {site.legalName}
              <br />
              {site.address.line1}
              <br />
              {site.address.city}
              <br />
              E-Mail: {site.email}
              <br />
              Telefon: {site.phone}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-extrabold text-[var(--ink)]">
              2. Hosting & Logfiles
            </h2>
            <p className="mt-3">
              Beim Besuch dieser Website werden durch den Hosting-Anbieter (Vercel) technisch notwendige
              Server-Logfiles verarbeitet. Die Verarbeitung erfolgt zur Bereitstellung und Sicherheit der
              Website.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-extrabold text-[var(--ink)]">3. Kontaktformular</h2>
            <p className="mt-3">
              Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir die angegebenen Daten zur
              Bearbeitung Ihrer Anfrage. Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b bzw.
              lit.&nbsp;f DSGVO.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-extrabold text-[var(--ink)]">4. Ihre Rechte</h2>
            <p className="mt-3">
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
              Widerspruch sowie Datenübertragbarkeit und ein Beschwerderecht bei einer Aufsichtsbehörde.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-extrabold text-[var(--ink)]">5. Globus-Daten</h2>
            <p className="mt-3">
              Für die interaktive Globus-Darstellung werden lokale Kartendaten unter `/data/` geladen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
