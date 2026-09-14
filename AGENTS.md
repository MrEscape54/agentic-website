# AGENTS.md — BIWARES Agentic AI Website

## 1. Project purpose

This repository is for the new BIWARES Agentic AI website.

Important naming rule:

- `biwares.ia` is the DOMAIN, not the product/platform name.
- The final product/platform name is still TBD.
- Until the name is approved, use `BRAND LOGO` as the visible brand/logo placeholder in mockups and UI.
- In copy, refer to the offering as:
  - `the platform`
  - `our agentic AI platform`
  - `the enterprise agentic AI platform`
- Do NOT present `BIWARES.IA` as the product name.

The site must position BIWARES as an AI-native enterprise technology company, not as “a consulting firm with an AI page”.

Primary positioning:

> Enterprise Agentic AI Platform

Core promise:

> From conversation to execution.

Enterprise trust statement:

> Governed by your enterprise. Controlled by design.

Supporting idea:

> We don’t stop at answers. We execute.

Primary communication principle:

> Show actions, not conversations.

Narrative design principle:

> Show the outcome first. Reveal the technology behind it second.

---

## 2. Strategic positioning

The platform is not positioned as:

- a chatbot
- a bot builder
- a standalone LLM interface
- a generic RAG solution
- a customer-service widget
- an AI consultancy presented as a product
- a replacement for enterprise security architecture
- a replacement for systems of record

Desired perception:

> Enterprise AI infrastructure for intelligent execution.

The platform connects:

- customer / employee conversations
- trusted enterprise knowledge
- AI reasoning and orchestration
- reusable skills
- enterprise tools
- real business actions
- enterprise controls
- telemetry and observability
- intelligent human escalation

Preferred architectural wording:

> The platform acts as an agentic intelligence and execution layer across the enterprise, integrating with existing systems, identity, security and business controls.

Do NOT use wording that implies the platform replaces the client’s IAM, security, core systems, ERP, CRM, or system-of-record architecture.

Use `alongside` / `integrating with` / `respecting existing enterprise controls`.

Avoid saying `within the enterprise controls` when it could imply the platform itself owns those controls.

---

## 3. Technology stack

Build the website with:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vercel deployment
- No separate Node backend for V1
- Use Next.js server-side capabilities / API routes / server actions only if needed
- GitHub as source control

For motion:

- Prefer React/CSS/SVG
- Framer Motion is acceptable
- Avoid using a large MP4 for the core Hero execution sequence
- The core Hero should be a real interactive UI, not a static screenshot

CMS is not required for the first implementation, but code should not make future CMS integration unnecessarily difficult.

---

## 4. Design system — approved direction

### Typography

Headlines:
- Roobert
- Use as the primary display/headline typeface
- Prefer medium / semibold over excessively heavy weights

Body / UI:
- Inter

Do NOT bundle, redistribute, or commit unlicensed Roobert font files.

Until licensed webfont files are available:
- use an appropriate fallback stack
- keep typography tokens ready for Roobert

Suggested logic:

- Headline / brand ideas → Roobert
- Product UI / telemetry / body / navigation → Inter

### Color palette

Approved palette:

- Deep Navy: `#081426`
- Acid Olive: `#A8D94A`
- Off White: `#F7F8F5`
- Slate / secondary text: `#647084`

Use a separate success green for successful outcomes.
Do not use Acid Olive as the generic “success” color.

Design principle:

> Acid Olive = intelligence in motion.

Use the accent intentionally for:
- active execution nodes
- active connections
- selected skills
- selected system
- progress through an agentic flow
- calls to action when appropriate

Do not use the accent decoratively everywhere.

### Visual style

The website should feel like:
- Enterprise
- Sophisticated
- Technical
- Modern
- Product-first
- Controlled
- Premium

Avoid:
- stock photography
- robots
- brains
- glowing AI spheres
- generic “AI magic”
- overused blue/purple gradients
- chat-window-first visuals
- fake dashboards full of random metrics
- excessive glow effects

Use:
- architecture
- flows
- system events
- nodes
- APIs
- state changes
- validations
- orchestration
- execution traces
- enterprise systems

---

## 5. Approved navigation

Primary navigation:

- Platform
- Solutions
- Industries
- Enterprise
- Resources

Primary CTA:

> Book a Demo

Visible brand placeholder:

