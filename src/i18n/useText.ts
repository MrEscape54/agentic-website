import { useLocale, useTranslations } from "next-intl";
import { messageKey } from "./key";
import { localizedHref } from "./routing";

// Translate only rendered copy. IDs, skill names, comparisons and playback state
// retain their original values. Non-string React children pass through unchanged.
export function useText() {
  const messages = useTranslations("copy");
  const locale = useLocale();
  function text<T>(value: T): T {
    if (typeof value !== "string" || locale === "en") return value;
    const source = value.trim().replace(/\s+/g, " ");
    const key = messageKey(source);
    if (messages.has(key)) {
      return value.replace(value.trim(), messages.raw(key) as string) as T;
    }
    return value;
  }
  text.href = (href: string) => localizedHref(href, locale);
  return text;
}
