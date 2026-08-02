"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/kontakt";

const initial: ContactState = { ok: false };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  return (
    <form
      action={action}
      noValidate
      style={{
        display: "grid",
        gap: 18,
        padding: 28,
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: "calc(var(--radius) + 4px)",
      }}
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: -9999, opacity: 0, height: 0, width: 0 }}
      />

      <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        <label style={{ display: "grid", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--muted)" }}>Vorname</span>
          <input className="field" name="firstName" required autoComplete="given-name" />
        </label>
        <label style={{ display: "grid", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--muted)" }}>Nachname</span>
          <input className="field" name="lastName" required autoComplete="family-name" />
        </label>
      </div>

      <label style={{ display: "grid", gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--muted)" }}>E-Mail</span>
        <input className="field" type="email" name="email" required autoComplete="email" />
      </label>

      <label style={{ display: "grid", gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--muted)" }}>Nachricht</span>
        <textarea className="field field-area" name="message" required />
      </label>

      <input type="hidden" name="company" value="" />
      <input type="hidden" name="subject" value="Anfrage über Website" />

      <button type="submit" className="btn btn-primary" disabled={pending} style={{ justifySelf: "start" }}>
        {pending ? "Senden…" : "Absenden"}
      </button>

      {state.message ? <p role="status" style={{ margin: 0, color: "var(--blue)", fontSize: 14 }}>{state.message}</p> : null}
      {state.error ? <p role="alert" style={{ margin: 0, color: "var(--danger)", fontSize: 14 }}>{state.error}</p> : null}
    </form>
  );
}