> BRAND LOGO

Possible later link to parent company BIWARES can be added only when explicitly requested.

---

## 6. Homepage narrative

The homepage should follow this sequence:

1. Hero
2. Chatbots vs AI Agents
3. Platform
4. See the Platform at Work
5. Enterprise Control
6. Intelligent Handoff
7. Capabilities / Product Deep Dive
8. Solutions
9. Industries
10. Integrations
11. Proof / Customer Evidence
12. Final CTA

Narrative:

> PROMISE → DIFFERENCE → PLATFORM → PROOF OF EXECUTION → CONTROL → HUMAN → TECHNOLOGY → SOLUTIONS → INDUSTRIES → INTEGRATIONS → PROOF → CTA

Do not overuse the phrase “Agentic AI”.
Demonstrate it visually instead.

---

# 7. HERO — highest priority

The Hero is the first implementation priority.

The Hero must create the immediate reaction:

> “This is not a chatbot. It actually executes.”

Do NOT hide the core execution demo lower on the page.

## Hero copy

Eyebrow:

> ENTERPRISE AGENTIC AI PLATFORM

Headline:

> From conversation  
> to execution.

Preferred visual emphasis:
- `execution.` in Acid Olive

Supporting copy:

> AI agents that understand intent, access trusted enterprise knowledge, orchestrate capabilities and execute real actions across your business systems.

Primary CTA:

> See it in Action

Secondary CTA:

> Explore the Platform

Trust line:

> Governed by your enterprise. Controlled by design.

## Hero product flow

Initial use case:

> I need to change my mobile plan.

Animate the flow:

1. UNDERSTAND
   - Change mobile plan
   - Intent detected ✓

2. KNOW
   - Customer profile
   - Current contract
   - Available plans ✓

3. PROTECT
   - Sensitive information detected
   - `DNI 34.123.456 → {DNI}`
   - Sensitive data protected ✓

4. ORCHESTRATE
   - `customer.identify`
   - `plan.eligibility`
   - `plan.change`
   - 3 skills selected ✓

5. ACT
   - Connecting to Billing System
   - Updating plan…

6. OBSERVE
   - Execution traced ✓

Final state:

> Plan updated

> RESOLVED ✓

## Enterprise systems shown in Hero

Show enterprise systems around the execution panel:

- CRM
- Billing
- Knowledge
- Identity
- APIs

When a system is being used, its connection should activate visually.

This should demonstrate that the platform is connected to the enterprise ecosystem.

## Use-case selector

Hero can include these selectable examples:

- Telecom — Change mobile plan
- Financial Services — Replace credit card
- Retail — Change delivery date

These can change the execution flow over time.

Start with Telecom as default.

## Important

The Hero shows the OUTCOME and a simplified execution flow.

A later section (`See the Platform at Work`) reveals what is happening underneath:
- agents
- orchestration
- skills
- tools
- knowledge
- Action Engine
- enterprise systems
- telemetry

The Hero should still show enough to create the WOW immediately.

---

# 8. Section 02 — Chatbots vs AI Agents

Eyebrow:

> BEYOND THE CHATBOT

Headline:

> Chatbots answer.  
> AI agents act.

Supporting line:

> The difference isn’t the conversation. It’s what happens next.

Visual concept:

CHATBOT

Request  
→ Understand  
→ Answer  
→ END

AI AGENT

Goal  
→ Understand  
→ Reason  
→ Use tools  
→ Execute  
→ RESOLVED ✓

Important:
- Do not attack chatbots as “bad”.
- Explain the difference in scope.
- Chatbots answer/converse.
- Agents can pursue goals and take action.

---

# 9. Section 03 — Platform

Eyebrow:

> THE PLATFORM

Headline:

> One platform.  
> From intent to outcome.

Approved commercial architecture:

> CONNECT → UNDERSTAND → KNOW → ORCHESTRATE → ACT → INSIGHT

Definitions:

### CONNECT
Engage across voice, messaging, web and enterprise channels.

### UNDERSTAND
Detect intent, topics and context.

### KNOW
Ground agents in trusted enterprise knowledge.

### ORCHESTRATE
Coordinate agents, skills and tools to determine the right path.

### ACT
Execute real transactions across enterprise systems.

### INSIGHT
Turn interactions and execution into actionable intelligence.

Foundation:

> CONTROL · INTEGRATE · OBSERVE

