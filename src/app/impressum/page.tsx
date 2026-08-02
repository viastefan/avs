import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <section className="section">
      <div className="wrap max-w-2xl">
        <h1 className="font-display text-[length:var(--h2)] font-semibold">Impressum</h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-[var(--fog)]">
          <div>
            <h2 className="mb-2 font-semibold text-[var(--ink)]">Angaben gemäß § 5 TMG</h2>
            <p>
              {site.legalName}
              <br />
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city}
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-[var(--ink)]">Kontakt</h2>
            <p>
              {site.phone}
              <br />
              {site.phoneAlt}
              <br />
              {site.email}
            </p>
          </div>
          <div>
            <h2 className="mb-2 font-semibold text-[var(--ink)]">Reglementierter Beauftragter</h2>
            <p>{site.approval}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
