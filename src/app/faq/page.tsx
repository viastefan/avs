import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { FaqGroup } from "@/components/FaqGroup";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { faqGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "Häufige Fragen",
  description:
    "Antworten zu Verpackungsvorschriften, Gefahrgut, Dokumenten, Schulungen und unserem Standort am Flughafen München.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) =>
      g.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Häufige Fragen"
        title="Gut zu wissen"
        description="Die Fragen, die uns am häufigsten erreichen — zu Vorschriften, Gefahrgut, Schulungen und Ablauf."
      />

      <section className="section section--alt">
        <div className="wrap prose-narrow" style={{ display: "grid", gap: "clamp(48px, 6vw, 72px)" }}>
          {faqGroups.map((group, i) => (
            <ScrollReveal key={group.title} delay={i * 60}>
              <div>
                <h2 className="faq-group__title">{group.title}</h2>
                <FaqGroup items={group.items} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CtaBand
        kicker="Noch offene Fragen?"
        title="Sprechen Sie uns direkt an"
        text="Wir beantworten Ihre Fragen zu Verpackung, Gefahrgut und Schulung persönlich."
      />
    </>
  );
}
