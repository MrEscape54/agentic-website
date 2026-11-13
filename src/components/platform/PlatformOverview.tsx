import { useText } from "@/i18n/useText";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import { platformJourney } from "@/lib/data/platform";
import "./platform-overview.css";

const capabilities: { label: string; icon: IconName }[] = [{ label: "Agents", icon: "people" }, { label: "Knowledge", icon: "book" }, { label: "Tools", icon: "code" }];
const foundations: { title: string; copy: string; icon: IconName }[] = [{ title: "CONTROL", copy: "Policy and permissions", icon: "shield" }, { title: "INTEGRATE", copy: "Enterprise connectivity", icon: "code" }, { title: "OBSERVE", copy: "Correlated visibility", icon: "signal" }];

export function PlatformOverview() {
  const t = useText();
  return <section className="platform-overview page-shell" aria-labelledby="platform-title">
    <div className="platform-overview-main"><div className="platform-overview-copy"><p className="eyebrow"><span />{t(" THE PLATFORM")}</p><h1 id="platform-title">{t("One platform.")}<br />{t("From intent to")}<br /><em>{t("outcome.")}</em></h1><p className="section-description">{t("Connect conversations, trusted knowledge, agents and enterprise tools to complete business tasks—with control across every step.")}</p><a href={t.href("#execution")} className="button button-primary">{t("See the Platform at Work ")}<Icon name="arrow" size={17} /></a><p className="platform-overview-trust">{t("Governed by your enterprise. Controlled by design.")}</p></div>
      <figure className="platform-concept" aria-label={t("Business intent becomes a business outcome through governed orchestration and execution")}><div className="platform-concept-endpoint"><span>{t("BUSINESS INTENT")}</span><div><Icon name="customers" size={20} /><strong>{t("A business goal")}</strong></div></div><div className="platform-concept-boundary"><Icon name="key" size={18} /><span>{t("Enterprise identity & permissions")}</span></div><div className="platform-concept-core"><div>{capabilities.map(capability => <div key={capability.label}><IconTile name={capability.icon} /><span>{t(capability.label)}</span></div>)}</div><p>{t("ORCHESTRATION & EXECUTION")}</p></div><div className="platform-concept-boundary"><Icon name="shield" size={18} /><span>{t("Policy & controlled actions")}</span></div><div className="platform-concept-endpoint platform-concept-outcome"><span>{t("BUSINESS OUTCOME")}</span><div><Icon name="check" size={20} /><strong>{t("A completed business task")}</strong></div></div></figure>
    </div>
    <div className="platform-overview-stages" aria-label={t("Connected platform capabilities")}>{platformJourney.map((stage, index) => <div key={stage.name}><span>0{index + 1}</span><strong>{t(stage.name)}</strong>{index < platformJourney.length - 1 && <Icon name="arrow" size={18} />}</div>)}</div><p className="platform-overview-foundation">{t("CONTROL · INTEGRATE · OBSERVE")}</p>
  </section>;
}

export function PlatformJourney() {
  const t = useText();
  return <section id="journey" className="home-section section-rule" aria-labelledby="journey-title"><div className="page-shell"><div className="section-topline"><SectionHeading id="journey-title" eyebrow={t("FROM INTENT TO OUTCOME")}>{t("Every outcome starts")}<br /><em>{t("with a connected execution.")}</em></SectionHeading><p className="section-aside">{t("Six connected capabilities. One business outcome.")}</p></div><ol className="platform-open-journey" aria-label={t("Platform execution stages")}>{platformJourney.map((stage, index) => <li key={stage.name}><span className="platform-stage-number">0{index + 1}</span><div className="platform-stage-node"><IconTile name={stage.icon} />{index !== 2 && index !== 5 && <span className="platform-stage-connection" aria-hidden="true">→</span>}</div><h3>{t(stage.name)}</h3><p>{t(stage.copy)}</p>{index === 2 && <span className="platform-stage-continuation">{t("Continues with 04 · Orchestrate ↓")}</span>}</li>)}</ol><ul className="platform-shared-foundation" aria-label={t("Shared platform foundation")}>{foundations.map(foundation => <li key={foundation.title}><Icon name={foundation.icon} size={26} /><div><strong>{t(foundation.title)}</strong><span>{t(foundation.copy)}</span></div></li>)}</ul></div></section>;
}
