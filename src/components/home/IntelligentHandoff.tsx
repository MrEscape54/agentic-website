import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "./SectionHeading";

export function IntelligentHandoff() {
  return <section id="handoff" className="home-section light-section section-rule" aria-labelledby="handoff-title"><div className="page-shell handoff-layout"><SectionHeading id="handoff-title" eyebrow="INTELLIGENT HANDOFF" description="Agents recognize when a specialist is needed, triage the request and transfer the case with accumulated conversation and context.">Autonomous when it can.<br /><em>Human when it should.</em></SectionHeading>
    <div className="handoff-diagram"><div className="triage-path"><span>Request</span><Icon name="arrow" size={17} /><span><Icon name="layers" size={18} />AI agent</span><Icon name="arrow" size={17} /><strong>Triage</strong></div><div className="handoff-branches"><div className="resolve-branch"><Icon name="check" /><strong>Resolve</strong><p>Complete the action.</p></div><div><Icon name="arrow" /><strong>Escalate to a human expert</strong><p>Context preserved. Specialist takes over.</p></div></div><ol className="support-levels"><li><span>L1</span>AI</li><li><span>L2</span>AI + enterprise tools</li><li><span>L3</span>Human specialist</li></ol></div>
  </div></section>;
}
