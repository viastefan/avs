"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/kontakt";

const initial: ContactState = { ok: false };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  return (
    <form action={action} className="space-y-5" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="meta mb-2 block">Vorname</span>
          <input className="field" name="firstName" required autoComplete="given-name" />
        </label>
        <label className="block">
          <span className="meta mb-2 block">Nachname</span>
          <input className="field" name="lastName" required autoComplete="family-name" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="meta mb-2 block">E-Mail</span>
          <input className="field" type="email" name="email" required autoComplete="email" />
        </label>
        <label className="block">
          <span className="meta mb-2 block">Unternehmen</span>
          <input className="field" name="company" autoComplete="organization" />
        </label>
      </div>

      <label className="block">
        <span className="meta mb-2 block">Betreff</span>
        <input className="field" name="subject" required />
      </label>

      <label className="block">
        <span className="meta mb-2 block">Nachricht</span>
        <textarea className="field field-area" name="message" required />
      </label>

      <button type="submit" className="btn-primary" disabled={pending}>
        {pending ? "Senden…" : "Absenden"}
      </button>

      {state.message ? (
        <p role="status" className="text-sm text-[var(--green)]">
          {state.message}
        </p>
      ) : null}

      {state.error ? (
        <p role="alert" className="text-sm text-[var(--danger)]">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
