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
      icon="mdi-content-copy"
      component-name="CopyableActionButton"
      description="Button with copy-to-clipboard functionality and navigation support"
      category="Actions"
      file-name="CopyableActionButton.vue"
    />

    <!-- Tab Content -->
    <div class="tab-content overflow-auto" style="max-height: calc(95vh - 300px);">
      <!-- Overview Tab -->
      <div v-show="activeTab === 'overview'" class="tab-pane" :class="{ 'active show': activeTab === 'overview' }">
        <div class="row">
          <div class="col-12">
            <h4>Purpose</h4>
            <p>CopyableActionButton combines clickable actions with copy-to-clipboard functionality, supporting both navigation and data copying in a single component. It dynamically renders as a button, router-link, or anchor tag based on configuration, and shows a copy icon on hover.</p>

            <h4>Use Cases</h4>
            <ul>
              <li>Copy values to clipboard on hover with visual feedback</li>
              <li>Navigate to routes while allowing copying of displayed content</li>
              <li>Display truncated values with full-text copy functionality</li>
              <li>Create clickable items with dual copy and action capabilities</li>
              <li>Open external links in new tabs while providing copy functionality</li>
              <li>Non-clickable text elements with copy-to-clipboard feature</li>
            </ul>

            <h4>Integration</h4>
            <div class="bg-light p-3 rounded">
              <h6>Import Statement:</h6>
              <pre><code>import CopyableActionButton from './components/common/CopyableActionButton.vue'</code></pre>

              <h6 class="mt-3">Component Registration:</h6>
              <pre><code>components: {
  CopyableActionButton
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
                <td><code>displayValue</code></td>
                <td><span class="badge bg-info">String</span></td>
                <td><code>''</code></td>
                <td><span class="badge bg-success">No</span></td>
                <td>The text value to display in the button/element</td>
              </tr>
              <tr>
                <td><code>copyValue</code></td>
                <td><span class="badge bg-info">String</span></td>
                <td><code>null</code></td>
                <td><span class="badge bg-success">No</span></td>
                <td>The value to copy to clipboard (defaults to displayValue if not provided)</td>
              </tr>
              <tr>
                <td><code>title</code></td>
                <td><span class="badge bg-info">String</span></td>
                <td><code>null</code></td>
                <td><span class="badge bg-success">No</span></td>
                <td>Custom title attribute (defaults to displayValue if not provided)</td>
              </tr>
              <tr>
                <td><code>clickable</code></td>
                <td><span class="badge bg-info">Boolean</span></td>
                <td><code>true</code></td>
                <td><span class="badge bg-success">No</span></td>
                <td>Whether the component should be clickable (button) or just text with copy</td>
              </tr>
              <tr>
                <td><code>to</code></td>
                <td><span class="badge bg-info">[String, Object]</span></td>
                <td><code>null</code></td>
                <td><span class="badge bg-success">No</span></td>
                <td>Router link destination - can be string, object, or route location</td>
              </tr>
              <tr>
                <td><code>newTab</code></td>
                <td><span class="badge bg-info">Boolean</span></td>
                <td><code>false</code></td>
                <td><span class="badge bg-success">No</span></td>
                <td>Whether to open the link in a new tab (creates anchor tag instead of router-link)</td>
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
                <td><code>@click</code></td>
                <td><code>event</code></td>
                <td>Emitted when button is clicked (only for non-router links and clickable elements)</td>
              </tr>
              <tr>
                <td><code>@copy</code></td>
                <td><code>value</code></td>
                <td>Emitted when copy action is triggered, passes the value that should be copied</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Slots Tab -->
      <div v-show="activeTab === 'slots'" class="tab-pane" :class="{ 'active show': activeTab === 'slots' }">
        <div class="text-center py-5 text-muted">
          This component does not define any slots. Content is provided via the displayValue prop.
        </div>
      </div>

      <!-- Examples Tab -->
      <div v-show="activeTab === 'examples'" class="tab-pane" :class="{ 'active show': activeTab === 'examples' }">
        <div class="alert alert-success" v-if="copyMessage">
          {{ copyMessage }}
        </div>
        <div class="mb-4">
          <h5>Basic Copyable Button</h5>
          <p class="text-muted">Simple clickable button with copy-to-clipboard functionality</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CopyableActionButton
  display-value="john.doe@example.com"
  @click="handleEmailClick"
  @copy="handleCopy"
/&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-0 rounded" style="width: 150px;">
              <CopyableActionButton
                display-value="john.doe@example.com"
                @click="handleEmailClick"
                @copy="handleCopy"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>Navigation Link with Copy</h5>
          <p class="text-muted">Router link that also allows copying of the displayed value</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CopyableActionButton
  display-value="TaskListComponent view"
  copy-value="TaskListComponent copy value"
  :to="{ name: 'TaskListComponent' }"
  @copy="handleCopy"
/&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-0 rounded" style="width: 150px;">
              <CopyableActionButton
                display-value="TaskListComponent view"
                copy-value="TaskListComponent copy value"
                :to="{ name: 'TaskListComponent' }"
                @copy="handleCopy"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>External Link in New Tab</h5>
          <p class="text-muted">External link that opens in new tab with copy functionality</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CopyableActionButton
  display-value="Visit Documentation"
  copy-value="https://docs.example.com/api/v1"
  to="https://docs.example.com/api/v1"
  :new-tab="true"
  @copy="handleCopy"
/&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-0 rounded" style="width: 150px;">
              <CopyableActionButton
                display-value="Visit Documentation"
                copy-value="https://docs.example.com/api/v1"
                to="https://docs.example.com/api/v1"
                :new-tab="true"
                @copy="handleCopy"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>Non-clickable Copy Element</h5>
          <p class="text-muted">Text element with copy functionality but no click action</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CopyableActionButton
  display-value="ABCDE"
  copy-value="12345"
  :clickable="false"
  title="API Key (click to copy full key)"
  @copy="handleCopy"
/&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-0 rounded" style="width: 150px;">
              <CopyableActionButton
                display-value="ABCDE"
                copy-value="12345"
                :clickable="false"
                title="API Key (click to copy full key)"
                @copy="handleCopy"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>Truncated Value with Full Copy</h5>
          <p class="text-muted">Display truncated text but copy the full value</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CopyableActionButton
  display-value="Very Long File Name That Gets..."
  copy-value="Very Long File Name That Gets Truncated In The Display But Can Be Copied In Full.pdf"
  :clickable="false"
  @copy="handleCopy"
/&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-0 rounded" style="width: 150px;">
              <CopyableActionButton
                display-value="Very Long File Name That Gets..."
                copy-value="Very Long File Name That Gets Truncated In The Display But Can Be Copied In Full.pdf"
                :clickable="false"
                @copy="handleCopy"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>Complete Implementation Example</h5>
          <p class="text-muted">Vue component with event handlers and copy functionality</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;div class="mb-3"&gt;
      &lt;label&gt;User Email:&lt;/label&gt;
      &lt;CopyableActionButton
        :display-value="user.email"
        @click="openEmailClient"
        @copy="copyToClipboard"
      /&gt;
    &lt;/div&gt;

    &lt;div class="mb-3"&gt;
      &lt;label&gt;Profile URL:&lt;/label&gt;
      &lt;CopyableActionButton
        display-value="View Profile"
        :copy-value="profileUrl"
        :to="{ name: 'Profile', params: { id: user.id } }"
        @copy="copyToClipboard"
      /&gt;
    &lt;/div&gt;

    &lt;div class="alert alert-success" v-if="copyMessage"&gt;
      &#123;&#123; copyMessage &#125;&#125;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      user: {
        id: 123,
        email: 'john.doe@example.com'
      },
      copyMessage: '',
      profileUrl: 'https://myapp.com/profiles/123'
    }
  },
  methods: {
    copyToClipboard(value) {
      navigator.clipboard.writeText(value).then(() =&gt; {
        this.copyMessage = `Copied: ${value}`
        setTimeout(() =&gt; {
          this.copyMessage = ''
        }, 2000)
      })
    },
    openEmailClient() {
      globalThis.open(`mailto:${this.user.email}`)
    }
  }
}
&lt;/script&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CopyableActionButton from '../../../components/common/CopyableActionButton.vue'
import ComponentPageHeader from '../ComponentPageHeader.vue'

export default {
  name: 'CopyableActionButtonComponentPage',
  components: {
    CopyableActionButton,
    ComponentPageHeader
  },
  data() {
    return {
      activeTab: 'overview',
      user: {
        id: 123,
        email: 'john.doe@example.com'
      },
      copyMessage: '',
      profileUrl: 'https://myapp.com/profiles/123'
    }
  },
  methods: {
    handleEmailClick() {
      alert('Email clicked: ' + this.user.email)
    },
    handleCopy(value) {
      this.copyMessage = `Copied: ${value}`
      setTimeout(() => {
        this.copyMessage = ''
      }, 2000)
    },
    copyToClipboard(value) {
      this.copyMessage = `Copied: ${value}`
      setTimeout(() => {
        this.copyMessage = ''
      }, 2000)
    },
    openEmailClient() {
      globalThis.open(`mailto:${this.user.email}`)
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

/* Smooth transitions */
.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
