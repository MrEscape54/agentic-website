import { Brand } from "./Brand";

export function Footer({ platformHref = "/platform", homeHref = "/", enterpriseHref = "/enterprise" }: { platformHref?: string; homeHref?: string; enterpriseHref?: string }) {
  return <footer className="site-footer"><div className="page-shell footer-layout"><a href={homeHref} className="brand" aria-label="lorenza home"><Brand /></a><nav aria-label="Footer navigation">{["Platform", "Solutions", "Industries", "Enterprise"].map(item => (item === "Solutions" || item === "Industries") ? <span key={item} className="nav-pending" aria-disabled="true" title={`${item} coming soon`}>{item}</span> : <a key={item} href={item === "Platform" ? platformHref : enterpriseHref}>{item}</a>)}</nav><a className="back-top" href="#main">Back to top ↑</a></div></footer>;
}
