import { useText } from "@/i18n/useText";
import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, id, children, description }: { eyebrow?: string; id: string; children: ReactNode; description?: string }) {
  const t = useText();
  return <div className="section-heading">{eyebrow && <p className="section-eyebrow">{t(eyebrow)}</p>}<h2 id={id} className="section-title">{children}</h2>{description && <p className="section-description">{t(description)}</p>}</div>;
}
