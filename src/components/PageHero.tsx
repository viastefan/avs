import Image from "next/image";
import Link from "next/link";

type PageHeroProps = {
  title: string;
  description?: string;
  image: { src: string; alt: string };
  eyebrow?: string;
  backHref?: string;
  backLabel?: string;
};

export function PageHero({
  title,
  description,
  image,
  eyebrow,
  backHref,
  backLabel = "Zurück",
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__media">
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="page-hero__shade" aria-hidden />
      <div className="wrap">
        <div className="page-hero__inner">
          {backHref ? (
            <Link href={backHref} style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
              ← {backLabel}
            </Link>
          ) : null}
          {eyebrow ? <p className="kicker" style={{ marginTop: backHref ? 16 : 0 }}>{eyebrow}</p> : null}
          <h1 className="h1" style={{ marginTop: 12, fontSize: "var(--fs-3xl)" }}>{title}</h1>
          {description ? <p className="lead">{description}</p> : null}
        </div>
      </div>
    </section>
  );
}
