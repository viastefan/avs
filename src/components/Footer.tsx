import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--surface)" }}>
      <div className="wrap" style={{ display: "grid", gap: 40, padding: "56px 0", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em" }}>{site.name}</p>
          <p className="muted" style={{ margin: "12px 0 0", fontSize: 14, maxWidth: 280 }}>
            {site.legalName}
            <br />
            {site.address.line2}, {site.address.city}
          </p>
        </div>
        <div>
          <p className="kicker" style={{ marginBottom: 14 }}>Leistungen</p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            <li><Link href="/leistungen" className="muted" style={{ fontSize: 14 }}>Verpackungsservice</Link></li>
            <li><Link href="/containerstauung" className="muted" style={{ fontSize: 14 }}>Containerstauung</Link></li>
            <li><Link href="/gefahrgutschulung" className="muted" style={{ fontSize: 14 }}>Gefahrgutschulung</Link></li>
          </ul>
        </div>
        <div>
          <p className="kicker" style={{ marginBottom: 14 }}>Kontakt</p>
          <p style={{ margin: 0 }}>
            <a href={site.phoneHref} style={{ fontSize: 14, fontWeight: 600, color: "var(--green)" }}>{site.phone}</a>
          </p>
          <p style={{ margin: "8px 0 0" }}>
            <a href={site.emailHref} className="muted" style={{ fontSize: 14 }}>{site.email}</a>
          </p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--line)" }}>
        <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", padding: "18px 0", fontSize: 12, color: "var(--muted)" }}>
          <p style={{ margin: 0 }}>© {new Date().getFullYear()} {site.legalName}</p>
          <nav style={{ display: "flex", gap: 18 }}>
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
