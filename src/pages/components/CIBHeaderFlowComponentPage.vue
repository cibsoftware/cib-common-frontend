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
                <span class="mdi mdi-24px me-2 mdi-page-layout-header"></span>
                CIBHeaderFlow
                <small class="badge ms-2 bg-success">Vue Component</small>
              </h2>
              <p class="text-muted mb-0">Application header with language switcher and user menu</p>
            </div>
            <div class="text-end">
              <small class="text-muted d-block">Category: Navigation</small>
              <small class="text-muted d-block">File: CIBHeaderFlow.vue</small>
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
      <div v-show="activeTab === 'overview'" class="tab-pane">
        <div class="row">
          <div class="col-12">
            <h4>Purpose</h4>
            <p>CIBHeaderFlow provides a consistent application header with language selection, user account menu, and navigation elements following CIB design standards. It includes responsive navigation with Bootstrap components and integrates with vue-i18n for internationalization.</p>
            
            <h4>Use Cases</h4>
            <ul>
              <li>Application header with branding and navigation</li>
              <li>Multi-language application support with language switcher</li>
              <li>User authentication and account management interface</li>
              <li>Help documentation and support links</li>
              <li>Responsive navigation for desktop and mobile devices</li>
            </ul>
            
            <h4>Integration</h4>
            <div class="bg-light p-3 rounded">
              <h6>Import Statement:</h6>
              <pre><code>import CIBHeaderFlow from './components/common/CIBHeaderFlow.vue'</code></pre>
              
              <h6 class="mt-3">Component Registration:</h6>
              <pre><code>components: {
  CIBHeaderFlow
}</code></pre>
              
              <h6 class="mt-3">Required Injection:</h6>
              <pre><code>// Parent component must provide currentLanguage function
provide() {
  return {
    currentLanguage: this.currentLanguage
  }
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Props Tab -->
      <div v-show="activeTab === 'props'" class="tab-pane">
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
                <td><code>languages</code></td>
                <td><span class="badge bg-info">Array</span></td>
                <td><code>undefined</code></td>
                <td><span class="badge bg-success">No</span></td>
                <td>Array of available language codes (e.g., ['en', 'de', 'es'])</td>
              </tr>
              <tr>
                <td><code>user</code></td>
                <td><span class="badge bg-info">Object</span></td>
                <td><code>undefined</code></td>
                <td><span class="badge bg-success">No</span></td>
                <td>User object with displayName and other properties for account menu</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Events Tab -->
      <div v-show="activeTab === 'events'" class="tab-pane">
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
                <td><code>@logout</code></td>
                <td><code>none</code></td>
                <td>Emitted when user clicks the logout button, clears session/local storage tokens</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Slots Tab -->
      <div v-show="activeTab === 'slots'" class="tab-pane">
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
              <tr>
                <td><code>default</code></td>
                <td><code>none</code></td>
                <td>Main header content area (left side) for branding, logo, and navigation elements</td>
              </tr>
              <tr>
                <td><code>helpItems</code></td>
                <td><code>none</code></td>
                <td>Custom help menu dropdown items (help dropdown only appears if this slot has content)</td>
              </tr>
              <tr>
                <td><code>userItems</code></td>
                <td><code>none</code></td>
                <td>Custom user menu dropdown items above the logout option</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Examples Tab -->
      <div v-show="activeTab === 'examples'" class="tab-pane">
        <div class="mb-4">
          <h5>Basic Header with Language Switcher</h5>
          <p class="text-muted">Simple header with branding and language selection</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CIBHeaderFlow 
  :languages="['en', 'de', 'es']" 
  @logout="handleLogout"&gt;
  &lt;div class="d-flex align-items-center"&gt;
    &lt;img src="/logo.svg" alt="Logo" height="38"&gt;
    &lt;span class="ms-2"&gt;My Application&lt;/span&gt;
  &lt;/div&gt;
&lt;/CIBHeaderFlow&gt;</code></pre>
          </div>
        </div>

        <div class="mb-4">
          <h5>Header with User Account and Help</h5>
          <p class="text-muted">Complete header with user account, help items, and custom menu items</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;CIBHeaderFlow 
  :languages="['en', 'de', 'es']"
  :user="{ displayName: 'John Doe' }"
  @logout="handleLogout"&gt;
  &lt;!-- Main content --&gt;
  &lt;div class="d-flex align-items-center"&gt;
    &lt;img src="/logo.svg" alt="Logo" height="38"&gt;
    &lt;span class="ms-2"&gt;My Application&lt;/span&gt;
  &lt;/div&gt;
  
  &lt;!-- Help menu items --&gt;
  &lt;template #helpItems&gt;
    &lt;b-dropdown-item href="/help"&gt;Documentation&lt;/b-dropdown-item&gt;
    &lt;b-dropdown-item href="/support"&gt;Support&lt;/b-dropdown-item&gt;
    &lt;b-dropdown-divider&gt;&lt;/b-dropdown-divider&gt;
    &lt;b-dropdown-item href="/about"&gt;About&lt;/b-dropdown-item&gt;
  &lt;/template&gt;
  
  &lt;!-- User menu items --&gt;
  &lt;template #userItems&gt;
    &lt;b-dropdown-item href="/profile"&gt;Profile&lt;/b-dropdown-item&gt;
    &lt;b-dropdown-item href="/settings"&gt;Settings&lt;/b-dropdown-item&gt;
    &lt;b-dropdown-divider&gt;&lt;/b-dropdown-divider&gt;
  &lt;/template&gt;
&lt;/CIBHeaderFlow&gt;</code></pre>
          </div>
        </div>

        <div class="mb-4">
          <h5>Required Parent Component Setup</h5>
          <p class="text-muted">Parent component must provide the currentLanguage function</p>
          <div class="bg-light p-3 rounded">
            <pre><code>&lt;script&gt;
export default {
  provide() {
    return {
      currentLanguage: this.currentLanguage
    }
  },
  methods: {
    currentLanguage(newLanguage) {
      if (newLanguage) {
        // Set new language
        this.$i18n.locale = newLanguage
        return newLanguage
      } else {
        // Get current language
        return this.$i18n.locale
      }
    },
    handleLogout() {
      // Handle logout logic
      console.log('User logged out')
      // Redirect to login page or perform cleanup
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
  name: 'CIBHeaderFlowComponentPage',
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

/* Smooth transitions */
.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
