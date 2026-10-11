"use client";

import { useState } from "react";
import { ExecutionFlow } from "@/components/hero/ExecutionFlow";
import { HeroArt } from "@/components/hero/HeroArt";
import { Icon } from "@/components/ui/Icon";

export function ProductHero() {
  const [runId, setRunId] = useState(0);
  function play() {
    setRunId(value => value + 1);
    const demo = document.getElementById("execution-demo");
    demo?.focus({ preventScroll: true });
    demo?.closest(".vision-demo")?.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <section className="hero olive-hero" aria-labelledby="hero-title">
    <HeroArt />
    <div className="hero-grid page-shell">
      <div className="hero-copy">
        <p className="eyebrow"><span /> ENTERPRISE AGENTIC AI PLATFORM</p>
        <h1 id="hero-title">From conversation<br />to <em>execution.</em></h1>
        <p className="hero-description">AI agents that understand intent, access trusted knowledge and execute business actions—with the permissions, policies and oversight your enterprise defines.</p>
        <div className="hero-actions"><button className="button button-primary" onClick={play}>See it in Action <Icon name="arrow" size={18} /></button><a className="button button-text" href="/platform">Explore the Platform <Icon name="arrow" size={17} /></a></div>
        <p className="trust-line"><Icon name="shield" size={18} /><span>Governed by your enterprise.<br />Controlled by design.</span></p>
      </div>
      <div className="vision-demo" role="region" aria-label="Interactive execution demo">
        <ExecutionFlow runId={runId} />
        <p className="vision-demo-note">Illustrative execution</p>
      </div>
    </div>
  </section>;
}
