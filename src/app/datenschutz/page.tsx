import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalDoc, type LegalBlock } from "@/components/LegalDoc";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der Airport-Verpackungs-Service GmbH nach DSGVO.",
};

const blocks: LegalBlock[] = [
  {
    label: "Verantwortlicher",
    body: (
      <p className="legal__text legal__text--ink">
        {site.legalName}<br />
        {site.address.line1}<br />
        {site.address.line2}<br />
        {site.address.city}<br />
        <a href={site.emailHref}>{site.email}</a>
      </p>
    ),
  },
  {
    label: "Hosting & Server-Logfiles",
    body: (
      <p className="legal__text">
        Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf werden automatisch technisch
        notwendige Daten in Server-Logfiles verarbeitet: IP-Adresse, Datum und Uhrzeit, aufgerufene
        Seite, Referrer-URL sowie Browser- und Betriebssystemangaben. Rechtsgrundlage ist Art. 6
        Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem, störungsfreiem Betrieb). Eine
        Zusammenführung mit anderen Datenquellen erfolgt nicht.
      </p>
    ),
  },
  {
    label: "Kontaktformular & E-Mail",
    body: (
      <p className="legal__text">
        Wenn Sie uns über das Formular oder per E-Mail kontaktieren, verarbeiten wir Ihre Angaben
        (Name, E-Mail-Adresse, Nachricht) zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6
        Abs. 1 lit. b DSGVO bei vorvertraglichen Maßnahmen bzw. Art. 6 Abs. 1 lit. f DSGVO bei
        sonstigen Anfragen. Die Daten werden gelöscht, sobald sie für den Zweck nicht mehr
        erforderlich sind und keine gesetzlichen Aufbewahrungsfristen entgegenstehen.
      </p>
    ),
  },
  {
    label: "Versand über Resend",
    body: (
      <p className="legal__text">
        Für den Versand der Formularnachrichten setzen wir den E-Mail-Dienst Resend ein. Dabei werden
        die von Ihnen übermittelten Daten zum Zweck der Zustellung verarbeitet. Es bestehen
        entsprechende Vereinbarungen zur Auftragsverarbeitung.
      </p>
    ),
  },
  {
    label: "Kartendarstellung (Google Maps)",
    body: (
      <p className="legal__text">
        Auf der Kontaktseite binden wir eine Karte von Google Maps ein, um Ihnen unseren Standort zu
        zeigen. Beim Laden der Karte kann Ihre IP-Adresse an Google übertragen werden.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer auffindbaren
        Anfahrtsbeschreibung).
      </p>
    ),
  },
  {
    label: "Cookies & Tracking",
    body: (
      <p className="legal__text">
        Diese Website verwendet keine Tracking- oder Marketing-Cookies und bindet keine
        Analyse-Dienste zur Profilbildung ein. Es werden ausschließlich technisch notwendige Daten
        verarbeitet. Ihre Auswahl für die helle oder dunkle Darstellung wird lokal in Ihrem Browser
        gespeichert und nicht an uns übertragen.
      </p>
    ),
  },
  {
    label: "Speicherdauer",
    body: (
      <p className="legal__text">
        Wir verarbeiten personenbezogene Daten nur so lange, wie es für die genannten Zwecke
        erforderlich ist. Darüber hinaus speichern wir Daten, soweit handels- oder steuerrechtliche
        Aufbewahrungsfristen (in der Regel 6 bzw. 10 Jahre) bestehen.
      </p>
    ),
  },
  {
    label: "Ihre Rechte",
    body: (
      <p className="legal__text">
        Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
        Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch
        gegen die Verarbeitung (Art. 21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit mit
        Wirkung für die Zukunft widerrufen. Wenden Sie sich hierzu an{" "}
        <a href={site.emailHref}>{site.email}</a>.
      </p>
    ),
  },
  {
    label: "Beschwerderecht",
    body: (
      <p className="legal__text">
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für unser
        Unternehmen zuständig ist das Bayerische Landesamt für Datenschutzaufsicht (BayLDA), Ansbach.
      </p>
    ),
  },
  {
    label: "SSL-/TLS-Verschlüsselung",
    body: (
      <p className="legal__text">
        Diese Website nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte
        Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers.
      </p>
    ),
  },
];

export default function DatenschutzPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Datenschutz"
        description="Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. Nachfolgend informieren wir Sie über Art, Umfang und Zweck der Verarbeitung auf dieser Website."
      />

      <Breadcrumbs trail={[{ label: "Datenschutz" }]} />
      <LegalDoc blocks={blocks} />
    </>
  );
}
