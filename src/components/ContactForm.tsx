"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/kontakt";

const initial: ContactState = { ok: false };

const subjects = [
  "Exportverpackung",
  "Gefahrgutverpackung",
  "Schwergutverpackung",
  "Spezialverpackung",
  "Verpackungsberatung",
  "Vor-Ort-Verpackung & Material",
  "Containerstauung",
  "Gefahrgutschulung",
  "Sonstiges",
];

const transports = ["Luftfracht", "Seefracht", "Straßenfracht", "Noch offen"];

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const prefill = useSearchParams().get("anfrage") ?? "";

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

      <fieldset className="form-group">
        <legend className="form-group__legend">Ihre Angaben</legend>
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
            <span>E-Mail *</span>
            <input className="field" type="email" name="email" required autoComplete="email" />
          </label>
          <label className="form-label">
            <span>Telefon</span>
            <input className="field" type="tel" name="phone" autoComplete="tel" />
          </label>
        </div>

        <label className="form-label">
          <span>Unternehmen</span>
          <input className="field" name="company" autoComplete="organization" />
        </label>

        <label className="form-label">
          <span>Rückmeldung bevorzugt per</span>
          <select className="field" name="preferredContact" defaultValue="E-Mail">
            <option>E-Mail</option>
            <option>Telefon</option>
            <option>Egal</option>
          </select>
        </label>
      </fieldset>

      <fieldset className="form-group">
        <legend className="form-group__legend">Ihre Anfrage</legend>
        <div className="form-row">
          <label className="form-label">
            <span>Anliegen *</span>
            <select className="field" name="subject" required defaultValue="">
              <option value="" disabled>
                Bitte wählen
              </option>
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="form-label">
            <span>Verkehrsträger</span>
            <select className="field" name="transport" defaultValue="Noch offen">
              {transports.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label className="form-label">
            <span>Art der Güter</span>
            <input className="field" name="goods" placeholder="z. B. Maschinenteile, Lithiumbatterien" />
          </label>
          <label className="form-label">
            <span>Gewicht / Maße</span>
            <input className="field" name="weight" placeholder="z. B. 1.200 kg, 2 × 1,2 × 1,5 m" />
          </label>
        </div>

        <label className="form-label">
          <span>Gewünschter Termin</span>
          <input className="field" type="date" name="deadline" />
        </label>

        <label className="form-label">
          <span>Nachricht *</span>
          <textarea
            className="field field-area"
            name="message"
            required
            defaultValue={prefill}
            placeholder="Beschreiben Sie kurz Ihr Vorhaben — Zielort, Besonderheiten, Fristen."
          />
        </label>
      </fieldset>

      <label className="form-consent">
        <input type="checkbox" name="consent" value="ja" required />
        <span>
          Ich habe die <Link href="/datenschutz">Datenschutzerklärung</Link> gelesen und stimme der
          Verarbeitung meiner Angaben zur Bearbeitung der Anfrage zu. *
        </span>
      </label>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Senden…" : "Anfrage absenden"}
        </button>
        <span className="form-hint">* Pflichtfeld</span>
      </div>

      {state.message ? (
        <p role="status" className="form-msg form-msg--ok">
          {state.message}
        </p>
      ) : null}
      {state.error ? (
        <div role="alert" className="form-msg form-msg--err">
          <p style={{ margin: 0 }}>{state.error}</p>
          {state.mailto ? (
            <>
              <p style={{ margin: "8px 0 0" }}>
                Ihre Angaben sind erhalten — senden Sie sie mit einem Klick aus Ihrem
                E-Mail-Programm, oder rufen Sie uns an.
              </p>
              <div className="form-msg__actions">
                <a className="btn btn-primary" href={state.mailto}>
                  Anfrage per E-Mail senden
                </a>
                <a className="btn btn-outline" href="tel:+498997594591">
                  +49 (0)89 975 945 91
                </a>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
