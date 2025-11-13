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

// Import directives
import { HoverStyle } from './components/common/directives.js';

// Import all components from cib-common-components
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
  registerComponents,
  mergeLocaleMessage
} from 'cib-common-components';

// Export individual components and directives
export {
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
  
  // cib-common-components
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
  registerComponents,
  mergeLocaleMessage
};

// Plugin installation function
export function install(app) {
  // Register all cib-common-components first
  registerComponents(app);
  
  // Register local components
  app.component('CIBForm', CIBForm);
  app.component('CIBHeaderFlow', CIBHeaderFlow);
  app.component('ConfirmDialog', ConfirmDialog);
  app.component('ContentBlock', ContentBlock);
  app.component('CopyableActionButton', CopyableActionButton);
  app.component('ErrorDialog', ErrorDialog);
  app.component('FlowTable', FlowTable);
  app.component('GenericTabs', GenericTabs);
  app.component('HighlightedText', HighlightedText);
  app.component('PagedScrollableContent', PagedScrollableContent);
  app.component('PaginationControl', PaginationControl);
  app.component('SidebarsDataFlow', SidebarsDataFlow);
  app.component('SidebarsFlow', SidebarsFlow);
  app.component('SuccessAlert', SuccessAlert);
  app.component('TranslationsDownload', TranslationsDownload);
  
  // Register local directives
  app.directive('hover-style', HoverStyle);
}

// Auto-install when used via CDN
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({ install });
}