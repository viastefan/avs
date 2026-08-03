export const inquiryTopics = [
  { value: "exportverpackung", label: "Exportverpackung" },
  { value: "gefahrgutverpackung", label: "Gefahrgutverpackung" },
  { value: "schwergutverpackung", label: "Schwergutverpackung" },
  { value: "spezialverpackung", label: "Spezialverpackung" },
  { value: "verpackungsberatung", label: "Verpackungsberatung" },
  { value: "vor-ort-verpackung", label: "Vor-Ort-Verpackung" },
  { value: "containerstauung", label: "Containerstauung" },
  { value: "gefahrgutschulung", label: "Gefahrgutschulung" },
] as const;

export const contactMethods = [
  { value: "email", label: "E-Mail" },
  { value: "phone", label: "Telefon" },
  { value: "either", label: "Egal" },
] as const;

export const urgencyOptions = [
  { value: "urgent", label: "Dringend (innerhalb 24 Std.)" },
  { value: "normal", label: "Normal (2–3 Werktage)" },
  { value: "planning", label: "Planung / unverbindlich" },
] as const;

export type InquiryTopic = (typeof inquiryTopics)[number]["value"];
