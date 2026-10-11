import type { ExecutionCase } from "@/lib/data/execution-cases";
import { IconTile } from "@/components/ui/IconTile";

export function EnterpriseSystems({ active, systems }: { active?: string; systems: ExecutionCase["systems"] }) {
  return <div className="enterprise-systems" aria-label="Connected enterprise systems">
    <div className="system-bus" aria-hidden="true" />
    {systems.map(system => <div key={system.name} className={`system ${active === system.name ? "system-active" : ""}`}>
      <span className="system-wire" aria-hidden="true" />
      <IconTile name={system.icon} /><span className="system-name">{system.name}</span>
      {active === system.name && <span className="sr-only"> — active connection</span>}
    </div>)}
  </div>;
}
