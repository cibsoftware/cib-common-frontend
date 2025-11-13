import { createI18n } from 'vue-i18n'

// Import translation files
import translationsDe from './assets/translations_de.json'
import translationsEn from './assets/translations_en.json'
import translationsEs from './assets/translations_es.json'
import translationsIt from './assets/translations_it.json'
import translationsRu from './assets/translations_ru.json'
import translationsUa from './assets/translations_ua.json'

// Create and export i18n instance
export const i18n = createI18n({
  locale: 'en', // Default locale
  fallbackLocale: 'en',
  messages: {
    de: translationsDe,
    en: translationsEn,
    es: translationsEs,
    it: translationsIt,
    ru: translationsRu,
    ua: translationsUa
  }
})

export default i18n