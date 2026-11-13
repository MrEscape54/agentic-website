import { useText } from "@/i18n/useText";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/i18n/metadata";
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
import "../../product.css";
import "../../platform/platform.css";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return pageMetadata(locale, "platform");
}

function PlatformPageContent() {
  const t = useText();
  return <div className="product-page platform-page">
    <Navbar platformHref="/platform" enterpriseHref="/enterprise" homeHref="/" />
    <main id="main">
      <PlatformOverview />
      <PlatformJourney />
      <section id="execution" className="home-section section-rule" aria-labelledby="execution-title"><div className="page-shell">
        <div className="section-topline"><SectionHeading id="execution-title" eyebrow={t("AGENTIC ORCHESTRATION")}>{t("See the platform")}<br /><em>{t("at work.")}</em></SectionHeading><p className="section-aside">{t("Explore how context, agents and enterprise tools turn a business request into a controlled outcome.")}</p></div>
        <PlatformExecution />
        <p className="platform-execution-note"><Icon name="shield" size={18} />{t("Enterprise permissions and policy govern each action.")}</p>
      </div></section>
      <PlatformBuildingBlocks />
      <PlatformEcosystem />
      <PlatformObservability />
      <FinalCTA description={t("Let’s explore the business tasks your agents could complete—and the capabilities needed to make them happen.")} />
    </main>
    <Footer platformHref="/platform" enterpriseHref="/enterprise" homeHref="/" />
  </div>;
}

export default async function PlatformPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <PlatformPageContent />;
}
