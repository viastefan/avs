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
   One question per screen.

   The contact page keeps the whole form on one sheet — that is the right
   shape for someone who already knows what they want to say. This flow is
   for everyone else: it asks in the order a packer would ask on the
   phone, so nobody has to decide up front which of sixteen fields apply
   to them. Every step after the first three can be answered in a second,
   and the three that matter least can be skipped outright.
   —————————————————————————————————————————————————————————————— */

type Data = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  preferredContact: string;
  subject: string;
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
  subject: "",
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

const STEPS = ["name", "reach", "subject", "goods", "route", "size", "timing", "review"] as const;
type StepId = (typeof STEPS)[number];

/** Steps a visitor may pass without answering anything. */
const OPTIONAL: StepId[] = ["size"];

const DRAFT_KEY = "avs:enquiry-draft";

/** Long enough for the pressed state to register before the step moves on,
 *  short enough that it still feels like the choice did it. */
const ADVANCE_MS = 260;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function problem(step: StepId, d: Data): string | null {
  switch (step) {
    case "name":
      if (!d.firstName.trim() || !d.lastName.trim()) return "Bitte Vor- und Nachnamen angeben.";
      return null;
    case "reach":
      if (!d.email.trim()) return "Ohne E-Mail können wir nicht antworten.";
      if (!isEmail(d.email.trim())) return "Diese Adresse sieht nicht vollständig aus.";
      if (d.preferredContact === "Telefon" && !d.phone.trim())
        return "Für einen Rückruf brauchen wir Ihre Telefonnummer.";
      return null;
    case "subject":
      if (!d.subject) return "Bitte wählen Sie ein Anliegen.";
      return null;
    case "goods":
      if (!d.message.trim() && !d.goods.trim())
        return "Ein Satz zur Sendung genügt uns fürs Erste.";
      return null;
    case "route":
      if (!d.transport) return "Bitte wählen Sie einen Verkehrsträger — „Noch offen“ zählt auch.";
      return null;
    case "timing":
      if (!d.urgency) return "Bitte sagen Sie uns, wie eilig es ist.";
      return null;
    default:
      return null;
  }
}

/* ——— Field primitives ——— */

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

function Area({
  label,
  value,
  onChange,
  placeholder,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="ff">
      <span className="ff__label">{label}</span>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        data-autofocus={autoFocus ? "" : undefined}
      />
    </label>
  );
}

