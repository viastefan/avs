/** Choices offered by both enquiry entry points — the long form on the
 *  contact page and the step-by-step flow. They must stay identical: the
 *  server writes them straight into the mail, so a value that exists in
 *  one place and not the other silently changes what AVS reads. */

export const subjects = [
  "Exportverpackung",
  "Gefahrgutverpackung",
  "Schwergutverpackung",
  "Spezialverpackung",
  "Verpackungsberatung",
  "Vor-Ort-Verpackung & Material",
  "Containerstauung",
  "Gefahrgutschulung",
  "Sonstiges",
] as const;

/** The step-by-step flow shows each subject with a line of its own, so a
 *  visitor picks by what they need rather than by guessing our wording. */
export const subjectHints: Record<string, string> = {
  Exportverpackung: "Kisten und Verschläge nach HPE, Holz nach ISPM 15",
  Gefahrgutverpackung: "IATA, IMDG oder ADR — inklusive Papiere",
  Schwergutverpackung: "Maschinen und Anlagen, auf Wunsch bei Ihnen im Werk",
  Spezialverpackung: "Kühlkette, Reinraum, ESD, Korrosionsschutz",
  Verpackungsberatung: "Bauart, Volumengewicht, Frachtkosten",
  "Vor-Ort-Verpackung & Material": "Wir kommen zu Ihnen — oder liefern das Material",
  Containerstauung: "Stauung, Ladungssicherung, Gewichtsverteilung",
  Gefahrgutschulung: "Inhouse oder bei uns am Frachtzentrum",
  Sonstiges: "Passt nichts davon? Beschreiben Sie es im nächsten Schritt",
};

export const transports = ["Noch offen", "Luftfracht", "Seefracht", "Straßenfracht"] as const;

export const transportHints: Record<string, string> = {
  "Noch offen": "Wir schlagen den passenden Weg vor",
  Luftfracht: "Ab München — IATA/ICAO, Volumengewicht zählt",
  Seefracht: "Seemäßig nach HPE, IMDG bei Gefahrgut",
  Straßenfracht: "ADR, Ladungssicherung nach VDI 2700",
};

export const urgencies = [
  "Keine feste Frist",
  "Diese Woche",
  "Nächste Woche",
  "Diesen Monat",
] as const;

export const contactWays = ["E-Mail", "Telefon", "Egal"] as const;
