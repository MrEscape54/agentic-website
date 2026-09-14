import type { ExecutionCase } from "@/lib/data/execution-cases";
import { Icon } from "@/components/ui/Icon";

export function EnterpriseSystems({ active, systems }: { active?: string; systems: ExecutionCase["systems"] }) {
  return <div className="enterprise-systems" aria-label="Connected enterprise systems">
    <div className="system-bus" aria-hidden="true" />
    {systems.map(system => <div key={system.name} className={`system ${active === system.name ? "system-active" : ""}`}>
      <span className="system-wire" aria-hidden="true" />
      <Icon name={system.icon} size={17} /><span>{system.name}</span>
      {active === system.name && <span className="sr-only"> — active connection</span>}
    </div>)}
  </div>;
}
