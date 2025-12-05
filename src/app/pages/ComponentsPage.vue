<!--

    Copyright CIB software GmbH and/or licensed to CIB software GmbH
    under one or more contributor license agreements. See the NOTICE file
    distributed with this work for additional information regarding copyright
    ownership. CIB software licenses this file to you under the Apache License,
    Version 2.0; you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.

-->
<template>
    <SidebarsDataFlow
      v-model:left-open="showLeftSidebar" 
      :left-size="[12, 6, 4, 4, 3]"
      left-caption="Components Library">
      
      <template #left>
        <!-- Components Navigation -->
        <div class="components-navbar h-100 d-flex flex-column">
          <!-- Fixed Search Header -->
          <div class="navbar-header p-3 border-bottom bg-light flex-shrink-0">
            <h6 class="mb-0 text-muted">Available Components</h6>
            <div class="mt-2">
              <input
                type="text"
                v-model.trim="componentSearch"
                placeholder="Search components..."
                class="form-control form-control-sm"
                style="height: 32px;"
              />
            </div>
          </div>
          
          <!-- Scrollable Components List -->
          <div class="navbar-content flex-grow-1 overflow-auto">
            <div class="p-3">
              <div class="list-group">
                <router-link 
                  v-for="component in filteredComponents" 
                  :key="component.name"
                  :to="'/components/' + getComponentRoute(component.name)" 
                  class="list-group-item list-group-item-action text-decoration-none"
                  active-class="active">
                  <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">{{ component.name }}</h6>
                    <small class="badge" :class="component.type === 'vue' ? 'bg-success' : 'bg-info'">
                      {{ component.type === 'vue' ? 'Vue' : 'JS' }}
                    </small>
                  </div>
                  <p class="mb-1">{{ component.description }}</p>
                  <small class="text-muted">{{ component.category }}</small>
                </router-link>
              </div>
            </div>
          </div>

          <div class="p-2 bg-light border-top">
            <div class="row text-center">
              <div class="col-6">
                <div class="h5 text-success mb-0">{{ vueComponents.length }}</div>
                <small class="text-muted">Vue Components</small>
              </div>
              <div class="col-6">
                <div class="h5 text-info mb-0">{{ jsComponents.length }}</div>
                <small class="text-muted">JS Modules</small>
              </div>
            </div>
          </div>

        </div>
      </template>
      
      <!-- Main content area with router-view -->
      <div class="d-flex flex-column bg-light p-3 h-100">
        <div class="d-flex flex-column container-fluid bg-white border rounded shadow-sm h-100 py-3">
          <router-view v-slot="{ Component }">
            <div v-if="Component" class="h-100">
              <component :is="Component" />
            </div>
            <div v-else class="container d-flex align-items-center justify-content-center h-100">
              <div class="text-center">
                <span class="mdi mdi-48px mdi-cube-outline text-muted mb-3 d-block"></span>
                <h3 class="text-muted mb-3">Welcome to Components Library</h3>
                <p class="text-muted">Select a component from the left sidebar to view its documentation, usage examples, and integration instructions.</p>
              </div>
            </div>
          </router-view>
        </div>
      </div>
    </SidebarsDataFlow>
</template>

<script>
import SidebarsDataFlow from '../../components/common/SidebarsDataFlow.vue'

