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
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="page-hero__shade" aria-hidden />

      <div className="page-hero__content wrap">
        {backHref ? (
          <Link href={backHref} className="text-sm text-[var(--steel-on-dark)] hover:text-[#eef0f2]">
            ← {backLabel}
          </Link>
        ) : null}
        {eyebrow ? <p className="meta mt-2 text-[var(--steel-on-dark)]">{eyebrow}</p> : null}
        <h1 className="font-display mt-3 max-w-3xl text-[clamp(2.1rem,5vw,3.4rem)] font-semibold leading-[1.08]">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--steel-on-dark)] md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
