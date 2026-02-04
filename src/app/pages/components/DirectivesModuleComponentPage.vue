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
                <span class="mdi mdi-24px me-2 mdi-code-braces"></span>
                DirectivesModule
                <small class="badge ms-2 bg-info">JavaScript Module</small>
              </h2>
              <p class="text-muted mb-0">Custom Vue directives for common functionality</p>
            </div>
            <div class="text-end">
              <small class="text-muted d-block">Category: Utilities</small>
              <small class="text-muted d-block">File: directives.js</small>
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
        <a class="nav-link" :class="{ active: activeTab === 'directives' }" @click="activeTab = 'directives'" href="#">
          <span class="mdi mdi-code-braces me-1"></span>Directives
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'parameters' }" @click="activeTab = 'parameters'" href="#">
          <span class="mdi mdi-cog-outline me-1"></span>Parameters
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'usage' }" @click="activeTab = 'usage'" href="#">
          <span class="mdi mdi-information-variant me-1"></span>Usage
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
      <div v-show="activeTab === 'overview'" class="tab-pane">
        <div class="row">
          <div class="col-12">
            <h4>Purpose</h4>
            <p>Custom Vue directives that provide reusable DOM manipulation and interaction functionality across components. These directives enhance HTML elements with additional behavior for styling, text truncation, and user interactions.</p>

            <h4>Available Directives</h4>
            <ul>
              <li><strong>v-hover-style</strong> - Applies styles and CSS classes on mouseover/mouseleave events</li>
              <li><strong>v-block-truncate</strong> - Automatically truncates text content that overflows its container</li>
            </ul>

            <h4>Registration</h4>
            <div class="bg-light p-3 rounded">
              <p>These directives are automatically registered when using the application. They're available globally in all Vue components.</p>

              <h6>Manual Registration (if needed):</h6>
              <pre><code>import { HoverStyle } from './components/common/directives.js'

// In your main.js or component
app.directive('hover-style', HoverStyle)
app.directive('block-truncate', {
  // Implementation available in register.js
})</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Directives Tab -->
      <div v-show="activeTab === 'directives'" class="tab-pane">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Directive</th>
                <th>Purpose</th>
                <th>Parameters</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>v-hover-style</code></td>
                <td>Hover Effects</td>
                <td><span class="badge bg-info">Object</span></td>
                <td>Applies temporary styles and CSS classes when hovering over elements</td>
              </tr>
              <tr>
                <td><code>v-block-truncate</code></td>
                <td>Text Truncation</td>
                <td><span class="badge bg-info">Object</span></td>
                <td>Automatically truncates text content that overflows its container with ellipsis</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Parameters Tab -->
      <div v-show="activeTab === 'parameters'" class="tab-pane">
        <h5>v-hover-style Parameters</h5>
        <div class="table-responsive mb-4">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>styles</code></td>
                <td><span class="badge bg-info">Object</span></td>
                <td><span class="badge bg-success">No</span></td>
                <td>CSS styles to apply on hover (key-value pairs)</td>
              </tr>
              <tr>
                <td><code>classes</code></td>
                <td><span class="badge bg-info">Array</span></td>
                <td><span class="badge bg-success">No</span></td>
                <td>CSS classes to add on hover (array of class names)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h5>v-block-truncate Parameters</h5>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>text</code></td>
                <td><span class="badge bg-info">String</span></td>
                <td><span class="badge bg-danger">Yes</span></td>
                <td>The text content to display (used with update binding)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Usage Tab -->
      <div v-show="activeTab === 'usage'" class="tab-pane">
        <h5>v-hover-style Usage</h5>
        <div class="mb-4">
          <p>Apply styles and classes that are added on mouseover and removed on mouseleave:</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;!-- Apply styles on hover --&gt;
&lt;div v-hover-style="{
  styles: {
    backgroundColor: 'blue',
    color: 'white',
    transform: 'scale(1.05)'
  }
}"&gt;
  Hover over me for style changes
&lt;/div&gt;

&lt;!-- Apply CSS classes on hover --&gt;
&lt;div v-hover-style="{
  classes: ['shadow-lg', 'border-primary']
}"&gt;
  Hover over me for class changes
&lt;/div&gt;

&lt;!-- Apply both styles and classes --&gt;
&lt;div v-hover-style="{
  styles: { fontSize: '18px' },
  classes: ['text-primary', 'fw-bold']
}"&gt;
  Hover for combined effects
