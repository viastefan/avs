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
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="page-hero__shade" aria-hidden />
      <div className="wrap">
        <div className="page-hero__inner">
          {backHref ? (
            <Link href={backHref} className="page-hero__back">
              ← {backLabel}
            </Link>
          ) : null}
          {eyebrow ? (
            <p className="kicker" style={{ marginTop: backHref ? 18 : 0 }}>
              {eyebrow}
            </p>
          ) : null}
          <h1 className="h1">{title}</h1>
          {description ? <p className="lead">{description}</p> : null}
        </div>
      </div>
    </section>
  );
}
