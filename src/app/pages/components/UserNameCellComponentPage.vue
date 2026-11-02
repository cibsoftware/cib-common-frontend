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
      icon="mdi-account"
      component-name="UserNameCell"
      description="Table cell showing a user name with an account icon and copy-to-clipboard support"
      category="Text"
      file-name="UserNameCell.vue"
    />

    <!-- Tab Content -->
    <div class="tab-content overflow-auto" style="max-height: calc(95vh - 300px);">
      <!-- Overview Tab -->
      <div v-show="activeTab === 'overview'" class="tab-pane" :class="{ 'active show': activeTab === 'overview' }">
        <div class="row">
          <div class="col-12">
            <h4>Purpose</h4>
            <p>UserNameCell is the shared way to show a user name in a table cell across all webclients. It renders a leading person icon followed by the name, like the "Modified by" column in the modeler. On hover or keyboard focus it offers a copy button, the same way <code>CopyableActionButton</code> does, and emits <code>copy</code> with the plain user name so the consumer can write it to the clipboard and show its <code>SuccessAlert</code>.</p>

            <h4>Use Cases</h4>
            <ul>
              <li>Show user names in table columns such as <code>startUserId</code>, <code>assignee</code>, <code>owner</code> or <code>userId</code></li>
              <li>Give every app the same look for user names, so they are recognisable at a glance</li>
              <li>Copy the plain user name from a table row without opening the detail view</li>
              <li>Truncate long names with an ellipsis while the full name stays available as tooltip</li>
              <li>Safely render optional data: nothing is rendered when <code>name</code> is empty, so no <code>v-if</code> is needed in the parent</li>
              <li>Combine with existing cell actions (e.g. claim or change assignee); only the display of the name changes</li>
            </ul>

            <h4>Behaviour</h4>
            <ul>
              <li>The component is based on <code>CopyableActionButton</code> internally</li>
              <li>The <code>mdi mdi-account</code> icon is decorative and hidden from screen readers (<code>aria-hidden="true"</code>)</li>
              <li>The name is truncated with an ellipsis; the full name is shown as <code>title</code></li>
              <li>The copy button appears on hover and on keyboard focus and can be reached with <kbd>Tab</kbd></li>
              <li>After copying, a check mark is shown briefly and announced to screen readers</li>
              <li>The component does not write to the clipboard itself; the parent handles the <code>copy</code> event</li>
              <li>Attributes such as <code>class</code> or <code>data-testid</code> are passed through <code>CopyableActionButton</code> to the inner text element, not to the outer wrapper</li>
            </ul>

            <h4>Integration</h4>
            <div class="bg-light p-3 rounded">
              <h6>Import Statement:</h6>
              <pre><code>import { UserNameCell } from '@cib/common-frontend'</code></pre>

              <h6 class="mt-3">Component Registration:</h6>
              <pre><code>components: {
  UserNameCell
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Props Tab -->
      <div v-show="activeTab === 'props'" class="tab-pane" :class="{ 'active show': activeTab === 'props' }">
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
              <tr>
                <td><code>name</code></td>
                <td><span class="badge bg-info">String</span></td>
                <td><code>''</code></td>
                <td><span class="badge bg-success">No</span></td>
                <td>The user name to display, show as tooltip and copy. When it is empty, the component renders nothing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Events Tab -->
      <div v-show="activeTab === 'events'" class="tab-pane" :class="{ 'active show': activeTab === 'events' }">
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
              <tr>
                <td><code>@copy</code></td>
                <td><code>name</code></td>
                <td>Emitted when the copy button is used, passes the plain user name. The component does not write to the clipboard itself, so the parent must do that (and can show its <code>SuccessAlert</code>). The check mark feedback is shown whenever this event is emitted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Slots Tab -->
      <div v-show="activeTab === 'slots'" class="tab-pane" :class="{ 'active show': activeTab === 'slots' }">
        <div class="text-center py-5 text-muted">
          This component does not define any slots. Content is provided via the name prop.
        </div>
      </div>

      <!-- Examples Tab -->
      <div v-show="activeTab === 'examples'" class="tab-pane" :class="{ 'active show': activeTab === 'examples' }">
        <div class="alert alert-success" v-if="copyMessage">
          {{ copyMessage }}
        </div>
        <div class="mb-4">
          <h5>Basic User Name</h5>
          <p class="text-muted">Person icon followed by the name; hover or focus the cell to copy the name</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;UserNameCell
  name="john.doe"
  @copy="handleCopy"
/&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-1 rounded" style="width: 200px;">
              <UserNameCell
                name="john.doe"
                @copy="handleCopy"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>User Column in a Table</h5>
          <p class="text-muted">Typical use in a "Modified by" or "Start user" column, rendered with <code>v-for</code></p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;tr v-for="file in files" :key="file.name"&gt;
  &lt;td&gt;&#123;&#123; file.name &#125;&#125;&lt;/td&gt;
  &lt;td&gt;
    &lt;UserNameCell :name="file.updatedBy" @copy="handleCopy" /&gt;
  &lt;/td&gt;
&lt;/tr&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <table class="table table-sm table-bordered" style="width: 400px; table-layout: fixed;">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Modified by</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="file in files" :key="file.name">
                  <td>{{ file.name }}</td>
                  <td>
                    <UserNameCell :name="file.updatedBy" @copy="handleCopy" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="mb-4">
          <h5>Long Name (Truncated)</h5>
          <p class="text-muted">Long names are cut off with an ellipsis; the full name is shown as tooltip and copied in full</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;UserNameCell
  name="maximilian.mustermann-schmidt@example.com"
  @copy="handleCopy"
/&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-1 rounded" style="width: 150px;">
              <UserNameCell
                name="maximilian.mustermann-schmidt@example.com"
                @copy="handleCopy"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>Empty Name (Renders Nothing)</h5>
          <p class="text-muted">When <code>name</code> is empty (e.g. an unassigned task) the component renders no markup, so no <code>v-if</code> is needed in the parent</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;UserNameCell
  :name="task.assignee"
  @copy="handleCopy"
/&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example (assignee is empty):</h6>
            <div class="border p-1 rounded" style="width: 150px; min-height: 2.5rem;">
              <UserNameCell
                :name="emptyValue"
                @copy="handleCopy"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>Cell with Existing Actions</h5>
          <p class="text-muted">Where a user cell already has actions, such as claiming a task, keep them next to the name; only the display of the name changes. In a flex container, wrap the cell in an element with <code>min-width: 0</code>, otherwise long names overflow instead of being truncated</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;td&gt;
  &lt;div class="d-flex align-items-center gap-1"&gt;
    &lt;div class="flex-grow-1" style="min-width: 0;"&gt;
      &lt;UserNameCell :name="task.assignee" @copy="handleCopy" /&gt;
    &lt;/div&gt;
    &lt;button v-if="!task.assignee" type="button" class="btn btn-sm btn-link p-0" @click="claim(task)"&gt;
      Claim
    &lt;/button&gt;
  &lt;/div&gt;
&lt;/td&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <table class="table table-sm table-bordered" style="width: 400px; table-layout: fixed;">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Assignee</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in tasks" :key="task.id">
                  <td>{{ task.name }}</td>
                  <td>
                    <div class="d-flex align-items-center gap-1">
                      <div class="flex-grow-1" style="min-width: 0;">
                        <UserNameCell :name="task.assignee" @copy="handleCopy" />
                      </div>
                      <button v-if="!task.assignee" type="button" class="btn btn-sm btn-link p-0" @click="claim(task)">
                        Claim
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="mb-4">
          <h5>Writing to the Clipboard</h5>
          <p class="text-muted">The component only emits <code>copy</code>; the parent decides how to write to the clipboard and what feedback to show</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;UserNameCell
  name="jane.smith"
  @copy="writeToClipboard"
/&gt;

methods: {
  async writeToClipboard(name) {
    try {
      await navigator.clipboard.writeText(name)
      this.copyMessage = `Copied: ${name}`
    } catch {
      this.copyMessage = 'Copy failed: clipboard not available'
    }
    setTimeout(() =&gt; { this.copyMessage = '' }, 2000)
  }
}</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-1 rounded" style="width: 200px;">
              <UserNameCell
                name="jane.smith"
                @copy="writeToClipboard"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserNameCell from '../../../components/common/UserNameCell.vue'
import ComponentPageHeader from '../ComponentPageHeader.vue'

export default {
  name: 'UserNameCellComponentPage',
  components: {
    UserNameCell,
    ComponentPageHeader
  },
  data() {
    return {
      activeTab: 'overview',
      copyMessage: '',
      emptyValue: '',
      files: [
        { name: 'invoice.bpmn', updatedBy: 'john.doe' },
        { name: 'order-approval.dmn', updatedBy: 'jane.smith' },
        { name: 'onboarding.form', updatedBy: 'maximilian.mustermann-schmidt' }
      ],
      tasks: [
        { id: 'task-1', name: 'Approve invoice', assignee: 'john.doe' },
        { id: 'task-2', name: 'Review order', assignee: '' }
      ]
    }
  },
  methods: {
    async writeToClipboard(name) {
      try {
        await navigator.clipboard.writeText(name)
        this.handleCopy(name)
      } catch {
        this.copyMessage = 'Copy failed: clipboard not available'
        setTimeout(() => {
          this.copyMessage = ''
        }, 2000)
      }
    },
    handleCopy(name) {
      this.copyMessage = `Copied: ${name}`
      setTimeout(() => {
        this.copyMessage = ''
      }, 2000)
    },
    claim(task) {
      task.assignee = 'demo.user'
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

/* Smooth transitions */
.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
