import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import { platformBuildingBlocks } from "@/lib/data/platform";
import "./platform-building-blocks.css";

function ArchitectureNode({ icon, title, copy, className = "" }: { icon: IconName; title: string; copy?: string; className?: string }) {
  return <div className={`capability-architecture-node ${className}`}><Icon name={icon} size={22} /><div><strong>{title}</strong>{copy && <p>{copy}</p>}</div></div>;
}

export function PlatformBuildingBlocks() {
  return <section id="building-blocks" className="home-section section-rule" aria-labelledby="building-blocks-title"><div className="page-shell">
    <div className="section-topline"><SectionHeading id="building-blocks-title" eyebrow="BEHIND THE EXECUTION">Connected capabilities.<br /><em>A shared outcome.</em></SectionHeading><p className="section-aside">Each capability has a distinct role. Together, they turn business intent into controlled execution.</p></div>
    <div className="platform-capability-layout"><div className="platform-building-blocks">{platformBuildingBlocks.map(item => <article key={item.title}><IconTile name={item.icon} /><div><h3>{item.title}</h3><p>{item.copy}</p><details><summary>How it works</summary><p>{item.detail}</p></details></div></article>)}</div>
      <figure className="capability-architecture"><figcaption>HOW THE CAPABILITIES WORK TOGETHER</figcaption><ArchitectureNode icon="receipt" title="Business intent" /><span className="capability-flow-arrow" aria-hidden="true">↓</span><div className="capability-orchestration"><ArchitectureNode icon="people" title="Specialist agents" className="capability-agent-input" /><ArchitectureNode icon="operations" title="Orchestration Engine" copy="Coordinates agents, skills and execution context" className="capability-orchestrator" /><ArchitectureNode icon="book" title="Trusted knowledge" className="capability-knowledge-input" /></div><span className="capability-flow-arrow" aria-hidden="true">↓</span><ArchitectureNode icon="layers" title="Reusable skills" /><span className="capability-flow-arrow" aria-hidden="true">↓</span><ArchitectureNode icon="play" title="Action Engine" copy="Validate · Resolve trusted parameters · Execute" className="capability-action" /><p className="capability-policy"><Icon name="shield" size={16} />Enterprise identity, permissions & policy</p><span className="capability-flow-arrow" aria-hidden="true">↓</span><ArchitectureNode icon="code" title="Approved tools & APIs" /><span className="capability-flow-arrow" aria-hidden="true">↓</span><ArchitectureNode icon="database" title="Enterprise systems" /><span className="capability-flow-arrow" aria-hidden="true">↓</span><ArchitectureNode icon="check" title="Business outcome" className="capability-outcome" /></figure>
    </div>
    <div className="capability-foundation"><p><Icon name="book" size={22} />Trusted knowledge informs the decision.</p><p><Icon name="shield" size={22} />Enterprise permissions and policy govern the action.</p></div><p className="capability-system-record">Your enterprise systems remain the systems of record.</p>
  </div></section>;
}
