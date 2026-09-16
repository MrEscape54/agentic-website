import { expect, test } from "@playwright/test";
import { locateCapabilityJourney, measureCapabilityJourney } from "../src/components/home/capability-scroll";

test("capability journey clamps the lead and tail and centers each card", () => {
  const geometry = measureCapabilityJourney(900, 900, 500, 2100);
  expect(geometry.sectionHeight).toBe(3013);
  expect(locateCapabilityJourney(0, geometry, 5).progress).toBe(0);
  for (let index = 0; index < 5; index++) {
    const position = locateCapabilityJourney(-108 - index * 400, geometry, 5);
    expect(position.activeIndex).toBe(index);
    expect(position.translation).toBeCloseTo(-index * 400);
  }
  expect(locateCapabilityJourney(-5000, geometry, 5).progress).toBe(1);
});

test("oversized content pins only after its excess height has scrolled", () => {
  const geometry = measureCapabilityJourney(720, 944, 0, 1600);
  expect(geometry.stickyTop).toBe(-224);
  expect(locateCapabilityJourney(-224, geometry, 5).progress).toBe(0);
  expect(locateCapabilityJourney(-224 - 86.4 - 800, geometry, 5).progress).toBeCloseTo(.5);
});

test("single-card and empty journeys never produce invalid transforms", () => {
  const geometry = measureCapabilityJourney(900, 900, 0, 0);
  const single = locateCapabilityJourney(-1000, geometry, 1);
  expect(single.progress).toBe(0);
  expect(Number.isFinite(single.translation)).toBe(true);
  expect(single.activeIndex).toBe(0);
  expect(locateCapabilityJourney(-1000, geometry, 0).activeIndex).toBe(-1);
});
