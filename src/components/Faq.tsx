"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="faq">
      {faqs.map((item, i) => {
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
