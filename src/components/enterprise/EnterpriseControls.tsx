import Link from "next/link";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import { enterpriseControls } from "@/lib/data/enterprise";
import "./enterprise-controls.css";

function Node({ icon, children, highlighted = false }: { icon: IconName; children: React.ReactNode; highlighted?: boolean }) {
  return <span className={`control-node${highlighted ? " control-node-highlight" : ""}`}><Icon name={icon} size={18} />{children}</span>;
}

function ControlIllustration({ id }: { id: string }) {
  if (id === "identity") return <figure className="control-illustration"><div className="control-mini-flow"><Node icon="people">User</Node><span className="control-connector" aria-hidden="true">→</span><Node icon="layers">Agent</Node><span className="control-connector" aria-hidden="true">→</span><Node icon="receipt">Action</Node></div><figcaption className="control-identity-caption"><Icon name="key" size={15} />Enterprise identity & permissions</figcaption></figure>;
  if (id === "policy") return <figure className="control-illustration control-policy"><div className="control-policy-source"><Icon name="shield" size={16} />ENTERPRISE POLICY</div><div className="control-policy-targets">{([{ label: "Models", icon: "layers" }, { label: "Tools", icon: "code" }, { label: "Agents", icon: "people" }] as const).map(target => <div key={target.label}><span className="control-policy-gate"><Icon name="key" size={13} /></span><Node icon={target.icon}>{target.label}</Node></div>)}</div><figcaption>Enforced at interaction boundaries</figcaption></figure>;
  if (id === "data") return <figure className="control-illustration control-protected"><div className="control-mini-label">PROTECTED MODEL CONTEXT</div><div className="control-tokenization"><span>Customer ID <span className="control-sensitive-value">34.123.456</span></span><span aria-hidden="true">→</span><code>{"{CUSTOMER_ID}"}</code></div><figcaption>Real values resolved internally for authorized actions.</figcaption></figure>;
  return <figure className="control-illustration control-review"><div className="control-mini-flow"><Node icon="receipt">Proposal</Node><span className="control-connector" aria-hidden="true">→</span><Node icon="people" highlighted>Human decision</Node><span className="control-connector" aria-hidden="true">→</span><Node icon="check">Continue if approved</Node></div><figcaption>Reject → Stop <span aria-hidden="true">·</span> Changes → Review</figcaption></figure>;
}

export function EnterpriseControls() {
  return <section id="controls" className="home-section section-rule" aria-labelledby="enterprise-controls-title"><div className="page-shell">
    <div className="section-topline"><SectionHeading id="enterprise-controls-title" eyebrow="PROTECT · CONTROL">Your rules.<br /><em>Across the execution.</em></SectionHeading><p className="section-aside">Keep access, data handling and human oversight connected to each action—not just to the initial sign-in.</p></div>
    <div className="enterprise-control-rows">{enterpriseControls.map((control, index) => <article id={control.id} key={control.id} className="enterprise-control-row">
      <div className="control-story"><span className="control-number" aria-hidden="true">0{index + 1}</span><IconTile name={control.icon} /><div><h3>{control.title}</h3><p>{control.copy}</p></div></div>
      <ul className="control-points">{control.points.map(point => <li key={point}>{point}</li>)}</ul>
      <ControlIllustration id={control.id} />
      <details className="control-detail"><summary>Explore the control</summary><p>{control.detail}</p></details>
    </article>)}</div>
    <div className="enterprise-controls-footer"><p><Icon name="shield" size={18} />Your enterprise controls remain authoritative.</p><Link className="text-link" href="/platform#execution">Follow an execution with human oversight <Icon name="arrow" size={16} /></Link></div>
  </div></section>;
}