&lt;/div&gt;</code></pre>
          </div>
        </div>

        <h5>v-block-truncate Usage</h5>
        <div class="mb-4">
          <p>Automatically truncate text that overflows its container:</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;!-- Static truncation (on element insertion) --&gt;
&lt;div
  style="width: 200px; height: 40px; overflow: hidden;"
  v-block-truncate
&gt;
  This is a very long text that will be automatically truncated with ellipsis when it overflows the container.
&lt;/div&gt;

&lt;!-- Dynamic truncation (with reactive text) --&gt;
&lt;div
  style="width: 150px; height: 60px; overflow: hidden;"
  v-block-truncate="{ text: dynamicText }"
&gt;
&lt;/div&gt;

&lt;script&gt;
export default {
  data() {
    return {
      dynamicText: 'This text can change and will be re-truncated automatically'
    }
  }
}
&lt;/script&gt;</code></pre>
          </div>
        </div>
      </div>

      <!-- Examples Tab -->
      <div v-show="activeTab === 'examples'" class="tab-pane">
        <div class="mb-4">
          <h5>Hover Style Examples</h5>
          <p class="text-muted">Interactive examples of the v-hover-style directive</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;template&gt;
  &lt;div class="container"&gt;
    &lt;!-- Button with hover effects --&gt;
    &lt;button
      class="btn btn-outline-primary me-2"
      v-hover-style="{
        styles: {
          backgroundColor: '#0d6efd',
          color: 'white',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }
      }"&gt;
      Hover for Animation
    &lt;/button&gt;

    &lt;!-- Card with hover classes --&gt;
    &lt;div
      class="card d-inline-block"
      style="width: 200px;"
      v-hover-style="{
        classes: ['shadow-lg', 'border-info']
      }"&gt;
      &lt;div class="card-body"&gt;
        &lt;h6&gt;Hover Card&lt;/h6&gt;
        &lt;p&gt;Hover to see shadow and border effects&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
          </div>
        </div>

        <div class="mb-4">
          <h5>Text Truncation Examples</h5>
          <p class="text-muted">Automatic text truncation with ellipsis</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;!-- Fixed width container with auto-truncation --&gt;
    &lt;div class="mb-3"&gt;
      &lt;h6&gt;Product Description:&lt;/h6&gt;
      &lt;div
        class="border p-2"
        style="width: 300px; height: 50px; overflow: hidden;"
        v-block-truncate
      &gt;
        This is a very long product description that contains many details about the features, benefits, and specifications that might not fit in the allocated space but will be automatically truncated.
      &lt;/div&gt;
    &lt;/div&gt;

    &lt;!-- Dynamic content truncation --&gt;
    &lt;div class="mb-3"&gt;
      &lt;h6&gt;Dynamic Content:&lt;/h6&gt;
      &lt;textarea v-model="userText" class="form-control mb-2"&gt;&lt;/textarea&gt;
      &lt;div
        class="border p-2 bg-light"
        style="width: 250px; height: 40px; overflow: hidden;"
        v-block-truncate="{ text: userText }"
      &gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      userText: 'Type your text here and see it truncate automatically when it overflows the container below.'
    }
  }
}
&lt;/script&gt;</code></pre>
          </div>
        </div>

        <div class="mb-4">
          <h5>Combined Usage Example</h5>
          <p class="text-muted">Using both directives together in a real-world scenario</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;template&gt;
  &lt;div class="row"&gt;
    &lt;div
      v-for="item in items"
      :key="item.id"
      class="col-md-4 mb-3"
    &gt;
      &lt;div
        class="card h-100"
        v-hover-style="{
          styles: { transform: 'scale(1.02)' },
          classes: ['shadow']
        }"
      &gt;
        &lt;div class="card-body"&gt;
          &lt;h6 class="card-title"&gt;&#123;&#123; item.title &#125;&#125;&lt;/h6&gt;
          &lt;div
            class="card-text"
            style="height: 60px; overflow: hidden;"
            v-block-truncate="{ text: item.description }"
          &gt;
          &lt;/div&gt;
          &lt;button class="btn btn-primary btn-sm"&gt;Learn More&lt;/button&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          title: 'Product One',
          description: 'This is a very detailed description that might be too long for the card and will be automatically truncated to fit the available space.'
        },
        // More items...
      ]
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
export default {
  name: 'DirectivesModuleComponentPage',
  data() {
    return {
      activeTab: 'overview'
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
