import { Fragment, type ReactNode } from "react";

export type LegalBlock = { label: string; body: ReactNode };

// Shared shell for the Impressum and Datenschutz pages: a column of
// labelled blocks, each separated from the last by a hairline rule.
export function LegalDoc({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="legal">
          {blocks.map((block, i) => (
            <Fragment key={i}>
              {i > 0 ? <hr /> : null}
              <div>
                <p className="legal__label">{block.label}</p>
                {block.body}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
