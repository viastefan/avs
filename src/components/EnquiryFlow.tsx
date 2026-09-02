"use client";

import Link from "next/link";
import {
  useActionState,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { submitContact, type ContactState } from "@/app/actions/kontakt";
import { ENQUIRY_EVENT, type EnquiryDetail } from "@/lib/dialogs";
import {
  contactWays,
  subjectHints,
  subjects,
  transportHints,
  transports,
  urgencies,
} from "@/lib/enquiry-options";
import { site } from "@/lib/site";

/* ——————————————————————————————————————————————————————————————
   Ask in four steps, and mean it when we say the rest is optional.

   The earlier version asked eight questions and would not move on until
   each was answered — which is exactly backwards for the person this is
   built for: someone standing next to a crate who does not yet know the
   measurements, the transport mode or the deadline. Two things are
   genuinely needed, an address to answer and a sentence about the goods.
   Everything else is offered, never demanded.

   The description box is the centre of gravity, not a field among many,
   and it can write itself: rough notes go to Claude and come back as a
   proper enquiry, with a short list of what is still missing.
   —————————————————————————————————————————————————————————————— */

type Data = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  preferredContact: string;
  /** Several may apply, and none is a valid answer. */
  subjects: string[];
  goods: string;
  message: string;
  transport: string;
  destination: string;
  weight: string;
  quantity: string;
  unNumber: string;
  urgency: string;
  deadline: string;
};

const EMPTY: Data = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  preferredContact: "E-Mail",
  subjects: [],
  goods: "",
  message: "",
  transport: "",
  destination: "",
  weight: "",
  quantity: "",
  unNumber: "",
  urgency: "",
  deadline: "",
};

const STEPS = ["brief", "reach", "detail", "review"] as const;
type StepId = (typeof STEPS)[number];

/** Steps a visitor may walk straight past. */
const OPTIONAL: StepId[] = ["detail"];

const DRAFT_KEY = "avs:enquiry-draft";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function problem(step: StepId, d: Data): string | null {
  switch (step) {
    case "brief":
      if (!d.message.trim())
        return "Ein Satz genügt — was soll verpackt werden?";
      return null;
    case "reach":
      if (!d.email.trim()) return "Ohne E-Mail können wir nicht antworten.";
      if (!isEmail(d.email.trim())) return "Diese Adresse sieht nicht vollständig aus.";
      if (d.preferredContact === "Telefon" && !d.phone.trim())
        return "Für einen Rückruf brauchen wir Ihre Telefonnummer.";
      return null;
    default:
      return null;
  }
}

