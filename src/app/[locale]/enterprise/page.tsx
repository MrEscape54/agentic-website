import { useText } from "@/i18n/useText";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/i18n/metadata";
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
import "../../product.css";
import "../../enterprise/enterprise.css";
import "../../enterprise/governance.css";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return pageMetadata(locale, "enterprise");
}

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

function EnterprisePageContent() {
  const t = useText();
  return <div className="product-page enterprise-page">
    <Navbar platformHref="/platform" enterpriseHref="/enterprise" homeHref="/" />
    <main id="main">
      <div className="enterprise-entry">
        <section className="enterprise-intro page-shell" aria-labelledby="enterprise-page-title">
          <div><p className="eyebrow"><span />{t(" ENTERPRISE BY DESIGN")}</p><h1 id="enterprise-page-title">{t("Governed by your enterprise.")}<br /><em>{t("Controlled by design.")}</em></h1><p className="section-description">{t("Put AI to work with accountable agents, controlled actions and visibility across execution. Your enterprise defines the rules. The platform applies them alongside your existing controls.")}</p><a href={t.href("#governance")} className="button button-primary">{t("Explore enterprise controls ")}<Icon name="arrow" size={16} /></a></div>
          <figure className="enterprise-authority" aria-labelledby="authority-caption">
            <div><IconTile name="shield" /><div className="enterprise-authority-copy"><span>{t("YOUR ENTERPRISE")}</span><strong>{t("Identity · policies · data boundaries")}</strong></div></div>
            <div><IconTile name="layers" /><div className="enterprise-authority-copy"><span>{t("THE PLATFORM")}</span><strong>{t("Govern → Enforce → Execute")}</strong></div></div>
            <div><IconTile name="signal" /><div className="enterprise-authority-copy"><span>{t("ACCOUNTABILITY")}</span><strong>{t("Actions · human decisions · evidence")}</strong></div></div>
            <figcaption id="authority-caption">{t("Integrating with the controls you already trust.")}</figcaption>
          </figure>
        </section>
        <nav className="enterprise-index page-shell" aria-label={t("Enterprise topics")}>{sections.map((section, index) => <a key={section.id} href={t.href(`#${section.id}`)}><span className="enterprise-index-number" aria-hidden="true">0{index + 1}</span><span>{t(section.label)}</span><span className="enterprise-index-arrow" aria-hidden="true">↓</span></a>)}</nav>
      </div>

      <section id="governance" className="home-section section-rule" aria-labelledby="governance-title"><div className="page-shell">
        <div className="section-topline"><SectionHeading id="governance-title" eyebrow={t("GOVERNANCE & ACCOUNTABILITY")}>{t("Know what can operate.")}<br /><em>{t("Decide what it can do.")}</em></SectionHeading><p className="section-aside">{t("Give every agent an identity, an owner and a defined scope before it participates in governed production flows.")}</p></div>
        <div className="enterprise-registry">
          <div className="enterprise-registry-story"><IconTile name="layers" /><p className="section-eyebrow">{t("AI ASSET REGISTRY")}</p><h3>{t("Ownership is the starting point.")}</h3><p>{t("Register agents, models, tools, MCP servers and agent-to-agent endpoints with their purpose, environment, version, risk and approval status.")}</p><p>{t("Connect that governance record to your existing enterprise catalog or registry where one is already in place.")}</p><ul className="enterprise-registry-assets" aria-label={t("Governed asset types")}>{registryAssets.map(asset => <li key={asset.label}><Icon name={asset.icon} size={19} />{t(asset.label)}</li>)}</ul></div>
          <dl>{registryAttributes.map(attribute => <div key={attribute.title}><dt><Icon name={attribute.icon} size={25} /><span>{t(attribute.title)}</span></dt><dd>{t(attribute.description)}</dd></div>)}</dl>
        </div>
        <figure className="enterprise-lifecycle-figure"><figcaption>{t("AI ASSET LIFECYCLE")}</figcaption><ol className="enterprise-lifecycle" aria-label={t("Illustrative AI asset lifecycle")}>{lifecycle.map((state, index) => <li key={state} className={state === "Active" ? "enterprise-lifecycle-active" : undefined}><span aria-hidden="true">0{index + 1}</span>{t(state)}</li>)}</ol></figure>
        <div className="enterprise-registry-note"><Icon name="key" size={22} /><p><strong>{t("Registry approval does not grant runtime authorization.")}</strong><span>{t("Suspension or retirement revokes runtime access without removing audit history.")}</span></p></div>
        <details className="enterprise-responsibilities"><summary>{t("Explore platform responsibilities")}</summary><dl>{enterpriseResponsibilities.map(responsibility => <div key={responsibility.title}><dt>{t(responsibility.title)}</dt><dd>{t(responsibility.copy)}</dd></div>)}</dl><p>{t("Logical capabilities do not necessarily correspond to proprietary deployable products. Enterprise AI Gateway groups governed access; Enterprise Control coordinates policy decisions.")}</p></details>
      </div></section>

      <EnterpriseControls />

      <EnterpriseObservability />

      <EnterpriseBoundaries />

      <EnterpriseReadiness />

      <section id="book-demo" className="home-section dark-section final-cta section-rule" aria-labelledby="enterprise-cta-title"><div className="page-shell"><div className="cta-layout"><SectionHeading id="enterprise-cta-title" eyebrow={t("YOUR ENTERPRISE. YOUR RULES.")}>{t("What would controlled")}<br /><em>{t("execution look like for you?")}</em></SectionHeading><div><p className="section-description">{t("Let’s map your business actions, enterprise controls and operating requirements to the platform.")}</p>{bookingUrl ? <a className="button button-primary" href={t.href(bookingUrl)}>{t("Book a Demo ")}<Icon name="arrow" size={17} /></a> : <details className="booking-placeholder"><summary className="button button-primary">{t("Book a Demo ")}<Icon name="arrow" size={17} /></summary><p className="booking-status">{t("Demo booking will be available soon.")}</p></details>}</div></div></div></section>
    </main><Footer platformHref="/platform" enterpriseHref="/enterprise" homeHref="/" />
  </div>;
}

export default async function EnterprisePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <EnterprisePageContent />;
}
