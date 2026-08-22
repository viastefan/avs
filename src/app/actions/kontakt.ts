"use server";

export type ContactState = {
  ok: boolean;
  error?: string;
  message?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot
  if (String(formData.get("website") || "")) {
    return { ok: true, message: "Vielen Dank! Ihr Anliegen wird schnellstmöglich bearbeitet." };
  }

  const get = (key: string) => String(formData.get(key) || "").trim();

  const firstName = get("firstName");
  const lastName = get("lastName");
  const email = get("email");
  const phone = get("phone");
  const company = get("company");
  const subject = get("subject");
  const message = get("message");
  const transport = get("transport");
  const goods = get("goods");
  const weight = get("weight");
  const deadline = get("deadline");
  const preferredContact = get("preferredContact");
  const consent = get("consent");

  if (!firstName || !lastName || !email || !subject || !message) {
    return { ok: false, error: "Bitte füllen Sie alle Pflichtfelder aus." };
  }

  if (!isEmail(email)) {
    return { ok: false, error: "Bitte eine gültige E-Mail angeben." };
  }

  if (!consent) {
    return { ok: false, error: "Bitte stimmen Sie der Datenschutzerklärung zu." };
  }

  if (preferredContact === "Telefon" && !phone) {
    return { ok: false, error: "Für einen Rückruf benötigen wir Ihre Telefonnummer." };
  }

  const inquiry = {
    firstName,
    lastName,
    email,
    phone,
    company,
    subject,
    transport,
    goods,
    weight,
    deadline,
    preferredContact,
    message,
    receivedAt: new Date().toISOString(),
  };

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "info@airport-verpackungen.de";
  const from = process.env.CONTACT_FROM_EMAIL || "AVS Website <onboarding@resend.dev>";

  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `[AVS Anfrage] ${subject}`,
          text: [
            `Name: ${firstName} ${lastName}`,
            `E-Mail: ${email}`,
            `Telefon: ${phone || "—"}`,
            `Unternehmen: ${company || "—"}`,
            `Rückmeldung bevorzugt per: ${preferredContact || "—"}`,
            "",
            `Anliegen: ${subject}`,
            `Verkehrsträger: ${transport || "—"}`,
            `Art der Güter: ${goods || "—"}`,
            `Gewicht / Maße: ${weight || "—"}`,
            `Gewünschter Termin: ${deadline || "—"}`,
            "",
            "Nachricht:",
            message,
          ].join("\n"),
        }),
      });

      if (!res.ok) {
        console.error("Resend error:", await res.text());
        return { ok: false, error: "E-Mail-Versand vorübergehend nicht möglich." };
      }
    } catch (error) {
      console.error("Contact mail failed:", error);
      return { ok: false, error: "E-Mail-Versand vorübergehend nicht möglich." };
    }
  } else {
    // No mail provider configured: never claim the enquiry was received,
    // or the visitor leaves believing it arrived while nobody was told.
    console.error("AVS contact inquiry could not be delivered — RESEND_API_KEY is not set:", inquiry);
    return {
      ok: false,
      error:
        "Der Versand ist derzeit nicht möglich. Bitte rufen Sie uns an unter +49 (0)89 975 945 91 oder schreiben Sie an info@airport-verpackungen.de.",
    };
  }

  return {
    ok: true,
    message: "Vielen Dank! Ihr Anliegen wird schnellstmöglich bearbeitet.",
  };
}
