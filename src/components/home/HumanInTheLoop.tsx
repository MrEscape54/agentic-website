import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import "./human-in-the-loop.css";

const paths: { label: string; title: string; description: string; steps: { title: string; detail: string; icon: IconName; checkpoint?: boolean }[]; note?: string }[] = [
  {
    label: "WITHIN THE RULES", title: "Move forward autonomously.",
    description: "The action is permitted. The agent continues within the boundaries your enterprise defines.",
    steps: [
      { title: "Agent prepares the action", detail: "Relevant context and business intent", icon: "layers" },
      { title: "Policy permits execution", detail: "Identity, permissions and rules checked", icon: "shield" },
      { title: "Completed autonomously", detail: "Action executed and recorded", icon: "check" },
    ],
  },
  {
    label: "REQUIRES A HUMAN DECISION", title: "Pause at the right moment.",
    description: "An exception or sensitive action needs review. The agent prepares the proposal and waits.",
    steps: [
      { title: "Agent prepares the proposal", detail: "Context ready for an authorized reviewer", icon: "layers" },
      { title: "Human decision", detail: "Execution paused until a decision is made", icon: "people", checkpoint: true },
      { title: "If approved, the agent continues", detail: "Reviewed → Authorized → Executed", icon: "check" },
    ],
    note: "Rejected? The action stops. Changes requested? The proposal returns for review.",
  },
];

export function HumanInTheLoop() {
  return <section id="human-in-the-loop" className="home-section section-rule vision-human" aria-labelledby="hitl-title">
    <div className="page-shell">
      <div className="vision-human-heading"><SectionHeading id="hitl-title" eyebrow="HUMAN-IN-THE-LOOP" description="Your enterprise defines where agents can act independently—and where a human decision is required.">Autonomous when it can.<br /><em>Human when it should.</em></SectionHeading></div>
      <figure className="vision-human-flow" aria-labelledby="hitl-caption">
        <div className="vision-policy-entry"><span>Business request</span><span className="vision-policy-line" aria-hidden="true" /><div className="vision-policy"><Icon name="shield" size={23} /><div><strong>Enterprise policy</strong><span>Permissions · rules · action limits</span></div></div></div>
        <div className="vision-human-paths">{paths.map(path => <article className="vision-human-path" key={path.label}>
          <p className="vision-path-label">{path.label}</p><h3>{path.title}</h3><p className="vision-path-description">{path.description}</p>
          <ol className="vision-path-steps" aria-label={path.title}>{path.steps.map(step => <li key={step.title} className={step.checkpoint ? "vision-human-checkpoint" : step.icon === "check" ? "vision-path-result" : undefined}><Icon name={step.icon} size={19} /><div><strong>{step.title}</strong><span>{step.detail}</span></div></li>)}</ol>
          {path.note && <p className="vision-decision-note">{path.note}</p>}
        </article>)}</div>
        <figcaption id="hitl-caption">The right level of autonomy.<br /><em>Defined by your enterprise.</em></figcaption>
      </figure>
    </div>
  </section>;
}
