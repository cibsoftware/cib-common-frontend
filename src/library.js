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

// export all local components
export { default as CIBForm } from './components/common/CIBForm.vue';
export { default as CIBHeaderFlow } from './components/common/CIBHeaderFlow.vue';
export { default as ConfirmDialog } from './components/common/ConfirmDialog.vue';
export { default as ContentBlock } from './components/common/ContentBlock.vue';
export { default as CopyableActionButton } from './components/common/CopyableActionButton.vue';
export { default as ErrorDialog } from './components/common/ErrorDialog.vue';
export { default as FlowTable } from './components/common/FlowTable.vue';
export { default as GenericTabs } from './components/common/GenericTabs.vue';
export { default as HighlightedText } from './components/common/HighlightedText.vue';
export { default as PagedScrollableContent } from './components/common/PagedScrollableContent.vue';
export { default as PaginationControl } from './components/common/PaginationControl.vue';
export { default as SidebarsDataFlow } from './components/common/SidebarsDataFlow.vue';
export { default as SidebarsFlow } from './components/common/SidebarsFlow.vue';
export { default as SuccessAlert } from './components/common/SuccessAlert.vue';
export { default as TranslationsDownload } from './components/common/TranslationsDownload.vue';
export { default as TaskPopper } from './components/common/TaskPopper.vue';

export { HoverStyle } from './components/common/directives.js';
export { default as registerComponents } from './register.js'

// Import all components from @cib/bootstrap-components
import {
  mergeLocaleMessage as bootstrapMergeLocaleMessage
} from '@cib/bootstrap-components';

// Import bootstrap-components styles
import '@cib/bootstrap-components/dist/style.css'

// Import translation files
import en from './assets/translations_en.json'
import de from './assets/translations_de.json'
import es from './assets/translations_es.json'
import it from './assets/translations_it.json'
import ru from './assets/translations_ru.json'
import ua from './assets/translations_ua.json'

export function mergeLocaleMessage(i18n, lang) {
  bootstrapMergeLocaleMessage(i18n, lang)

  const translations = { en, de, es, it, ru, ua }
  const messages = translations[lang] || en
  i18n.global.mergeLocaleMessage(lang, messages)
}

export * from '@cib/bootstrap-components'
