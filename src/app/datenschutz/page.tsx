import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
};

export default function DatenschutzPage() {
  return (
    <section className="section">
      <div className="wrap max-w-2xl">
        <h1 className="font-display text-[length:var(--t-display)] font-semibold">Datenschutz</h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-[var(--muted)]">
          <div>
            <h2 className="mb-2 font-semibold text-[var(--ink)]">Verantwortlicher</h2>
            <p>
              {site.legalName}
              <br />
              {site.address.line1}
              <br />
              {site.address.city}
              <br />
              {site.email}
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-[var(--ink)]">Hosting</h2>
            <p>
              Beim Besuch werden technisch notwendige Server-Logfiles durch den Hosting-Anbieter
              (Vercel) verarbeitet.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-[var(--ink)]">Kontaktformular</h2>
            <p>
              Anfragedaten verarbeiten wir zur Bearbeitung Ihrer Nachricht (Art.&nbsp;6 Abs.&nbsp;1
              lit.&nbsp;b bzw. lit.&nbsp;f DSGVO).
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-[var(--ink)]">Ihre Rechte</h2>
            <p>
              Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch, Datenübertragbarkeit
              sowie Beschwerde bei einer Aufsichtsbehörde.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
