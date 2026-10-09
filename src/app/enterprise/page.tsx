import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { enterpriseControls, enterpriseBindings, operationalTargets, enterpriseResponsibilities } from "@/lib/data/enterprise";
import "../product.css";
import "./enterprise.css";

export const metadata: Metadata = {
  title: "Enterprise | Governed by your enterprise. Controlled by design.",
  description: "Explore enterprise controls for agent governance, identity, data protection, human oversight, audit, observability and operational readiness.",
};

const sections = [{ id: "governance", label: "Governance" }, { id: "controls", label: "Control & protection" }, { id: "observability", label: "Observe & audit" }, { id: "enterprise-fit", label: "Enterprise fit" }, { id: "operations", label: "Operational readiness" }];
const lifecycle = ["Registered", "Under review", "Approved", "Active", "Suspended / Retired"];
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

export default function EnterprisePage() {
  return <div className="product-page enterprise-page">
    <Navbar platformHref="/platform" enterpriseHref="/enterprise" homeHref="/" />
    <main id="main">
      <section className="enterprise-intro page-shell" aria-labelledby="enterprise-page-title">
        <div><p className="eyebrow"><span /> ENTERPRISE BY DESIGN</p><h1 id="enterprise-page-title">Governed by your enterprise.<br /><em>Controlled by design.</em></h1><p className="section-description">Put AI to work with accountable agents, controlled actions and visibility across execution. Your enterprise defines the rules. The platform applies them alongside your existing controls.</p><a href="#governance" className="button button-primary">Explore enterprise controls <Icon name="arrow" size={16} /></a></div>
        <figure className="enterprise-authority" aria-labelledby="authority-caption">
          <div><Icon name="shield" size={25} /><span>YOUR ENTERPRISE</span><strong>Identity · policies · data boundaries</strong></div>
          <div><Icon name="layers" size={25} /><span>THE PLATFORM</span><strong>Govern → Enforce → Execute</strong></div>
          <div><Icon name="signal" size={25} /><span>ACCOUNTABILITY</span><strong>Actions · human decisions · evidence</strong></div>
          <figcaption id="authority-caption">Integrating with the controls you already trust.</figcaption>
        </figure>
      </section>
      <nav className="enterprise-index page-shell" aria-label="Enterprise topics">{sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.label}<span aria-hidden="true">↓</span></a>)}</nav>

      <section id="governance" className="home-section section-rule" aria-labelledby="governance-title"><div className="page-shell">
        <div className="section-topline"><SectionHeading id="governance-title" eyebrow="GOVERNANCE & ACCOUNTABILITY">Know what can operate.<br /><em>Decide what it can do.</em></SectionHeading><p className="section-aside">Give every agent an identity, an owner and a defined scope before it participates in governed production flows.</p></div>
        <div className="enterprise-registry">
          <div><p className="section-eyebrow">AI ASSET REGISTRY</p><h3>Ownership is the starting point.</h3><p>Register agents, models, tools, MCP servers and agent-to-agent endpoints with their purpose, environment, version, risk and approval status.</p><p>Connect that governance record to your existing enterprise catalog or registry where one is already in place.</p></div>
          <dl><div><dt>Accountable</dt><dd>Identity, business purpose and owner</dd></div><div><dt>Bounded</dt><dd>Approved models, tools and permissions</dd></div><div><dt>Managed</dt><dd>Risk, version and lifecycle status</dd></div><div><dt>Auditable</dt><dd>Approval history and execution records</dd></div></dl>
        </div>
        <ol className="enterprise-lifecycle" aria-label="Illustrative AI asset lifecycle">{lifecycle.map((state, index) => <li key={state}><span>0{index + 1}</span>{state}</li>)}</ol>
        <details className="enterprise-responsibilities"><summary>Explore platform responsibilities</summary><dl>{enterpriseResponsibilities.map(responsibility => <div key={responsibility.title}><dt>{responsibility.title}</dt><dd>{responsibility.copy}</dd></div>)}</dl><p>Logical capabilities do not necessarily correspond to proprietary deployable products. Enterprise AI Gateway groups governed access; Enterprise Control coordinates policy decisions.</p></details>
        <p className="enterprise-caption">Suspension or retirement revokes runtime access without removing audit history. Registry approval does not grant runtime authorization.</p>
      </div></section>

      <section id="controls" className="home-section section-rule" aria-labelledby="enterprise-controls-title"><div className="page-shell">
        <SectionHeading id="enterprise-controls-title" eyebrow="PROTECT · CONTROL" description="Keep access, data handling and human oversight connected to each action—not just to the initial sign-in.">Your rules.<br /><em>Across the execution.</em></SectionHeading>
        <div className="enterprise-controls-grid">{enterpriseControls.map(control => <article id={control.id} key={control.id}>
          <Icon name={control.icon} size={26} /><h3>{control.title}</h3><p>{control.copy}</p><ul>{control.points.map(point => <li key={point}><Icon name="check" size={14} />{point}</li>)}</ul><details><summary>Explore the control</summary><p>{control.detail}</p></details>
        </article>)}</div>
        <Link className="text-link" href="/platform#execution">Follow an execution with human oversight <Icon name="arrow" size={16} /></Link>
      </div></section>

      <section id="observability" className="home-section section-rule" aria-labelledby="observability-title"><div className="page-shell">
        <div className="section-topline"><SectionHeading id="observability-title" eyebrow="OBSERVE · AUDIT">One execution.<br /><em>End-to-end visibility.</em></SectionHeading><p className="section-aside">Follow decisions, approvals and actions across the execution lifecycle. Connect operational telemetry and accountability records to your existing observability and audit systems.</p></div>
        <figure className="enterprise-trace"><figcaption>ILLUSTRATIVE EXECUTION RECORD · PLAN CHANGE</figcaption><ol>
          <li><span>WHO</span><strong>Customer + plan agent</strong><p>Initiating user and executing workload</p></li>
          <li><span>UNDER WHICH RULE</span><strong>Commercial exception policy</strong><p>Approval required before a fee waiver</p></li>
          <li><span>WHO DECIDED</span><strong>Authorized reviewer</strong><p>Decision linked to the proposed action</p></li>
          <li><span>WHAT HAPPENED</span><strong>Billing updated</strong><p>Approved transaction and result recorded</p></li>
        </ol></figure>
        <div className="enterprise-evidence"><article><Icon name="signal" size={24} /><h3>Observability</h3><p>The Observability Hub collects and correlates operational traces, metrics and logs across channels, orchestration, models, tool access and agent interactions. Stable correlation identifiers connect policy decisions, human approvals, business actions and outcomes.</p></article><article><Icon name="book" size={24} /><h3>Audit & Accountability</h3><p>Maintain durable evidence of policy decisions, approvals, access events, business actions and outcomes. Enterprise-governed integrity, access and retention apply independently of the operational observability backend.</p></article><article><Icon name="code" size={24} /><h3>Enterprise integration</h3><p>Open interfaces and pluggable export adapters connect operational telemetry and separate accountability records to existing monitoring, SIEM and audit systems.</p></article></div>
        <p className="enterprise-caption">Sensitive prompts, credentials, customer identifiers and confidential tool arguments are excluded from telemetry by default. Enterprise policies govern redaction, sampling, access and export destinations; durable audit records follow their own integrity and retention requirements.</p>
      </div></section>

      <section id="enterprise-fit" className="home-section section-rule" aria-labelledby="enterprise-boundaries-title"><div className="page-shell">
        <SectionHeading id="enterprise-boundaries-title" eyebrow="CUSTOMER-CONTROLLED BOUNDARIES" description="Bind platform capabilities to the services your enterprise approves. Retain your identity, network, data and operational controls.">Keep your systems.<br /><em>Add intelligence.</em></SectionHeading>
        <div className="enterprise-bindings">{enterpriseBindings.map(binding => <article key={binding.title}><h3>{binding.title}</h3><div><span>YOUR ENTERPRISE DEFINES</span><p>{binding.owner}</p></div><div><span>THE PLATFORM INTEGRATES</span><p>{binding.behavior}</p></div></article>)}</div>
      </div></section>

      <section id="operations" className="home-section section-rule" aria-labelledby="readiness-title"><div className="page-shell">
        <SectionHeading id="readiness-title" eyebrow="COMPLIANCE & OPERATIONAL READINESS" description="Designed to support SOC 2 readiness and GDPR obligations through governed access, data protection, auditability and configurable controls.">Compliance-ready<br /><em>by design.</em></SectionHeading>
        <dl className="enterprise-compliance"><div><dt>SOC 2 Readiness</dt><dd>Access controls, monitoring, audit evidence and accountable operations designed to support SOC 2 readiness.</dd></div><div><dt>GDPR Alignment</dt><dd>Privacy-aware data handling, data minimization, controlled processing and configurable retention designed to support GDPR obligations.</dd></div></dl>
        <p className="enterprise-caption">These design goals support enterprise readiness and review. They do not represent a completed SOC 2 examination or attestation, or a guarantee of GDPR compliance.</p>
        <p className="enterprise-readiness-label">DEPLOYMENT VALIDATION AREAS</p><div className="enterprise-readiness">{operationalTargets.map(target => <article key={target.title}><h3>{target.title}</h3><p>{target.copy}</p></article>)}</div>
        <p className="enterprise-caption">Hosting location and single- or multi-tenant architecture are separate design decisions. Trust boundaries, approved data flows and operating responsibilities are defined per deployment. Availability commitments, recovery objectives, deployment support and compliance evidence are validated for your enterprise environment.</p>
      </div></section>

      <section id="book-demo" className="home-section dark-section final-cta section-rule" aria-labelledby="enterprise-cta-title"><div className="page-shell"><div className="cta-layout"><SectionHeading id="enterprise-cta-title" eyebrow="YOUR ENTERPRISE. YOUR RULES.">What would controlled<br /><em>execution look like for you?</em></SectionHeading><div><p className="section-description">Let’s map your business actions, enterprise controls and operating requirements to the platform.</p>{bookingUrl ? <a className="button button-primary" href={bookingUrl}>Book a Demo <Icon name="arrow" size={17} /></a> : <details className="booking-placeholder"><summary className="button button-primary">Book a Demo <Icon name="arrow" size={17} /></summary><p className="booking-status">Demo booking will be available soon.</p></details>}</div></div></div></section>
    </main><Footer platformHref="/platform" enterpriseHref="/enterprise" homeHref="/" />
  </div>;
}
