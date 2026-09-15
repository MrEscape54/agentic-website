import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "./SectionHeading";

const categories: { label: string; icon: IconName }[] = [
  { label: "CRM", icon: "customers" }, { label: "ERP", icon: "operations" },
  { label: "HCM", icon: "people" }, { label: "BILLING", icon: "receipt" },
  { label: "CORE SYSTEMS", icon: "layers" }, { label: "DATABASES", icon: "database" },
  { label: "KNOWLEDGE", icon: "book" }, { label: "APIs", icon: "code" },
];

export function Integrations() {
  return <section id="integrations" className="home-section integration-reassurance" aria-labelledby="integrations-title">
    <div className="page-shell integration-reassurance-layout">
      <SectionHeading id="integrations-title" eyebrow="INTEGRATIONS">Keep your systems.<br /><em>Add intelligence.</em></SectionHeading>
      <ul className="integration-categories" aria-label="Enterprise technology categories">{categories.map(category => <li key={category.label}><Icon name={category.icon} size={32} /><span>{category.label}</span></li>)}</ul>
    </div>
  </section>;
}
