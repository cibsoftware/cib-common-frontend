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
  <div class="component-page h-100">
    <!-- Component Documentation Header -->
    <div class="container border-bottom border-light pb-3 mb-4">
      <div class="row align-items-center">
        <div class="col-12">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <h2 class="mb-1 d-flex align-items-center">
                <span class="mdi mdi-24px me-2 mdi-table"></span>
                FlowTable
                <small class="badge ms-2 bg-success">Vue Component</small>
              </h2>
              <p class="text-muted mb-0">Advanced data table with sorting, filtering, pagination, and search</p>
            </div>
            <div class="text-end">
              <small class="text-muted d-block">Category: Data Display</small>
              <small class="text-muted d-block">File: FlowTable.vue</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'" href="#">
          <span class="mdi mdi-information-outline me-1"></span>Overview
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'props' }" @click="activeTab = 'props'" href="#">
          <span class="mdi mdi-cog-outline me-1"></span>Props
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'events' }" @click="activeTab = 'events'" href="#">
          <span class="mdi mdi-lightning-bolt-outline me-1"></span>Events
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'slots' }" @click="activeTab = 'slots'" href="#">
          <span class="mdi mdi-puzzle-outline me-1"></span>Slots
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'examples' }" @click="activeTab = 'examples'" href="#">
          <span class="mdi mdi-code-tags me-1"></span>Examples
        </a>
      </li>
    </ul>

    <!-- Tab Content -->
    <div class="tab-content overflow-auto" style="max-height: calc(95vh - 300px);">
      <!-- Overview Tab -->
      <div v-show="activeTab === 'overview'" >
        <div class="row">
          <div class="col-12">
            <h4>Purpose</h4>
            <p>FlowTable is a comprehensive data table component that provides advanced functionality for displaying tabular data with features like sorting, column selection, resizing, and custom cell rendering.</p>

            <h4>Use Cases</h4>
            <ul>
              <li>Display large datasets with pagination</li>
              <li>Sort and filter table data</li>
              <li>Allow users to select visible columns</li>
              <li>Resize table columns dynamically</li>
              <li>Custom cell rendering with slots</li>
            </ul>

            <h4>Integration</h4>
            <div class="bg-light p-3 rounded">
              <h6>Import Statement:</h6>
              <pre><code>import FlowTable from './components/common/FlowTable.vue'</code></pre>

              <h6 class="mt-3">Component Registration:</h6>
              <pre><code>components: {
  FlowTable
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Props Tab -->
      <div v-show="activeTab === 'props'" >
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prop in componentData.props" :key="prop.name">
                <td><code>{{ prop.name }}</code></td>
                <td><span class="badge bg-info">{{ prop.type }}</span></td>
                <td><code>{{ prop.default || 'undefined' }}</code></td>
                <td><span class="badge" :class="prop.required ? 'bg-danger' : 'bg-success'">{{ prop.required ? 'Yes' : 'No' }}</span></td>
                <td>{{ prop.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Events Tab -->
      <div v-show="activeTab === 'events'" >
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Parameters</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in componentData.events" :key="event.name">
                <td><code>@{{ event.name }}</code></td>
                <td><code>{{ event.parameters || 'none' }}</code></td>
                <td>{{ event.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Slots Tab -->
      <div v-show="activeTab === 'slots'" >
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Scoped Props</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="slot in componentData.slots" :key="slot.name">
                <td><code>{{ slot.name || 'default' }}</code></td>
                <td><code>{{ slot.scopedProps || 'none' }}</code></td>
                <td>{{ slot.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Examples Tab -->
      <div v-show="activeTab === 'examples'" >
        <div v-for="(example, index) in componentData.examples" :key="index" class="mb-4">
          <h5>{{ example.title }}</h5>
          <p class="text-muted">{{ example.description }}</p>
          <div class="bg-light p-3 rounded">
            <pre><code>{{ example.code }}</code></pre>
            <template v-if="index === 1">
              <div class="w-100">
                <FlowTable
                  class="w-100"
                  :resizable="true"
                  :nativeLayout="true"
                  :columns="['name', 'email', 'actions']"
                  :column-definitions="[
                    { key: 'name', label: 'Full Name', sortable: true },
                    { key: 'email', label: 'Email Address with long caption', sortable: true },
                    { key: 'phone', label: 'Phone Number' },
                    { key: 'actions', label: 'Action', disableToggle: true, sortable: false }
                  ]"
                  :column-selection="true"
                  :items="users"
                />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FlowTableComponentPage',
  data() {
    return {
      activeTab: 'overview',
      componentData: {
        props: [
          { name: 'items', type: 'Array', default: '[]', required: false, description: 'Array of data objects to display in the table' },
          { name: 'fields', type: 'Array', default: '[]', required: false, description: 'Complete columns definitions to be displayed (API-1)' },
          { name: 'columns', type: 'Array', default: '[]', required: false, description: 'Keys of columns to be displayed (API-2)' },
          { name: 'columnDefinitions', type: 'Array', default: '[]', required: false, description: 'Complete column definitions (API-2)' },
          { name: 'columnSelection', type: 'Boolean', default: 'true', required: false, description: 'Whether to show column selection controls' },
          { name: 'useCase', type: 'String', default: 'FlowTable', required: false, description: 'Use case identifier for localStorage column visibility settings' },
          { name: 'nativeLayout', type: 'Boolean', default: 'false', required: false, description: 'Use native table layout instead of flexbox' },
          { name: 'resizable', type: 'Boolean', default: 'false', required: false, description: 'Allow column resizing' },
          { name: 'striped', type: 'Boolean', default: 'false', required: false, description: 'Apply striped styling to table rows' },
          { name: 'sortBy', type: 'String', default: 'null', required: false, description: 'Initial sort column' },
          { name: 'sortDesc', type: 'Boolean', default: 'false', required: false, description: 'Initial sort direction (descending)' },
          { name: 'externalSort', type: 'Boolean', default: 'false', required: false, description: 'Handle sorting externally, emits external-sort event' }
        ],
        events: [
          { name: 'click', parameters: 'item', description: 'Emitted when a table row is clicked' },
          { name: 'mouseenter', parameters: 'item', description: 'Emitted when mouse enters a table row' },
          { name: 'mouseleave', parameters: 'item', description: 'Emitted when mouse leaves a table row' },
          { name: 'external-sort', parameters: '{ sortBy, sortDesc }', description: 'Emitted when external sorting is enabled and sort changes' }
        ],
        slots: [
          { name: 'header(key)', scopedProps: 'field', description: 'Custom header content for specific column' },
          { name: 'cell(key)', scopedProps: 'item, value, index', description: 'Custom cell content for specific column' }
        ],
        examples: [
          {
            title: 'Basic Table',
            description: 'Simple table with data and column definitions',
            code: `<FlowTable
  :items="tableData"
  :fields="[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role' }
  ]"
/>`
          },
          {
            title: 'Table with Column Selection',
            description: 'Table with user-selectable columns',
            code: `<FlowTable
  :columns="['name', 'email']"
  :column-definitions="[
    { key: 'name', label: 'Full Name', sortable: true },
    { key: 'email', label: 'Email Address', sortable: true },
    { key: 'phone', label: 'Phone Number' }
  ]"
  :column-selection="true"
  :items="users"
/>`
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
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

/* Icon sizes */
.mdi-24px {
  font-size: 24px;
}

/* Tab content styling */
.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

.tab-pane {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>