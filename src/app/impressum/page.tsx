import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalDoc, type LegalBlock } from "@/components/LegalDoc";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung der Airport-Verpackungs-Service GmbH.",
};

const blocks: LegalBlock[] = [
  {
    label: "Anbieter",
    body: (
      <p className="legal__text legal__text--ink">
        {site.legalName}<br />
        {site.address.line1}<br />
        {site.address.line2}<br />
        {site.address.city}<br />
        {site.address.region}
      </p>
    ),
  },
  {
    label: "Kontakt",
    body: (
      <p className="legal__text">
        Telefon: {site.phone}<br />
        Telefon: {site.phoneAlt}<br />
        E-Mail: <a href={site.emailHref}>{site.email}</a>
      </p>
    ),
  },
  {
    label: "Vertretungsberechtigt",
    body: (
      <p className="legal__text">
        Vertreten durch die Geschäftsführung der {site.legalName}.
      </p>
    ),
  },
  {
    label: "Reglementierter Beauftragter",
    body: (
      <p className="legal__text">
        Zulassungsnummer <strong>{site.approval}</strong>
        <br />
        Zugelassen nach den Vorgaben der Verordnung (EG) Nr. 300/2008 zur Sicherheit in der
        Zivilluftfahrt.
      </p>
    ),
  },
  {
    label: "Berufsbezeichnung & Aufsicht",
    body: (
      <p className="legal__text">
        Verpackungsdienstleistungen und Gefahrgutschulung. Zuständige Aufsichtsbehörde für die
        Zulassung als reglementierter Beauftragter ist das Luftfahrt-Bundesamt (LBA), Braunschweig.
      </p>
    ),
  },
  {
    label: "Streitschlichtung",
    body: (
      <p className="legal__text">
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>
        . Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    ),
  },
  {
    label: "Haftung für Inhalte",
    body: (
      <p className="legal__text">
        Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen
        Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte
        fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
        rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung
        von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
      </p>
    ),
  },
  {
    label: "Haftung für Links",
    body: (
      <p className="legal__text">
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
        Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
        Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige
        Links umgehend.
      </p>
    ),
  },
  {
    label: "Urheberrecht",
    body: (
      <p className="legal__text">
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
        deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Vervielfältigung,
        Bearbeitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
        schriftlichen Zustimmung.
      </p>
    ),
  },
];

export default function ImpressumPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Impressum"
        description="Angaben und Pflichtinformationen gemäß § 5 TMG sowie § 18 Abs. 2 MStV."
      />

      <Breadcrumbs trail={[{ label: "Impressum" }]} />
      <LegalDoc blocks={blocks} />
    </>
  );
}
