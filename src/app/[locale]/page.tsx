import { useText } from "@/i18n/useText";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/i18n/metadata";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IconTile } from "@/components/ui/IconTile";
import { ProductHero } from "@/components/hero/ProductHero";
import { HumanInTheLoop } from "@/components/home/HumanInTheLoop";
import { Capabilities } from "@/components/home/Capabilities";
import { capabilityGroups } from "@/lib/data/capabilities";
import { EnterpriseFit } from "@/components/home/EnterpriseFit";
import { Omnichannel } from "@/components/home/Omnichannel";
import "../product.css";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return pageMetadata(locale, "home");
}

const controls: { title: string; headline: string; description: string; icon: IconName; items: string[] }[] = [
  { title: "Protect", headline: "Share meaning. Not sensitive data.", description: "Protect sensitive information and apply your enterprise’s data-handling rules to model access and execution.", icon: "shield", items: ["Protected model context", "Enterprise-defined data boundaries"] },
  { title: "Control", headline: "Your rules guide every action.", description: "Govern agent access and business actions through enterprise identity, permissions and policies.", icon: "key", items: ["Authorized agents and actions", "Human approval when required"] },
  { title: "Observe", headline: "Know what happened—and why.", description: "Trace agent activity, human decisions and business actions through your enterprise’s observability tools.", icon: "signal", items: ["Decisions linked to execution", "Visibility in your existing tools"] },
];
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

function HomeContent() {
  const t = useText();
  return <div className="product-page">
    <Navbar platformHref="/platform" enterpriseHref="/enterprise" />
    <main id="main">
      <ProductHero />
      <section id="enterprise" className="home-section section-rule" aria-labelledby="enterprise-title">
        <div className="page-shell">
          <div className="section-topline">
            <SectionHeading id="enterprise-title" eyebrow={t("ENTERPRISE BY DESIGN")}>{t("Governed by your enterprise. ")}<br />
              <em>{t("Controlled by design.")}</em>
            </SectionHeading>
            <p className="section-aside">{t("Governed execution, protected data and accountable actions—guided by your enterprise’s security requirements and human oversight.")}</p>
          </div>
          <div className="control-grid">
            {controls.map(control => 
              <article key={control.title}>
                <IconTile name={control.icon} />
                <h3>{t(control.title)}</h3>
                <p>{t(control.headline)}</p>
                <p className="vision-control-description">{t(control.description)}</p>
                <ul>{control.items.map(item => <li key={item}><Icon name="check" size={13} />{t(item)}</li>)}</ul>
              </article>)
            }
          </div>
          <p className="enterprise-close">{t("Autonomy without")}<br /><em>{t("losing control.")}</em></p>
          <div style={{ textAlign: "center" }}>
            <Link className="text-link" href={t.href("/enterprise")}>{t("Explore enterprise controls ")}<Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>
      <Omnichannel vision />
      <HumanInTheLoop />
      <Capabilities 
        compact groups={capabilityGroups} 
        description={t("Understand the request. Execute the work. Keep your enterprise in control—with capabilities that fit the systems you already trust.")} 
      />
      <EnterpriseFit />
      <section id="book-demo" className="home-section dark-section final-cta section-rule" aria-labelledby="cta-title">
        <div className="page-shell">
          <div className="cta-layout">
            <SectionHeading id="cta-title" eyebrow={t("FROM CONVERSATION TO EXECUTION")}>{t("What could your ")}<br />{t("AI agents ")}<em>{t("execute?")}</em>
            </SectionHeading>
            <div>
              <p className="section-description">{t("Let’s identify the work your agents could carry out—and the controls your enterprise needs to make it possible.")}</p>
              {bookingUrl 
              ? 
                <a className="button button-primary" href={t.href(bookingUrl)}>{t("Book a Demo ")}<Icon name="arrow" size={17} />
                </a> 
              : 
                <details className="booking-placeholder">
                  <summary className="button button-primary">{t("Book a Demo ")}<Icon name="arrow" size={17} />
                  </summary>
                  <p className="booking-status">{t("Demo booking will be available soon.")}</p>
                </details>
              }
              <p className="trust-line">{t("Governed by your enterprise. Controlled by design.")}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer platformHref="/platform" enterpriseHref="/enterprise" />
  </div>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <HomeContent />;
}
