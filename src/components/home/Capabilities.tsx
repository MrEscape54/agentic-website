import { capabilities } from "@/lib/data/home";
import { SectionHeading } from "./SectionHeading";

export function Capabilities() {
  return <section id="capabilities" className="home-section capability-section" aria-labelledby="capabilities-title"><div className="page-shell capability-layout"><div><SectionHeading id="capabilities-title" eyebrow="PLATFORM CAPABILITIES" description="Explore the engines and studios that connect understanding, knowledge and controlled execution.">The technology behind<br /><em>every execution.</em></SectionHeading><span className="section-index">BUILT TO WORK TOGETHER</span></div><div className="capability-list">{capabilities.map((group, index) => <details key={group.title} open={index === 0}><summary><span>0{index + 1}</span><h3>{group.title}</h3><span className="expand-mark" aria-hidden="true">+</span></summary><div className="capability-content"><p>{group.description}</p><ul>{group.modules.map(module => <li key={module}>{module}</li>)}</ul></div></details>)}</div></div></section>;
}
