"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ExecutionFlow } from "./ExecutionFlow";

export function Hero() {
  const [runId, setRunId] = useState(0);
  function playDemo() {
    setRunId(value => value + 1);
    document.getElementById("execution-demo")?.focus({ preventScroll: true });
    document.getElementById("execution-demo")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "nearest" });
  }
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-grid page-shell">
      <div className="hero-copy">
        <p className="eyebrow"><span /> ENTERPRISE AGENTIC AI PLATFORM</p>
        <h1 id="hero-title">From conversation<br />to <em>execution.</em></h1>
        <p className="hero-description">AI agents that understand intent, access trusted enterprise knowledge, orchestrate capabilities and execute real actions across your business systems.</p>
        <div className="hero-actions"><button className="button button-primary" onClick={playDemo}>See it in Action <Icon name="arrow" size={18} /></button><a className="button button-text" href="#platform-at-work">Explore the Platform <Icon name="arrow" size={17} /></a></div>
        <p className="trust-line"><Icon name="shield" size={18} /><span>Governed by your enterprise.<br />Controlled by design.</span></p>
      </div>
      <ExecutionFlow runId={runId} />
    </div>
    <div className="hero-bottom page-shell"><span>INTELLIGENCE, PUT TO WORK.</span><span>Understand <i>→</i> Orchestrate <i>→</i> Execute</span><span className="bottom-index">01 / EXECUTION</span></div>
  </section>;
}
