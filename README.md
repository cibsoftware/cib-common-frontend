# CIB Common Frontend

A comprehensive Vue.js component library for CIB applications, providing reusable UI components with consistent styling and functionality.

## Overview

This library contains common Vue.js components that can be shared across multiple flow applications. It's built with Vue 3, Bootstrap 5, and follows modern web development best practices.

## Installation

### Prerequisites

- Node.js 16+
- npm or yarn
- Vue 3.x

### Install from Public Registry

```bash
npm install @cib/common-frontend
```

### Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install --registry https://nexus.cib.de
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build the library:
   ```bash
   npm run build
   ```

## Available Components

### CIB Custom Components

- **CIBForm** - Comprehensive form component for CIB applications
- **CIBHeaderFlow** - Header component specifically designed for flow applications
- **ConfirmDialog** - Specialized confirmation dialog with different types (warning, danger, info, success)
- **ContentBlock** - Reusable content block component for structured layouts
- **CopyableActionButton** - Button component with copy-to-clipboard functionality
- **ErrorDialog** - Error display dialog with collapsible technical details
- **FlowTable** - Advanced data table with sorting, filtering, pagination, and search
- **GenericTabs** - Flexible tab component for organizing content
- **HighlightedText** - Text component with highlighting capabilities
- **PagedScrollableContent** - Content component with pagination and scrolling support
- **PaginationControl** - Comprehensive pagination component with page size options
- **SidebarsDataFlow** - Collapsible sidebar component with navigation and actions for data flows
- **SidebarsFlow** - General collapsible sidebar component for flow applications
- **SuccessAlert** - Success message alert component
- **TaskList** - Component for displaying and managing task lists
- **TaskPopper** - Popover component for task-related information
- **TranslationsDownload** - Component for handling translation file downloads

### Bootstrap Components (from bootstrap-components)

- **BAlert** - Alert component with dismiss functionality and auto-dismiss timer
- **BAvatar** - Avatar component with image, text, and size variants
- **BBadge** - Badge component for labels and indicators
- **BButton** - Enhanced button component with multiple variants, sizes, and icon support
- **BButtonClose** - Close button component with ARIA labels
- **BCalendar** - Calendar component for date selection
- **BCard** - Card component for content grouping
- **BCardBody** - Card body content wrapper
- **BCardText** - Card text content wrapper
- **BCol** - Bootstrap grid column component
- **BCollapse** - Collapsible content component
- **BDropdown** - Dropdown menu component
- **BDropdownDivider** - Dropdown menu divider
- **BDropdownForm** - Dropdown form wrapper
- **BDropdownGroup** - Dropdown group wrapper
- **BDropdownItem** - Dropdown menu item
- **BDropdownItemButton** - Dropdown button item
- **BForm** - Form wrapper component
- **BFormCheckbox** - Checkbox input component
- **BFormDatepicker** - Date picker input component
- **BFormFile** - File input component
- **BFormGroup** - Form group wrapper with label and validation
- **BFormInput** - Text input component
- **BFormRow** - Form row wrapper for grid layout
- **BFormSelect** - Select dropdown input component
- **BFormSelectOption** - Select option component
- **BFormTag** - Tag input component for multiple values
- **BFormTextarea** - Textarea input component
- **BFormTimepicker** - Time picker input component
- **BInputGroup** - Input group wrapper for enhanced inputs
- **BInputGroupAppend** - Input group append addon
- **BInputGroupPrepend** - Input group prepend addon
- **BInputGroupText** - Input group text addon
- **BLink** - Link component with router integration
- **BListGroup** - List group container
- **BListGroupItem** - List group item
- **BModal** - Modal dialog component with customizable header, body, and footer
- **BNavItemDropdown** - Navigation dropdown item
- **BNavbar** - Navigation bar component
- **BNavbarBrand** - Navbar brand component
- **BNavbarNav** - Navbar navigation wrapper
- **BNavbarToggle** - Navbar toggle button for mobile
- **BOverlay** - Overlay component for loading states
- **BPagination** - Pagination component for navigation
- **BPopover** - Popover component for contextual information
- **BProgress** - Progress bar container
- **BProgressBar** - Progress bar component
- **BSpinner** - Loading spinner component
- **BTab** - Tab component for tabbed content
- **BTabs** - Tab container component
- **BWaitingBox** - Waiting/loading box component with spinner

### Directives

- **HoverStyle** - Custom directive for hover effects
- **BToggle** - Bootstrap toggle directive for collapsible elements
- **BDPopover** - Bootstrap popover directive

## Usage

### Import Individual Components

