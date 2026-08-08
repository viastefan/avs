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

export const stats = [
  { value: "Modul H", label: "Standort im Frachtzentrum München" },
  { value: "IATA · ADR · IMDG", label: "Alle Verkehrsträger abgedeckt" },
  { value: "HPE-konform", label: "Exportverpackung nach Norm" },
  { value: "DE/RA/00876-01", label: "Reglementierter Beauftragter" },
];

export const whyPoints = [
  {
    title: "Direkt am Frachtzentrum",
    text: "Kurze Wege am Flughafen München — schnelle Abwicklung ohne Umwege, direkt dort, wo Ihre Fracht umgeschlagen wird.",
  },
  {
    title: "Normkonform & dokumentiert",
    text: "Wir verpacken nach HPE, IATA/ICAO, IMDG und ADR und erstellen auf Wunsch alle erforderlichen Begleitpapiere.",
  },
  {
    title: "Vom Packstück bis zur Maschine",
    text: "Ob einzelnes Gefahrgut oder tonnenschwere Anlage — wir liefern die passende Verpackung, auch direkt bei Ihnen vor Ort.",
  },
  {
    title: "Erfahren & zuverlässig",
    text: "Ein eingespieltes Team mit langjähriger Erfahrung in Luft-, See- und Straßenfracht — präzise, termintreu und sicher.",
  },
];

