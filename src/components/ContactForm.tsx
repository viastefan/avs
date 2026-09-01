"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { submitContact, type ContactState } from "@/app/actions/kontakt";
import { contactWays, subjects, transports, urgencies } from "@/lib/enquiry-options";

const initial: ContactState = { ok: false };



/** Phones drop the in-field label and let the field carry its name as the
 *  placeholder instead — one line of text per field, so the control can be
 *  full width and comfortably tall. Desktop keeps the label inside the
 *  surface, where it survives being filled in. */
function useCompact() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return compact;
}

type FieldShellProps = {
  label: string;
  compact: boolean;
  children: React.ReactNode;
  select?: boolean;
  error?: string;
};

function FieldShell({ label, compact, children, select, error }: FieldShellProps) {
  return (
    <div className="ff-wrap">
      <label className={`ff${select ? " ff--select" : ""}${error ? " ff--invalid" : ""}`}>
        <span className={compact ? "sr-only" : "ff__label"}>{label}</span>
        {children}
      </label>
      {error ? <span className="ff__error">{error}</span> : null}
    </div>
  );
}

type TextFieldProps = {
  label: string;
  name: string;
  compact: boolean;
  example?: string;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "placeholder" | "className">;

function TextField({ label, name, compact, example, error, ...rest }: TextFieldProps) {
  return (
    <FieldShell label={label} compact={compact} error={error}>
      <input
        className="ff__input"
        name={name}
        placeholder={compact ? label : example}
        {...rest}
      />
    </FieldShell>
  );
}

function SelectField({
  label,
  name,
  compact,
  options,
  defaultValue,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  compact: boolean;
  options: readonly string[];
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <FieldShell label={label} compact={compact} select>
      <select name={name} required={required} defaultValue={defaultValue ?? ""}>
        {defaultValue === undefined ? (
          <option value="" disabled>
            {placeholder ?? (compact ? label : "Bitte wählen")}
          </option>
        ) : null}
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </FieldShell>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const prefill = useSearchParams().get("anfrage") ?? "";
  const compact = useCompact();
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
          <TextField label="Vorname" name="firstName" compact={compact} example="Max" required autoComplete="given-name" />
          <TextField label="Nachname" name="lastName" compact={compact} example="Mustermann" required autoComplete="family-name" />
        </div>

        <TextField
          label="E-Mail"
          name="email"
          compact={compact}
          example="max@firma.de"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          error={emailLooksWrong ? "Bitte prüfen Sie die Adresse." : undefined}
        />

        <div className="form-row">
          <TextField
            label="Telefon (optional)"
            name="phone"
            compact={compact}
            example="+49 89 …"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
          />
          <TextField
            label="Unternehmen (optional)"
            name="company"
            compact={compact}
            example="Firma GmbH"
            autoComplete="organization"
          />
        </div>

        <SelectField label="Anliegen" name="subject" compact={compact} options={subjects} required />

        <FieldShell label="Ihre Nachricht" compact={compact}>
          <textarea
            name="message"
            required
            defaultValue={prefill}
            placeholder={
              compact
                ? "Ihre Nachricht — was, wohin, bis wann?"
                : "Was soll verpackt werden, wohin geht es, bis wann brauchen Sie es?"
            }
          />
        </FieldShell>
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
            <SelectField
              label="Verkehrsträger"
              name="transport"
              compact={compact}
              options={transports}
              defaultValue="Noch offen"
            />
            <TextField label="Zielort" name="destination" compact={compact} example="z. B. Singapur" />
          </div>

          <div className="form-row">
            <TextField
              label="Art der Güter"
              name="goods"
              compact={compact}
              example="z. B. Prüfstand, Lithiumbatterien"
            />
            <TextField
              label="Gewicht / Maße"
              name="weight"
              compact={compact}
              example="z. B. 1.800 kg, 2 × 1,2 × 1,5 m"
            />
          </div>

          <div className="form-row">
            <TextField
              label="Stückzahl"
              name="quantity"
              compact={compact}
              example="z. B. 4 Packstücke"
              inputMode="numeric"
            />
            <TextField
              label="Gefahrgut / UN-Nummer"
              name="unNumber"
              compact={compact}
              example="z. B. UN 3480"
            />
          </div>

          <div className="form-row">
            <SelectField
              label="Wie eilig ist es?"
              name="urgency"
              compact={compact}
              options={urgencies}
              defaultValue="Keine feste Frist"
            />
            {/* A date control has no placeholder to fall back on, so the
                label stays visible on every width. */}
            <FieldShell label="Gewünschter Termin" compact={false}>
              <input className="ff__input" type="date" name="deadline" />
            </FieldShell>
          </div>

          <SelectField
            label="Rückmeldung bevorzugt per"
            name="preferredContact"
            compact={compact}
            options={contactWays}
            defaultValue="E-Mail"
          />
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
