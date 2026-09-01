export type Service = {
  slug: string;
  title: string;
  sector: string;
  summary: string;
  /** One line for the home page cards, where `summary` runs to four
   *  lines on a phone and has to be cut mid-sentence. */
  short: string;
  /** Heading over the detail text — every other section on the site has one. */
  detailHeading: string;
  body: string[];
  highlights?: string[];
};

export const services: Service[] = [
  {
    slug: "exportverpackung",
    title: "Exportverpackung",
    sector: "Verpackung",
    short: "Kisten und Verschläge nach HPE, Vollholz nach ISPM 15.",
    summary:
      "Fachgerechte Exportverpackung nach international anerkannten HPE-Vorschriften — sicher, gesetzeskonform und reibungslos abgewickelt.",
    detailHeading: "Vom Holz bis zum Zollstempel",
    body: [
      "Unsere Experten übernehmen die Verpackung Ihrer Waren für den Export gemäß den international anerkannten Vorschriften des HPE.",
      "Die HPE-Richtlinien regeln, wie Güter für den internationalen Versand zu sichern sind — von der Wahl des Holzes über die Kistenkonstruktion bis zur Korrosionsschutzverpackung. Wir wählen die Bauart passend zu Gewicht, Schwerpunkt und Transportdauer.",
      "Für Sendungen in Länder mit Quarantänebestimmungen setzen wir Vollholzverpackungen nach ISPM 15 ein und kennzeichnen sie entsprechend. So vermeiden Sie Zurückweisungen am Zoll.",
      "Verlassen Sie sich auf unsere Fachkenntnis und Erfahrung, um eine makellose Abwicklung Ihrer Exportgeschäfte zu gewährleisten.",
    ],
    highlights: ["HPE-konform", "Internationale Standards", "Begleitdokumente"],
  },
  {
    slug: "gefahrgutverpackung",
    title: "Gefahrgutverpackung",
    sector: "Verpackung",
    short: "IATA, IMDG und ADR — Klassifizierung und Papiere inklusive.",
    summary:
      "Sichere Verpackung gefährlicher Güter für Straße, See und Luft — nach aktuellen IATA/ICAO-, IMDG- und ADR-Vorschriften.",
    detailHeading: "Klassifizieren, verpacken, deklarieren",
    body: [
      "Gefahrgutverpackung muss speziellen Anforderungen entsprechen, um Risiken für Mensch und Umwelt zu minimieren.",
      "Wir verwenden stets die aktuellsten Versionen der IATA/ICAO-, IMDG-Code- sowie ADR-Vorschriften und unterstützen Sie bei der Erstellung der erforderlichen Begleitpapiere.",
      "Entscheidend ist die richtige Klassifizierung: UN-Nummer, Verpackungsgruppe und zulässige Menge je Versandstück bestimmen, welche Bauart-geprüfte Verpackung eingesetzt werden darf. Wir prüfen das vorab und weisen auf Beförderungsverbote hin, bevor die Sendung unterwegs ist.",
      "Besonderes Augenmerk gilt Lithiumbatterien, begrenzten Mengen (LQ) und Freistellungen — hier ändern sich die Regeln regelmäßig, und Fehler führen zu Zurückweisung am Terminal.",
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
    short: "Maschinen und Anlagen, auf Wunsch bei Ihnen im Werk.",
    summary:
      "Verpackung besonders schwerer Waren, Maschinen und Anlagen — auch direkt vor Ort beim Kunden.",
    detailHeading: "Konstruiert um das Gut herum",
    body: [
      "Für besonders schwere Waren, Maschinen oder Anlagen bieten wir einen speziellen Service: Wir verpacken sie direkt vor Ort beim Kunden.",
      "Schwergut stellt eigene Anforderungen: Der Schwerpunkt muss bekannt sein, Anschlagpunkte müssen definiert und die Kiste auf Kipp- und Stapeldruck ausgelegt sein. Wir konstruieren die Verpackung um das Gut herum, statt es in eine Standardkiste zu zwingen.",
      "Auf Wunsch ergänzen wir Verzurrösen, Kufen für den Gabelstaplereingriff sowie Stoß- und Neigungsindikatoren, damit Transportschäden nachvollziehbar bleiben.",
      "Mit unserem erfahrenen Team sorgen wir für eine fachgerechte und sichere Verpackung, damit der Transport reibungslos möglich ist.",
    ],
    highlights: ["Vor Ort beim Kunden", "Maschinen & Anlagen", "Transportschutz"],
  },
  {
    slug: "spezialverpackung",
    title: "Spezialverpackung",
    sector: "Verpackung",
    short: "Kühlkette, Reinraum, ESD und Korrosionsschutz.",
    summary:
      "Kühl-, Reinraum-, ISO-, Fahrzeug- und Lohnverpackung — individuell beraten und präzise umgesetzt.",
    detailHeading: "Wenn die Standardkiste nicht reicht",
    body: [
      "Wenn Sie Kühlverpackungen, Reinraumverpackungen oder ISO-Verpackungen für den sicheren Transport benötigen, stehen wir Ihnen gerne zur Verfügung.",
      "Temperaturgeführte Sendungen erfordern abgestimmte Isolierung und Kühlmittel — je nach Zieltemperatur, Transportdauer und Klimazone. Wir legen die Kombination so aus, dass die Kühlkette über die gesamte Strecke hält.",
      "Für empfindliche Elektronik und Optik arbeiten wir mit ESD-Schutz, Trockenmittel und Barrierefolien. Reinraumware verpacken wir so, dass die Reinheitsklasse bis zum Auspacken erhalten bleibt.",
      "Wir unterstützen Sie bei individueller Beratung, Kommissionierung und der Auswahl der passenden Verpackungslösung.",
    ],
    highlights: ["Kühlverpackung", "Reinraum", "ISO & Fahrzeug"],
  },
  {
    slug: "verpackungsberatung",
    title: "Verpackungsberatung",
    sector: "Verpackung",
    short: "Bauart, Volumengewicht, Frachtkosten — vorher durchgerechnet.",
    summary:
      "Klare Empfehlungen zu Verpackungsvarianten für Luft-, See- und Straßenfracht — abgestimmt auf Ihre Güter.",
    detailHeading: "Erst rechnen, dann packen",
    body: [
      "Für alle Fragen zu potenziellen Verpackungsvarianten können Sie uns jederzeit kontaktieren.",
      "Oft lässt sich mit einer angepassten Bauart Volumen und damit Frachtkosten sparen — gerade in der Luftfracht, wo das Volumengewicht den Preis bestimmt. Wir rechnen die Varianten durch und zeigen Ihnen, wo der sinnvollste Kompromiss zwischen Schutz und Kosten liegt.",
      "Ebenso beraten wir, wenn Sendungen wiederholt beschädigt ankommen: Meist liegt die Ursache in der Ladungssicherung oder in einer Verpackung, die für den tatsächlichen Transportweg nicht ausgelegt ist.",
      "Unser Team klärt Sie über sämtliche Optionen auf und findet die passende Lösung für Ihre Anforderungen.",
    ],
    highlights: ["Individuelle Analyse", "Alle Verkehrsträger", "Schnelle Auskunft"],
  },
  {
    slug: "vor-ort-verpackung",
    title: "Vor-Ort-Verpackung & Material",
    sector: "Verpackung",
    short: "Wir kommen zu Ihnen — oder liefern das Material.",
    summary:
      "Verpackung direkt bei Ihnen vor Ort sowie Bezug hochwertiger Verpackungsmaterialien über uns.",
    detailHeading: "Wir kommen in Ihren Betrieb",
    body: [
      "Sie wünschen eine Verpackung direkt bei Ihnen vor Ort? Auch hierfür sind wir Ihr Ansprechpartner.",
      "Das lohnt sich besonders, wenn Maschinen erst demontiert werden müssen oder sich nicht unverpackt transportieren lassen. Wir kommen mit Material und Werkzeug in Ihren Betrieb und verpacken dort, wo das Gut steht.",
      "Alle von uns verwendeten Verpackungsmaterialien können Sie über uns beziehen. Sollte ein Artikel nicht auf Lager sein, kümmern wir uns um die Beschaffung.",
      "Auf Wunsch beliefern wir Sie regelmäßig, damit Ihre eigene Packstation immer bestückt ist.",
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

/**
 * These sit below the norms grid and the location section, so they must not
 * restate either — no regulation lists, no "kurze Wege am Frachtzentrum".
 * Each point names something the customer actually receives.
 */
export const whyPoints = [
  {
    title: "Alles aus einer Hand",
    text: "Verpackung, Ladungssicherung und Begleitpapiere kommen aus demselben Haus — Sie koordinieren nicht drei Dienstleister, die sich gegenseitig die Schuld geben.",
  },
  {
    title: "Kiste nach Maß, nicht von der Palette",
    text: "Gewicht, Schwerpunkt, Transportdauer und Zielklima bestimmen Holzstärke, Verstrebung und Korrosionsschutz. Standardmaße setzen wir nur ein, wo sie wirklich passen.",
  },
  {
    title: "Auch bei Ihnen im Werk",
    text: "Was sich nicht unverpackt bewegen lässt, verpacken wir vor Ort: Wir kommen mit Material und Werkzeug in Ihren Betrieb — bis hin zur Maschine, die erst demontiert werden muss.",
  },
  {
    title: "Papiere, die am Terminal durchgehen",
    text: "Shipper\'s Declaration, IMO-Erklärung oder ADR-Beförderungspapier stellen wir mit aus. Klassifizierung und zulässige Mengen prüfen wir, bevor die Sendung unterwegs ist.",
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

export const norms = [
  {
    code: "HPE",
    name: "Exportverpackung",
    text: "Richtlinien des Bundesverbands Holzpackmittel für Kisten, Verschläge und Korrosionsschutz — die Referenz für seemäßige und exportfähige Verpackung.",
  },
  {
    code: "IATA / ICAO",
    name: "Gefahrgut Luftfracht",
    text: "Dangerous Goods Regulations für den Lufttransport. Bestimmt Verpackungsanweisung, Menge je Versandstück und die Shipper's Declaration.",
  },
  {
    code: "IMDG",
    name: "Gefahrgut Seefracht",
    text: "International Maritime Dangerous Goods Code — maßgeblich für Klassifizierung, Stauung und Trennung gefährlicher Güter an Bord.",
  },
  {
    code: "ADR",
    name: "Gefahrgut Straße",
    text: "Europäisches Übereinkommen über die Beförderung gefährlicher Güter auf der Straße, inklusive Beförderungspapier und Kennzeichnung.",
  },
  {
    code: "ISPM 15",
    name: "Holzverpackung",
    text: "Internationaler Standard für behandeltes Vollholz. Pflicht für viele Zielländer, um Schädlingseinschleppung zu verhindern.",
  },
  {
    code: "EG 300/2008",
    name: "Luftsicherheit",
    text: "Rahmen für die Sicherheit in der Zivilluftfahrt. Grundlage unserer Zulassung als reglementierter Beauftragter.",
  },
];

export const commitments = [
  {
    title: "Verbindliche Rückmeldung",
    text: "Auf jede Anfrage antworten wir werktags — mit einer klaren Aussage, was machbar ist und was nicht.",
  },
  {
    title: "Keine Blindleistung",
    text: "Wir verpacken nur, was wir verantworten können. Passt eine Anforderung nicht zur Vorschrift, sagen wir das vorher.",
  },
  {
    title: "Dokumentation inklusive",
    text: "Begleitpapiere gehören zur Leistung, nicht zum Aufpreis-Katalog — auf Wunsch komplett von uns erstellt.",
  },
  {
    title: "Ein Ansprechpartner",
    text: "Vom Angebot bis zur Übergabe bleibt Ihr Kontakt derselbe. Keine Weiterreichung durch Abteilungen.",
  },
];

export const capabilities = [
  { label: "Verkehrsträger", value: "Luft, See, Straße" },
  { label: "Gefahrgut", value: "IATA/ICAO, IMDG, ADR" },
  { label: "Exportverpackung", value: "HPE, ISPM 15" },
  { label: "Schwergut", value: "Maschinen und Anlagen, auch vor Ort" },
  { label: "Spezialverpackung", value: "Kühl, Reinraum, ISO, ESD" },
  { label: "Dokumente", value: "Shipper's Declaration, IMO, ADR-Papier" },
  { label: "Material", value: "Bezug und Beschaffung über uns" },
  { label: "Schulung", value: "Inhouse, am Standort, Auffrischung" },
];
