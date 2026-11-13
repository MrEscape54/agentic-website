import { useText } from "@/i18n/useText";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import { platformBuildingBlocks } from "@/lib/data/platform";
import "./platform-building-blocks.css";

function ArchitectureNode({ icon, title, copy, className = "" }: { icon: IconName; title: string; copy?: string; className?: string }) {
  const t = useText();
  return <div className={`capability-architecture-node ${className}`}><Icon name={icon} size={22} /><div><strong>{t(title)}</strong>{copy && <p>{t(copy)}</p>}</div></div>;
}

export function PlatformBuildingBlocks() {
  const t = useText();
  return <section id="building-blocks" className="home-section section-rule" aria-labelledby="building-blocks-title"><div className="page-shell">
    <div className="section-topline"><SectionHeading id="building-blocks-title" eyebrow={t("BEHIND THE EXECUTION")}>{t("Connected capabilities.")}<br /><em>{t("A shared outcome.")}</em></SectionHeading><p className="section-aside">{t("Each capability has a distinct role. Together, they turn business intent into controlled execution.")}</p></div>
    <div className="platform-capability-layout"><div className="platform-building-blocks">{platformBuildingBlocks.map(item => <article key={item.title}><IconTile name={item.icon} /><div><h3>{t(item.title)}</h3><p>{t(item.copy)}</p><details><summary>{t("How it works")}</summary><p>{t(item.detail)}</p></details></div></article>)}</div>
      <figure className="capability-architecture"><figcaption>{t("HOW THE CAPABILITIES WORK TOGETHER")}</figcaption><ArchitectureNode icon="receipt" title={t("Business intent")} /><span className="capability-flow-arrow" aria-hidden="true">↓</span><div className="capability-orchestration"><ArchitectureNode icon="people" title={t("Specialist agents")} className="capability-agent-input" /><ArchitectureNode icon="operations" title={t("Orchestration Engine")} copy={t("Coordinates agents, skills and execution context")} className="capability-orchestrator" /><ArchitectureNode icon="book" title={t("Trusted knowledge")} className="capability-knowledge-input" /></div><span className="capability-flow-arrow" aria-hidden="true">↓</span><ArchitectureNode icon="layers" title={t("Reusable skills")} /><span className="capability-flow-arrow" aria-hidden="true">↓</span><ArchitectureNode icon="play" title={t("Action Engine")} copy={t("Validate · Resolve trusted parameters · Execute")} className="capability-action" /><p className="capability-policy"><Icon name="shield" size={16} />{t("Enterprise identity, permissions & policy")}</p><span className="capability-flow-arrow" aria-hidden="true">↓</span><ArchitectureNode icon="code" title={t("Approved tools & APIs")} /><span className="capability-flow-arrow" aria-hidden="true">↓</span><ArchitectureNode icon="database" title={t("Enterprise systems")} /><span className="capability-flow-arrow" aria-hidden="true">↓</span><ArchitectureNode icon="check" title={t("Business outcome")} className="capability-outcome" /></figure>
    </div>
    <div className="capability-foundation"><p><Icon name="book" size={22} />{t("Trusted knowledge informs the decision.")}</p><p><Icon name="shield" size={22} />{t("Enterprise permissions and policy govern the action.")}</p></div><p className="capability-system-record">{t("Your enterprise systems remain the systems of record.")}</p>
  </div></section>;
}
