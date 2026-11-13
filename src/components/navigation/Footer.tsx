import { useText } from "@/i18n/useText";
import { Brand } from "./Brand";

export function Footer({ platformHref = "/platform", homeHref = "/", enterpriseHref = "/enterprise" }: { platformHref?: string; homeHref?: string; enterpriseHref?: string }) {
  const t = useText();
  return <footer className="site-footer"><div className="page-shell footer-layout"><a href={t.href(homeHref)} className="brand" aria-label={t("lorenza home")}><Brand /></a><nav aria-label={t("Footer navigation")}>{["Platform", "Solutions", "Industries", "Enterprise"].map(item => (item === "Solutions" || item === "Industries") ? <span key={item} className="nav-pending" aria-disabled="true" title={t(`${item} coming soon`)}>{t(item)}</span> : <a key={item} href={t.href(item === "Platform" ? platformHref : enterpriseHref)}>{t(item)}</a>)}</nav><a className="back-top" href={t.href("#main")}>{t("Back to top ↑")}</a></div></footer>;
}
