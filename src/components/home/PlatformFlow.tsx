import { platformStages } from "@/lib/data/home";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "./SectionHeading";

export function PlatformFlow() {
  return <section id="platform" className="home-section light-section section-rule" aria-labelledby="platform-title"><div className="page-shell">
    <div className="section-topline"><SectionHeading id="platform-title" eyebrow="THE PLATFORM">One platform.<br />From intent to <em>outcome.</em></SectionHeading><a className="text-link" href="#platform-at-work">See how it works <Icon name="arrow" size={17} /></a></div>
    <ol className="platform-stages">{platformStages.map((stage, i) => <li key={stage.title}><div className="stage-top"><Icon name={stage.icon} /><span>0{i + 1}</span></div><h3>{stage.title}</h3><p>{stage.copy}</p>{i < 5 && <span className="stage-connector" aria-hidden="true">→</span>}</li>)}</ol>
    <div className="platform-foundation"><strong>CONTROL · INTEGRATE · OBSERVE</strong><span>Control Studio <i>·</i> Integration Hub <i>·</i> Telemetry Engine <i>·</i> Observability Hub</span></div>
  </div></section>;
}
