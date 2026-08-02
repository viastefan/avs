import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
};

export default function DatenschutzPage() {
  return (
    <section className="band-light min-h-[calc(100svh-var(--header-h))]">
      <div className="wrap max-w-2xl py-16 md:py-24">
        <h1 className="font-display text-4xl font-black">Datenschutz</h1>
        <div className="mt-10 space-y-8 text-sm leading-relaxed text-[var(--steel-on-light)]">
          <div>
            <h2 className="mb-2 font-medium text-[var(--charcoal)]">Verantwortlicher</h2>
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
            <h2 className="mb-2 font-medium text-[var(--charcoal)]">Hosting</h2>
            <p>
              Beim Besuch werden technisch notwendige Server-Logfiles durch den Hosting-Anbieter
              (Vercel) verarbeitet.
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-medium text-[var(--charcoal)]">Kontaktformular</h2>
            <p>
              Anfragedaten verarbeiten wir zur Bearbeitung Ihrer Nachricht (Art.&nbsp;6 Abs.&nbsp;1
              lit.&nbsp;b bzw. lit.&nbsp;f DSGVO).
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-medium text-[var(--charcoal)]">Ihre Rechte</h2>
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
