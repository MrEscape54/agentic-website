"use client";

import Link from "next/link";
import { useRef } from "react";
import { useCapabilityScroll } from "./useCapabilityScroll";
import { capabilities as currentCapabilities } from "@/lib/data/home";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import "./capabilities.css";

const diagrams: { icon: IconName; nodes: { label: string; icon: IconName }[] }[] = [
  { icon: "book", nodes: [{ label: "Request", icon: "customers" }, { label: "Trusted knowledge", icon: "book" }, { label: "Context", icon: "layers" }] },
  { icon: "layers", nodes: [{ label: "Agents", icon: "people" }, { label: "Skills & tools", icon: "operations" }, { label: "Business action", icon: "check" }] },
  { icon: "shield", nodes: [{ label: "Identity", icon: "key" }, { label: "Policies", icon: "shield" }, { label: "Human oversight", icon: "people" }] },
  { icon: "signal", nodes: [{ label: "Enterprise systems", icon: "database" }, { label: "Integration", icon: "code" }, { label: "Execution visibility", icon: "signal" }] },
];

export function Capabilities({ groups = currentCapabilities, description = "Explore the engines and studios that connect understanding, knowledge and controlled execution." }: { groups?: typeof currentCapabilities; compact?: boolean; description?: string }) {
  const { sectionRef, stageRef, active, select } = useCapabilityScroll(groups.length);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  return <section ref={sectionRef} id="capabilities" className="capability-section capability-explorer" aria-labelledby="capabilities-title">
    <div ref={stageRef} className="capability-explorer-stage">
      <div className="page-shell">
        <div className="capability-explorer-heading"><div><p className="section-eyebrow">PLATFORM CAPABILITIES</p><h2 id="capabilities-title" className="section-title">The technology behind<br />every execution.</h2></div><p>{description}</p></div>
        <div className="capability-explorer-layout">
          <div className="capability-index">
            <div role="tablist" aria-label="Platform capabilities" aria-orientation="vertical">{groups.map((group, index) => <button key={group.title} ref={element => { tabs.current[index] = element; }} role="tab" id={`capability-tab-${index}`} aria-controls={`capability-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => {
              const next = event.key === "ArrowDown" ? (index + 1) % groups.length : event.key === "ArrowUp" ? (index + groups.length - 1) % groups.length : event.key === "Home" ? 0 : event.key === "End" ? groups.length - 1 : null;
              if (next !== null) { event.preventDefault(); select(next); tabs.current[next]?.focus({ preventScroll: true }); }
            }}><span>0{index + 1}</span><strong>{group.title}</strong><Icon name="arrow" size={18} /></button>)}</div>
            <p className="capability-index-hint"><span className="capability-scroll-hint">Scroll to explore · </span>Select a capability</p>
          </div>
          <div className="capability-details">{groups.map((group, index) => {
            const diagram = diagrams[index % diagrams.length];
            return <article key={group.title} className="capability-detail" role="tabpanel" id={`capability-panel-${index}`} aria-labelledby={`capability-tab-${index}`} aria-hidden={active !== index} inert={active !== index} tabIndex={0}>
              <div className="capability-detail-meta"><IconTile name={diagram.icon} /><span>0{index + 1} <i>/ 0{groups.length}</i></span></div>
              <h3>{group.title}</h3><p>{group.description}</p>
              <ol className="capability-mini-flow" aria-label={`${group.title} overview`}>{diagram.nodes.map(node => <li key={node.label} data-outcome={node.icon === "check"}><Icon name={node.icon} size={28} /><span>{node.label}</span></li>)}</ol>
              <ul className="capability-detail-modules">{group.modules.map(module => <li key={module}><Icon name="check" size={15} /><span>{module}</span></li>)}</ul>
            </article>;
          })}</div>
        </div>
        <div className="capability-explorer-footer"><div aria-hidden="true"><span>0{active + 1} / 0{groups.length}</span>{groups.map((group, index) => <i key={group.title} data-active={index === active} />)}</div><Link href="/platform">Explore the Platform <Icon name="arrow" size={18} /></Link></div>
      </div>
    </div>
  </section>;
}
