"use client";

import { useEffect, useRef } from "react";

const edges = [
  "M170 850C400 540 673 165 1030 111C1180 88 1320 128 1460 220",
  "M540 900C658 690 684 619 682 432C679 242 802 134 1030 111",
  "M760 860C954 605 1150 520 1430 510",
];

export function HeroArt() {
  const art = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = art.current;
    if (!element) return;
    let visible = false;
    let resume: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      element.dataset.active = String(visible);
    });
    observer.observe(element);
    // Prioritize scrolling over decorative paint work, without React rerenders.
    const pauseWhileScrolling = () => {
      if (!visible) return;
      element.dataset.scrolling = "true";
      clearTimeout(resume);
      resume = setTimeout(() => { element.dataset.scrolling = "false"; }, 180);
    };
    window.addEventListener("wheel", pauseWhileScrolling, { passive: true });
    window.addEventListener("scroll", pauseWhileScrolling, { passive: true });
    return () => {
      observer.disconnect();
      clearTimeout(resume);
      window.removeEventListener("wheel", pauseWhileScrolling);
      window.removeEventListener("scroll", pauseWhileScrolling);
    };
  }, []);

  return <div ref={art} className="olive-hero-art" aria-hidden="true">
    <svg className="hero-edge-light" viewBox="0 0 1400 850" preserveAspectRatio="xMidYMid slice" fill="none" focusable="false">
      <defs>
        {edges.map((edge, index) => <path key={edge} id={`hero-light-path-${index}`} d={edge} pathLength="100" />)}
      </defs>
      {edges.map((edge, index) => <g key={edge} className={`hero-light-trace hero-light-trace-${index}`} strokeLinecap="round">
        <use href={`#hero-light-path-${index}`} className="hero-light-halo" />
        <use href={`#hero-light-path-${index}`} className="hero-light-core" />
      </g>)}
    </svg>
  </div>;
}
