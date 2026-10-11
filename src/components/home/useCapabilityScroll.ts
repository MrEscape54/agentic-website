import { useCallback, useEffect, useRef, useState } from "react";

/** Native scrolling advances the explorer; direct selection also works without motion. */
export function useCapabilityScroll(count: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const geometry = useRef({ enabled: false, travel: 0 });

  useEffect(() => {
    const section = sectionRef.current!;
    const stage = stageRef.current!;
    const media = matchMedia("(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    function update() {
      frame = 0;
      if (!geometry.current.enabled) return;
      const top = section.getBoundingClientRect().top;
      if (top > innerHeight || top < -section.offsetHeight) return;
      setActive(Math.max(0, Math.min(count - 1, Math.round(-top / geometry.current.travel * (count - 1)))));
    }
    function schedule() { if (!frame && geometry.current.enabled) frame = requestAnimationFrame(update); }
    function measure() {
      const enabled = media.matches && stage.offsetHeight <= innerHeight + 1;
      const travel = (count - 1) * innerHeight * .6;
      geometry.current = { enabled, travel };
      section.dataset.scroll = String(enabled);
      if (enabled) section.style.height = `${stage.offsetHeight + travel}px`;
      else section.style.removeProperty("height");
      update();
    }
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", measure);
    media.addEventListener("change", measure);
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", measure);
      media.removeEventListener("change", measure);
      section.style.removeProperty("height");
      delete section.dataset.scroll;
    };
  }, [count]);

  const select = useCallback((index: number) => {
    setActive(index);
    if (geometry.current.enabled && sectionRef.current) {
      const top = sectionRef.current.getBoundingClientRect().top + scrollY;
      scrollTo({ top: top + geometry.current.travel * index / (count - 1), behavior: "instant" });
    }
  }, [count]);
  return { sectionRef, stageRef, active, select };
}
