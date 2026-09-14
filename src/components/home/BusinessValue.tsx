import { SectionHeading } from "./SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";

const benefits: { title: string; copy: string; example: string; icon: IconName }[] = [
  { title: "Less manual work", copy: "Execute changes without asking people to move information from one system to another.", example: "A delivery change becomes an updated order.", icon: "code" },
  { title: "Connected operations", copy: "Connect each request with the enterprise knowledge, systems and actions needed to resolve it.", example: "A card replacement connects validation with reissue.", icon: "layers" },
  { title: "People where they matter", copy: "Route exceptions to a specialist with the context already collected, so the conversation can move forward.", example: "An exception reaches the right person with its history.", icon: "shield" },
];

export function BusinessValue() {
  return <section id="business-value" className="home-section content-section section-rule" aria-labelledby="value-title"><div className="page-shell"><SectionHeading id="value-title" eyebrow="INTELLIGENCE, PUT TO WORK" description="A completed request is more than a better conversation. It changes how work gets done across your business.">Turn requests into<br /><em>completed work.</em></SectionHeading><div className="benefit-grid">{benefits.map((benefit, index) => <article key={benefit.title}><div className={`benefit-visual benefit-visual-${index}`} aria-hidden="true"><span /><span /><span /><Icon name={benefit.icon} size={30} /></div><div className="benefit-top"><Icon name={benefit.icon} size={20} /><span>0{index + 1}</span></div><h3>{benefit.title}</h3><p>{benefit.copy}</p><p className="benefit-example">{benefit.example}</p></article>)}</div></div></section>;
}
