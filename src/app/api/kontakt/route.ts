import { NextResponse } from "next/server";

type Payload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  subject?: string;
  message?: string;
  website?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!firstName || !lastName || !email || !subject || !message) {
    return NextResponse.json(
      { ok: false, error: "Bitte füllen Sie alle Pflichtfelder aus." },
      { status: 400 },
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Bitte eine gültige E-Mail angeben." }, { status: 400 });
  }

  const inquiry = {
    firstName,
    lastName,
    email,
    company,
    subject,
    message,
    receivedAt: new Date().toISOString(),
  };

  // Optional Resend delivery when configured
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
            `Unternehmen: ${company || "—"}`,
            `Betreff: ${subject}`,
            "",
            message,
          ].join("\n"),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Resend error:", errText);
        return NextResponse.json(
          { ok: false, error: "E-Mail-Versand vorübergehend nicht möglich." },
          { status: 502 },
        );
      }
    } catch (error) {
      console.error("Contact mail failed:", error);
      return NextResponse.json(
        { ok: false, error: "E-Mail-Versand vorübergehend nicht möglich." },
        { status: 502 },
      );
    }
  } else {
    console.error("AVS contact inquiry could not be delivered — RESEND_API_KEY is not set:", inquiry);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Der Versand ist derzeit nicht möglich. Bitte rufen Sie uns an unter +49 (0)89 975 945 91 oder schreiben Sie an info@airport-verpackungen.de.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
