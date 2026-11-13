import type { MetadataRoute } from "next";
import { localizedHref, routing, languageTags } from "@/i18n/routing";
import { siteOrigin } from "@/i18n/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  return ["/", "/platform", "/enterprise"].flatMap(path => {
    const languages = Object.fromEntries(routing.locales.map(locale => [languageTags[locale], new URL(localizedHref(path, locale), origin).href]));
    languages["x-default"] = new URL(path, origin).href;
    return routing.locales.map(locale => ({
      url: new URL(localizedHref(path, locale), origin).href,
      alternates: { languages },
    }));
  });
}
