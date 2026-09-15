import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, id, children, description }: { eyebrow?: string; id: string; children: ReactNode; description?: string }) {
  return <div className="section-heading">{eyebrow && <p className="section-eyebrow">{eyebrow}</p>}<h2 id={id}>{children}</h2>{description && <p className="section-description">{description}</p>}</div>;
}
