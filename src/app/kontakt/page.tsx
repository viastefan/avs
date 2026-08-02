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
    <section className="wrap grid gap-16 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
      <div>
        <p className="meta">Kontakt</p>
        <h1 className="font-display mt-3 text-4xl font-black leading-none md:text-6xl">
          Schreiben Sie uns
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--steel)]">
          Fragen zu Verpackung, Stauung oder Schulung — wir melden uns zeitnah.
        </p>

        <dl className="mt-12 space-y-6 text-sm">
          <div>
            <dt className="meta mb-2">Adresse</dt>
            <dd className="text-[var(--steel)]">
              {site.legalName}
              <br />
              {site.address.line1}
              <br />
              {site.address.city}
            </dd>
          </div>
          <div>
            <dt className="meta mb-2">Telefon</dt>
            <dd>
              <a href={site.phoneHref} className="hover:text-[var(--green)]">
                {site.phone}
              </a>
              <br />
              <a href="tel:+498997594592" className="hover:text-[var(--green)]">
                {site.phoneAlt}
              </a>
            </dd>
          </div>
          <div>
            <dt className="meta mb-2">E-Mail</dt>
            <dd>
              <a href={site.emailHref} className="hover:text-[var(--green)]">
                {site.email}
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <ContactForm />
      </div>
    </section>
  );
}
