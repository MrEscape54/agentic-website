import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import { operationalTargets } from "@/lib/data/enterprise";
import "./enterprise-readiness.css";

const validationIcons: IconName[] = ["database", "signal", "shield"];
const deploymentBoundaries = ["Isolation", "Identity", "Network access", "Data residency", "Data flows", "Operational ownership"];

function DeploymentArt() {
  return <svg className="readiness-deployment-art" viewBox="0 0 220 105" fill="none" aria-hidden="true">
    <path d="m110 7 98 45-98 45L12 52 110 7Z" stroke="currentColor" strokeOpacity=".35" />
    <path d="M12 52v9l98 45 98-45v-9M110 97v9" stroke="currentColor" strokeOpacity=".2" />
    <path d="m110 25 62 28-62 28-62-28 62-28Z" stroke="var(--olive)" strokeOpacity=".65" />
    {[76, 113].map((x, index) => <g key={x} transform={`translate(${x} ${index === 0 ? 37 : 28})`}>
      <path d="m0 8 23-11 23 11-23 11L0 8Z" fill="#3b444a" stroke="#9ba3a9" strokeOpacity=".5" />
      <path d="M0 8v27l23 11V19L0 8Z" fill="#20272c" stroke="#9ba3a9" strokeOpacity=".4" />
      <path d="M23 19v27l23-11V8L23 19Z" fill="#30393f" stroke="#9ba3a9" strokeOpacity=".4" />
      <path d="m5 20 12 6m-12 3 12 6m12-9 11-5m-11 14 11-5" stroke="var(--olive)" strokeOpacity=".8" />
    </g>)}
  </svg>;
}

export function EnterpriseReadiness() {
  return <section id="operations" className="home-section section-rule" aria-labelledby="readiness-title"><div className="page-shell">
    <div className="section-topline"><SectionHeading id="readiness-title" eyebrow="COMPLIANCE & OPERATIONAL READINESS">Compliance-ready<br /><em>by design.</em></SectionHeading><p className="section-aside">Designed to support SOC 2 readiness and GDPR obligations through governed access, data protection, auditability and configurable controls.</p></div>
    <div className="readiness-compliance"><article><IconTile name="shield" /><div><h3>SOC 2 Readiness</h3><p>Access controls, monitoring, audit evidence and accountable operations designed to support SOC 2 readiness.</p></div></article><article><IconTile name="receipt" /><div><h3>GDPR Alignment</h3><p>Privacy-aware data handling, data minimization, controlled processing and configurable retention designed to support GDPR obligations.</p></div></article></div>
    <p className="readiness-disclaimer">These design goals support enterprise readiness and review. They do not represent a completed SOC 2 examination or attestation, or a guarantee of GDPR compliance.</p>
    <div className="readiness-validation"><div><p className="readiness-label">DEPLOYMENT VALIDATION AREAS</p><ol className="readiness-targets">{operationalTargets.filter(target => target.title !== "Deployment flexibility").map((target, index) => <li key={target.title}><span className="readiness-number" aria-hidden="true">0{index + 1}</span><Icon name={validationIcons[index]} size={25} /><div><h3>{target.title}</h3><p>{target.copy}</p></div></li>)}</ol></div>
      <aside className="readiness-deployment" aria-labelledby="deployment-options-title"><h3 id="deployment-options-title">Flexible deployment.<br />Enterprise control.</h3><p className="readiness-deployment-intro">Designed around your infrastructure and operating model.</p><p className="readiness-label">TARGET ARCHITECTURE OPTIONS</p><div className="readiness-options">{[{ title: "Dedicated managed", copy: "Managed cloud environment", icon: "database" as const }, { title: "Customer-hosted", copy: "Customer cloud · private VPC / VNet", icon: "operations" as const }].map(option => <div key={option.title}><DeploymentArt /><div className="readiness-option-caption"><Icon name={option.icon} size={23} /><div><h4>{option.title}</h4><p>{option.copy}</p></div></div></div>)}</div><p className="readiness-label readiness-boundaries-label">DEFINE FOR EACH DEPLOYMENT</p><ul className="readiness-boundaries">{deploymentBoundaries.map(boundary => <li key={boundary}>{boundary}</li>)}</ul><p className="readiness-iac"><Icon name="code" size={21} />Infrastructure-as-code automates provisioning.</p></aside>
    </div>
    <div className="readiness-environment"><Icon name="key" size={22} /><p>Hosting location and single- or multi-tenant architecture are separate design decisions. Trust boundaries, approved data flows and operating responsibilities are defined per deployment.<span>Availability commitments, recovery objectives, deployment support and compliance evidence are validated for your enterprise environment.</span></p></div>
  </div></section>;
}
