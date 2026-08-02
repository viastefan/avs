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
    <section className="band-light min-h-[calc(100svh-var(--header-h))]">
      <div className="wrap grid gap-16 py-16 md:py-24 lg:grid-cols-2 lg:gap-24">
        <div>
          <h1 className="font-display text-4xl font-semibold leading-none md:text-5xl">Kontakt</h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-[var(--steel-on-light)]">
            Anfragen zu Verpackung, Containerstauung oder Gefahrgutschulung.
          </p>

          <div className="mt-12 space-y-4 text-sm text-[var(--steel-on-light)]">
            <p>
              {site.legalName}
              <br />
              {site.address.line2}
              <br />
              {site.address.line1}
              <br />
              {site.address.city}
            </p>
            <p>
              <a href={site.phoneHref} className="font-medium text-[var(--charcoal)] hover:text-[var(--green)]">
                {site.phone}
              </a>
              <br />
              <a href="tel:+498997594592" className="hover:text-[var(--charcoal)]">
                {site.phoneAlt}
              </a>
            </p>
            <p>
              <a href={site.emailHref} className="hover:text-[var(--charcoal)]">
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
