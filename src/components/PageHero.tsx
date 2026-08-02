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
        <Image src={image.src} alt={image.alt} fill priority className="object-cover" sizes="100vw" />
      </div>
      <div className="page-hero__shade" aria-hidden />
      <div className="page-hero__content wrap">
        {backHref ? (
          <Link href={backHref} className="text-sm text-white/70 hover:text-white">
            ← {backLabel}
          </Link>
        ) : null}
        {eyebrow ? <p className="eyebrow mt-2 text-white/65">{eyebrow}</p> : null}
        <h1 className="font-display mt-3 max-w-3xl text-[length:var(--t-display)] font-semibold">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-xl text-[length:var(--t-body)] leading-relaxed text-white/80">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
