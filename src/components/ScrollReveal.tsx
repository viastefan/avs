"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Fades a block in as it comes into view.
 *
 *  The hidden state is applied by this effect, never by the server, and a
 *  timer clears it regardless. A block that the observer never reports —
 *  a backgrounded tab on load, a browser without IntersectionObserver —
 *  therefore ends up visible rather than stuck at zero opacity. */
const FAILSAFE_MS = 900;

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      el.classList.add("revealed");
      el.classList.remove("reveal--armed");
    };

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    if (delay) el.style.transitionDelay = `${delay}ms`;
    el.classList.add("reveal--armed");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px -32px 0px" },
    );

    observer.observe(el);
    const failsafe = setTimeout(show, FAILSAFE_MS + delay);

    return () => {
      clearTimeout(failsafe);
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
