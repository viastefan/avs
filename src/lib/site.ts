export const site = {
  name: "AVS",
  legalName: "Airport-Verpackungs-Service GmbH",
  tagline: "Verpackungs-Profis am Flughafen München",
  description:
    "Spezialisten für Export-, Gefahrgut- und Schwergutverpackung am Flughafen München — IATA, ADR und IMDG konform.",
  phone: "+49 (0)89 975 945 91",
  phoneAlt: "+49 (0)89 975 945 92",
  phoneHref: "tel:+498997594591",
  email: "info@airport-verpackungen.de",
  emailHref: "mailto:info@airport-verpackungen.de",
  address: {
    line1: "Frachtzentrum, Modul H, Pavillon",
    line2: "Südallee, Modul H",
    city: "85356 München-Flughafen",
    region: "Bayern, Deutschland",
  },
  approval: "DE/RA/00876-01",
  url: "https://avs-tau.vercel.app",
  oldUrl: "https://www.airport-verpackungen.de",
} as const;

export const nav = [
  { href: "/leistungen", label: "Leistungen" },
  { href: "/containerstauung", label: "Containerstauung" },
  { href: "/gefahrgutschulung", label: "Gefahrgutschulung" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
