"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type HeroStageProps = {
  src: string;
  alt: string;
};

export function HeroStage({ src, alt }: HeroStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const inner = innerRef.current;
    if (!stage || !inner) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;

      // 0 when the stage top sits at the viewport bottom, 1 once fully passed
      const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
      const shift = (progress - 0.5) * 12; // percent
      const scale = 1.12 - progress * 0.06;
      inner.style.transform = `translate3d(0, ${shift}%, 0) scale(${scale})`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="hero__stage" ref={stageRef}>
      <div className="hero__stage-inner" ref={innerRef}>
        <Image src={src} alt={alt} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
    </div>
  );
}
