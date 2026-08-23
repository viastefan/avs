"use server";

import { handleInquiry, readFields } from "@/lib/inquiry";

export type ContactState = {
  ok: boolean;
  error?: string;
  message?: string;
  /** Ready-to-send mail addressed to AVS, offered when delivery fails. */
  mailto?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: bots fill hidden fields, so answer as if all was well.
  if (String(formData.get("website") || "")) {
    return { ok: true, message: "Vielen Dank! Ihr Anliegen wird schnellstmöglich bearbeitet." };
  }

  const fields = readFields((key) => String(formData.get(key) || "").trim());
  const result = await handleInquiry(fields, { requireConsent: true });

  return result.ok
    ? { ok: true, message: result.message }
    : { ok: false, error: result.error, mailto: result.mailto };
}
