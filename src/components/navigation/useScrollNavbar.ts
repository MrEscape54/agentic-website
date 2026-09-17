"use client";

import { useEffect, useRef } from "react";

/** Only native vertical page movement controls visibility, never capability transforms. */
export function useScrollNavbar(menuOpen: boolean) {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current!;
    let previousY = Math.max(0, window.scrollY);
    let accumulated = 0;
    let direction = 0;
    let frame = 0;
    let pointerInside = false;
    const show = () => { header.dataset.hidden = "false"; };
    const reset = () => { previousY = Math.max(0, window.scrollY); accumulated = 0; direction = 0; };
    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - previousY;
      previousY = y;
      const scrolled = String(y > 64);
      if (header.dataset.scrolled !== scrolled) header.dataset.scrolled = scrolled;
      if (y <= 64 || menuOpen || pointerInside || header.contains(document.activeElement)) {
        show(); accumulated = 0; direction = 0; return;
      }
      if (!delta) return;
      const nextDirection = Math.sign(delta);
      if (nextDirection !== direction) { direction = nextDirection; accumulated = 0; }
      accumulated += Math.abs(delta);
      if (accumulated >= 24) {
        const hidden = String(direction > 0);
        if (header.dataset.hidden !== hidden) header.dataset.hidden = hidden;
        accumulated = 0;
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const focusIn = () => { show(); reset(); };
    const focusOut = () => { reset(); schedule(); };
    const pointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse" || event.pointerType === "pen") { pointerInside = true; show(); reset(); }
    };
    const pointerLeave = () => {
      // Hiding can dispatch pointerleave during the next scroll. Do not consume
      // that scroll delta by resetting previousY before the scroll listener runs.
      if (pointerInside) { pointerInside = false; accumulated = 0; direction = 0; }
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    header.addEventListener("focusin", focusIn);
    header.addEventListener("focusout", focusOut);
    header.addEventListener("pointerenter", pointerEnter);
    header.addEventListener("pointerleave", pointerLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      header.removeEventListener("focusin", focusIn);
      header.removeEventListener("focusout", focusOut);
      header.removeEventListener("pointerenter", pointerEnter);
      header.removeEventListener("pointerleave", pointerLeave);
    };
  }, [menuOpen]);

  return headerRef;
}
