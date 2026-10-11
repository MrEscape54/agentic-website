import Link from "next/link";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import "./platform-connectivity.css";

const signals: { label: string; icon: IconName }[] = [
  { label: "Conversations & channels", icon: "customers" },
  { label: "Orchestration & delegation", icon: "operations" },
  { label: "Models, tools & agent interactions", icon: "layers" },
  { label: "Policy decisions", icon: "receipt" },
  { label: "Human approvals", icon: "people" },
  { label: "Business actions & outcomes", icon: "check" },
];
const principles: { title: string; copy: string; icon: IconName }[] = [
  { title: "Pluggable by architecture.", copy: "Connect operational telemetry through open interfaces and adapters to the tools your enterprise already trusts.", icon: "code" },
  { title: "Sensitive context protected.", copy: "Sensitive prompts, credentials, customer identifiers and confidential tool arguments are excluded from telemetry by default.", icon: "shield" },
  { title: "Audit remains independent.", copy: "Durable evidence of policies, approvals, access, actions and outcomes follows enterprise-governed integrity and retention, separately from operational telemetry.", icon: "book" },
];

export function PlatformObservability() {
  return <section id="enterprise" className="home-section section-rule platform-observability" aria-labelledby="platform-governance-title"><div className="page-shell">
    <div className="section-topline"><SectionHeading id="platform-governance-title" eyebrow="END-TO-END OBSERVABILITY">Observable by design.<br /><em>Pluggable by architecture.</em></SectionHeading><p className="section-aside">Every execution produces correlated visibility across agents, models, tools and enterprise actions. Open interfaces connect that intelligence to the observability systems your enterprise already uses.</p></div>
    <figure className="platform-telemetry"><figcaption>CORRELATED OPERATIONAL TELEMETRY</figcaption><div className="platform-telemetry-map"><div className="platform-telemetry-signals"><p>EXECUTION SIGNALS</p><ul>{signals.map(signal => <li key={signal.label}><Icon name={signal.icon} size={19} /><span>{signal.label}</span></li>)}</ul></div><span className="platform-telemetry-connector" aria-hidden="true">→</span><div className="platform-telemetry-hub"><div><IconTile name="signal" /><h3>Observability Hub</h3><p>Collect · Correlate · Distribute</p></div><span>Stable correlation identifiers</span></div><div className="platform-telemetry-adapters"><Icon name="code" size={24} /><span>Open interfaces<br />& adapters</span></div><ul className="platform-telemetry-destinations">{[{ title: "Existing monitoring", icon: "signal" as const }, { title: "Enterprise SIEM", icon: "shield" as const }, { title: "Operational analytics", icon: "operations" as const }].map(destination => <li key={destination.title}><Icon name={destination.icon} size={20} />{destination.title}</li>)}</ul></div><p className="platform-telemetry-caption">End-to-end context across execution. Your choice of observability backend.</p></figure>
    <div className="platform-observability-principles">{principles.map(principle => <article key={principle.title}><IconTile name={principle.icon} /><h3>{principle.title}</h3><p>{principle.copy}</p></article>)}</div>
    <div className="platform-observability-footer"><p>Enterprise policies govern redaction, sampling, access and export.</p><Link className="text-link" href="/enterprise">Explore enterprise controls <Icon name="arrow" size={16} /></Link></div>
  </div></section>;
}