function Choice({
  options,
  hints,
  value,
  onPick,
}: {
  options: readonly string[];
  hints?: Record<string, string>;
  value: string;
  onPick: (v: string) => void;
}) {
  return (
    <div className="wiz-choice" role="radiogroup">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          className={`wiz-choice__item${value === option ? " wiz-choice__item--on" : ""}`}
          onClick={() => onPick(option)}
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
      ))}
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
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleId = useId();

  const step = STEPS[index];
  const done = state.ok && !!state.message;
  const set = useCallback(
    <K extends keyof Data>(key: K, value: Data[K]) => setData((d) => ({ ...d, [key]: value })),
    [],
  );

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

  /* A visitor who closes the sheet mid-way and comes back — a look at the
     norms, a phone call — should not start over. Reading the draft when the
     sheet opens rather than on mount keeps the server-rendered markup and
     the first client render identical. The draft never leaves the tab. */
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
          at = Math.min(Math.max(saved.index ?? 0, 0), STEPS.length - 1);
        }
      } catch {
        /* nothing worth restoring */
      }

      /* What the visitor just typed wins over a stale draft, but it must not
         overwrite a description they already wrote here. */
      if (detail.message && !draft.message) draft = { ...draft, message: detail.message };
      if (detail.subject) draft = { ...draft, subject: detail.subject };

      setData(draft);
      setIndex(at);
      setError(null);
      setOpen(true);
    };
    window.addEventListener(ENQUIRY_EVENT, onOpen);
    return () => window.removeEventListener(ENQUIRY_EVENT, onOpen);
  }, []);

  /* Escape closes, Tab stays inside — the page behind is inert while the
     sheet is up, so focus must not be able to wander into it. */
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

  /* Put the caret in the first field of a step that has one. Choice steps
     deliberately get no focus — on a phone that would throw the keyboard
     up over the very options being offered. */
  useEffect(() => {
    if (!open || done) return;
    const target = bodyRef.current?.querySelector<HTMLElement>("[data-autofocus]");
    const id = setTimeout(() => target?.focus({ preventScroll: true }), 220);
    return () => clearTimeout(id);
  }, [open, index, done]);

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  }, []);

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

  /** Picking an option is the answer — no reason to also press Weiter. */
  const pickAndAdvance = useCallback(
    <K extends keyof Data>(key: K, value: Data[K]) => {
      set(key, value);
      setError(null);
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => {
        setDir("fwd");
        setIndex((i) => Math.min(i + 1, STEPS.length - 1));
      }, ADVANCE_MS);
    },
    [set],
  );

  /* Enter walks the step: to the next field if there is one, otherwise on
     to the next question. It keeps its usual meaning inside the message box
     (a new line) and on buttons (press). The review step is the only one
     that may actually submit the form. */
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

  const summaryRows: { label: string; value: string; step: StepId }[] = [
    { label: "Name", value: `${data.firstName} ${data.lastName}`.trim(), step: "name" },
    { label: "E-Mail", value: data.email, step: "reach" },
    { label: "Telefon", value: data.phone, step: "reach" },
    { label: "Unternehmen", value: data.company, step: "reach" },
    { label: "Rückmeldung per", value: data.preferredContact, step: "reach" },
    { label: "Anliegen", value: data.subject, step: "subject" },
    { label: "Güter", value: data.goods, step: "goods" },
    { label: "Verkehrsträger", value: data.transport, step: "route" },
    { label: "Zielort", value: data.destination, step: "route" },
    { label: "Gewicht / Maße", value: data.weight, step: "size" },
    { label: "Stückzahl", value: data.quantity, step: "size" },
    { label: "UN-Nummer", value: data.unNumber, step: "size" },
    {
      label: "Termin",
      value: [data.urgency, data.deadline].filter(Boolean).join(" · "),
      step: "timing",
    },
  ];
  const summary = summaryRows.filter((row) => row.value);

  const heads: Record<StepId, { kicker: string; question: ReactNode; hint?: string }> = {
    name: {
      kicker: "Schritt 1 · Kontakt",
      question: "Wie dürfen wir Sie ansprechen?",
      hint: "Damit die Rückmeldung an der richtigen Stelle landet.",
    },
    reach: {
      kicker: "Schritt 2 · Kontakt",
      question: "Wo erreichen wir Sie?",
      hint: "Bei Fragen zur Klassifizierung klärt ein Anruf oft mehr als drei E-Mails.",
    },
    subject: {
      kicker: "Schritt 3 · Anliegen",
      question: "Worum geht es?",
      hint: "Eine Auswahl genügt — Details kommen gleich.",
    },
    goods: {
      kicker: "Schritt 4 · Sendung",
      question: "Was sollen wir verpacken?",
      hint: "Ein Satz reicht: Maschine, Elektronik, Gefahrgut, Ersatzteile.",
    },
    route: {
      kicker: "Schritt 5 · Weg",
      question: "Wohin geht die Sendung?",
      hint: "Der Verkehrsträger entscheidet über Vorschrift und Bauart.",
    },
    size: {
      kicker: "Schritt 6 · Umfang",
      question: "Wie groß ist die Sendung?",
      hint: "Schätzwerte sind völlig in Ordnung — oder überspringen Sie den Schritt.",
    },
    timing: {
      kicker: "Schritt 7 · Termin",
      question: "Wie eilig ist es?",
      hint: "Danach richtet sich, ob wir Material bestellen oder aus dem Lager gehen.",
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
      <button
        type="button"
        className="wiz__backdrop"
        tabIndex={-1}
        aria-hidden
        onClick={close}
      />

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
        {Object.entries(data).map(([key, value]) => (
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
            <p className="wiz__hint">
              Wenn es eilt, erreichen Sie uns direkt unter{" "}
              <a href={site.phoneHref}>{site.phone}</a>.
            </p>
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
                  {step === "name" ? (
                    <>
                      <Field
                        label="Vorname"
                        value={data.firstName}
                        onChange={(v) => set("firstName", v)}
                        autoComplete="given-name"
                        placeholder="Max"
                        autoFocus
                      />
                      <Field
                        label="Nachname"
                        value={data.lastName}
                        onChange={(v) => set("lastName", v)}
                        autoComplete="family-name"
                        placeholder="Mustermann"
                      />
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
                      <Chips
                        label="Rückmeldung bevorzugt per"
                        options={contactWays}
                        value={data.preferredContact}
                        onPick={(v) => set("preferredContact", v)}
                      />
                    </>
                  ) : null}

                  {step === "subject" ? (
                    <Choice
                      options={subjects}
                      hints={subjectHints}
                      value={data.subject}
                      onPick={(v) => pickAndAdvance("subject", v)}
                    />
                  ) : null}

                  {step === "goods" ? (
                    <>
                      <Field
                        label="Art der Güter"
                        value={data.goods}
                        onChange={(v) => set("goods", v)}
                        placeholder="z. B. Prüfstand, Lithiumbatterien"
                        autoFocus
                      />
                      <Area
                        label="Beschreibung"
                        value={data.message}
                        onChange={(v) => set("message", v)}
                        placeholder="Was ist besonders daran? Empfindlich, sperrig, temperaturgeführt?"
                      />
                    </>
                  ) : null}

                  {step === "route" ? (
                    <>
                      <Choice
                        options={transports}
                        hints={transportHints}
                        value={data.transport}
                        onPick={(v) => set("transport", v)}
                      />
                      <Field
                        label="Zielort (optional)"
                        value={data.destination}
                        onChange={(v) => set("destination", v)}
                        placeholder="z. B. Singapur"
                      />
                    </>
                  ) : null}

                  {step === "size" ? (
                    <>
                      <Field
                        label="Gewicht / Maße"
                        value={data.weight}
                        onChange={(v) => set("weight", v)}
                        placeholder="z. B. 1.800 kg, 2 × 1,2 × 1,5 m"
                        autoFocus
                      />
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
                    </>
                  ) : null}

                  {step === "timing" ? (
                    <>
                      <Choice
                        options={urgencies}
                        value={data.urgency}
                        onPick={(v) => set("urgency", v)}
                      />
                      <Field
                        label="Wunschtermin (optional)"
                        type="date"
                        value={data.deadline}
                        onChange={(v) => set("deadline", v)}
                      />
                    </>
                  ) : null}

                  {step === "review" ? (
                    <>
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

                      {data.message ? (
                        <div className="wiz-review__note">
                          <p className="wiz-review__note-label">Ihre Beschreibung</p>
                          <p className="wiz-review__note-text">{data.message}</p>
                        </div>
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
                  Überspringen
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
