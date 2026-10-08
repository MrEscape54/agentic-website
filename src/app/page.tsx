import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ToBeHero } from "@/components/to-be/ToBeHero";
import { HumanInTheLoop } from "@/components/to-be/HumanInTheLoop";
import { Capabilities } from "@/components/home/Capabilities";
import { toBeCapabilities } from "@/lib/data/to-be";
import { EnterpriseFit } from "@/components/to-be/EnterpriseFit";
import { Omnichannel } from "@/components/home/Omnichannel";
import "./product.css";

export const metadata: Metadata = {
  title: "Enterprise Agentic AI Platform | From conversation to execution",
  description: "Explore the platform: enterprise AI execution with enterprise-defined permissions, policies and human oversight.",
};

const controls: { title: string; headline: string; description: string; icon: IconName; items: string[] }[] = [
  { title: "Protect", headline: "Share meaning. Not sensitive data.", description: "Protect sensitive information and apply your enterprise’s data-handling rules to model access and execution.", icon: "shield", items: ["Protected model context", "Enterprise-defined data boundaries"] },
  { title: "Control", headline: "Your rules guide every action.", description: "Govern agent access and business actions through enterprise identity, permissions and policies.", icon: "key", items: ["Authorized agents and actions", "Human approval when required"] },
  { title: "Observe", headline: "Know what happened—and why.", description: "Trace agent activity, human decisions and business actions through your enterprise’s observability tools.", icon: "signal", items: ["Decisions linked to execution", "Visibility in your existing tools"] },
];
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

export default function Home() {
  return <div className="to-be-page">
    <Navbar platformHref="/platform" enterpriseHref="/enterprise" />
    <main id="main">
      <ToBeHero />
      <section id="enterprise" className="home-section section-rule" aria-labelledby="enterprise-title"><div className="page-shell">
        <div className="section-topline"><SectionHeading id="enterprise-title" eyebrow="ENTERPRISE BY DESIGN">Governed by your enterprise.<br /><em>Controlled by design.</em></SectionHeading><p className="section-aside">Define what agents can access, which actions they can take and when people must decide.</p></div>
        <div className="control-grid">{controls.map(control => <article key={control.title}><Icon name={control.icon} size={25} /><h3>{control.title}</h3><p>{control.headline}</p><p className="vision-control-description">{control.description}</p><ul>{control.items.map(item => <li key={item}><Icon name="check" size={13} />{item}</li>)}</ul></article>)}</div>
        <p className="enterprise-close">Autonomy without<br /><em>losing control.</em></p>
        <div style={{ textAlign: "center" }}><Link className="text-link" href="/enterprise">Explore enterprise controls <Icon name="arrow" size={16} /></Link></div>
      </div></section>
      <Omnichannel vision />
      <HumanInTheLoop />
      <Capabilities compact groups={toBeCapabilities} description="Understand the request. Execute the work. Keep your enterprise in control—with capabilities that fit the systems you already trust." />
      <EnterpriseFit />
      <section id="book-demo" className="home-section dark-section final-cta section-rule" aria-labelledby="cta-title"><div className="page-shell"><div className="cta-layout"><SectionHeading id="cta-title" eyebrow="FROM CONVERSATION TO EXECUTION">What could your<br />AI agents <em>execute?</em></SectionHeading><div><p className="section-description">Let’s identify the work your agents could carry out—and the controls your enterprise needs to make it possible.</p>{bookingUrl ? <a className="button button-primary" href={bookingUrl}>Book a Demo <Icon name="arrow" size={17} /></a> : <details className="booking-placeholder"><summary className="button button-primary">Book a Demo <Icon name="arrow" size={17} /></summary><p className="booking-status">Demo booking will be available soon.</p></details>}<p className="trust-line">Governed by your enterprise. Controlled by design.</p></div></div></div></section>
    </main>
    <Footer platformHref="/platform" enterpriseHref="/enterprise" />
  </div>;
}
