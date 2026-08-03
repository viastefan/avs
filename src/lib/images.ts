/** Local logistics imagery — packaging, freight, containers */

export type SiteImage = {
  src: string;
  alt: string;
};

export const images = {
  hero: {
    src: "/images/hero.jpg",
    alt: "Gabelstapler mit stretchfolierter Frachtpalette im Logistiklager",
  },
  warehouse: {
    src: "/images/warehouse.jpg",
    alt: "Frachtlager mit stretchfolierten Paletten in Hochregalen",
  },
  packaging: {
    src: "/images/packaging.jpg",
    alt: "Karton wird fachgerecht mit Packband verschlossen",
  },
  containers: {
    src: "/images/containers.jpg",
    alt: "Containerschiff mit Verladekränen im Hafen",
  },
  containerYard: {
    src: "/images/container-yard.jpg",
    alt: "Gestapelte Frachtcontainer im Umschlagterminal",
  },
  training: {
    src: "/images/training.jpg",
    alt: "Teamabstimmung und Unterweisung im Lagerbetrieb",
  },
  airport: {
    src: "/images/airport.jpg",
    alt: "Moderne Frachtumschlaghalle mit Laderampen",
  },
  cargoPlane: {
    src: "/images/hero.jpg",
    alt: "Luft- und Landfrachtbereitstellung im Umschlaglager",
  },
  trucks: {
    src: "/images/vor-ort-verpackung.jpg",
    alt: "Beladung verpackter Sendungen am Fahrzeug",
  },
} as const satisfies Record<string, SiteImage>;

/** Per-service packaging imagery for Leistung detail pages */
export const serviceImages = {
  exportverpackung: {
    src: "/images/exportverpackung.jpg",
    alt: "Holzpaletten für exportfähige Verpackung und Ladungsträger",
  },
  gefahrgutverpackung: {
    src: "/images/gefahrgutverpackung.jpg",
    alt: "Gebinde und Kartonumschlag für sensibel gekennzeichnete Güter",
  },
  schwergutverpackung: {
    src: "/images/schwergutverpackung.jpg",
    alt: "Schweres Palettengut in Hochregalen — bereit für Umschlag",
  },
  spezialverpackung: {
    src: "/images/spezialverpackung.jpg",
    alt: "Präzises Verschließen und Schutzverpackung von Spezialgütern",
  },
  verpackungsberatung: {
    src: "/images/verpackungsberatung.jpg",
    alt: "Beratung und Kontrolle im Verpackungs- und Lagerprozess",
  },
  "vor-ort-verpackung": {
    src: "/images/vor-ort-verpackung.jpg",
    alt: "Vor-Ort-Verpackung und Beladung am Kundenstandort",
  },
} as const satisfies Record<string, SiteImage>;

export function getServiceImage(slug: string): SiteImage {
  return (
    serviceImages[slug as keyof typeof serviceImages] ?? images.packaging
  );
}
