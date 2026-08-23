import { NextResponse } from "next/server";
import { handleInquiry, readFields } from "@/lib/inquiry";

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot
  if (String(payload.website || "")) {
    return NextResponse.json({ ok: true, message: "Vielen Dank!" });
  }

  const fields = readFields((key) => String(payload[key] ?? "").trim());
  const result = await handleInquiry(fields);

  return result.ok
    ? NextResponse.json({ ok: true, message: result.message })
    : NextResponse.json(
        { ok: false, error: result.error, mailto: result.mailto },
        { status: result.status },
      );
}
