"use client";
import { useText } from "@/i18n/useText";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import "./platform-execution.css";

const preparation = [
  { title: "Understand the request", description: "The agent identifies the business goal and retains the relevant conversation context.", layer: "Conversation & intent", system: "Business intent · Conversation context" },
  { title: "Gather trusted context", description: "Trusted enterprise knowledge informs the next step. Sensitive context is protected before model reasoning.", layer: "Knowledge & protected context", system: "Trusted knowledge · Protected context" },
  { title: "Check permissions", description: "User and agent identity, approved tools and business policy determine which actions are permitted.", layer: "Enterprise governance", system: "Identity · Policy" },
  { title: "Prepare the action", description: "The orchestrator coordinates specialist agents and reusable skills to prepare the proposed business action.", layer: "Orchestration & skills", system: "Agents · Skills · Enterprise tools" },
];
const review = { title: "Human decision", description: "The agent prepares the proposal with relevant context. An authorized reviewer decides before the action can proceed.", layer: "Human oversight", system: "Authorized reviewer" };
const completion = [
  { title: "Execute the authorized action", description: "The Action Engine validates the action, resolves trusted parameters and executes through approved tools and APIs. The model does not execute the transaction directly.", layer: "Action Engine", system: "Approved tools & APIs · Enterprise systems" },
  { title: "Trace the outcome", description: "Correlated execution records link the initiating user, responsible agent, policy decisions and business outcome. Operational telemetry and durable audit evidence retain their separate responsibilities.", layer: "Telemetry & observability", system: "Enterprise observability · Audit evidence" },
];

export function PlatformExecution() {
  const t = useText();
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
    <div className="platform-workflow-header"><div className="platform-scenarios" role="group" aria-label={t("Choose execution scenario")}>
      <button aria-pressed={!exception} onClick={() => reset(false)}>{t("Within enterprise rules")}</button>
      <button aria-pressed={exception} onClick={() => reset(true)}>{t("Human approval required")}</button>
    </div><span className="platform-example-label">{t("ILLUSTRATIVE WORKFLOW")}</span></div>
    <div className="platform-request"><Icon name="receipt" size={22} /><div><strong>{t("Business request")}</strong><p>{t(exception ? "A proposed action with a policy exception." : "A business task within enterprise rules.")}</p></div></div>
    <div className="platform-execution-grid">
      <ol className="platform-step-list" aria-label={t("Execution sequence")}>{steps.map((item, index) => <li key={item.title} aria-current={step === index ? "step" : undefined} data-done={index < step}><span>{index < step ? <Icon name="check" size={13} /> : String(index + 1).padStart(2, "0")}</span>{t(item.title)}</li>)}</ol>
      <div className="platform-step-panel">
        <div role="status" aria-atomic="true">
          <p className="section-eyebrow">{stopped ? t("EXECUTION STOPPED") : complete ? t("RESOLVED") : t(current.layer).toUpperCase()}</p>
          <h3>{t(stopped ? "Action not executed." : complete ? "Business task completed." : atReview ? "A decision before execution." : current.title)}</h3>
          <p>{t(stopped ? "The reviewer rejected the proposal. Enterprise systems remain unchanged and the decision is recorded." : atReview && decision === "approved" ? "The decision is recorded. The agent may now continue with the approved proposal." : atReview && decision === "changes" ? "The reviewer requested changes. The agent must revise the proposal before another review." : atReview && revised ? "The revised proposal is ready for review; execution remains paused until an authorized reviewer approves it." : current.description)}</p>
          <div className="platform-system"><span><Icon name={atReview ? "people" : "layers"} size={19} />{t(current.system)}</span>{atReview && <span className="platform-review-status"><Icon name={decision === "approved" ? "check" : stopped ? "close" : "pause"} size={17} />{t(stopped ? "Execution stopped" : decision === "approved" ? "Continuation authorized" : "Execution paused")}</span>}</div>
          {exception && step >= 3 && <dl className="platform-proposal"><div><dt><Icon name="receipt" size={18} />{t("Proposed action")}</dt><dd>{t(revised ? "Revised proposal" : "Prepared for review")}</dd></div><div><dt><Icon name="shield" size={18} />{t("Policy condition")}</dt><dd>{t(decision === "approved" ? "Approval recorded" : stopped ? "Proposal rejected" : "Approval required")}</dd></div></dl>}
        </div>
        {atReview && !stopped && <div className="platform-decisions" role="group" aria-label={t("Human review decision")}>
          {decision === "pending" && <><button className="button button-primary" onClick={() => decide("approved", "Human approved the proposal")}><Icon name="check" size={16} />{t("Approve")}</button><button className="button platform-secondary" onClick={() => decide("rejected", "Human rejected · no action executed")}><Icon name="close" size={16} />{t("Reject")}</button><button className="button platform-secondary" onClick={() => decide("changes", "Human requested changes to the proposal")}>{t("Request changes")}</button></>}
          {decision === "changes" && <button className="button button-primary" onClick={() => { setRevised(true); decide("pending", "Agent revised the proposal · awaiting review"); }}>{t("Prepare revised proposal")}</button>}
        </div>}
        {atReview && !stopped && <p className="platform-decision-note">{t("Approval permits continuation. Rejection stops the action.")}</p>}
        <div className="platform-playback"><button className="button button-primary" disabled={complete || stopped || waiting} onClick={next}>{t(complete ? "Execution complete" : atReview ? "Continue execution" : "Next step")}<Icon name="arrow" size={16} /></button><button className="button platform-secondary" onClick={() => reset()}><Icon name="replay" size={15} />{t("Restart")}</button></div>
        <details className="platform-trace"><summary>{t("Execution trace · ")}{events.length}{t(" events")}</summary><ol>{events.map((event, index) => <li key={`${index}-${event}`}>{t(event)}</li>)}</ol><p>{t("Illustrative events, not live system logs.")}</p></details>
      </div>
    </div>
  </div>;
}
