import { services } from "@/lib/content";
import { site } from "@/lib/site";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}/#organization`,
        name: site.legalName,
        alternateName: site.name,
        description: site.description,
        url: site.url,
        telephone: site.phone,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${site.address.line1}, ${site.address.line2}`,
          addressLocality: "München-Flughafen",
          postalCode: "85356",
          addressRegion: "Bayern",
          addressCountry: "DE",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "17:00",
          },
        ],
        areaServed: [
          { "@type": "Country", name: "Deutschland" },
          { "@type": "Place", name: "Flughafen München" },
        ],
        knowsAbout: [
          "Exportverpackung",
          "Gefahrgutverpackung",
          "Schwergutverpackung",
          "Containerstauung",
          "Ladungssicherung",
          "Gefahrgutschulung",
        ],
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Reglementierter Beauftragter",
          identifier: site.approval,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.legalName,
        inLanguage: "de-DE",
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "OfferCatalog",
        name: "Verpackungsleistungen",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.summary,
            url: `${site.url}/leistungen/${service.slug}`,
            provider: { "@id": `${site.url}/#organization` },
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
