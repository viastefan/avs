export type Service = {
  slug: string;
  title: string;
  sector: string;
  summary: string;
  body: string[];
  highlights?: string[];
};

export const services: Service[] = [
  {
    slug: "exportverpackung",
    title: "Exportverpackung",
    sector: "Verpackung",
    summary:
      "Fachgerechte Exportverpackung nach international anerkannten HPE-Vorschriften — sicher, gesetzeskonform und reibungslos abgewickelt.",
    body: [
      "Unsere Experten übernehmen die Verpackung Ihrer Waren für den Export gemäß den international anerkannten Vorschriften des HPE.",
      "Verlassen Sie sich auf unsere Fachkenntnis und Erfahrung, um eine makellose Abwicklung Ihrer Exportgeschäfte zu gewährleisten.",
    ],
    highlights: ["HPE-konform", "Internationale Standards", "Begleitdokumente"],
  },
  {
    slug: "gefahrgutverpackung",
    title: "Gefahrgutverpackung",
    sector: "Verpackung",
    summary:
      "Sichere Verpackung gefährlicher Güter für Straße, See und Luft — nach aktuellen IATA/ICAO-, IMDG- und ADR-Vorschriften.",
    body: [
      "Gefahrgutverpackung muss speziellen Anforderungen entsprechen, um Risiken für Mensch und Umwelt zu minimieren.",
      "Wir verwenden stets die aktuellsten Versionen der IATA/ICAO-, IMDG-Code- sowie ADR-Vorschriften und unterstützen Sie bei der Erstellung der erforderlichen Begleitpapiere.",
      "Darüber hinaus bieten wir auf Anfrage die Dienstleistung eines externen Gefahrgutbeauftragten an.",
    ],
    highlights: [
      "Shipper's Declaration (Luft)",
      "IMO-Erklärung (See)",
      "ADR-Beförderungspapier (Straße)",
    ],
  },
  {
    slug: "schwergutverpackung",
    title: "Schwergutverpackung",
    sector: "Verpackung",
    summary:
      "Verpackung besonders schwerer Waren, Maschinen und Anlagen — auch direkt vor Ort beim Kunden.",
    body: [
      "Für besonders schwere Waren, Maschinen oder Anlagen bieten wir einen speziellen Service: Wir verpacken sie direkt vor Ort beim Kunden.",
      "Mit unserem erfahrenen Team sorgen wir für eine fachgerechte und sichere Verpackung, damit der Transport reibungslos möglich ist.",
    ],
    highlights: ["Vor Ort beim Kunden", "Maschinen & Anlagen", "Transportschutz"],
  },
  {
    slug: "spezialverpackung",
    title: "Spezialverpackung",
    sector: "Verpackung",
    summary:
      "Kühl-, Reinraum-, ISO-, Fahrzeug- und Lohnverpackung — individuell beraten und präzise umgesetzt.",
    body: [
      "Wenn Sie Kühlverpackungen, Reinraumverpackungen oder ISO-Verpackungen für den sicheren Transport benötigen, stehen wir Ihnen gerne zur Verfügung.",
      "Wir unterstützen Sie bei individueller Beratung, Kommissionierung und der Auswahl der passenden Verpackungslösung.",
    ],
    highlights: ["Kühlverpackung", "Reinraum", "ISO & Fahrzeug"],
  },
  {
    slug: "verpackungsberatung",
    title: "Verpackungsberatung",
    sector: "Verpackung",
    summary:
      "Klare Empfehlungen zu Verpackungsvarianten für Luft-, See- und Straßenfracht — abgestimmt auf Ihre Güter.",
    body: [
      "Für alle Fragen zu potenziellen Verpackungsvarianten können Sie uns jederzeit kontaktieren.",
      "Unser Team klärt Sie über sämtliche Optionen auf und findet die passende Lösung für Ihre Anforderungen.",
    ],
    highlights: ["Individuelle Analyse", "Alle Verkehrsträger", "Schnelle Auskunft"],
  },
  {
    slug: "vor-ort-verpackung",
    title: "Vor-Ort-Verpackung & Material",
    sector: "Verpackung",
    summary:
      "Verpackung direkt bei Ihnen vor Ort sowie Bezug hochwertiger Verpackungsmaterialien über uns.",
    body: [
      "Sie wünschen eine Verpackung direkt bei Ihnen vor Ort? Auch hierfür sind wir Ihr Ansprechpartner.",
      "Alle von uns verwendeten Verpackungsmaterialien können Sie über uns beziehen. Sollte ein Artikel nicht auf Lager sein, kümmern wir uns um die Beschaffung.",
    ],
    highlights: ["Vor-Ort-Service", "Materialbezug", "Beschaffung"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const containerFeatures = [
  {
    title: "Stauung in Container",
    text: "Planung und Ausführung mit optimaler Raumnutzung — effizient und bruchsicher.",
  },
  {
    title: "Verpackung & Palettisierung",
    text: "Vorbereitung Ihrer Güter für stabile, stapelbare und transportfähige Einheiten.",
  },
  {
    title: "Ladungssicherung",
    text: "Sicherung für Land-, See- und Luftweg nach geltenden Anforderungen.",
  },
  {
    title: "Ladegewichtskontrolle",
    text: "Kontrolle und Abstimmung der Gewichtsverteilung für sicheren Transport.",
  },
];

export const trainingTopics = [
  {
    title: "Verpackungsvorschriften",
    items: [
      "Allgemeine Vorschriften für Güter und Waren",
      "Spezielle Vorschriften für Gefahrgut",
      "Containerstauung und Ladungssicherung",
    ],
  },
  {
    title: "Beschriften von Gefahrgut",
    items: [
      "Richtiges Belabeln",
      "Packstückkennzeichen",
      "Innenverpackung, Umschließungen & Zollverschluss",
    ],
  },
  {
    title: "Dokumentation",
    items: [
      "ADR-Beförderungspapier",
      "IMO-Erklärungen",
      "Shipper's Declarations",
    ],
  },
  {
    title: "Verbote & Richtlinien",
    items: [
      "Lufttransport-Verbote beachten",
      "Seeverkehr-Beschränkungen",
      "Aktuelle Vorschriften je Verkehrsträger",
    ],
  },
];
