"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/kontakt";

const initial: ContactState = { ok: false };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  return (
    <form action={action} className="space-y-4" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-[var(--ink-soft)]">Vorname</span>
          <input className="field" name="firstName" required autoComplete="given-name" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-[var(--ink-soft)]">Nachname</span>
          <input className="field" name="lastName" required autoComplete="family-name" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-[var(--ink-soft)]">E-Mail</span>
          <input className="field" type="email" name="email" required autoComplete="email" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-[var(--ink-soft)]">Unternehmen</span>
          <input className="field" name="company" autoComplete="organization" />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-[var(--ink-soft)]">Betreff</span>
        <input className="field" name="subject" required />
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-[var(--ink-soft)]">Ihre Anfrage</span>
        <textarea
          className="field field-area"
          name="message"
          required
          placeholder="Formulieren Sie hier Ihre Anfrage an uns"
        />
      </label>

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={pending}>
        {pending ? "Wird gesendet…" : "Anfrage einreichen"}
      </button>

      {state.message ? (
        <p role="status" className="rounded-sm bg-[rgba(46,166,114,0.12)] px-3 py-2 text-sm text-[var(--accent-deep)]">
          {state.message}
        </p>
      ) : null}

      {state.error ? (
        <p role="alert" className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
