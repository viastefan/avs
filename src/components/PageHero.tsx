import Image from "next/image";

type PageHeroProps = {
  title: string;
  description?: string;
  image?: { src: string; alt: string };
  eyebrow?: string;
};

export function PageHero({
  title,
  description,
  image,
  eyebrow,
}: PageHeroProps) {
  return (
    <section className={`page-hero${image ? "" : " page-hero--compact"}`}>
      {image ? (
        <>
          <div className="page-hero__bg">
            <Image
              src={image.src}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 52%" }}
            />
          </div>
          <div className="page-hero__scrim" aria-hidden />
        </>
      ) : null}
      <div className="page-hero__dots" aria-hidden />

      <div className="wrap page-hero__inner">
        {eyebrow ? (
          <span className="badge">
            <span className="badge__dot" aria-hidden />
            {eyebrow}
          </span>
        ) : null}
        <h1 className="page-hero__title">{title}</h1>
        {description ? <p className="page-hero__sub">{description}</p> : null}
      </div>
    </section>
  );
}