This is where the site can begin to introduce:
- Control Studio
- Integration Hub
- Telemetry Engine
- Observability Hub

Do not show every technical module here.

---

# 10. Section 04 — See the Platform at Work

Eyebrow:

> AGENTIC ORCHESTRATION

Headline:

> See the platform at work.

Supporting copy:

> Watch how agents, skills, enterprise knowledge and systems work together to turn intent into action.

This section is NOT a repeat of the Hero.

Hero = WHAT happened.

This section = HOW the platform made it happen.

The default case should reuse the Telecom Hero request so the visitor can “open the hood” on the exact execution already seen above.

Conceptual diagram:

Customer request  
→ Orchestration  
→ multiple agents / capabilities  
→ reusable skills  
→ tools / knowledge  
→ Action Engine  
→ enterprise systems  
→ outcome

Example agent roles may include:

- Customer Agent
- Plan Agent
- Knowledge Agent

Example skills:

- Identify customer
- Check eligibility
- Change plan

Enterprise systems:

- CRM
- Billing
- Identity
- APIs
- Knowledge

Do not create a visually chaotic spaghetti diagram.
Clarity over completeness.

Possible tabs:

- Execution Flow
- Details
- System Logs

Possible industry selectors:

- Telecom
- Financial Services
- Retail

---

# 11. Section 05 — Enterprise

Eyebrow:

> ENTERPRISE BY DESIGN

Headline:

> Autonomy without  
> losing control.

Core framework:

> PROTECT · CONTROL · OBSERVE

## PROTECT

Headline / phrase:

> Share meaning. Not sensitive data.

Capabilities:

- Sensitive entity detection
- NER
- Sensitive-data tokenization
- Semantic reduction
- Protected model context
- Local model processing where applicable

Important architecture:

Sensitive data should be protected before external LLM invocation.

Structured sensitive data can be tokenized, e.g.:

`DNI 34.123.456 → {DNI}`

The real value is substituted internally later by the Action Engine when needed for execution.

Unstructured sensitive data is also protected using semantic reduction.

Current implementation includes a local Mistral model in this area.

The team is evaluating Microsoft Presidio for sensitive data / PII detection.

Do NOT market Mistral or Presidio as the core product capability.
The product capability is:

> Sensitive Data Protection / Data Minimization

Do not claim any specific vendor dependency unless requested.

Do not claim “sensitive data never reaches an external LLM” unless that architecture is explicitly confirmed for every relevant execution path.

## CONTROL

Message:

> Your enterprise remains in control.

Capabilities / principles:

- Enterprise identity integration
- Existing enterprise permissions
- Business rules
- Controlled execution
- Control Studio
- Enterprise systems remain systems of record

Do NOT position the platform as replacing:
- IAM
- RBAC
- MFA
- enterprise security architecture
- application-level authorization

The platform should respect and propagate enterprise identity / permission context.

## OBSERVE

Message:

> Know what your agents are doing.

Capabilities:

- Telemetry
- Execution traces
- Logs
- Metrics
- Observability

Close section with:

> Governed by your enterprise. Controlled by design.

---

# 12. Section 06 — Intelligent Handoff

Eyebrow:

> INTELLIGENT HANDOFF

Headline:

> Autonomous when it can.  
> Human when it should.

Current platform capability is BUILT:

> Intelligent Human Handoff

It includes:
- intelligent triage
- deciding when escalation is required
- transferring to a human
- preserving accumulated conversation / case context

Good use case:

Support / SLA model

L1 → AI  
L2 → AI + enterprise tools  
L3 → Intelligent Handoff → Human Specialist

Possible visual:

Request  
→ AI  
→ Triage  
→ Resolve OR Escalate  
→ Human Expert  
→ Context preserved ✓

## IMPORTANT CLAIM BOUNDARY

The following are NOT currently implemented and must NOT be claimed:

- Human approval workflow with pause/resume
- Pause agent → human approves → agent resumes
- Full HITL approval orchestration
- Automatic learning from how the human resolved the case
- Human Feedback Learning Loop

Do not simply claim “full Human-in-the-Loop”.

The safe/public capability is:

> Intelligent Human Handoff

or:

> Human Oversight through Intelligent Handoff

---

# 13. Section 07 — Capabilities

Eyebrow:

> PLATFORM CAPABILITIES

