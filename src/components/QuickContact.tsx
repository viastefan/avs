"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { openEnquiry } from "@/lib/dialogs";
import { site } from "@/lib/site";

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.1 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.8 2z" />
  </svg>
);

/** Phones get one floating action instead of a bar across the foot of the
 *  screen: it costs a single thumb-sized target and opens every way of
 *  reaching us at once. */
export function QuickContact() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const sheetId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => close(), [pathname, close]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className={`quick${open ? " quick--open" : ""}`}>
      <button
        type="button"
        className="quick__scrim"
        tabIndex={open ? 0 : -1}
        aria-hidden={!open}
        aria-label="Schließen"
        onClick={close}
      />

      <div id={sheetId} className="quick__sheet" role="group" aria-label="Kontakt" aria-hidden={!open}>
        <a href={site.phoneHref} className="quick__item" tabIndex={open ? 0 : -1} onClick={close}>
          <span className="quick__icon">
            <PhoneIcon />
          </span>
          <span className="quick__body">
            <span className="quick__title">Anrufen</span>
            <span className="quick__text">{site.phone}</span>
          </span>
        </a>

        <a href={site.emailHref} className="quick__item" tabIndex={open ? 0 : -1} onClick={close}>
          <span className="quick__icon">
            <svg viewBox="0 0 24 24" aria-hidden>
              <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
              <path d="m21 7.5-9 5.5-9-5.5" />
            </svg>
          </span>
          <span className="quick__body">
            <span className="quick__title">E-Mail schreiben</span>
            <span className="quick__text">{site.email}</span>
          </span>
        </a>

        <button
          type="button"
          className="quick__item quick__item--primary"
          tabIndex={open ? 0 : -1}
          onClick={() => {
            close();
            openEnquiry();
          }}
        >
          <span className="quick__icon">
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z" />
              <path d="M14 2.5V8h5.5M8.5 13h7M8.5 17h4" />
            </svg>
          </span>
          <span className="quick__body">
            <span className="quick__title">Anfrage senden</span>
            <span className="quick__text">Acht Fragen — Antwort werktags</span>
          </span>
        </button>
      </div>

      <button
        ref={triggerRef}
        type="button"
        className="quick__fab"
        aria-expanded={open}
        aria-controls={sheetId}
        aria-label={open ? "Kontaktmenü schließen" : "Kontakt aufnehmen"}
        onClick={() => setOpen((v) => !v)}
      >
        {/* A speech bubble, not a handset: the sheet behind it offers phone,
            e-mail and the enquiry form, so a phone icon promises too little. */}
        <span className="quick__fab-icon quick__fab-icon--open" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.5 9.5 0 0 1-2.7-.4L3.8 21l1.5-4.4A8.2 8.2 0 0 1 3.6 11 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z" />
            <path d="M8.6 11h.01M12 11h.01M15.4 11h.01" />
          </svg>
        </span>
        <span className="quick__fab-icon quick__fab-icon--close" aria-hidden>
          <svg viewBox="0 0 24 24">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </span>
      </button>
    </div>
  );
}
