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
      <div className="page-hero__dots" aria-hidden />
      <div className="wrap page-hero__inner">
        {backHref ? (
          <Link href={backHref} className="page-hero__back">
            ← {backLabel}
          </Link>
        ) : null}
        {eyebrow ? <p className="page-hero__eyebrow">{eyebrow}</p> : null}
        <h1 className="page-hero__title">{title}</h1>
        {description ? <p className="page-hero__sub">{description}</p> : null}
      </div>
      <div className="page-hero__stage">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
    </section>
  );
}
