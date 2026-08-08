"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "avs-cookie-notice";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const timer = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable — stay hidden rather than nagging every load
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`cookie${visible ? " cookie--visible" : ""}`}
      role="dialog"
      aria-live="polite"
      aria-label="Hinweis zu Cookies"
      aria-hidden={!visible}
    >
      <p className="cookie__title">Cookies und Datenschutz</p>
      <p className="cookie__text">
        Diese Website verwendet keine Tracking- oder Marketing-Cookies. Wir speichern lediglich
        technisch notwendige Angaben lokal in Ihrem Browser — etwa Ihre Auswahl für die helle oder
        dunkle Darstellung. Details finden Sie in der{" "}
        <Link href="/datenschutz">Datenschutzerklärung</Link>.
      </p>
      <div className="cookie__actions">
        <button type="button" className="btn btn-primary" onClick={dismiss}>
          Verstanden
        </button>
        <Link href="/datenschutz" className="btn btn-outline" onClick={dismiss}>
          Mehr erfahren
        </Link>
      </div>
    </div>
  );
}
