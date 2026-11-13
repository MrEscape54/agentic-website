import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "pt"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // An unprefixed URL always remains English, including after switching languages.
  // Explicit language links persist the preference without redirecting shared URLs.
  localeDetection: false,
  // HTML metadata owns the region-specific hreflang links (es-419 / pt-BR).
  alternateLinks: false,
  localeCookie: { name: "LORENZA_LOCALE", maxAge: 60 * 60 * 24 * 365 },
});

export type Locale = (typeof routing.locales)[number];
export const languageTags: Record<Locale, string> = { en: "en", es: "es-419", pt: "pt-BR" };

export function localizedHref(href: string, locale: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const path = href.replace(/^\/(en|es|pt)(?=\/|$|[?#])/, "") || "/";
  if (locale === "en") return path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`;
}
