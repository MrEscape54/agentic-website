"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { executionCases } from "@/lib/data/execution-cases";
import { SectionHeading } from "./SectionHeading";

import { FlowExplorer } from "./FlowExplorer";
const views = ["Execution Flow", "Details", "System Logs"];

export function PlatformAtWork() {
  const [view, setView] = useState(0);
  const [selected, setSelected] = useState(0);
  const example = executionCases[selected];
  return <section id="platform-at-work" className="home-section dark-section" aria-labelledby="work-title"><div className="page-shell work-layout">
    <div><SectionHeading id="work-title" eyebrow="AGENTIC ORCHESTRATION" description="Here’s how agents, skills, enterprise knowledge and systems work together to turn intent into action.">See the platform<br /><em>at work.</em></SectionHeading><p className="scenario-label">Choose a scenario</p><div className="work-case-selector" role="group" aria-label="Choose an architecture example">{executionCases.map((item, index) => <button key={item.id} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.label}</button>)}</div><p className="work-request"><Icon name="signal" size={18} />{example.request}</p><p className="work-context">Illustrative workflow · Explore the architecture behind the outcome.</p></div>
    <div className="work-console"><div className="work-tabs" role="tablist" aria-label="Platform execution views">{views.map((label, index) => <button key={label} id={`work-tab-${index}`} role="tab" aria-selected={view === index} aria-controls={`work-panel-${index}`} tabIndex={view === index ? 0 : -1} onClick={() => setView(index)} onKeyDown={event => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? views.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + views.length) % views.length;
      setView(next); document.getElementById(`work-tab-${next}`)?.focus();
    }}>{label}</button>)}</div>
    <div id={`work-panel-${view}`} role="tabpanel" aria-labelledby={`work-tab-${view}`} tabIndex={0} className="work-panel">
      {view === 0 && <FlowExplorer key={example.id} example={example} />}
      {view === 1 && <div className="execution-details"><h3>From protected context to controlled action.</h3><dl><div><dt>Knowledge</dt><dd>{example.knowledge}</dd></div><div><dt>LLM Gateway</dt><dd>Sensitive data is tokenized before model invocation. The model reasons with protected context.</dd></div><div><dt>Orchestration</dt><dd>Agents coordinate {example.skills.join(", ")}.</dd></div><div><dt>Action Engine</dt><dd>Real values are resolved internally when execution requires them. {example.action}</dd></div><div><dt>Observability</dt><dd>Execution traces make the path from intent to outcome inspectable.</dd></div></dl></div>}
      {view === 2 && <div className="example-logs"><p className="log-notice">ILLUSTRATIVE TRACE · {example.label.toUpperCase()}</p><ol>{example.steps.map((step, index) => <li key={step.label}><span>0{index + 1}</span><div><strong>{step.label.toUpperCase()}</strong><p>{index === 4 ? example.result : step.title}</p></div><Icon name="check" size={15} /></li>)}</ol><p className="log-footnote">Example events for this demonstration, not a live system log.</p></div>}
    </div></div>
  </div><div className="page-shell"><div className="platform-foundation"><strong>CONTROL · INTEGRATE · OBSERVE</strong><span>Control Studio <i>·</i> Integration Hub <i>·</i> Telemetry Engine <i>·</i> Observability Hub</span></div></div></section>;
}
