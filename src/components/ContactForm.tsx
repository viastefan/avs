"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
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

const transports = ["Noch offen", "Luftfracht", "Seefracht", "Straßenfracht"];
const urgencies = ["Keine feste Frist", "Diese Woche", "Nächste Woche", "Diesen Monat"];
const contactWays = ["E-Mail", "Telefon", "Egal"];

/** One field, label inside the surface so it survives being filled in. */
function Field({
  label,
  children,
  select,
  error,
}: {
  label: string;
  children: React.ReactNode;
  select?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className={`ff${select ? " ff--select" : ""}${error ? " ff--invalid" : ""}`}>
        <span className="ff__label">{label}</span>
        {children}
      </label>
      {error ? <span className="ff__error">{error}</span> : null}
    </div>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const prefill = useSearchParams().get("anfrage") ?? "";
  const [more, setMore] = useState(false);
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const emailLooksWrong =
    touched && email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (state.ok && state.message) {
    return (
      <div className="form-panel form-done" role="status">
        <span className="form-done__mark" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12.5 9.5 18 20 7" />
          </svg>
        </span>
        <h2 className="form-done__title">Anfrage ist raus</h2>
        <p className="form-done__text">{state.message}</p>
        <p className="form-done__text">
          Wenn es eilt, erreichen Sie uns direkt unter{" "}
          <a href="tel:+498997594591">+49 (0)89 975 945 91</a>.
        </p>
      </div>
    );
  }

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

      <div className="form-stack">
        <div className="form-row">
          <Field label="Vorname">
            <input className="ff__input" name="firstName" required autoComplete="given-name" placeholder="Max" />
          </Field>
          <Field label="Nachname">
            <input className="ff__input" name="lastName" required autoComplete="family-name" placeholder="Mustermann" />
          </Field>
        </div>

        <Field label="E-Mail" error={emailLooksWrong ? "Bitte prüfen Sie die Adresse." : undefined}>
          <input
            className="ff__input"
            type="email"
            name="email"
            required
            inputMode="email"
            autoComplete="email"
            placeholder="max@firma.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
          />
        </Field>

        <div className="form-row">
          <Field label="Telefon (optional)">
            <input
              className="ff__input"
              type="tel"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+49 89 …"
            />
          </Field>
          <Field label="Unternehmen (optional)">
            <input className="ff__input" name="company" autoComplete="organization" placeholder="Firma GmbH" />
          </Field>
        </div>

        <Field label="Anliegen" select>
          <select name="subject" required defaultValue="">
            <option value="" disabled>
              Bitte wählen
            </option>
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>

        <Field label="Ihre Nachricht">
          <textarea
            name="message"
            required
            defaultValue={prefill}
            placeholder="Was soll verpackt werden, wohin geht es, bis wann brauchen Sie es?"
          />
        </Field>
      </div>

      <button
        type="button"
        className="form-more"
        aria-expanded={more}
        onClick={() => setMore((v) => !v)}
      >
        <span className={`form-more__icon${more ? " form-more__icon--open" : ""}`} aria-hidden />
        {more ? "Weniger Angaben" : "Angaben ergänzen — beschleunigt das Angebot"}
      </button>

      {more ? (
        <div className="form-stack form-stack--extra">
          <div className="form-row">
            <Field label="Verkehrsträger" select>
              <select name="transport" defaultValue="Noch offen">
                {transports.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Zielort">
              <input className="ff__input" name="destination" placeholder="z. B. Singapur" />
            </Field>
          </div>

          <div className="form-row">
            <Field label="Art der Güter">
              <input className="ff__input" name="goods" placeholder="z. B. Prüfstand, Lithiumbatterien" />
            </Field>
            <Field label="Gewicht / Maße">
              <input className="ff__input" name="weight" placeholder="z. B. 1.800 kg, 2 × 1,2 × 1,5 m" />
            </Field>
          </div>

          <div className="form-row">
            <Field label="Stückzahl">
              <input className="ff__input" name="quantity" inputMode="numeric" placeholder="z. B. 4 Packstücke" />
            </Field>
            <Field label="Gefahrgut / UN-Nummer">
              <input className="ff__input" name="unNumber" placeholder="z. B. UN 3480" />
            </Field>
          </div>

          <div className="form-row">
            <Field label="Wie eilig ist es?" select>
              <select name="urgency" defaultValue="Keine feste Frist">
                {urgencies.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </Field>
            <Field label="Gewünschter Termin">
              <input className="ff__input" type="date" name="deadline" />
            </Field>
          </div>

          <Field label="Rückmeldung bevorzugt per" select>
            <select name="preferredContact" defaultValue="E-Mail">
              {contactWays.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
        </div>
      ) : null}

      <label className="form-consent">
        <input type="checkbox" name="consent" value="ja" required />
        <span>
          Ich habe die <Link href="/datenschutz">Datenschutzerklärung</Link> gelesen und stimme der
          Verarbeitung meiner Angaben zu.
        </span>
      </label>

      <button type="submit" className="btn btn-primary form-submit" disabled={pending}>
        {pending ? "Wird gesendet…" : "Anfrage senden"}
      </button>

      <p className="form-hint">Wir melden uns werktags. Ihre Angaben gehen nur an uns.</p>

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
