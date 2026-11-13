"use client";
import { useText } from "@/i18n/useText";

import { Suspense, useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Icon } from "@/components/ui/Icon";
import { useScrollNavbar } from "./useScrollNavbar";
import { Brand } from "./Brand";
import "./navbar.css";

const items = ["Platform", "Solutions", "Industries", "Enterprise"];

export function Navbar({ platformHref = "/platform", homeHref = "/", enterpriseHref = "/enterprise" }: { platformHref?: string; homeHref?: string; enterpriseHref?: string }) {
  const t = useText();
  const [open, setOpen] = useState(false);
  const headerRef = useScrollNavbar(open);
  return <div className="navbar-space"><header ref={headerRef} className="site-header" data-menu-open={open}>
    <div className="nav-shell">
      <a href={t.href(homeHref)} className="brand" aria-label={t("lorenza home")}><Brand /></a>
      <nav aria-label={t("Main navigation")} id="main-navigation" className={open ? "navigation is-open" : "navigation"}>
        {items.map(item => (item === "Solutions" || item === "Industries") ? <span key={item} className="nav-pending" aria-disabled="true" title={t(`${item} coming soon`)}>{t(item)}</span> : <a key={item} className="nav-link" href={t.href(item === "Platform" ? platformHref : enterpriseHref)} onClick={() => setOpen(false)}>{t(item)}</a>)}
        <span className="nav-pending" aria-disabled="true" title={t("Resources coming soon")}>{t("Resources")}</span>
        <Suspense><LanguageSwitcher /></Suspense>
      </nav>
      <a className="button nav-cta" href={t.href("#book-demo")} onClick={() => setOpen(false)}>{t("Book a Demo ")}<Icon name="arrow" size={16} /></a>
      <button className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={t(open ? "Close navigation" : "Open navigation")} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
    </div>
  </header></div>;
}
