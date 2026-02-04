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
      icon="mdi-help-circle-outline"
      component-name="ConfirmDialog"
      description="Modal confirmation dialog for user actions"
      category="Feedback"
      file-name="ConfirmDialog.vue"
    />

    <!-- Tab Content -->
    <div class="tab-content overflow-auto" style="max-height: calc(95vh - 300px);">
      <!-- Overview Tab -->
      <div v-show="activeTab === 'overview'" >
        <div class="row">
          <div class="col-12">
            <h4>Purpose</h4>
            <p>ConfirmDialog provides a reusable confirmation modal for critical user actions, ensuring users confirm their intentions before proceeding with potentially destructive operations.</p>

            <h4>Use Cases</h4>
            <ul>
              <li>Confirm deletion of items</li>
              <li>Confirm navigation away from unsaved forms</li>
              <li>Confirm critical actions with potential side effects</li>
              <li>Display custom confirmation messages with parameters</li>
            </ul>

            <h4>Integration</h4>
            <div class="bg-light p-3 rounded">
              <h6>Import Statement:</h6>
              <pre><code>import ConfirmDialog from './components/common/ConfirmDialog.vue'</code></pre>

              <h6 class="mt-3">Component Registration:</h6>
              <pre><code>components: {
  ConfirmDialog
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Props Tab -->
      <div v-show="activeTab === 'props'" >
        <div v-if="componentData.props && componentData.props.length > 0">
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
        <div v-else class="text-center py-5 text-muted">
          No props defined for this component
        </div>
      </div>

      <!-- Events Tab -->
      <div v-show="activeTab === 'events'" >
        <div v-if="componentData.events && componentData.events.length > 0">
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
        <div v-else class="text-center py-5 text-muted">
          No events defined for this component
        </div>
      </div>

      <!-- Slots Tab -->
      <div v-show="activeTab === 'slots'" >
        <div v-if="componentData.slots && componentData.slots.length > 0">
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
        <div v-else class="text-center py-5 text-muted">
          No slots defined for this component
        </div>
      </div>

      <!-- Examples Tab -->
      <div v-show="activeTab === 'examples'" >
        <div v-if="componentData.examples && componentData.examples.length > 0">
          <div v-for="(example, index) in componentData.examples" :key="index" class="mb-4">
            <h5>{{ example.title }}</h5>
            <p class="text-muted">{{ example.description }}</p>
            <div class="bg-light p-3 rounded">
              <pre><code>{{ example.code }}</code></pre>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-5 text-muted">
          No examples available for this component
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentPageHeader from '../ComponentPageHeader.vue'

export default {
  name: 'ConfirmDialogComponentPage',
  components: {
    ComponentPageHeader
  },
  data() {
    return {
      activeTab: 'overview',
      componentData: {
        props: [
          { name: 'okTitle', type: 'String', default: 'undefined', required: false, description: 'Custom text for the OK button' }
        ],
        events: [
          { name: 'ok', parameters: 'param', description: 'Emitted when user confirms the action, passes the parameter from show() method' }
        ],
        slots: [
          { name: 'default', scopedProps: 'param', description: 'Custom confirmation message content, receives param from show() method' }
        ],
        examples: [
          {
            title: 'Basic Confirmation',
            description: 'Simple confirmation dialog with custom message',
            code: '<ConfirmDialog ref="confirmDialog" @ok="handleConfirm">\n' +
                  '  <template #default="{ param }">\n' +
                  '    Are you sure you want to delete "{{ param.name }}"?\n' +
                  '  </template>\n' +
                  '</ConfirmDialog>\n\n' +
                  '<!-- Show dialog -->\n' +
                  '<script>\n' +
                  'this.$refs.confirmDialog.show({ name: \'Document.pdf\' })\n' +
                  '</' + 'script>\n'
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