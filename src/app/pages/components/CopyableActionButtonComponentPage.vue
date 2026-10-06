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
            <p>CopyableActionButton combines clickable actions with copy-to-clipboard functionality, supporting both navigation and data copying in a single component. It dynamically renders as a button, router-link, or anchor tag based on configuration, and shows a copy icon on hover or keyboard focus. After the copy icon is activated it turns into a check mark for near two seconds and a screen-reader announcement (<code>commons.copied</code>) is made.</p>

            <h4>Use Cases</h4>
            <ul>
              <li>Copy values to clipboard on hover with visual feedback</li>
              <li>Navigate to routes while allowing copying of displayed content</li>
              <li>Display truncated values with full-text copy functionality</li>
              <li>Create clickable items with dual copy and action capabilities</li>
              <li>Open external links in new tabs while providing copy functionality</li>
              <li>Non-clickable text elements with copy-to-clipboard feature</li>
              <li>Copy technical identifiers (process instance IDs, task IDs, correlation keys) from table cells without opening the detail view</li>
              <li>Show a human-readable label while copying a machine-readable value (e.g. a user name that copies the user ID)</li>
              <li>Copy a shareable deep link that differs from the navigation target</li>
              <li>Open an internal route in a new tab using a route location object</li>
              <li>Provide a custom tooltip describing what will be copied</li>
              <li>Render lists of copyable values with <code>v-for</code> (tags, keys, references)</li>
              <li>Copy values via the browser Clipboard API with a fallback for unsupported contexts</li>
              <li>Safely render optional data: nothing is rendered when there is no value to display or copy</li>
              <li>Pass native attributes such as <code>target</code>, <code>class</code> or <code>data-*</code>; they are applied to the inner button, link or text element</li>
              <li>Toggle <code>clickable</code> dynamically (e.g. only downloadable values are actions)</li>
              <li>Render a list of clickable items, each with its own action and copy value</li>
              <li>Use inside a <code>&lt;form&gt;</code> without submitting it when copying</li>
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
                <td>Emitted when copy action is triggered, passes the value that should be copied. The component does not write to the clipboard itself, so the parent must do that. The check mark feedback is shown whenever this event is emitted</td>
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
          <h5>Identifier in a Table Cell</h5>
          <p class="text-muted">Truncated technical ID that links to a detail view and copies the full ID</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;td v-for="instance in instances" :key="instance.id"&gt;
  &lt;CopyableActionButton
    :display-value="instance.id"
    :to="{ name: 'TaskListComponent', params: { id: instance.id } }"
    @copy="handleCopy"
  /&gt;
