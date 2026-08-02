import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <section className="band-light min-h-[calc(100svh-var(--header-h))]">
      <div className="wrap max-w-2xl py-16 md:py-24">
        <h1 className="font-display text-4xl font-semibold">Impressum</h1>
        <div className="mt-10 space-y-8 text-sm leading-relaxed text-[var(--steel-on-light)]">
          <div>
            <h2 className="mb-2 font-medium text-[var(--charcoal)]">Angaben gemäß § 5 TMG</h2>
            <p>
              {site.legalName}
              <br />
              {site.address.line1}
              <br />
              {site.address.city}
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-medium text-[var(--charcoal)]">Kontakt</h2>
            <p>
              {site.phone}
              <br />
              {site.phoneAlt}
              <br />
              {site.email}
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-medium text-[var(--charcoal)]">Reglementierter Beauftragter</h2>
            <p>{site.approval}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