Headline:

> The technology behind  
> every execution.

Group capabilities instead of showing one giant wall of modules.

## Conversation & Understanding

- Conversation Engine
- Intent Engine
- Topic Engine
- Taxonomy Studio

## Knowledge & Intelligence

- Knowledge Engine
- Campaign Engine
- Insights Hub

## Orchestration & Execution

- Orchestration Engine
- Skills Studio
- Action Engine

## Channels & Humans

- Channel Hub
- Voice Engine
- Voice Biometrics
- Intelligent Handoff

## Enterprise Platform

- LLM Gateway
- Integration Hub
- Control Studio
- Telemetry Engine
- Observability Hub

CTA:

> Explore the Platform →

---

# 14. Platform capabilities — verified as already available

The following capabilities have been confirmed as features already available in the platform:

- Channel Hub
- Voice Engine
- Intelligent Handoff / Agent Handoff
- Voice Biometrics
- Conversation Engine
- LLM Gateway
- Action Engine
- Intent Engine
- Taxonomy Studio
- Topic Engine
- Campaign Engine
- Insights Hub
- Knowledge Engine
- Orchestration Engine
- Skills Studio
- Control Studio
- Integration Hub
- Telemetry Engine
- Observability Hub

Do not downgrade these to roadmap unless later instructed.

Two legacy roadmap items from earlier internal documentation were:

- Validation Engine
- Signal Engine

Do not present these as built unless explicitly reconfirmed.

---

# 15. LLM Gateway — important behavior

The LLM Gateway is not just a generic model proxy.

Confirmed concept:

> LLM as an Orchestrator with Tokenization

Meaning:

- sensitive data is filtered / tokenized before the external LLM sees it
- example: real DNI value becomes `{DNI}`
- the LLM can reason about the task and determine what tools to use
- the LLM does not need the actual sensitive value to decide which tool / capability to invoke
- the internal Action Engine substitutes the real value when execution requires it

Simplified flow:

User input  
→ LLM Gateway  
→ sensitive data detection / tokenization  
→ LLM receives protected context  
→ LLM selects / orchestrates tools  
→ Action Engine resolves real values internally  
→ enterprise system

Do not describe the LLM itself as directly executing core transactions.

Execution belongs to controlled platform layers such as Action Engine.

---

# 16. Sensitive unstructured data

The platform also protects sensitive unstructured data.

Important concepts:

- NER (Named Entity Recognition)
- semantic reduction
- local model processing
- sensitive entity detection

Current architecture uses a local Mistral model for semantic reduction.

The team is evaluating Microsoft Presidio.

Treat NER and semantic reduction as complementary:

NER:
- detects / classifies sensitive entities inside free text

Semantic reduction:
- preserves the meaning needed for the task while removing / abstracting unnecessary sensitive content

Public benefit language:

> Share meaning. Not sensitive data.

or

> The model receives the context it needs to reason — not all the sensitive information the enterprise holds.

Be careful with absolute security claims.

---

# 17. Section 08 — Solutions

Eyebrow:

> SOLUTIONS

Headline:

> One platform.  
> Many business outcomes.

Initial solution areas:

### Customer Service
Resolve requests, execute changes and intelligently escalate exceptions.

Mini-flow:
Request → Resolve → Execute

### Employee Experience
Connect employees with enterprise knowledge and actions.

Mini-flow:
Ask → Know → Act

### Finance
Automate knowledge-intensive financial workflows and controlled actions.

Mini-flow:
Request → Validate → Execute

### Operations
Turn operational requests into orchestrated enterprise workflows.

Mini-flow:
Detect → Coordinate → Resolve

Avoid stock photography.
Use mini execution flows.

---

# 18. Section 09 — Industries

Eyebrow:

> BUILT FOR YOUR INDUSTRY

Headline:

> Enterprise AI that  
> understands your business.

Initial industries:

- Financial Services
- Telecommunications
- Retail

Do not launch a long list of generic industries.

Industry pages should demonstrate concrete execution flows, not generic industry marketing.

Examples:

### Financial Services
Replace card  
→ Authenticate  
→ Validate  
→ Block  
→ Reissue

### Telecommunications
Change plan  
→ Identify  
→ Check eligibility  
→ Update billing

### Retail
Delivery issue  
→ Retrieve order  
→ Diagnose  
→ Reschedule

