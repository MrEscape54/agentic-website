import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { SectionHeading } from "@/components/home/SectionHeading";
import { FinalCTA } from "@/components/home/FinalCTA";
import { PlatformExecution } from "@/components/platform/PlatformExecution";
import { Icon } from "@/components/ui/Icon";
import { platformJourney, platformBuildingBlocks, platformConnections } from "@/lib/data/platform";
import "../product.css";
import "./platform.css";

export const metadata: Metadata = {
  title: "Platform | From intent to outcome",
  description: "Explore how agents, trusted knowledge and enterprise tools turn intent into controlled execution, with human oversight where required.",
};

export default function PlatformPage() {
  return <div className="product-page platform-page">
    <Navbar platformHref="/platform" enterpriseHref="/enterprise" homeHref="/" />
    <main id="main">
      <section className="platform-intro page-shell" aria-labelledby="platform-title">
        <p className="eyebrow"><span /> THE PLATFORM</p>
        <h1 id="platform-title">One platform.<br />From intent to <em>outcome.</em></h1>
        <p className="section-description">Connect conversations, trusted knowledge, agents and enterprise tools to complete business tasks—with control across every step.</p>
        <a href="#execution" className="button button-primary">See the Platform at Work <Icon name="arrow" size={17} /></a>
        <p className="platform-foundation-line">CONNECT → UNDERSTAND → KNOW → ORCHESTRATE → ACT → INSIGHT</p>
      </section>
      <section id="journey" className="home-section section-rule" aria-labelledby="journey-title"><div className="page-shell">
        <SectionHeading id="journey-title" eyebrow="FROM INTENT TO OUTCOME">Every outcome starts<br /><em>with a connected execution.</em></SectionHeading>
        <ol className="platform-journey" aria-label="Platform execution stages">{platformJourney.map((stage, index) => <li key={stage.name}><div><span>0{index + 1}</span><Icon name={stage.icon} size={24} /></div><h3>{stage.name}</h3><p>{stage.copy}</p></li>)}</ol>
        <p className="platform-journey-foundation">CONTROL <span>·</span> INTEGRATE <span>·</span> OBSERVE</p>
      </div></section>
      <section id="execution" className="home-section section-rule" aria-labelledby="execution-title"><div className="page-shell">
        <SectionHeading id="execution-title" eyebrow="AGENTIC ORCHESTRATION" description="Follow a mobile plan change from the customer’s request to the billing update. Explore what happens when the action requires a human decision.">See the platform<br /><em>at work.</em></SectionHeading>
        <PlatformExecution />
      </div></section>
      <section className="home-section section-rule" aria-labelledby="building-blocks-title"><div className="page-shell">
        <SectionHeading id="building-blocks-title" eyebrow="BEHIND THE EXECUTION">Connected capabilities.<br /><em>A shared outcome.</em></SectionHeading>
        <div className="platform-building-blocks">{platformBuildingBlocks.map(item => <article key={item.title}><Icon name={item.icon} size={25} /><h3>{item.title}</h3><p>{item.copy}</p><details><summary>How it works</summary><p>{item.detail}</p></details></article>)}</div>
        <figure className="platform-connected-example"><figcaption>ILLUSTRATIVE CONNECTION · PLAN CHANGE</figcaption><ol><li><span>AGENT</span>Customer Agent</li><li><span>SKILL</span>Check eligibility</li><li><span>TOOL</span>Billing tool</li><li className="platform-example-outcome"><span>OUTCOME</span><strong><Icon name="check" size={16} />Plan updated</strong></li></ol><p>Trusted knowledge informs the decision. Enterprise permissions and policy govern the action.</p></figure>
      </div></section>
      <section id="ecosystem" className="home-section section-rule" aria-labelledby="ecosystem-title"><div className="page-shell">
        <SectionHeading id="ecosystem-title" eyebrow="A CONNECTED ECOSYSTEM" description="Use the infrastructure your enterprise trusts. Models, tools and agent ecosystems connect through governed interfaces, without locking orchestration to a single provider.">Built to connect.<br /><em>Designed to adapt.</em></SectionHeading>
        <div className="platform-connections">{platformConnections.map(connection => <article key={connection.title}><Icon name={connection.icon} size={26} /><h3>{connection.title}</h3><p>{connection.copy}</p><details><summary>{connection.label}</summary><p>{connection.detail}</p></details></article>)}</div>
        <p className="platform-architecture-note"><strong>Your infrastructure. Our orchestration.</strong> Enterprise AI Gateway is the logical umbrella for governed model, tool and agent access. These capabilities can use native, open-source, third-party or customer-managed implementations that meet required capabilities and policy enforcement requirements.</p>
      </div></section>
      <section id="enterprise" className="home-section section-rule" aria-labelledby="platform-governance-title"><div className="page-shell">
        <SectionHeading id="platform-governance-title" eyebrow="END-TO-END OBSERVABILITY" description="Every execution produces correlated visibility across agents, models, tools and enterprise actions. Open interfaces connect that intelligence to the observability systems your enterprise already uses.">Observable by design.<br /><em>Pluggable by architecture.</em></SectionHeading>
        <p className="platform-architecture-note">The Observability Hub collects, correlates and distributes operational telemetry through pluggable adapters. Stable correlation identifiers connect conversations and channels, orchestration and delegation, model interactions, tool discovery and invocation, agent-to-agent interactions, policy decisions, human approvals and business outcomes.</p>
        <p className="platform-architecture-note">Sensitive prompts, credentials, customer identifiers and confidential tool arguments are excluded from telemetry by default. Durable audit evidence is managed separately from operational telemetry.</p>
        <Link className="text-link" href="/enterprise">Explore enterprise controls →</Link>
      </div></section>
      <FinalCTA description="Let’s explore the business tasks your agents could complete—and the capabilities needed to make them happen." />
    </main>
    <Footer platformHref="/platform" enterpriseHref="/enterprise" homeHref="/" />
  </div>;
}
