import Link from "next/link";
import { site } from "@/lib/site";

/** Sticky bottom actions for phones. Both routes a visitor actually
 *  needs sit inside the thumb's natural arc, where the header is not. */
export function ThumbBar() {
  return (
    <div className="thumb-bar" role="group" aria-label="Schnellkontakt">
      <a href={site.phoneHref} className="thumb-bar__action thumb-bar__call">
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.1 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.8 2z" />
        </svg>
        Anrufen
      </a>
      <Link href="/kontakt" className="thumb-bar__action thumb-bar__enquiry">
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Anfrage
      </Link>
    </div>
  );
}
