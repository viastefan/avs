"use client";

import { useState } from "react";

type Item = { q: string; a: string };

export function FaqGroup({ items }: { items: readonly Item[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="faq">
      {items.map((item, i) => {
        const open = openIdx === i;
        return (
          <div key={item.q} className={`faq__item${open ? " faq__item--open" : ""}`}>
            <button
              type="button"
              className="faq__q"
              aria-expanded={open}
              onClick={() => setOpenIdx(open ? null : i)}
            >
              {item.q}
              <span className="faq__icon" aria-hidden />
            </button>
            <div className="faq__a" role="region">
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
