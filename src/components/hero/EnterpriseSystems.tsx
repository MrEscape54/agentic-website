import { useText } from "@/i18n/useText";
import type { ExecutionCase } from "@/lib/data/execution-cases";
import { IconTile } from "@/components/ui/IconTile";

export function EnterpriseSystems({ active, systems }: { active?: string; systems: ExecutionCase["systems"] }) {
  const t = useText();
  return <div className="enterprise-systems" aria-label={t("Connected enterprise systems")}>
    <div className="system-bus" aria-hidden="true" />
    {systems.map(system => <div key={system.name} className={`system ${active === system.name ? "system-active" : ""}`}>
      <span className="system-wire" aria-hidden="true" />
      <IconTile name={system.icon} /><span className="system-name">{t(system.name)}</span>
      {active === system.name && <span className="sr-only">{t(" — active connection")}</span>}
    </div>)}
  </div>;
}
