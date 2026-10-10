# Enterprise Agentic AI Website

Next.js App Router, React, TypeScript and Tailwind CSS. The public brand is `lorenza`. The approved SVG logo variants live in `public/brand`; navbar and footer use the light wordmark for dark backgrounds through the shared `Brand` component. This document records the approved implementation after the original brief in `AGENTS.md`; later user decisions determine the homepage order and omissions.

## Local development

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. On Windows PowerShell with script execution disabled, use `npm.cmd` instead of `npm`.

## Current homepage

Hero → Enterprise Control → Omnichannel → Human-in-the-Loop → Capabilities → Enterprise Fit → Final CTA.

- Hero defaults to Telecom and cycles through Telecom, Financial Services and Retail. Scenario selection pauses playback. Replay restarts the selected case. Reduced motion starts at the completed outcome and provides manual steps.
- `/platform` explains execution, connected capabilities and pluggable access. Its illustrative Telecom demo covers standard plan changes and exceptions requiring human review.
- `/enterprise` covers governance, controls, observability, audit, integration, compliance-oriented design and deployment validation.
- Capabilities uses horizontal sticky scrolling from 1024px with motion enabled. Smaller screens and reduced motion use a static grid.
- Enterprise Fit uses “Keep your systems. Add intelligence.” and shows integration with existing enterprise services.
- Solutions, Industries, ChatbotsVsAgents and PlatformFlow are not mounted. Their retained source is reference material and requires review before reuse; it is not a set of launch-ready pages.
- Navigation links Platform and Enterprise to `/platform` and `/enterprise`. Previous `/to-be` URLs permanently redirect to the corresponding main routes; no `src/app/to-be` route directory remains. Solutions, Industries and Resources remain visibly pending.
- Set `NEXT_PUBLIC_BOOKING_URL` before building to enable an approved booking destination. Without it, Book a Demo opens an explanatory disclosure. There is no provisional email address or submitted booking form. See `.env.example`.
- Customer proof is omitted until validated evidence is supplied.

## Olive Signature visual identity

The visual redesign lives on `design/olive-signature`. Near-black, muted olive and warm off-white tokens are defined in `globals.css`; `olive-signature.css` provides the shared visual treatment. `public/olive-curves.svg` is a lightweight decorative vector, not a logo. The original content and interactive logic remain unchanged, and the complete execution demo follows the cinematic Hero introduction.

## Code and styles

- `src/app/page.tsx` owns section order. `/platform` and `/enterprise` each have their own route directory and page styles. `src/app/product.css` holds shared page composition styles.
- `src/components/hero/ProductHero.tsx` is the current Hero. Homepage sections, including `HumanInTheLoop` and `EnterpriseFit`, live in `src/components/home/`. `src/components/platform/PlatformExecution.tsx` owns the Platform demo.
- `src/lib/data/execution-cases.ts` supplies the three execution examples. Steps have typed identifiers; protection, orchestration context and action logs do not depend on numeric positions. `src/lib/data/capabilities.ts` supplies the current commercial capability groups.
- `src/app/globals.css` contains tokens, shared typography, controls and navigation. `home.css` and `experience.css` still contain the other sections and their composition rules.
- `src/components/hero/hero.css` owns Hero and execution-demo styles.
- `src/components/hero/useExecutionPlayback.ts` owns playback transitions, timing and reduced-motion synchronization. `ExecutionFlow` renders its state and invokes named actions.
- Architecture tabs use instance-specific IDs and a stable shared panel, labelled by the selected tab. Keyboard focus uses local refs.
- `src/components/home/platform-at-work.css` owns scenario selection, architecture exploration, detail panels and logs.
- `Capabilities.tsx` renders the capability content. `useCapabilityScroll.ts` owns DOM measurements, scroll scheduling and cleanup; `capability-scroll.ts` calculates travel, pinning, progress and active-card position without browser dependencies.
- Styles are imported explicitly in `src/app/layout.tsx`. Keep their order: shared styles first, section styles last. The first extraction retains existing selectors and responsive precedence; further consolidation and local scoping should preserve the visual baseline.
- Inter and Plus Jakarta Sans are served locally through Fontsource. The headline token is Roobert-ready; no unlicensed Roobert files are bundled. Font packages retain their licenses.
- Motion uses CSS/SVG and React. `ScrollEffects` enhances native scrolling with reveals and progress; interactive components clean up their timers and observers. Static content remains available without JavaScript.

## Verification

Current routes and redirects are covered by `tests/site-navigation.spec.ts`, `tests/platform.spec.ts` and `tests/enterprise.spec.ts`. Earlier homepage tests and visual baselines include historical sections and require review before using the full suite as the current-site acceptance check.


```sh
npm run lint
npm run typecheck
npm test
npm run test:visual
```

Functional tests use locally installed Google Chrome and the development server on port 3000. They cover playback, keyboard navigation, reduced motion, responsive layout and horizontal capability scrolling.

`test:visual` builds production and starts a dedicated server on port 3100. It compares 45 screenshots across 1440, 1280, 768, 390 and 320px: Hero outcome/protection, architecture overview/open panel/details/logs, and neighboring sections. Reduced motion stabilizes captures; functional tests separately exercise animation and sticky behavior.

The checked-in baselines were captured on Windows with Chrome. Use the same environment and browser version for comparisons; a browser or font-rendering update requires review. A failed comparison writes actual/diff images to `test-results`. Inspect them before updating references:

```sh
npm run test:visual:update
```

Only update snapshots for an intentional, reviewed visual change. Do not update them to make a refactoring failure pass. Baseline PNGs live in `tests/visual/home.visual.spec.ts-snapshots` and must be committed with the tests.

## Remaining work

The audit and staged refactoring plan are in `reports/site-audit/README.md`. Playback and tab relationships have been refactored. Capability scroll calculations and lifecycle are now isolated and tested. The next candidate is organizing architecture detail content. Mobile text readability is a separate design change.

Licensed Roobert assets if desired, real booking destination, proof material, and deployment configuration remain product inputs. Verification so far covers local Chrome, not Safari/iOS or a deployed domain.
