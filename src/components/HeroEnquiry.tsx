"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Example enquiries, cycled word by word while the field is untouched. */
const examples = [
  "Prüfstand, 1.800 kg, nach Singapur",
  "Lithiumbatterien per Luftfracht",
  "Reinraum-Verpackung für Optik",
  "Schulung für unser Versandteam",
];

const WORD_MS = 190;
const HOLD_MS = 2100;

export function HeroEnquiry() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const [phrase, setPhrase] = useState(0);
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const idle = value.length === 0 && !focused;
  const words = examples[phrase].split(" ");

  useEffect(() => {
    if (!idle) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(words.length);
      return;
    }

    const clear = () => {
      if (timer.current) clearTimeout(timer.current);
    };

    if (shown < words.length) {
      timer.current = setTimeout(() => setShown((n) => n + 1), WORD_MS);
    } else if (!leaving) {
      timer.current = setTimeout(() => setLeaving(true), HOLD_MS);
    } else {
      timer.current = setTimeout(() => {
        setLeaving(false);
        setShown(0);
        setPhrase((p) => (p + 1) % examples.length);
      }, 420);
    }
    return clear;
  }, [idle, shown, leaving, words.length]);

  const start = (text: string) => {
    const q = text.trim();
    router.push(q ? `/kontakt?anfrage=${encodeURIComponent(q)}` : "/kontakt");
  };

  return (
    <div className="enquiry">
      <form
        className="enquiry__form"
        onSubmit={(e) => {
          e.preventDefault();
          start(value);
        }}
      >
        <label htmlFor="hero-enquiry" className="enquiry__label">
          Was sollen wir für Sie verpacken?
        </label>
        <div className="enquiry__row">
          <div className="enquiry__field">
            <input
              id="hero-enquiry"
              className="enquiry__input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              autoComplete="off"
              aria-describedby="hero-enquiry-hint"
            />
            {idle ? (
              <span className="enquiry__ghost" aria-hidden>
                {words.slice(0, shown).map((w, i) => (
                  <span
                    key={`${phrase}-${i}`}
                    className={`enquiry__word${leaving ? " enquiry__word--out" : ""}`}
                    style={{ animationDelay: leaving ? `${i * 40}ms` : undefined }}
                  >
                    {w}
                  </span>
                ))}
              </span>
            ) : null}
          </div>
          <button type="submit" className="enquiry__submit">
            Anfrage starten
            <svg viewBox="0 0 16 16" aria-hidden>
              <path d="M2 8h11M9 4l4 4-4 4" />
            </svg>
          </button>
        </div>
        <span id="hero-enquiry-hint" className="sr-only">
          Beschreiben Sie Ihre Sendung in einem Satz. Beispiel: {examples[0]}
        </span>
      </form>
    </div>
  );
}
