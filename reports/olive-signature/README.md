# Lorenza — Olive Signature review

Branch: `design/olive-signature`. No deployment performed.

## Inventory and scope

- `/`: ProductHero and full ExecutionFlow, Enterprise Control, Omnichannel, Human-in-the-Loop, Capabilities, Enterprise Fit, final booking CTA.
- `/platform`: introduction, six-stage journey, interactive standard/exception execution, building-block disclosures, ecosystem disclosures, observability and Enterprise link, final booking CTA.
- `/enterprise`: introduction, topic navigation, registry/lifecycle/responsibilities disclosure, controls disclosures, correlated execution record, observability/audit, enterprise bindings, compliance/deployment validation, final booking CTA.
- Shared: scroll-aware navbar/mobile menu, footer, typography, reduced motion, booking destination or existing booking disclosure, legacy URL redirects.

The cinematic introduction now leads directly into the complete existing demo. Its replay CTA still resets, focuses and scrolls to the same demo instance. No demo state machine, scenario data or component contract changed.

## Visual implementation

Near-black, muted olive and warm off-white tokens live in `src/app/globals.css`. `src/app/olive-signature.css` applies the shared treatment. Existing section styles retain their layout and animations with a coordinated palette. `public/olive-curves.svg` provides a small decorative vector rather than video, canvas or an additional dependency.

`Brand.tsx` now renders the approved SVG logo supplied by the user, replacing the temporary symbol and typeset wordmark. Both background variants are preserved in `public/brand`; navbar and footer use `lorenza-dark.svg` on their dark surfaces.

## Verification

- Captured the original layout before implementation and compared normalized editorial text, section identifiers/order and all link destinations after implementation. All matched on Home, Platform and Enterprise at 1366×768, 1280×720, 768×1024 and 390×844.
- SHA-256 checks verified unchanged scenario data, ExecutionFlow, playback hook, PlatformExecution and Omnichannel sources during the parity comparison.
- Checked all three pages for horizontal overflow; inspected desktop/mobile Hero, demo and enterprise presentation. A computed foreground/background contrast check found no failures for sampled text, links and buttons on solid surfaces. This is not a full accessibility audit.
- Lint, TypeScript typecheck and production build passed.
- 33 distinct functional tests passed: main routes and redirects (12), Hero interaction/responsive behavior (7), navbar behavior (7), omnichannel (4), scenario cycling/manual selection/all-case mobile execution (3).
- Updated the historical omnichannel sibling assertion from `handoff` to the existing `human-in-the-loop`. The timing-sensitive omnichannel tests were rerun successfully with one worker after a concurrent-run timeout. Production logic was not changed.
- Existing historical homepage visual snapshots were not overwritten. They include prior sections and are not an acceptance baseline for this redesign.

## Previews

- [Home desktop](home-1366.png) · [Home mobile](home-390.png) · [Complete mobile demo](demo-mobile.png)
- [Platform desktop](platform-1366.png) · [Platform mobile](platform-390.png)
- [Enterprise desktop](enterprise-1366.png) · [Enterprise mobile](enterprise-390.png)

Approved logo SVG variants supplied and incorporated. No certification, vendor relationship, ROI metric or other content was taken from the reference mockup.