function Field({
  label,
  value,
  onChange,
  autoFocus,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "className">) {
  return (
    <label className="ff">
      <span className="ff__label">{label}</span>
      <input
        className="ff__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-autofocus={autoFocus ? "" : undefined}
        {...rest}
      />
    </label>
  );
}

/** Multi-select: several services may apply, and picking none is allowed. */
function Picks({
  options,
  hints,
  value,
  onToggle,
}: {
  options: readonly string[];
  hints?: Record<string, string>;
  value: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="wiz-choice wiz-choice--multi" role="group">
      {options.map((option) => {
        const on = value.includes(option);
        return (
          <button
            key={option}
            type="button"
            role="checkbox"
            aria-checked={on}
            className={`wiz-choice__item${on ? " wiz-choice__item--on" : ""}`}
            onClick={() => onToggle(option)}
          >
            <span className="wiz-choice__body">
              <span className="wiz-choice__title">{option}</span>
              {hints?.[option] ? <span className="wiz-choice__text">{hints[option]}</span> : null}
            </span>
            <span className="wiz-choice__mark" aria-hidden>
              <svg viewBox="0 0 16 16">
                <path d="M3 8.4 6.3 11.6 13 4.6" />
              </svg>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Chips({
  options,
  value,
  onPick,
  label,
}: {
  options: readonly string[];
  value: string;
  onPick: (v: string) => void;
  label: string;
}) {
  return (
    <div className="wiz-chips" role="radiogroup" aria-label={label}>
      <span className="wiz-chips__label">{label}</span>
      <span className="wiz-chips__row">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            className={`wiz-chip${value === option ? " wiz-chip--on" : ""}`}
            onClick={() => onPick(option)}
          >
            {option}
          </button>
        ))}
      </span>
    </div>
  );
}

type Draft = { text: string; missing: string[] };

/** The writing help. Rough notes in, a usable enquiry out — the visitor
 *  keeps the last word: nothing replaces their text until they accept it. */
function WritingHelp({
  notes,
  services,
  onAccept,
}: {
  notes: string;
  services: string[];
  onAccept: (text: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [failed, setFailed] = useState<string | null>(null);
  const [gone, setGone] = useState(false);

  const run = useCallback(async () => {
    setBusy(true);
    setFailed(null);
    setDraft(null);
    try {
      const res = await fetch("/api/anfrage-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, services }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.status === 503) {
        // Not configured on this deployment — stop offering it entirely.
        setGone(true);
        return;
      }
      if (!res.ok) {
        setFailed(body?.error ?? "Das hat gerade nicht geklappt.");
        return;
      }
      setDraft({ text: String(body.text ?? ""), missing: body.missing ?? [] });
    } catch {
      setFailed("Keine Verbindung — schreiben Sie gern selbst weiter.");
    } finally {
      setBusy(false);
    }
  }, [notes, services]);

  if (gone) return null;

  return (
    <div className="wiz-ai">
      <div className="wiz-ai__row">
        <button
          type="button"
          className="wiz-ai__go"
          onClick={run}
          disabled={busy || notes.trim().length < 10}
        >
          <span className="wiz-ai__spark" aria-hidden>
            <svg viewBox="0 0 24 24">
              <path d="M12 3.2 13.7 9l5.8 1.7-5.8 1.7L12 18.2 10.3 12.4 4.5 10.7 10.3 9z" />
              <path d="M18.4 3.4 19 5.2l1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6z" />
            </svg>
          </span>
          {busy ? "Wird formuliert…" : draft ? "Neu formulieren" : "Für mich formulieren"}
        </button>
        <span className="wiz-ai__note">
          {notes.trim().length < 10
            ? "Ein paar Stichworte genügen — den Rest übernehmen wir."
            : "Aus Ihren Stichworten wird eine Anfrage, die wir kalkulieren können."}
        </span>
      </div>

      {failed ? (
        <p className="wiz-ai__err" role="alert">
          {failed}
        </p>
      ) : null}

      {draft ? (
        <div className="wiz-ai__draft">
          <p className="wiz-ai__draft-label">Vorschlag</p>
          <p className="wiz-ai__draft-text">{draft.text}</p>
          {draft.missing.length ? (
            <p className="wiz-ai__missing">
              Hilfreich wäre noch: {draft.missing.join(" · ")}
            </p>
          ) : null}
          <div className="wiz-ai__actions">
            <button
              type="button"
              className="btn btn-primary wiz-ai__take"
              onClick={() => {
                onAccept(draft.text);
                setDraft(null);
              }}
            >
              Übernehmen
            </button>
            <button type="button" className="wiz-ai__drop" onClick={() => setDraft(null)}>
              Verwerfen
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ——— The flow ——— */

export function EnquiryFlow() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [data, setData] = useState<Data>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [state, formAction, pending] = useActionState<ContactState, FormData>(submitContact, {
    ok: false,
  });

  const panelRef = useRef<HTMLFormElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();

  const step = STEPS[index];
  const done = state.ok && !!state.message;
  const set = useCallback(
    <K extends keyof Data>(key: K, value: Data[K]) => setData((d) => ({ ...d, [key]: value })),
    [],
  );

  const toggleSubject = useCallback((value: string) => {
    setData((d) => ({
      ...d,
      subjects: d.subjects.includes(value)
        ? d.subjects.filter((s) => s !== value)
        : [...d.subjects, value],
    }));
  }, []);

  useEffect(() => {
    if (!open) return;
    try {
      if (done) sessionStorage.removeItem(DRAFT_KEY);
      else sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ data, index }));
    } catch {
      /* private mode — carry on without a draft */
    }
  }, [open, data, index, done]);

  const close = useCallback(() => {
    setOpen(false);
    restoreFocus.current?.focus();
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<EnquiryDetail>).detail ?? {};
      restoreFocus.current = document.activeElement as HTMLElement | null;

      let draft: Data = EMPTY;
      let at = 0;
      try {
        const raw = sessionStorage.getItem(DRAFT_KEY);
        if (raw) {
          const saved = JSON.parse(raw) as { data?: Partial<Data>; index?: number };
          draft = { ...EMPTY, ...saved.data };
          if (!Array.isArray(draft.subjects)) draft.subjects = [];
          at = Math.min(Math.max(saved.index ?? 0, 0), STEPS.length - 1);
        }
      } catch {
        /* nothing worth restoring */
      }

      if (detail.message && !draft.message) draft = { ...draft, message: detail.message };
      if (detail.subject && !draft.subjects.includes(detail.subject))
        draft = { ...draft, subjects: [...draft.subjects, detail.subject] };

      setData(draft);
      setIndex(at);
      setError(null);
      setOpen(true);
    };
    window.addEventListener(ENQUIRY_EVENT, onOpen);
    return () => window.removeEventListener(ENQUIRY_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open || done) return;
    const target = bodyRef.current?.querySelector<HTMLElement>("[data-autofocus]");
    const id = setTimeout(() => target?.focus({ preventScroll: true }), 220);
    return () => clearTimeout(id);
  }, [open, index, done]);

  const goTo = useCallback((next: number, direction: "fwd" | "back") => {
    setDir(direction);
    setError(null);
    setIndex(next);
  }, []);

  const next = useCallback(() => {
    const found = problem(step, data);
    if (found) {
      setError(found);
      return;
    }
    if (index < STEPS.length - 1) goTo(index + 1, "fwd");
  }, [step, data, index, goTo]);

  const back = useCallback(() => {
    if (index > 0) goTo(index - 1, "back");
  }, [index, goTo]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter" || e.shiftKey) return;
    const target = e.target as HTMLElement;
    if (target.tagName === "TEXTAREA" || target.tagName === "BUTTON") return;
    if (step === "review") return;

    e.preventDefault();
    const fields = Array.from(
      bodyRef.current?.querySelectorAll<HTMLElement>(".wiz__fields input, .wiz__fields textarea") ??
        [],
    );
    const at = fields.indexOf(target);
    if (at > -1 && at < fields.length - 1) fields[at + 1].focus();
    else next();
  };

  /* What actually goes to the server: the subject list becomes the single
     line AVS reads in the mail. */
  const payload: Record<string, string> = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    company: data.company,
    preferredContact: data.preferredContact,
    subject: data.subjects.join(", "),
    goods: data.goods,
    message: data.message,
    transport: data.transport,
    destination: data.destination,
    weight: data.weight,
    quantity: data.quantity,
    unNumber: data.unNumber,
    urgency: data.urgency,
    deadline: data.deadline,
  };

  const summaryRows: { label: string; value: string; step: StepId }[] = [
    { label: "Leistungen", value: data.subjects.join(" · "), step: "brief" },
    { label: "Name", value: `${data.firstName} ${data.lastName}`.trim(), step: "reach" },
    { label: "E-Mail", value: data.email, step: "reach" },
    { label: "Telefon", value: data.phone, step: "reach" },
    { label: "Unternehmen", value: data.company, step: "reach" },
    { label: "Rückmeldung per", value: data.preferredContact, step: "reach" },
    { label: "Verkehrsträger", value: data.transport, step: "detail" },
    { label: "Zielort", value: data.destination, step: "detail" },
    { label: "Gewicht / Maße", value: data.weight, step: "detail" },
    { label: "Stückzahl", value: data.quantity, step: "detail" },
    { label: "UN-Nummer", value: data.unNumber, step: "detail" },
    {
      label: "Termin",
      value: [data.urgency, data.deadline].filter(Boolean).join(" · "),
      step: "detail",
    },
  ];
  const summary = summaryRows.filter((row) => row.value);

  const heads: Record<StepId, { kicker: string; question: ReactNode; hint?: string }> = {
    brief: {
      kicker: "Schritt 1 von 4",
      question: "Was sollen wir für Sie verpacken?",
      hint: "Ein Satz reicht. Maße, Gewicht und Termin dürfen offen bleiben — danach fragen wir nur, wenn Sie mögen.",
    },
    reach: {
      kicker: "Schritt 2 von 4",
      question: "Wohin dürfen wir antworten?",
      hint: "Nur die E-Mail brauchen wir wirklich. Alles Weitere ist freiwillig.",
    },
    detail: {
      kicker: "Schritt 3 von 4 · freiwillig",
      question: "Wissen Sie schon mehr?",
      hint: "Jede Angabe hier spart eine Rückfrage. Keine ist nötig — Sie können den Schritt einfach überspringen.",
    },
    review: {
      kicker: "Letzter Schritt",
      question: "Passt das so?",
      hint: "Ein Klick auf eine Zeile führt zurück zur Angabe.",
    },
  };

  const head = heads[step];
  const progress = ((index + 1) / STEPS.length) * 100;

  return (
    <div className={`wiz${open ? " wiz--open" : ""}`} aria-hidden={!open}>
      <button type="button" className="wiz__backdrop" tabIndex={-1} aria-hidden onClick={close} />

      <form
        ref={panelRef}
        action={formAction}
        onKeyDown={onKeyDown}
        className="wiz__panel"
        role="dialog"
        aria-modal={open}
        aria-labelledby={titleId}
        noValidate
      >
        {/* Bots fill hidden fields; the action answers them as if all was well. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: -9999, opacity: 0, height: 0, width: 0 }}
        />
        {Object.entries(payload).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
        <input type="hidden" name="consent" value={consent ? "ja" : ""} />

        {done ? (
          <div className="wiz__done" role="status">
            <span className="wiz__done-mark" aria-hidden>
              <svg viewBox="0 0 24 24">
                <path d="M4 12.5 9.5 18 20 7" />
              </svg>
            </span>
            <h2 className="wiz__q" id={titleId}>
              Anfrage ist raus
            </h2>
            <p className="wiz__hint">{state.message}</p>
            <div className="wiz__done-facts">
              <div>
                <span>Antwort</span>
                <strong>werktags</strong>
              </div>
              <div>
                <span>Eilig?</span>
                <strong>
                  <a href={site.phoneHref}>{site.phone}</a>
                </strong>
              </div>
            </div>
            <button type="button" className="btn btn-primary wiz__next" onClick={close}>
              Schließen
            </button>
          </div>
        ) : (
          <>
            <div className="wiz__head">
              <div className="wiz__bar" aria-hidden>
                <span style={{ transform: `scaleX(${progress / 100})` }} />
              </div>
              <div className="wiz__head-row">
                <button
                  type="button"
                  className="wiz__back"
                  onClick={back}
                  disabled={index === 0}
                  aria-label="Ein Schritt zurück"
                >
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d="M15 5l-7 7 7 7" />
                  </svg>
                </button>
                <span className="wiz__count">
                  Schritt {index + 1} von {STEPS.length}
                </span>
                <button
                  type="button"
                  className="wiz__close"
                  onClick={close}
                  aria-label="Anfrage schließen"
                >
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="wiz__body" ref={bodyRef}>
              <div key={step} className={`wiz__step wiz__step--${dir}`}>
                <p className="wiz__kicker">{head.kicker}</p>
                <h2 className="wiz__q" id={titleId}>
                  {head.question}
                </h2>
                {head.hint ? <p className="wiz__hint">{head.hint}</p> : null}

                <div className="wiz__fields">
                  {step === "brief" ? (
                    <>
                      <label className="ff wiz-brief">
                        <span className="ff__label">Ihre Sendung</span>
                        <textarea
                          className="wiz-brief__area"
                          value={data.message}
                          placeholder={
                            "z. B. Prüfstand muss nach Seoul, ungefähr 1,8 t, Maße kenne ich noch nicht"
                          }
                          onChange={(e) => set("message", e.target.value)}
                          data-autofocus=""
                        />
                      </label>

                      <WritingHelp
                        notes={data.message}
                        services={data.subjects}
                        onAccept={(text) => set("message", text)}
                      />

                      <details className="wiz-more">
                        <summary>
                          Passende Leistung wählen
                          <span className="wiz-more__hint">
                            {data.subjects.length
                              ? `${data.subjects.length} gewählt`
                              : "optional — mehrere möglich"}
                          </span>
                        </summary>
                        <Picks
                          options={subjects}
                          hints={subjectHints}
                          value={data.subjects}
                          onToggle={toggleSubject}
                        />
                      </details>
                    </>
                  ) : null}

                  {step === "reach" ? (
                    <>
                      <Field
                        label="E-Mail"
                        type="email"
                        inputMode="email"
                        value={data.email}
                        onChange={(v) => set("email", v)}
                        autoComplete="email"
                        placeholder="max@firma.de"
                        autoFocus
                      />
                      <div className="wiz-pair">
                        <Field
                          label="Vorname (optional)"
                          value={data.firstName}
                          onChange={(v) => set("firstName", v)}
                          autoComplete="given-name"
                          placeholder="Max"
                        />
                        <Field
                          label="Nachname (optional)"
                          value={data.lastName}
                          onChange={(v) => set("lastName", v)}
                          autoComplete="family-name"
                          placeholder="Mustermann"
                        />
                      </div>
                      <div className="wiz-pair">
                        <Field
                          label="Telefon (optional)"
                          type="tel"
                          inputMode="tel"
                          value={data.phone}
                          onChange={(v) => set("phone", v)}
                          autoComplete="tel"
                          placeholder="+49 89 …"
                        />
                        <Field
                          label="Unternehmen (optional)"
                          value={data.company}
                          onChange={(v) => set("company", v)}
                          autoComplete="organization"
                          placeholder="Firma GmbH"
                        />
                      </div>
                      <Chips
                        label="Rückmeldung bevorzugt per"
                        options={contactWays}
                        value={data.preferredContact}
                        onPick={(v) => set("preferredContact", v)}
                      />
                    </>
                  ) : null}

                  {step === "detail" ? (
                    <>
                      <Chips
                        label="Verkehrsträger"
                        options={transports}
                        value={data.transport}
                        onPick={(v) => set("transport", v)}
                      />
                      {data.transport && transportHints[data.transport] ? (
                        <p className="wiz-note">{transportHints[data.transport]}</p>
                      ) : null}
                      <div className="wiz-pair">
                        <Field
                          label="Zielort"
                          value={data.destination}
                          onChange={(v) => set("destination", v)}
                          placeholder="z. B. Singapur"
                        />
                        <Field
                          label="Gewicht / Maße"
                          value={data.weight}
                          onChange={(v) => set("weight", v)}
                          placeholder="z. B. 1.800 kg"
                        />
                      </div>
                      <div className="wiz-pair">
                        <Field
                          label="Stückzahl"
                          value={data.quantity}
                          onChange={(v) => set("quantity", v)}
                          inputMode="numeric"
                          placeholder="z. B. 4 Packstücke"
                        />
                        <Field
                          label="Gefahrgut / UN-Nummer"
                          value={data.unNumber}
                          onChange={(v) => set("unNumber", v)}
                          placeholder="z. B. UN 3480"
                        />
                      </div>
                      <Chips
                        label="Wie eilig ist es?"
                        options={urgencies}
                        value={data.urgency}
                        onPick={(v) => set("urgency", v)}
                      />
                    </>
                  ) : null}

                  {step === "review" ? (
                    <>
                      <div className="wiz-review__note">
                        <p className="wiz-review__note-label">Ihre Anfrage</p>
                        <p className="wiz-review__note-text">{data.message}</p>
                        <button
                          type="button"
                          className="wiz-review__edit-note"
                          onClick={() => goTo(0, "back")}
                        >
                          Ändern
                        </button>
                      </div>

                      {summary.length ? (
                        <dl className="wiz-review">
                          {summary.map((row) => (
                            <button
                              key={row.label}
                              type="button"
                              className="wiz-review__row"
                              onClick={() => goTo(STEPS.indexOf(row.step), "back")}
                            >
                              <dt>{row.label}</dt>
                              <dd>{row.value}</dd>
                              <span className="wiz-review__edit" aria-hidden>
                                Ändern
                              </span>
                            </button>
                          ))}
                        </dl>
                      ) : null}

                      <label className="form-consent wiz__consent">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                        />
                        <span>
                          Ich habe die <Link href="/datenschutz">Datenschutzerklärung</Link> gelesen
                          und stimme der Verarbeitung meiner Angaben zu.
                        </span>
                      </label>
                    </>
                  ) : null}
                </div>

                {error ? (
                  <p className="wiz__error" role="alert">
                    {error}
                  </p>
                ) : null}

                {state.error ? (
                  <div role="alert" className="form-msg form-msg--err wiz__server-error">
                    <p style={{ margin: 0 }}>{state.error}</p>
                    {state.mailto ? (
                      <div className="form-msg__actions">
                        <a className="btn btn-primary" href={state.mailto}>
                          Anfrage per E-Mail senden
                        </a>
                        <a className="btn btn-outline" href={site.phoneHref}>
                          {site.phone}
                        </a>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="wiz__foot">
              {step === "review" ? (
                <button
                  type="submit"
                  className="btn btn-primary wiz__next"
                  disabled={pending || !consent}
                >
                  {pending ? "Wird gesendet…" : "Anfrage senden"}
                </button>
              ) : (
                <button type="button" className="btn btn-primary wiz__next" onClick={next}>
                  Weiter
                  <svg viewBox="0 0 16 16" aria-hidden>
                    <path d="M2 8h11M9 4l4 4-4 4" />
                  </svg>
                </button>
              )}

              {OPTIONAL.includes(step) ? (
                <button type="button" className="wiz__skip" onClick={() => goTo(index + 1, "fwd")}>
                  Überspringen — weiß ich noch nicht
                </button>
              ) : (
                <p className="wiz__foot-note">
                  {step === "review"
                    ? "Ihre Angaben gehen nur an uns."
                    : "Antwort werktags · kein Newsletter"}
                </p>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
