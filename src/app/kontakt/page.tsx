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
    <section className="wrap grid gap-16 py-20 md:py-28 lg:grid-cols-2 lg:gap-24">
      <div>
        <h1 className="font-display text-4xl font-black leading-none md:text-6xl">Kontakt</h1>
        <p className="mt-6 max-w-sm text-base leading-relaxed text-[var(--steel)]">
          Fragen zu Verpackung, Stauung oder Schulung — wir melden uns zeitnah.
        </p>

        <div className="mt-12 space-y-4 text-sm text-[var(--steel)]">
          <p>
            {site.address.line1}
            <br />
            {site.address.city}
          </p>
          <p>
            <a href={site.phoneHref} className="text-[var(--paper)] hover:text-[var(--green)]">
              {site.phone}
            </a>
          </p>
          <p>
            <a href={site.emailHref} className="hover:text-[var(--paper)]">
              {site.email}
            </a>
          </p>
        </div>
      </div>

      <ContactForm />
    </section>
  );
}
