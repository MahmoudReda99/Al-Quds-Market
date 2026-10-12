import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ar from '@/locales/ar.json';
import en from '@/locales/en.json';

export const SUPPORTED_LANGUAGES = ['ar', 'en'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * Set the HTML dir and lang attributes to match the active language.
 * Called on init and whenever the language changes.
 */
export function applyDocumentDirection(lang: SupportedLanguage): void {
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', lang);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    fallbackLng: 'ar',
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'al-quds-lang',
    },
  });

// Apply direction on first load
applyDocumentDirection((i18n.language as SupportedLanguage) ?? 'ar');

// Re-apply direction when language changes
i18n.on('languageChanged', (lng) => {
  applyDocumentDirection(lng as SupportedLanguage);
});

export default i18n;
