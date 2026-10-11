import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { SectionHeading } from "@/components/home/SectionHeading";
import { FinalCTA } from "@/components/home/FinalCTA";
import { PlatformExecution } from "@/components/platform/PlatformExecution";
import { PlatformOverview, PlatformJourney } from "@/components/platform/PlatformOverview";
import { PlatformBuildingBlocks } from "@/components/platform/PlatformBuildingBlocks";
import { PlatformEcosystem } from "@/components/platform/PlatformEcosystem";
import { PlatformObservability } from "@/components/platform/PlatformObservability";
import { Icon } from "@/components/ui/Icon";
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
      <PlatformOverview />
      <PlatformJourney />
      <section id="execution" className="home-section section-rule" aria-labelledby="execution-title"><div className="page-shell">
        <div className="section-topline"><SectionHeading id="execution-title" eyebrow="AGENTIC ORCHESTRATION">See the platform<br /><em>at work.</em></SectionHeading><p className="section-aside">Explore how context, agents and enterprise tools turn a business request into a controlled outcome.</p></div>
        <PlatformExecution />
        <p className="platform-execution-note"><Icon name="shield" size={18} />Enterprise permissions and policy govern each action.</p>
      </div></section>
      <PlatformBuildingBlocks />
      <PlatformEcosystem />
      <PlatformObservability />
      <FinalCTA description="Let’s explore the business tasks your agents could complete—and the capabilities needed to make them happen." />
    </main>
    <Footer platformHref="/platform" enterpriseHref="/enterprise" homeHref="/" />
  </div>;
}
