import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import { enterpriseBindings } from "@/lib/data/enterprise";
import "./enterprise-boundaries.css";

const domainIcons: Record<string, IconName> = {
  "Identity & secrets": "key",
  "Models & hosting": "layers",
  "State & memory": "database",
  "Networks & connectivity": "code",
  "Observability & audit systems": "signal",
  "Business systems": "operations",
};

export function EnterpriseBoundaries() {
  return <section id="enterprise-fit" className="home-section section-rule" aria-labelledby="enterprise-boundaries-title"><div className="page-shell">
    <div className="section-topline"><SectionHeading id="enterprise-boundaries-title" eyebrow="CUSTOMER-CONTROLLED BOUNDARIES">Keep your systems.<br /><em>Add intelligence.</em></SectionHeading><p className="section-aside">Bind platform capabilities to the services your enterprise approves. Retain your identity, network, data and operational controls.</p></div>
    <figure className="boundary-relationship" aria-label="Enterprise authority and platform integration">
      <div className="boundary-party"><IconTile name="key" /><div><strong>YOUR ENTERPRISE</strong><p>Defines services, policies and boundaries</p></div></div>
      <div className="boundary-adapters"><span>APPROVED CONTRACTS & ADAPTERS</span><div className="boundary-connection" aria-hidden="true"><Icon name="code" size={22} /></div><p>Integration respects your existing authority.</p></div>
      <div className="boundary-party"><IconTile name="layers" /><div><strong>THE PLATFORM</strong><p>Connects, coordinates and executes</p></div></div>
    </figure>
    <div className="boundary-matrix-heading" aria-hidden="true"><span>CONTROL DOMAIN</span><span><Icon name="key" size={18} />YOUR ENTERPRISE DEFINES</span><span /><span><Icon name="layers" size={18} />THE PLATFORM INTEGRATES</span></div>
    <div className="boundary-matrix">{enterpriseBindings.map(binding => <article className="boundary-domain" key={binding.title}>
      <h3><Icon name={domainIcons[binding.title]} size={25} />{binding.title}</h3>
      <dl className="boundary-owner"><dt>YOUR ENTERPRISE DEFINES</dt><dd>{binding.owner}</dd></dl>
      <span className="boundary-direction" aria-hidden="true"><Icon name="arrow" size={19} /></span>
      <dl className="boundary-behavior"><dt>THE PLATFORM INTEGRATES</dt><dd>{binding.behavior}</dd></dl>
    </article>)}</div>
    <div className="boundary-footer"><p><Icon name="shield" size={22} /><strong>Your systems remain the systems of record.</strong></p><p>Platform integration preserves enterprise permissions and operational boundaries.</p></div>
  </div></section>;
}
