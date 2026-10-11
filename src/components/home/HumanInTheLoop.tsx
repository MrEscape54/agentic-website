import { Icon, type IconName } from "@/components/ui/Icon";
import "./human-in-the-loop.css";

const steps: { title: string; icon: IconName }[] = [
  { title: "Prepare action", icon: "layers" },
  { title: "Execute", icon: "operations" },
  { title: "Recorded", icon: "check" },
];
const decisions = [
  { title: "Approve", detail: "Continue execution" },
  { title: "Request changes", detail: "Return for review" },
  { title: "Reject", detail: "Stop the action" },
];

export function HumanInTheLoop() {
  return <section id="human-in-the-loop" className="home-section section-rule vision-human" aria-labelledby="hitl-title">
    <div className="page-shell">
      <div className="vision-human-heading">
        <div><p className="section-eyebrow">HUMAN-IN-THE-LOOP</p><h2 id="hitl-title" className="section-title">Autonomous when it can.<br />Human when it should.</h2></div>
        <p className="vision-human-intro">Your enterprise defines where agents can act independently—and where a human decision is required.</p>
      </div>
      <figure className="vision-human-flow" aria-labelledby="hitl-caption">
        <div className="vision-human-diagram">
          <div className="vision-policy-entry"><span>Business request</span><span className="vision-policy-line" aria-hidden="true" /><div className="vision-policy"><Icon name="shield" size={27} /><div><strong>Enterprise policy</strong><span>Identity · permissions · action limits</span></div></div></div>
          <div className="vision-human-paths">
            <article className="vision-human-path vision-autonomous-path" aria-labelledby="hitl-autonomous">
              <h3 id="hitl-autonomous" className="vision-path-label">WITHIN POLICY</h3>
              <ol className="vision-path-steps" aria-label="Autonomous execution">{steps.map(step => <li key={step.title} className={step.icon === "check" ? "vision-path-result" : undefined}><Icon name={step.icon} size={22} /><strong>{step.title}</strong></li>)}</ol>
              <p className="vision-path-description">The agent continues within enterprise-defined boundaries.</p>
            </article>
            <article className="vision-human-path vision-review-path" aria-labelledby="hitl-review">
              <h3 id="hitl-review" className="vision-path-label">HUMAN DECISION REQUIRED</h3>
              <div className="vision-human-checkpoint">
                <div className="vision-review-summary"><Icon name="people" size={27} /><div><h4>Review required</h4><p>The agent prepares the proposal and waits for an authorized reviewer.</p></div></div>
                <dl className="vision-review-decisions">{decisions.map(decision => <div key={decision.title}><dt>{decision.title}</dt><dd>{decision.detail}</dd></div>)}</dl>
              </div>
              <div className="vision-approved-result"><Icon name="check" size={22} /><div><strong>If approved, continue</strong><span>Reviewed → Authorized → Executed</span></div></div>
            </article>
          </div>
        </div>
        <figcaption id="hitl-caption">The right level of autonomy. Defined by your enterprise.</figcaption>
      </figure>
    </div>
  </section>;
}
