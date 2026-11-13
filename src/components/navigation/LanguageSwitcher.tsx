"use client";

import { useLocale } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import { localizedHref, routing, languageTags } from "@/i18n/routing";

const names = { en: "English", es: "Español", pt: "Português" };
const labels = { en: "Choose language", es: "Elegir idioma", pt: "Escolher idioma" };

export function LanguageSwitcher() {
  const locale = useLocale() as keyof typeof names;
  const pathname = usePathname();
  const search = useSearchParams();
  return <nav className="language-switcher" aria-label={labels[locale]}>
    {routing.locales.map(language => <a key={language}
      href={`${localizedHref(pathname, language)}${search.size ? `?${search}` : ""}`}
      lang={languageTags[language]} hrefLang={languageTags[language]}
      aria-label={names[language]} aria-current={locale === language ? "true" : undefined}
      onClick={event => {
        const url = new URL(event.currentTarget.href);
        url.hash = window.location.hash;
        event.currentTarget.href = url.href;
        document.cookie = `LORENZA_LOCALE=${language}; Path=/; Max-Age=31536000; SameSite=Lax`;
      }}>
      {language.toUpperCase()}
    </a>)}
  </nav>;
}
