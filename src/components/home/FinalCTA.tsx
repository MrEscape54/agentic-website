import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "./SectionHeading";

// TODO: Set the approved scheduling URL or commercial email when supplied.
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "mailto:info@example.com?subject=Platform%20demo";

export function FinalCTA() {
  return <section id="book-demo" className="home-section dark-section final-cta" aria-labelledby="cta-title"><div className="page-shell"><div className="cta-layout"><SectionHeading id="cta-title" eyebrow="FROM CONVERSATION TO EXECUTION">What could your<br />AI agents <em>execute?</em></SectionHeading><div><p className="section-description">Let’s identify the conversations in your business that could become intelligent, automated actions.</p>{bookingUrl ? <a className="button button-primary" href={bookingUrl}>Book a Demo <Icon name="arrow" size={17} /></a> : <><button className="button button-primary" disabled aria-describedby="booking-status">Book a Demo <Icon name="arrow" size={17} /></button><p id="booking-status" className="booking-status">Demo booking will be available soon.</p></>}</div></div><p className="cta-trust"><Icon name="shield" size={17} />Governed by your enterprise. Controlled by design.</p></div></section>;
}