export const faqs = [
  {
    q: "Welche Verpackungsvorschriften wenden Sie an?",
    a: "Wir verpacken nach den international anerkannten HPE-Richtlinien sowie den aktuellen Vorschriften für Luft- (IATA/ICAO), See- (IMDG-Code) und Straßenfracht (ADR). Die passende Norm richtet sich nach Gut und Verkehrsträger.",
  },
  {
    q: "Übernehmen Sie auch die Begleitpapiere?",
    a: "Ja. Auf Wunsch erstellen wir die erforderlichen Dokumente wie Shipper's Declaration (Luft), IMO-Erklärung (See) oder ADR-Beförderungspapier (Straße) und stellen auf Anfrage einen externen Gefahrgutbeauftragten.",
  },
  {
    q: "Verpacken Sie auch schwere Maschinen und Anlagen?",
    a: "Ja. Für besonders schwere oder sperrige Güter bieten wir Schwergutverpackung — auf Wunsch direkt vor Ort bei Ihnen, inklusive fachgerechter Ladungssicherung.",
  },
  {
    q: "Kann ich Verpackungsmaterial über Sie beziehen?",
    a: "Alle von uns verwendeten Materialien können Sie über uns beziehen. Ist ein Artikel nicht auf Lager, kümmern wir uns um die Beschaffung.",
  },
  {
    q: "Bieten Sie Gefahrgutschulungen an?",
    a: "Ja. Wir schulen praxisnah zu Verpackungsvorschriften, Kennzeichnung und Dokumentation für Straße, See und Luft — abgestimmt auf Ihren Betrieb, vor Ort oder bei uns.",
  },
  {
    q: "Wo befindet sich Ihr Standort?",
    a: "Sie finden uns im Frachtzentrum des Flughafens München, Südallee, Modul H (Pavillon), 85356 München-Flughafen — direkt dort, wo Ihre Fracht abgefertigt wird.",
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

export const processSteps = [
  {
    title: "Anfrage & Beratung",
    text: "Sie schildern uns Gut, Zielort und Verkehrsträger. Wir klären Vorschriften, Materialbedarf und Termin — telefonisch oder per E-Mail.",
  },
  {
    title: "Prüfung & Konzept",
    text: "Wir bestimmen die passende Verpackungsart, Klassifizierung und Sicherung — HPE, IATA, IMDG oder ADR, je nach Sendung.",
  },
  {
    title: "Verpackung & Kennzeichnung",
    text: "Fachgerechte Ausführung im Frachtzentrum oder bei Ihnen vor Ort, inklusive Labeln, Packstückkennzeichen und Ladungssicherung.",
  },
  {
    title: "Dokumente & Übergabe",
    text: "Wir erstellen die Begleitpapiere und übergeben die Sendung abfertigungsbereit an Ihren Spediteur oder das Handling.",
  },
];

export const containerIntro = [
  "Eine Sendung ist nur so sicher wie ihre Stauung. Wir planen die Beladung vorab, nutzen den verfügbaren Raum optimal aus und sichern die Ladung so, dass sie Erschütterungen, Schräglagen und Umschlag unbeschadet übersteht.",
  "Dabei berücksichtigen wir Gewichtsverteilung, Stapelfähigkeit und die Anforderungen des jeweiligen Verkehrsträgers — vom Seecontainer über den Lkw-Auflieger bis zur Luftfrachtpalette.",
];

export const trainingIntro = [
  "Wer Gefahrgut verpackt, kennzeichnet oder versendet, trägt Verantwortung für Mensch, Umwelt und die eigene Betriebssicherheit. Fehler in Klassifizierung oder Dokumentation führen schnell zu Zurückweisungen, Verzögerungen und Bußgeldern.",
  "In unseren Schulungen vermitteln wir die aktuellen Vorschriften praxisnah und direkt anwendbar — mit echten Packstücken, echten Labels und echten Dokumenten aus dem Tagesgeschäft am Frachtzentrum.",
];

export const trainingFormats = [
  { title: "Inhouse bei Ihnen", text: "Wir kommen in Ihren Betrieb und schulen am eigenen Material und an Ihren typischen Sendungen." },
  { title: "Bei uns am Standort", text: "Schulung im Frachtzentrum München — mit direktem Bezug zur Luftfrachtabfertigung." },
  { title: "Auffrischung", text: "Kompakte Updates, wenn sich Vorschriften ändern oder Zertifikate auslaufen." },
];

export const faqGroups = [
  {
    title: "Leistungen & Ablauf",
    items: [
      {
        q: "Welche Verpackungsvorschriften wenden Sie an?",
        a: "Wir verpacken nach den international anerkannten HPE-Richtlinien sowie den aktuellen Vorschriften für Luft- (IATA/ICAO), See- (IMDG-Code) und Straßenfracht (ADR). Welche Norm greift, richtet sich nach Gut und Verkehrsträger — das klären wir vorab mit Ihnen.",
      },
      {
        q: "Wie schnell können Sie eine Sendung bearbeiten?",
        a: "Das hängt von Umfang und Art der Sendung ab. Melden Sie sich mit Termin und Eckdaten — wir sagen Ihnen verbindlich, was möglich ist. Durch die Lage direkt am Frachtzentrum entfallen zusätzliche Transportwege.",
      },
      {
        q: "Verpacken Sie auch schwere Maschinen und Anlagen?",
        a: "Ja. Für besonders schwere oder sperrige Güter bieten wir Schwergutverpackung — auf Wunsch direkt vor Ort bei Ihnen, inklusive fachgerechter Ladungssicherung.",
      },
      {
        q: "Kommen Sie auch zu uns in den Betrieb?",
        a: "Ja. Vor-Ort-Verpackung gehört zu unserem Leistungsumfang, besonders bei Schwergut und Anlagen, die sich nicht sinnvoll transportieren lassen, bevor sie verpackt sind.",
      },
    ],
  },
  {
    title: "Gefahrgut & Dokumente",
    items: [
      {
        q: "Übernehmen Sie auch die Begleitpapiere?",
        a: "Auf Wunsch erstellen wir die erforderlichen Dokumente: Shipper's Declaration für die Luftfracht, IMO-Erklärung für die Seefracht und das ADR-Beförderungspapier für die Straße.",
      },
      {
        q: "Stellen Sie einen Gefahrgutbeauftragten?",
        a: "Ja, auf Anfrage bieten wir die Dienstleistung eines externen Gefahrgutbeauftragten an — sinnvoll für Betriebe, die regelmäßig Gefahrgut versenden, aber keine eigene Stelle besetzen wollen.",
      },
      {
        q: "Was bedeutet reglementierter Beauftragter?",
        a: "Als reglementierter Beauftragter sind wir nach den Vorgaben der EU-Luftsicherheitsverordnung zugelassen und dürfen Luftfracht als sicher einstufen. Unsere Zulassungsnummer lautet DE/RA/00876-01.",
      },
    ],
  },
  {
    title: "Schulung",
    items: [
      {
        q: "Bieten Sie Gefahrgutschulungen an?",
        a: "Ja. Wir schulen praxisnah zu Verpackungsvorschriften, Kennzeichnung und Dokumentation für Straße, See und Luft — abgestimmt auf Ihren Betrieb.",
      },
      {
        q: "Wo finden die Schulungen statt?",
        a: "Wahlweise inhouse bei Ihnen am eigenen Material, bei uns am Standort im Frachtzentrum München, oder als kompakte Auffrischung, wenn sich Vorschriften ändern.",
      },
    ],
  },
  {
    title: "Material & Standort",
    items: [
      {
        q: "Kann ich Verpackungsmaterial über Sie beziehen?",
        a: "Alle von uns verwendeten Materialien können Sie über uns beziehen. Ist ein Artikel nicht auf Lager, kümmern wir uns um die Beschaffung.",
      },
      {
        q: "Wo befindet sich Ihr Standort?",
        a: "Im Frachtzentrum des Flughafens München, Südallee, Modul H (Pavillon), 85356 München-Flughafen — direkt dort, wo Ihre Fracht abgefertigt wird.",
      },
    ],
  },
];
