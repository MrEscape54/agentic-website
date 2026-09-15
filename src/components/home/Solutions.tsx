import { solutions } from "@/lib/data/home";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "./SectionHeading";

export function Solutions() {
  return <section id="solutions" className="home-section light-section" aria-labelledby="solutions-title"><div className="page-shell"><SectionHeading id="solutions-title" eyebrow="SOLUTIONS">One platform.<br /><em>Many business outcomes.</em></SectionHeading><div className="solution-rows">{solutions.map((solution, index) => <details className="solution-row" key={solution.title}><summary><span className="solution-number">0{index + 1}</span><h3>{solution.title}</h3><p>{solution.copy}</p><span className="solution-discover" aria-hidden="true">+</span></summary><ol className="mini-flow">{solution.flow.map((step, i) => <li key={step}><span>{step}</span>{i < 2 && <Icon name="arrow" size={13} />}</li>)}</ol></details>)}</div></div></section>;
}
