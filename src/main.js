/*
 * Copyright CIB software GmbH and/or licensed to CIB software GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. CIB software licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import AppLayout from './app/AppLayout.vue'
import router from './app/routes.js'
import { mergeLocaleMessage } from '@cib/bootstrap-components'

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@mdi/font/css/materialdesignicons.css'
import '@cib/bootstrap-components/dist/style.css'
import 'bootstrap'

import registerOwnComponents from './register.js'

// Import translation files
import translationsDe from './assets/translations_de.json'
import translationsEn from './assets/translations_en.json'
import translationsEs from './assets/translations_es.json'
import translationsIt from './assets/translations_it.json'
import translationsRu from './assets/translations_ru.json'
import translationsUa from './assets/translations_ua.json'

const languages = {
  de: translationsDe,
  en: translationsEn,
  es: translationsEs,
  it: translationsIt,
  ru: translationsRu,
  ua: translationsUa
}

// Create i18n instance
const i18n = createI18n({
  locale: 'en', // Default locale
  fallbackLocale: 'en',
})
mergeLocaleMessage(i18n, 'en')
i18n.global.mergeLocaleMessage('en', languages['en'])

// Create Vue app
const app = createApp(AppLayout)

registerOwnComponents(app)

// Use router and i18n
app.use(router)
app.use(i18n)

// Mount the app
app.mount('#app')