A fourth industry can be added later when approved.

---

# 19. Section 10 — Integrations

Headline:

> Connect AI to the systems  
> that run your business.

Visual:

Platform in the center, connected to:

- CRM
- ERP
- HCM
- Core Systems
- Billing
- Databases
- Knowledge
- APIs

Approved copy:

> Your systems remain the systems of record. The platform becomes the intelligent execution layer connecting intent to action.

Do not show specific vendor logos unless BIWARES has approved the relationship / relevance.

Do not invent integrations.

---

# 20. Section 11 — Proof

Do NOT invent metrics.

Do NOT fabricate:
- ROI
- automation rates
- resolution rates
- cost savings
- customer logos
- case studies
- number of transactions

Only add proof when real validated evidence is supplied.

Until then:
- keep the section minimal
- or omit it in V1

Proof before promise.

---

# 21. Section 12 — Final CTA

Background:
- Deep Navy

Eyebrow:

> FROM CONVERSATION TO EXECUTION

Headline:

> What could your  
> AI agents execute?

Supporting copy:

> Let’s identify the conversations in your business that could become intelligent, automated actions.

CTA:

> Book a Demo →

Trust close:

> Governed by your enterprise. Controlled by design.

---

# 22. Product architecture reference

The platform currently includes a layered architecture.

## Entry

- Channel Hub
- Voice Engine
- Intelligent Handoff
- Voice Biometrics

## Conversation / Agentic Core

- Conversation Engine
- Action Engine
- Knowledge Engine
- LLM Gateway
- Orchestration Engine
- Skills Studio

## Intelligence

- Intent Engine
- Taxonomy Studio
- Topic Engine
- Campaign Engine
- Insights Hub

## Cross-platform configuration / operations

- Control Studio
- Integration Hub
- Telemetry Engine
- Observability Hub

Do not necessarily render this full architecture on the Home page.
It is more appropriate for:
- Platform page
- Architecture section
- CIO / CTO technical material

Home should abstract this into:

> CONNECT → UNDERSTAND → KNOW → ORCHESTRATE → ACT → INSIGHT

Foundation:

> CONTROL · INTEGRATE · OBSERVE

---

# 23. Development structure — recommended

Suggested structure:

```text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── navigation/
│   │   └── Navbar.tsx
│   │
│   ├── hero/
│   │   ├── Hero.tsx
│   │   ├── ExecutionFlow.tsx
│   │   ├── EnterpriseSystems.tsx
│   │   └── UseCaseSelector.tsx
│   │
│   ├── home/
│   │   ├── ChatbotsVsAgents.tsx
│   │   ├── PlatformFlow.tsx
│   │   ├── PlatformAtWork.tsx
│   │   ├── EnterpriseControl.tsx
│   │   ├── IntelligentHandoff.tsx
│   │   ├── Capabilities.tsx
│   │   ├── Solutions.tsx
│   │   ├── Industries.tsx
│   │   ├── Integrations.tsx
│   │   ├── Proof.tsx
│   │   └── FinalCTA.tsx
│   │
│   └── ui/
│
└── lib/
    └── data/
```

Keep use-case content data-driven where practical.

Example:
- telecom
- financial-services
- retail

This should make the Hero selector and Platform-at-Work selector easy to extend.

---

# 24. Implementation priorities

Do NOT build the full website in one uncontrolled pass.

Recommended order:

## Phase 1 — Foundation
- Next.js setup
- Tailwind
- CSS variables / design tokens
- typography
- spacing / radii
- reusable buttons
- page max-widths
- navigation

## Phase 2 — Hero
- Hero layout
- animated execution flow
- enterprise systems
- use-case selector
- desktop responsive behavior
- mobile responsive behavior

The Hero must feel excellent before building the rest.

## Phase 3 — Core story
- Chatbots vs AI Agents
- Platform
- See the Platform at Work
- Enterprise Control
- Intelligent Handoff

## Phase 4 — Commercial sections
- Capabilities
- Solutions
- Industries
- Integrations
- Final CTA

## Phase 5 — polish
- motion
- responsive refinement
- accessibility
- performance
- cross-browser
- metadata
- SEO
- analytics

---

# 25. Motion principles

Motion should communicate product behavior.

Use motion for:
- request arrival
- active node progression
- connections activating
- system invocation
- tokenization
- skill selection
- execution
- successful result
- intelligent handoff

