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
import i18n from './app/i18n.js'
import AppLayout from './app/AppLayout.vue'
import router from './app/routes.js'
import { mergeLocaleMessage } from '@cib/bootstrap-components'

// Import Bootstrap CSS
import '@mdi/font/css/materialdesignicons.css'
import '@cib/bootstrap-components/dist/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import registerComponents from './register.js'

mergeLocaleMessage(i18n, 'en')

// Create Vue app
const app = createApp(AppLayout)
registerComponents(app)

// Use router and i18n
app.use(router)
app.use(i18n)

// Mount the app
app.mount('#app')
