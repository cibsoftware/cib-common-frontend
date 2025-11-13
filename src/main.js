import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import AppLayout from './AppLayout.vue'
import router from './routes.js'

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'

import registerOwnComponents from './register.js'

// Import translation files
import translationsDe from './assets/translations_de.json'
import translationsEn from './assets/translations_en.json'
import translationsEs from './assets/translations_es.json'
import translationsIt from './assets/translations_it.json'
import translationsRu from './assets/translations_ru.json'
import translationsUa from './assets/translations_ua.json'

// Create i18n instance
const i18n = createI18n({
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

// Create Vue app
const app = createApp(AppLayout)

registerOwnComponents(app)

// Use router and i18n
app.use(router)
app.use(i18n)

// Mount the app
app.mount('#app')