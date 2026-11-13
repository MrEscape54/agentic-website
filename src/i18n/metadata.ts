import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { languageTags, localizedHref, type Locale } from "./routing";

export async function pageMetadata(locale: Locale, page: "home" | "platform" | "enterprise"): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const pathname = page === "home" ? "/" : `/${page}`;
  return {
    title: t(`${page}.title`),
    description: t(`${page}.description`),
    alternates: {
      canonical: localizedHref(pathname, locale),
      languages: { en: pathname, "es-419": localizedHref(pathname, "es"), "pt-BR": localizedHref(pathname, "pt"), "x-default": pathname },
    },
    openGraph: { title: t(`${page}.title`), description: t(`${page}.description`), locale: languageTags[locale].replace("-", "_"), url: localizedHref(pathname, locale), siteName: "lorenza" },
  };
}
