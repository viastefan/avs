import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie die Airport-Verpackungs-Service GmbH am Flughafen München — Telefon, E-Mail oder Formular.",
};

export default function KontaktPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Kontakt</p>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Erreichen Sie unser Team am Flughafen München
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[var(--steel)]">
          Fragen zu Verpackung, Containerstauung oder Gefahrgutschulung? Rufen Sie an oder nutzen Sie das
          Formular — wir melden uns zeitnah.
        </p>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.2fr]">
        <aside className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
              Adresse
            </p>
            <address className="mt-3 space-y-1 text-base not-italic text-[var(--ink-soft)]">
              <p className="font-semibold text-[var(--ink)]">{site.legalName}</p>
              <p>{site.address.line1}</p>
              <p>{site.address.line2}</p>
              <p>
                {site.address.city}, {site.address.region}
              </p>
            </address>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
              Telefon
            </p>
            <p className="mt-3">
              <a href={site.phoneHref} className="text-lg font-semibold text-[var(--ink)] hover:text-[var(--accent)]">
                {site.phone}
              </a>
            </p>
            <p>
              <a
                href="tel:+498997594592"
                className="text-lg font-semibold text-[var(--ink)] hover:text-[var(--accent)]"
              >
                {site.phoneAlt}
              </a>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
              E-Mail
            </p>
            <p className="mt-3">
              <a href={site.emailHref} className="font-semibold text-[var(--ink)] hover:text-[var(--accent)]">
                {site.email}
              </a>
            </p>
          </div>
          <p className="text-sm text-[var(--steel)]">
            Zulassungsnummer Reglementierter Beauftragter:{" "}
            <span className="font-medium text-[var(--ink)]">{site.approval}</span>
          </p>
        </aside>

        <div className="border border-[var(--line)] bg-white/55 p-6 md:p-8">
          <h2 className="font-display text-2xl font-semibold">Nehmen Sie mit uns Kontakt auf</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