&lt;/td&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <table class="table table-sm table-bordered" style="width: 360px;">
              <thead>
                <tr>
                  <th>Instance ID</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="instance in instances" :key="instance.id">
                  <td style="max-width: 200px;">
                    <CopyableActionButton
                      :display-value="instance.id"
                      :to="{ name: 'TaskListComponent' }"
                      @copy="handleCopy"
                    />
                  </td>
                  <td>{{ instance.state }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="mb-4">
          <h5>Label with Different Copy Value</h5>
          <p class="text-muted">Show a readable name, copy the underlying user ID</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CopyableActionButton
  display-value="John Doe"
  copy-value="user-7f3a9c12"
  title="Copy user ID"
  @click="handleEmailClick"
  @copy="handleCopy"
/&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-0 rounded" style="width: 150px;">
              <CopyableActionButton
                display-value="John Doe"
                copy-value="user-7f3a9c12"
                title="Copy user ID"
                @click="handleEmailClick"
                @copy="handleCopy"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>Shareable Deep Link</h5>
          <p class="text-muted">Navigate within the app, but copy the absolute URL to share with colleagues</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CopyableActionButton
  display-value="Open task list"
  :copy-value="profileUrl"
  :to="{ name: 'TaskListComponent' }"
  title="Open task list (copy link to share)"
  @copy="handleCopy"
/&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-0 rounded" style="width: 150px;">
              <CopyableActionButton
                display-value="Open task list"
                :copy-value="profileUrl"
                :to="{ name: 'TaskListComponent' }"
                title="Open task list (copy link to share)"
                @copy="handleCopy"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>Internal Route in New Tab</h5>
          <p class="text-muted">Route location object opened in a new browser tab</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CopyableActionButton
  display-value="Task list (new tab)"
  :to="{ name: 'TaskListComponent' }"
  :new-tab="true"
  @copy="handleCopy"
/&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-0 rounded" style="width: 150px;">
              <CopyableActionButton
                display-value="Task list (new tab)"
                :to="{ name: 'TaskListComponent' }"
                :new-tab="true"
                @copy="handleCopy"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>List of Copyable Values</h5>
          <p class="text-muted">Render several copyable references with <code>v-for</code></p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;ul class="list-unstyled"&gt;
  &lt;li v-for="key in businessKeys" :key="key"&gt;
    &lt;CopyableActionButton
      :display-value="key"
      :clickable="false"
      @copy="handleCopy"
    /&gt;
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <ul class="list-unstyled border p-2 rounded mb-0" style="width: 200px;">
              <li v-for="key in businessKeys" :key="key">
                <CopyableActionButton
                  :display-value="key"
                  :clickable="false"
                  @copy="handleCopy"
                />
              </li>
            </ul>
          </div>
        </div>

        <div class="mb-4">
          <h5>Optional Value (Renders Nothing)</h5>
          <p class="text-muted">When both <code>displayValue</code> and <code>copyValue</code> are empty the component renders no markup, so no <code>v-if</code> is needed in the parent</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CopyableActionButton
  :display-value="instance.businessKey"
  :clickable="false"
  @copy="handleCopy"
/&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example (businessKey is empty):</h6>
            <div class="border p-2 rounded" style="width: 150px; min-height: 2.5rem;">
              <CopyableActionButton
                :display-value="emptyValue"
                :clickable="false"
                @copy="handleCopy"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>Writing to the Clipboard</h5>
          <p class="text-muted">The component only emits <code>copy</code>; the parent decides how to write to the clipboard and what feedback to show</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CopyableActionButton
  display-value="process-def-2:42:abc"
  :clickable="false"
  @copy="writeToClipboard"
/&gt;

methods: {
  async writeToClipboard(value) {
    try {
      await navigator.clipboard.writeText(value)
      this.copyMessage = `Copied: ${value}`
    } catch {
      this.copyMessage = 'Copy failed: clipboard not available'
    }
    setTimeout(() =&gt; { this.copyMessage = '' }, 2000)
  }
}</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-0 rounded" style="width: 200px;">
              <CopyableActionButton
                display-value="process-def-2:42:abc"
                :clickable="false"
                @copy="writeToClipboard"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>Passing Attributes (target, class, data-*)</h5>
          <p class="text-muted">Undeclared attributes are applied to the inner button, link or text element, not to the hover wrapper. <code>target="_blank"</code> on a route link opens the route in a new tab</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CopyableActionButton
  display-value="Definition (target=_blank)"
  :to="{ name: 'TaskListComponent' }"
  target="_blank"
  data-testid="definition-link"
  @copy="handleCopy"
/&gt;

&lt;CopyableActionButton
  display-value="With extra padding"
  :clickable="false"
  class="pt-2 fw-bold"
  @copy="handleCopy"
/&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-0 rounded mb-2" style="width: 200px;">
              <CopyableActionButton
                display-value="Definition (target=_blank)"
                :to="{ name: 'TaskListComponent' }"
                target="_blank"
                data-testid="definition-link"
                @copy="handleCopy"
              />
            </div>
            <div class="border p-0 rounded" style="width: 200px;">
              <CopyableActionButton
                display-value="With extra padding"
                :clickable="false"
                class="pt-2 fw-bold"
                @copy="handleCopy"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>Conditionally Clickable</h5>
          <p class="text-muted">Bind <code>clickable</code> to a condition, for example only downloadable values trigger an action; everything stays copyable</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CopyableActionButton
  :display-value="variable.name"
  :clickable="variable.downloadable"
  :title="variable.name"
  class="w-100 text-start"
  @click="download(variable)"
  @copy="handleCopy"
/&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="form-check form-switch mb-2">
              <input id="downloadable-switch" v-model="downloadable" class="form-check-input" type="checkbox">
              <label class="form-check-label" for="downloadable-switch">downloadable</label>
            </div>
            <div class="border p-0 rounded" style="width: 200px;">
              <CopyableActionButton
                display-value="report-2026.pdf"
                :clickable="downloadable"
                title="report-2026.pdf"
                class="w-100 text-start"
                @click="handleDownload"
                @copy="handleCopy"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>List of Clickable Actions</h5>
          <p class="text-muted">Several clickable items in one cell, each with its own action</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;div class="w-100"&gt;
  &lt;CopyableActionButton
    v-for="(act, index) in activities" :key="index"
    :display-value="act.activityName"
    :title="act.activityName"
    @click="selectActivity(act)"
    @copy="handleCopy"
  /&gt;
&lt;/div&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-0 rounded" style="width: 200px;">
              <div class="w-100">
                <CopyableActionButton
                  v-for="(act, index) in activities"
                  :key="index"
                  :display-value="act.activityName"
                  :title="act.activityName"
                  @click="handleActivityClick(act)"
                  @copy="handleCopy"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>Multi-line Tooltip</h5>
          <p class="text-muted">A custom <code>title</code> can describe the value with a label and a line break</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CopyableActionButton
  :display-value="instanceId"
  :title="'Called process instance:\n' + instanceId"
  :to="{ name: 'TaskListComponent' }"
  @copy="handleCopy"
/&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <div class="border p-0 rounded" style="width: 200px;">
              <CopyableActionButton
                :display-value="instances[0].id"
                :title="'Called process instance:\n' + instances[0].id"
                :to="{ name: 'TaskListComponent' }"
                @copy="handleCopy"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h5>Inside a Form</h5>
          <p class="text-muted">The copy button has <code>type="button"</code>, so using it never submits the surrounding form</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;form @submit.prevent="formMessage = 'Form submitted'"&gt;
  &lt;CopyableActionButton
    display-value="form-field-value"
    :clickable="false"
    @copy="handleCopy"
  /&gt;
  &lt;button type="submit" class="btn btn-primary btn-sm mt-2"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>
          </div>
          <div class="mt-3">
            <h6>Live Example:</h6>
            <form class="border p-2 rounded" style="width: 200px;" @submit.prevent="formMessage = 'Form submitted'">
              <CopyableActionButton
                display-value="form-field-value"
                :clickable="false"
                @copy="handleCopy"
              />
              <button type="submit" class="btn btn-primary btn-sm mt-2">Submit</button>
            </form>
            <div v-if="formMessage" class="text-muted small mt-1">{{ formMessage }}</div>
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
      profileUrl: 'https://myapp.com/profiles/123',
      emptyValue: '',
      downloadable: true,
      formMessage: '',
      activities: [
        { activityId: 'approve', activityName: 'Approve invoice' },
        { activityId: 'review', activityName: 'Review order' }
      ],
      instances: [
        { id: '3f2b1c9e-8a47-4d1e-b6a2-91c0e5d7f401', state: 'ACTIVE' },
        { id: '9a7d4e21-5c3b-4f08-8e6d-2b1a7c9d3e55', state: 'COMPLETED' },
        { id: 'c41e8b70-2d96-4a3f-b0c5-6e7f1a2d9b38', state: 'SUSPENDED' }
      ],
      businessKeys: ['ORDER-2026-0001', 'ORDER-2026-0002', 'INVOICE-88412']
    }
  },
  methods: {
    async writeToClipboard(value) {
      try {
        await navigator.clipboard.writeText(value)
        this.handleCopy(value)
      } catch {
        this.copyMessage = 'Copy failed: clipboard not available'
        setTimeout(() => {
          this.copyMessage = ''
        }, 2000)
      }
    },
    handleDownload() {
      alert('Download started')
    },
    handleActivityClick(activity) {
      alert('Activity selected: ' + activity.activityId)
    },
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
