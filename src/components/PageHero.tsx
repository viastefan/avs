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
    <section className="page-hero band-dark">
      <div className="page-hero__media">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="page-hero__shade" aria-hidden />

      <div className="page-hero__content wrap">
        {backHref ? (
          <Link href={backHref} className="meta text-[var(--steel-on-dark)] hover:text-[var(--green-bright)]">
            ← {backLabel}
          </Link>
        ) : null}
        {eyebrow ? <p className="meta text-[var(--green-bright)]">{eyebrow}</p> : null}
        <h1 className="font-display mt-4 max-w-3xl text-[clamp(2.4rem,6vw,4.25rem)] font-black leading-[0.95] tracking-tight">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--steel-on-dark)] md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
