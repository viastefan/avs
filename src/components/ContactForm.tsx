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
        <label className="block">
          <span className="meta mb-2 block text-[var(--steel)]">Vorname</span>
          <input className="field" name="firstName" required autoComplete="given-name" />
        </label>
        <label className="block">
          <span className="meta mb-2 block text-[var(--steel)]">Nachname</span>
          <input className="field" name="lastName" required autoComplete="family-name" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="meta mb-2 block text-[var(--steel)]">E-Mail</span>
          <input className="field" type="email" name="email" required autoComplete="email" />
        </label>
        <label className="block">
          <span className="meta mb-2 block text-[var(--steel)]">Unternehmen</span>
          <input className="field" name="company" autoComplete="organization" />
        </label>
      </div>

      <label className="block">
        <span className="meta mb-2 block text-[var(--steel)]">Betreff</span>
        <input className="field" name="subject" required />
      </label>

      <label className="block">
        <span className="meta mb-2 block text-[var(--steel)]">Anfrage</span>
        <textarea
          className="field field-area"
          name="message"
          required
          placeholder="Ihre Anfrage an AVS"
        />
      </label>

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={pending}>
        {pending ? "Senden…" : "Absenden"}
      </button>

      {state.message ? (
        <p role="status" className="border border-[var(--ink)] bg-[var(--signal)] px-3 py-2 text-sm text-[var(--ink)]">
          {state.message}
        </p>
      ) : null}

      {state.error ? (
        <p role="alert" className="border border-[var(--danger)] bg-[var(--danger)] px-3 py-2 text-sm text-white">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
