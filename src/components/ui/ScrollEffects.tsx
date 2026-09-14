"use client";

import { useEffect } from "react";

/** Progressive enhancement: content remains visible without JS or with reduced motion. */
export function ScrollEffects() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose = () => {};
    function setup() {
      dispose();
      if (preference.matches) return;
      const root = document.documentElement;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
      const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(".home-section .section-heading, .benefit-grid article, .work-console, .control-grid article, .handoff-diagram, .capability-list details, .solution-grid article, .industry-layout, .integration-network, .platform-foundation"));
      const active = new Set<HTMLElement>();
      let frame = 0;
      const reveal = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            entry.target.classList.add("reveal-shown");
            reveal.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      revealTargets.forEach((element, index) => {
        element.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`);
        element.classList.add("reveal-target");
        if (element.getBoundingClientRect().top >= window.innerHeight) element.classList.add("reveal-pending");
        reveal.observe(element);
      });
      const update = () => {
        frame = 0;
        const height = window.innerHeight;
        const maxScroll = document.documentElement.scrollHeight - height;
        root.style.setProperty("--reading-progress", String(maxScroll > 0 ? window.scrollY / maxScroll : 0));
        active.forEach(section => {
          const bounds = section.getBoundingClientRect();
          const progress = Math.min(1, Math.max(0, (height - bounds.top) / (height + bounds.height)));
          section.style.setProperty("--scene-progress", progress.toFixed(4));
          section.style.setProperty("--scene-shift", `${((progress - 0.5) * 90).toFixed(2)}px`);
        });
      };
      const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
      const scenes = new IntersectionObserver(entries => {
        entries.forEach(entry => entry.isIntersecting ? active.add(entry.target as HTMLElement) : active.delete(entry.target as HTMLElement));
        schedule();
      }, { rootMargin: "20% 0px" });
      sections.forEach(section => scenes.observe(section));
      const focus = (event: FocusEvent) => {
        if (!(event.target instanceof Element)) return;
        const parent = event.target.closest(".reveal-target");
        parent?.classList.remove("reveal-pending");
      };
      root.classList.add("motion-ready");
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      document.addEventListener("focusin", focus);
      schedule();
      dispose = () => {
        reveal.disconnect(); scenes.disconnect(); window.cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); document.removeEventListener("focusin", focus);
        root.classList.remove("motion-ready"); root.style.removeProperty("--reading-progress");
        sections.forEach(section => { section.style.removeProperty("--scene-progress"); section.style.removeProperty("--scene-shift"); });
        revealTargets.forEach(element => { element.classList.remove("reveal-target", "reveal-pending", "reveal-shown"); element.style.removeProperty("--reveal-delay"); });
      };
    }
    setup(); preference.addEventListener("change", setup);
    return () => { dispose(); preference.removeEventListener("change", setup); };
  }, []);
  return <div className="reading-progress" aria-hidden="true" />;
}
