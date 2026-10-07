import { SectionHeading } from "@/components/home/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import "./business-outcomes.css";

const outcomes: { title: string; icon: IconName; description: string; request: string; steps: string[]; result: string }[] = [
  {
    title: "Customer Service", icon: "customers",
    description: "Resolve requests and complete changes across customer systems.",
    request: "I need to change my mobile plan.",
    steps: ["Identify", "Check eligibility", "Update billing"],
    result: "Plan updated",
  },
  {
    title: "Employee Experience", icon: "people",
    description: "Connect employees with trusted knowledge and the actions they need.",
    request: "I need access to our project workspace.",
    steps: ["Check policy", "Obtain approval", "Grant access"],
    result: "Approved access granted",
  },
  {
    title: "Operations", icon: "operations",
    description: "Coordinate work across systems and execute operational changes.",
    request: "Move this delivery to Friday.",
    steps: ["Retrieve order", "Check availability", "Reschedule"],
    result: "Delivery rescheduled",
  },
];

export function BusinessOutcomes() {
  return <section id="business-outcomes" className="home-section section-rule vision-outcomes" aria-labelledby="outcomes-title">
    <div className="page-shell">
      <div className="section-topline">
        <SectionHeading id="outcomes-title" eyebrow="BEYOND ANSWERS">Conversations become<br /><em>business outcomes.</em></SectionHeading>
        <p className="section-aside">Resolve requests, coordinate work and complete transactions across your business systems.</p>
      </div>
      <div className="vision-outcome-grid">{outcomes.map(outcome => <article key={outcome.title}>
        <div className="vision-outcome-heading"><Icon name={outcome.icon} size={23} /><h3>{outcome.title}</h3></div>
        <p className="vision-outcome-description">{outcome.description}</p>
        <blockquote>“{outcome.request}”</blockquote>
        <ol aria-label={`${outcome.title} example steps`}>{outcome.steps.map(step => <li key={step}>{step}</li>)}</ol>
        <p className="vision-outcome-result"><Icon name="check" size={17} />{outcome.result}</p>
      </article>)}</div>
      <p className="vision-outcome-note">Illustrative outcomes · Execution follows enterprise permissions, policies and required approvals.</p>
    </div>
  </section>;
}
