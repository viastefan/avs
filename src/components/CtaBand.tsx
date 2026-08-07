import Link from "next/link";
import { site } from "@/lib/site";

type CtaBandProps = {
  kicker?: string;
  title?: string;
  text?: string;
};

export function CtaBand({
  kicker = "Nächster Schritt",
  title = "Wie können wir helfen?",
  text,
}: CtaBandProps) {
  return (
    <section className="cta-band">
      <div className="wrap cta-band__row">
        <div>
          <p className="kicker">{kicker}</p>
          <h2 className="h2">{title}</h2>
          <p className="muted">{text ?? `Anfrage senden oder anrufen — ${site.address.line2}`}</p>
        </div>
        <div className="cta__actions">
          <Link href="/kontakt" className="btn btn-primary">
            Anfrage senden
          </Link>
          <a href={site.phoneHref} className="btn btn-outline">
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
