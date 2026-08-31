export type AppLang = "ar" | "en";

const EN_LOCALE = "en-GB";
const AR_LOCALE = "ar-JO-u-nu-latn";

const westernDigits: Intl.NumberFormatOptions = { numberingSystem: "latn" };

export function localeForLang(lang: AppLang): string {
  return lang === "ar" ? AR_LOCALE : EN_LOCALE;
}

export function formatDate(
  value: Date | string | number,
  lang: AppLang,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Date(value).toLocaleDateString(localeForLang(lang), { ...westernDigits, ...options });
}

export function formatDateTime(
  value: Date | string | number,
  lang: AppLang,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Date(value).toLocaleString(localeForLang(lang), { ...westernDigits, ...options });
}

export function formatNumber(value: number, lang: AppLang, options?: Intl.NumberFormatOptions): string {
  return value.toLocaleString(localeForLang(lang), { ...westernDigits, ...options });
}
