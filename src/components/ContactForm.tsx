"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/kontakt";

const initial: ContactState = { ok: false };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  return (
    <form action={action} noValidate className="form-panel">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: -9999, opacity: 0, height: 0, width: 0 }}
      />

      <div
        style={{
          display: "grid",
          gap: 18,
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        }}
      >
        <label className="form-label">
          <span>Vorname</span>
          <input className="field" name="firstName" required autoComplete="given-name" />
        </label>
        <label className="form-label">
          <span>Nachname</span>
          <input className="field" name="lastName" required autoComplete="family-name" />
        </label>
      </div>

      <label className="form-label">
        <span>E-Mail</span>
        <input className="field" type="email" name="email" required autoComplete="email" />
      </label>

      <label className="form-label">
        <span>Nachricht</span>
        <textarea className="field field-area" name="message" required />
      </label>

      <input type="hidden" name="company" value="" />
      <input type="hidden" name="subject" value="Anfrage über Website" />

      <button
        type="submit"
        className="btn btn-primary"
        disabled={pending}
        style={{ justifySelf: "start" }}
      >
        {pending ? "Senden…" : "Absenden"}
      </button>

      {state.message ? (
        <p role="status" style={{ margin: 0, color: "var(--green)", fontSize: 14 }}>
          {state.message}
        </p>
      ) : null}
      {state.error ? (
        <p role="alert" style={{ margin: 0, color: "var(--danger)", fontSize: 14 }}>
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
