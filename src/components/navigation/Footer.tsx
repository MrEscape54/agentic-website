import { Icon } from "@/components/ui/Icon";

export function Footer() {
  return <footer className="site-footer"><div className="page-shell footer-layout"><a href="#main" className="brand"><Icon name="layers" size={24} />BRAND LOGO</a><nav aria-label="Footer navigation">{["Platform", "Solutions", "Industries", "Enterprise"].map(item => <a key={item} href={item === "Platform" ? "#platform-at-work" : `#${item.toLowerCase()}`}>{item}</a>)}</nav><a className="back-top" href="#main">Back to top ↑</a></div></footer>;
}
