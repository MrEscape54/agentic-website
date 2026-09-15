"use client";

import { useEffect, useRef } from "react";
import { capabilities } from "@/lib/data/home";
import { SectionHeading } from "./SectionHeading";

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const stage = section.querySelector<HTMLElement>(".capability-stage")!;
    const track = section.querySelector<HTMLElement>(".capability-track")!;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("article"));
    const markers = Array.from(section.querySelectorAll<HTMLElement>(".capability-progress span"));
    const media = window.matchMedia("(min-width: 961px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let travel = 0;
    let lead = 0;
    let enabled = false;
    let active = -1;

    function update() {
      frame = 0;
      if (!enabled) return;
      const progress = Math.max(0, Math.min(1, (-section.getBoundingClientRect().top - lead) / travel));
      track.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
      section.style.setProperty("--capability-progress", String(progress));
      const next = Math.round(progress * (cards.length - 1));
      if (next !== active) {
        cards.forEach((card, index) => card.dataset.active = String(index === next));
        markers.forEach((marker, index) => marker.dataset.active = String(index === next));
        active = next;
      }
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    function measure() {
      enabled = media.matches;
      section.dataset.horizontal = String(enabled);
      section.style.removeProperty("height");
      track.style.removeProperty("transform");
      // If enlarged text or a short viewport cannot contain the stage, keep natural flow.
      if (enabled && stage.scrollHeight > window.innerHeight + 1) {
        enabled = false;
        section.dataset.horizontal = "false";
      }
      active = -1;
      if (enabled) {
        travel = cards[cards.length - 1].offsetLeft - cards[0].offsetLeft;
        lead = window.innerHeight * .12;
        const tail = window.innerHeight * .45;
        section.style.height = `${stage.offsetHeight + lead + travel + tail}px`;
        update();
      } else {
        cards.forEach(card => delete card.dataset.active);
        markers.forEach(marker => delete marker.dataset.active);
        section.style.removeProperty("--capability-progress");
      }
    }
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    cards.forEach(card => observer.observe(card));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    media.addEventListener("change", measure);
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", measure);
      delete section.dataset.horizontal;
      section.style.removeProperty("height");
      track.style.removeProperty("transform");
    };
  }, []);

  return <section ref={sectionRef} id="capabilities" className="home-section capability-section" aria-labelledby="capabilities-title">
    <div className="capability-stage">
      <div className="page-shell capability-heading">
        <SectionHeading id="capabilities-title" eyebrow="PLATFORM CAPABILITIES" description="Explore the engines and studios that connect understanding, knowledge and controlled execution.">The technology behind<br /><em>every execution.</em></SectionHeading>
        <span className="section-index">BUILT TO WORK TOGETHER</span>
      </div>
      <div className="capability-window">
        <div className="capability-track">
          {capabilities.map((group, index) => <article className="capability-card" key={group.title} aria-labelledby={`capability-${index}`}>
            <span className="capability-number">0{index + 1}</span>
            <h3 id={`capability-${index}`}>{group.title}</h3>
            <p>{group.description}</p>
            <ul>{group.modules.map(module => <li key={module}>{module}</li>)}</ul>
          </article>)}
        </div>
      </div>
      <div className="capability-progress" aria-hidden="true">
        <div className="capability-rail"><i /></div>
        {capabilities.map((group, index) => <span key={group.title}>0{index + 1}</span>)}
      </div>
    </div>
  </section>;
}
