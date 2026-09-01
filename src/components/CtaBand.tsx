import Link from "next/link";
import { HeroEnquiry } from "@/components/HeroEnquiry";
import { site } from "@/lib/site";

type CtaBandProps = {
  kicker?: string;
  title?: string;
  text?: string;
  /**
   * The home page already carries the enquiry field in its hero, so repeating
   * it here would put the same question on one page twice. Subpages have no
   * other enquiry field, which is why this defaults to on.
   */
  enquiry?: boolean;
};

export function CtaBand({
  kicker = "Nächster Schritt",
  title = "Wie können wir helfen?",
  text,
  enquiry = true,
}: CtaBandProps) {
  return (
    <section className="cta-band">
      <div className="wrap cta-band__row">
        <div className="cta-band__copy">
          <p className="kicker">{kicker}</p>
          <h2 className="h2">{title}</h2>
          <p className="muted">
            {text ?? "Beschreiben Sie Ihre Sendung in einem Satz — wir melden uns werktags."}
          </p>
          {enquiry ? (
            <p className="cta-band__phone">
              Lieber telefonisch? <a href={site.phoneHref}>{site.phone}</a>
            </p>
          ) : null}
        </div>
        <div className="cta-band__action">
          {enquiry ? (
            <HeroEnquiry />
          ) : (
            <div className="cta-band__direct">
              <a href={site.phoneHref} className="btn btn-primary">
                {site.phone}
              </a>
              <Link href="/kontakt" className="btn btn-outline">
                Anfrage schreiben
              </Link>
              <p className="cta-band__note">
                {site.address.city} · werktags erreichbar
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
