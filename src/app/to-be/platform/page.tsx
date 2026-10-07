import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { SectionHeading } from "@/components/home/SectionHeading";
import { FinalCTA } from "@/components/home/FinalCTA";
import { PlatformExecution } from "@/components/to-be/PlatformExecution";
import { Icon } from "@/components/ui/Icon";
import { platformJourney, platformBuildingBlocks, platformConnections } from "@/lib/data/platform";
import "../to-be.css";
import "./platform.css";

export const metadata: Metadata = {
  title: "Platform vision | From intent to outcome",
  description: "Explore how agents, trusted knowledge and enterprise tools turn intent into controlled execution, with human oversight where required.",
  robots: { index: false, follow: false },
};

export default function PlatformPage() {
  return <div className="to-be-page platform-page">
    <Navbar platformHref="/to-be/platform" enterpriseHref="/to-be/enterprise" homeHref="/to-be" />
    <main id="main">
      <div className="vision-banner page-shell"><span><strong>TO-BE</strong> Product vision · Platform</span><Link href="/to-be">Back to overview →</Link></div>
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
        <SectionHeading id="ecosystem-title" eyebrow="A CONNECTED ECOSYSTEM" description="Connect approved models, enterprise tools and specialist agents through a platform designed to adapt to your technology environment.">Bring the right intelligence<br /><em>to every task.</em></SectionHeading>
        <div className="platform-connections">{platformConnections.map(connection => <article key={connection.title}><Icon name={connection.icon} size={26} /><h3>{connection.title}</h3><p>{connection.copy}</p><details><summary>{connection.label}</summary><p>{connection.detail}</p></details></article>)}</div>
      </div></section>
      <section id="enterprise" className="home-section section-rule" aria-labelledby="platform-governance-title"><div className="page-shell">
        <SectionHeading id="platform-governance-title" eyebrow="ACCOUNTABLE EXECUTION" description="Agent identity, approved access, enterprise policies and human oversight guide execution. Traces connect each action to its outcome.">Built to act.<br /><em>Designed to stay accountable.</em></SectionHeading>
        <Link className="text-link" href="/to-be/enterprise">Explore enterprise controls →</Link>
      </div></section>
      <FinalCTA description="Let’s explore the business tasks your agents could complete—and the capabilities needed to make them happen." />
    </main>
    <Footer platformHref="/to-be/platform" enterpriseHref="/to-be/enterprise" homeHref="/to-be" />
  </div>;
}
