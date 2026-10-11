import { useCallback, useEffect, useRef, useState } from "react";

/** Advance only while the capability detail is visible and the reader is not interacting. */
export function useCapabilityPlayback(count: number) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduced(preference.matches);
    updatePreference();
    const detail = sectionRef.current?.querySelector(".capability-details");
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio >= .35), { threshold: .35 });
    if (detail) observer.observe(detail);
    preference.addEventListener("change", updatePreference);
    const updateVisibility = () => setRevision(value => value + 1);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!visible || paused || focused || reduced || document.hidden || count < 2) return;
    const timer = setTimeout(() => setActive(value => (value + 1) % count), 3000);
    return () => clearTimeout(timer);
  }, [active, visible, paused, focused, reduced, count, revision]);

  const select = useCallback((index: number) => {
    setActive(index);
    setRevision(value => value + 1);
  }, []);
  return { sectionRef, active, select, paused, reduced, setFocused, toggle: () => setPaused(value => !value) };
}
