"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/kontakt";

const initial: ContactState = { ok: false };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  return (
    <form action={action} className="panel space-y-5 p-6 md:p-8" noValidate>
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
          <span className="mb-2 block text-sm font-medium text-[var(--fog)]">Vorname</span>
          <input className="field" name="firstName" required autoComplete="given-name" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--fog)]">Nachname</span>
          <input className="field" name="lastName" required autoComplete="family-name" />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[var(--fog)]">E-Mail</span>
        <input className="field" type="email" name="email" required autoComplete="email" />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[var(--fog)]">Nachricht</span>
        <textarea className="field field-area" name="message" required />
      </label>

      <input type="hidden" name="company" value="" />
      <input type="hidden" name="subject" value="Anfrage über Website" />

      <button type="submit" className="btn btn-primary" disabled={pending}>
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
