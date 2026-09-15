import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "./SectionHeading";

const controls: { title: string; headline: string; icon: IconName; items: string[] }[] = [
  { title: "Protect", headline: "Share meaning. Not sensitive data.", icon: "shield", items: ["Sensitive entity detection", "Sensitive-data tokenization", "Semantic reduction", "Protected model context"] },
  { title: "Control", headline: "Your enterprise remains in control.", icon: "key", items: ["Enterprise identity integration", "Existing enterprise permissions", "Business rules", "Controlled execution"] },
  { title: "Observe", headline: "Know what your agents are doing.", icon: "signal", items: ["Telemetry", "Execution traces", "Logs and metrics", "Observability"] },
];

export function EnterpriseControl() {
  return <section id="enterprise" className="home-section light-section" aria-labelledby="enterprise-title"><div className="page-shell">
    <div className="section-topline"><SectionHeading id="enterprise-title" eyebrow="ENTERPRISE BY DESIGN">Autonomy without<br /><em>losing control.</em></SectionHeading><p className="section-aside">An intelligence and execution layer integrating with your existing identity, security and business controls.</p></div>
    <div className="control-grid">{controls.map(control => <article key={control.title}><Icon name={control.icon} size={25} /><h3>{control.title}</h3><p>{control.headline}</p><ul>{control.items.map(item => <li key={item}><Icon name="check" size={13} />{item}</li>)}</ul></article>)}</div>
    <p className="enterprise-close">Governed by your enterprise.<br /><em>Controlled by design.</em></p>
  </div></section>;
}
