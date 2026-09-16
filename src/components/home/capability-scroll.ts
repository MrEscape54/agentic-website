type JourneyGeometry = {
  travel: number;
  lead: number;
  stickyTop: number;
  sectionHeight: number;
};

/** Distances are CSS pixels; lead and tail preserve the pauses at either end. */
export function measureCapabilityJourney(
  viewportHeight: number, stageHeight: number, firstCardOffset: number, lastCardOffset: number,
): JourneyGeometry {
  const travel = Math.max(0, lastCardOffset - firstCardOffset);
  const lead = viewportHeight * .12;
  const tail = viewportHeight * .45;
  return {
    travel, lead,
    // Content taller than the viewport scrolls into view before pinning.
    stickyTop: Math.min(0, viewportHeight - stageHeight),
    sectionHeight: stageHeight + lead + travel + tail,
  };
}

export function locateCapabilityJourney(sectionTop: number, geometry: JourneyGeometry, cardCount: number) {
  const progress = geometry.travel > 0
    ? Math.max(0, Math.min(1, (-sectionTop + geometry.stickyTop - geometry.lead) / geometry.travel))
    : 0;
  return {
    progress,
    translation: -progress * geometry.travel,
    activeIndex: cardCount > 0 ? Math.round(progress * (cardCount - 1)) : -1,
  };
}
