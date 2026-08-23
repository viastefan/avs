"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const suggestions = [
  "Maschine nach Übersee",
  "Lithiumbatterien per Luftfracht",
  "Reinraum-Verpackung",
  "Schulung für unser Team",
];

export function HeroEnquiry() {
  const router = useRouter();
  const [value, setValue] = useState("");

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
          <input
            id="hero-enquiry"
            className="enquiry__input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="z. B. Prüfstand, 1.800 kg, nach Singapur"
            autoComplete="off"
          />
          <button type="submit" className="enquiry__submit">
            Anfrage starten
            <svg viewBox="0 0 16 16" aria-hidden>
              <path d="M2 8h11M9 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </form>

      <ul className="enquiry__chips">
        {suggestions.map((s) => (
          <li key={s}>
            <button type="button" onClick={() => start(s)}>
              {s}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
