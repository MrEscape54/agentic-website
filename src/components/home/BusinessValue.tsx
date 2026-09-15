import { Icon, type IconName } from "@/components/ui/Icon";

const benefits: { title: string; copy: string; icon: IconName }[] = [
  { title: "Understand", copy: "Enterprise context and intent.", icon: "signal" },
  { title: "Orchestrate", copy: "Agents, knowledge, skills and tools working together.", icon: "layers" },
  { title: "Execute", copy: "Real actions across enterprise systems.", icon: "code" },
];

export function BusinessValue() {
  return <section id="business-value" className="home-section content-section section-rule" aria-labelledby="value-title"><div className="page-shell"><div className="section-heading"><h2 id="value-title">Intelligence, put to work.</h2></div><div className="benefit-grid">{benefits.map(benefit => <article key={benefit.title}><div className="benefit-top"><Icon name={benefit.icon} size={20} /><h3>{benefit.title}</h3></div><p>{benefit.copy}</p></article>)}</div></div></section>;
}
