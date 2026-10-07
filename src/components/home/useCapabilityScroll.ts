import { useEffect, useRef } from "react";
import { locateCapabilityJourney, measureCapabilityJourney } from "./capability-scroll";

/** Connects viewport measurements and native scroll to the capability presentation. */
export function useCapabilityScroll(compact = false) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current!;
    const stage = stageRef.current!;
    const track = trackRef.current!;
    const cards = cardRefs.current.filter((card): card is HTMLElement => card !== null);
    const markers = markerRefs.current.filter((marker): marker is HTMLSpanElement => marker !== null);
    const media = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let geometry = measureCapabilityJourney(0, 0, 0, 0);
    let enabled = false;
    let active = -1;

    function update() {
      frame = 0;
      if (!enabled) return;
      const { progress, translation, activeIndex: next } = locateCapabilityJourney(
        section.getBoundingClientRect().top, geometry, cards.length,
      );
      track.style.transform = `translate3d(${translation}px, 0, 0)`;
      section.style.setProperty("--capability-progress", String(progress));
      if (next !== active) {
        cards.forEach((card, index) => card.dataset.active = String(index === next));
        markers.forEach((marker, index) => marker.dataset.active = String(index === next));
        active = next;
      }
    }
    function schedule() {
      if (enabled && !frame) frame = requestAnimationFrame(update);
    }
    function measure() {
      cancelAnimationFrame(frame);
      frame = 0;
      enabled = media.matches;
      section.dataset.horizontal = String(enabled);
      section.style.removeProperty("height");
      track.style.removeProperty("transform");
      active = -1;
      if (enabled) {
        geometry = measureCapabilityJourney(
          window.innerHeight, stage.offsetHeight,
          cards[0]?.offsetLeft ?? 0, cards.at(-1)?.offsetLeft ?? 0,
          compact,
        );
        stage.style.top = `${geometry.stickyTop}px`;
        section.style.height = `${geometry.sectionHeight}px`;
        update();
      } else {
        stage.style.removeProperty("top");
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
      cards.forEach(card => delete card.dataset.active);
      markers.forEach(marker => delete marker.dataset.active);
      section.style.removeProperty("--capability-progress");
      delete section.dataset.horizontal;
      section.style.removeProperty("height");
      track.style.removeProperty("transform");
      stage.style.removeProperty("top");
    };
  }, [compact]);

  return { sectionRef, stageRef, trackRef, cardRefs, markerRefs };
}
