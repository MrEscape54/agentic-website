import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "./SectionHeading";
import type { CSSProperties } from "react";

const nodes = [
  { label: "CRM", x: 20, y: 24 }, { label: "ERP", x: 50, y: 12 },
  { label: "HCM", x: 80, y: 24 }, { label: "Core Systems", x: 88, y: 53 },
  { label: "Billing", x: 80, y: 82 }, { label: "Databases", x: 50, y: 94 },
  { label: "Knowledge", x: 20, y: 82 }, { label: "APIs", x: 12, y: 53 },
];

export function Integrations() {
  return <section id="integrations" className="home-section light-section section-rule" aria-labelledby="integrations-title"><div className="page-shell integration-layout"><SectionHeading id="integrations-title" eyebrow="INTEGRATIONS" description="Your systems remain the systems of record. The platform becomes the intelligent execution layer connecting intent to action.">Connect AI to the systems<br />that run <em>your business.</em></SectionHeading><div className="integration-network" aria-label="The platform connects with enterprise system categories"><svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{nodes.map(node => <g key={node.label}><path d={`M50 53 L${node.x} ${node.y}`} /><path className="network-signal" pathLength="1" d={`M50 53 L${node.x} ${node.y}`} /></g>)}</svg><div className="network-core"><Icon name="layers" size={34} /><strong>BRAND LOGO</strong><span>Execution layer</span></div>{nodes.map(node => <div className="network-node" key={node.label} style={{ "--node-x": `${node.x}%`, "--node-y": `${node.y}%` } as CSSProperties}><Icon name={node.label === "APIs" ? "code" : node.label === "Knowledge" ? "book" : "database"} size={22} /><span>{node.label}</span></div>)}</div></div></section>;
}
