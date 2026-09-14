"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { executionCases } from "@/lib/data/execution-cases";
import { EnterpriseSystems } from "./EnterpriseSystems";

export function ExecutionFlow({ runId }: { runId: number }) {
  const [{ caseIndex, step }, setPosition] = useState({ caseIndex: 0, step: 0 });
  const example = executionCases[caseIndex];
  const setStep = (step: number) => setPosition(value => ({ ...value, step }));
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const complete = step === example.steps.length;
  const current = example.steps[Math.min(step, example.steps.length - 1)];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { setReduced(media.matches); setPlaying(!media.matches); setPosition(value => ({ ...value, step: media.matches ? executionCases[value.caseIndex].steps.length : 0 })); };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (runId === 0) return;
    const id = window.setTimeout(() => { setPosition(value => ({ ...value, step: 0 })); setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, 0);
    return () => window.clearTimeout(id);
  }, [runId]);

  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setTimeout(() => setPosition(value => complete
      ? { caseIndex: (value.caseIndex + 1) % executionCases.length, step: 0 }
      : { ...value, step: value.step + 1 }), complete ? 4500 : step === 0 ? 2200 : 2600);
    return () => window.clearTimeout(timer);
  }, [caseIndex, step, playing, complete, reduced]);

  function replay() { setStep(0); setPlaying(!reduced); }

  return <div className="execution-demo" id="execution-demo" tabIndex={-1}>
    <div className="demo-caption"><span><span className="small-dot" /> FROM INTENT TO OUTCOME</span><span>INTERACTIVE DEMO</span></div>
    <div className="execution-panel">
      <div className="panel-heading"><span><Icon name="layers" size={17} /> Execution flow</span><span className="demo-badge">{example.label}</span></div>
      <div className="case-selector" role="group" aria-label="Choose a Hero example">{executionCases.map((item, index) => <button key={item.id} aria-pressed={caseIndex === index} onClick={() => { setPosition({ caseIndex: index, step: 0 }); setPlaying(false); }}>{item.label}</button>)}</div>
      <div className="request"><span className="request-icon"><Icon name="signal" size={20} /></span><div><span className="micro-label">CUSTOMER REQUEST</span><p>{example.request}</p></div><span className="request-dot" /></div>
      <div className="flow-body">
        <div className="flow-label"><span>AGENT EXECUTION</span><span>{complete ? "COMPLETE" : `${String(step + 1).padStart(2, "0")} / 06`}</span></div>
        <ol className="step-list" aria-label="Execution steps">
          {example.steps.map((item, index) => <li key={item.label} className={step > index ? "step-done" : step === index ? "step-active" : "step-pending"}>
            <button aria-label={`Inspect step ${index + 1}: ${item.label}`} aria-current={step === index ? "step" : undefined} onClick={() => { setStep(index); setPlaying(false); }}>
              <span className="step-node">{step > index ? <Icon name="check" size={13} /> : <Icon name={item.icon} size={15} />}</span><span>{item.label}</span>
            </button>
          </li>)}
        </ol>
        <div className="step-detail" aria-live="polite" aria-atomic="true">
          <div className="detail-heading"><span className={complete ? "detail-icon is-success" : "detail-icon"}><Icon name={complete ? "check" : current.icon} size={20} /></span><div><span className="micro-label">{complete ? "OUTCOME" : current.label.toUpperCase()}</span><h2>{complete ? example.outcome : current.title}</h2></div><span className={complete ? "status resolved" : "status"}>{complete ? "RESOLVED ✓" : playing ? "IN PROGRESS" : "PAUSED"}</span></div>
          <p className="detail-description">{complete ? "The request became a completed action." : current.description}</p>
          <div className="detail-payload">{complete ? <><Icon name="check" size={15} /><span>{example.result} · Execution traced ✓</span></> : step === 2 ? <><s>{example.sensitive}</s><Icon name="arrow" size={16} /><code>{example.token}</code></> : step === 3 ? <div className="skill-tags">{example.skills.map(skill => <code key={skill}>{skill}</code>)}</div> : <><span className="payload-dot" /><span>{current.detail}</span></>}</div>
        </div>
      </div>
      <div className="panel-footer"><span><Icon name="shield" size={14} /> Controlled execution</span><div>{reduced && !complete && <button onClick={() => setStep(step + 1)}>Next step <Icon name="arrow" size={13} /></button>}{!reduced && <button onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause execution" : "Resume execution"}><Icon name={playing ? "pause" : "play"} size={13} />{playing ? "Pause" : "Resume"}</button>}<button onClick={replay} aria-label="Replay execution"><Icon name="replay" size={13} /> Replay</button></div></div>
    </div>
    <EnterpriseSystems systems={example.systems} active={complete ? undefined : current.system} />
    <p className="systems-caption">YOUR SYSTEMS. CONNECTED TO ACTION.</p>
  </div>;
}
