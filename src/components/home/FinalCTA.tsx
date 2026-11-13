import { useText } from "@/i18n/useText";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "./SectionHeading";

// TODO: Set the approved scheduling URL or commercial email when supplied.
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "";

export function FinalCTA({ description = "Let’s identify the conversations in your business that could become intelligent, automated actions." }: { description?: string }) {
  const t = useText();
  return <section id="book-demo" className="home-section dark-section final-cta" aria-labelledby="cta-title"><div className="page-shell"><div className="cta-layout"><SectionHeading id="cta-title" eyebrow={t("FROM CONVERSATION TO EXECUTION")}>{t("What could your")}<br />{t("AI agents ")}<em>{t("execute?")}</em></SectionHeading><div><p className="section-description">{t(description)}</p>{bookingUrl ? <a className="button button-primary" href={t.href(bookingUrl)}>{t("Book a Demo ")}<Icon name="arrow" size={17} /></a> : <><details className="booking-placeholder"><summary className="button button-primary">{t("Book a Demo ")}<Icon name="arrow" size={17} /></summary><p className="booking-status">{t("Demo booking will be available soon.")}</p></details></>}</div></div></div></section>;
}
