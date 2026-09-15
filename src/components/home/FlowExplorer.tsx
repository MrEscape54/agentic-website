"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { ExecutionCase } from "@/lib/data/execution-cases";

type Detail = { title: string; role: string; context: string };

export function FlowExplorer({ example }: { example: ExecutionCase }) {
  const [detail, setDetail] = useState<Detail | null>(null);
  const origin = useRef<HTMLButtonElement | null>(null);
  const panel = useRef<HTMLElement | null>(null);
  function close() { setDetail(null); origin.current?.focus({ preventScroll: true }); }
  function node(title: string, role: string, context: string, className = "") {
    return <button key={title} type="button" className={`explore-node ${className}`} aria-expanded={detail?.title === title} aria-controls={detail ? "flow-component-detail" : undefined} onClick={event => {
      origin.current = event.currentTarget;
      setDetail({ title, role, context });
      requestAnimationFrame(() => { panel.current?.focus({ preventScroll: true }); panel.current?.scrollIntoView({ block: "nearest", behavior: "instant" }); });
    }}>{title}<span className="node-explore-mark" aria-hidden="true">+</span></button>;
  }
  return <div className={`flow-explorer ${detail ? "has-detail" : ""}`} onKeyDown={event => { if (event.key === "Escape" && detail) { event.preventDefault(); close(); } }}>
    <div className="architecture-flow">
      <p className="explore-cue">Explore the flow <span aria-hidden="true">↓</span></p>
      <div className="orchestration-intro">{node("Orchestration Engine", "Coordinates specialized agents and reusable skills.", example.steps[3].detail, "orchestration-node")}
      <p className="orchestration-caption">Coordinates specialized agents and reusable skills</p></div>
      <div className="agent-nodes">{example.agents.map(agent => <div key={agent}><Icon name="layers" />{node(agent, "A specialized agent in this execution.", agent === "Knowledge Agent" ? example.knowledge : `${example.request} ${example.steps[3].detail}`)}</div>)}</div>
      <span className="flow-stem" aria-hidden="true" /><div className="architecture-label">REUSABLE SKILLS</div>
      <div className="architecture-skills">{example.skills.map(skill => node(skill, "A reusable skill selected for this execution.", example.steps[3].description))}</div>
      <span className="flow-stem" aria-hidden="true" />
      <div className="architecture-knowledge"><Icon name="book" size={18} /><div>{node("Trusted enterprise knowledge", "Grounds agents in trusted enterprise knowledge.", example.knowledge)}<p>{example.knowledge}</p></div></div>
      <span className="flow-stem" aria-hidden="true" />
      {node("Action Engine", "Real values are resolved internally when execution requires them.", example.action, "action-engine")}
      <span className="flow-stem" aria-hidden="true" />
      <div className="architecture-systems">{example.systems.map(system => node(system.name, "An enterprise system category in this illustrative workflow.", example.steps.filter(step => step.system === system.name).map(step => step.detail).join(" ") || example.knowledge))}</div>
      <div className="architecture-outcome"><Icon name="check" size={18} /><strong>{example.outcome}</strong><span>Execution traced</span></div>
    </div>
    {detail && <aside id="flow-component-detail" className="flow-component-detail" ref={panel} tabIndex={-1} aria-labelledby="flow-detail-title">
      <button className="detail-close" type="button" onClick={close} aria-label="Close component details">Close <span aria-hidden="true">×</span></button>
      <p className="section-eyebrow">{example.label}</p><h3 id="flow-detail-title">{detail.title}</h3><p>{detail.role}</p>
      <h4>In this execution</h4><p>{detail.context}</p>
      <h4>Outcome</h4><p>{example.outcome}</p>
    </aside>}
  </div>;
}
