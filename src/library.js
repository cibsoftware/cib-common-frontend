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

// Import all common components
import CIBForm from './components/common/CIBForm.vue';
import CIBHeaderFlow from './components/common/CIBHeaderFlow.vue';
import ConfirmDialog from './components/common/ConfirmDialog.vue';
import ContentBlock from './components/common/ContentBlock.vue';
import CopyableActionButton from './components/common/CopyableActionButton.vue';
import ErrorDialog from './components/common/ErrorDialog.vue';
import FlowTable from './components/common/FlowTable.vue';
import GenericTabs from './components/common/GenericTabs.vue';
import HighlightedText from './components/common/HighlightedText.vue';
import PagedScrollableContent from './components/common/PagedScrollableContent.vue';
import PaginationControl from './components/common/PaginationControl.vue';
import SidebarsDataFlow from './components/common/SidebarsDataFlow.vue';
import SidebarsFlow from './components/common/SidebarsFlow.vue';
import SuccessAlert from './components/common/SuccessAlert.vue';
import TranslationsDownload from './components/common/TranslationsDownload.vue';
import TaskPopper from './components/common/TaskPopper.vue';
import { HoverStyle } from './components/common/directives.js';

import registerComponents from './register.js'

// Import all components from @cib/bootstrap-components
import {
  BAlert,
  BAvatar,
  BBadge,
  BButton,
  BButtonClose,
  BCalendar,
  BCard,
  BCardBody,
  BCardText,
  BCol,
  BCollapse,
  BDPopover,
  BDdItemBtn,
  BDropdown,
  BDropdownDivider,
  BDropdownForm,
  BDropdownGroup,
  BDropdownItem,
  BDropdownItemButton,
  BForm,
  BFormCheckbox,
  BFormDatepicker,
  BFormFile,
  BFormGroup,
  BFormInput,
  BFormRow,
  BFormSelect,
  BFormSelectOption,
  BFormTag,
  BFormTextarea,
  BFormTimepicker,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BInputGroupText,
  BLink,
  BListGroup,
  BListGroupItem,
  BModal,
  BNavItemDropdown,
  BNavbar,
  BNavbarBrand,
  BNavbarNav,
  BNavbarToggle,
  BOverlay,
  BPagination,
  BPopover,
  BProgress,
  BProgressBar,
  BSpinner,
  BTab,
  BTabs,
  BToggle,
  BWaitingBox,

  mergeLocaleMessage as bootstrapMergeLocaleMessage
} from '@cib/bootstrap-components';

// Import bootstrap-components styles
import '@cib/bootstrap-components/dist/style.css'

// Import translation files
import en from '@/assets/translations_en.json'
import de from '@/assets/translations_de.json'
import es from '@/assets/translations_es.json'
import it from '@/assets/translations_it.json'
import ru from '@/assets/translations_ru.json'
import ua from '@/assets/translations_ua.json'

const mergeLocaleMessage = function(i18n, lang) {
  bootstrapMergeLocaleMessage(i18n, lang)

  const translations = { en, de, es, it, ru, ua }
  const messages = translations[lang] || en
  i18n.global.mergeLocaleMessage(lang, messages)
}

// Export individual components and directives
export {
  registerComponents,
  mergeLocaleMessage,

  // Local components
  CIBForm,
  CIBHeaderFlow,
  ConfirmDialog,
  ContentBlock,
  CopyableActionButton,
  ErrorDialog,
  FlowTable,
  GenericTabs,
  HighlightedText,
  PagedScrollableContent,
  PaginationControl,
  SidebarsDataFlow,
  SidebarsFlow,
  SuccessAlert,
  TranslationsDownload,
  HoverStyle,
  TaskPopper,

  // bootstrap-components
  BAlert,
  BAvatar,
  BBadge,
  BButton,
  BButtonClose,
  BCalendar,
  BCard,
  BCardBody,
  BCardText,
  BCol,
  BCollapse,
  BDPopover,
  BDdItemBtn,
  BDropdown,
  BDropdownDivider,
  BDropdownForm,
  BDropdownGroup,
  BDropdownItem,
  BDropdownItemButton,
  BForm,
  BFormCheckbox,
  BFormDatepicker,
  BFormFile,
  BFormGroup,
  BFormInput,
  BFormRow,
  BFormSelect,
  BFormSelectOption,
  BFormTag,
  BFormTextarea,
  BFormTimepicker,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BInputGroupText,
  BLink,
  BListGroup,
  BListGroupItem,
  BModal,
  BNavItemDropdown,
  BNavbar,
  BNavbarBrand,
  BNavbarNav,
  BNavbarToggle,
  BOverlay,
  BPagination,
  BPopover,
  BProgress,
  BProgressBar,
  BSpinner,
  BTab,
  BTabs,
  BToggle,
  BWaitingBox,
};
