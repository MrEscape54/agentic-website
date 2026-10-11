import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import "./enterprise-fit.css";

const services: { label: string; description: string; icon: IconName }[] = [
  { label: "Business Systems", description: "Your systems of record", icon: "operations" },
  { label: "Identity", description: "Your permissions", icon: "key" },
  { label: "Models", description: "Your approved choices", icon: "layers" },
  { label: "Data", description: "Your data boundaries", icon: "database" },
  { label: "Observability", description: "Your operational tools", icon: "signal" },
];

const benefits = [
  { title: "Build on existing investments.", description: "Connect to the systems and services your enterprise already trusts." },
  { title: "Start focused. Expand with evidence.", description: "Use a focused business case to demonstrate value, then extend across approved models and infrastructure." },
  { title: "Preserve enterprise control.", description: "Your systems remain the systems of record. Your enterprise defines the boundaries." },
];

export function EnterpriseFit() {
  return <section id="enterprise-fit" className="home-section section-rule vision-fit" aria-labelledby="enterprise-fit-title">
    <div className="page-shell">
      <div className="section-topline">
        <SectionHeading id="enterprise-fit-title" eyebrow="BUILT TO FIT YOUR ENTERPRISE">Keep your systems.<br /><em>Add intelligence.</em></SectionHeading>
        <p className="section-aside">Connect to the enterprise systems and infrastructure you already trust. Start with a focused use case, prove value early and expand without rebuilding your technology stack.</p>
      </div>
      <div className="vision-fit-body">
      <div className="vision-fit-benefits">{benefits.map((benefit, index) => <article key={benefit.title}>
        <span aria-hidden="true">0{index + 1}</span><div><h3>{benefit.title}</h3><p>{benefit.description}</p></div>
      </article>)}</div>
      <figure className="vision-fit-diagram" aria-labelledby="enterprise-fit-caption">
        <div className="vision-fit-platform"><IconTile name="layers" /><div><span className="vision-fit-platform-label">THE PLATFORM</span><p>Intelligence & execution</p></div><p className="vision-fit-actions">Understand <span>·</span> Orchestrate <span>·</span> Act</p></div>
        <p className="vision-fit-ecosystem-label">YOUR ENTERPRISE ECOSYSTEM</p>
        <ul className="vision-fit-services">{services.map(service => <li key={service.label}>
          <Icon name={service.icon} size={25} /><div><h3>{service.label}</h3><p>{service.description}</p></div>
        </li>)}</ul>
        <figcaption id="enterprise-fit-caption">One execution layer. Connected to your enterprise ecosystem.</figcaption>
      </figure>
      </div>
    </div>
  </section>;
}
