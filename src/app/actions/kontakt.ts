"use server";

import {
  contactMethods,
  inquiryTopics,
  urgencyOptions,
} from "@/lib/contact";

export type ContactState = {
  ok: boolean;
  error?: string;
  message?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const topicLabels = Object.fromEntries(inquiryTopics.map((t) => [t.value, t.label]));
const methodLabels = Object.fromEntries(contactMethods.map((m) => [m.value, m.label]));
const urgencyLabels = Object.fromEntries(urgencyOptions.map((u) => [u.value, u.label]));

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if (String(formData.get("website") || "")) {
    return { ok: true, message: "Vielen Dank! Ihr Anliegen wird schnellstmöglich bearbeitet." };
  }

  const firstName = String(formData.get("firstName") || "").trim();
  const lastName = String(formData.get("lastName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const contactMethod = String(formData.get("contactMethod") || "email").trim();
  const urgency = String(formData.get("urgency") || "normal").trim();
  const topics = formData
    .getAll("topics")
    .map((t) => String(t))
    .filter((t) => t in topicLabels);

  if (!firstName || !lastName || !email || !subject || !message) {
    return { ok: false, error: "Bitte füllen Sie alle Pflichtfelder aus." };
  }

  if (!isEmail(email)) {
    return { ok: false, error: "Bitte eine gültige E-Mail angeben." };
  }

  if (contactMethod === "phone" && !phone) {
    return { ok: false, error: "Bitte eine Telefonnummer angeben oder E-Mail als Kontakt wählen." };
  }

  const topicText =
    topics.length > 0 ? topics.map((t) => topicLabels[t] ?? t).join(", ") : "—";

  const inquiry = {
    firstName,
    lastName,
    email,
    phone,
    company,
    subject,
    message,
    topics,
    contactMethod,
    urgency,
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
            `Leistungen: ${topicText}`,
            `Kontaktweg: ${methodLabels[contactMethod] ?? contactMethod}`,
            `Zeitrahmen: ${urgencyLabels[urgency] ?? urgency}`,
            `Betreff: ${subject}`,
            "",
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
    console.info("AVS contact inquiry (no RESEND_API_KEY configured):", inquiry);
  }

  return {
    ok: true,
    message: "Vielen Dank! Ihr Anliegen wird schnellstmöglich bearbeitet.",
  };
}
