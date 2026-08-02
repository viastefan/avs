import Image from "next/image";
import Link from "next/link";
import { Globe } from "@/components/Globe";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero: split industrial — brand panel + evidence photo */}
      <section className="relative -mt-[var(--header-h)] min-h-[100svh] border-b border-[var(--ink)]">
        <div className="grid min-h-[100svh] lg:grid-cols-12">
          <div className="relative z-[1] flex flex-col justify-between border-b border-[var(--ink)] bg-[var(--ink)] px-[var(--gutter)] py-8 text-[var(--paper)] lg:col-span-5 lg:border-b-0 lg:border-r lg:py-10">
            <div className="pt-14 lg:pt-16">
              <p className="meta clip-in text-[var(--signal)]">
                {site.legalName} · Flughafen München
              </p>
              <p className="font-display clip-in clip-in-1 mt-5 text-[clamp(5.5rem,14vw,9.5rem)] font-black leading-[0.82] tracking-[-0.04em] text-[var(--paper)]">
                {site.name}
              </p>
              <div className="clip-in clip-in-2 mt-6 h-3 w-full max-w-[12rem] bg-[var(--signal)]" />
              <h1 className="clip-in clip-in-3 mt-8 max-w-md font-display text-[clamp(1.4rem,2.6vw,2rem)] font-bold leading-[1.05] text-[var(--paper)]">
                Verpackung. Gefahrgut. Export.
                <span className="mt-2 block text-[var(--signal)]">Standort MUC.</span>
              </h1>
              <p className="clip-in clip-in-4 mt-5 max-w-sm text-sm leading-relaxed text-white/65">
                Präzise Verpackung für Luft, See und Straße — Vorschriftenkonform, dokumentiert,
                operativ am Frachtzentrum.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <div className="flex flex-wrap gap-0">
                <Link href="/kontakt" className="btn-accent">
                  Anfrage
                </Link>
                <Link href="/leistungen" className="btn-ghost-light -ml-px">
                  Leistungen
                </Link>
                <a href={site.phoneHref} className="btn-ghost-light -ml-px">
                  {site.phone}
                </a>
              </div>
              <dl className="grid grid-cols-2 gap-px border border-white/20 bg-white/20 text-[0.7rem] uppercase tracking-[0.06em]">
                <div className="bg-[var(--ink)] p-3">
                  <dt className="text-white/40">Zulassung</dt>
                  <dd className="mt-1 text-[var(--signal)]">{site.approval}</dd>
                </div>
                <div className="bg-[var(--ink)] p-3">
                  <dt className="text-white/40">Sektor</dt>
                  <dd className="mt-1">Verpackung / Fracht</dd>
                </div>
                <div className="bg-[var(--ink)] p-3">
                  <dt className="text-white/40">Adresse</dt>
                  <dd className="mt-1">Modul H · Südallee</dd>
                </div>
                <div className="bg-[var(--ink)] p-3">
                  <dt className="text-white/40">Ort</dt>
                  <dd className="mt-1">85356 MUC</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="relative min-h-[42vh] lg:col-span-7 lg:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2400&auto=format&fit=crop"
              alt="Frachtlager mit Paletten und Transportgut"
              fill
              priority
              className="hero-media object-cover grayscale contrast-125"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div className="absolute inset-0 bg-[var(--ink)]/25 mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--ink)] bg-[var(--signal)] px-4 py-3">
              <p className="meta flex flex-wrap justify-between gap-2 text-[var(--ink)]">
                <span>Evidence · Air cargo ops</span>
                <span>MUC / FRA / World</span>
              </p>
            </div>
            <div className="pointer-events-none absolute left-4 top-4 border border-[var(--signal)] px-2 py-1">
              <span className="meta text-[var(--signal)]">Fig. 01</span>
            </div>
          </div>
        </div>
      </section>

      {/* Spec intro */}
      <section className="border-b border-[var(--ink)]">
        <div className="wrap grid gap-0 md:grid-cols-12">
          <div className="border-b border-[var(--ink)] py-12 md:col-span-4 md:border-b-0 md:border-r md:pr-8">
            <p className="index">Abschnitt / 01</p>
            <h2 className="font-display mt-3 text-3xl font-black leading-none md:text-4xl">
              Operativ.
              <br />
              Regelkonform.
            </h2>
          </div>
          <div className="py-12 md:col-span-8 md:pl-10">
            <p className="max-w-2xl text-lg leading-relaxed text-[var(--steel)]">
              Am Flughafen München werden täglich tonnenweise Waren abgefertigt. AVS verpackt große und
              kleine Transportgüter — mit Erfahrung, Vorschriftenkenntnis und klarer Dokumentation für
              IATA, ADR und IMDG.
            </p>
          </div>
        </div>
      </section>

      {/* Services index */}
      <section id="leistungen" className="border-b border-[var(--ink)]">
        <div className="wrap py-10">
          <div className="flex flex-col justify-between gap-4 border-b border-[var(--ink)] pb-6 md:flex-row md:items-end">
            <div>
              <p className="index">Abschnitt / 02</p>
              <h2 className="font-display mt-2 text-4xl font-black md:text-5xl">Leistungen</h2>
            </div>
            <Link href="/leistungen" className="btn-primary">
              Gesamtkatalog
            </Link>
          </div>

          <ul>
            {services.map((service, i) => (
              <li key={service.slug} className="border-b border-[var(--ink)] last:border-b-0">
                <Link
                  href={`/leistungen/${service.slug}`}
                  className="group grid gap-3 py-6 transition-colors hover:bg-[var(--signal)] md:grid-cols-[5rem_14rem_1fr_auto] md:items-baseline md:gap-6"
                >
                  <span className="meta text-[var(--steel)] group-hover:text-[var(--ink)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl font-extrabold leading-none md:text-3xl">
                    {service.title}
                  </span>
                  <span className="max-w-xl text-sm leading-relaxed text-[var(--steel)] group-hover:text-[var(--ink)]">
                    {service.summary}
                  </span>
                  <span className="meta self-center text-[var(--ink)]">Öffnen →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Hub / globe */}
      <section className="border-b border-[var(--ink)]">
        <div className="wrap grid gap-0 lg:grid-cols-12">
          <div className="border-b border-[var(--ink)] py-12 lg:col-span-5 lg:border-b-0 lg:border-r lg:pr-10">
            <p className="index">Abschnitt / 03</p>
            <h2 className="font-display mt-3 text-4xl font-black leading-none md:text-5xl">
              Hub München
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--steel)]">
              Von MUC aus in die globalen Frachtnetzwerke — mit korrekter Dokumentation und
              verlässlicher Verpackung.
            </p>
            <div className="mt-8 flex flex-wrap">
              <Link href="/containerstauung" className="btn-primary">
                Containerstauung
              </Link>
              <Link href="/gefahrgutschulung" className="btn-ghost -ml-px">
                Gefahrgutschulung
              </Link>
            </div>
          </div>
          <div className="py-8 lg:col-span-7 lg:pl-6">
            <div className="border border-[var(--ink)] bg-[var(--paper-2)] p-2">
              <p className="meta mb-2 flex justify-between px-1 text-[var(--steel)]">
                <span>Fig. 02 · Network</span>
                <span>Drag to rotate</span>
              </p>
              <Globe className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed evidence */}
      <section className="relative min-h-[56vh] border-b border-[var(--ink)]">
        <Image
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2200&auto=format&fit=crop"
          alt="Containerschiff und Hafenkräne"
          fill
          className="object-cover grayscale contrast-110"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[var(--ink)]/55" />
        <div className="relative z-[1] wrap flex min-h-[56vh] flex-col justify-end py-12">
          <p className="meta text-[var(--signal)]">Fig. 03 · Land / Sea / Air</p>
          <h2 className="font-display mt-3 max-w-3xl text-4xl font-black text-[var(--paper)] md:text-6xl">
            Gestaut. Gesichert. Dokumentiert.
          </h2>
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-b border-[var(--ink)] bg-[var(--signal)]">
        <div className="wrap grid gap-0 md:grid-cols-12">
          <div className="border-b border-[var(--ink)] py-10 md:col-span-7 md:border-b-0 md:border-r md:pr-8">
            <p className="index text-[var(--ink)]">Kontakt</p>
            <h2 className="font-display mt-2 text-4xl font-black md:text-5xl">Direkt anfragen.</h2>
            <p className="mt-4 max-w-lg text-sm text-[var(--ink)]/75">
              Verpackung, Containerstauung oder Gefahrgutschulung — wir antworten operativ und klar.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-0 py-10 md:col-span-5 md:pl-8">
            <Link href="/kontakt" className="btn-primary w-full">
              Formular öffnen
            </Link>
            <a href={site.phoneHref} className="btn-ghost -mt-px w-full bg-[var(--paper)]">
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
