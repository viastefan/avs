"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          company: data.get("company"),
          subject: data.get("subject"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Senden fehlgeschlagen");
      }

      setStatus("success");
      setMessage("Vielen Dank! Ihr Anliegen wird schnellstmöglich bearbeitet.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Bitte versuchen Sie es erneut.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
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

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "loading"}>
        {status === "loading" ? "Wird gesendet…" : "Anfrage einreichen"}
      </button>

      {message ? (
        <p
          role="status"
          className={`text-sm ${status === "success" ? "text-[var(--accent-deep)]" : "text-red-700"}`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