Avoid motion that is purely ornamental.

Hero execution can run automatically after a short delay.

Do not make the animation too fast.
The visitor should be able to understand the sequence.

Prefer:
- subtle motion
- controlled acceleration
- enterprise feel

Avoid:
- bouncing
- excessive spring motion
- gaming aesthetics
- neon overload

Respect `prefers-reduced-motion`.

---

# 26. Responsive behavior

Desktop:
- text + execution panel side by side

Tablet:
- compact side-by-side where possible
- otherwise clean stacked layout

Mobile:
- headline first
- execution demo immediately after CTA / trust line
- do not hide the execution experience
- simplify enterprise-system visualization rather than removing the core concept

The “WOW” must survive on mobile.

---

# 27. Accessibility

Minimum expectations:

- semantic HTML
- logical heading order
- keyboard-accessible controls
- visible focus states
- sufficient contrast
- descriptive labels for interactive selectors
- no critical information conveyed only through color
- respect reduced-motion preference
- accessible CTA buttons and tabs

---

# 28. Performance

The website should feel like a high-end product site but remain fast.

Prefer:
- CSS
- SVG
- React
- optimized icons
- lightweight motion

Avoid:
- giant autoplay background videos
- unnecessary canvas rendering
- excessive client-side JS
- huge animation libraries for simple effects

Use client components only when interaction requires them.

---

# 29. Content / claims rules

Never invent a platform capability.

Never invent customer evidence.

Never imply roadmap functionality is built.

Never imply:
- full HITL pause/resume
- human approval loops
- automatic learning from human resolutions

Never imply the platform replaces:
- customer IAM
- enterprise RBAC
- security controls
- enterprise applications
- systems of record

Never call the product `BIWARES.IA`.

Until naming is approved:
- visible brand placeholder = `BRAND LOGO`

If technical uncertainty appears during implementation:
- leave a TODO / placeholder
- ask before inventing the claim

---

# 30. Writing style

Copy should feel:

- concise
- confident
- enterprise
- technical without being obscure
- outcome-focused
- concrete
- low on hype

Prefer:

> Execute real actions across your business systems.

Over:

> Transform your business with revolutionary AI.

Prefer:

> Sensitive data protected before model invocation.

Over:

> Unbreakable AI security.

Prefer:

> Intelligent Handoff.

Over:

> Seamless human-AI synergy.

---

# 31. Messaging hierarchy

1. Category
   - Enterprise Agentic AI Platform

2. Promise
   - From conversation to execution.

3. Trust
   - Governed by your enterprise. Controlled by design.

4. Explanation
   - AI agents understand intent, access trusted enterprise knowledge, orchestrate capabilities and execute real actions across business systems.

5. Platform
   - Connect → Understand → Know → Orchestrate → Act → Insight

6. Enterprise foundation
   - Protect → Control → Observe
   - Control → Integrate → Observe

7. Proof
   - real execution flows
   - real systems
   - real outcomes

---

# 32. Key phrases approved for use

Approved:

> From conversation to execution.

> Governed by your enterprise. Controlled by design.

> We don’t stop at answers. We execute.

> Chatbots answer. AI agents act.

> The difference isn’t the conversation. It’s what happens next.

> See the platform at work.

> One platform. From intent to outcome.

> Autonomy without losing control.

> Share meaning. Not sensitive data.

> Autonomous when it can. Human when it should.

> Connect AI to the systems that run your business.

> Your systems remain the systems of record.

Use these consistently.
Do not create ten alternative taglines without a specific reason.

---

# 33. First task for Codex

Read this entire file before modifying the project.

Then:

1. Inspect the current repository.
2. Confirm the existing Next.js / Tailwind structure.
3. Do not delete useful existing project setup.
4. Establish design tokens for the approved palette.
5. Create the typography system with Roobert-ready headline tokens and Inter for body/UI.
6. Implement the Navbar.
7. Implement the Hero only.
8. Build the Hero execution workflow as real React/CSS/SVG UI, not as an image.
9. Implement the Telecom flow first.
10. Make the flow responsive and accessible.
11. Stop after the Hero is working well and report:
   - files created / modified
   - implementation decisions
   - anything requiring product/design confirmation

Do not proceed to the rest of the homepage until the Hero has been reviewed.


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