```javascript
import { CIBForm, ConfirmDialog, FlowTable } from '@cib/common-frontend';

export default {
  components: {
    CIBForm,
    ConfirmDialog,
    FlowTable
  }
}
```

### Use as Plugin

```javascript
import { createApp } from 'vue';
import CibCommonFrontend from '@cib/common-frontend';
import App from './App.vue';

const app = createApp(App);
app.use(CibCommonFrontend);
app.mount('#app');
```

### Component Examples

#### CIBForm Component

```vue
<template>
  <div>
    <CIBForm
      :fields="formFields"
      :model-value="formData"
      @update:model-value="handleFormUpdate"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      formFields: [
        { name: 'username', type: 'text', label: 'Username', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true }
      ],
      formData: {
        username: '',
        email: ''
      }
    }
  },
  methods: {
    handleFormUpdate(data) {
      this.formData = data;
    },
    handleSubmit(data) {
      console.log('Form submitted:', data);
    }
  }
}
</script>
```

#### FlowTable Component

```vue
<template>
  <FlowTable
    :data="tableData"
    :columns="columns"
    :paginated="true"
    :searchable="true"
    @row-click="handleRowClick"
    @sort-changed="handleSort"
  />
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'status', label: 'Status' }
      ],
      tableData: [
        { id: 1, name: 'Item 1', status: 'Active' },
        { id: 2, name: 'Item 2', status: 'Inactive' }
      ]
    }
  },
  methods: {
    handleRowClick(data) {
      console.log('Row clicked:', data);
    },
    handleSort(sortInfo) {
      console.log('Sort changed:', sortInfo);
    }
  }
}
</script>
```

#### ConfirmDialog Component

```vue
<template>
  <div>
    <button @click="showConfirm = true" class="btn btn-danger">
      Delete Item
    </button>
    
    <ConfirmDialog
      v-model="showConfirm"
      type="danger"
      title="Confirm Deletion"
      message="Are you sure you want to delete this item? This action cannot be undone."
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showConfirm: false
    }
  },
  methods: {
    handleConfirm() {
      console.log('Item deleted');
      this.showConfirm = false;
    },
    handleCancel() {
      console.log('Deletion cancelled');
      this.showConfirm = false;
    }
  }
}
</script>
```

## Styling

The components use Bootstrap 5 for styling. Make sure to include Bootstrap CSS in your project:

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

### Icons

Components support Material Design Icons (MDI). Include the icon font or install the package:

```bash
npm install @mdi/font
```

```javascript
import '@mdi/font/css/materialdesignicons.min.css';
```

## Development

### Project Structure

```
src/
├── components/
│   └── common/           # All reusable components
├── services/            # Common services (empty, ready for use)
├── utils/               # Common utilities (empty, ready for use)
├── assets/              # Common assets (empty, ready for use)
├── library.js           # Main library export file
└── main.js              # Development entry point
```

### Building for Production

```bash
npm run build
```

This creates:
- `dist/cib-common-frontend.es.js` - ES module version
- `dist/cib-common-frontend.umd.js` - UMD version for browsers
- `dist/library.css` - Compiled styles

### Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build library for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Component Props & Events

### CIBForm

**Props:**
- `fields` - Array of field definitions
- `modelValue` - v-model for form data
- `validation` - Validation rules object
- `readonly` - Read-only form state
- `loading` - Loading state

**Events:**
- `@update:modelValue` - Form data update
- `@submit` - Form submission event
- `@validate` - Validation event

### ConfirmDialog

**Props:**
- `modelValue` - v-model for show/hide state
- `type` - Dialog type (warning, danger, info, success)
- `title` - Dialog title
- `message` - Confirmation message
- `confirmText` - Custom confirm button text
- `cancelText` - Custom cancel button text

**Events:**
- `@update:modelValue` - v-model update
- `@confirm` - Confirm button clicked
- `@cancel` - Cancel button clicked

### FlowTable

**Props:**
- `data` - Array of data objects
- `columns` - Column definitions
- `loading` - Loading state
- `paginated` - Enable pagination
- `searchable` - Enable search

**Events:**
- `@row-click` - Row clicked
- `@sort-changed` - Sort order changed

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software for internal use.

## Dependencies

### Runtime Dependencies
- Vue 3.3+
- Bootstrap 5.3+
- Vue Router 4.2+
- Vue i18n 9.2+

### Development Dependencies
- Vite 6.0+
- ESLint 9.18+
- Prettier 3.5+
- Vitest 3.1+

## Notes

- Components are designed to work with Bootstrap 5 classes
- Icon support requires Material Design Icons font
- All components follow Vue 3 Composition API patterns
- TypeScript support can be added in future versions