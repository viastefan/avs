import Link from "next/link";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__grid">
        <div>
          <div className="site-footer__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/avs-logo.svg" alt="" width={30} height={30} />
            <span className="site-footer__brand-text">{site.name}</span>
          </div>
          <p style={{ margin: "16px 0 0", fontSize: 14, maxWidth: 300, lineHeight: 1.7 }}>
            {site.legalName}
            <br />
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.city}
          </p>
          <p style={{ margin: "16px 0 0", fontSize: 12, lineHeight: 1.6 }}>
            Reglementierter Beauftragter
            <br />
            <strong style={{ color: "rgba(255,255,255,0.75)" }}>{site.approval}</strong>
          </p>
        </div>

        <div>
          <p className="kicker">Leistungen</p>
          <ul className="site-footer__list">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/leistungen/${service.slug}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="kicker">Weitere Seiten</p>
          <ul className="site-footer__list">
            <li>
              <Link href="/leistungen">Verpackungsservice</Link>
            </li>
            <li>
              <Link href="/containerstauung">Containerstauung</Link>
            </li>
            <li>
              <Link href="/gefahrgutschulung">Gefahrgutschulung</Link>
            </li>
            <li>
              <Link href="/faq">Häufige Fragen</Link>
            </li>
            <li>
              <Link href="/kontakt">Kontakt</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="kicker">Kontakt</p>
          <p style={{ margin: 0 }}>
            <a href={site.phoneHref} style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>
              {site.phone}
            </a>
          </p>
          <p style={{ margin: "6px 0 0", fontSize: 13 }}>{site.phoneAlt}</p>
          <p style={{ margin: "12px 0 0" }}>
            <a href={site.emailHref} style={{ fontSize: 14 }}>
              {site.email}
            </a>
          </p>
          <p style={{ margin: "18px 0 0", fontSize: 13, lineHeight: 1.6 }}>
            Anfragen bearbeiten wir werktags — für dringende Fälle erreichen Sie uns am besten
            telefonisch.
          </p>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="wrap site-footer__bottom-inner">
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <nav className="site-footer__legal">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
