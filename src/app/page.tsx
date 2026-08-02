import Image from "next/image";
import Link from "next/link";
import { Globe } from "@/components/Globe";
import { services } from "@/lib/content";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const featured = services.slice(0, 5);

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="home-hero__media">
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            priority
            className="home-hero__img"
            sizes="100vw"
          />
        </div>
        <div className="home-hero__shade" aria-hidden />

        <div className="home-hero__content wrap">
          <p className="eyebrow rise text-white/70">Flughafen München · Südallee</p>
          <h1 className="font-display home-hero__brand rise rise-1 mt-4 text-white">{site.name}</h1>
          <p className="home-hero__lead rise rise-2">
            Verpackung, Containerstauung und Gefahrgutschulung am Frachtzentrum Modul&nbsp;H.
          </p>
          <div className="rise rise-3 mt-8 flex flex-wrap items-center gap-3">
            <Link href="/kontakt" className="btn btn-primary">
              Anfrage senden
            </Link>
            <Link href="/leistungen" className="btn btn-ghost">
              Leistungen ansehen
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tight border-b border-[var(--line)]">
        <div className="wrap flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[var(--fog)] md:text-base">
            <span className="font-semibold text-[var(--ink)]">{site.legalName}</span>
            <span className="mx-2 text-[var(--line)]">·</span>
            {site.address.line2}, {site.address.city}
          </p>
          <p className="text-sm text-[var(--mist)]">
            Reglementierter Beauftragter{" "}
            <span className="font-semibold text-[var(--ink)]">{site.approval}</span>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="eyebrow">Am Flughafen</p>
            <h2 className="font-display mt-4 text-[length:var(--h2)] font-semibold">
              Präzise Verpackung für globale Sendungen
            </h2>
            <p className="mt-5 max-w-xl text-[length:var(--lead)] leading-relaxed text-[var(--fog)]">
              Wir begleiten Transportgüter für Luft, See und Straße — IATA-, ADR- und IMDG-konform,
              mit klarer Dokumentation und Beratung vor Ort.
            </p>
          </div>
          <div className="media media--wide">
            <Image
              src={images.warehouse.src}
              alt={images.warehouse.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
        </div>
      </section>

      <section id="leistungen" className="section pt-0">
        <div className="wrap">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Leistungen</p>
              <h2 className="font-display mt-3 text-[length:var(--h2)] font-semibold">
                Was wir für Sie übernehmen
              </h2>
            </div>
            <Link href="/leistungen" className="text-sm font-semibold text-[var(--green)] hover:underline">
              Alle Services
            </Link>
          </div>

          <div className="border-t border-[var(--line)]">
            {featured.map((service, index) => (
              <Link key={service.slug} href={`/leistungen/${service.slug}`} className="service-link">
                <span className="service-link__idx">{String(index + 1).padStart(2, "0")}</span>
                <span className="service-link__title">{service.title}</span>
                <span className="text-sm leading-relaxed text-[var(--fog)] md:text-[0.95rem]">
                  {service.summary}
                </span>
                <span className="service-link__arrow hidden md:inline" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bleed-split border-y border-[var(--line)]">
        <div className="bleed-split__media">
          <Image
            src={images.containerYard.src}
            alt={images.containerYard.alt}
            fill
            className="object-cover"
            sizes="(max-width: 960px) 100vw, 55vw"
          />
        </div>
        <div className="bleed-split__copy">
          <p className="eyebrow">Containerstauung</p>
          <h2 className="font-display mt-3 text-[length:var(--h2)] font-semibold">
            Effizient gestaut. Sicher geladen.
          </h2>
          <p className="mt-4 max-w-md text-[var(--fog)]">
            Optimale Raumnutzung, Ladungssicherung und Palettisierung — für Land-, See- und
            Luftfracht.
          </p>
          <Link href="/containerstauung" className="btn btn-ink mt-8 self-start">
            Mehr zur Containerstauung
          </Link>
        </div>
      </section>

      <section className="bleed-split bleed-split--flip border-b border-[var(--line)]">
        <div className="bleed-split__media">
          <Image
            src={images.training.src}
            alt={images.training.alt}
            fill
            className="object-cover"
            sizes="(max-width: 960px) 100vw, 55vw"
          />
        </div>
        <div className="bleed-split__copy">
          <p className="eyebrow">Gefahrgutschulung</p>
          <h2 className="font-display mt-3 text-[length:var(--h2)] font-semibold">
            Wissen, das Sendungen absichert
          </h2>
          <p className="mt-4 max-w-md text-[var(--fog)]">
            Praxisnahe Schulungen zu IATA, ADR und IMDG — Verpacken, Kennzeichnen und
            Dokumentieren nach Versenderpflichten.
          </p>
          <Link href="/gefahrgutschulung" className="btn btn-primary mt-8 self-start">
            Mehr zur Schulung
          </Link>
        </div>
      </section>

      <section className="section overflow-visible">
        <div className="wrap grid items-center gap-12 overflow-visible lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div>
            <p className="eyebrow">Netzwerk</p>
            <h2 className="font-display mt-3 text-[length:var(--h2)] font-semibold">
              Von München in die Welt
            </h2>
            <p className="mt-4 max-w-md text-[var(--fog)]">
              Über den Hub München begleiten wir Sendungen in internationale Frachtnetzwerke —
              verpackt, gestaut und dokumentiert.
            </p>
          </div>
          <Globe />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <div className="panel flex flex-col items-start justify-between gap-8 px-7 py-10 md:flex-row md:items-center md:px-12 md:py-12">
            <div>
              <h2 className="font-display text-[length:var(--h2)] font-semibold">
                Sprechen Sie mit uns
              </h2>
              <p className="mt-3 max-w-lg text-[var(--fog)]">
                Anfrage zu Ihrer Sendung — wir melden uns zeitnah. {site.address.line2}, Modul&nbsp;H.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/kontakt" className="btn btn-primary">
                Kontakt
              </Link>
              <a href={site.phoneHref} className="btn btn-line">
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
