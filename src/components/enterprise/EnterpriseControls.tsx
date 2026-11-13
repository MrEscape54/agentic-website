import { useText } from "@/i18n/useText";
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
  const t = useText();
  if (id === "identity") return <figure className="control-illustration"><div className="control-mini-flow"><Node icon="people">{t("User")}</Node><span className="control-connector" aria-hidden="true">→</span><Node icon="layers">{t("Agent")}</Node><span className="control-connector" aria-hidden="true">→</span><Node icon="receipt">{t("Action")}</Node></div><figcaption className="control-identity-caption"><Icon name="key" size={15} />{t("Enterprise identity & permissions")}</figcaption></figure>;
  if (id === "policy") return <figure className="control-illustration control-policy"><div className="control-policy-source"><Icon name="shield" size={16} />{t("ENTERPRISE POLICY")}</div><div className="control-policy-targets">{([{ label: "Models", icon: "layers" }, { label: "Tools", icon: "code" }, { label: "Agents", icon: "people" }] as const).map(target => <div key={target.label}><span className="control-policy-gate"><Icon name="key" size={13} /></span><Node icon={target.icon}>{t(target.label)}</Node></div>)}</div><figcaption>{t("Enforced at interaction boundaries")}</figcaption></figure>;
  if (id === "data") return <figure className="control-illustration control-protected"><div className="control-mini-label">{t("PROTECTED MODEL CONTEXT")}</div><div className="control-tokenization"><span>{t("Customer ID ")}<span className="control-sensitive-value">34.123.456</span></span><span aria-hidden="true">→</span><code>{"{CUSTOMER_ID}"}</code></div><figcaption>{t("Real values resolved internally for authorized actions.")}</figcaption></figure>;
  return <figure className="control-illustration control-review"><div className="control-mini-flow"><Node icon="receipt">{t("Proposal")}</Node><span className="control-connector" aria-hidden="true">→</span><Node icon="people" highlighted>{t("Human decision")}</Node><span className="control-connector" aria-hidden="true">→</span><Node icon="check">{t("Continue if approved")}</Node></div><figcaption>{t("Reject → Stop ")}<span aria-hidden="true">·</span>{t(" Changes → Review")}</figcaption></figure>;
}

export function EnterpriseControls() {
  const t = useText();
  return <section id="controls" className="home-section section-rule" aria-labelledby="enterprise-controls-title"><div className="page-shell">
    <div className="section-topline"><SectionHeading id="enterprise-controls-title" eyebrow={t("PROTECT · CONTROL")}>{t("Your rules.")}<br /><em>{t("Across the execution.")}</em></SectionHeading><p className="section-aside">{t("Keep access, data handling and human oversight connected to each action—not just to the initial sign-in.")}</p></div>
    <div className="enterprise-control-rows">{enterpriseControls.map((control, index) => <article id={control.id} key={control.id} className="enterprise-control-row">
      <div className="control-story"><span className="control-number" aria-hidden="true">0{index + 1}</span><IconTile name={control.icon} /><div><h3>{t(control.title)}</h3><p>{t(control.copy)}</p></div></div>
      <ul className="control-points">{control.points.map(point => <li key={point}>{t(point)}</li>)}</ul>
      <ControlIllustration id={control.id} />
      <details className="control-detail"><summary>{t("Explore the control")}</summary><p>{t(control.detail)}</p></details>
    </article>)}</div>
    <div className="enterprise-controls-footer"><p><Icon name="shield" size={18} />{t("Your enterprise controls remain authoritative.")}</p><Link className="text-link" href={t.href("/platform#execution")}>{t("Follow an execution with human oversight ")}<Icon name="arrow" size={16} /></Link></div>
  </div></section>;
}
