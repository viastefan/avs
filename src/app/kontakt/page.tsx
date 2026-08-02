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
    <section className="border-b border-[var(--ink)]">
      <div className="wrap grid gap-0 lg:grid-cols-12">
        <div className="border-b border-[var(--ink)] py-12 lg:col-span-5 lg:border-b-0 lg:border-r lg:pr-10 lg:py-16">
          <p className="meta text-[var(--steel)]">Kanal / Direkt</p>
          <h1 className="font-display mt-3 text-5xl font-black leading-none md:text-6xl">Kontakt</h1>
          <p className="mt-6 text-sm leading-relaxed text-[var(--steel)]">
            Fragen zu Verpackung, Containerstauung oder Gefahrgutschulung — anrufen oder Formular
            nutzen.
          </p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="meta text-[var(--steel)]">Adresse</dt>
              <dd className="mt-2 text-sm">
                <p className="font-semibold">{site.legalName}</p>
                <p>{site.address.line1}</p>
                <p>{site.address.line2}</p>
                <p>
                  {site.address.city}, {site.address.region}
                </p>
              </dd>
            </div>
            <div>
              <dt className="meta text-[var(--steel)]">Telefon</dt>
              <dd className="mt-2 space-y-1 text-sm font-semibold">
                <p>
                  <a href={site.phoneHref} className="hover:bg-[var(--signal)]">
                    {site.phone}
                  </a>
                </p>
                <p>
                  <a href="tel:+498997594592" className="hover:bg-[var(--signal)]">
                    {site.phoneAlt}
                  </a>
                </p>
              </dd>
            </div>
            <div>
              <dt className="meta text-[var(--steel)]">E-Mail</dt>
              <dd className="mt-2 text-sm font-semibold">
                <a href={site.emailHref} className="hover:bg-[var(--signal)]">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="meta text-[var(--steel)]">Zulassung</dt>
              <dd className="mt-2 font-mono text-sm">{site.approval}</dd>
            </div>
          </dl>
        </div>

        <div className="py-12 lg:col-span-7 lg:pl-10 lg:py-16">
          <div className="border border-[var(--ink)] bg-[var(--paper-2)] p-6 md:p-8">
            <p className="meta text-[var(--steel)]">Form / 01</p>
            <h2 className="font-display mt-2 text-3xl font-black">Anfrage senden</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
