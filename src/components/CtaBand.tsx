import { HeroEnquiry } from "@/components/HeroEnquiry";
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
        <div className="cta-band__copy">
          <p className="kicker">{kicker}</p>
          <h2 className="h2">{title}</h2>
          <p className="muted">
            {text ?? "Beschreiben Sie Ihre Sendung in einem Satz — wir melden uns werktags."}
          </p>
          <p className="cta-band__phone">
            Lieber telefonisch?{" "}
            <a href={site.phoneHref}>{site.phone}</a>
          </p>
        </div>
        <div className="cta-band__action">
          <HeroEnquiry />
        </div>
      </div>
    </section>
  );
}
