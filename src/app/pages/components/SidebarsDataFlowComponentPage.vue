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
    <ComponentPageHeader
      v-model:active-tab="activeTab"
      icon="mdi-page-layout-sidebar-left"
      component-name="SidebarsDataFlow"
      description="Layout with data-driven sidebars"
      category="Layout"
      file-name="SidebarsDataFlow.vue"
    />

    <!-- Tab Content -->
    <div class="tab-content overflow-auto" style="max-height: calc(95vh - 300px);">
      <!-- Overview Tab -->
      <div v-show="activeTab === 'overview'">
        <div class="row">
          <div class="col-12">
            <h4>Purpose</h4>
            <p>SidebarsDataFlow provides a flexible layout with collapsible left and right sidebars, perfect for creating dashboard-style interfaces with navigation panels and detail views.</p>

            <h4>Use Cases</h4>
            <ul>
              <li>Dashboard layouts with navigation sidebar</li>
              <li>Master-detail views with collapsible panels</li>
              <li>Three-column layouts with optional sidebars</li>
              <li>Responsive layouts that hide sidebars on mobile</li>
            </ul>

            <h4>Integration</h4>
            <div class="bg-light p-3 rounded">
              <h6>Import Statement:</h6>
              <pre><code>import SidebarsDataFlow from './components/common/SidebarsDataFlow.vue'</code></pre>

              <h6 class="mt-3">Component Registration:</h6>
              <pre><code>components: {
  SidebarsDataFlow
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Props Tab -->
      <div v-show="activeTab === 'props'">
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
      <div v-show="activeTab === 'events'">
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
      <div v-show="activeTab === 'slots'">
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
      <div v-show="activeTab === 'examples'">
        <div v-for="(example, index) in componentData.examples" :key="index" class="mb-4">
          <h5>{{ example.title }}</h5>
          <p class="text-muted">{{ example.description }}</p>
          <div class="bg-light p-3 rounded">
            <pre><code>{{ example.code }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentPageHeader from '../ComponentPageHeader.vue'

export default {
  name: 'SidebarsDataFlowComponentPage',
  components: {
    ComponentPageHeader
  },
  data() {
    return {
      activeTab: 'overview',
      componentData: {
        props: [
          { name: 'leftOpen', type: 'Boolean', default: 'undefined', required: false, description: 'Controls left sidebar visibility (v-model:left-open)' },
          { name: 'rightOpen', type: 'Boolean', default: 'undefined', required: false, description: 'Controls right sidebar visibility (v-model:right-open)' },
          { name: 'leftCaption', type: 'String', default: 'undefined', required: false, description: 'Caption text for left sidebar toggle button' },
          { name: 'rightCaption', type: 'String', default: 'undefined', required: false, description: 'Caption text for right sidebar toggle button' },
          { name: 'leftSize', type: 'Array', default: '[12, 6, 4, 3, 3]', required: false, description: 'Bootstrap column sizes for left sidebar across breakpoints' },
          { name: 'rightSize', type: 'Array', default: '[12, 6, 4, 3, 3]', required: false, description: 'Bootstrap column sizes for right sidebar across breakpoints' }
        ],
        events: [
          { name: 'update:leftOpen', parameters: 'boolean', description: 'Emitted when left sidebar visibility changes' },
          { name: 'update:rightOpen', parameters: 'boolean', description: 'Emitted when right sidebar visibility changes' }
        ],
        slots: [
          { name: 'default', scopedProps: 'none', description: 'Main content area between sidebars' },
          { name: 'left', scopedProps: 'none', description: 'Left sidebar content' },
          { name: 'right', scopedProps: 'none', description: 'Right sidebar content' }
        ],
        examples: [
          {
            title: 'Basic Layout',
            description: 'Simple layout with left navigation and main content',
            code: `<SidebarsDataFlow
  v-model:left-open="showSidebar"
  left-caption="Navigation">
  <template #left>
    <!-- Navigation content -->
  </template>

  <!-- Main content -->
  <div>Main content area</div>
</SidebarsDataFlow>`
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
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
  color: #b02a67;
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