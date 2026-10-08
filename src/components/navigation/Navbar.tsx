"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useScrollNavbar } from "./useScrollNavbar";
import "./navbar.css";

const items = ["Platform", "Solutions", "Industries", "Enterprise"];

export function Navbar({ platformHref = "/platform", homeHref = "/", enterpriseHref = "/enterprise" }: { platformHref?: string; homeHref?: string; enterpriseHref?: string }) {
  const [open, setOpen] = useState(false);
  const headerRef = useScrollNavbar(open);
  return <div className="navbar-space"><header ref={headerRef} className="site-header" data-menu-open={open}>
    <div className="nav-shell">
      <a href={homeHref} className="brand" aria-label="BRAND LOGO home"><span className="brand-mark"><Icon name="layers" size={25} /></span>BRAND LOGO</a>
      <nav aria-label="Main navigation" id="main-navigation" className={open ? "navigation is-open" : "navigation"}>
        {items.map(item => (item === "Solutions" || item === "Industries") ? <span key={item} className="nav-pending" aria-disabled="true" title={`${item} coming soon`}>{item}</span> : <a key={item} className="nav-link" href={item === "Platform" ? platformHref : enterpriseHref} onClick={() => setOpen(false)}>{item}</a>)}
        <span className="nav-pending" aria-disabled="true" title="Resources coming soon">Resources</span>
      </nav>
      <a className="button nav-cta" href="#book-demo" onClick={() => setOpen(false)}>Book a Demo <Icon name="arrow" size={16} /></a>
      <button className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
    </div>
  </header></div>;
}
