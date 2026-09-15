"use client";

import { useState } from "react";
import { industryCases } from "@/lib/data/home";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "./SectionHeading";

export function Industries() {
  const [selected, setSelected] = useState(0);
  const example = industryCases[selected];
  return <section id="industries" className="home-section light-section section-rule" aria-labelledby="industries-title"><div className="page-shell"><SectionHeading id="industries-title">Enterprise AI that<br /><em>understands your business.</em></SectionHeading><p className="industry-choice-label">Choose your industry. Explore a business execution.</p><div className="industry-layout"><div className="industry-selector" role="group" aria-label="Choose an industry">{industryCases.map((item, index) => <button key={item.id} aria-pressed={index === selected} aria-controls="industry-example" onClick={() => setSelected(index)}><span>0{index + 1}</span>{item.label}<Icon name="arrow" size={18} /></button>)}</div><div id="industry-example" className="industry-example" aria-live="polite" aria-atomic="true"><span className="section-eyebrow">{example.label} &middot; EXAMPLE EXECUTION</span><h3>{example.goal}</h3><p>“{example.request}”</p><ol>{example.flow.map(step => <li key={step}>{step}</li>)}</ol><div className="industry-outcome"><Icon name="check" size={17} />{example.outcome}</div></div></div></div></section>;
}
