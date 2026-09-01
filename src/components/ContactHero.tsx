import Image from "next/image";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

/** The contact page opens louder than the other subpages: this is where a
 *  visitor has already decided to get in touch, so the fastest routes sit
 *  above the fold and the form is one scroll away. */
export function ContactHero() {
  return (
    <section className="c-hero">
      <div className="c-hero__bg">
        <Image
          src={images.warehouse.src}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 48%" }}
        />
      </div>
      <div className="c-hero__scrim" aria-hidden />
      <div className="c-hero__glow" aria-hidden />
      <div className="c-hero__dots" aria-hidden />

      <div className="wrap c-hero__inner">
        <span className="badge c-hero__badge">
          <span className="badge__dot" aria-hidden />
          Antwort werktags · Modul H, Südallee
        </span>

        <h1 className="c-hero__title">
          Reden wir über
          <br />
          <em>Ihre Sendung.</em>
        </h1>

        <p className="c-hero__sub">
          Ein Anruf klärt in fünf Minuten, was schriftlich drei Nachrichten braucht — Maße,
          Gefahrgutklasse, Abflugtag. Oder schicken Sie uns die Eckdaten, wir melden uns.
        </p>

        <div className="c-hero__actions">
          <a href={site.phoneHref} className="c-action c-action--primary">
            <span className="c-action__icon" aria-hidden>
              <svg viewBox="0 0 24 24">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.1 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.8 2z" />
              </svg>
            </span>
            <span className="c-action__body">
              <span className="c-action__label">Direkt anrufen</span>
              <span className="c-action__value">{site.phone}</span>
            </span>
          </a>

          <a href={site.emailHref} className="c-action">
            <span className="c-action__icon" aria-hidden>
              <svg viewBox="0 0 24 24">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                <path d="m21 7.5-9 5.5-9-5.5" />
              </svg>
            </span>
            <span className="c-action__body">
              <span className="c-action__label">E-Mail schreiben</span>
              <span className="c-action__value">{site.email}</span>
            </span>
          </a>
        </div>

        <dl className="c-hero__facts">
          <div>
            <dt>Erreichbar</dt>
            <dd>Mo–Fr, 08:00–17:00</dd>
          </div>
          <div>
            <dt>Standort</dt>
            <dd>Frachtzentrum, Modul H</dd>
          </div>
          <div>
            <dt>Zulassung</dt>
            <dd>{site.approval}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
