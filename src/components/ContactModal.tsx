"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function ContactModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("avs:contact", onOpen);
    return () => window.removeEventListener("avs:contact", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div
        className={`modal${open ? " modal--open" : ""}`}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
        aria-label="Kontakt aufnehmen"
      >
        <button type="button" className="modal__backdrop" aria-label="Schliessen" onClick={() => setOpen(false)} />
        <div className="modal__panel">
          <div className="modal__head">
            <div>
              <p className="kicker">Kontakt</p>
              <h2 className="h3" style={{ marginTop: 8 }}>Wie möchten Sie starten?</h2>
            </div>
            <button type="button" className="modal__close" onClick={() => setOpen(false)} aria-label="Schliessen">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="modal__options">
            <a href={site.phoneHref} className="modal-option" onClick={() => setOpen(false)}>
              <span className="modal-option__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.94.36 1.86.7 2.73a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.35-1.27a2 2 0 0 1 2.11-.45c.87.34 1.79.57 2.73.7A2 2 0 0 1 22 16.92z" /></svg>
              </span>
              <span className="modal-option__body">
                <span className="modal-option__title">Anrufen</span>
                <span className="modal-option__text">{site.phone}</span>
              </span>
              <span className="modal-option__arrow" aria-hidden>→</span>
            </a>

            <a href={site.emailHref} className="modal-option" onClick={() => setOpen(false)}>
              <span className="modal-option__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
              </span>
              <span className="modal-option__body">
                <span className="modal-option__title">E-Mail schreiben</span>
                <span className="modal-option__text">{site.email}</span>
              </span>
              <span className="modal-option__arrow" aria-hidden>→</span>
            </a>

            <Link href="/kontakt" className="modal-option modal-option--primary" onClick={() => setOpen(false)}>
              <span className="modal-option__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>
              </span>
              <span className="modal-option__body">
                <span className="modal-option__title">Anfrage senden</span>
                <span className="modal-option__text">Formular ausfüllen — wir melden uns</span>
              </span>
              <span className="modal-option__arrow" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
