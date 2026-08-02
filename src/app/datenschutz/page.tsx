import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Datenschutzerklärung</h1>
      <div className="mt-10 space-y-8 text-base leading-relaxed text-[var(--ink-soft)]">
        <div>
          <h2 className="font-display text-xl font-semibold text-[var(--ink)]">1. Verantwortlicher</h2>
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
          <h2 className="font-display text-xl font-semibold text-[var(--ink)]">
            2. Erhebung und Speicherung personenbezogener Daten
          </h2>
          <p className="mt-3">
            Beim Besuch dieser Website werden durch den Hosting-Anbieter (Vercel) technisch notwendige
            Server-Logfiles verarbeitet (z.&nbsp;B. IP-Adresse, Zeitpunkt, angefragte Ressource). Die
            Verarbeitung erfolgt zur Bereitstellung und Sicherheit der Website.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-[var(--ink)]">3. Kontaktformular</h2>
          <p className="mt-3">
            Wenn Sie uns über das Kontaktformular schreiben, speichern und verarbeiten wir die von Ihnen
            angegebenen Daten (Name, E-Mail, Unternehmen, Betreff, Nachricht), um Ihre Anfrage zu
            bearbeiten. Rechtsgrundlage ist Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b bzw. lit.&nbsp;f DSGVO.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-[var(--ink)]">4. Ihre Rechte</h2>
          <p className="mt-3">
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Widerspruch sowie Datenübertragbarkeit. Zudem besteht ein Beschwerderecht bei einer
            Datenschutzaufsichtsbehörde.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-[var(--ink)]">5. Externe Inhalte</h2>
          <p className="mt-3">
            Auf einzelnen Seiten können externe Kartendaten (world-atlas über CDN) für die interaktive
            Globus-Darstellung geladen werden. Dabei kann Ihr Browser eine Verbindung zu den jeweiligen
            Anbietern aufbauen.
          </p>
        </div>
      </div>
    </section>
  );
}
