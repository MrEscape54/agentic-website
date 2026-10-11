import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import { platformConnections } from "@/lib/data/platform";
import "./platform-connectivity.css";

const accessRoutes: { gateway: string; destination: string; icon: IconName }[] = [
  { gateway: "LLM Gateway", destination: "Approved models", icon: "layers" },
  { gateway: "MCP Gateway", destination: "Approved tools", icon: "code" },
  { gateway: "A2A Gateway", destination: "Approved agent endpoints", icon: "people" },
];

export function PlatformEcosystem() {
  return <section id="ecosystem" className="home-section section-rule" aria-labelledby="ecosystem-title"><div className="page-shell">
    <div className="section-topline"><SectionHeading id="ecosystem-title" eyebrow="A CONNECTED ECOSYSTEM">Built to connect.<br /><em>Designed to adapt.</em></SectionHeading><p className="section-aside">Use the infrastructure your enterprise trusts. Models, tools and agent ecosystems connect through governed interfaces, without locking orchestration to a single provider.</p></div>
    <div className="ecosystem-layout"><div className="platform-connections">{platformConnections.map(connection => <article key={connection.title}><IconTile name={connection.icon} /><div><h3>{connection.title}</h3><p>{connection.copy}</p><details><summary>{connection.label}</summary><p>{connection.detail}</p></details></div></article>)}</div>
      <figure className="ecosystem-diagram"><figcaption>GOVERNED ACCESS. PLUGGABLE IMPLEMENTATIONS.</figcaption><div className="ecosystem-policy"><Icon name="shield" size={22} /><div><strong>Enterprise Control</strong><p>Defines policy · Coordinates decisions</p></div></div><p className="ecosystem-policy-link"><span aria-hidden="true">↓</span> Access gateways enforce policy at interaction boundaries</p><div className="ecosystem-access-map"><div className="ecosystem-orchestration"><Icon name="operations" size={26} /><strong>Orchestration Engine</strong><p>Coordinates agents, workflows and execution context</p></div><div className="ecosystem-routes"><div className="ecosystem-umbrella"><strong>ENTERPRISE AI GATEWAY</strong><span>Logical umbrella for governed access</span></div>{accessRoutes.map(route => <div className="ecosystem-route" key={route.gateway}><span className="ecosystem-route-gate" aria-hidden="true"><Icon name="shield" size={17} />→</span><div className="ecosystem-route-node"><Icon name={route.icon} size={19} /><strong>{route.gateway}</strong></div><span className="ecosystem-route-arrow" aria-hidden="true">→</span><div className="ecosystem-route-node ecosystem-destination"><strong>{route.destination}</strong></div></div>)}</div></div><div className="ecosystem-action"><div><Icon name="play" size={22} /><div><strong>Action Engine</strong><p>Validates and executes business actions</p></div></div><p>Orchestration coordinates business execution through the Action Engine. Tool access is distinct from business action execution.</p></div><div className="ecosystem-implementations"><p>Native · Open source · Third-party · Customer-managed</p><span>Subject to compatibility and required policy enforcement.</span></div></figure>
    </div>
    <div className="ecosystem-footer"><p><Icon name="key" size={23} /><strong>Your infrastructure. Our orchestration.</strong></p><div><p>Stable contracts and adapters separate platform capabilities from underlying implementations. Customer IAM and application permissions remain authoritative.</p><span>Pluggability does not imply universal compatibility.</span></div></div>
  </div></section>;
}
