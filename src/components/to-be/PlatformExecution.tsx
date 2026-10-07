"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

const preparation = [
  { title: "Understand the request", description: "The customer wants to change their mobile plan. The agent identifies the goal and retains the conversation context.", layer: "Conversation & intent", system: "Customer channel" },
  { title: "Gather trusted context", description: "The agent retrieves the current contract and available plans. Sensitive context is protected before model reasoning.", layer: "Knowledge & protected context", system: "CRM · Knowledge" },
  { title: "Check permissions", description: "User and agent identity, approved tools and business policy determine which actions are permitted.", layer: "Enterprise governance", system: "Identity · Policy" },
  { title: "Prepare the change", description: "The orchestrator coordinates reusable skills to check eligibility and prepare the billing update.", layer: "Orchestration & skills", system: "CRM · Billing" },
];
const review = { title: "Human decision", description: "A fee waiver requires an authorized commercial reviewer. Execution waits for a decision; the agent cannot update billing yet.", layer: "Human oversight", system: "Authorized reviewer" };
const completion = [
  { title: "Execute the authorized action", description: "The Action Engine applies the authorized plan change through enterprise tools. The model does not execute the transaction directly.", layer: "Action Engine", system: "Billing" },
  { title: "Trace the outcome", description: "The execution record links the initiating user, responsible agent, policy checks and billing update. The enterprise can inspect the outcome in its operational tools.", layer: "Telemetry & observability", system: "Enterprise observability" },
];

export function PlatformExecution() {
  const [exception, setException] = useState(false);
  const [step, setStep] = useState(0);
  const [decision, setDecision] = useState<"pending" | "approved" | "rejected" | "changes">("pending");
  const [revised, setRevised] = useState(false);
  const [events, setEvents] = useState(["Request understood"]);
  const steps = [...preparation, ...(exception ? [review] : []), ...completion];
  const current = steps[step];
  const atReview = exception && step === preparation.length;
  const complete = step === steps.length - 1;
  const stopped = decision === "rejected";
  const waiting = atReview && decision !== "approved";

  function reset(nextException = exception) {
    setException(nextException); setStep(0); setDecision("pending"); setRevised(false); setEvents(["Request understood"]);
  }
  function next() {
    if (complete || stopped || waiting) return;
    setStep(step + 1);
    setEvents(previous => [...previous, steps[step + 1].title]);
  }
  function decide(nextDecision: typeof decision, event: string) {
    setDecision(nextDecision); setEvents(previous => [...previous, event]);
  }

  return <div className="platform-execution">
    <div className="platform-scenarios" role="group" aria-label="Choose execution scenario">
      <button aria-pressed={!exception} onClick={() => reset(false)}>Standard plan change<span>Within enterprise rules</span></button>
      <button aria-pressed={exception} onClick={() => reset(true)}>Commercial exception<span>Human approval required</span></button>
    </div>
    <div className="platform-request"><Icon name="people" size={19} /><span>“I need to change my mobile plan.”</span><span className="platform-example-label">ILLUSTRATIVE WORKFLOW</span></div>
    <div className="platform-execution-grid">
      <ol className="platform-step-list" aria-label="Execution sequence">{steps.map((item, index) => <li key={item.title} aria-current={step === index ? "step" : undefined} data-done={index < step}><span>{index < step ? <Icon name="check" size={13} /> : String(index + 1).padStart(2, "0")}</span>{item.title}</li>)}</ol>
      <div className="platform-step-panel">
        <div role="status" aria-atomic="true">
          <p className="section-eyebrow">{stopped ? "EXECUTION STOPPED" : complete ? "RESOLVED" : current.layer.toUpperCase()}</p>
          <h3>{stopped ? "Change not executed." : complete ? "Plan updated." : current.title}</h3>
          <p>{stopped ? "The reviewer rejected the proposal. Billing remains unchanged and the decision is recorded." : atReview && decision === "approved" ? "The decision is recorded. The agent may now continue with the approved proposal." : atReview && decision === "changes" ? "The reviewer requested removal of the fee waiver. The agent must revise the proposal before another review." : atReview && revised ? "The fee waiver has been removed. The revised proposal is ready for review; execution remains paused." : current.description}</p>
          <div className="platform-system"><Icon name={atReview ? "people" : "layers"} size={17} />{current.system}</div>
          {exception && step >= 3 && <p className="platform-proposal">Proposed change: mobile plan update · {revised ? "fee waiver removed" : "fee waiver requested"}</p>}
        </div>
        {atReview && !stopped && <div className="platform-decisions" role="group" aria-label="Human review decision">
          {decision === "pending" && <><button className="button button-primary" onClick={() => decide("approved", "Human approved the proposal")}>Approve</button><button className="button platform-secondary" onClick={() => decide("rejected", "Human rejected · no billing update")}>Reject</button><button className="button platform-secondary" onClick={() => decide("changes", "Human requested removal of fee waiver")}>Request changes</button></>}
          {decision === "changes" && <button className="button button-primary" onClick={() => { setRevised(true); decide("pending", "Agent revised the proposal · awaiting review"); }}>Prepare revised proposal</button>}
        </div>}
        <div className="platform-playback"><button className="button button-primary" disabled={complete || stopped || waiting} onClick={next}>{complete ? "Execution complete" : atReview ? "Continue execution" : "Next step"}<Icon name="arrow" size={16} /></button><button className="button platform-secondary" onClick={() => reset()}><Icon name="replay" size={15} />Restart</button></div>
        <details className="platform-trace"><summary>Execution trace · {events.length} events</summary><ol>{events.map((event, index) => <li key={`${index}-${event}`}>{event}</li>)}</ol><p>Illustrative events, not live system logs.</p></details>
      </div>
    </div>
  </div>;
}
