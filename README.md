# Enterprise Agentic AI Website

Full homepage following `AGENTS.md` with the subsequently approved all-navy direction. Product name remains `BRAND LOGO` until approved.

## Local development

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. On Windows PowerShell with script execution disabled, use `npm.cmd` in place of `npm`.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
npm test
```

## Implementation

Browser tests use locally installed Google Chrome and cover flow playback, reduced motion, keyboard tabs, capability disclosures, industry examples, navigation, provisional booking links, and widths from 360 to 1440px.

- Next.js App Router, TypeScript, Tailwind CSS, React/CSS/SVG flow.
- Plus Jakarta Sans is served locally through Fontsource for headlines, with Inter for body/UI. `--font-headline` remains ready for licensed Roobert files. No Roobert files are bundled.
- Plus Jakarta Sans uses SIL OFL 1.1: https://github.com/tokotype/PlusJakartaSans/blob/master/OFL.txt. Fontsource packages preserve their licenses.
- Telecom base content lives in `src/lib/data/telecom.ts`; all three Hero and architecture cases are in `src/lib/data/execution-cases.ts`.
- The illustrative Hero loops Telecom, Financial Services and Retail. Each result stays visible for 4.5 seconds before the next case. Pause works during execution and during the result hold. Manual selection pauses; Resume continues the cycle and Replay restarts the selected case. It does not connect to real customer systems.
- Reduced motion shows the completed result by default, with manual step controls on replay.
- Navigation and Explore the Platform lead to homepage sections. Resources remains pending until resources are supplied.
- Booking opens the user-authorized provisional address `info@example.com`. Override it through `NEXT_PUBLIC_BOOKING_URL` with the approved scheduling URL or mailto address before publishing; see `.env.example`.
- Platform at Work defaults to Financial Services, with independent selection of all three cases across architecture, details and illustrative traces. CONTROL · INTEGRATE · OBSERVE and the four supporting modules form its foundation.
- Capabilities use native disclosures; Industries provides three selectable illustrative workflows. Content lives in `src/lib/data/home.ts`.
- Static sections use Server Components; only interactive sections use Client Components.
- All sections use Deep Navy, with slightly lighter surfaces and subtle borders. The opening narrative is Hero → Business Value → Platform at Work. The chatbot comparison and One Platform flow are no longer rendered.
- `src/app/experience.css` adds varied compositions: centered staggered benefits, wide architecture stage, stepped control cards, reversed handoff, sticky capability index, radial integrations and a full-width CTA.
- `ScrollEffects.tsx` progressively enhances content with one-time reveals, subtle background parallax, scroll-drawn connections and a reading progress line. Scroll remains native. Work is limited to visible scenes and scheduled with requestAnimationFrame; listeners and observers are cleaned up.
- Reduced motion disables reveals/parallax and sticky behavior; content remains readable without JavaScript. No additional animation library, video or WebGL dependency.
- No fabricated customer evidence, vendor logos or metrics. Proof is omitted until validated material is supplied.

## Pending review

- Full homepage review.
- Final product name / logo; Plus Jakarta Sans is available as the free headline font.
- Real booking URL or commercial address (current email is provisional).
- Validated proof and resource content, if desired.
- GitHub repository and Vercel deployment configuration when needed.

Setup reference: https://nextjs.org/docs/app/getting-started/installation
