import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "./SectionHeading";

export function ChatbotsVsAgents() {
  return <section className="home-section light-section" aria-labelledby="difference-title"><div className="page-shell comparison-layout">
    <SectionHeading id="difference-title" eyebrow="BEYOND THE CHATBOT" description="Chatbots can have a conversation. AI agents can pursue a goal, use enterprise knowledge and execute real actions.">Chatbots answer.<br /><em>AI agents act.</em></SectionHeading>
    <div><div className="comparison-cards">
      {[{ title: "Chatbot", steps: ["Request", "Understand", "Answer"], end: "END", agent: false }, { title: "AI agent", steps: ["Goal", "Understand", "Reason", "Use tools", "Execute"], end: "RESOLVED", agent: true }].map(item => <div className={`comparison-card ${item.agent ? "agent-card" : ""}`} key={item.title}><h3><Icon name={item.agent ? "layers" : "code"} />{item.title}</h3><ol>{item.steps.map(step => <li key={step}><span className="trace-node" />{step}</li>)}<li className={item.agent ? "trace-success" : "trace-end"}><span className="trace-node"><Icon name={item.agent ? "check" : "close"} size={10} /></span>{item.end}</li></ol></div>)}
    </div><p className="comparison-note">The difference isn’t the conversation. It’s what happens next.</p></div>
  </div></section>;
}
