"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/kontakt";
import { inquiryTopics, contactMethods, urgencyOptions } from "@/lib/contact";

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

      <div className="form-row">
        <label className="form-label">
          <span>Vorname *</span>
          <input className="field" name="firstName" required autoComplete="given-name" />
        </label>
        <label className="form-label">
          <span>Nachname *</span>
          <input className="field" name="lastName" required autoComplete="family-name" />
        </label>
      </div>

      <div className="form-row">
        <label className="form-label">
          <span>Unternehmen</span>
          <input className="field" name="company" autoComplete="organization" />
        </label>
        <label className="form-label">
          <span>Telefon</span>
          <input className="field" name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>

      <label className="form-label">
        <span>E-Mail *</span>
        <input className="field" type="email" name="email" required autoComplete="email" />
      </label>

      <fieldset className="form-fieldset">
        <legend className="form-legend">Interessierte Leistungen</legend>
        <p className="form-hint">Mehrfachauswahl möglich</p>
        <div className="choice-grid">
          {inquiryTopics.map((topic) => (
            <label key={topic.value} className="choice">
              <input type="checkbox" name="topics" value={topic.value} />
              {topic.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-row">
        <label className="form-label">
          <span>Bevorzugter Kontakt</span>
          <select className="field" name="contactMethod" defaultValue="email">
            {contactMethods.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
        <label className="form-label">
          <span>Zeitrahmen</span>
          <select className="field" name="urgency" defaultValue="normal">
            {urgencyOptions.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="form-label">
        <span>Betreff *</span>
        <input
          className="field"
          name="subject"
          required
          placeholder="z. B. Anfrage Exportverpackung"
          defaultValue=""
        />
      </label>

      <label className="form-label">
        <span>Nachricht *</span>
        <textarea
          className="field field-area"
          name="message"
          required
          placeholder="Kurz zu Frachtart, Terminwunsch und Besonderheiten"
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Senden…" : "Anfrage senden"}
        </button>
        <p className="form-hint">* Pflichtfelder</p>
      </div>

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
