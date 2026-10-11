import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import "./enterprise-observability.css";

const executionRecord = [
  { label: "WHO", title: "Customer + plan agent", copy: "Initiating user and executing workload" },
  { label: "UNDER WHICH RULE", title: "Commercial exception policy", copy: "Approval required before a fee waiver" },
  { label: "WHO DECIDED", title: "Authorized reviewer", copy: "Decision linked to the proposed action" },
  { label: "WHAT HAPPENED", title: "Billing updated", copy: "Approved transaction and result recorded" },
];
const evidence: { eyebrow: string; title: string; icon: IconName; copy: string; tags: { label: string; icon: IconName }[]; destination: string }[] = [
  { eyebrow: "OPERATIONAL TELEMETRY", title: "Understand what is happening.", icon: "signal", copy: "The Observability Hub collects and correlates operational traces, metrics and logs across channels, orchestration, models, tool access and agent interactions. Stable correlation identifiers connect policy decisions, human approvals, business actions and outcomes.", tags: [{ label: "Traces", icon: "code" }, { label: "Metrics", icon: "signal" }, { label: "Logs", icon: "receipt" }], destination: "Existing monitoring & SIEM" },
  { eyebrow: "AUDIT & ACCOUNTABILITY", title: "Retain evidence of what happened.", icon: "book", copy: "Maintain durable evidence of policy decisions, approvals, access events, business actions and outcomes. Enterprise-governed integrity, access and retention apply independently of the operational observability backend.", tags: [{ label: "Integrity", icon: "shield" }, { label: "Access", icon: "people" }, { label: "Retention", icon: "database" }], destination: "Enterprise audit systems" },
];

export function EnterpriseObservability() {
  return <section id="observability" className="home-section section-rule" aria-labelledby="observability-title"><div className="page-shell">
    <div className="section-topline"><SectionHeading id="observability-title" eyebrow="OBSERVE · AUDIT">One execution.<br /><em>End-to-end visibility.</em></SectionHeading><p className="section-aside">Follow decisions, approvals and actions across the execution lifecycle. Connect operational telemetry and accountability records to your existing observability and audit systems.</p></div>
    <figure className="observe-record"><figcaption>ILLUSTRATIVE EXECUTION RECORD · PLAN CHANGE</figcaption><ol>{executionRecord.map((event, index) => <li key={event.label}><span className="observe-event-number" aria-hidden="true">0{index + 1}</span><span className="observe-event-label">{event.label}</span><strong>{event.title}</strong><p>{event.copy}</p></li>)}</ol><p className="observe-correlation"><Icon name="code" size={18} />Stable correlation identifiers connect the execution.</p></figure>
    <div className="observe-evidence">{evidence.map(item => <article key={item.eyebrow}><IconTile name={item.icon} /><div className="observe-evidence-body"><p className="observe-eyebrow">{item.eyebrow}</p><h3>{item.title}</h3><p className="observe-evidence-copy">{item.copy}</p><ul className="observe-tags">{item.tags.map(tag => <li key={tag.label}><Icon name={tag.icon} size={20} />{tag.label}</li>)}</ul><div className="observe-destination"><span><Icon name="arrow" size={16} />{item.destination}</span></div></div></article>)}</div>
    <p className="observe-separation">Separate responsibilities. Connected through execution context.</p>
    <div className="observe-integration"><IconTile name="code" /><h3>Connect to the tools you already trust.</h3><p>Open interfaces and pluggable export adapters connect operational telemetry and separate accountability records to existing monitoring, SIEM and audit systems.</p></div>
    <div className="observe-privacy"><Icon name="shield" size={20} /><p>Sensitive prompts, credentials, customer identifiers and confidential tool arguments are excluded from telemetry by default.<br />Enterprise policies govern redaction, sampling, access and export destinations; durable audit records follow their own integrity and retention requirements.</p></div>
  </div></section>;
}
