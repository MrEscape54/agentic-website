"use client";

import { useExecutionPlayback } from "./useExecutionPlayback";
import { Icon } from "@/components/ui/Icon";
import { executionCases } from "@/lib/data/execution-cases";
import { EnterpriseSystems } from "./EnterpriseSystems";

export function ExecutionFlow({ runId }: { runId: number }) {
  const { caseIndex, step, playing, reduced, example, complete, current,
    selectCase, inspectStep, replay, togglePlayback, nextStep } = useExecutionPlayback(runId);

  return <div data-playing={playing && !reduced} className="execution-demo" id="execution-demo" tabIndex={-1}>
    <div className="demo-caption"><span><span className="small-dot" /> FROM INTENT TO OUTCOME</span><span>INTERACTIVE DEMO</span></div>
    <div className="execution-panel">
      <div className="panel-heading"><span><Icon name="layers" size={17} /> Execution flow</span><span className="demo-badge">{example.label}</span></div>
      <div className="case-selector" role="group" aria-label="Choose a Hero example">{executionCases.map((item, index) => <button key={item.id} aria-pressed={caseIndex === index} onClick={() => selectCase(index)}>{item.label}</button>)}</div>
      <div className="request"><span className="request-icon"><Icon name="signal" size={20} /></span><div><span className="micro-label">CUSTOMER REQUEST</span><p>{example.request}</p></div><span className="request-dot" /></div>
      <div className="flow-body">
        <div className="flow-label"><span>AGENT EXECUTION</span><span>{complete ? "COMPLETE" : `${String(step + 1).padStart(2, "0")} / ${String(example.steps.length).padStart(2, "0")}`}</span></div>
        <ol className="step-list" aria-label="Execution steps">
          {example.steps.map((item, index) => <li key={item.id} className={step > index ? "step-done" : step === index ? "step-active" : "step-pending"}>
            <button aria-label={`Inspect step ${index + 1}: ${item.label}`} aria-current={step === index ? "step" : undefined} onClick={() => inspectStep(index)}>
              <span className="step-node">{step > index ? <Icon name="check" size={13} /> : <Icon name={item.icon} size={15} />}</span><span>{item.label}</span>
            </button>
          </li>)}
        </ol>
        <div className={`step-detail ${complete ? "detail-complete" : ""}`} aria-live="polite" aria-atomic="true">
          <div className="detail-heading"><span className={complete ? "detail-icon is-success" : "detail-icon"}><Icon name={complete ? "check" : current.icon} size={20} /></span><div><span className="micro-label">{complete ? "OUTCOME" : current.label.toUpperCase()}</span><h2>{complete ? example.outcome : current.title}</h2></div><span className={complete ? "status resolved" : "status"}>{complete ? "RESOLVED ✓" : playing ? "IN PROGRESS" : "DEMO PAUSED"}</span></div>
          <p className="detail-description">{complete ? "The request became a completed action." : current.description}</p>
          <div className="detail-payload">{complete ? <><Icon name="check" size={15} /><span>{example.result} · Execution traced ✓</span></> : current.id === "protect" ? <><s>{example.sensitive}</s><Icon name="arrow" size={16} /><code>{example.token}</code></> : current.id === "orchestrate" ? <div className="skill-tags">{example.skills.map(skill => <code key={skill}>{skill}</code>)}</div> : <><span className="payload-dot" /><span>{current.detail}</span></>}</div>
        </div>
      </div>
      <div className="panel-footer"><span><Icon name="shield" size={14} /> Controlled execution</span><div>{reduced && !complete && <button onClick={nextStep}>Next step <Icon name="arrow" size={13} /></button>}{!reduced && <button onClick={togglePlayback} aria-label={playing ? "Pause demo" : "Resume demo"}><Icon name={playing ? "pause" : "play"} size={13} />{playing ? "Pause demo" : "Resume demo"}</button>}<button onClick={replay} aria-label="Replay demo"><Icon name="replay" size={13} /> Replay demo</button></div></div>
    </div>
    <EnterpriseSystems systems={example.systems} active={complete ? undefined : current.system} />
    <p className="systems-caption">YOUR SYSTEMS. CONNECTED TO ACTION.</p>
  </div>;
}
