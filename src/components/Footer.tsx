import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__grid">
        <div>
          <p className="site-footer__brand">{site.name}</p>
          <p style={{ margin: "14px 0 0", fontSize: 14, maxWidth: 280, lineHeight: 1.55 }}>
            {site.legalName}
            <br />
            {site.address.line2}
            <br />
            {site.address.city}
          </p>
        </div>
        <div>
          <p className="kicker">Leistungen</p>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <li>
              <Link href="/leistungen" style={{ fontSize: 14 }}>
                Verpackungsservice
              </Link>
            </li>
            <li>
              <Link href="/containerstauung" style={{ fontSize: 14 }}>
                Containerstauung
              </Link>
            </li>
            <li>
              <Link href="/gefahrgutschulung" style={{ fontSize: 14 }}>
                Gefahrgutschulung
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="kicker">Kontakt</p>
          <p style={{ margin: 0 }}>
            <a
              href={site.phoneHref}
              style={{ fontSize: 15, fontWeight: 600, color: "var(--green-mist)" }}
            >
              {site.phone}
            </a>
          </p>
          <p style={{ margin: "10px 0 0" }}>
            <a href={site.emailHref} style={{ fontSize: 14 }}>
              {site.email}
            </a>
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
