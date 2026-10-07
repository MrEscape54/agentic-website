"use client";

import { useCapabilityScroll } from "./useCapabilityScroll";
import { capabilities as currentCapabilities } from "@/lib/data/home";
import { SectionHeading } from "./SectionHeading";

export function Capabilities({ groups: capabilities = currentCapabilities, compact = false, description = "Explore the engines and studios that connect understanding, knowledge and controlled execution." }: { groups?: typeof currentCapabilities; compact?: boolean; description?: string }) {
  const { sectionRef, stageRef, trackRef, cardRefs, markerRefs } = useCapabilityScroll(compact);

  return <section ref={sectionRef} id="capabilities" className="home-section capability-section" aria-labelledby="capabilities-title">
    <div ref={stageRef} className="capability-stage">
      <div className="page-shell capability-heading">
        <SectionHeading id="capabilities-title" eyebrow="PLATFORM CAPABILITIES" description={description}>The technology behind<br /><em>every execution.</em></SectionHeading>
      </div>
      <div className="capability-window">
        <div ref={trackRef} className="capability-track">
          {capabilities.map((group, index) => <article ref={element => { cardRefs.current[index] = element; }} className="capability-card" key={group.title} aria-labelledby={`capability-${index}`}>
            <span className="capability-number">0{index + 1}</span>
            <h3 id={`capability-${index}`}>{group.title}</h3>
            <p>{group.description}</p>
            <ul>{group.modules.map(module => <li key={module}>{module}</li>)}</ul>
          </article>)}
        </div>
      </div>
      <div className="capability-progress" aria-hidden="true">
        <div className="capability-rail"><i /></div>
        {capabilities.map((group, index) => <span ref={element => { markerRefs.current[index] = element; }} key={group.title}>0{index + 1}</span>)}
      </div>
    </div>
  </section>;
}
