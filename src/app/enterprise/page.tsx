import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import { EnterpriseControls } from "@/components/enterprise/EnterpriseControls";
import { EnterpriseObservability } from "@/components/enterprise/EnterpriseObservability";
import { EnterpriseBoundaries } from "@/components/enterprise/EnterpriseBoundaries";
import { EnterpriseReadiness } from "@/components/enterprise/EnterpriseReadiness";
import { enterpriseResponsibilities } from "@/lib/data/enterprise";
import "../product.css";
import "./enterprise.css";
import "./governance.css";

export const metadata: Metadata = {
  title: "Enterprise | Governed by your enterprise. Controlled by design.",
  description: "Explore enterprise controls for agent governance, identity, data protection, human oversight, audit, observability and operational readiness.",
};

const sections = [{ id: "governance", label: "Governance" }, { id: "controls", label: "Control & protection" }, { id: "observability", label: "Observe & audit" }, { id: "enterprise-fit", label: "Enterprise fit" }, { id: "operations", label: "Operational readiness" }];
const lifecycle = ["Registered", "Under review", "Approved", "Active", "Suspended / Retired"];
const registryAttributes: { title: string; description: string; icon: IconName }[] = [
  { title: "Accountable", description: "Identity, business purpose and owner", icon: "people" },
  { title: "Bounded", description: "Approved models, tools and permissions", icon: "shield" },
  { title: "Managed", description: "Risk, version and lifecycle status", icon: "operations" },
  { title: "Auditable", description: "Approval history and execution records", icon: "receipt" },
];
const registryAssets: { label: string; icon: IconName }[] = [
  { label: "Agents", icon: "people" }, { label: "Models", icon: "layers" },
  { label: "Tools", icon: "operations" }, { label: "Endpoints", icon: "code" },
];
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

export default function EnterprisePage() {
  return <div className="product-page enterprise-page">
    <Navbar platformHref="/platform" enterpriseHref="/enterprise" homeHref="/" />
    <main id="main">
      <div className="enterprise-entry">
      <section className="enterprise-intro page-shell" aria-labelledby="enterprise-page-title">
        <div><p className="eyebrow"><span /> ENTERPRISE BY DESIGN</p><h1 id="enterprise-page-title">Governed by your enterprise.<br /><em>Controlled by design.</em></h1><p className="section-description">Put AI to work with accountable agents, controlled actions and visibility across execution. Your enterprise defines the rules. The platform applies them alongside your existing controls.</p><a href="#governance" className="button button-primary">Explore enterprise controls <Icon name="arrow" size={16} /></a></div>
        <figure className="enterprise-authority" aria-labelledby="authority-caption">
          <div><IconTile name="shield" /><div className="enterprise-authority-copy"><span>YOUR ENTERPRISE</span><strong>Identity · policies · data boundaries</strong></div></div>
          <div><IconTile name="layers" /><div className="enterprise-authority-copy"><span>THE PLATFORM</span><strong>Govern → Enforce → Execute</strong></div></div>
          <div><IconTile name="signal" /><div className="enterprise-authority-copy"><span>ACCOUNTABILITY</span><strong>Actions · human decisions · evidence</strong></div></div>
          <figcaption id="authority-caption">Integrating with the controls you already trust.</figcaption>
        </figure>
      </section>
      <nav className="enterprise-index page-shell" aria-label="Enterprise topics">{sections.map((section, index) => <a key={section.id} href={`#${section.id}`}><span className="enterprise-index-number" aria-hidden="true">0{index + 1}</span><span>{section.label}</span><span className="enterprise-index-arrow" aria-hidden="true">↓</span></a>)}</nav>
      </div>

      <section id="governance" className="home-section section-rule" aria-labelledby="governance-title"><div className="page-shell">
        <div className="section-topline"><SectionHeading id="governance-title" eyebrow="GOVERNANCE & ACCOUNTABILITY">Know what can operate.<br /><em>Decide what it can do.</em></SectionHeading><p className="section-aside">Give every agent an identity, an owner and a defined scope before it participates in governed production flows.</p></div>
        <div className="enterprise-registry">
          <div className="enterprise-registry-story"><IconTile name="layers" /><p className="section-eyebrow">AI ASSET REGISTRY</p><h3>Ownership is the starting point.</h3><p>Register agents, models, tools, MCP servers and agent-to-agent endpoints with their purpose, environment, version, risk and approval status.</p><p>Connect that governance record to your existing enterprise catalog or registry where one is already in place.</p><ul className="enterprise-registry-assets" aria-label="Governed asset types">{registryAssets.map(asset => <li key={asset.label}><Icon name={asset.icon} size={19} />{asset.label}</li>)}</ul></div>
          <dl>{registryAttributes.map(attribute => <div key={attribute.title}><dt><Icon name={attribute.icon} size={25} /><span>{attribute.title}</span></dt><dd>{attribute.description}</dd></div>)}</dl>
        </div>
        <figure className="enterprise-lifecycle-figure"><figcaption>AI ASSET LIFECYCLE</figcaption><ol className="enterprise-lifecycle" aria-label="Illustrative AI asset lifecycle">{lifecycle.map((state, index) => <li key={state} className={state === "Active" ? "enterprise-lifecycle-active" : undefined}><span aria-hidden="true">0{index + 1}</span>{state}</li>)}</ol></figure>
        <div className="enterprise-registry-note"><Icon name="key" size={22} /><p><strong>Registry approval does not grant runtime authorization.</strong><span>Suspension or retirement revokes runtime access without removing audit history.</span></p></div>
        <details className="enterprise-responsibilities"><summary>Explore platform responsibilities</summary><dl>{enterpriseResponsibilities.map(responsibility => <div key={responsibility.title}><dt>{responsibility.title}</dt><dd>{responsibility.copy}</dd></div>)}</dl><p>Logical capabilities do not necessarily correspond to proprietary deployable products. Enterprise AI Gateway groups governed access; Enterprise Control coordinates policy decisions.</p></details>
      </div></section>

      <EnterpriseControls />

      <EnterpriseObservability />

      <EnterpriseBoundaries />

      <EnterpriseReadiness />

      <section id="book-demo" className="home-section dark-section final-cta section-rule" aria-labelledby="enterprise-cta-title"><div className="page-shell"><div className="cta-layout"><SectionHeading id="enterprise-cta-title" eyebrow="YOUR ENTERPRISE. YOUR RULES.">What would controlled<br /><em>execution look like for you?</em></SectionHeading><div><p className="section-description">Let’s map your business actions, enterprise controls and operating requirements to the platform.</p>{bookingUrl ? <a className="button button-primary" href={bookingUrl}>Book a Demo <Icon name="arrow" size={17} /></a> : <details className="booking-placeholder"><summary className="button button-primary">Book a Demo <Icon name="arrow" size={17} /></summary><p className="booking-status">Demo booking will be available soon.</p></details>}</div></div></div></section>
    </main><Footer platformHref="/platform" enterpriseHref="/enterprise" homeHref="/" />
  </div>;
}
