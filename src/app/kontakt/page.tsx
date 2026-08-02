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
    <section className="section">
      <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">Kontakt</p>
          <h1 className="font-display mt-3 text-[length:var(--t-display)] font-semibold">
            Nachricht an AVS
          </h1>
          <p className="mt-4 max-w-md text-[var(--muted)]">
            Anfragen zu Verpackung, Containerstauung oder Gefahrgutschulung.
          </p>
          <div className="mt-8 space-y-3 text-sm text-[var(--muted)]">
            <p className="font-medium text-[var(--ink)]">{site.legalName}</p>
            <p>
              {site.address.line2}
              <br />
              {site.address.line1}
              <br />
              {site.address.city}
            </p>
            <p>
              <a href={site.phoneHref} className="font-semibold text-[var(--green)]">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={site.emailHref} className="hover:text-[var(--ink)]">
                {site.email}
              </a>
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