export default {
  name: 'ComponentsPage',
  components: {
    SidebarsDataFlow
  },
  data: function() { 
    return {
      showLeftSidebar: true,
      componentSearch: '',
      components: [
        {
          name: 'FlowTable',
          type: 'vue',
          fileName: 'FlowTable.vue',
          category: 'Data Display',
          description: 'Advanced data table with sorting, filtering, pagination, and search',
          icon: 'mdi-table'
        },
        {
          name: 'SidebarsDataFlow',
          type: 'vue',
          fileName: 'SidebarsDataFlow.vue',
          category: 'Layout',
          description: 'Collapsible sidebar layout component with left and right panels',
          icon: 'mdi-page-layout-sidebar-left'
        },
        {
          name: 'ConfirmDialog',
          type: 'vue',
          fileName: 'ConfirmDialog.vue',
          category: 'Feedback',
          description: 'Modal confirmation dialog for user actions',
          icon: 'mdi-help-circle-outline'
        },
        {
          name: 'ErrorDialog',
          type: 'vue',
          fileName: 'ErrorDialog.vue',
          category: 'Feedback',
          description: 'Modal dialog for displaying error messages',
          icon: 'mdi-alert-circle-outline'
        },
        {
          name: 'PaginationControl',
          type: 'vue',
          fileName: 'PaginationControl.vue',
          category: 'Navigation',
          description: 'Comprehensive pagination component with page size options',
          icon: 'mdi-page-next'
        },
        {
          name: 'CIBHeaderFlow',
          type: 'vue',
          fileName: 'CIBHeaderFlow.vue',
          category: 'Navigation',
          description: 'Application header with language switcher and user menu',
          icon: 'mdi-page-layout-header'
        },
        {
          name: 'CIBForm',
          type: 'vue',
          fileName: 'CIBForm.vue',
          category: 'Forms',
          description: 'Form wrapper component following CIB design patterns',
          icon: 'mdi-form-select'
        },
        {
          name: 'ContentBlock',
          type: 'vue',
          fileName: 'ContentBlock.vue',
          category: 'Layout',
          description: 'Reusable content block with consistent styling',
          icon: 'mdi-card-outline'
        },
        {
          name: 'CopyableActionButton',
          type: 'vue',
          fileName: 'CopyableActionButton.vue',
          category: 'Actions',
          description: 'Button with copy-to-clipboard functionality and navigation support',
          icon: 'mdi-content-copy'
        },
        {
          name: 'GenericTabs',
          type: 'vue',
          fileName: 'GenericTabs.vue',
          category: 'Navigation',
          description: 'Generic tab navigation component',
          icon: 'mdi-tab'
        },
        {
          name: 'HighlightedText',
          type: 'vue',
          fileName: 'HighlightedText.vue',
          category: 'Display',
          description: 'Text component with search term highlighting',
          icon: 'mdi-marker'
        },
        {
          name: 'PagedScrollableContent',
          type: 'vue',
          fileName: 'PagedScrollableContent.vue',
          category: 'Layout',
          description: 'Scrollable content container with pagination support',
          icon: 'mdi-view-list'
        },
        {
          name: 'SidebarsFlow',
          type: 'vue',
          fileName: 'SidebarsFlow.vue',
          category: 'Layout',
          description: 'Alternative sidebar layout component',
          icon: 'mdi-page-layout-sidebar-right'
        },
        {
          name: 'SuccessAlert',
          type: 'vue',
          fileName: 'SuccessAlert.vue',
          category: 'Feedback',
          description: 'Success message alert component',
          icon: 'mdi-check-circle-outline'
        },
        {
          name: 'TaskList',
          type: 'vue',
          fileName: 'TaskList.vue',
          category: 'Display',
          description: 'Component for displaying lists of tasks or items',
          icon: 'mdi-format-list-checks'
        },
        {
          name: 'TaskPopper',
          type: 'vue',
          fileName: 'TaskPopper.vue',
          category: 'Overlays',
          description: 'Popover component for displaying task details',
          icon: 'mdi-message-text-outline'
        },
        {
          name: 'TranslationsDownload',
          type: 'vue',
          fileName: 'TranslationsDownload.vue',
          category: 'Utilities',
          description: 'Component for downloading translation files',
          icon: 'mdi-download'
        },
        {
          name: 'directives',
          type: 'js',
          fileName: 'directives.js',
          category: 'Utilities',
          description: 'Custom Vue directives for common functionality',
          icon: 'mdi-code-braces'
        }
      ]
    }
  },
  computed: { 
    filteredComponents: function() {
      if (!this.componentSearch.trim()) {
        return this.components
      }
      
      const search = this.componentSearch.toLowerCase()
      return this.components.filter(component => {
        return component.name.toLowerCase().includes(search) ||
               component.description.toLowerCase().includes(search) ||
               component.category.toLowerCase().includes(search)
      })
    },
    vueComponents: function() {
      return this.components.filter(comp => comp.type === 'vue')
    },
    jsComponents: function() {
      return this.components.filter(comp => comp.type === 'js')
    }
  },
  methods: {
    getComponentRoute: function(componentName) {
      // Convert component names to kebab-case routes
      const routeMap = {
        'FlowTable': 'flow-table',
        'SidebarsDataFlow': 'sidebars-dataflow',
        'ConfirmDialog': 'confirm-dialog',
        'ErrorDialog': 'error-dialog',
        'PaginationControl': 'pagination-control',
        'CIBHeaderFlow': 'cib-header-flow',
        'CIBForm': 'cib-form',
        'ContentBlock': 'content-block',
        'CopyableActionButton': 'copyable-action-button',
        'GenericTabs': 'generic-tabs',
        'HighlightedText': 'highlighted-text',
        'PagedScrollableContent': 'paged-scrollable-content',
        'SidebarsFlow': 'sidebars-flow',
        'SuccessAlert': 'success-alert',
        'TaskList': 'task-list',
        'TaskPopper': 'task-popper',
        'TranslationsDownload': 'translations-download',
        'directives': 'directives'
      }
      return routeMap[componentName] || componentName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')
    },
    clearSearch: function() {
      this.componentSearch = ''
    }
  }
}
</script>

<style scoped>
@import '@mdi/font/css/materialdesignicons.min.css';

/* Component navigation styling */
.components-navbar {
  background: #f8f9fa;
}

.list-group-item.active {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
}

.list-group-item.active .badge {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: white;
}

/* Tab styling */
.nav-tabs .nav-link {
  border: 1px solid transparent;
  border-radius: 0.375rem 0.375rem 0 0;
}

.nav-tabs .nav-link.active {
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
  color: #0d6efd;
}

.nav-tabs .nav-link:hover {
  border-color: #e9ecef #e9ecef #dee2e6;
  isolation: isolate;
}

/* Code styling */
pre {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  padding: 1rem;
  font-size: 0.875rem;
  overflow-x: auto;
}

code {
  color: #d63384;
  background-color: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

pre code {
  color: #212529;
  background-color: transparent;
  padding: 0;
}

/* Badge styling */
.badge {
  font-size: 0.75em;
}

/* Table styling */
.table th {
  background-color: #f8f9fa;
  font-weight: 600;
  border-top: none;
}

/* Welcome message styling */
.mdi-48px {
  font-size: 48px;
}

/* Icon sizes */
.mdi-18px {
  font-size: 18px;
}

.mdi-16px {
  font-size: 16px;
}

.mdi-24px {
  font-size: 24px;
}

/* Smooth transitions */
.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Search input styling */
.form-control:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}
</style>