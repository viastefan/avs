import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der Airport-Verpackungs-Service GmbH nach DSGVO.",
};

const label = {
  margin: 0,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "var(--accent)",
  opacity: 0.75,
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

export default function DatenschutzPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Datenschutz"
        description="Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. Nachfolgend informieren wir Sie über Art, Umfang und Zweck der Verarbeitung auf dieser Website."
      />
      <section className="section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div style={{ display: "grid", gap: 32 }}>
          <div>
            <p style={label}>Verantwortlicher</p>
            <p style={{ ...text, color: "var(--ink)" }}>
              {site.legalName}<br />
              {site.address.line1}<br />
              {site.address.line2}<br />
              {site.address.city}<br />
              <a href={site.emailHref} style={{ color: "var(--accent)" }}>{site.email}</a>
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Hosting & Server-Logfiles</p>
            <p style={text}>
              Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf werden automatisch technisch
              notwendige Daten in Server-Logfiles verarbeitet: IP-Adresse, Datum und Uhrzeit,
              aufgerufene Seite, Referrer-URL sowie Browser- und Betriebssystemangaben. Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem, störungsfreiem
              Betrieb). Eine Zusammenführung mit anderen Datenquellen erfolgt nicht.
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Kontaktformular & E-Mail</p>
            <p style={text}>
              Wenn Sie uns über das Formular oder per E-Mail kontaktieren, verarbeiten wir Ihre
              Angaben (Name, E-Mail-Adresse, Nachricht) zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen Maßnahmen bzw. Art. 6 Abs. 1 lit. f
              DSGVO bei sonstigen Anfragen. Die Daten werden gelöscht, sobald sie für den Zweck nicht
              mehr erforderlich sind und keine gesetzlichen Aufbewahrungsfristen entgegenstehen.
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Versand über Resend</p>
            <p style={text}>
              Für den Versand der Formularnachrichten setzen wir den E-Mail-Dienst Resend ein. Dabei
              werden die von Ihnen übermittelten Daten zum Zweck der Zustellung verarbeitet. Es
              bestehen entsprechende Vereinbarungen zur Auftragsverarbeitung.
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Kartendarstellung (Google Maps)</p>
            <p style={text}>
              Auf der Kontaktseite binden wir eine Karte von Google Maps ein, um Ihnen unseren
              Standort zu zeigen. Beim Laden der Karte kann Ihre IP-Adresse an Google übertragen
              werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
              einer auffindbaren Anfahrtsbeschreibung).
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Cookies & Tracking</p>
            <p style={text}>
              Diese Website verwendet keine Tracking- oder Marketing-Cookies und bindet keine
              Analyse-Dienste zur Profilbildung ein. Es werden ausschließlich technisch notwendige
              Daten verarbeitet. Ihre Auswahl für die helle oder dunkle Darstellung wird lokal in
              Ihrem Browser gespeichert und nicht an uns übertragen.
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Speicherdauer</p>
            <p style={text}>
              Wir verarbeiten personenbezogene Daten nur so lange, wie es für die genannten Zwecke
              erforderlich ist. Darüber hinaus speichern wir Daten, soweit handels- oder
              steuerrechtliche Aufbewahrungsfristen (in der Regel 6 bzw. 10 Jahre) bestehen.
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Ihre Rechte</p>
            <p style={text}>
              Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
              Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie
              Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Eine erteilte Einwilligung können
              Sie jederzeit mit Wirkung für die Zukunft widerrufen. Wenden Sie sich hierzu an{" "}
              <a href={site.emailHref} style={{ color: "var(--accent)" }}>{site.email}</a>.
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>Beschwerderecht</p>
            <p style={text}>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für
              unser Unternehmen zuständig ist das Bayerische Landesamt für Datenschutzaufsicht
              (BayLDA), Ansbach.
            </p>
          </div>

          <Divider />

          <div>
            <p style={label}>SSL-/TLS-Verschlüsselung</p>
            <p style={text}>
              Diese Website nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine
              verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers.
            </p>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
