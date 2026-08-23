import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung der Airport-Verpackungs-Service GmbH.",
};

const label = {
  margin: 0,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "var(--muted-soft)",
};

const text = {
  margin: "10px 0 0",
  fontSize: 15,
  color: "var(--muted)",
  lineHeight: 1.75,
};

function Divider() {
  return <div style={{ height: 1, background: "var(--line)" }} />;
}

export default function ImpressumPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Impressum"
        description="Angaben und Pflichtinformationen gemäß § 5 TMG sowie § 18 Abs. 2 MStV."
      />

      <Breadcrumbs trail={[{ label: "Impressum" }]} />
      <section className="section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div style={{ display: "grid", gap: 32 }}>
          <div>
            <p style={label}>Anbieter</p>
            <p style={{ ...text, color: "var(--ink)" }}>
              {site.legalName}<br />
              {site.address.line1}<br />
              {site.address.line2}<br />
              {site.address.city}<br />
              {site.address.region}
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Kontakt</p>
            <p style={text}>
              Telefon: {site.phone}<br />
              Telefon: {site.phoneAlt}<br />
              E-Mail: <a href={site.emailHref} style={{ color: "var(--accent)" }}>{site.email}</a>
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Vertretungsberechtigt</p>
            <p style={text}>
              Vertreten durch die Geschäftsführung der {site.legalName}.
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Reglementierter Beauftragter</p>
            <p style={text}>
              Zulassungsnummer <strong style={{ color: "var(--ink)" }}>{site.approval}</strong>
              <br />
              Zugelassen nach den Vorgaben der Verordnung (EG) Nr. 300/2008 zur Sicherheit in der
              Zivilluftfahrt.
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Berufsbezeichnung & Aufsicht</p>
            <p style={text}>
              Verpackungsdienstleistungen und Gefahrgutschulung. Zuständige Aufsichtsbehörde für die
              Zulassung als reglementierter Beauftragter ist das Luftfahrt-Bundesamt (LBA),
              Braunschweig.
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Streitschlichtung</p>
            <p style={text}>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent)" }}
              >
                ec.europa.eu/consumers/odr
              </a>
              . Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Haftung für Inhalte</p>
            <p style={text}>
              Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen
              Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung
              der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Haftung für Links</p>
            <p style={text}>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entfernen wir
              derartige Links umgehend.
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Urheberrecht</p>
            <p style={text}>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche
              gekennzeichnet. Vervielfältigung, Bearbeitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung.
            </p>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}